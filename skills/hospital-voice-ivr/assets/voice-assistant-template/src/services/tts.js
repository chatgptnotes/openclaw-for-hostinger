/**
 * Text-to-Speech Service
 * 
 * Provides warm, Indian-accented voices for patient communication.
 * Recommended: Sarvam AI for authentic Indian voices.
 */

import axios from 'axios';

const TTS_PROVIDER = process.env.TTS_PROVIDER || 'sarvam';

/**
 * Available Indian voices by provider
 */
export const indianVoices = {
  sarvam: {
    meera: { name: 'Meera', gender: 'female', style: 'warm, professional' },
    pavithra: { name: 'Pavithra', gender: 'female', style: 'gentle, caring' },
    maitreyi: { name: 'Maitreyi', gender: 'female', style: 'friendly, young' },
    arvind: { name: 'Arvind', gender: 'male', style: 'authoritative, clear' },
    karthik: { name: 'Karthik', gender: 'male', style: 'warm, reassuring' },
  },
  elevenlabs: {
    // Custom cloned or Indian-accent voices
    'indian-female': { name: 'Priya', gender: 'female', style: 'professional' },
    'indian-male': { name: 'Rahul', gender: 'male', style: 'warm' },
  },
  azure: {
    'hi-IN-SwaraNeural': { name: 'Swara', gender: 'female', style: 'professional' },
    'hi-IN-MadhurNeural': { name: 'Madhur', gender: 'male', style: 'friendly' },
    'en-IN-NeerjaNeural': { name: 'Neerja', gender: 'female', style: 'warm' },
    'en-IN-PrabhatNeural': { name: 'Prabhat', gender: 'male', style: 'clear' },
  },
  google: {
    'hi-IN-Wavenet-A': { name: 'Hindi Female A', gender: 'female', style: 'natural' },
    'hi-IN-Wavenet-B': { name: 'Hindi Male B', gender: 'male', style: 'natural' },
    'en-IN-Wavenet-A': { name: 'English Female A', gender: 'female', style: 'natural' },
    'en-IN-Wavenet-B': { name: 'English Male B', gender: 'male', style: 'natural' },
  },
};

/**
 * Convert text to speech
 * @param {string} text - Text to speak
 * @param {string} language - 'hi' or 'en'
 * @param {object} options - Voice options
 * @returns {Promise<Buffer>} - Audio buffer (MP3/WAV)
 */
export async function speak(text, language = 'hi', options = {}) {
  switch (TTS_PROVIDER) {
    case 'sarvam':
      return speakWithSarvam(text, language, options);
    case 'elevenlabs':
      return speakWithElevenLabs(text, language, options);
    case 'azure':
      return speakWithAzure(text, language, options);
    case 'google':
      return speakWithGoogle(text, language, options);
    default:
      throw new Error(`Unknown TTS provider: ${TTS_PROVIDER}`);
  }
}

/**
 * Sarvam AI TTS - Best for Hindi with natural Indian accent
 */
async function speakWithSarvam(text, language, options) {
  const voice = options.voice || process.env.SARVAM_TTS_VOICE || 'meera';
  
  const response = await axios.post(
    'https://api.sarvam.ai/text-to-speech',
    {
      text: text,
      language_code: language === 'hi' ? 'hi-IN' : 'en-IN',
      speaker: voice,
      // Warm, caring tone for hospital setting
      pitch: options.pitch || 0,
      speed: options.speed || 0.95, // Slightly slower for clarity
      // Enable SSML for better prosody
      enable_ssml: false,
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.SARVAM_API_KEY}`,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
    }
  );

  return Buffer.from(response.data);
}

/**
 * ElevenLabs TTS - High quality, requires custom Indian voice
 */
async function speakWithElevenLabs(text, language, options) {
  const voiceId = options.voiceId || process.env.ELEVENLABS_VOICE_ID;
  
  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      text: text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.75,
        similarity_boost: 0.75,
        style: 0.5,
        use_speaker_boost: true,
      },
    },
    {
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
    }
  );

  return Buffer.from(response.data);
}

/**
 * Azure Cognitive Services TTS
 */
async function speakWithAzure(text, language, options) {
  const voiceName = language === 'hi' 
    ? (options.voice || 'hi-IN-SwaraNeural')
    : (options.voice || 'en-IN-NeerjaNeural');

  const ssml = `
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${language === 'hi' ? 'hi-IN' : 'en-IN'}">
      <voice name="${voiceName}">
        <prosody rate="-5%" pitch="+0%">
          ${text}
        </prosody>
      </voice>
    </speak>
  `;

  const response = await axios.post(
    `https://${process.env.AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
    ssml,
    {
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.AZURE_SPEECH_KEY,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
      },
      responseType: 'arraybuffer',
    }
  );

  return Buffer.from(response.data);
}

/**
 * Google Cloud TTS
 */
async function speakWithGoogle(text, language, options) {
  const voiceName = language === 'hi'
    ? (options.voice || 'hi-IN-Wavenet-A')
    : (options.voice || 'en-IN-Wavenet-A');

  const response = await axios.post(
    'https://texttospeech.googleapis.com/v1/text:synthesize',
    {
      input: { text },
      voice: {
        languageCode: language === 'hi' ? 'hi-IN' : 'en-IN',
        name: voiceName,
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: 0.95,
        pitch: 0,
      },
    },
    {
      headers: {
        'Authorization': `Bearer ${await getGoogleAccessToken()}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return Buffer.from(response.data.audioContent, 'base64');
}

/**
 * Get available voices for current provider
 */
export function getAvailableVoices() {
  return indianVoices[TTS_PROVIDER] || {};
}

/**
 * Generate SSML for better prosody
 */
export function wrapInSSML(text, options = {}) {
  const { 
    rate = 'medium', 
    pitch = 'medium',
    emphasis = 'moderate'
  } = options;

  return `<speak>
    <prosody rate="${rate}" pitch="${pitch}">
      ${text}
    </prosody>
  </speak>`;
}

// Helper for Google auth
async function getGoogleAccessToken() {
  // Use application default credentials
  const { GoogleAuth } = await import('google-auth-library');
  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token;
}

export default { speak, getAvailableVoices, indianVoices };
