#!/bin/bash
# Zoom Transcription Script for OpenClaw
# Supports multiple transcription services

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="${SCRIPT_DIR}/config.json"
OUTPUT_DIR="${HOME}/.openclaw/workspace/transcripts"
TEMP_DIR="/tmp/zoom-transcription"

# Create directories
mkdir -p "$OUTPUT_DIR"
mkdir -p "$TEMP_DIR"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print status
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to extract audio from video
extract_audio() {
    local video_file="$1"
    local audio_file="$2"

    log_info "Extracting audio from video..."
    ffmpeg -i "$video_file" -vn -acodec libmp3lame -q:a 2 "$audio_file" -y 2>&1 | grep -v "^frame="
    log_success "Audio extracted to $audio_file"
}

# Function to transcribe using OpenAI Whisper API
transcribe_whisper_api() {
    local audio_file="$1"
    local output_file="$2"

    if [ -z "$OPENAI_API_KEY" ]; then
        log_error "OPENAI_API_KEY not set"
        return 1
    fi

    log_info "Transcribing with OpenAI Whisper API..."

    local response=$(curl -s -X POST "https://api.openai.com/v1/audio/transcriptions" \
        -H "Authorization: Bearer $OPENAI_API_KEY" \
        -H "Content-Type: multipart/form-data" \
        -F "file=@$audio_file" \
        -F "model=whisper-1" \
        -F "response_format=verbose_json" \
        -F "timestamp_granularities[]=segment")

    # Save full JSON response
    echo "$response" > "${output_file}.json"

    # Extract and save text transcript
    echo "$response" | jq -r '.text' > "$output_file"

    # Create SRT subtitle file
    echo "$response" | jq -r '.segments[] | "\(.id + 1)\n\(.start | tonumber | floor / 3600 | floor | tostring | if length == 1 then "0" + . else . end):\((.start | tonumber | floor % 3600 / 60) | floor | tostring | if length == 1 then "0" + . else . end):\((.start | tonumber % 60) | floor | tostring | if length == 1 then "0" + . else . end),\((.start | tonumber % 1 * 1000) | floor | tostring) --> \(.end | tonumber | floor / 3600 | floor | tostring | if length == 1 then "0" + . else . end):\((.end | tonumber | floor % 3600 / 60) | floor | tostring | if length == 1 then "0" + . else . end):\((.end | tonumber % 60) | floor | tostring | if length == 1 then "0" + . else . end),\((.end | tonumber % 1 * 1000) | floor | tostring)\n\(.text)\n"' > "${output_file}.srt" 2>/dev/null || true

    log_success "Transcription completed!"
}

# Function to transcribe using Fireflies.ai
transcribe_fireflies() {
    local audio_file="$1"
    local output_file="$2"

    log_info "Fireflies.ai integration not yet implemented"
    log_info "Visit https://fireflies.ai/ to set up automatic Zoom recording"
    return 1
}

# Function to show usage
show_usage() {
    cat << EOF
Usage: $0 [OPTIONS] <input-file>

Transcribe Zoom meetings using various transcription services.

OPTIONS:
    -s, --service SERVICE   Transcription service (whisper-api, fireflies, otter)
    -o, --output FILE       Output file path (default: auto-generated)
    -f, --format FORMAT     Output format (txt, json, srt, all)
    -h, --help              Show this help message

EXAMPLES:
    # Transcribe a Zoom recording
    $0 ~/Downloads/zoom_meeting.mp4

    # Use specific service
    $0 --service whisper-api meeting.mp4

    # Specify output file
    $0 --output transcript.txt meeting.mp4

ENVIRONMENT VARIABLES:
    OPENAI_API_KEY          Required for Whisper API
    FIREFLIES_API_KEY       Required for Fireflies.ai

EOF
}

# Parse arguments
SERVICE="whisper-api"
OUTPUT_FILE=""
FORMAT="txt"
INPUT_FILE=""

while [[ $# -gt 0 ]]; do
    case $1 in
        -s|--service)
            SERVICE="$2"
            shift 2
            ;;
        -o|--output)
            OUTPUT_FILE="$2"
            shift 2
            ;;
        -f|--format)
            FORMAT="$2"
            shift 2
            ;;
        -h|--help)
            show_usage
            exit 0
            ;;
        *)
            INPUT_FILE="$1"
            shift
            ;;
    esac
done

# Validate input
if [ -z "$INPUT_FILE" ]; then
    log_error "No input file specified"
    show_usage
    exit 1
fi

if [ ! -f "$INPUT_FILE" ]; then
    log_error "Input file not found: $INPUT_FILE"
    exit 1
fi

# Generate output filename if not specified
if [ -z "$OUTPUT_FILE" ]; then
    BASENAME=$(basename "$INPUT_FILE" | sed 's/\.[^.]*$//')
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    OUTPUT_FILE="${OUTPUT_DIR}/${BASENAME}_${TIMESTAMP}.txt"
fi

# Extract audio
AUDIO_FILE="${TEMP_DIR}/audio_$(date +%s).mp3"

# Check if input is already audio
if [[ "$INPUT_FILE" =~ \.(mp3|wav|m4a|flac)$ ]]; then
    log_info "Input is already audio, copying..."
    cp "$INPUT_FILE" "$AUDIO_FILE"
else
    extract_audio "$INPUT_FILE" "$AUDIO_FILE"
fi

# Transcribe based on service
case $SERVICE in
    whisper-api)
        transcribe_whisper_api "$AUDIO_FILE" "$OUTPUT_FILE"
        ;;
    fireflies)
        transcribe_fireflies "$AUDIO_FILE" "$OUTPUT_FILE"
        ;;
    *)
        log_error "Unsupported service: $SERVICE"
        exit 1
        ;;
esac

# Cleanup
rm -f "$AUDIO_FILE"

# Show results
log_success "Transcription saved to:"
echo "  Text: $OUTPUT_FILE"
[ -f "${OUTPUT_FILE}.json" ] && echo "  JSON: ${OUTPUT_FILE}.json"
[ -f "${OUTPUT_FILE}.srt" ] && echo "  SRT:  ${OUTPUT_FILE}.srt"

# Send notification via OpenClaw if configured
if command -v openclaw &> /dev/null; then
    log_info "Transcript ready at: $OUTPUT_FILE"
fi
