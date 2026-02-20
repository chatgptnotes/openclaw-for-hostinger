#!/usr/bin/env python3
"""
NABH Evidence Template Generator

Generates standardized evidence templates for NABH hospital accreditation compliance.
Supports all NABH chapters and standards with proper formatting and structure.
"""

import json
import datetime
from pathlib import Path
from typing import Dict, List, Optional
import argparse

class NABHEvidenceGenerator:
    def __init__(self):
        """Initialize the NABH Evidence Generator."""
        self.nabh_chapters = {
            "COP": "Continuum of Care",
            "ASC": "Assessment of Patients", 
            "CCC": "Care of Patients",
            "MMU": "Medication Management and Use",
            "PSG": "Patient Safety Goals",
            "IPC": "Infection Prevention and Control",
            "FMS": "Facility Management and Safety",
            "HMS": "Human Resource Management",
            "IMS": "Information Management System",
            "QI": "Quality Improvement"
        }
        
        self.evidence_types = [
            "Policy", "Procedure", "Record", "Metric", "Audit", 
            "Training", "Checklist", "Report", "Log", "Certificate"
        ]
    
    def generate_evidence_template(self, chapter: str, standard: str, evidence_type: str, 
                                 custom_fields: Optional[Dict] = None) -> Dict:
        """
        Generate a standardized evidence template.
        
        Args:
            chapter: NABH chapter code (COP, ASC, etc.)
            standard: Standard number (e.g., "3.1", "4.2.1")
            evidence_type: Type of evidence (Policy, Record, etc.)
            custom_fields: Additional custom fields
        
        Returns:
            Dict containing the evidence template structure
        """
        template = {
            "metadata": {
                "template_id": f"{chapter}_{standard}_{evidence_type}_{datetime.datetime.now().strftime('%Y%m%d')}",
                "created_date": datetime.datetime.now().isoformat(),
                "nabh_version": "5th Edition",
                "chapter": chapter,
                "chapter_name": self.nabh_chapters.get(chapter, "Unknown Chapter"),
                "standard": standard,
                "evidence_type": evidence_type
            },
            "header": {
                "hospital_name": "[Hospital Name]",
                "nabh_chapter": f"{chapter} - {self.nabh_chapters.get(chapter, 'Unknown')}",
                "standard_reference": f"{chapter}.{standard}",
                "evidence_title": f"{evidence_type} for {chapter}.{standard}",
                "preparation_date": datetime.datetime.now().strftime("%Y-%m-%d"),
                "prepared_by": "[Name and Designation]",
                "reviewed_by": "[Quality Team Lead]",
                "approved_by": "[Medical Superintendent/CEO]"
            },
            "evidence_details": {
                "objective": f"[State the specific objective this evidence addresses for {chapter}.{standard}]",
                "scope": "[Define the scope - departments, processes, timeframe covered]",
                "methodology": "[Describe how this evidence was collected/compiled]",
                "frequency": "[How often this evidence is updated - daily/monthly/quarterly]",
                "responsible_person": "[Role/person responsible for maintaining this evidence]",
                "related_standards": "[List any related NABH standards]"
            },
            "compliance_matrix": {
                "requirement": f"[NABH {chapter}.{standard} requirement text]",
                "current_status": "[Compliant/Partially Compliant/Non-Compliant]",
                "evidence_provided": "[Description of evidence provided]",
                "gaps_identified": "[Any gaps or areas for improvement]",
                "action_plan": "[Actions to address gaps]",
                "target_date": "[Date for completion of actions]"
            },
            "documentation": {
                "primary_documents": [],
                "supporting_documents": [],
                "cross_references": [],
                "external_references": []
            },
            "quality_indicators": {
                "kpi_measured": "[Key Performance Indicator if applicable]",
                "measurement_period": "[Time period for data]",
                "data_source": "[Source of data/information]",
                "benchmark": "[Target or benchmark value]",
                "current_performance": "[Current performance level]"
            },
            "review_and_approval": {
                "prepared_by": {
                    "name": "",
                    "designation": "",
                    "date": "",
                    "signature": ""
                },
                "reviewed_by": {
                    "name": "",
                    "designation": "",
                    "date": "",
                    "signature": ""
                },
                "approved_by": {
                    "name": "",
                    "designation": "", 
                    "date": "",
                    "signature": ""
                }
            }
        }
        
        # Add custom fields if provided
        if custom_fields:
            template.update(custom_fields)
        
        return template
    
    def generate_chapter_evidence_set(self, chapter: str) -> List[Dict]:
        """Generate a complete set of evidence templates for a chapter."""
        chapter_standards = self._get_chapter_standards(chapter)
        evidence_set = []
        
        for standard in chapter_standards:
            for evidence_type in self.evidence_types[:3]:  # Generate top 3 common types
                template = self.generate_evidence_template(chapter, standard, evidence_type)
                evidence_set.append(template)
        
        return evidence_set
    
    def _get_chapter_standards(self, chapter: str) -> List[str]:
        """Get standard numbers for a given chapter."""
        # This is a simplified version - in practice, would come from NABH standards database
        standard_map = {
            "COP": ["1.1", "1.2", "2.1", "2.2", "3.1"],
            "ASC": ["1.1", "1.2", "2.1", "3.1", "4.1"],
            "CCC": ["1.1", "2.1", "3.1", "4.1", "5.1"],
            "MMU": ["1.1", "2.1", "3.1", "4.1", "5.1"],
            "PSG": ["1", "2", "3", "4", "5", "6"],
            "IPC": ["1.1", "2.1", "3.1", "4.1", "5.1"],
            "FMS": ["1.1", "2.1", "3.1", "4.1", "5.1"],
            "HMS": ["1.1", "2.1", "3.1", "4.1", "5.1"],
            "IMS": ["1.1", "2.1", "3.1", "4.1", "5.1"],
            "QI": ["1.1", "2.1", "3.1", "4.1", "5.1"]
        }
        return standard_map.get(chapter, ["1.1"])
    
    def export_template(self, template: Dict, output_path: str, format_type: str = "json"):
        """Export template to specified format."""
        output_file = Path(output_path)
        
        if format_type.lower() == "json":
            with open(output_file.with_suffix('.json'), 'w') as f:
                json.dump(template, f, indent=2)
        elif format_type.lower() == "markdown":
            self._export_as_markdown(template, output_file.with_suffix('.md'))
    
    def _export_as_markdown(self, template: Dict, output_path: Path):
        """Export template as formatted markdown."""
        with open(output_path, 'w') as f:
            f.write(f"# {template['header']['evidence_title']}\n\n")
            f.write(f"**Chapter:** {template['header']['nabh_chapter']}\n")
            f.write(f"**Standard:** {template['header']['standard_reference']}\n")
            f.write(f"**Date:** {template['header']['preparation_date']}\n\n")
            
            f.write("## Evidence Details\n\n")
            for key, value in template['evidence_details'].items():
                f.write(f"**{key.replace('_', ' ').title()}:** {value}\n\n")
            
            f.write("## Compliance Matrix\n\n")
            for key, value in template['compliance_matrix'].items():
                f.write(f"**{key.replace('_', ' ').title()}:** {value}\n\n")
            
            f.write("## Review and Approval\n\n")
            f.write("| Role | Name | Date | Signature |\n")
            f.write("|------|------|------|----------|\n")
            for role, details in template['review_and_approval'].items():
                f.write(f"| {role.replace('_', ' ').title()} | {details.get('name', '')} | {details.get('date', '')} | {details.get('signature', '')} |\n")

def main():
    """Command line interface for the evidence generator."""
    parser = argparse.ArgumentParser(description="Generate NABH evidence templates")
    parser.add_argument("--chapter", required=True, help="NABH chapter code (COP, ASC, etc.)")
    parser.add_argument("--standard", required=True, help="Standard number (e.g., 3.1)")
    parser.add_argument("--type", required=True, help="Evidence type (Policy, Record, etc.)")
    parser.add_argument("--output", required=True, help="Output file path")
    parser.add_argument("--format", default="json", choices=["json", "markdown"], help="Output format")
    
    args = parser.parse_args()
    
    generator = NABHEvidenceGenerator()
    template = generator.generate_evidence_template(
        args.chapter.upper(), 
        args.standard, 
        args.type
    )
    
    generator.export_template(template, args.output, args.format)
    print(f"Evidence template generated: {args.output}")

if __name__ == "__main__":
    main()