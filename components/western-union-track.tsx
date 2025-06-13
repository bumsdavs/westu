'use client';

import { useState, useEffect } from 'react';
import TrackingForm from './tracking-form';
import ResultView from './result-view';
import ErrorModal from './error-modal';
import { mockTransferData } from '../data/mock-transfers';
import { processTransferStatus } from '../utils/transfer-utils';
import type { TransferData } from '../data/mock-transfers';

export default function WesternUnionTrack() {
  const [activeTab, setActiveTab] = useState<"sender" | "receiver">("sender")
  const [showResults, setShowResults] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [transferData, setTransferData] = useState<TransferData | null>(null)
  const [isTracking, setIsTracking] = useState(false)

  // Update transfer status every minute
  useEffect(() => {
    if (transferData) {
      const interval = setInterval(() => {
        const rawData = mockTransferData[transferData.mtcn]
        if (rawData) {
          const processedData = {
            ...rawData,
            senderProgress: processTransferStatus(rawData.senderProgress, rawData),
            receiverProgress: processTransferStatus(rawData.receiverProgress, rawData),
          }
          setTransferData(processedData)
        }
      }, 10000) // Update every 10 seconds for testing

      return () => clearInterval(interval)
    }
  }, [transferData])

  const handleTrack = (mtcn: string) => {
    setIsTracking(true)

    // Simulate API call
    setTimeout(() => {
      const rawData = mockTransferData[mtcn as keyof typeof mockTransferData]
      if (rawData) {
        const processedData = {
          ...rawData,
          senderProgress: processTransferStatus(rawData.senderProgress, rawData),
          receiverProgress: processTransferStatus(rawData.receiverProgress, rawData),
        }
        setTransferData(processedData)
        setShowResults(true)
      } else {
        setShowErrorModal(true)
      }
      setIsTracking(false)
    }, 1500)
  }

  const handleNewSearch = () => {
    setShowResults(false)
    setTransferData(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {!showResults ? (
          <TrackingForm onTrack={handleTrack} isTracking={isTracking} />
        ) : (
          transferData && (
            <ResultView
              transferData={transferData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onNewSearch={handleNewSearch}
            />
          )
        )}
      </main>

      {showErrorModal && <ErrorModal onClose={() => setShowErrorModal(false)} />}
    </div>
  )
}
