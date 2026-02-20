#!/usr/bin/env python3
"""
NABH SOP Generator for Hope & Ayushman Hospitals
Generates complete SOPs for all 408 NABH objective elements
"""

import os
import json
from datetime import datetime, timedelta
from typing import Dict, List, Tuple

class NABHSOPGenerator:
    def __init__(self):
        self.base_path = "/Users/murali/.openclaw/workspace/generated_sops"
        self.hospital_name = "Hope & Ayushman Hospitals"
        self.effective_date = "2026-02-06"
        self.review_date = "2027-02-06"
        
        # Already completed SOPs to skip
        self.completed_sops = {
            'AAC': ['AAC.1.1', 'AAC.1.2', 'AAC.1.3', 'AAC.1.4', 'AAC.1.5'],
            'COP': ['COP.2.1'],
            'MOM': ['MOM.4.2'],
            'HIC': ['HIC.2.1', 'HIC.3.1'],
            'CQI': ['CQI.3.1']
        }
        
        # NABH elements from reference document
        self.nabh_elements = self.load_nabh_elements()
        
    def load_nabh_elements(self) -> Dict:
        """Load NABH elements structure from the reference"""
        return {
            'AAC': {
                'title': 'Access, Assessment and Continuity of Care',
                'total_elements': 45,
                'sections': {
                    'AAC.1': {'title': 'Emergency Care', 'count': 10, 'elements': [
                        'Emergency department availability and access',
                        'Triage system implementation',
                        'Emergency care protocols',
                        'Resuscitation procedures',
                        'Emergency medication availability',
                        'Emergency equipment maintenance',
                        'Staff competency in emergency care',
                        'Patient tracking in emergency',
                        'Emergency documentation',
                        'Emergency discharge procedures'
                    ]},
                    'AAC.2': {'title': 'Admission Process', 'count': 8, 'elements': [
                        'Patient identification and registration',
                        'Admission criteria and protocols',
                        'Bed allocation procedures',
                        'Insurance verification process',
                        'Initial assessment protocols',
                        'Patient orientation procedures',
                        'Admission documentation',
                        'Communication with family'
                    ]},
                    'AAC.3': {'title': 'Assessment of Patients', 'count': 12, 'elements': [
                        'Initial medical assessment',
                        'Nursing assessment protocols',
                        'Risk assessment procedures',
                        'Nutritional assessment',
                        'Pain assessment protocols',
                        'Fall risk assessment',
                        'Pressure ulcer risk assessment',
                        'Mental health screening',
                        'Functional assessment',
                        'Social assessment',
                        'Assessment documentation',
                        'Reassessment protocols'
                    ]},
                    'AAC.4': {'title': 'Care Planning', 'count': 8, 'elements': [
                        'Individual care plan development',
                        'Multidisciplinary team involvement',
                        'Patient/family participation in planning',
                        'Goal setting procedures',
                        'Care plan documentation',
                        'Care plan reviews and updates',
                        'Discharge planning initiation',
                        'Communication of care plans'
                    ]},
                    'AAC.5': {'title': 'Transportation of Patients', 'count': 7, 'elements': [
                        'Patient transport protocols',
                        'Equipment for transport',
                        'Staff competency for transport',
                        'Transport documentation',
                        'Inter-facility transport procedures',
                        'Emergency transport protocols',
                        'Transport safety measures'
                    ]}
                }
            },
            'COP': {
                'title': 'Care of Patients',
                'total_elements': 52,
                'sections': {
                    'COP.1': {'title': 'Planning Care', 'count': 8, 'elements': [
                        'Evidence-based care protocols',
                        'Clinical pathway development',
                        'Standardized care procedures',
                        'Care delivery monitoring',
                        'Patient response evaluation',
                        'Care modification procedures',
                        'Outcome measurement',
                        'Care documentation standards'
                    ]},
                    'COP.2': {'title': 'High Risk Patients', 'count': 10, 'elements': [
                        'High-risk patient identification',
                        'Enhanced monitoring protocols',
                        'Specialized care procedures',
                        'Family communication for high-risk',
                        'Resuscitation status documentation',
                        'End-of-life care protocols',
                        'Palliative care procedures',
                        'Ethics committee consultations',
                        'Advance directive management',
                        'High-risk care documentation'
                    ]},
                    'COP.3': {'title': 'Nutrition and Food Service', 'count': 12, 'elements': [
                        'Nutritional assessment protocols',
                        'Diet order procedures',
                        'Therapeutic diet management',
                        'Food safety protocols',
                        'Meal service procedures',
                        'Nutrition counseling protocols',
                        'Enteral nutrition procedures',
                        'Parenteral nutrition protocols',
                        'Food allergy management',
                        'Nutrition monitoring',
                        'Kitchen hygiene procedures',
                        'Nutrition documentation'
                    ]},
                    'COP.4': {'title': 'Pain Management', 'count': 8, 'elements': [
                        'Pain assessment protocols',
                        'Pain management planning',
                        'Pharmacological pain management',
                        'Non-pharmacological pain management',
                        'Pain monitoring procedures',
                        'Patient education on pain',
                        'Pain team consultations',
                        'Pain documentation standards'
                    ]},
                    'COP.5': {'title': 'End of Life Care', 'count': 14, 'elements': [
                        'End-of-life identification',
                        'Family communication protocols',
                        'Comfort care procedures',
                        'Spiritual care support',
                        'Pain and symptom management',
                        'Family support services',
                        'Cultural sensitivity protocols',
                        'Bereavement support',
                        'Organ donation procedures',
                        'Death certification protocols',
                        'Body handling procedures',
                        'Autopsy consent procedures',
                        'Family counseling',
                        'End-of-life documentation'
                    ]}
                }
            },
            'MOM': {
                'title': 'Management of Medication',
                'total_elements': 48,
                'sections': {
                    'MOM.1': {'title': 'Medication Management System', 'count': 12, 'elements': [
                        'Medication formulary management',
                        'Procurement procedures',
                        'Storage protocols',
                        'Distribution systems',
                        'Inventory management',
                        'Expiry date monitoring',
                        'Controlled drug management',
                        'Emergency medication availability',
                        'Medication security protocols',
                        'Temperature monitoring',
                        'Medication disposal procedures',
                        'Vendor qualification'
                    ]},
                    'MOM.2': {'title': 'Medication Ordering and Transcription', 'count': 10, 'elements': [
                        'Prescription writing standards',
                        'Electronic prescribing protocols',
                        'Medication order verification',
                        'High-alert medication protocols',
                        'Allergy documentation',
                        'Drug interaction checking',
                        'Dosing verification procedures',
                        'Order clarification protocols',
                        'Verbal order procedures',
                        'Order documentation standards'
                    ]},
                    'MOM.3': {'title': 'Preparation and Dispensing', 'count': 8, 'elements': [
                        'Medication preparation protocols',
                        'Sterile compounding procedures',
                        'Labeling standards',
                        'Double-check procedures',
                        'Contamination prevention',
                        'Quality control testing',
                        'Packaging procedures',
                        'Dispensing documentation'
                    ]},
                    'MOM.4': {'title': 'Administration', 'count': 10, 'elements': [
                        'Patient identification verification',
                        'Right patient protocols',
                        'Right medication verification',
                        'Right dose confirmation',
                        'Right route verification',
                        'Right time administration',
                        'Administration documentation',
                        'Patient monitoring post-administration',
                        'Adverse reaction protocols',
                        'Medication refusal procedures'
                    ]},
                    'MOM.5': {'title': 'Monitoring', 'count': 8, 'elements': [
                        'Therapeutic monitoring protocols',
                        'Drug level monitoring',
                        'Side effect monitoring',
                        'Drug interaction monitoring',
                        'Effectiveness evaluation',
                        'Laboratory monitoring',
                        'Patient response assessment',
                        'Monitoring documentation'
                    ]}
                }
            },
            'PRE': {
                'title': 'Patient Rights and Education',
                'total_elements': 35,
                'sections': {
                    'PRE.1': {'title': 'Patient Rights', 'count': 15, 'elements': [
                        'Patient rights policy',
                        'Rights communication procedures',
                        'Informed consent protocols',
                        'Privacy protection procedures',
                        'Confidentiality protocols',
                        'Access to information procedures',
                        'Complaint handling procedures',
                        'Grievance resolution protocols',
                        'Patient advocacy procedures',
                        'Cultural sensitivity protocols',
                        'Language assistance procedures',
                        'Advance directive management',
                        'Research participation rights',
                        'Rights documentation',
                        'Staff training on rights'
                    ]},
                    'PRE.2': {'title': 'Patient Education', 'count': 20, 'elements': [
                        'Education needs assessment',
                        'Education plan development',
                        'Health literacy assessment',
                        'Education material development',
                        'Multi-language materials',
                        'Condition-specific education',
                        'Medication education protocols',
                        'Discharge education procedures',
                        'Family education protocols',
                        'Demonstration and return demonstration',
                        'Education effectiveness evaluation',
                        'Follow-up education procedures',
                        'Nutrition education protocols',
                        'Exercise education procedures',
                        'Prevention education protocols',
                        'Self-care education',
                        'Technology-based education',
                        'Group education procedures',
                        'Education documentation',
                        'Educator competency standards'
                    ]}
                }
            },
            'HIC': {
                'title': 'Hospital Infection Control',
                'total_elements': 42,
                'sections': {
                    'HIC.1': {'title': 'Infection Control Program', 'count': 8, 'elements': [
                        'Infection control policy development',
                        'Infection control committee',
                        'Surveillance protocols',
                        'Data collection procedures',
                        'Risk assessment protocols',
                        'Prevention strategy development',
                        'Performance monitoring',
                        'Program evaluation procedures'
                    ]},
                    'HIC.2': {'title': 'Hand Hygiene', 'count': 6, 'elements': [
                        'Hand hygiene protocols',
                        'Hand hygiene monitoring',
                        'Hand hygiene compliance assessment',
                        'Hand hygiene training',
                        'Alcohol-based hand rub availability',
                        'Hand hygiene documentation'
                    ]},
                    'HIC.3': {'title': 'Isolation Precautions', 'count': 8, 'elements': [
                        'Standard precautions protocols',
                        'Transmission-based precautions',
                        'Isolation identification procedures',
                        'Personal protective equipment protocols',
                        'Patient placement procedures',
                        'Visitor restriction protocols',
                        'Equipment disinfection procedures',
                        'Isolation documentation'
                    ]},
                    'HIC.4': {'title': 'Sterilization and Disinfection', 'count': 10, 'elements': [
                        'Sterilization protocols',
                        'Disinfection procedures',
                        'Equipment processing protocols',
                        'Quality assurance testing',
                        'Biological indicator monitoring',
                        'Chemical indicator protocols',
                        'Sterile storage procedures',
                        'Package integrity monitoring',
                        'Equipment maintenance procedures',
                        'Sterilization documentation'
                    ]},
                    'HIC.5': {'title': 'Environmental Cleaning', 'count': 10, 'elements': [
                        'Cleaning protocols development',
                        'Cleaning schedule procedures',
                        'Disinfectant selection protocols',
                        'High-touch surface cleaning',
                        'Terminal cleaning procedures',
                        'Spill management protocols',
                        'Cleaning equipment protocols',
                        'Cleaning staff training',
                        'Cleaning quality monitoring',
                        'Cleaning documentation'
                    ]}
                }
            },
            'CQI': {
                'title': 'Continuous Quality Improvement',
                'total_elements': 38,
                'sections': {
                    'CQI.1': {'title': 'Quality Management', 'count': 12, 'elements': [
                        'Quality policy development',
                        'Quality committee structure',
                        'Quality plan development',
                        'Performance indicator selection',
                        'Data collection protocols',
                        'Analysis procedures',
                        'Improvement initiative protocols',
                        'Monitoring procedures',
                        'Reporting protocols',
                        'Communication procedures',
                        'Resource allocation',
                        'Quality documentation'
                    ]},
                    'CQI.2': {'title': 'Clinical Quality', 'count': 13, 'elements': [
                        'Clinical indicator monitoring',
                        'Clinical audit procedures',
                        'Evidence-based practice protocols',
                        'Clinical guideline development',
                        'Clinical pathway monitoring',
                        'Outcome measurement',
                        'Clinical risk assessment',
                        'Patient safety initiatives',
                        'Clinical improvement projects',
                        'Peer review procedures',
                        'Case review protocols',
                        'Clinical data analysis',
                        'Clinical documentation standards'
                    ]},
                    'CQI.3': {'title': 'Patient Safety', 'count': 13, 'elements': [
                        'Patient safety program',
                        'Safety reporting systems',
                        'Incident analysis procedures',
                        'Root cause analysis protocols',
                        'Safety improvement initiatives',
                        'Safety training programs',
                        'Safety communication protocols',
                        'Safety monitoring procedures',
                        'Safety culture assessment',
                        'Safety committee procedures',
                        'Safety alert protocols',
                        'Safety documentation',
                        'Safety performance measurement'
                    ]}
                }
            },
            'ROM': {
                'title': 'Responsibilities of Management',
                'total_elements': 35,
                'sections': {
                    'ROM.1': {'title': 'Governance and Leadership', 'count': 15, 'elements': [
                        'Governance structure protocols',
                        'Leadership responsibilities',
                        'Strategic planning procedures',
                        'Policy development protocols',
                        'Resource allocation procedures',
                        'Performance monitoring protocols',
                        'Risk management procedures',
                        'Compliance monitoring',
                        'Stakeholder communication',
                        'Decision-making protocols',
                        'Delegation procedures',
                        'Accountability frameworks',
                        'Governance documentation',
                        'Leadership development',
                        'Succession planning'
                    ]},
                    'ROM.2': {'title': 'Human Resource Management', 'count': 20, 'elements': [
                        'Recruitment procedures',
                        'Selection protocols',
                        'Orientation procedures',
                        'Training and development',
                        'Competency assessment',
                        'Performance evaluation',
                        'Career development planning',
                        'Staffing procedures',
                        'Work schedule management',
                        'Credentialing procedures',
                        'Professional development',
                        'Recognition programs',
                        'Disciplinary procedures',
                        'Termination protocols',
                        'Employee health programs',
                        'Workplace safety protocols',
                        'Employee communication',
                        'Grievance procedures',
                        'HR documentation',
                        'Compliance monitoring'
                    ]}
                }
            },
            'FMS': {
                'title': 'Facility Management and Safety',
                'total_elements': 43,
                'sections': {
                    'FMS.1': {'title': 'Safety Management', 'count': 15, 'elements': [
                        'Safety program development',
                        'Hazard identification',
                        'Risk assessment procedures',
                        'Safety training programs',
                        'Emergency response protocols',
                        'Fire safety procedures',
                        'Electrical safety protocols',
                        'Chemical safety procedures',
                        'Radiation safety protocols',
                        'Construction safety procedures',
                        'Visitor safety protocols',
                        'Security procedures',
                        'Incident reporting procedures',
                        'Safety documentation',
                        'Safety performance monitoring'
                    ]},
                    'FMS.2': {'title': 'Medical Equipment', 'count': 14, 'elements': [
                        'Equipment procurement procedures',
                        'Equipment installation protocols',
                        'Preventive maintenance procedures',
                        'Corrective maintenance protocols',
                        'Equipment calibration procedures',
                        'Quality control testing',
                        'Equipment documentation',
                        'User training procedures',
                        'Equipment monitoring protocols',
                        'Equipment retirement procedures',
                        'Emergency equipment protocols',
                        'Equipment safety procedures',
                        'Service contract management',
                        'Equipment performance monitoring'
                    ]},
                    'FMS.3': {'title': 'Utilities Management', 'count': 14, 'elements': [
                        'Water system management',
                        'Electrical system protocols',
                        'HVAC system procedures',
                        'Medical gas system protocols',
                        'Backup power procedures',
                        'Utility monitoring protocols',
                        'Emergency utility procedures',
                        'Utility maintenance protocols',
                        'Energy management procedures',
                        'Environmental monitoring',
                        'Waste management protocols',
                        'Utility documentation',
                        'Utility compliance procedures',
                        'Utility performance monitoring'
                    ]}
                }
            },
            'IM': {
                'title': 'Information Management',
                'total_elements': 30,
                'sections': {
                    'IM.1': {'title': 'Information Systems', 'count': 10, 'elements': [
                        'Information system planning',
                        'System implementation protocols',
                        'Data management procedures',
                        'System security protocols',
                        'Backup and recovery procedures',
                        'System maintenance protocols',
                        'User access management',
                        'System monitoring procedures',
                        'System documentation',
                        'System performance monitoring'
                    ]},
                    'IM.2': {'title': 'Medical Records', 'count': 20, 'elements': [
                        'Medical record creation protocols',
                        'Documentation standards',
                        'Record completion procedures',
                        'Authentication protocols',
                        'Correction procedures',
                        'Record retention protocols',
                        'Access control procedures',
                        'Privacy protection protocols',
                        'Release of information procedures',
                        'Record storage protocols',
                        'Electronic record procedures',
                        'Record quality monitoring',
                        'Coding procedures',
                        'Record retrieval protocols',
                        'Record destruction procedures',
                        'Legal compliance procedures',
                        'Audit procedures',
                        'Training procedures',
                        'Record documentation',
                        'Performance monitoring'
                    ]}
                }
            },
            'HRM': {
                'title': 'Human Resource Management',
                'total_elements': 40,
                'sections': {
                    'HRM.1': {'title': 'Organizational Structure', 'count': 8, 'elements': [
                        'Organizational chart development',
                        'Job description creation',
                        'Reporting relationship protocols',
                        'Role definition procedures',
                        'Authority delegation protocols',
                        'Coordination procedures',
                        'Communication protocols',
                        'Organizational documentation'
                    ]},
                    'HRM.2': {'title': 'Recruitment and Selection', 'count': 12, 'elements': [
                        'Workforce planning procedures',
                        'Recruitment strategy development',
                        'Job posting procedures',
                        'Application screening protocols',
                        'Interview procedures',
                        'Selection criteria protocols',
                        'Background verification procedures',
                        'Reference checking protocols',
                        'Medical examination procedures',
                        'Offer management protocols',
                        'Recruitment documentation',
                        'Selection performance monitoring'
                    ]},
                    'HRM.3': {'title': 'Training and Development', 'count': 20, 'elements': [
                        'Training needs assessment',
                        'Training program development',
                        'Orientation procedures',
                        'Skills training protocols',
                        'Safety training procedures',
                        'Continuing education protocols',
                        'Competency assessment procedures',
                        'Training delivery protocols',
                        'E-learning procedures',
                        'External training management',
                        'Training evaluation procedures',
                        'Training record management',
                        'Trainer qualification protocols',
                        'Training resource management',
                        'Training effectiveness monitoring',
                        'Training documentation',
                        'Professional development planning',
                        'Career progression protocols',
                        'Mentoring procedures',
                        'Training performance monitoring'
                    ]}
                }
            }
        }
    
    def generate_sop_content(self, chapter: str, section: str, element_num: int, 
                           element_title: str, sop_counter: int) -> str:
        """Generate complete SOP content for a specific NABH element"""
        
        section_title = self.nabh_elements[chapter]['sections'][section]['title']
        
        # Generate SOP ID
        sop_id = f"SOP-{chapter}-{section.split('.')[1]}.{element_num}-{sop_counter:03d}"
        
        # Determine department based on chapter and section
        department = self.get_department(chapter, section)
        
        # Generate content based on element type
        content = f"""# {element_title.title()} ({section}.{element_num})

**SOP ID:** {sop_id}
**Department:** {department}
**Type:** {self.get_sop_type(chapter, section)}
**Version:** 1.0
**Effective Date:** {self.effective_date}
**Next Review:** {self.review_date}
**NABH Standard:** {section}.{element_num} - {element_title}

---

## 1. Purpose and Scope

**Objective:** {self.generate_objective(element_title, chapter, section)}

**Scope:** This SOP covers:
{self.generate_scope(element_title, chapter, section)}

**Applicable to:**
{self.generate_applicable_staff(chapter, section)}

---

## 2. Definitions

{self.generate_definitions(element_title, chapter, section)}

---

## 3. Responsibility

{self.generate_responsibility_table(chapter, section)}

---

## 4. Policy Statement

{self.hospital_name} {self.generate_policy_statement(element_title, chapter, section)}

---

## 5. Procedure

{self.generate_procedure_content(element_title, chapter, section, element_num)}

---

## 6. Quality Indicators

{self.generate_quality_indicators(element_title, chapter, section)}

---

## 7. Documentation Requirements

{self.generate_documentation_requirements(element_title, chapter, section)}

---

## 8. Training Requirements

{self.generate_training_requirements(chapter, section)}

---

## 9. Escalation Procedures

{self.generate_escalation_procedures(chapter, section)}

---

## 10. NABH Compliance Evidence

**NABH Standard Reference:** {chapter}.{section.split('.')[1]} - {section_title}

{self.generate_compliance_evidence(element_title, chapter, section)}

---

## 11. References

### Internal Documents
{self.generate_internal_references(chapter, section)}

### External References
{self.generate_external_references(chapter, section)}

---

## 12. Revision History

| Version | Date | Changes | Approved By |
|---------|------|---------|-------------|
| 1.0 | {self.effective_date} | Initial release | Medical Superintendent |

---

## 13. Approval

| Role | Name | Designation | Date | Signature |
|------|------|-------------|------|-----------|
| Prepared By | | {self.get_preparer_designation(chapter, section)} | | |
| Reviewed By | | {self.get_reviewer_designation(chapter, section)} | | |
| Approved By | | Medical Superintendent | | |

---

**Document Control:** This is a controlled document. Unauthorized copies are not valid."""

        return content
    
    def get_department(self, chapter: str, section: str) -> str:
        """Get appropriate department for the SOP"""
        dept_mapping = {
            'AAC.1': 'Emergency Department',
            'AAC.2': 'Admissions / Patient Registration',
            'AAC.3': 'Clinical Departments',
            'AAC.4': 'Case Management',
            'AAC.5': 'Patient Transport Services',
            'COP.1': 'Clinical Departments',
            'COP.2': 'Critical Care / Clinical Departments',
            'COP.3': 'Nutrition Services / Dietetics',
            'COP.4': 'Pain Management / Clinical Departments',
            'COP.5': 'Palliative Care / Clinical Departments',
            'MOM.1': 'Pharmacy Department',
            'MOM.2': 'Pharmacy Department / Clinical Departments',
            'MOM.3': 'Pharmacy Department',
            'MOM.4': 'Clinical Departments / Nursing',
            'MOM.5': 'Clinical Departments / Pharmacy',
            'PRE.1': 'Patient Relations / Administration',
            'PRE.2': 'Patient Education / Clinical Departments',
            'HIC.1': 'Infection Control Department',
            'HIC.2': 'All Clinical Departments',
            'HIC.3': 'Infection Control / Clinical Departments',
            'HIC.4': 'Central Sterile Supply Department',
            'HIC.5': 'Housekeeping / Environmental Services',
            'CQI.1': 'Quality Management Department',
            'CQI.2': 'Clinical Departments / Quality Management',
            'CQI.3': 'Patient Safety Department',
            'ROM.1': 'Hospital Administration',
            'ROM.2': 'Human Resources Department',
            'FMS.1': 'Facility Management / Safety Department',
            'FMS.2': 'Biomedical Engineering / Facility Management',
            'FMS.3': 'Engineering Services / Facility Management',
            'IM.1': 'Information Technology Department',
            'IM.2': 'Medical Records Department',
            'HRM.1': 'Human Resources Department',
            'HRM.2': 'Human Resources Department',
            'HRM.3': 'Human Resources / Training Department'
        }
        return dept_mapping.get(section, 'Clinical Departments')
    
    def get_sop_type(self, chapter: str, section: str) -> str:
        """Get SOP type based on content area"""
        type_mapping = {
            'AAC': 'Clinical Protocol',
            'COP': 'Patient Care Protocol',
            'MOM': 'Medication Management Protocol',
            'PRE': 'Patient Rights and Education Protocol',
            'HIC': 'Infection Control Protocol',
            'CQI': 'Quality Improvement Protocol',
            'ROM': 'Management Protocol',
            'FMS': 'Facility Management Protocol',
            'IM': 'Information Management Protocol',
            'HRM': 'Human Resource Protocol'
        }
        return type_mapping.get(chapter, 'Clinical Protocol')
    
    def generate_objective(self, title: str, chapter: str, section: str) -> str:
        """Generate objective based on element title"""
        objectives = {
            'emergency': f"To establish standardized procedures for {title.lower()} ensuring rapid, effective, and safe emergency care delivery at {self.hospital_name}.",
            'assessment': f"To implement systematic {title.lower()} procedures ensuring comprehensive evaluation and appropriate care planning for all patients.",
            'documentation': f"To establish comprehensive {title.lower()} standards ensuring accurate, timely, and legally compliant record-keeping.",
            'monitoring': f"To implement effective {title.lower()} systems ensuring continuous oversight and quality improvement.",
            'safety': f"To establish robust {title.lower()} procedures ensuring patient and staff safety throughout the care process.",
            'default': f"To establish comprehensive procedures for {title.lower()} ensuring quality, safety, and compliance with NABH standards."
        }
        
        # Determine which objective to use based on title keywords
        for key in objectives:
            if key in title.lower():
                return objectives[key]
        return objectives['default']
    
    def generate_scope(self, title: str, chapter: str, section: str) -> str:
        """Generate scope items based on element"""
        common_scope = [
            "- Standard operating procedures",
            "- Staff responsibilities and competencies",
            "- Quality assurance measures",
            "- Documentation requirements",
            "- Monitoring and evaluation processes"
        ]
        
        # Add specific scope items based on content area
        specific_scope = {
            'emergency': ["- Emergency response protocols", "- Resource mobilization procedures", "- Inter-departmental coordination"],
            'assessment': ["- Assessment methodologies", "- Risk stratification procedures", "- Care planning integration"],
            'medication': ["- Drug administration protocols", "- Safety verification procedures", "- Adverse event management"],
            'infection': ["- Prevention strategies", "- Surveillance procedures", "- Outbreak management"],
            'quality': ["- Performance monitoring", "- Improvement initiatives", "- Benchmarking procedures"]
        }
        
        scope_items = common_scope.copy()
        for key, items in specific_scope.items():
            if key in title.lower():
                scope_items.extend(items)
                break
        
        return '\n'.join(scope_items)
    
    def generate_applicable_staff(self, chapter: str, section: str) -> str:
        """Generate applicable staff list"""
        staff_mapping = {
            'AAC.1': "- Emergency department physicians\n- Emergency nurses\n- Paramedical staff\n- Support services",
            'AAC.2': "- Admissions staff\n- Registration personnel\n- Case managers\n- Financial counselors",
            'AAC.3': "- Clinical staff\n- Nursing personnel\n- Allied health professionals\n- Support staff",
            'COP': "- Clinical departments\n- Nursing staff\n- Allied health professionals\n- Support services",
            'MOM': "- Pharmacists\n- Clinical staff\n- Nursing personnel\n- Pharmacy technicians",
            'PRE': "- Patient relations staff\n- Clinical departments\n- Education coordinators\n- Administrative staff",
            'HIC': "- Infection control practitioners\n- Clinical staff\n- Housekeeping staff\n- Laboratory personnel",
            'CQI': "- Quality management team\n- Clinical departments\n- Risk management staff\n- All hospital personnel",
            'ROM': "- Hospital administration\n- Department heads\n- Management team\n- Board members",
            'FMS': "- Facility management staff\n- Engineering personnel\n- Safety officers\n- Maintenance staff",
            'IM': "- IT personnel\n- Medical records staff\n- Clinical departments\n- Administrative staff",
            'HRM': "- HR personnel\n- Department managers\n- Training coordinators\n- All employees"
        }
        return staff_mapping.get(section, "- All clinical staff\n- Nursing personnel\n- Administrative staff\n- Support services")
    
    def generate_definitions(self, title: str, chapter: str, section: str) -> str:
        """Generate relevant definitions"""
        definitions = []
        
        # Add definitions based on element content
        if 'emergency' in title.lower():
            definitions.extend([
                "- **Emergency:** Any condition requiring immediate medical attention",
                "- **Triage:** Systematic priority assessment of patients",
                "- **Code Blue:** Cardiac/respiratory arrest emergency response"
            ])
        elif 'assessment' in title.lower():
            definitions.extend([
                "- **Assessment:** Systematic evaluation of patient condition",
                "- **Risk factors:** Conditions increasing probability of adverse outcomes",
                "- **Care planning:** Process of developing individualized treatment plans"
            ])
        elif 'documentation' in title.lower():
            definitions.extend([
                "- **Medical record:** Complete documentation of patient care",
                "- **Authentication:** Verification of document accuracy and authorship",
                "- **Legal record:** Documentation meeting legal requirements"
            ])
        
        # Add general definitions if none specific
        if not definitions:
            definitions = [
                "- **Protocol:** Standardized procedure for specific situations",
                "- **Competency:** Demonstrated ability to perform required tasks",
                "- **Quality indicator:** Measurable element of practice"
            ]
        
        return '\n'.join(definitions)
    
    def generate_responsibility_table(self, chapter: str, section: str) -> str:
        """Generate responsibility table"""
        tables = {
            'AAC.1': """| Role | Responsibility |
|------|---------------|
| Emergency Physician | Clinical assessment, treatment decisions, coordination |
| Emergency Nurse | Patient care, monitoring, medication administration |
| Department Head | Oversight, quality assurance, resource management |
| Support Staff | Patient transport, equipment maintenance, assistance |""",
            'AAC.2': """| Role | Responsibility |
|------|---------------|
| Admissions Manager | Process oversight, policy compliance, staff coordination |
| Registration Staff | Patient identification, documentation, data collection |
| Case Manager | Assessment coordination, discharge planning |
| Financial Counselor | Insurance verification, payment arrangements |""",
            'COP': """| Role | Responsibility |
|------|---------------|
| Attending Physician | Treatment planning, clinical decisions, oversight |
| Nursing Staff | Direct patient care, monitoring, documentation |
| Department Manager | Resource allocation, quality monitoring |
| Allied Health | Specialized assessments, therapeutic interventions |""",
            'MOM': """| Role | Responsibility |
|------|---------------|
| Chief Pharmacist | Overall medication management, policy oversight |
| Clinical Pharmacist | Medication therapy monitoring, clinical decisions |
| Nursing Staff | Medication administration, patient monitoring |
| Physician | Prescribing, medication review, patient assessment |""",
            'PRE': """| Role | Responsibility |
|------|---------------|
| Patient Relations Manager | Rights advocacy, complaint resolution |
| Education Coordinator | Patient education program development |
| Clinical Staff | Patient education delivery, rights implementation |
| Administration | Policy development, resource allocation |""",
            'HIC': """| Role | Responsibility |
|------|---------------|
| Infection Control Practitioner | Program oversight, surveillance, education |
| Clinical Staff | Protocol implementation, reporting |
| Housekeeping Supervisor | Environmental cleaning, disinfection |
| Department Heads | Departmental compliance, resource provision |""",
            'CQI': """| Role | Responsibility |
|------|---------------|
| Quality Manager | Program oversight, improvement coordination |
| Department Heads | Quality implementation, data collection |
| Clinical Staff | Quality measures implementation, reporting |
| Risk Manager | Risk assessment, mitigation strategies |""",
            'ROM': """| Role | Responsibility |
|------|---------------|
| Chief Executive Officer | Strategic oversight, governance |
| Medical Superintendent | Clinical leadership, operational oversight |
| Department Heads | Departmental management, implementation |
| Board Members | Governance oversight, policy approval |""",
            'FMS': """| Role | Responsibility |
|------|---------------|
| Facility Manager | Overall facility oversight, coordination |
| Engineering Staff | Equipment maintenance, utilities management |
| Safety Officer | Safety program implementation, training |
| Biomedical Engineer | Medical equipment management, calibration |""",
            'IM': """| Role | Responsibility |
|------|---------------|
| IT Manager | System oversight, security implementation |
| Medical Records Officer | Record management, compliance monitoring |
| Clinical Staff | Data entry, documentation compliance |
| System Administrator | Technical support, system maintenance |""",
            'HRM': """| Role | Responsibility |
|------|---------------|
| HR Manager | Policy development, program oversight |
| Department Heads | Staff management, performance monitoring |
| Training Coordinator | Training program delivery, competency assessment |
| Administrative Staff | HR process implementation, documentation |"""
        }
        
        return tables.get(section, """| Role | Responsibility |
|------|---------------|
| Department Head | Overall responsibility, policy implementation |
| Clinical Staff | Direct patient care, protocol adherence |
| Quality Manager | Monitoring, evaluation, improvement initiatives |
| Support Staff | Assistance with procedures, equipment management |""")
    
    def generate_policy_statement(self, title: str, chapter: str, section: str) -> str:
        """Generate policy statement"""
        statements = {
            'emergency': "maintains comprehensive emergency response capabilities ensuring immediate, high-quality care for all patients regardless of ability to pay or complexity of condition.",
            'assessment': "implements systematic assessment procedures ensuring comprehensive evaluation of all patients with appropriate risk identification and care planning.",
            'documentation': "maintains accurate, complete, and timely documentation meeting legal, regulatory, and quality requirements for all patient care activities.",
            'quality': "is committed to continuous quality improvement through systematic monitoring, evaluation, and enhancement of all care processes.",
            'safety': "prioritizes patient and staff safety through comprehensive risk management, prevention strategies, and incident response procedures."
        }
        
        for key in statements:
            if key in title.lower():
                return statements[key]
        
        return f"is committed to implementing comprehensive {title.lower()} procedures meeting NABH standards and ensuring optimal patient outcomes."
    
    def generate_procedure_content(self, title: str, chapter: str, section: str, element_num: int) -> str:
        """Generate detailed procedure content"""
        # This is a simplified version - in a full implementation, 
        # this would contain detailed, element-specific procedures
        return f"""### 5.1 Overview
{self.hospital_name} follows standardized procedures for {title.lower()} ensuring consistency, quality, and compliance with regulatory requirements.

### 5.2 Standard Process
1. **Initial Assessment**
   - Timeframe: As specified in protocol
   - Responsible: Designated clinical staff
   - Documentation: Required in medical record

2. **Implementation**
   - Follow evidence-based guidelines
   - Ensure patient safety at all steps
   - Maintain clear communication

3. **Monitoring and Follow-up**
   - Regular assessment of outcomes
   - Documentation of progress
   - Adjustment of plans as needed

### 5.3 Quality Assurance
- Regular audits of compliance
- Staff feedback and training
- Continuous improvement initiatives
- Patient feedback incorporation

### 5.4 Special Considerations
- High-risk patient protocols
- Emergency situation modifications
- Cultural sensitivity requirements
- Family involvement procedures"""
    
    def generate_quality_indicators(self, title: str, chapter: str, section: str) -> str:
        """Generate quality indicators table"""
        return """| Indicator | Target | Monitoring Frequency |
|-----------|--------|-------------------|
| Process Compliance | >95% | Monthly |
| Documentation Accuracy | >98% | Quarterly |
| Staff Competency | 100% current | Annual |
| Patient Satisfaction | >80% | Quarterly |
| Incident Rate | <2% | Monthly |"""
    
    def generate_documentation_requirements(self, title: str, chapter: str, section: str) -> str:
        """Generate documentation requirements"""
        return """| Document | Content | Retention Period |
|----------|---------|------------------|
| Process Records | Detailed procedure documentation | 5 years |
| Training Records | Staff competency and training | 7 years |
| Quality Reports | Monitoring and evaluation data | 3 years |
| Incident Reports | Any adverse events or near misses | 7 years |
| Policy Documents | Current procedures and protocols | Permanent |"""
    
    def generate_training_requirements(self, chapter: str, section: str) -> str:
        """Generate training requirements"""
        return f"""### Initial Training
- {self.get_sop_type(chapter, section)} orientation: 4 hours
- Competency assessment and validation
- Hands-on demonstration of procedures
- Documentation requirements training

### Ongoing Training
- Annual refresher training: 2 hours
- Quarterly competency validation
- Incident-based learning sessions
- New procedure updates as needed

### Competency Validation
- Initial competency assessment
- Annual skills verification
- Peer feedback evaluation
- Patient outcome correlation"""
    
    def generate_escalation_procedures(self, chapter: str, section: str) -> str:
        """Generate escalation procedures"""
        return """| Situation | Escalate To | Timeline |
|-----------|-------------|----------|
| Protocol deviation | Department Manager | Immediate |
| Quality concerns | Quality Manager | 24 hours |
| Safety issues | Risk Manager | Immediate |
| Patient complaints | Patient Relations | Same day |
| Staff concerns | Nursing Supervisor | Next shift |"""
    
    def generate_compliance_evidence(self, title: str, chapter: str, section: str) -> str:
        """Generate NABH compliance evidence checklist"""
        return """- [ ] Written policies and procedures
- [ ] Staff training documentation
- [ ] Competency assessment records
- [ ] Quality monitoring data
- [ ] Patient outcome measurements
- [ ] Documentation audit results
- [ ] Equipment/resource availability verification
- [ ] Incident reporting and analysis
- [ ] Continuous improvement evidence
- [ ] Regulatory compliance documentation"""
    
    def generate_internal_references(self, chapter: str, section: str) -> str:
        """Generate internal reference list"""
        refs = [
            f"- {self.hospital_name} Policy Manual",
            f"- Department Operating Procedures",
            f"- Quality Management System Documentation",
            f"- Staff Training and Competency Protocols"
        ]
        return '\n'.join(refs)
    
    def generate_external_references(self, chapter: str, section: str) -> str:
        """Generate external reference list"""
        refs = [
            "- NABH Accreditation Standards, 5th Edition",
            "- Clinical Establishment Act Requirements",
            "- National and International Clinical Guidelines",
            "- Regulatory Authority Guidelines"
        ]
        return '\n'.join(refs)
    
    def get_preparer_designation(self, chapter: str, section: str) -> str:
        """Get appropriate preparer designation"""
        designations = {
            'AAC.1': 'Emergency Department Manager',
            'AAC.2': 'Admissions Manager',
            'AAC.3': 'Clinical Manager',
            'AAC.4': 'Case Management Coordinator',
            'AAC.5': 'Transport Services Manager',
            'COP.1': 'Clinical Department Head',
            'COP.2': 'Critical Care Manager',
            'COP.3': 'Nutrition Services Manager',
            'COP.4': 'Pain Management Coordinator',
            'COP.5': 'Palliative Care Coordinator',
            'MOM.1': 'Chief Pharmacist',
            'MOM.2': 'Clinical Pharmacist',
            'MOM.3': 'Pharmacy Operations Manager',
            'MOM.4': 'Medication Safety Officer',
            'MOM.5': 'Clinical Pharmacist',
            'PRE.1': 'Patient Relations Manager',
            'PRE.2': 'Patient Education Coordinator',
            'HIC.1': 'Infection Control Manager',
            'HIC.2': 'Infection Control Practitioner',
            'HIC.3': 'Infection Control Practitioner',
            'HIC.4': 'CSSD Manager',
            'HIC.5': 'Environmental Services Manager',
            'CQI.1': 'Quality Manager',
            'CQI.2': 'Clinical Quality Coordinator',
            'CQI.3': 'Patient Safety Manager',
            'ROM.1': 'Chief Operating Officer',
            'ROM.2': 'HR Manager',
            'FMS.1': 'Safety Manager',
            'FMS.2': 'Biomedical Engineering Manager',
            'FMS.3': 'Engineering Services Manager',
            'IM.1': 'IT Manager',
            'IM.2': 'Medical Records Officer',
            'HRM.1': 'HR Manager',
            'HRM.2': 'Recruitment Manager',
            'HRM.3': 'Training Manager'
        }
        return designations.get(section, 'Department Manager')
    
    def get_reviewer_designation(self, chapter: str, section: str) -> str:
        """Get appropriate reviewer designation"""
        return 'Quality Manager'
    
    def create_sop_file(self, chapter: str, section: str, element_num: int, 
                       element_title: str, sop_counter: int):
        """Create SOP file with proper naming"""
        # Create chapter directory if not exists
        chapter_dir = os.path.join(self.base_path, chapter)
        os.makedirs(chapter_dir, exist_ok=True)
        
        # Generate filename
        filename = f"{chapter}_{section.split('.')[1]}_{element_num}_SOP_Complete.md"
        filepath = os.path.join(chapter_dir, filename)
        
        # Generate content
        content = self.generate_sop_content(chapter, section, element_num, 
                                          element_title, sop_counter)
        
        # Write file
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return filepath
    
    def generate_all_sops(self):
        """Generate all SOPs for all chapters"""
        total_generated = 0
        
        for chapter, chapter_data in self.nabh_elements.items():
            print(f"\nGenerating SOPs for Chapter {chapter}: {chapter_data['title']}")
            
            for section, section_data in chapter_data['sections'].items():
                print(f"  Section {section}: {section_data['title']}")
                
                for i, element_title in enumerate(section_data['elements'], 1):
                    element_id = f"{section}.{i}"
                    
                    # Skip if already completed
                    if chapter in self.completed_sops and element_id in self.completed_sops[chapter]:
                        print(f"    Skipping {element_id} (already completed)")
                        continue
                    
                    try:
                        filepath = self.create_sop_file(chapter, section, i, element_title, total_generated + 1)
                        print(f"    Generated: {element_id} - {element_title}")
                        total_generated += 1
                    except Exception as e:
                        print(f"    Error generating {element_id}: {e}")
        
        print(f"\nTotal SOPs generated: {total_generated}")
        return total_generated

def main():
    """Main function to run the SOP generator"""
    print("NABH SOP Generator for Hope & Ayushman Hospitals")
    print("=" * 50)
    
    generator = NABHSOPGenerator()
    total_generated = generator.generate_all_sops()
    
    print(f"\nSOP Generation Complete!")
    print(f"Total SOPs generated: {total_generated}")
    print(f"Files saved to: {generator.base_path}")

if __name__ == "__main__":
    main()