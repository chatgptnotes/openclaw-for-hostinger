#!/bin/bash

# Complete Missing NABH SOPs
# Generate the missing 21 SOPs to reach exactly 408

echo "🔧 Completing Missing NABH SOPs"
echo "==============================="

SKILL_DIR="/Users/murali/.openclaw/workspace/skills/nabh-sop-templates"
OUTPUT_DIR="/Users/murali/.openclaw/workspace/generated_sops"
SCRIPT_PATH="$SKILL_DIR/scripts/sop_generator.py"

count=387  # Current count

# Function to generate SOP
generate_sop() {
    local element_id="$1"
    local title="$2"
    local department="$3"
    local sop_type="$4"
    local chapter="${element_id%%.*}"
    
    local safe_filename=$(echo "$element_id" | sed 's/\./_/g')
    local output_path="$OUTPUT_DIR/$chapter/${safe_filename}_SOP"
    
    # Check if file already exists
    if [ ! -f "${output_path}.md" ]; then
        echo "🔄 Generating missing SOP $((++count)): $element_id - $title"
        
        python3 "$SCRIPT_PATH" \
            --title "$title ($element_id)" \
            --department "$department" \
            --type "$sop_type" \
            --output "$output_path" \
            --format "markdown" > /dev/null
        
        if [ $? -eq 0 ]; then
            echo "✅ Generated: $element_id"
        else
            echo "❌ Failed: $element_id"
        fi
    fi
}

# Complete missing COP SOPs (COP.4 and COP.5)
echo "📖 Completing missing COP elements"

# COP.4 Pain Management (8 elements)
generate_sop "COP.4.1" "Pain assessment protocols" "NURSING" "Clinical Protocol"
generate_sop "COP.4.2" "Pain management planning" "NURSING" "Clinical Protocol"
generate_sop "COP.4.3" "Pharmacological pain management" "NURSING" "Clinical Protocol"
generate_sop "COP.4.4" "Non-pharmacological pain management" "NURSING" "Clinical Protocol"
generate_sop "COP.4.5" "Pain monitoring procedures" "NURSING" "Clinical Protocol"
generate_sop "COP.4.6" "Patient education on pain" "NURSING" "Clinical Protocol"
generate_sop "COP.4.7" "Pain team consultations" "NURSING" "Clinical Protocol"
generate_sop "COP.4.8" "Pain documentation standards" "NURSING" "Documentation"

# COP.5 End of Life Care (14 elements)
generate_sop "COP.5.1" "End-of-life identification" "NURSING" "Clinical Protocol"
generate_sop "COP.5.2" "Family communication protocols" "NURSING" "Communication"
generate_sop "COP.5.3" "Comfort care procedures" "NURSING" "Clinical Protocol"
generate_sop "COP.5.4" "Spiritual care support" "NURSING" "Clinical Protocol"
generate_sop "COP.5.5" "Pain and symptom management" "NURSING" "Clinical Protocol"
generate_sop "COP.5.6" "Family support services" "NURSING" "Clinical Protocol"
generate_sop "COP.5.7" "Cultural sensitivity protocols" "NURSING" "Clinical Protocol"
generate_sop "COP.5.8" "Bereavement support" "NURSING" "Clinical Protocol"
generate_sop "COP.5.9" "Organ donation procedures" "ADMIN" "Administrative Process"
generate_sop "COP.5.10" "Death certification protocols" "ADMIN" "Documentation"
generate_sop "COP.5.11" "Body handling procedures" "NURSING" "Safety Protocol"
generate_sop "COP.5.12" "Autopsy consent procedures" "ADMIN" "Documentation"
generate_sop "COP.5.13" "Family counseling" "NURSING" "Clinical Protocol"
generate_sop "COP.5.14" "End-of-life documentation" "NURSING" "Documentation"

echo ""
echo "✅ Completion check:"
total_sops=$(find "$OUTPUT_DIR" -name "*.md" | wc -l | xargs)
echo "📊 Total SOPs now: $total_sops"
echo "🎯 Target: 408"

if [ "$total_sops" -eq 408 ]; then
    echo "🎉 PERFECT! All 408 NABH SOPs are now complete!"
else
    echo "📊 Progress: $total_sops/408 SOPs generated"
fi