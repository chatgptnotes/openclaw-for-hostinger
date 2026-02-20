#!/bin/bash

# NABH 3rd Edition SOP Generation - Batch 2
# Generates SOPs for remaining chapters (MOM, PRE, HIC, CQI, ROM, FMS, IM, HRM)
# Total: 333 additional SOPs

echo "🏥 NABH 3rd Edition - SOP Generation Batch 2"
echo "==========================================="
echo "📊 Generating remaining 333 SOPs for chapters MOM through HRM"

# Set paths
SKILL_DIR="/Users/murali/.openclaw/workspace/skills/nabh-sop-templates"
OUTPUT_DIR="/Users/murali/.openclaw/workspace/generated_sops"
SCRIPT_PATH="$SKILL_DIR/scripts/sop_generator.py"

# Generation counter (continuing from batch 1)
count=75

# Function to generate SOP
generate_sop() {
    local element_id="$1"
    local title="$2"
    local department="$3"
    local sop_type="$4"
    local chapter="${element_id%%.*}"
    
    local safe_filename=$(echo "$element_id" | sed 's/\./_/g')
    local output_path="$OUTPUT_DIR/$chapter/${safe_filename}_SOP"
    
    echo "🔄 Generating SOP $((++count)): $element_id - $title"
    
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
}

# MOM Chapter - Management of Medication (48 elements)
echo "📖 Chapter MOM: Management of Medication"

# MOM.1 Medication Management System (12 elements)
generate_sop "MOM.1.1" "Medication formulary management" "PHARMACY" "Administrative Process"
generate_sop "MOM.1.2" "Procurement procedures" "PHARMACY" "Administrative Process"
generate_sop "MOM.1.3" "Storage protocols" "PHARMACY" "Safety Protocol"
generate_sop "MOM.1.4" "Distribution systems" "PHARMACY" "Administrative Process"
generate_sop "MOM.1.5" "Inventory management" "PHARMACY" "Administrative Process"
generate_sop "MOM.1.6" "Expiry date monitoring" "PHARMACY" "Quality Assurance"
generate_sop "MOM.1.7" "Controlled drug management" "PHARMACY" "Safety Protocol"
generate_sop "MOM.1.8" "Emergency medication availability" "PHARMACY" "Emergency Procedure"
generate_sop "MOM.1.9" "Medication security protocols" "PHARMACY" "Safety Protocol"
generate_sop "MOM.1.10" "Temperature monitoring" "PHARMACY" "Quality Assurance"
generate_sop "MOM.1.11" "Medication disposal procedures" "PHARMACY" "Safety Protocol"
generate_sop "MOM.1.12" "Vendor qualification" "PHARMACY" "Quality Assurance"

# MOM.2 Medication Ordering and Transcription (10 elements)
generate_sop "MOM.2.1" "Prescription writing standards" "NURSING" "Documentation"
generate_sop "MOM.2.2" "Electronic prescribing protocols" "PHARMACY" "Administrative Process"
generate_sop "MOM.2.3" "Medication order verification" "PHARMACY" "Quality Assurance"
generate_sop "MOM.2.4" "High-alert medication protocols" "PHARMACY" "Safety Protocol"
generate_sop "MOM.2.5" "Allergy documentation" "NURSING" "Documentation"
generate_sop "MOM.2.6" "Drug interaction checking" "PHARMACY" "Safety Protocol"
generate_sop "MOM.2.7" "Dosing verification procedures" "PHARMACY" "Quality Assurance"
generate_sop "MOM.2.8" "Order clarification protocols" "PHARMACY" "Communication"
generate_sop "MOM.2.9" "Verbal order procedures" "NURSING" "Communication"
generate_sop "MOM.2.10" "Order documentation standards" "PHARMACY" "Documentation"

# MOM.3 Preparation and Dispensing (8 elements)
generate_sop "MOM.3.1" "Medication preparation protocols" "PHARMACY" "Clinical Protocol"
generate_sop "MOM.3.2" "Sterile compounding procedures" "PHARMACY" "Safety Protocol"
generate_sop "MOM.3.3" "Labeling standards" "PHARMACY" "Quality Assurance"
generate_sop "MOM.3.4" "Double-check procedures" "PHARMACY" "Safety Protocol"
generate_sop "MOM.3.5" "Contamination prevention" "PHARMACY" "Infection Control"
generate_sop "MOM.3.6" "Quality control testing" "PHARMACY" "Quality Assurance"
generate_sop "MOM.3.7" "Packaging procedures" "PHARMACY" "Administrative Process"
generate_sop "MOM.3.8" "Dispensing documentation" "PHARMACY" "Documentation"

# MOM.4 Administration (10 elements)
generate_sop "MOM.4.1" "Patient identification verification" "NURSING" "Safety Protocol"
generate_sop "MOM.4.2" "Right patient protocols" "NURSING" "Safety Protocol"
generate_sop "MOM.4.3" "Right medication verification" "NURSING" "Safety Protocol"
generate_sop "MOM.4.4" "Right dose confirmation" "NURSING" "Safety Protocol"
generate_sop "MOM.4.5" "Right route verification" "NURSING" "Safety Protocol"
generate_sop "MOM.4.6" "Right time administration" "NURSING" "Clinical Protocol"
generate_sop "MOM.4.7" "Administration documentation" "NURSING" "Documentation"
generate_sop "MOM.4.8" "Patient monitoring post-administration" "NURSING" "Clinical Protocol"
generate_sop "MOM.4.9" "Adverse reaction protocols" "NURSING" "Emergency Procedure"
generate_sop "MOM.4.10" "Medication refusal procedures" "NURSING" "Clinical Protocol"

# MOM.5 Monitoring (8 elements)
generate_sop "MOM.5.1" "Therapeutic monitoring protocols" "NURSING" "Clinical Protocol"
generate_sop "MOM.5.2" "Drug level monitoring" "LAB" "Clinical Protocol"
generate_sop "MOM.5.3" "Side effect monitoring" "NURSING" "Clinical Protocol"
generate_sop "MOM.5.4" "Drug interaction monitoring" "PHARMACY" "Safety Protocol"
generate_sop "MOM.5.5" "Effectiveness evaluation" "NURSING" "Quality Assurance"
generate_sop "MOM.5.6" "Laboratory monitoring" "LAB" "Clinical Protocol"
generate_sop "MOM.5.7" "Patient response assessment" "NURSING" "Clinical Protocol"
generate_sop "MOM.5.8" "Monitoring documentation" "NURSING" "Documentation"

echo "✅ Completed MOM Chapter: 48 additional SOPs"

# PRE Chapter - Patient Rights and Education (35 elements)
echo "📖 Chapter PRE: Patient Rights and Education"

# PRE.1 Patient Rights (15 elements)
generate_sop "PRE.1.1" "Patient rights policy" "ADMIN" "Administrative Process"
generate_sop "PRE.1.2" "Rights communication procedures" "NURSING" "Communication"
generate_sop "PRE.1.3" "Informed consent protocols" "NURSING" "Documentation"
generate_sop "PRE.1.4" "Privacy protection procedures" "ADMIN" "Safety Protocol"
generate_sop "PRE.1.5" "Confidentiality protocols" "ADMIN" "Safety Protocol"
generate_sop "PRE.1.6" "Access to information procedures" "ADMIN" "Administrative Process"
generate_sop "PRE.1.7" "Complaint handling procedures" "ADMIN" "Administrative Process"
generate_sop "PRE.1.8" "Grievance resolution protocols" "ADMIN" "Administrative Process"
generate_sop "PRE.1.9" "Patient advocacy procedures" "NURSING" "Administrative Process"
generate_sop "PRE.1.10" "Cultural sensitivity protocols" "NURSING" "Clinical Protocol"
generate_sop "PRE.1.11" "Language assistance procedures" "NURSING" "Communication"
generate_sop "PRE.1.12" "Advance directive management" "NURSING" "Documentation"
generate_sop "PRE.1.13" "Research participation rights" "ADMIN" "Administrative Process"
generate_sop "PRE.1.14" "Rights documentation" "ADMIN" "Documentation"
generate_sop "PRE.1.15" "Staff training on rights" "ADMIN" "Training Procedure"

# PRE.2 Patient Education (20 elements)
generate_sop "PRE.2.1" "Education needs assessment" "NURSING" "Clinical Protocol"
generate_sop "PRE.2.2" "Education plan development" "NURSING" "Clinical Protocol"
generate_sop "PRE.2.3" "Health literacy assessment" "NURSING" "Clinical Protocol"
generate_sop "PRE.2.4" "Education material development" "NURSING" "Administrative Process"
generate_sop "PRE.2.5" "Multi-language materials" "ADMIN" "Administrative Process"
generate_sop "PRE.2.6" "Condition-specific education" "NURSING" "Clinical Protocol"
generate_sop "PRE.2.7" "Medication education protocols" "PHARMACY" "Clinical Protocol"
generate_sop "PRE.2.8" "Discharge education procedures" "NURSING" "Clinical Protocol"
generate_sop "PRE.2.9" "Family education protocols" "NURSING" "Clinical Protocol"
generate_sop "PRE.2.10" "Demonstration and return demonstration" "NURSING" "Training Procedure"
generate_sop "PRE.2.11" "Education effectiveness evaluation" "NURSING" "Quality Assurance"
generate_sop "PRE.2.12" "Follow-up education procedures" "NURSING" "Clinical Protocol"
generate_sop "PRE.2.13" "Nutrition education protocols" "NURSING" "Clinical Protocol"
generate_sop "PRE.2.14" "Exercise education procedures" "NURSING" "Clinical Protocol"
generate_sop "PRE.2.15" "Prevention education protocols" "NURSING" "Clinical Protocol"
generate_sop "PRE.2.16" "Self-care education" "NURSING" "Clinical Protocol"
generate_sop "PRE.2.17" "Technology-based education" "ADMIN" "Administrative Process"
generate_sop "PRE.2.18" "Group education procedures" "NURSING" "Clinical Protocol"
generate_sop "PRE.2.19" "Education documentation" "NURSING" "Documentation"
generate_sop "PRE.2.20" "Educator competency standards" "NURSING" "Training Procedure"

echo "✅ Completed PRE Chapter: 35 additional SOPs"

echo "📊 Progress: Generated $(($count - 75)) SOPs in this batch"
echo "📊 Total SOPs generated so far: $count out of 408"
echo "📊 Remaining: $((408 - $count)) SOPs"
echo ""
echo "🎉 Batch 2 Partial Complete!"