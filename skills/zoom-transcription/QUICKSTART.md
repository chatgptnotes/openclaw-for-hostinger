# Quick Start Guide - Zoom Transcription

## Step 1: Install Dependencies (One-time Setup)

```bash
# Install required tools
brew install ffmpeg jq

# Verify installation
ffmpeg -version
jq --version
```

## Step 2: Choose Your Transcription Method

### Option A: FREE - Tactiq (Easiest, No Setup Required)

1. Install Tactiq Chrome Extension: https://tactiq.io/
2. Join your Zoom meeting via Chrome browser
3. Tactiq automatically transcribes in real-time
4. Download transcript when done

**Pros:** Completely free for first 10 meetings, real-time
**Cons:** Requires Chrome, limited to 10 meetings on free plan

### Option B: FREE - Fireflies.ai (Best for Regular Use)

1. Sign up at https://fireflies.ai/
2. Connect your Zoom account
3. Fireflies bot joins meetings automatically
4. Get transcripts in your dashboard

**Pros:** 8,000 minutes/month free, auto-joins meetings
**Cons:** Requires setup, bot appears in participant list

### Option C: PAID - OpenAI Whisper API (Best Quality)

1. Get API key from https://platform.openai.com/api-keys
2. Set environment variable:
   ```bash
   export OPENAI_API_KEY="sk-your-key-here"
   ```
3. Use this skill to transcribe recordings

**Pros:** 95%+ accuracy, no monthly limits
**Cons:** Costs ~$0.36 per hour of audio

## Step 3: Transcribe Your Meeting

### For Recorded Meetings (Using This Skill)

```bash
# Download your Zoom recording first
# Then transcribe it:
~/.openclaw/workspace/skills/zoom-transcription/transcribe-zoom.sh ~/Downloads/zoom_0.mp4
```

### For Live Meetings (Using Tactiq or Fireflies)

Just join the meeting - the service will handle transcription automatically!

## Step 4: Get Your Transcript

Transcripts are saved to:
```
~/.openclaw/workspace/transcripts/
```

Files created:
- `meeting_20260208_120000.txt` - Plain text
- `meeting_20260208_120000.json` - With timestamps
- `meeting_20260208_120000.srt` - Subtitle format

## Your Meeting Details

**Meeting Link:** https://us06web.zoom.us/j/9373111709?pwd=...
**Meeting ID:** 9373111709

## Recommended Approach

For your needs, I recommend:

1. **Start with Tactiq** (free, no setup):
   - Install extension
   - Join meeting via Chrome
   - Get instant transcripts

2. **Upgrade to Fireflies.ai** if you have regular meetings:
   - 8,000 free minutes/month
   - Automatic transcription
   - No manual work needed

3. **Use OpenAI Whisper** for critical meetings:
   - Highest accuracy (95%+)
   - Good for legal/medical content
   - Only ~$0.36 per hour

## Testing the Skill

```bash
# Test with a sample file
echo "This is a test" | say -o /tmp/test.m4a
~/.openclaw/workspace/skills/zoom-transcription/transcribe-zoom.sh /tmp/test.m4a
```

## Next Steps

1. Install dependencies: `brew install ffmpeg jq`
2. Choose transcription method (see above)
3. Test with a small file
4. Use with your Zoom meetings!

Need help? Just ask OpenClaw: "Help me transcribe Zoom meetings"
