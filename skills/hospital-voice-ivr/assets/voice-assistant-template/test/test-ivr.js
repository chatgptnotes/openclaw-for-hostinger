/**
 * Voice Assistant Test Suite
 * 
 * Test intent recognition and responses in both Hindi and English.
 */

import { recognizeIntent, extractEntities } from '../src/services/intent.js';
import { getResponse, getBilingualResponse } from '../src/config/responses.js';
import { getAllKeywords } from '../src/config/medical-vocabulary.js';

console.log('🧪 Hope Hospital Voice Assistant - Test Suite\n');

// Test cases for intent recognition
const testCases = [
  // Hindi inputs
  { input: 'मुझे अपॉइंटमेंट चाहिए', expected: 'appointment', lang: 'hi' },
  { input: 'डॉक्टर मुरली से मिलना है', expected: 'appointment', lang: 'hi' },
  { input: 'OPD का टाइमिंग क्या है', expected: 'availability', lang: 'hi' },
  { input: 'इमरजेंसी है, तुरंत मदद चाहिए', expected: 'emergency', lang: 'hi' },
  { input: 'मेरा पैर टूट गया फ्रैक्चर है', expected: 'fracture', lang: 'hi' },
  { input: 'घुटना बहुत दर्द कर रहा है TKR के बारे में बताओ', expected: 'tkr', lang: 'hi' },
  { input: 'बिल कितना होगा', expected: 'billing', lang: 'hi' },
  { input: 'आयुष्मान कार्ड चलता है क्या', expected: 'insurance', lang: 'hi' },
  { input: 'नमस्ते', expected: 'greeting', lang: 'hi' },
  { input: 'धन्यवाद बाय', expected: 'thanks', lang: 'hi' },
  
  // English inputs
  { input: 'I need an appointment', expected: 'appointment', lang: 'en' },
  { input: 'What are the OPD timings', expected: 'availability', lang: 'en' },
  { input: 'Emergency help please', expected: 'emergency', lang: 'en' },
  { input: 'I have a fracture in my leg', expected: 'fracture', lang: 'en' },
  { input: 'Tell me about knee replacement surgery', expected: 'tkr', lang: 'en' },
  { input: 'How much will it cost', expected: 'billing', lang: 'en' },
  { input: 'Do you accept insurance', expected: 'insurance', lang: 'en' },
  { input: 'Hello', expected: 'greeting', lang: 'en' },
  
  // Mixed Hindi-English (code-switching)
  { input: 'Mujhe appointment chahiye doctor se', expected: 'appointment', lang: 'hi' },
  { input: 'Emergency hai please help', expected: 'emergency', lang: 'hi' },
];

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📋 Intent Recognition Tests');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

let passed = 0;
let failed = 0;

for (const test of testCases) {
  const result = recognizeIntent(test.input, test.lang);
  const status = result.intent === test.expected ? '✅' : '❌';
  
  if (result.intent === test.expected) {
    passed++;
  } else {
    failed++;
  }
  
  console.log(`${status} "${test.input}"`);
  console.log(`   Expected: ${test.expected} | Got: ${result.intent} (${(result.confidence * 100).toFixed(0)}%)`);
  console.log('');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`📊 Results: ${passed} passed, ${failed} failed`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Test entity extraction
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔍 Entity Extraction Tests');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const entityTests = [
  'कल सुबह 10 बजे डॉक्टर मुरली से मिलना है',
  'My knee is paining, need TKR consultation tomorrow',
  'आज शाम को घुटने की जांच करानी है',
];

for (const input of entityTests) {
  const entities = extractEntities(input, 'hi');
  console.log(`📝 "${input}"`);
  console.log(`   Entities:`, JSON.stringify(entities, null, 2).split('\n').join('\n   '));
  console.log('');
}

// Test vocabulary
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📚 Medical Vocabulary');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const keywords = getAllKeywords();
console.log(`Total medical keywords: ${keywords.length}`);
console.log(`Sample keywords: ${keywords.slice(0, 10).join(', ')}...`);
console.log('');

// Test responses
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔊 Response Templates');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const responseKeys = ['welcome', 'appointmentPrompt', 'doctorInfo', 'emergencyRouting'];
for (const key of responseKeys) {
  console.log(`[${key}]`);
  console.log(`  Hindi: ${getResponse(key, 'hi')}`);
  console.log(`  English: ${getResponse(key, 'en')}`);
  console.log('');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ All tests completed!');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
