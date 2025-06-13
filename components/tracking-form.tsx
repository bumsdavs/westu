'use client';

import { useState, useRef } from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TrackingFormProps {
  onTrack: (mtcn: string) => void;
  isTracking: boolean;
}

export default function TrackingForm({ onTrack, isTracking }: TrackingFormProps) {
  const [activeTab, setActiveTab] = useState<'sender' | 'receiver'>('sender');
  const [mtcnDigits, setMtcnDigits] = useState(Array(10).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newDigits = [...mtcnDigits];
    newDigits[index] = value;
    setMtcnDigits(newDigits);

    // Auto-focus next input
    if (value && index < 9) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !mtcnDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleTrack = () => {
    const mtcn = mtcnDigits.join('');
    if (mtcn.length !== 10) return;
    onTrack(mtcn);
  };

  const isTrackDisabled = mtcnDigits.some(digit => !digit) || isTracking;

  return (
    <div className="text-center">
      <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-8">Track a transfer</h1>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex border-b border-gray-200 w-full max-w-md">
          <button
            onClick={() => setActiveTab('sender')}
            className={`flex-1 px-4 sm:px-8 py-3 text-base sm:text-lg font-medium border-b-2 transition-colors ${
              activeTab === 'sender' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            I'm the sender
          </button>
          <button
            onClick={() => setActiveTab('receiver')}
            className={`flex-1 px-4 sm:px-8 py-3 text-base sm:text-lg font-medium border-b-2 transition-colors ${
              activeTab === 'receiver' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            I'm the receiver
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-8 px-4">
        <p className="text-gray-700 text-base sm:text-lg text-center">To track a transfer, enter your 10-digit tracking number (MTCN) below.</p>
        <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
      </div>

      {/* MTCN Input */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8 px-4">
        {mtcnDigits.map((digit, index) => (
          <div key={index} className="flex items-center">
            <Input
              ref={el => {
                inputRefs.current[index] = el;
              }}
              type="text"
              value={digit}
              onChange={e => handleDigitChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              className="w-8 h-8 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-mono border-2 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
              maxLength={1}
            />
            {(index === 2 || index === 5) && <span className="mx-1 sm:mx-2 text-xl sm:text-2xl text-gray-400">-</span>}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="space-y-4 px-4">
        <Button
          onClick={handleTrack}
          disabled={isTrackDisabled}
          className="w-full max-w-md bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-base sm:text-lg py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isTracking ? 'Tracking...' : 'Track it'}
        </Button>

        <Button variant="outline" className="w-full max-w-md border-2 border-gray-300 text-gray-700 font-semibold text-base sm:text-lg py-3 rounded-full hover:bg-gray-50">
          Track a transfer without MTCN
        </Button>

        <div className="pt-4">
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base">
            Log in to track recent transfers
          </a>
        </div>
      </div>
    </div>
  );
}
