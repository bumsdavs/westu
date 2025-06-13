"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Download } from "lucide-react"
import StatusTimeline from "./status-timeline"
import { formatMTCN } from "../utils/transfer-utils"
import type { TransferData } from "../data/mock-transfers"

interface ResultViewProps {
  transferData: TransferData
  activeTab: "sender" | "receiver"
  setActiveTab: (tab: "sender" | "receiver") => void
  onNewSearch: () => void
}

export default function ResultView({ transferData, activeTab, setActiveTab, onNewSearch }: ResultViewProps) {
  const currentProgress = activeTab === "sender" ? transferData.senderProgress : transferData.receiverProgress

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-light text-gray-900">Transfer Status</h1>
        <Button onClick={onNewSearch} variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
          Track another transfer
        </Button>
      </div>

      {/* Status Card */}
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("sender")}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === "sender"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Upload className="w-4 h-4" />
              I'm the sender
            </button>
            <button
              onClick={() => setActiveTab("receiver")}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === "receiver"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Download className="w-4 h-4" />
              I'm the receiver
            </button>
          </div>

          {/* MTCN */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-1">Tracking # (MTCN):</p>
            <p className="text-lg font-mono font-semibold">{formatMTCN(transferData.mtcn)}</p>
          </div>

          {/* Progress Steps */}
          <StatusTimeline steps={currentProgress} userType={activeTab} />
        </CardContent>
      </Card>
    </div>
  )
}
