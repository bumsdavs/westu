"use client"

import { Button } from "@/components/ui/button"

interface ErrorModalProps {
  onClose: () => void
}

export default function ErrorModal({ onClose }: ErrorModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Something's wrong</h2>
        <p className="text-gray-700 mb-6">
          NO TRANSACTION FOUND <span className="text-gray-500">(E9387)</span>
        </p>
        <Button
          onClick={onClose}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-full"
        >
          OK
        </Button>
      </div>
    </div>
  )
}
