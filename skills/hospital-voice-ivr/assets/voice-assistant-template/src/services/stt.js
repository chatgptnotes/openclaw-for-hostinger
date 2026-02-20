/**
 * Speech-to-Text Service
 * 
 * Supports multiple providers with Hindi language and medical vocabulary.
 * Recommended: Sarvam AI for best Hindi recognition.
 */

import axios from 'axios';
import { getAllKeywords } from '../config/medical-vocabulary.js';

const STT_PROVIDER = process.env.STT_PROVIDER || 'sarvam';

/**
 * Transcribe audio to text
 * @param {Buffer} audioBuffer - Audio data
 * @param {string} language - 'hi' or 'en'
 * @returns {Promise<{text: string, confidence: number, language: string}>}
 */
export async function transcribe(audioBuffer, language = 'hi') {
  switch (STT_PROVIDER) {
    case 'sarvam':
      return transcribeWithSarvam(audioBuffer, language);
    case 'google':
      return transcribeWithGoogle(audioBuffer, language);
    case 'azure':
      return transcribeWithAzure(audioBuffer, language);
    case 'deepgram':
      return transcribeWithDeepgram(audioBuffer, language);
    default:
      throw new Error(`Unknown STT provider: ${STT_PROVIDER}`);
  }
}

/**
 * Sarvam AI - Best for Indian languages
 * https://www.sarvam.ai/
 */
async function transcribeWithSarvam(audioBuffer, language) {
  const response = await axios.post(
    'https://api.sarvam.ai/speech-to-text',
    {
      audio: audioBuffer.toString('base64'),
      language_code: language === 'hi' ? 'hi-IN' : 'en-IN',
      // Enable code-mixing (Hindi-English mix common in India)
      enable_code_switching: true,
      // Custom vocabulary for medical terms
      custom_vocabulary: getAllKeywords().slice(0, 100), // API limit
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.SARVAM_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return {
    text: response.data.transcript,
    confidence: response.data.confidence || 0.9,
    language: response.data.detected_language || language,
  };
}

/**
 * Google Cloud Speech-to-Text
 */
async function transcribeWithGoogle(audioBuffer, language) {
  // Google Cloud Speech API
  const speechClient = await getGoogleSpeechClient();
  
  const [response] = await speechClient.recognize({
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: language === 'hi' ? 'hi-IN' : 'en-IN',
      alternativeLanguageCodes: ['hi-IN', 'en-IN'],
      enableAutomaticPunctuation: true,
      // Medical vocabulary boosting
      speechContexts: [{
        phrases: getAllKeywords(),
        boost: 20,
      }],
      model: 'latest_long',
    },
    audio: {
      content: audioBuffer.toString('base64'),
    },
  });

  const result = response.results[0]?.alternatives[0];
  return {
    text: result?.transcript || '',
    confidence: result?.confidence || 0,
    language: response.results[0]?.languageCode || language,
  };
}

/**
 * Azure Cognitive Services Speech
 */
async function transcribeWithAzure(audioBuffer, language) {
  const response = await axios.post(
    `https://${process.env.AZURE_SPEECH_REGION}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1`,
    audioBuffer,
    {
      params: {
        language: language === 'hi' ? 'hi-IN' : 'en-IN',
      },
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.AZURE_SPEECH_KEY,
        'Content-Type': 'audio/wav',
      },
    }
  );

  return {
    text: response.data.DisplayText || '',
    confidence: response.data.Confidence || 0,
    language: language,
  };
}

/**
 * Deepgram - Fast and accurate
 */
async function transcribeWithDeepgram(audioBuffer, language) {
  const response = await axios.post(
    'https://api.deepgram.com/v1/listen',
    audioBuffer,
    {
      params: {
        language: language === 'hi' ? 'hi' : 'en-IN',
        model: 'nova-2',
        smart_format: true,
        // Keywords for medical terms
        keywords: getAllKeywords().slice(0, 50).join(','),
      },
      headers: {
        'Authorization': `Token ${process.env.DEEPGRAM_API_KEY}`,
        'Content-Type': 'audio/wav',
      },
    }
  );

  const result = response.data.results?.channels[0]?.alternatives[0];
  return {
    text: result?.transcript || '',
    confidence: result?.confidence || 0,
    language: response.data.results?.channels[0]?.detected_language || language,
  };
}

/**
 * Detect language from audio
 */
export async function detectLanguage(audioBuffer) {
  // First, try to transcribe with auto-detection
  const result = await transcribe(audioBuffer, 'hi');
  
  // Simple heuristic: check for Hindi Unicode characters
  const hindiPattern = /[\u0900-\u097F]/;
  const hasHindi = hindiPattern.test(result.text);
  
  // Check common Hindi words
  const hindiWords = ['है', 'का', 'की', 'को', 'में', 'हूं', 'चाहिए', 'कृपया', 'नमस्ते'];
  const hasHindiWords = hindiWords.some(word => result.text.includes(word));
  
  return {
    language: (hasHindi || hasHindiWords) ? 'hi' : 'en',
    confidence: result.confidence,
    text: result.text,
  };
}

// Lazy load Google client
let googleClient = null;
async function getGoogleSpeechClient() {
  if (!googleClient) {
    const { SpeechClient } = await import('@google-cloud/speech');
    googleClient = new SpeechClient();
  }
  return googleClient;
}

export default { transcribe, detectLanguage };
