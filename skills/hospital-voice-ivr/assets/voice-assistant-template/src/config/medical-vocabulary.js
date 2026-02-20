/**
 * Medical Vocabulary for ASR Enhancement
 * 
 * These keywords are sent to the Speech-to-Text provider
 * to improve recognition accuracy for medical terms.
 */

export const medicalKeywords = {
  // Orthopedic Procedures
  procedures: [
    "TKR", "Total Knee Replacement", "टोटल नी रिप्लेसमेंट",
    "THR", "Total Hip Replacement", "टोटल हिप रिप्लेसमेंट",
    "arthroscopy", "आर्थ्रोस्कोपी",
    "arthroplasty", "आर्थ्रोप्लास्टी",
    "osteotomy", "ऑस्टियोटॉमी",
    "ACL reconstruction", "ACL रिकंस्ट्रक्शन",
    "meniscectomy", "मेनिस्केक्टॉमी",
    "laminectomy", "लैमिनेक्टॉमी",
    "discectomy", "डिस्केक्टॉमी",
    "spinal fusion", "स्पाइनल फ्यूजन",
    "ORIF", "Open Reduction Internal Fixation",
  ],

  // Common Conditions
  conditions: [
    "fracture", "फ्रैक्चर", "टूटी हड्डी",
    "arthritis", "गठिया", "आर्थराइटिस",
    "osteoarthritis", "ऑस्टियोआर्थराइटिस",
    "rheumatoid arthritis", "रूमेटोइड आर्थराइटिस",
    "osteoporosis", "ऑस्टियोपोरोसिस", "हड्डियों की कमजोरी",
    "spondylitis", "स्पोंडिलाइटिस",
    "sciatica", "साइटिका",
    "slipped disc", "स्लिप्ड डिस्क", "डिस्क खिसकना",
    "ligament tear", "लिगामेंट टियर",
    "tendonitis", "टेंडोनाइटिस",
    "bursitis", "बर्साइटिस",
    "dislocation", "डिस्लोकेशन", "हड्डी उतरना",
    "sprain", "मोच",
    "joint pain", "जोड़ों का दर्द",
    "back pain", "कमर दर्द", "पीठ दर्द",
    "neck pain", "गर्दन दर्द",
    "knee pain", "घुटने का दर्द",
    "shoulder pain", "कंधे का दर्द",
  ],

  // Body Parts
  bodyParts: [
    "knee", "घुटना",
    "hip", "कूल्हा",
    "shoulder", "कंधा",
    "spine", "रीढ़",
    "ankle", "टखना",
    "wrist", "कलाई",
    "elbow", "कोहनी",
    "neck", "गर्दन",
    "back", "पीठ", "कमर",
    "bone", "हड्डी",
    "joint", "जोड़",
    "muscle", "मांसपेशी",
    "ligament", "लिगामेंट",
    "tendon", "टेंडन",
    "cartilage", "कार्टिलेज",
  ],

  // Departments & Services
  departments: [
    "OPD", "ओपीडी", "बाह्य रोगी विभाग",
    "IPD", "आईपीडी", "आंतरिक रोगी विभाग",
    "orthopedics", "ऑर्थोपेडिक्स", "हड्डी विभाग",
    "physiotherapy", "फिजियोथेरेपी",
    "radiology", "रेडियोलॉजी", "एक्स-रे",
    "X-ray", "एक्स-रे",
    "MRI", "एमआरआई",
    "CT scan", "सीटी स्कैन",
    "ultrasound", "अल्ट्रासाउंड",
    "pathology", "पैथोलॉजी",
    "pharmacy", "फार्मेसी", "दवाखाना",
    "emergency", "इमरजेंसी", "आपातकालीन",
    "ICU", "आईसीयू",
    "operation theater", "ऑपरेशन थिएटर", "OT",
  ],

  // Common Medical Terms
  general: [
    "appointment", "अपॉइंटमेंट", "मिलने का समय",
    "consultation", "परामर्श",
    "check-up", "चेकअप", "जांच",
    "treatment", "इलाज", "उपचार",
    "surgery", "सर्जरी", "ऑपरेशन",
    "admission", "भर्ती", "एडमिशन",
    "discharge", "छुट्टी", "डिस्चार्ज",
    "doctor", "डॉक्टर",
    "nurse", "नर्स",
    "medicine", "दवाई",
    "injection", "इंजेक्शन",
    "bandage", "पट्टी",
    "plaster", "प्लास्टर",
    "cast", "कास्ट",
    "crutches", "बैसाखी",
    "wheelchair", "व्हीलचेयर",
    "insurance", "बीमा", "इंश्योरेंस",
    "bill", "बिल",
    "payment", "भुगतान", "पेमेंट",
    "report", "रिपोर्ट",
  ],

  // Hospital-Specific
  hospitalSpecific: [
    "Hope Hospital", "होप हॉस्पिटल",
    "Ayushman Hospital", "आयुष्मान हॉस्पिटल",
    "Dr. Murali", "डॉक्टर मुरली",
    "Dr. BK Murali", "डॉक्टर बीके मुरली",
  ],

  // Numbers & Time (Hindi)
  numbersTime: [
    "एक", "दो", "तीन", "चार", "पांच",
    "छह", "सात", "आठ", "नौ", "दस",
    "सुबह", "दोपहर", "शाम", "रात",
    "आज", "कल", "परसों",
    "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार", "रविवार",
  ]
};

/**
 * Get all keywords as flat array for ASR providers
 */
export function getAllKeywords() {
  return Object.values(medicalKeywords).flat();
}

/**
 * Get keywords for specific category
 */
export function getKeywordsByCategory(category) {
  return medicalKeywords[category] || [];
}

export default medicalKeywords;
