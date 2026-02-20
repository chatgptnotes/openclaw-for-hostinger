#!/bin/bash
# Show today's calendar events
# Usage: ./today-calendar.sh [calendar_id] [account]

CALENDAR=${1:-primary}
ACCOUNT=${2:-$GOG_ACCOUNT}

if [ -z "$ACCOUNT" ]; then
    echo "Usage: $0 [calendar_id] [account]"
    echo "Or set GOG_ACCOUNT environment variable"
    exit 1
fi

# Get today's date range in ISO format
TODAY=$(date +%Y-%m-%d)
TOMORROW=$(date -v+1d +%Y-%m-%d 2>/dev/null || date -d tomorrow +%Y-%m-%d)

# Get timezone offset
TZ_OFFSET=$(date +%z | sed 's/\(..\)$/:\1/')

FROM="${TODAY}T00:00:00${TZ_OFFSET}"
TO="${TODAY}T23:59:59${TZ_OFFSET}"

echo "📅 Calendar for $TODAY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

gog calendar events "$CALENDAR" --from "$FROM" --to "$TO" --account "$ACCOUNT" 2>/dev/null | while read -r line; do
    echo "  🕐 $line"
done

if [ $? -ne 0 ] || [ -z "$(gog calendar events "$CALENDAR" --from "$FROM" --to "$TO" --account "$ACCOUNT" 2>/dev/null)" ]; then
    echo "  📭 No events scheduled for today."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
