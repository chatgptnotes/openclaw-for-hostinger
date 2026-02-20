/**
 * Intent Recognition for Hospital IVR
 * 
 * Detects patient intent from transcribed speech.
 * Supports both Hindi and English inputs.
 */

/**
 * Intent definitions with Hindi/English keywords
 */
const intents = {
  appointment: {
    keywords: {
      hi: ['अपॉइंटमेंट', 'मिलना', 'दिखाना', 'समय', 'बुक', 'डॉक्टर से मिलना', 'OPD', 'ओपीडी', 'चेकअप'],
      en: ['appointment', 'book', 'schedule', 'see doctor', 'opd', 'checkup', 'consultation', 'visit'],
    },
    response: 'appointmentPrompt',
    action: 'BOOK_APPOINTMENT',
  },
  
  doctorInfo: {
    keywords: {
      hi: ['डॉक्टर', 'मुरली', 'कौन', 'स्पेशलिस्ट', 'विशेषज्ञ', 'हड्डी डॉक्टर'],
      en: ['doctor', 'murali', 'specialist', 'orthopedic', 'bone doctor', 'surgeon'],
    },
    response: 'doctorInfo',
    action: 'DOCTOR_INFO',
  },
  
  availability: {
    keywords: {
      hi: ['उपलब्ध', 'खुला', 'बंद', 'समय', 'टाइमिंग', 'कब', 'आज'],
      en: ['available', 'open', 'closed', 'timing', 'hours', 'when', 'today'],
    },
    response: 'opdTimings',
    action: 'CHECK_AVAILABILITY',
  },
  
  emergency: {
    keywords: {
      hi: ['इमरजेंसी', 'आपातकालीन', 'तुरंत', 'जल्दी', 'एक्सीडेंट', 'गिर गया', 'खून'],
      en: ['emergency', 'urgent', 'accident', 'fell', 'bleeding', 'immediately', 'help'],
    },
    response: 'emergencyRouting',
    action: 'ROUTE_EMERGENCY',
    priority: 'high',
  },
  
  fracture: {
    keywords: {
      hi: ['फ्रैक्चर', 'टूटी', 'हड्डी टूटी', 'टूट गई', 'चोट'],
      en: ['fracture', 'broken', 'bone broke', 'injury', 'crack'],
    },
    response: 'fractureInfo',
    action: 'FRACTURE_INFO',
  },
  
  tkr: {
    keywords: {
      hi: ['घुटना', 'नी रिप्लेसमेंट', 'TKR', 'घुटने का ऑपरेशन', 'गठिया', 'आर्थराइटिस'],
      en: ['knee', 'knee replacement', 'tkr', 'knee surgery', 'arthritis', 'joint replacement'],
    },
    response: 'tkrInfo',
    action: 'TKR_INFO',
  },
  
  physiotherapy: {
    keywords: {
      hi: ['फिजियोथेरेपी', 'एक्सरसाइज', 'रिहैब', 'दर्द'],
      en: ['physiotherapy', 'physio', 'exercise', 'rehab', 'pain management'],
    },
    response: 'physiotherapyInfo',
    action: 'PHYSIO_INFO',
  },
  
  billing: {
    keywords: {
      hi: ['बिल', 'पैसा', 'भुगतान', 'खर्च', 'कितना'],
      en: ['bill', 'payment', 'cost', 'charge', 'expense', 'how much'],
    },
    response: 'billingInfo',
    action: 'BILLING_INFO',
  },
  
  insurance: {
    keywords: {
      hi: ['इंश्योरेंस', 'बीमा', 'आयुष्मान', 'कैशलेस', 'क्लेम'],
      en: ['insurance', 'ayushman', 'cashless', 'claim', 'coverage', 'policy'],
    },
    response: 'insuranceInfo',
    action: 'INSURANCE_INFO',
  },
  
  admission: {
    keywords: {
      hi: ['भर्ती', 'एडमिशन', 'मरीज', 'वार्ड', 'बेड', 'IPD'],
      en: ['admission', 'admit', 'patient', 'ward', 'bed', 'ipd', 'inpatient'],
    },
    response: 'admissionStatus',
    action: 'ADMISSION_INFO',
  },
  
  greeting: {
    keywords: {
      hi: ['नमस्ते', 'हैलो', 'हाय', 'शुभ'],
      en: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    },
    response: 'welcome',
    action: 'GREET',
  },
  
  thanks: {
    keywords: {
      hi: ['धन्यवाद', 'शुक्रिया', 'थैंक्स'],
      en: ['thank', 'thanks', 'thank you', 'appreciate'],
    },
    response: 'goodbye',
    action: 'GOODBYE',
  },
  
  goodbye: {
    keywords: {
      hi: ['अलविदा', 'बाय', 'फिर मिलेंगे', 'ठीक है', 'बस'],
      en: ['bye', 'goodbye', 'done', 'that\'s all', 'finished'],
    },
    response: 'goodbye',
    action: 'GOODBYE',
  },
};

/**
 * Recognize intent from transcribed text
 * @param {string} text - Transcribed speech
 * @param {string} language - Detected language
 * @returns {{intent: string, confidence: number, action: string, response: string}}
 */
export function recognizeIntent(text, language = 'hi') {
  const normalizedText = text.toLowerCase();
  let bestMatch = null;
  let highestScore = 0;
  
  for (const [intentName, intentData] of Object.entries(intents)) {
    const keywords = [
      ...(intentData.keywords.hi || []),
      ...(intentData.keywords.en || []),
    ];
    
    let score = 0;
    let matchedKeywords = [];
    
    for (const keyword of keywords) {
      if (normalizedText.includes(keyword.toLowerCase())) {
        score += keyword.length; // Longer keywords = higher weight
        matchedKeywords.push(keyword);
      }
    }
    
    // Bonus for priority intents (like emergency)
    if (intentData.priority === 'high' && score > 0) {
      score *= 2;
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = {
        intent: intentName,
        confidence: Math.min(score / 20, 1), // Normalize to 0-1
        action: intentData.action,
        response: intentData.response,
        matchedKeywords,
      };
    }
  }
  
  // If no match, return notUnderstood
  if (!bestMatch || bestMatch.confidence < 0.1) {
    return {
      intent: 'unknown',
      confidence: 0,
      action: 'UNKNOWN',
      response: 'notUnderstood',
      matchedKeywords: [],
    };
  }
  
  return bestMatch;
}

/**
 * Extract entities from text (dates, times, names)
 */
export function extractEntities(text, language = 'hi') {
  const entities = {
    date: null,
    time: null,
    doctor: null,
    bodyPart: null,
    procedure: null,
  };
  
  const normalizedText = text.toLowerCase();
  
  // Date extraction (simple patterns)
  const datePatterns = {
    today: ['आज', 'today', 'aaj'],
    tomorrow: ['कल', 'tomorrow', 'kal'],
    dayAfter: ['परसों', 'day after tomorrow', 'parson'],
  };
  
  for (const [dateType, patterns] of Object.entries(datePatterns)) {
    if (patterns.some(p => normalizedText.includes(p))) {
      const now = new Date();
      switch (dateType) {
        case 'today':
          entities.date = now;
          break;
        case 'tomorrow':
          entities.date = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          break;
        case 'dayAfter':
          entities.date = new Date(now.getTime() + 48 * 60 * 60 * 1000);
          break;
      }
    }
  }
  
  // Time extraction
  const timePatterns = [
    { pattern: /(\d{1,2})\s*(बजे|baje|am|pm|o'clock)/i, extract: (m) => parseInt(m[1]) },
    { pattern: /सुबह|morning/i, extract: () => 10 },
    { pattern: /दोपहर|afternoon/i, extract: () => 14 },
    { pattern: /शाम|evening/i, extract: () => 17 },
  ];
  
  for (const { pattern, extract } of timePatterns) {
    const match = normalizedText.match(pattern);
    if (match) {
      entities.time = extract(match);
      break;
    }
  }
  
  // Doctor extraction
  if (normalizedText.includes('मुरली') || normalizedText.includes('murali')) {
    entities.doctor = 'Dr. BK Murali';
  }
  
  // Body part extraction
  const bodyParts = {
    'घुटना|knee': 'knee',
    'कूल्हा|hip': 'hip',
    'कंधा|shoulder': 'shoulder',
    'पीठ|कमर|back': 'back',
    'गर्दन|neck': 'neck',
    'टखना|ankle': 'ankle',
  };
  
  for (const [patterns, part] of Object.entries(bodyParts)) {
    const regex = new RegExp(patterns, 'i');
    if (regex.test(normalizedText)) {
      entities.bodyPart = part;
      break;
    }
  }
  
  // Procedure extraction
  const procedures = {
    'tkr|नी रिप्लेसमेंट|knee replacement': 'TKR',
    'thr|हिप रिप्लेसमेंट|hip replacement': 'THR',
    'आर्थ्रोस्कोपी|arthroscopy': 'Arthroscopy',
    'फ्रैक्चर|fracture': 'Fracture Treatment',
  };
  
  for (const [patterns, proc] of Object.entries(procedures)) {
    const regex = new RegExp(patterns, 'i');
    if (regex.test(normalizedText)) {
      entities.procedure = proc;
      break;
    }
  }
  
  return entities;
}

/**
 * Get follow-up questions based on intent
 */
export function getFollowUpQuestions(intent, entities, language) {
  const questions = [];
  
  if (intent === 'appointment') {
    if (!entities.date) {
      questions.push({
        hi: 'आपको कब आना है - आज, कल, या किसी और दिन?',
        en: 'When would you like to come - today, tomorrow, or another day?',
      });
    }
    if (!entities.time && entities.date) {
      questions.push({
        hi: 'कौन सा समय चाहिए - सुबह, दोपहर, या शाम?',
        en: 'What time would you prefer - morning, afternoon, or evening?',
      });
    }
  }
  
  return questions.map(q => q[language] || q.en);
}

export default { recognizeIntent, extractEntities, getFollowUpQuestions };
