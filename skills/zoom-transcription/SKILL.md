# zoom-transcription

Transcribe Zoom meetings automatically using multiple free transcription services.

## Description

This skill enables OpenClaw to transcribe Zoom meetings by:
1. Recording or capturing Zoom meeting audio
2. Using free transcription services (Fireflies.ai, Otter.ai, or OpenAI Whisper API)
3. Saving transcripts to local storage
4. Optionally sending transcripts via WhatsApp or Telegram

## Use Cases

- Automatically transcribe Zoom meetings for record-keeping
- Generate meeting summaries from transcripts
- Extract action items from meeting transcripts
- Archive important discussions

## Requirements

### Environment Variables
```bash
# Optional: For OpenAI Whisper API (if using paid tier)
OPENAI_API_KEY=sk-...

# Optional: For Fireflies.ai integration
FIREFLIES_API_KEY=...

# Zoom meeting credentials
ZOOM_MEETING_ID=9373111709
ZOOM_MEETING_PASSWORD=...
```

### Dependencies
- `ffmpeg` for audio processing
- `curl` for API calls
- Optional: `zoom-client` or browser automation for recording

## Usage

### Basic Transcription
```bash
# Transcribe a Zoom recording file
./transcribe-zoom.sh /path/to/zoom-recording.mp4

# Transcribe live Zoom meeting
./transcribe-zoom.sh --live --meeting-id 9373111709
```

### With OpenClaw
```
User: "Transcribe my Zoom meeting"
Agent: [Uses zoom-transcription skill to capture and transcribe]

User: "Send me the transcript from today's meeting"
Agent: [Retrieves and sends transcript via WhatsApp/Telegram]
```

## Features

- Multiple transcription backends (Fireflies, Otter, Whisper API)
- Automatic audio extraction from Zoom recordings
- Speaker identification
- Timestamp alignment
- Export formats: TXT, SRT, VTT, JSON
- Integration with OpenClaw messaging

## Installation

1. Install dependencies:
```bash
brew install ffmpeg
```

2. Set up API keys (choose one):
```bash
# For OpenAI Whisper API
export OPENAI_API_KEY="sk-..."

# OR for Fireflies.ai
export FIREFLIES_API_KEY="..."
```

3. Configure Zoom meeting details:
```bash
export ZOOM_MEETING_ID="9373111709"
export ZOOM_MEETING_PASSWORD="..."
```

## Configuration

Create `~/.openclaw/workspace/skills/zoom-transcription/config.json`:
```json
{
  "defaultService": "whisper-api",
  "services": {
    "whisper-api": {
      "enabled": true,
      "apiKey": "${OPENAI_API_KEY}"
    },
    "fireflies": {
      "enabled": false,
      "apiKey": "${FIREFLIES_API_KEY}"
    },
    "otter": {
      "enabled": false
    }
  },
  "outputDir": "~/.openclaw/workspace/transcripts",
  "autoSend": true,
  "notifyChannels": ["whatsapp", "telegram"]
}
```

## Scripts

- `transcribe-zoom.sh` - Main transcription script
- `extract-audio.sh` - Extract audio from Zoom video
- `send-transcript.sh` - Send transcript via messaging channels

## Limitations

- Free tiers have monthly limits (varies by service)
- Real-time transcription requires paid plans for some services
- Large files may need to be split for processing

## Links

- [OpenAI Whisper API](https://platform.openai.com/docs/guides/speech-to-text)
- [Fireflies.ai](https://fireflies.ai/)
- [Otter.ai](https://otter.ai/)
- [Tactiq Chrome Extension](https://tactiq.io/)
