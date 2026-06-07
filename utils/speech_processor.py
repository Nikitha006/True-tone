import whisper
import os

class SpeechProcessor:
    def __init__(self):
        # Load the tiny model for speed
        self.model = whisper.load_model("small")

    def transcribe_audio(self, audio_path):
        """
        Transcribe audio file using Whisper.
        Supports .wav and .mp3 formats.
        Returns the transcription text.
        """
        try:
            result = self.model.transcribe(audio_path)
            return result["text"].strip()
        except Exception as e:
            raise Exception(f"Error transcribing audio: {str(e)}")

# Singleton instance
speech_processor = SpeechProcessor()