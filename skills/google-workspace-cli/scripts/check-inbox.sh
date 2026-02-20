#!/bin/bash
# Check unread emails from inbox
# Usage: ./check-inbox.sh [max_results] [account]

MAX=${1:-10}
ACCOUNT=${2:-$GOG_ACCOUNT}

if [ -z "$ACCOUNT" ]; then
    echo "Usage: $0 [max_results] [account]"
    echo "Or set GOG_ACCOUNT environment variable"
    exit 1
fi

echo "📬 Checking inbox for $ACCOUNT..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Get unread count
UNREAD=$(gog gmail search 'is:unread in:inbox' --account "$ACCOUNT" --json --max 100 2>/dev/null | jq 'length')
echo "📊 Unread messages: $UNREAD"
echo ""

# Show recent unread
if [ "$UNREAD" -gt 0 ]; then
    echo "📧 Recent unread emails:"
    echo ""
    gog gmail search 'is:unread in:inbox' --account "$ACCOUNT" --max "$MAX" 2>/dev/null | while read -r line; do
        echo "  • $line"
    done
else
    echo "✅ Inbox zero! No unread messages."
fi
