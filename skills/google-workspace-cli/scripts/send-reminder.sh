#!/bin/bash
# Send appointment reminder email
# Usage: ./send-reminder.sh <to_email> <patient_name> <date> <time> <doctor>

TO="$1"
PATIENT="$2"
DATE="$3"
TIME="$4"
DOCTOR="${5:-Dr. BK Murali}"
ACCOUNT=${GOG_ACCOUNT:-cmd@hopehospital.com}

if [ -z "$TO" ] || [ -z "$PATIENT" ] || [ -z "$DATE" ] || [ -z "$TIME" ]; then
    echo "Usage: $0 <to_email> <patient_name> <date> <time> [doctor]"
    echo "Example: $0 patient@gmail.com 'Ramesh Kumar' '10 Feb 2026' '10:00 AM' 'Dr. Murali'"
    exit 1
fi

SUBJECT="Appointment Reminder - Hope Hospital"

BODY="Dear $PATIENT,

This is a reminder for your upcoming appointment:

📅 Date: $DATE
🕐 Time: $TIME
👨‍⚕️ Doctor: $DOCTOR
🏥 Location: Hope Hospital, Nagpur

Please arrive 15 minutes before your scheduled time.

Important:
• Bring your previous medical records
• Carry a valid ID proof
• Inform us if you need to reschedule

For queries, call: +91-7028083083

Best regards,
Hope Hospital Team

---
This is an automated reminder. Please do not reply to this email."

echo "📧 Sending reminder to $TO..."
echo "$BODY" | gog gmail send --to "$TO" --subject "$SUBJECT" --body-file - --account "$ACCOUNT"

if [ $? -eq 0 ]; then
    echo "✅ Reminder sent successfully!"
else
    echo "❌ Failed to send reminder"
    exit 1
fi
