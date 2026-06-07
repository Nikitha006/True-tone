# TrueTone - AI-Powered Dysarthric Speech Translation

TrueTone is a modern web application that helps people with dysarthria communicate more clearly by using AI to transcribe unclear speech and reconstruct it into coherent sentences.

## Features

- 🎤 **Audio Recording**: Record speech directly from your microphone
- 📁 **File Upload**: Upload .wav or .mp3 audio files
- 🤖 **AI Transcription**: Uses OpenAI Whisper for accurate speech-to-text
- ✨ **Text Correction**: Gemini AI reconstructs and corrects unclear speech
- 🔊 **Text-to-Speech**: Optional playback of corrected text using gTTS
- 📱 **Responsive Design**: Modern dark UI with blue/purple gradients
- ⚡ **Fast Processing**: Optimized with Whisper tiny model
- 💾 **File Management**: Secure storage of uploaded audio files

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **AI Services**:
  - OpenAI Whisper (speech-to-text)
  - Google Gemini 1.5 Flash (text correction)
  - gTTS (text-to-speech)
- **Styling**: Custom CSS with modern animations

## Project Structure

```
TrueTone/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
├── templates/
│   └── index.html        # Main web interface
├── static/
│   ├── style.css         # Modern dark theme styles
│   └── script.js         # Audio recording and UI interactions
├── uploads/              # Temporary audio file storage
└── utils/
    ├── speech_processor.py    # Whisper transcription handler
    └── gemini_corrector.py    # Gemini text correction handler
```

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- GitHub Codespaces (recommended) or local Python environment

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/Nikitha006/True-tone.git
cd True-tone

# Install dependencies
pip install -r requirements.txt
```

### 2. Environment Configuration

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. **Required**: Get your Gemini API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env` file:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```
   - **Note**: Without this key, text correction will be disabled and only raw transcription will be shown.

3. **Optional**: OpenAI API Key (for cloud-based Whisper instead of local model):
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Add to `.env`:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```

### 3. Run the Application

```bash
# Start the Flask development server
python app.py
```

The application will be available at `http://localhost:5000` or `http://0.0.0.0:5000` in Codespaces.

### 4. Access the App

- Open your browser and navigate to the provided URL
- Click the microphone button to record speech
- Or upload an audio file (.wav or .mp3)
- View the raw transcription and AI-corrected text
- Optionally play back the corrected text as speech

## API Keys Required

### Gemini API Key (Required)
- **Purpose**: Text correction and sentence reconstruction
- **How to get**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Cost**: Free tier available, pay-per-use for heavy usage
- **Note**: The current implementation uses the deprecated `google-generativeai` package. While it still works, consider upgrading to the newer `google-genai` package for future compatibility.

### Optional: OpenAI API Key
- **Purpose**: Alternative to local Whisper model (not required)
- **How to get**: Visit [OpenAI Platform](https://platform.openai.com/api-keys)
- **Cost**: Pay-per-use for Whisper API calls

## Usage Guide

1. **Recording Audio**:
   - Click the large microphone button
   - Grant microphone permissions when prompted
   - Speak clearly into your microphone
   - Click again to stop recording

2. **Uploading Files**:
   - Click "Or Upload Audio File"
   - Select a .wav or .mp3 file from your device
   - The file will be processed automatically

3. **Viewing Results**:
   - Raw transcription shows exactly what was heard
   - Corrected text shows AI-improved version
   - Use "Play Speech" to hear the corrected text
   - Use "Download Text" to save the corrected text

## Troubleshooting

### Common Issues

1. **Microphone not working**:
   - Ensure browser has microphone permissions
   - Try refreshing the page
   - Check browser compatibility (Chrome/Firefox recommended)

2. **API errors**:
   - Verify your Gemini API key is correct
   - Check your internet connection
   - Ensure API key has sufficient credits

3. **Audio processing fails**:
   - Ensure audio files are .wav or .mp3 format
   - Check file size (max 16MB)
   - Try with a shorter audio clip

### Development Mode

For development and debugging:
```bash
export FLASK_ENV=development
python app.py
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- OpenAI for Whisper speech recognition
- Google for Gemini AI
- gTTS for text-to-speech functionality
- Flask community for the excellent web framework

---

**Note**: This application is designed to assist communication for people with dysarthria. While AI can help improve clarity, professional medical advice should always be sought for speech therapy and related concerns.