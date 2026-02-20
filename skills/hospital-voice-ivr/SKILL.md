---
name: hospital-voice-ivr
description: Create patient-facing voice assistants and IVR systems for hospitals with Hindi+English bilingual support, medical terminology ASR, and warm Indian-accented voices. Use when building hospital call centers, appointment booking systems, patient inquiry lines, or any healthcare telephony solution requiring Indian language support and medical vocabulary recognition.
---

# Hospital Voice IVR

Build production-ready patient-facing voice assistants with:
- **Bilingual**: Hindi + English with code-switching
- **Medical ASR**: 200+ orthopedic/medical terms for accurate recognition
- **Indian Voices**: Warm, professional Indian-accented TTS
- **IVR Integration**: Twilio, Exotel, or custom SIP

## Quick Start

```bash
# Copy template to your project
cp -r assets/voice-assistant-template/ ./voice-assistant
cd voice-assistant
npm install
cp .env.example .env
# Configure API keys
npm start
```

## Architecture

```
Patient Call → IVR Gateway (Twilio/Exotel) → Voice AI Server
                                                   ↓
                    ┌──────────────────────────────┼──────────────────────────────┐
                    ↓                              ↓                              ↓
              Speech-to-Text              Intent Recognition              Text-to-Speech
              (Hindi/English)              (Medical Context)              (Indian Voice)
```

## Providers

### Speech-to-Text (ASR)
| Provider | Hindi Quality | Medical Terms | Recommended |
|----------|--------------|---------------|-------------|
| **Sarvam AI** | Excellent | Custom vocab | ✅ Best |
| Deepgram | Good | Keywords | Fallback |
| Azure | Good | Phrase lists | Enterprise |
| Google | Good | Speech contexts | Enterprise |

### Text-to-Speech
| Provider | Indian Voices | Warmth | Recommended |
|----------|--------------|--------|-------------|
| **Sarvam AI** | Meera, Pavithra, Arvind | Natural | ✅ Best |
| Azure | Swara, Neerja | Professional | Enterprise |
| ElevenLabs | Custom clone | Configurable | Premium |

### IVR Gateway
- **Exotel**: Popular in India, good rates
- **Twilio**: Global, excellent API

## Configuration

Set in `.env`:

```bash
# Providers
STT_PROVIDER=sarvam
TTS_PROVIDER=sarvam
IVR_PROVIDER=exotel

# API Keys
SARVAM_API_KEY=your_key
EXOTEL_SID=your_sid
EXOTEL_TOKEN=your_token

# Hospital
HOSPITAL_NAME=Hope Hospital
EMERGENCY_NUMBER=+917028083083
```

## Customization

### Add Medical Terms
Edit `src/config/medical-vocabulary.js`:
```javascript
procedures: [
  "Your procedure", "आपकी प्रक्रिया",
  // Add Hindi + English pairs
]
```

### Add Response Templates
Edit `src/config/responses.js`:
```javascript
myResponse: {
  hi: "हिंदी में जवाब",
  en: "English response"
}
```

### Add Intents
Edit `src/services/intent.js`:
```javascript
myIntent: {
  keywords: {
    hi: ['हिंदी', 'कीवर्ड'],
    en: ['english', 'keywords']
  },
  response: 'myResponse',
  action: 'MY_ACTION'
}
```

## Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/ivr/incoming` | POST | IVR entry (webhook from Twilio/Exotel) |
| `/ivr/process` | POST | Process speech/DTMF input |
| `/api/tts` | POST | Generate speech audio |
| `/api/stt` | POST | Transcribe audio |
| `/api/voices` | GET | List available voices |
| `/health` | GET | Health check |

## Supported Intents (Default)

- **appointment**: Book OPD appointments
- **doctorInfo**: Doctor information
- **availability**: OPD timings
- **emergency**: Route to emergency (priority)
- **fracture**: Fracture care info
- **tkr**: Knee replacement info
- **physiotherapy**: Physio department
- **billing**: Payment queries
- **insurance**: Ayushman/cashless info
- **admission**: Patient admission status

## Testing

```bash
npm test
```

Validates intent recognition for 20 test cases in Hindi and English.

## Files Reference

- `references/medical-vocabulary.md` - Complete medical term list
- `references/response-templates.md` - All bilingual responses
- `assets/voice-assistant-template/` - Complete project template
