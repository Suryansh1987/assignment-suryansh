import { useEffect } from 'react';
import { useVoiceInput } from '../../hooks/useVoiceInput';

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
}

export function VoiceInputButton({ onTranscript }: VoiceInputButtonProps) {
  const { isListening, transcript, startListening, stopListening, resetTranscript, isSupported, error } =
    useVoiceInput();

  // Pass transcript to parent when received and reset it
  useEffect(() => {
    if (transcript) {
      onTranscript(transcript);
      resetTranscript();
    }
  }, [transcript, onTranscript, resetTranscript]);

  if (!isSupported) {
    return null;
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        className={`p-2 rounded-lg transition-colors ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
            : 'bg-primary-500 hover:bg-primary-600'
        }`}
        title={isListening ? '録音中...' : '音声入力'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {error && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
}
