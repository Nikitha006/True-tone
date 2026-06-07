import google.generativeai as genai
import os

class GeminiCorrector:
    def __init__(self):
        # Configure Gemini API
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable not set. Please add it to your .env file.")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('models/gemini-2.5-flash')

    def correct_text(self, raw_text):
        """
        Correct and reconstruct the sentence using Gemini.
        Improves grammar, predicts intended sentence, maintains medical sensitivity.
        """
        prompt = f"""
        You are an AI assistive communication interpreter for people with dysarthria.

        The speech transcription may contain:
        - incorrect words
        - slurred pronunciations
        - broken phrases
        - phonetic mistakes
        - incomplete words

        Your task:
        1. Infer the MOST LIKELY intended meaning.
        2. Reconstruct a natural human sentence.
        3. Use semantic/contextual understanding.
        4. Replace incorrect phonetic words intelligently.
        5. Do NOT simply repeat unclear text.
        6. Return ONLY the final corrected sentence.

        Examples:

        Input:
        "If you destroy confondence in banks, you do something through the economy."

        Output:
        "If you destroy confidence in banks, it affects the economy."

        Input:
        "Trust process can be persecuted and found."

        Output:
        "The process can be pursued and followed."

        Now interpret this transcription:

        "{raw_text}"
        """

        try:
            response = self.model.generate_content(prompt)
            corrected_text = response.text.strip()
            return corrected_text
        except Exception as e:
            # Fallback: return the original text if API fails
            print(f"Gemini API error: {str(e)}")
            return raw_text

# Singleton instance - only create if API key is available
gemini_corrector = None
try:
    gemini_corrector = GeminiCorrector()
except ValueError as e:
    print(f"Warning: {e}")
    print("Text correction will be disabled. Set GEMINI_API_KEY to enable.")