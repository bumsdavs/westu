import { CheckCircle, Clock } from 'lucide-react';
import type { TransferStatus } from '../data/mock-transfers';

interface StatusTimelineProps {
  steps: TransferStatus[];
  userType: 'sender' | 'receiver';
}

export default function StatusTimeline({ steps, userType }: StatusTimelineProps) {
  return (
    <div className="space-y-6 mb-6">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                step.completed ? 'bg-green-500 text-white' : step.current ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}
            >
              {step.completed || step.current ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
            </div>
            {/* Connecting line */}
            {index < steps.length - 1 && <div className="w-0.5 h-8 bg-gray-300"></div>}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`font-medium ${step.completed || step.current ? 'text-gray-900' : 'text-gray-500'}`}>{step.status}</p>
            {/* Show message only for current status */}
            {step.current && step.message && <div className="text-sm text-gray-600 leading-relaxed">{step.message[userType]}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
