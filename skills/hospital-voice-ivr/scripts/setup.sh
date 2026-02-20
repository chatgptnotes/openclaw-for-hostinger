#!/bin/bash
# Hospital Voice IVR - Quick Setup Script

set -e

SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATE_DIR="$SKILL_DIR/assets/voice-assistant-template"
TARGET_DIR="${1:-./voice-assistant}"

echo "🏥 Hospital Voice IVR - Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if template exists
if [ ! -d "$TEMPLATE_DIR" ]; then
    echo "❌ Template not found at $TEMPLATE_DIR"
    exit 1
fi

# Copy template
echo "📁 Copying template to $TARGET_DIR..."
cp -r "$TEMPLATE_DIR" "$TARGET_DIR"

# Navigate to target
cd "$TARGET_DIR"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env from example
if [ -f ".env.example" ] && [ ! -f ".env" ]; then
    cp .env.example .env
    echo "⚙️  Created .env from template"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Edit .env with your API keys:"
echo "     - SARVAM_API_KEY (recommended for Hindi)"
echo "     - EXOTEL_SID/TOKEN or TWILIO credentials"
echo ""
echo "  2. Customize for your hospital:"
echo "     - src/config/responses.js (bilingual messages)"
echo "     - src/config/medical-vocabulary.js (medical terms)"
echo ""
echo "  3. Start the server:"
echo "     npm start"
echo ""
echo "  4. Configure your IVR provider webhook:"
echo "     POST https://your-server/ivr/incoming"
