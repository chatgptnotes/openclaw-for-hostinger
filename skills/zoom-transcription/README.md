# Zoom Transcription Skill for OpenClaw

Automatically transcribe Zoom meetings using free and paid transcription services.

## Quick Start

### 1. Install Dependencies

```bash
# macOS
brew install ffmpeg jq

# Check if installed
which ffmpeg jq
```

### 2. Set Up API Keys (Choose One)

**Option A: OpenAI Whisper API (Recommended)**
- Get API key from: https://platform.openai.com/api-keys
- Cost: ~$0.006/minute (~$0.36/hour)

```bash
export OPENAI_API_KEY="sk-your-key-here"
```

**Option B: Free Services**
- **Fireflies.ai**: Sign up at https://fireflies.ai/ (Free: 8,000 minutes/month)
- **Otter.ai**: Sign up at https://otter.ai/ (Free: 300 minutes/month)
- **Tactiq**: Install Chrome extension at https://tactiq.io/ (Free: First 10 meetings)

### 3. Transcribe a Zoom Recording

```bash
# Transcribe a downloaded Zoom recording
~/.openclaw/workspace/skills/zoom-transcription/transcribe-zoom.sh ~/Downloads/zoom_0.mp4

# Or use with OpenClaw
openclaw agent --message "Transcribe my latest Zoom recording"
```

## Usage Examples

### Transcribe Video File
```bash
./transcribe-zoom.sh ~/Downloads/my_meeting.mp4
```

### Transcribe Audio File
```bash
./transcribe-zoom.sh ~/Downloads/audio_only.mp3
```

### Use Specific Service
```bash
./transcribe-zoom.sh --service whisper-api meeting.mp4
```

### Custom Output Location
```bash
./transcribe-zoom.sh --output ~/Documents/transcript.txt meeting.mp4
```

## Configuration

Edit `config.json` to customize:

```json
{
  "defaultService": "whisper-api",
  "zoom": {
    "meetingId": "9373111709",
    "recordingsPath": "~/Downloads"
  },
  "notifications": {
    "autoSend": true,
    "channels": ["whatsapp"],
    "recipients": ["+919373111709"]
  }
}
```

## Free Transcription Services Comparison

| Service | Free Tier | Accuracy | Real-time | Notes |
|---------|-----------|----------|-----------|-------|
| Fireflies.ai | 8,000 min/mo | 90% | Yes | Auto-joins meetings |
| Otter.ai | 300 min/mo | 85-90% | Yes | Good for English |
| Tactiq | First 10 meetings | 85% | Yes | Chrome extension |
| Rev AI | 45 min/mo | 90% | No | Best for post-processing |
| OpenAI Whisper | Pay-per-use | 95%+ | No | $0.006/min (~$0.36/hr) |

## Features

- Multiple transcription service support
- Automatic audio extraction from video
- Timestamp-aligned transcripts
- Multiple output formats (TXT, JSON, SRT)
- WhatsApp/Telegram notifications
- Configurable via JSON

## Output Files

After transcription, you'll get:

1. **transcript.txt** - Plain text transcript
2. **transcript.json** - Full JSON with timestamps and metadata
3. **transcript.srt** - Subtitle file for video

## For Your Meeting

Your Zoom meeting: https://us06web.zoom.us/j/9373111709?pwd=...

**Recommended Setup:**

1. **For Real-time Transcription** (Free):
   - Install Tactiq Chrome extension
   - Join meeting via browser
   - Tactiq auto-transcribes

2. **For Post-meeting Transcription** (Low Cost):
   - Download Zoom recording
   - Run: `./transcribe-zoom.sh ~/Downloads/zoom_recording.mp4`
   - Get transcript in ~/.openclaw/workspace/transcripts/

## Troubleshooting

### ffmpeg not found
```bash
brew install ffmpeg
```

### jq not found
```bash
brew install jq
```

### OpenAI API Key Error
```bash
export OPENAI_API_KEY="sk-your-actual-key"
# Or add to ~/.zshrc or ~/.bash_profile
echo 'export OPENAI_API_KEY="sk-your-key"' >> ~/.zshrc
```

### Large File Processing
For files > 25MB, the script automatically compresses audio before uploading.

## Integration with OpenClaw

Once set up, you can use natural language:

```
You: "Transcribe my latest Zoom meeting"
OpenClaw: [Finds latest recording and transcribes it]

You: "Send me the transcript from today's meeting"
OpenClaw: [Retrieves and sends via WhatsApp]
```

## Links

- [OpenAI Whisper API Docs](https://platform.openai.com/docs/guides/speech-to-text)
- [Fireflies.ai](https://fireflies.ai/)
- [Otter.ai](https://otter.ai/)
- [Tactiq](https://tactiq.io/)
- [Rev](https://www.rev.com/)
