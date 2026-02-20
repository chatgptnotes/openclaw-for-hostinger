#!/usr/bin/env python3
"""
NABH SOP Template Generator

Generates standardized Standard Operating Procedure templates for NABH hospital
accreditation compliance. Supports all hospital departments and processes.
"""

import json
import datetime
from pathlib import Path
from typing import Dict, List, Optional
import argparse

class NABHSOPGenerator:
    def __init__(self):
        """Initialize the NABH SOP Generator."""
        self.departments = {
            "ED": "Emergency Department",
            "OT": "Operation Theatre", 
            "ICU": "Intensive Care Unit",
            "PHARMACY": "Pharmacy Department",
            "LAB": "Laboratory",
            "NURSING": "Nursing Department",
            "QUALITY": "Quality Department",
            "ADMIN": "Administration",
            "RADIOLOGY": "Radiology Department",
            "CARDIOLOGY": "Cardiology Department"
        }
        
        self.sop_types = [
            "Clinical Protocol", "Emergency Procedure", "Administrative Process",
            "Quality Assurance", "Infection Control", "Safety Protocol",
            "Equipment Management", "Documentation", "Communication",
            "Training Procedure"
        ]
        
        self.nabh_alignment = {
            "Patient Safety": ["PSG.1", "PSG.2", "PSG.3", "PSG.4", "PSG.5", "PSG.6"],
            "Quality Improvement": ["QI.1", "QI.2", "QI.3", "QI.4", "QI.5"],
            "Infection Control": ["IPC.1", "IPC.2", "IPC.3", "IPC.4", "IPC.5"],
            "Medication Management": ["MMU.1", "MMU.2", "MMU.3", "MMU.4", "MMU.5"],
            "Patient Care": ["CCC.1", "CCC.2", "CCC.3", "CCC.4"]
        }
    
    def generate_sop_template(self, title: str, department: str, sop_type: str,
                            nabh_standards: Optional[List[str]] = None) -> Dict:
        """
        Generate a standardized SOP template.
        
        Args:
            title: SOP title/name
            department: Department code or name
            sop_type: Type of SOP (Clinical Protocol, etc.)
            nabh_standards: List of NABH standards this SOP addresses
        
        Returns:
            Dict containing the SOP template structure
        """
        sop_id = f"SOP_{department}_{datetime.datetime.now().strftime('%Y%m%d_%H%M')}"
        
        template = {
            "header": {
                "sop_id": sop_id,
                "title": title,
                "department": self.departments.get(department.upper(), department),
                "type": sop_type,
                "version": "1.0",
                "effective_date": datetime.datetime.now().strftime("%Y-%m-%d"),
                "next_review_date": (datetime.datetime.now() + datetime.timedelta(days=365)).strftime("%Y-%m-%d"),
                "page_numbers": "Page ___ of ___",
                "supersedes": "[Previous SOP version if applicable]"
            },
            "approval": {
                "prepared_by": {
                    "name": "[Name]",
                    "designation": "[Designation]",
                    "department": department,
                    "date": "",
                    "signature": ""
                },
                "reviewed_by": {
                    "name": "[Name]",
                    "designation": "[Quality Manager/Department Head]",
                    "department": "Quality/Department Head",
                    "date": "",
                    "signature": ""
                },
                "approved_by": {
                    "name": "[Name]",
                    "designation": "[Medical Superintendent/CEO]",
                    "department": "Administration",
                    "date": "",
                    "signature": ""
                }
            },
            "purpose": {
                "objective": f"[State the primary objective of this {sop_type.lower()}]",
                "scope": "[Define the scope - who, what, when, where this SOP applies]",
                "applicability": "[Specify departments, staff categories, situations where this applies]"
            },
            "responsibility": {
                "overall_responsibility": "[Role responsible for overall implementation]",
                "specific_responsibilities": {
                    "execution": "[Who executes this procedure]",
                    "monitoring": "[Who monitors compliance and effectiveness]",
                    "documentation": "[Who maintains records and documentation]",
                    "training": "[Who provides training on this SOP]"
                }
            },
            "definitions": {
                "note": "Define key terms, abbreviations, and technical terminology used in this SOP",
                "terms": [
                    {
                        "term": "[Term 1]",
                        "definition": "[Definition of term 1]"
                    },
                    {
                        "term": "[Term 2]", 
                        "definition": "[Definition of term 2]"
                    }
                ]
            },
            "procedure": {
                "prerequisites": [
                    "[Any prerequisites, preparations, or conditions required before starting]",
                    "[Equipment, supplies, or resources needed]",
                    "[Staff qualifications or training requirements]"
                ],
                "steps": [
                    {
                        "step_number": 1,
                        "action": "[Describe the first step clearly and precisely]",
                        "responsible_person": "[Who performs this step]",
                        "documentation_required": "[Any forms, records, or documentation needed]",
                        "time_frame": "[Expected timeframe for completion]"
                    },
                    {
                        "step_number": 2,
                        "action": "[Describe the second step]", 
                        "responsible_person": "[Who performs this step]",
                        "documentation_required": "[Documentation requirements]",
                        "time_frame": "[Timeframe]"
                    },
                    {
                        "step_number": 3,
                        "action": "[Continue with additional steps as needed]",
                        "responsible_person": "[Responsible person]",
                        "documentation_required": "[Documentation]",
                        "time_frame": "[Timeframe]"
                    }
                ],
                "decision_points": [
                    {
                        "condition": "[If/when condition]",
                        "action_yes": "[Action if condition is met]",
                        "action_no": "[Action if condition is not met]"
                    }
                ]
            },
            "documentation": {
                "required_records": [
                    "[Record/form 1 - purpose and retention period]",
                    "[Record/form 2 - purpose and retention period]", 
                    "[Record/form 3 - purpose and retention period]"
                ],
                "forms_and_checklists": [
                    "[Form/checklist name - when to use]",
                    "[Form/checklist name - when to use]"
                ],
                "retention_period": "[Specify how long records must be maintained]",
                "storage_location": "[Where records are stored - electronic/physical]"
            },
            "quality_control": {
                "monitoring_indicators": [
                    {
                        "indicator": "[Key performance indicator 1]",
                        "measurement_method": "[How to measure this indicator]",
                        "frequency": "[How often to measure]",
                        "target": "[Target value or benchmark]"
                    },
                    {
                        "indicator": "[Key performance indicator 2]",
                        "measurement_method": "[How to measure]",
                        "frequency": "[Frequency]",
                        "target": "[Target]"
                    }
                ],
                "review_schedule": {
                    "daily_checks": "[What to check daily if applicable]",
                    "weekly_review": "[What to review weekly if applicable]",
                    "monthly_analysis": "[What to analyze monthly if applicable]",
                    "annual_review": "[Annual comprehensive review requirements]"
                }
            },
            "training_requirements": {
                "initial_training": "[Training required before staff can perform this procedure]",
                "refresher_training": "[Ongoing training requirements and frequency]",
                "competency_assessment": "[How competency is assessed and documented]",
                "training_records": "[Where training records are maintained]"
            },
            "emergency_procedures": {
                "complications": "[Potential complications and immediate responses]",
                "escalation": "[When and how to escalate issues]",
                "emergency_contacts": "[Key contact numbers and roles]"
            },
            "nabh_compliance": {
                "related_standards": nabh_standards or ["[List relevant NABH standards]"],
                "evidence_requirements": "[What evidence this SOP provides for NABH]",
                "audit_points": "[Key points assessors will review]"
            },
            "references": {
                "internal_documents": [
                    "[Related hospital policies]",
                    "[Other relevant SOPs]",
                    "[Forms and checklists]"
                ],
                "external_references": [
                    "[Professional guidelines]",
                    "[Regulatory requirements]", 
                    "[Evidence-based protocols]"
                ],
                "nabh_standards": nabh_standards or ["[Specific NABH standards addressed]"]
            },
            "revision_history": [
                {
                    "version": "1.0",
                    "date": datetime.datetime.now().strftime("%Y-%m-%d"),
                    "changes": "Initial version",
                    "approved_by": "[Approver name]"
                }
            ],
            "distribution_list": [
                "[Department/role that should receive this SOP]",
                "[Department/role that should receive this SOP]",
                "Quality Department (Master copy)",
                "Medical Superintendent"
            ]
        }
        
        return template
    
    def generate_clinical_sop(self, procedure_name: str, department: str) -> Dict:
        """Generate a clinical procedure SOP template."""
        nabh_standards = ["CCC.1", "CCC.2", "PSG.1", "PSG.2"]
        return self.generate_sop_template(
            f"Clinical Protocol: {procedure_name}",
            department,
            "Clinical Protocol",
            nabh_standards
        )
    
    def generate_emergency_sop(self, emergency_type: str, department: str) -> Dict:
        """Generate an emergency response SOP template."""
        nabh_standards = ["FMS.1", "FMS.2", "PSG.5", "PSG.6"]
        return self.generate_sop_template(
            f"Emergency Response: {emergency_type}",
            department, 
            "Emergency Procedure",
            nabh_standards
        )
    
    def generate_quality_sop(self, process_name: str, department: str) -> Dict:
        """Generate a quality assurance SOP template."""
        nabh_standards = ["QI.1", "QI.2", "QI.3", "QI.4"]
        return self.generate_sop_template(
            f"Quality Procedure: {process_name}",
            department,
            "Quality Assurance",
            nabh_standards
        )
    
    def export_sop(self, sop_template: Dict, output_path: str, format_type: str = "json"):
        """Export SOP template to specified format."""
        output_file = Path(output_path)
        
        if format_type.lower() == "json":
            with open(output_file.with_suffix('.json'), 'w') as f:
                json.dump(sop_template, f, indent=2)
        elif format_type.lower() == "markdown":
            self._export_as_markdown(sop_template, output_file.with_suffix('.md'))
    
    def _export_as_markdown(self, sop: Dict, output_path: Path):
        """Export SOP template as formatted markdown."""
        with open(output_path, 'w') as f:
            # Header
            f.write(f"# {sop['header']['title']}\n\n")
            f.write(f"**SOP ID:** {sop['header']['sop_id']}\n")
            f.write(f"**Department:** {sop['header']['department']}\n")
            f.write(f"**Type:** {sop['header']['type']}\n")
            f.write(f"**Version:** {sop['header']['version']}\n")
            f.write(f"**Effective Date:** {sop['header']['effective_date']}\n")
            f.write(f"**Next Review:** {sop['header']['next_review_date']}\n\n")
            
            # Purpose
            f.write("## 1. Purpose and Scope\n\n")
            f.write(f"**Objective:** {sop['purpose']['objective']}\n\n")
            f.write(f"**Scope:** {sop['purpose']['scope']}\n\n")
            f.write(f"**Applicability:** {sop['purpose']['applicability']}\n\n")
            
            # Responsibility
            f.write("## 2. Responsibility\n\n")
            f.write(f"**Overall Responsibility:** {sop['responsibility']['overall_responsibility']}\n\n")
            
            # Procedure Steps
            f.write("## 3. Procedure\n\n")
            f.write("### Prerequisites\n\n")
            for prereq in sop['procedure']['prerequisites']:
                f.write(f"- {prereq}\n")
            f.write("\n### Steps\n\n")
            
            for step in sop['procedure']['steps']:
                f.write(f"**Step {step['step_number']}:** {step['action']}\n")
                f.write(f"- **Responsible:** {step['responsible_person']}\n")
                f.write(f"- **Documentation:** {step['documentation_required']}\n")
                f.write(f"- **Timeframe:** {step['time_frame']}\n\n")
            
            # Quality Control
            f.write("## 4. Quality Control and Monitoring\n\n")
            for indicator in sop['quality_control']['monitoring_indicators']:
                f.write(f"**{indicator['indicator']}**\n")
                f.write(f"- Measurement: {indicator['measurement_method']}\n")
                f.write(f"- Frequency: {indicator['frequency']}\n")
                f.write(f"- Target: {indicator['target']}\n\n")
            
            # NABH Compliance
            f.write("## 5. NABH Compliance\n\n")
            f.write("**Related NABH Standards:**\n")
            for standard in sop['nabh_compliance']['related_standards']:
                f.write(f"- {standard}\n")
            f.write(f"\n**Evidence Requirements:** {sop['nabh_compliance']['evidence_requirements']}\n\n")
            
            # References
            f.write("## 6. References\n\n")
            f.write("### Internal Documents\n")
            for ref in sop['references']['internal_documents']:
                f.write(f"- {ref}\n")
            f.write("\n### External References\n")
            for ref in sop['references']['external_references']:
                f.write(f"- {ref}\n")
            
            # Approval
            f.write("\n## 7. Approval\n\n")
            f.write("| Role | Name | Date | Signature |\n")
            f.write("|------|------|------|----------|\n")
            for role, details in sop['approval'].items():
                f.write(f"| {role.replace('_', ' ').title()} | {details.get('name', '')} | {details.get('date', '')} | {details.get('signature', '')} |\n")

def main():
    """Command line interface for the SOP generator."""
    parser = argparse.ArgumentParser(description="Generate NABH SOP templates")
    parser.add_argument("--title", required=True, help="SOP title")
    parser.add_argument("--department", required=True, help="Department code or name")
    parser.add_argument("--type", required=True, help="SOP type (Clinical, Emergency, Quality, etc.)")
    parser.add_argument("--output", required=True, help="Output file path")
    parser.add_argument("--format", default="json", choices=["json", "markdown"], help="Output format")
    
    args = parser.parse_args()
    
    generator = NABHSOPGenerator()
    
    # Generate appropriate SOP based on type
    if "clinical" in args.type.lower():
        template = generator.generate_clinical_sop(args.title, args.department)
    elif "emergency" in args.type.lower():
        template = generator.generate_emergency_sop(args.title, args.department)
    elif "quality" in args.type.lower():
        template = generator.generate_quality_sop(args.title, args.department)
    else:
        template = generator.generate_sop_template(args.title, args.department, args.type)
    
    generator.export_sop(template, args.output, args.format)
    print(f"SOP template generated: {args.output}")

if __name__ == "__main__":
    main()