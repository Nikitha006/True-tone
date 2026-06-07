// TrueTone - JavaScript for Audio Recording and UI Interactions

let mediaRecorder;
let audioChunks = [];
let isRecording = false;

const recordBtn = document.getElementById('recordBtn');
const recordText = document.getElementById('recordText');
const waveform = document.getElementById('waveform');
const fileInput = document.getElementById('fileInput');
const fileName = document.getElementById('fileName');
const loading = document.getElementById('loading');
const results = document.getElementById('results');
const rawText = document.getElementById('rawText');
const correctedText = document.getElementById('correctedText');
const playBtn = document.getElementById('playBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Initialize microphone recording
recordBtn.addEventListener('click', toggleRecording);

// File upload handling
fileInput.addEventListener('change', handleFileUpload);

// Play speech button
playBtn.addEventListener('click', playSpeech);

// Download text button
downloadBtn.addEventListener('click', downloadText);

async function toggleRecording() {
    if (!isRecording) {
        await startRecording();
    } else {
        stopRecording();
    }
}

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        audioChunks = [];
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            await processAudio(audioBlob);
            stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        isRecording = true;
        recordBtn.classList.add('recording');
        recordText.textContent = 'Recording... Click to Stop';
        waveform.style.display = 'flex';

    } catch (error) {
        alert('Error accessing microphone: ' + error.message);
    }
}

function stopRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        isRecording = false;
        recordBtn.classList.remove('recording');
        recordText.textContent = 'Click to Record';
        waveform.style.display = 'none';
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        fileName.textContent = file.name;
        processAudio(file);
    }
}

async function processAudio(audioData) {
    // Show loading animation
    loading.style.display = 'flex';
    results.style.display = 'none';

    try {
        const formData = new FormData();
        formData.append('audio', audioData);

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            displayResults(data.raw_transcription, data.corrected_text);
        } else {
            alert('Error: ' + data.error);
        }

    } catch (error) {
        alert('Error processing audio: ' + error.message);
    } finally {
        loading.style.display = 'none';
    }
}

function displayResults(raw, corrected) {
    rawText.textContent = raw || 'No transcription available';
    correctedText.textContent = corrected || 'No correction available';
    results.style.display = 'grid';
}

async function playSpeech() {
    const text = correctedText.textContent;
    if (!text) return;

    try {
        const response = await fetch('/text-to-speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });

        if (response.ok) {
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
        } else {
            const error = await response.json();
            alert('Error generating speech: ' + error.error);
        }

    } catch (error) {
        alert('Error playing speech: ' + error.message);
    }
}

function downloadText() {
    const text = correctedText.textContent;
    if (!text) return;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'corrected_text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}