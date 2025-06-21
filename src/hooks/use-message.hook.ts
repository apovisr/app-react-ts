import { useState } from 'react';

type MessageType = 'success' | 'error' | '';

export function useMessage() {
  const [message, setMessage] = useState<{ text: string; type: MessageType }>({ text: '', type: '' });

  const showMesage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  return { message, showMesage };
}