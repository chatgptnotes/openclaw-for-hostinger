/**
 * Hope Hospital Voice Assistant / IVR
 * 
 * Patient-facing voice assistant with:
 * - Hindi + English bilingual support
 * - Medical terminology recognition
 * - Warm Indian-accented voice
 */

import express from 'express';
import { config } from 'dotenv';
import { transcribe, detectLanguage } from './services/stt.js';
import { speak, getAvailableVoices } from './services/tts.js';
import { recognizeIntent, extractEntities, getFollowUpQuestions } from './services/intent.js';
import { getResponse, getBilingualResponse } from './config/responses.js';
import { getAllKeywords } from './config/medical-vocabulary.js';

config(); // Load .env

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: 'audio/*', limit: '10mb' }));

const PORT = process.env.PORT || 3000;

// Session state storage (use Redis in production)
const sessions = new Map();

/**
 * Main IVR entry point - called when patient calls
 */
app.post('/ivr/incoming', async (req, res) => {
  const callSid = req.body.CallSid || req.body.call_sid || generateSessionId();
  const callerNumber = req.body.From || req.body.from || 'unknown';
  
  console.log(`📞 Incoming call from ${callerNumber}`);
  
  // Initialize session
  sessions.set(callSid, {
    language: process.env.DEFAULT_LANGUAGE || 'hi',
    turn: 0,
    context: {},
    callerNumber,
    startTime: Date.now(),
  });
  
  // Generate welcome message with language detection
  const welcomeText = getBilingualResponse('welcomeWithOptions');
  const audioBuffer = await speak(welcomeText, 'hi');
  
  // Return TwiML/Exotel response
  res.type('text/xml');
  res.send(generateVoiceResponse({
    say: welcomeText,
    gather: {
      input: 'speech dtmf',
      timeout: 5,
      speechTimeout: 'auto',
      action: '/ivr/process',
      language: 'hi-IN',
    },
  }));
});

/**
 * Process patient speech/DTMF input
 */
app.post('/ivr/process', async (req, res) => {
  const callSid = req.body.CallSid || req.body.call_sid;
  const speechResult = req.body.SpeechResult || req.body.speech_result || '';
  const digits = req.body.Digits || req.body.digits || '';
  
  let session = sessions.get(callSid) || { language: 'hi', turn: 0, context: {} };
  session.turn++;
  
  console.log(`🎤 Input: "${speechResult || digits}" | Session: ${callSid}`);
  
  let responseText = '';
  let action = 'CONTINUE';
  
  // Handle DTMF input
  if (digits) {
    switch (digits) {
      case '1':
        responseText = getResponse('appointmentPrompt', session.language);
        session.context.intent = 'appointment';
        break;
      case '2':
        responseText = getResponse('doctorInfo', session.language);
        break;
      case '3':
        responseText = getResponse('emergencyRouting', session.language);
        action = 'TRANSFER_EMERGENCY';
        break;
      case '0':
        responseText = getResponse('welcomeWithOptions', session.language);
        break;
      default:
        responseText = getResponse('notUnderstood', session.language);
    }
  }
  // Handle speech input
  else if (speechResult) {
    // Detect language if first speech input
    if (session.turn <= 2) {
      const hindiPattern = /[\u0900-\u097F]/;
      const hindiWords = ['है', 'का', 'की', 'को', 'में', 'हूं', 'चाहिए', 'नमस्ते', 'हां', 'नहीं'];
      if (hindiPattern.test(speechResult) || hindiWords.some(w => speechResult.includes(w))) {
        session.language = 'hi';
      } else {
        session.language = 'en';
      }
    }
    
    // Recognize intent
    const intentResult = recognizeIntent(speechResult, session.language);
    const entities = extractEntities(speechResult, session.language);
    
    console.log(`🎯 Intent: ${intentResult.intent} (${intentResult.confidence.toFixed(2)}) | Entities:`, entities);
    
    // Store in context
    session.context = { ...session.context, ...entities, lastIntent: intentResult.intent };
    
    // Generate response
    responseText = getResponse(intentResult.response, session.language, {
      doctor: entities.doctor || 'Dr. BK Murali',
      date: entities.date ? formatDate(entities.date, session.language) : '',
      time: entities.time ? formatTime(entities.time, session.language) : '',
    });
    
    // Handle special actions
    if (intentResult.action === 'ROUTE_EMERGENCY') {
      action = 'TRANSFER_EMERGENCY';
    } else if (intentResult.action === 'GOODBYE') {
      action = 'HANGUP';
    }
    
    // Add follow-up questions if needed
    const followUps = getFollowUpQuestions(intentResult.intent, entities, session.language);
    if (followUps.length > 0) {
      responseText += ' ' + followUps[0];
    }
  }
  // No input
  else {
    responseText = getResponse('notUnderstood', session.language);
  }
  
  // Update session
  sessions.set(callSid, session);
  
  // Generate response
  res.type('text/xml');
  
  if (action === 'TRANSFER_EMERGENCY') {
    res.send(generateVoiceResponse({
      say: responseText,
      dial: process.env.EMERGENCY_NUMBER || '+917028083083',
    }));
  } else if (action === 'HANGUP') {
    res.send(generateVoiceResponse({
      say: responseText,
      hangup: true,
    }));
  } else {
    res.send(generateVoiceResponse({
      say: responseText,
      gather: {
        input: 'speech dtmf',
        timeout: 5,
        speechTimeout: 'auto',
        action: '/ivr/process',
        language: session.language === 'hi' ? 'hi-IN' : 'en-IN',
      },
    }));
  }
});

/**
 * Generate TTS audio (for testing or custom integrations)
 */
app.post('/api/tts', async (req, res) => {
  const { text, language = 'hi', voice } = req.body;
  
  try {
    const audioBuffer = await speak(text, language, { voice });
    res.type('audio/mp3').send(audioBuffer);
  } catch (error) {
    console.error('TTS Error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Speech-to-Text endpoint (for testing or custom integrations)
 */
app.post('/api/stt', async (req, res) => {
  const language = req.query.language || 'hi';
  
  try {
    const result = await transcribe(req.body, language);
    res.json(result);
  } catch (error) {
    console.error('STT Error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get medical vocabulary (for debugging/tuning)
 */
app.get('/api/vocabulary', (req, res) => {
  res.json({
    keywords: getAllKeywords(),
    count: getAllKeywords().length,
  });
});

/**
 * Get available voices
 */
app.get('/api/voices', (req, res) => {
  res.json(getAvailableVoices());
});

/**
 * Health check
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    activeSessions: sessions.size,
    provider: {
      stt: process.env.STT_PROVIDER,
      tts: process.env.TTS_PROVIDER,
      ivr: process.env.IVR_PROVIDER,
    },
  });
});

// Helper functions
function generateSessionId() {
  return 'sess_' + Math.random().toString(36).substring(2, 15);
}

function generateVoiceResponse(options) {
  const provider = process.env.IVR_PROVIDER || 'twilio';
  
  if (provider === 'twilio') {
    return generateTwiML(options);
  } else if (provider === 'exotel') {
    return generateExotelML(options);
  }
  return generateTwiML(options); // Default to TwiML
}

function generateTwiML(options) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?><Response>';
  
  if (options.say) {
    xml += `<Say voice="Polly.Aditi" language="hi-IN">${escapeXml(options.say)}</Say>`;
  }
  
  if (options.gather) {
    xml += `<Gather input="${options.gather.input}" timeout="${options.gather.timeout}" speechTimeout="${options.gather.speechTimeout}" action="${options.gather.action}" language="${options.gather.language}">`;
    xml += '</Gather>';
  }
  
  if (options.dial) {
    xml += `<Dial>${options.dial}</Dial>`;
  }
  
  if (options.hangup) {
    xml += '<Hangup/>';
  }
  
  xml += '</Response>';
  return xml;
}

function generateExotelML(options) {
  // Exotel uses similar XML format with minor differences
  let xml = '<?xml version="1.0" encoding="UTF-8"?><Response>';
  
  if (options.say) {
    xml += `<Say>${escapeXml(options.say)}</Say>`;
  }
  
  if (options.gather) {
    xml += `<Gather timeout="${options.gather.timeout}" action="${options.gather.action}">`;
    xml += '</Gather>';
  }
  
  if (options.dial) {
    xml += `<Dial><Number>${options.dial}</Number></Dial>`;
  }
  
  if (options.hangup) {
    xml += '<Hangup/>';
  }
  
  xml += '</Response>';
  return xml;
}

function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDate(date, language) {
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', options);
}

function formatTime(hour, language) {
  const period = hour >= 12 ? (language === 'hi' ? 'दोपहर' : 'PM') : (language === 'hi' ? 'सुबह' : 'AM');
  const displayHour = hour > 12 ? hour - 12 : hour;
  return language === 'hi' ? `${displayHour} बजे ${period}` : `${displayHour} ${period}`;
}

// Start server
app.listen(PORT, () => {
  console.log(`
  🏥 Hope Hospital Voice Assistant
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🌐 Server running on port ${PORT}
  📞 IVR Provider: ${process.env.IVR_PROVIDER || 'twilio'}
  🎤 STT Provider: ${process.env.STT_PROVIDER || 'sarvam'}
  🔊 TTS Provider: ${process.env.TTS_PROVIDER || 'sarvam'}
  🌍 Default Language: ${process.env.DEFAULT_LANGUAGE || 'hi'}
  
  Endpoints:
  - POST /ivr/incoming  - IVR entry point
  - POST /ivr/process   - Process speech/DTMF
  - POST /api/tts       - Text-to-Speech
  - POST /api/stt       - Speech-to-Text
  - GET  /api/voices    - Available voices
  - GET  /health        - Health check
  `);
});

export default app;
