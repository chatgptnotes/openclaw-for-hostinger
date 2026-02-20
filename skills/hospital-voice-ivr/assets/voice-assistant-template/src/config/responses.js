/**
 * Bilingual Response Templates (Hindi + English)
 * 
 * All responses have both Hindi and English versions
 * for seamless bilingual IVR experience.
 */

export const responses = {
  // Welcome & Greeting
  welcome: {
    hi: "होप हॉस्पिटल में आपका स्वागत है। मैं आपकी मदद के लिए यहां हूं। कृपया बताएं, आपको क्या सहायता चाहिए?",
    en: "Welcome to Hope Hospital. I'm here to help you. Please tell me, how may I assist you today?"
  },

  welcomeWithOptions: {
    hi: "होप हॉस्पिटल में आपका स्वागत है। अपॉइंटमेंट के लिए एक दबाएं। डॉक्टर की जानकारी के लिए दो दबाएं। इमरजेंसी के लिए तीन दबाएं। या अपनी बात हिंदी या अंग्रेजी में बोलें।",
    en: "Welcome to Hope Hospital. Press 1 for appointment. Press 2 for doctor information. Press 3 for emergency. Or speak in Hindi or English."
  },

  // Language Selection
  languagePrompt: {
    hi: "हिंदी के लिए एक दबाएं। For English, press 2.",
    en: "Press 1 for Hindi. For English, press 2."
  },

  // Appointment Related
  appointmentPrompt: {
    hi: "आपको किस डॉक्टर से मिलना है? या कौन सी समस्या है?",
    en: "Which doctor would you like to see? Or what is your problem?"
  },

  appointmentConfirm: {
    hi: "आपकी अपॉइंटमेंट {date} को {time} बजे डॉक्टर {doctor} के साथ बुक हो गई है। कन्फर्मेशन SMS आपके नंबर पर भेज दिया गया है।",
    en: "Your appointment is booked with Dr. {doctor} on {date} at {time}. Confirmation SMS has been sent to your number."
  },

  appointmentSlots: {
    hi: "डॉक्टर {doctor} के पास ये समय उपलब्ध हैं: {slots}। कौन सा समय चाहिए?",
    en: "Dr. {doctor} has these slots available: {slots}. Which time would you prefer?"
  },

  // Doctor Information
  doctorInfo: {
    hi: "डॉक्टर बीके मुरली, सीनियर ऑर्थोपेडिक सर्जन हैं। वे टोटल नी रिप्लेसमेंट, स्पाइन सर्जरी और फ्रैक्चर के विशेषज्ञ हैं। OPD का समय सुबह 10 से दोपहर 2 और शाम 5 से 8 बजे तक है।",
    en: "Dr. BK Murali is a Senior Orthopedic Surgeon. He specializes in Total Knee Replacement, Spine Surgery, and Fracture management. OPD timings are 10 AM to 2 PM and 5 PM to 8 PM."
  },

  doctorAvailability: {
    hi: "डॉक्टर {doctor} आज {status}। {details}",
    en: "Dr. {doctor} is {status} today. {details}"
  },

  // Hospital Timings
  opdTimings: {
    hi: "OPD का समय सुबह 9 बजे से रात 8 बजे तक है। रविवार को OPD बंद रहती है।",
    en: "OPD timings are 9 AM to 8 PM. OPD is closed on Sundays."
  },

  emergencyInfo: {
    hi: "इमरजेंसी सेवा 24 घंटे, 7 दिन उपलब्ध है। इमरजेंसी नंबर है 7028083083।",
    en: "Emergency services are available 24 hours, 7 days a week. Emergency number is 7028083083."
  },

  // Department Information
  orthopedicsInfo: {
    hi: "ऑर्थोपेडिक विभाग में हम जोड़ों की समस्या, फ्रैक्चर, टोटल नी और हिप रिप्लेसमेंट, स्पाइन सर्जरी का इलाज करते हैं।",
    en: "In our Orthopedics department, we treat joint problems, fractures, Total Knee and Hip Replacement, and Spine Surgery."
  },

  physiotherapyInfo: {
    hi: "फिजियोथेरेपी विभाग सुबह 8 बजे से शाम 6 बजे तक खुला है। सर्जरी के बाद रिहैब और दर्द प्रबंधन के लिए संपर्क करें।",
    en: "Physiotherapy department is open from 8 AM to 6 PM. Contact us for post-surgery rehab and pain management."
  },

  // Emergency Routing
  emergencyRouting: {
    hi: "आपको इमरजेंसी लाइन पर ट्रांसफर कर रहा हूं। कृपया लाइन पर रहें।",
    en: "Transferring you to the emergency line. Please stay on the line."
  },

  // Billing & Insurance
  billingInfo: {
    hi: "बिलिंग संबंधित जानकारी के लिए कृपया काउंटर पर संपर्क करें या 7028083083 पर कॉल करें।",
    en: "For billing related queries, please contact the counter or call 7028083083."
  },

  insuranceInfo: {
    hi: "हम सभी प्रमुख इंश्योरेंस कंपनियों और आयुष्मान भारत योजना को स्वीकार करते हैं।",
    en: "We accept all major insurance companies and Ayushman Bharat scheme."
  },

  // Patient Status
  admissionStatus: {
    hi: "मरीज की जानकारी के लिए कृपया मरीज का नाम या UHID नंबर बताएं।",
    en: "For patient information, please provide patient name or UHID number."
  },

  // Not Understood
  notUnderstood: {
    hi: "माफ कीजिए, मैं समझ नहीं पाया। कृपया दोबारा बोलें या मुख्य मेनू के लिए शून्य दबाएं।",
    en: "Sorry, I didn't understand. Please repeat or press 0 for main menu."
  },

  // Goodbye
  goodbye: {
    hi: "होप हॉस्पिटल को चुनने के लिए धन्यवाद। अपना ख्याल रखें। नमस्ते।",
    en: "Thank you for choosing Hope Hospital. Take care. Goodbye."
  },

  // Hold Messages
  holdMusic: {
    hi: "कृपया प्रतीक्षा करें, हम आपकी कॉल कनेक्ट कर रहे हैं।",
    en: "Please hold while we connect your call."
  },

  // Specific Procedure Info
  tkrInfo: {
    hi: "टोटल नी रिप्लेसमेंट में पूरे घुटने के जोड़ को कृत्रिम जोड़ से बदला जाता है। यह ऑपरेशन गंभीर गठिया के लिए किया जाता है। अधिक जानकारी के लिए OPD में आएं।",
    en: "Total Knee Replacement replaces the entire knee joint with an artificial joint. This surgery is done for severe arthritis. Please visit OPD for more information."
  },

  fractureInfo: {
    hi: "फ्रैक्चर होने पर तुरंत इमरजेंसी में आएं। X-ray और उचित इलाज के लिए हमारे विशेषज्ञ 24 घंटे उपलब्ध हैं।",
    en: "In case of fracture, come to emergency immediately. Our specialists are available 24 hours for X-ray and proper treatment."
  }
};

/**
 * Get response in specified language
 */
export function getResponse(key, lang = 'hi', replacements = {}) {
  let text = responses[key]?.[lang] || responses[key]?.['en'] || '';
  
  // Replace placeholders like {doctor}, {date}, etc.
  for (const [placeholder, value] of Object.entries(replacements)) {
    text = text.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), value);
  }
  
  return text;
}

/**
 * Get bilingual response (speaks both)
 */
export function getBilingualResponse(key, replacements = {}) {
  const hi = getResponse(key, 'hi', replacements);
  const en = getResponse(key, 'en', replacements);
  return `${hi} ... ${en}`;
}

export default responses;
