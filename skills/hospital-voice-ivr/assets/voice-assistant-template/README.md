# Hope Hospital Voice Assistant / IVR

Patient-facing voice assistant with Hindi support, medical terminology recognition, and warm Indian-accented voice.

## Features

- 🇮🇳 **Bilingual Support** - Hindi + English
- 🏥 **Medical Keywords** - Orthopedics, TKR, fracture, physiotherapy, OPD, IPD, etc.
- 🎙️ **Indian Voice** - Warm, professional Indian-accented TTS
- 📞 **IVR Ready** - Works with Twilio, Exotel, or any SIP provider

## Quick Start

```bash
cd voice-assistant
npm install
cp .env.example .env
# Configure your API keys
npm start
```

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Patient Call  │────▶│  IVR Gateway     │────▶│  Voice AI       │
│   (Phone/VoIP)  │     │  (Twilio/Exotel) │     │  (This System)  │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                                         │
                    ┌────────────────────────────────────┼────────────────────────────────────┐
                    │                                    │                                    │
                    ▼                                    ▼                                    ▼
           ┌─────────────────┐              ┌─────────────────────┐              ┌─────────────────┐
           │  Speech-to-Text │              │  Intent Recognition │              │  Text-to-Speech │
           │  (Hindi/English)│              │  (Medical Context)  │              │  (Indian Voice) │
           └─────────────────┘              └─────────────────────┘              └─────────────────┘
```

## Supported Intents

1. **Appointment Booking** - OPD scheduling
2. **Doctor Availability** - Check which doctors are available
3. **Hospital Timings** - OPD/Emergency hours
4. **Department Info** - Orthopedics, Physiotherapy, etc.
5. **Emergency** - Immediate routing to emergency line
6. **Admission Status** - Patient admission queries
7. **Billing Queries** - Payment and bill information

## Configuration

See `.env.example` for all configuration options.

## License

Proprietary - Hope Hospital
