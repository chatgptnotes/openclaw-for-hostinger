#!/bin/bash
# Shivaji Jayanti batch sender - sends 10 messages every 3 minutes

MESSAGE="छत्रपति शिवाजी महाराज जयंती की हार्दिक शुभकामनाएं! 🚩🙏"
CONTACTS_FILE="/Users/murali/.openclaw/workspace/memory/shivaji-jayanti-batch.json"
LOG_FILE="/Users/murali/.openclaw/workspace/memory/shivaji-jayanti-log.txt"
BATCH_SIZE=10
DELAY_SECONDS=180  # 3 minutes between batches

# Get total contacts
TOTAL=$(python3 -c "import json; print(len(json.load(open('$CONTACTS_FILE'))))")
echo "Total contacts: $TOTAL" | tee -a "$LOG_FILE"

SENT=0
while [ $SENT -lt $TOTAL ]; do
    echo "$(date): Sending batch starting at $SENT..." | tee -a "$LOG_FILE"
    
    # Send batch of 10
    python3 << PYEOF
import json
import subprocess
import time

with open('$CONTACTS_FILE', 'r') as f:
    contacts = json.load(f)

start = $SENT
end = min(start + $BATCH_SIZE, len(contacts))

for i in range(start, end):
    c = contacts[i]
    phone = c['phone']
    name = c['name']
    print(f"Sending to {name}: {phone}")
    
    # Use openclaw CLI to send
    result = subprocess.run([
        'openclaw', 'send', 
        '--channel', 'whatsapp',
        '--to', phone,
        '--message', '$MESSAGE'
    ], capture_output=True, text=True)
    
    if result.returncode != 0:
        print(f"  Error: {result.stderr}")
    else:
        print(f"  Sent!")
    
    time.sleep(1)  # 1 second between individual messages
PYEOF
    
    SENT=$((SENT + BATCH_SIZE))
    
    if [ $SENT -lt $TOTAL ]; then
        echo "$(date): Waiting 3 minutes before next batch..." | tee -a "$LOG_FILE"
        sleep $DELAY_SECONDS
    fi
done

echo "$(date): All messages sent!" | tee -a "$LOG_FILE"
