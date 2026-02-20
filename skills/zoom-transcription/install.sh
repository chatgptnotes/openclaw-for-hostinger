#!/bin/bash
# Installation script for Zoom Transcription Skill

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔══════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Zoom Transcription Skill - Installation    ║${NC}"
echo -e "${BLUE}╔══════════════════════════════════════════════╗${NC}"
echo ""

# Check for Homebrew
if ! command -v brew &> /dev/null; then
    echo -e "${RED}✗ Homebrew not found${NC}"
    echo "Install Homebrew first: https://brew.sh/"
    exit 1
fi
echo -e "${GREEN}✓ Homebrew found${NC}"

# Install ffmpeg
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${YELLOW}Installing ffmpeg...${NC}"
    brew install ffmpeg
    echo -e "${GREEN}✓ ffmpeg installed${NC}"
else
    echo -e "${GREEN}✓ ffmpeg already installed${NC}"
fi

# Install jq
if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}Installing jq...${NC}"
    brew install jq
    echo -e "${GREEN}✓ jq installed${NC}"
else
    echo -e "${GREEN}✓ jq already installed${NC}"
fi

# Create output directory
OUTPUT_DIR="${HOME}/.openclaw/workspace/transcripts"
mkdir -p "$OUTPUT_DIR"
echo -e "${GREEN}✓ Output directory created: $OUTPUT_DIR${NC}"

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo -e "${GREEN}Installation Complete!${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo ""
echo "Next Steps:"
echo ""
echo "1. Choose your transcription service:"
echo "   ${YELLOW}FREE Options:${NC}"
echo "   • Tactiq (Chrome extension): https://tactiq.io/"
echo "   • Fireflies.ai: https://fireflies.ai/"
echo "   • Otter.ai: https://otter.ai/"
echo ""
echo "   ${YELLOW}PAID Option (Best Quality):${NC}"
echo "   • OpenAI Whisper API: https://platform.openai.com/api-keys"
echo "     Cost: ~\$0.36 per hour of audio"
echo ""
echo "2. If using Whisper API, set your API key:"
echo "   ${BLUE}export OPENAI_API_KEY=\"sk-your-key-here\"${NC}"
echo ""
echo "3. Transcribe a meeting:"
echo "   ${BLUE}./transcribe-zoom.sh ~/Downloads/zoom_recording.mp4${NC}"
echo ""
echo "4. View transcripts:"
echo "   ${BLUE}ls -lt ~/.openclaw/workspace/transcripts/${NC}"
echo ""
echo "Read QUICKSTART.md for detailed instructions!"
echo ""
