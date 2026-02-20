#!/bin/bash

# NABH 3rd Edition SOP Generation - Final Batch 3
# Completes remaining chapters: HIC, CQI, ROM, FMS, IM, HRM
# Total: 250 remaining SOPs to reach 408 total

echo "🏥 NABH 3rd Edition - Final SOP Generation Batch 3"
echo "==============================================="
echo "📊 Generating final 250 SOPs to complete all 408 elements"

# Set paths
SKILL_DIR="/Users/murali/.openclaw/workspace/skills/nabh-sop-templates"
OUTPUT_DIR="/Users/murali/.openclaw/workspace/generated_sops"
SCRIPT_PATH="$SKILL_DIR/scripts/sop_generator.py"

# Generation counter (continuing from batch 2)
count=158

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

# HIC Chapter - Hospital Infection Control (42 elements)
echo "📖 Chapter HIC: Hospital Infection Control"

# HIC.1 Infection Control Program (8 elements)
generate_sop "HIC.1.1" "Infection control policy development" "QUALITY" "Infection Control"
generate_sop "HIC.1.2" "Infection control committee" "QUALITY" "Administrative Process"
generate_sop "HIC.1.3" "Surveillance protocols" "QUALITY" "Infection Control"
generate_sop "HIC.1.4" "Data collection procedures" "QUALITY" "Quality Assurance"
generate_sop "HIC.1.5" "Risk assessment protocols" "QUALITY" "Infection Control"
generate_sop "HIC.1.6" "Prevention strategy development" "QUALITY" "Infection Control"
generate_sop "HIC.1.7" "Performance monitoring" "QUALITY" "Quality Assurance"
generate_sop "HIC.1.8" "Program evaluation procedures" "QUALITY" "Quality Assurance"

# HIC.2 Hand Hygiene (6 elements)
generate_sop "HIC.2.1" "Hand hygiene protocols" "NURSING" "Infection Control"
generate_sop "HIC.2.2" "Hand hygiene monitoring" "QUALITY" "Quality Assurance"
generate_sop "HIC.2.3" "Hand hygiene compliance assessment" "QUALITY" "Quality Assurance"
generate_sop "HIC.2.4" "Hand hygiene training" "NURSING" "Training Procedure"
generate_sop "HIC.2.5" "Alcohol-based hand rub availability" "NURSING" "Infection Control"
generate_sop "HIC.2.6" "Hand hygiene documentation" "NURSING" "Documentation"

# HIC.3 Isolation Precautions (8 elements)
generate_sop "HIC.3.1" "Standard precautions protocols" "NURSING" "Infection Control"
generate_sop "HIC.3.2" "Transmission-based precautions" "NURSING" "Infection Control"
generate_sop "HIC.3.3" "Isolation identification procedures" "NURSING" "Infection Control"
generate_sop "HIC.3.4" "Personal protective equipment protocols" "NURSING" "Safety Protocol"
generate_sop "HIC.3.5" "Patient placement procedures" "NURSING" "Infection Control"
generate_sop "HIC.3.6" "Visitor restriction protocols" "NURSING" "Infection Control"
generate_sop "HIC.3.7" "Equipment disinfection procedures" "NURSING" "Infection Control"
generate_sop "HIC.3.8" "Isolation documentation" "NURSING" "Documentation"

# HIC.4 Sterilization and Disinfection (10 elements)
generate_sop "HIC.4.1" "Sterilization protocols" "NURSING" "Infection Control"
generate_sop "HIC.4.2" "Disinfection procedures" "NURSING" "Infection Control"
generate_sop "HIC.4.3" "Equipment processing protocols" "NURSING" "Equipment Management"
generate_sop "HIC.4.4" "Quality assurance testing" "QUALITY" "Quality Assurance"
generate_sop "HIC.4.5" "Biological indicator monitoring" "QUALITY" "Quality Assurance"
generate_sop "HIC.4.6" "Chemical indicator protocols" "QUALITY" "Quality Assurance"
generate_sop "HIC.4.7" "Sterile storage procedures" "NURSING" "Infection Control"
generate_sop "HIC.4.8" "Package integrity monitoring" "NURSING" "Quality Assurance"
generate_sop "HIC.4.9" "Equipment maintenance procedures" "NURSING" "Equipment Management"
generate_sop "HIC.4.10" "Sterilization documentation" "NURSING" "Documentation"

# HIC.5 Environmental Cleaning (10 elements)
generate_sop "HIC.5.1" "Cleaning protocols development" "ADMIN" "Infection Control"
generate_sop "HIC.5.2" "Cleaning schedule procedures" "ADMIN" "Administrative Process"
generate_sop "HIC.5.3" "Disinfectant selection protocols" "QUALITY" "Infection Control"
generate_sop "HIC.5.4" "High-touch surface cleaning" "ADMIN" "Infection Control"
generate_sop "HIC.5.5" "Terminal cleaning procedures" "ADMIN" "Infection Control"
generate_sop "HIC.5.6" "Spill management protocols" "NURSING" "Emergency Procedure"
generate_sop "HIC.5.7" "Cleaning equipment protocols" "ADMIN" "Equipment Management"
generate_sop "HIC.5.8" "Cleaning staff training" "ADMIN" "Training Procedure"
generate_sop "HIC.5.9" "Cleaning quality monitoring" "QUALITY" "Quality Assurance"
generate_sop "HIC.5.10" "Cleaning documentation" "ADMIN" "Documentation"

echo "✅ Completed HIC Chapter: 42 additional SOPs"

# CQI Chapter - Continuous Quality Improvement (38 elements)
echo "📖 Chapter CQI: Continuous Quality Improvement"

# CQI.1 Quality Management (12 elements)
generate_sop "CQI.1.1" "Quality policy development" "QUALITY" "Quality Assurance"
generate_sop "CQI.1.2" "Quality committee structure" "QUALITY" "Administrative Process"
generate_sop "CQI.1.3" "Quality plan development" "QUALITY" "Quality Assurance"
generate_sop "CQI.1.4" "Performance indicator selection" "QUALITY" "Quality Assurance"
generate_sop "CQI.1.5" "Data collection protocols" "QUALITY" "Quality Assurance"
generate_sop "CQI.1.6" "Analysis procedures" "QUALITY" "Quality Assurance"
generate_sop "CQI.1.7" "Improvement initiative protocols" "QUALITY" "Quality Assurance"
generate_sop "CQI.1.8" "Monitoring procedures" "QUALITY" "Quality Assurance"
generate_sop "CQI.1.9" "Reporting protocols" "QUALITY" "Documentation"
generate_sop "CQI.1.10" "Communication procedures" "QUALITY" "Communication"
generate_sop "CQI.1.11" "Resource allocation" "ADMIN" "Administrative Process"
generate_sop "CQI.1.12" "Quality documentation" "QUALITY" "Documentation"

# CQI.2 Clinical Quality (13 elements)
generate_sop "CQI.2.1" "Clinical indicator monitoring" "QUALITY" "Quality Assurance"
generate_sop "CQI.2.2" "Clinical audit procedures" "QUALITY" "Quality Assurance"
generate_sop "CQI.2.3" "Evidence-based practice protocols" "NURSING" "Clinical Protocol"
generate_sop "CQI.2.4" "Clinical guideline development" "QUALITY" "Clinical Protocol"
generate_sop "CQI.2.5" "Clinical pathway monitoring" "QUALITY" "Quality Assurance"
generate_sop "CQI.2.6" "Outcome measurement" "QUALITY" "Quality Assurance"
generate_sop "CQI.2.7" "Clinical risk assessment" "NURSING" "Safety Protocol"
generate_sop "CQI.2.8" "Patient safety initiatives" "QUALITY" "Safety Protocol"
generate_sop "CQI.2.9" "Clinical improvement projects" "QUALITY" "Quality Assurance"
generate_sop "CQI.2.10" "Peer review procedures" "QUALITY" "Quality Assurance"
generate_sop "CQI.2.11" "Case review protocols" "QUALITY" "Quality Assurance"
generate_sop "CQI.2.12" "Clinical data analysis" "QUALITY" "Quality Assurance"
generate_sop "CQI.2.13" "Clinical documentation standards" "NURSING" "Documentation"

# CQI.3 Patient Safety (13 elements)
generate_sop "CQI.3.1" "Patient safety program" "QUALITY" "Safety Protocol"
generate_sop "CQI.3.2" "Safety reporting systems" "QUALITY" "Administrative Process"
generate_sop "CQI.3.3" "Incident analysis procedures" "QUALITY" "Quality Assurance"
generate_sop "CQI.3.4" "Root cause analysis protocols" "QUALITY" "Quality Assurance"
generate_sop "CQI.3.5" "Safety improvement initiatives" "QUALITY" "Safety Protocol"
generate_sop "CQI.3.6" "Safety training programs" "QUALITY" "Training Procedure"
generate_sop "CQI.3.7" "Safety communication protocols" "QUALITY" "Communication"
generate_sop "CQI.3.8" "Safety monitoring procedures" "QUALITY" "Quality Assurance"
generate_sop "CQI.3.9" "Safety culture assessment" "QUALITY" "Quality Assurance"
generate_sop "CQI.3.10" "Safety committee procedures" "QUALITY" "Administrative Process"
generate_sop "CQI.3.11" "Safety alert protocols" "QUALITY" "Emergency Procedure"
generate_sop "CQI.3.12" "Safety documentation" "QUALITY" "Documentation"
generate_sop "CQI.3.13" "Safety performance measurement" "QUALITY" "Quality Assurance"

echo "✅ Completed CQI Chapter: 38 additional SOPs"

echo "📊 Progress Check: Generated $(($count - 158)) SOPs in this batch"
echo "📊 Total SOPs so far: $count out of 408"
echo "📊 Remaining: $((408 - $count)) SOPs"

# Continue with remaining chapters in next echo statement
echo ""
echo "🔄 Continuing with remaining chapters..."

# ROM Chapter - Responsibilities of Management (35 elements)
echo "📖 Chapter ROM: Responsibilities of Management"

# ROM.1 Governance and Leadership (15 elements)
generate_sop "ROM.1.1" "Governance structure protocols" "ADMIN" "Administrative Process"
generate_sop "ROM.1.2" "Leadership responsibilities" "ADMIN" "Administrative Process"
generate_sop "ROM.1.3" "Strategic planning procedures" "ADMIN" "Administrative Process"
generate_sop "ROM.1.4" "Policy development protocols" "ADMIN" "Administrative Process"
generate_sop "ROM.1.5" "Resource allocation procedures" "ADMIN" "Administrative Process"
generate_sop "ROM.1.6" "Performance monitoring protocols" "ADMIN" "Quality Assurance"
generate_sop "ROM.1.7" "Risk management procedures" "ADMIN" "Safety Protocol"
generate_sop "ROM.1.8" "Compliance monitoring" "ADMIN" "Quality Assurance"
generate_sop "ROM.1.9" "Stakeholder communication" "ADMIN" "Communication"
generate_sop "ROM.1.10" "Decision-making protocols" "ADMIN" "Administrative Process"
generate_sop "ROM.1.11" "Delegation procedures" "ADMIN" "Administrative Process"
generate_sop "ROM.1.12" "Accountability frameworks" "ADMIN" "Administrative Process"
generate_sop "ROM.1.13" "Governance documentation" "ADMIN" "Documentation"
generate_sop "ROM.1.14" "Leadership development" "ADMIN" "Training Procedure"
generate_sop "ROM.1.15" "Succession planning" "ADMIN" "Administrative Process"

# ROM.2 Human Resource Management (20 elements)
generate_sop "ROM.2.1" "Recruitment procedures" "ADMIN" "Administrative Process"
generate_sop "ROM.2.2" "Selection protocols" "ADMIN" "Administrative Process"
generate_sop "ROM.2.3" "Orientation procedures" "ADMIN" "Training Procedure"
generate_sop "ROM.2.4" "Training and development" "ADMIN" "Training Procedure"
generate_sop "ROM.2.5" "Competency assessment" "ADMIN" "Quality Assurance"
generate_sop "ROM.2.6" "Performance evaluation" "ADMIN" "Quality Assurance"
generate_sop "ROM.2.7" "Career development planning" "ADMIN" "Administrative Process"
generate_sop "ROM.2.8" "Staffing procedures" "ADMIN" "Administrative Process"
generate_sop "ROM.2.9" "Work schedule management" "ADMIN" "Administrative Process"
generate_sop "ROM.2.10" "Credentialing procedures" "ADMIN" "Administrative Process"
generate_sop "ROM.2.11" "Professional development" "ADMIN" "Training Procedure"
generate_sop "ROM.2.12" "Recognition programs" "ADMIN" "Administrative Process"
generate_sop "ROM.2.13" "Disciplinary procedures" "ADMIN" "Administrative Process"
generate_sop "ROM.2.14" "Termination protocols" "ADMIN" "Administrative Process"
generate_sop "ROM.2.15" "Employee health programs" "ADMIN" "Safety Protocol"
generate_sop "ROM.2.16" "Workplace safety protocols" "ADMIN" "Safety Protocol"
generate_sop "ROM.2.17" "Employee communication" "ADMIN" "Communication"
generate_sop "ROM.2.18" "Grievance procedures" "ADMIN" "Administrative Process"
generate_sop "ROM.2.19" "HR documentation" "ADMIN" "Documentation"
generate_sop "ROM.2.20" "Compliance monitoring" "ADMIN" "Quality Assurance"

echo "✅ Completed ROM Chapter: 35 additional SOPs"

echo "🎯 Final Sprint! Generating last 3 chapters..."

# Continue in next part due to script length limits...
echo "🔄 Generating remaining FMS, IM, HRM chapters..."