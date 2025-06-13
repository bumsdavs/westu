import type { TransferStatus, TransferData } from "../data/mock-transfers"

export const formatMTCN = (mtcn: string): string => {
  return `${mtcn.slice(0, 3)}-${mtcn.slice(3, 6)}-${mtcn.slice(6, 10)}`
}

export const formatDateTime = (dateString: string, timeString: string): string => {
  const date = new Date(`${dateString}T${timeString}`)
  const now = new Date()

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }

  // If it's today, show time only
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return date.toLocaleDateString("en-US", options)
}

export const processTransferStatus = (statuses: TransferStatus[], transferData: TransferData): TransferStatus[] => {
  const now = new Date()
  const processedStatuses: TransferStatus[] = []

  // Map status names to their corresponding date/time fields
  const statusDateTimeMap: Record<string, { date: string; time: string }> = {
    Sent: {
      date: transferData.money_sent_date,
      time: transferData.money_sent_time,
    },
    "On hold": {
      date: transferData.money_on_hold_date || "",
      time: transferData.money_on_hold_time || "",
    },
    "In progress": {
      date: transferData.money_in_progress_date,
      time: transferData.money_in_progress_time,
    },
    Available: {
      date: transferData.money_available_date,
      time: transferData.money_available_time,
    },
    Received: {
      date: transferData.money_received_date,
      time: transferData.money_received_time,
    },
  }

  // Create a list of visible statuses with their dates
  const visibleStatuses = statuses
    .map((status, index) => {
      const dateTimeInfo = statusDateTimeMap[status.status]
      if (!dateTimeInfo.date || !dateTimeInfo.time) {
        return null
      }

      // Parse date and time together
      const statusDateTime = new Date(`${dateTimeInfo.date}T${dateTimeInfo.time}`)
      const isOnHold = status.status === "On hold"

      // Skip hidden "On hold" status if time hasn't been reached
      if (isOnHold && status.hidden && statusDateTime > now) {
        return null
      }

      return {
        index,
        status: { ...status },
        dateTime: statusDateTime,
      }
    })
    .filter((item) => item !== null) as { index: number; status: TransferStatus; dateTime: Date }[]

  // Sort by date/time
  visibleStatuses.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())

  // Process each status
  for (let i = 0; i < visibleStatuses.length; i++) {
    const { status, dateTime } = visibleStatuses[i]

    // Remove hidden flag if time has been reached
    if (status.hidden && dateTime <= now) {
      status.hidden = false
    }

    // Determine if status is completed, current, or future
    if (dateTime <= now) {
      // This status is completed if there's a next status that has also been reached
      const hasNextReached = i < visibleStatuses.length - 1 && visibleStatuses[i + 1].dateTime <= now
      
      status.completed = !hasNextReached ? false : true
      status.current = !hasNextReached
    } else {
      // Future status
      status.completed = false
      status.current = false
    }

    processedStatuses[visibleStatuses[i].index] = status
  }

  // Ensure all previous statuses are marked as completed when a later status is current
  let foundCurrent = false
  for (let i = processedStatuses.length - 1; i >= 0; i--) {
    if (processedStatuses[i]?.current) {
      foundCurrent = true
    }
    if (foundCurrent && processedStatuses[i] && i !== processedStatuses.length - 1) {
      processedStatuses[i]!.completed = true
      processedStatuses[i]!.current = false
    }
  }

  // Filter out any null entries (hidden statuses)
  return processedStatuses.filter((status) => status !== null)
}

export const getCurrentMessage = (statuses: TransferStatus[], userType: "sender" | "receiver"): string => {
  const currentStatus = statuses.find((status) => status.current)
  if (currentStatus && currentStatus.message) {
    return currentStatus.message[userType]
  }
  return ""
}
