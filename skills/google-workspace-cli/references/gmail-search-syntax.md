# Gmail Search Syntax

Complete reference for Gmail search operators used with `gog gmail search`.

## Date Filters

| Operator | Example | Description |
|----------|---------|-------------|
| `newer_than:` | `newer_than:7d` | Within last 7 days |
| `older_than:` | `older_than:1m` | Older than 1 month |
| `after:` | `after:2026/02/01` | After specific date |
| `before:` | `before:2026/02/09` | Before specific date |

Time units: `d` (day), `m` (month), `y` (year)

## Sender/Recipient

| Operator | Example | Description |
|----------|---------|-------------|
| `from:` | `from:patient@gmail.com` | From specific sender |
| `to:` | `to:cmd@hopehospital.com` | Sent to address |
| `cc:` | `cc:nurse@hospital.com` | CC'd to address |
| `bcc:` | `bcc:admin@hospital.com` | BCC'd to address |

## Location

| Operator | Example | Description |
|----------|---------|-------------|
| `in:inbox` | `in:inbox` | Inbox only |
| `in:sent` | `in:sent` | Sent mail |
| `in:draft` | `in:draft` | Drafts |
| `in:spam` | `in:spam` | Spam folder |
| `in:trash` | `in:trash` | Trash |
| `in:anywhere` | `in:anywhere` | All mail including spam/trash |
| `label:` | `label:important` | Specific label |

## Status

| Operator | Example | Description |
|----------|---------|-------------|
| `is:unread` | `is:unread` | Unread messages |
| `is:read` | `is:read` | Read messages |
| `is:starred` | `is:starred` | Starred messages |
| `is:important` | `is:important` | Important messages |
| `has:attachment` | `has:attachment` | Has attachments |

## Content

| Operator | Example | Description |
|----------|---------|-------------|
| `subject:` | `subject:appointment` | In subject line |
| `"exact phrase"` | `"knee replacement"` | Exact phrase match |
| `filename:` | `filename:pdf` | Attachment filename |
| `larger:` | `larger:5M` | Larger than 5MB |
| `smaller:` | `smaller:1M` | Smaller than 1MB |

## Boolean Operators

| Operator | Example | Description |
|----------|---------|-------------|
| `OR` | `from:a OR from:b` | Either condition |
| `-` | `-from:spam@` | Exclude |
| `()` | `(from:a OR from:b) subject:urgent` | Grouping |

## Hospital-Specific Examples

```bash
# Unread patient emails this week
gog gmail search 'is:unread newer_than:7d -from:noreply'

# Appointment confirmations
gog gmail search 'subject:appointment newer_than:1d'

# Insurance queries
gog gmail search 'subject:(insurance OR ayushman OR claim) newer_than:30d'

# Large attachments (reports, scans)
gog gmail search 'has:attachment larger:2M newer_than:7d'

# Urgent unread
gog gmail search 'is:unread (subject:urgent OR subject:emergency)'

# From specific domains
gog gmail search 'from:@insurancecompany.com newer_than:30d'
```

## Output Formats

```bash
# JSON for parsing
gog gmail search 'is:unread' --max 10 --json

# Quiet mode (IDs only)
gog gmail search 'is:unread' --max 10 --quiet
```
