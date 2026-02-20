---
name: google-workspace-cli
description: Access Google Workspace (Gmail, Calendar, Drive, Contacts, Sheets, Docs) via the gog CLI. Use for email automation, calendar management, spreadsheet operations, document export, and contact lookup. Requires gog CLI installed and OAuth configured.
---

# Google Workspace CLI

Use `gog` CLI for Gmail, Calendar, Drive, Contacts, Sheets, and Docs operations.

## Prerequisites

```bash
# Install gog
brew install steipete/tap/gogcli

# Setup OAuth (once)
gog auth credentials /path/to/client_secret.json
gog auth add you@gmail.com --services gmail,calendar,drive,contacts,docs,sheets
```

## Quick Reference

### Gmail

```bash
# Search emails
gog gmail search 'newer_than:7d from:hospital' --max 10

# Search individual messages (not threads)
gog gmail messages search "in:inbox" --max 20

# Send email
gog gmail send --to patient@example.com --subject "Appointment" --body "Your appointment is confirmed."

# Send with file body
gog gmail send --to a@b.com --subject "Report" --body-file ./report.txt

# Send HTML email
gog gmail send --to a@b.com --subject "Update" --body-html "<p>Hello</p>"

# Reply to email
gog gmail send --to a@b.com --subject "Re: Query" --body "Reply" --reply-to-message-id <msgId>

# Create draft
gog gmail drafts create --to a@b.com --subject "Draft" --body-file ./message.txt

# Send draft
gog gmail drafts send <draftId>
```

### Calendar

```bash
# List events
gog calendar events primary --from 2026-02-09T00:00:00+05:30 --to 2026-02-15T23:59:59+05:30

# Create event
gog calendar create primary --summary "Team Meeting" --from 2026-02-10T10:00:00+05:30 --to 2026-02-10T11:00:00+05:30

# Create with color
gog calendar create primary --summary "Surgery" --from <iso> --to <iso> --event-color 11

# Update event
gog calendar update primary <eventId> --summary "Updated Title"

# Show color codes
gog calendar colors
```

### Drive

```bash
# Search files
gog drive search "name contains 'report'" --max 10

# Download file
gog drive download <fileId> --out ./local-file.pdf
```

### Sheets

```bash
# Read data
gog sheets get <sheetId> "Sheet1!A1:D10" --json

# Write data
gog sheets update <sheetId> "Sheet1!A1:B2" --values-json '[["Name","Value"],["Test","123"]]' --input USER_ENTERED

# Append rows
gog sheets append <sheetId> "Sheet1!A:C" --values-json '[["new","row","data"]]' --insert INSERT_ROWS

# Clear range
gog sheets clear <sheetId> "Sheet1!A2:Z"

# Get metadata
gog sheets metadata <sheetId> --json
```

### Docs

```bash
# Export as text
gog docs export <docId> --format txt --out /tmp/doc.txt

# Read content
gog docs cat <docId>
```

### Contacts

```bash
# List contacts
gog contacts list --max 50

# Search contacts
gog contacts search "murali"
```

## Calendar Event Colors

| ID | Color | Use For |
|----|-------|---------|
| 1 | #a4bdfc (Lavender) | General |
| 2 | #7ae7bf (Sage) | Personal |
| 3 | #dbadff (Grape) | Meetings |
| 4 | #ff887c (Flamingo) | Urgent |
| 5 | #fbd75b (Banana) | Reminders |
| 6 | #ffb878 (Tangerine) | Tasks |
| 7 | #46d6db (Peacock) | Travel |
| 8 | #e1e1e1 (Graphite) | Blocked |
| 9 | #5484ed (Blueberry) | Work |
| 10 | #51b749 (Basil) | Health |
| 11 | #dc2127 (Tomato) | **Surgery/Critical** |

## Environment

```bash
# Set default account
export GOG_ACCOUNT=cmd@hopehospital.com
```

## Helper Scripts

- `scripts/check-inbox.sh` - Check unread emails
- `scripts/today-calendar.sh` - Today's appointments
- `scripts/send-reminder.sh` - Send appointment reminders

## References

- `references/gmail-search-syntax.md` - Gmail search operators
- `references/sheets-formulas.md` - Common Sheets patterns
