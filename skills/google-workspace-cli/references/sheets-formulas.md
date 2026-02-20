# Google Sheets Patterns

Common patterns for working with Sheets via `gog sheets`.

## Reading Data

```bash
# Get specific range
gog sheets get <sheetId> "Sheet1!A1:D10" --json

# Get entire column
gog sheets get <sheetId> "Sheet1!A:A" --json

# Get named range
gog sheets get <sheetId> "PatientData" --json

# Get sheet metadata (tabs, properties)
gog sheets metadata <sheetId> --json
```

## Writing Data

```bash
# Update cells (overwrites)
gog sheets update <sheetId> "Sheet1!A1:B2" \
  --values-json '[["Header1","Header2"],["Value1","Value2"]]' \
  --input USER_ENTERED

# Append rows (adds to end)
gog sheets append <sheetId> "Sheet1!A:D" \
  --values-json '[["New","Row","Data","Here"]]' \
  --insert INSERT_ROWS

# Clear range
gog sheets clear <sheetId> "Sheet1!A2:Z1000"
```

## Input Modes

| Mode | Description |
|------|-------------|
| `RAW` | Values stored as-is (text) |
| `USER_ENTERED` | Parsed like user input (formulas, dates work) |

Always use `--input USER_ENTERED` for:
- Dates: `2026-02-09`
- Numbers: `1234.56`
- Formulas: `=SUM(A:A)`

## Hospital Use Cases

### Patient Registration Log

```bash
# Append new patient
gog sheets append $SHEET_ID "Registrations!A:F" \
  --values-json '[["2026-02-09","Ramesh Kumar","+91-9876543210","OPD","Dr. Murali","Knee Pain"]]' \
  --insert INSERT_ROWS \
  --input USER_ENTERED
```

### Daily OPD Report

```bash
# Read today's appointments
gog sheets get $SHEET_ID "OPD!A:E" --json | jq '.values[] | select(.[0] == "2026-02-09")'
```

### Update Patient Status

```bash
# Find and update (get range first, then update specific cell)
gog sheets update $SHEET_ID "Patients!F5" \
  --values-json '[["Discharged"]]' \
  --input USER_ENTERED
```

### Bed Occupancy Tracker

```bash
# Update occupancy
gog sheets update $SHEET_ID "Occupancy!B2:B3" \
  --values-json '[["45"],["50"]]' \
  --input USER_ENTERED

# Add formula
gog sheets update $SHEET_ID "Occupancy!B4" \
  --values-json '[["=B2/B3*100"]]' \
  --input USER_ENTERED
```

## JSON Data Handling

### Parse Response

```bash
# Get and parse with jq
gog sheets get $SHEET_ID "Sheet1!A:D" --json | jq -r '.values[] | @tsv'

# Get specific column
gog sheets get $SHEET_ID "Sheet1!B:B" --json | jq -r '.values[][0]'

# Count rows
gog sheets get $SHEET_ID "Sheet1!A:A" --json | jq '.values | length'
```

### Build JSON for Write

```bash
# From variables
NAME="Patient Name"
PHONE="+91-9876543210"
echo "[\"$NAME\",\"$PHONE\"]" | jq -c '[.]'

# Multi-row
cat <<EOF | jq -c '.'
[
  ["Row1Col1", "Row1Col2"],
  ["Row2Col1", "Row2Col2"]
]
EOF
```

## Sheet ID

Extract from URL:
```
https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
                                       ^^^^^^^^^^^^^^
```

## Tips

1. Always use `--json` for programmatic access
2. Use `USER_ENTERED` for dates/numbers/formulas
3. Clear before bulk update to avoid partial overwrites
4. Use named ranges for stable references
5. Batch updates when possible (single API call)
