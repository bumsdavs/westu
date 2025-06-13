export interface TransferStatus {
  status: string;
  completed: boolean;
  current: boolean;
  hidden?: boolean;
  message?: {
    sender: string;
    receiver: string;
  };
}

export interface TransferData {
  mtcn: string;
  money_sent_date: string;
  money_sent_time: string;
  money_in_progress_date: string;
  money_in_progress_time: string;
  money_available_date: string;
  money_available_time: string;
  money_received_date: string;
  money_received_time: string;
  money_on_hold_date?: string;
  money_on_hold_time?: string;
  senderProgress: TransferStatus[];
  receiverProgress: TransferStatus[];
}

export const mockTransferData: Record<string, TransferData> = {
  '1234567890': {
    mtcn: '1234567890',
    money_sent_date: '2025-06-11',
    money_sent_time: '10:30:00',
    money_in_progress_date: '2025-06-11',
    money_in_progress_time: '14:00:00',
    money_on_hold_date: '',
    money_on_hold_time: '',
    money_available_date: '2025-06-11',
    money_available_time: '18:00:00',
    money_received_date: '2025-06-11',
    money_received_time: '22:30:00',
    senderProgress: [
      {
        status: 'Sent',
        completed: false,
        current: true,
        message: {
          sender: 'Your money transfer has been sent and is being processed.',
          receiver: 'A money transfer has been sent to you and is being processed.'
        }
      },
      {
        status: 'On hold',
        completed: false,
        current: false,
        hidden: true,
        message: {
          sender: "Your transfer is temporarily on hold for additional verification. We'll contact you if we need more information.",
          receiver: 'The transfer is currently on hold for verification. Please contact customer service for more information.'
        }
      },
      {
        status: 'In progress',
        completed: false,
        current: false,
        message: {
          sender: "Your money transfer is being processed. We'll notify you when it's ready for pickup.",
          receiver: "Your money transfer is being processed. We'll notify you when it's ready for pickup."
        }
      },
      {
        status: 'Available',
        completed: false,
        current: false,
        message: {
          sender: 'The money transfer is ready for pick up. Receiver should bring the tracking number (MTCN) and government-issued ID to pick up the money.',
          receiver: 'Your money transfer is ready for pickup. Please bring your ID and the tracking number to collect your money.'
        }
      },
      {
        status: 'Received',
        completed: false,
        current: false,
        message: {
          sender: 'The money transfer has been picked up by the receiver.',
          receiver: 'Thank you for using Western Union. Your money has been successfully received.'
        }
      }
    ],
    receiverProgress: [
      {
        status: 'Sent',
        completed: false,
        current: true,
        message: {
          sender: 'Your money transfer has been sent and is being processed.',
          receiver: 'A money transfer has been sent to you and is being processed.'
        }
      },
      {
        status: 'On hold',
        completed: false,
        current: false,
        hidden: true,
        message: {
          sender: "Your transfer is temporarily on hold for additional verification. We'll contact you if we need more information.",
          receiver: 'The transfer is currently on hold for verification. Please contact customer service for more information.'
        }
      },
      {
        status: 'In progress',
        completed: false,
        current: false,
        message: {
          sender: "Your money transfer is being processed. We'll notify you when it's ready for pickup.",
          receiver: "Your money transfer is being processed. We'll notify you when it's ready for pickup."
        }
      },
      {
        status: 'Available',
        completed: false,
        current: false,
        message: {
          sender: 'The money transfer is ready for pick up. Receiver should bring the tracking number (MTCN) and government-issued ID to pick up the money.',
          receiver: 'Your money transfer is ready for pickup. Please bring your ID and the tracking number to collect your money.'
        }
      },
      {
        status: 'Received',
        completed: false,
        current: false,
        message: {
          sender: 'The money transfer has been picked up by the receiver.',
          receiver: 'Thank you for using Western Union. Your money has been successfully received.'
        }
      }
    ]
  }
};
