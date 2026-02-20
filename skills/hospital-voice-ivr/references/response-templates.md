# Response Templates Reference

All bilingual response templates for the IVR system.

## Welcome & Greeting

### welcome
```
Hindi: होप हॉस्पिटल में आपका स्वागत है। मैं आपकी मदद के लिए यहां हूं। कृपया बताएं, आपको क्या सहायता चाहिए?
English: Welcome to Hope Hospital. I'm here to help you. Please tell me, how may I assist you today?
```

### welcomeWithOptions
```
Hindi: होप हॉस्पिटल में आपका स्वागत है। अपॉइंटमेंट के लिए एक दबाएं। डॉक्टर की जानकारी के लिए दो दबाएं। इमरजेंसी के लिए तीन दबाएं। या अपनी बात हिंदी या अंग्रेजी में बोलें।
English: Welcome to Hope Hospital. Press 1 for appointment. Press 2 for doctor information. Press 3 for emergency. Or speak in Hindi or English.
```

## Appointment Related

### appointmentPrompt
```
Hindi: आपको किस डॉक्टर से मिलना है? या कौन सी समस्या है?
English: Which doctor would you like to see? Or what is your problem?
```

### appointmentConfirm
Template variables: `{date}`, `{time}`, `{doctor}`
```
Hindi: आपकी अपॉइंटमेंट {date} को {time} बजे डॉक्टर {doctor} के साथ बुक हो गई है। कन्फर्मेशन SMS आपके नंबर पर भेज दिया गया है।
English: Your appointment is booked with Dr. {doctor} on {date} at {time}. Confirmation SMS has been sent to your number.
```

### appointmentSlots
Template variables: `{doctor}`, `{slots}`
```
Hindi: डॉक्टर {doctor} के पास ये समय उपलब्ध हैं: {slots}। कौन सा समय चाहिए?
English: Dr. {doctor} has these slots available: {slots}. Which time would you prefer?
```

## Doctor Information

### doctorInfo
```
Hindi: डॉक्टर बीके मुरली, सीनियर ऑर्थोपेडिक सर्जन हैं। वे टोटल नी रिप्लेसमेंट, स्पाइन सर्जरी और फ्रैक्चर के विशेषज्ञ हैं। OPD का समय सुबह 10 से दोपहर 2 और शाम 5 से 8 बजे तक है।
English: Dr. BK Murali is a Senior Orthopedic Surgeon. He specializes in Total Knee Replacement, Spine Surgery, and Fracture management. OPD timings are 10 AM to 2 PM and 5 PM to 8 PM.
```

### doctorAvailability
Template variables: `{doctor}`, `{status}`, `{details}`
```
Hindi: डॉक्टर {doctor} आज {status}। {details}
English: Dr. {doctor} is {status} today. {details}
```

## Hospital Timings

### opdTimings
```
Hindi: OPD का समय सुबह 9 बजे से रात 8 बजे तक है। रविवार को OPD बंद रहती है।
English: OPD timings are 9 AM to 8 PM. OPD is closed on Sundays.
```

### emergencyInfo
```
Hindi: इमरजेंसी सेवा 24 घंटे, 7 दिन उपलब्ध है। इमरजेंसी नंबर है 7028083083।
English: Emergency services are available 24 hours, 7 days a week. Emergency number is 7028083083.
```

## Department Information

### orthopedicsInfo
```
Hindi: ऑर्थोपेडिक विभाग में हम जोड़ों की समस्या, फ्रैक्चर, टोटल नी और हिप रिप्लेसमेंट, स्पाइन सर्जरी का इलाज करते हैं।
English: In our Orthopedics department, we treat joint problems, fractures, Total Knee and Hip Replacement, and Spine Surgery.
```

### physiotherapyInfo
```
Hindi: फिजियोथेरेपी विभाग सुबह 8 बजे से शाम 6 बजे तक खुला है। सर्जरी के बाद रिहैब और दर्द प्रबंधन के लिए संपर्क करें।
English: Physiotherapy department is open from 8 AM to 6 PM. Contact us for post-surgery rehab and pain management.
```

## Emergency

### emergencyRouting
```
Hindi: आपको इमरजेंसी लाइन पर ट्रांसफर कर रहा हूं। कृपया लाइन पर रहें।
English: Transferring you to the emergency line. Please stay on the line.
```

## Billing & Insurance

### billingInfo
```
Hindi: बिलिंग संबंधित जानकारी के लिए कृपया काउंटर पर संपर्क करें या 7028083083 पर कॉल करें।
English: For billing related queries, please contact the counter or call 7028083083.
```

### insuranceInfo
```
Hindi: हम सभी प्रमुख इंश्योरेंस कंपनियों और आयुष्मान भारत योजना को स्वीकार करते हैं।
English: We accept all major insurance companies and Ayushman Bharat scheme.
```

## Patient Status

### admissionStatus
```
Hindi: मरीज की जानकारी के लिए कृपया मरीज का नाम या UHID नंबर बताएं।
English: For patient information, please provide patient name or UHID number.
```

## Procedure Information

### tkrInfo
```
Hindi: टोटल नी रिप्लेसमेंट में पूरे घुटने के जोड़ को कृत्रिम जोड़ से बदला जाता है। यह ऑपरेशन गंभीर गठिया के लिए किया जाता है। अधिक जानकारी के लिए OPD में आएं।
English: Total Knee Replacement replaces the entire knee joint with an artificial joint. This surgery is done for severe arthritis. Please visit OPD for more information.
```

### fractureInfo
```
Hindi: फ्रैक्चर होने पर तुरंत इमरजेंसी में आएं। X-ray और उचित इलाज के लिए हमारे विशेषज्ञ 24 घंटे उपलब्ध हैं।
English: In case of fracture, come to emergency immediately. Our specialists are available 24 hours for X-ray and proper treatment.
```

## Error Handling

### notUnderstood
```
Hindi: माफ कीजिए, मैं समझ नहीं पाया। कृपया दोबारा बोलें या मुख्य मेनू के लिए शून्य दबाएं।
English: Sorry, I didn't understand. Please repeat or press 0 for main menu.
```

## Goodbye

### goodbye
```
Hindi: होप हॉस्पिटल को चुनने के लिए धन्यवाद। अपना ख्याल रखें। नमस्ते।
English: Thank you for choosing Hope Hospital. Take care. Goodbye.
```

## Hold Messages

### holdMusic
```
Hindi: कृपया प्रतीक्षा करें, हम आपकी कॉल कनेक्ट कर रहे हैं।
English: Please hold while we connect your call.
```

---

## Adding Custom Responses

```javascript
// In src/config/responses.js
export const responses = {
  // ... existing responses ...
  
  myNewResponse: {
    hi: "हिंदी में आपका नया जवाब",
    en: "Your new response in English"
  }
};
```

Use template variables with `{placeholder}` syntax:
```javascript
getResponse('appointmentConfirm', 'hi', {
  date: 'कल',
  time: '10',
  doctor: 'मुरली'
});
```
