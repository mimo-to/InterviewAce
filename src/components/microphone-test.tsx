import { useState, useEffect } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, CircleStop } from "lucide-react";
import { toast } from "sonner";

export const MicrophoneTest = () => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    // Check browser support
    const supportsSpeech = !!(
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition ||
      (window as any).mozSpeechRecognition ||
      (window as any).msSpeechRecognition
    );

    if (!supportsSpeech) {
      toast.error("Browser Not Supported", {
        description: "Your browser doesn't support speech recognition.",
      });
    }
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Speech recognition error:", error);
      toast.error("Microphone Error", {
        description: error,
      });
    }
  }, [error]);

  useEffect(() => {
    // Combine all results into a single transcript
    const combinedTranscript = results
      .map((result) => (typeof result === "string" ? result : result.transcript))
      .join(" ");
    setTranscript(combinedTranscript);
  }, [results]);

  const toggleRecording = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  return (
    <div className="p-6 border rounded-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Microphone Test</h2>

      <div className="mb-4">
        <button
          onClick={toggleRecording}
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${isRecording
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
        >
          {isRecording ? (
            <>
              <CircleStop className="w-5 h-5" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              Start Recording
            </>
          )}
        </button>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Transcript:</h3>
        <div className="p-3 border rounded min-h-[100px] bg-gray-50">
          {transcript || "Your speech will appear here..."}
        </div>

        {interimResult && (
          <div className="p-3 border rounded mt-2 bg-yellow-50 text-yellow-800">
            <strong>Current speech:</strong> {interimResult}
          </div>
        )}
      </div>
    </div>
  );
};