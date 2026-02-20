---
name: nabh-evidence-templates
description: Generate NABH (National Accreditation Board for Hospitals) evidence templates for hospital accreditation compliance. Use when creating structured evidence documents for NABH standards, audits, or compliance requirements. Supports evidence collection, formatting, and documentation for all NABH chapters and standards.
---

# NABH Evidence Templates

## Overview

This skill generates standardized evidence templates for NABH hospital accreditation compliance. It provides consistent formatting, required fields, and proper documentation structure for evidence submission and audit preparation.

## Core Capabilities

### 1. Evidence Template Generation
Generate standardized evidence templates based on NABH requirements:
- Chapter-specific evidence templates
- Standard-wise evidence collection forms
- Compliance checklist templates
- Audit preparation documents

### 2. Evidence Categories

**Clinical Evidence:**
- Patient Safety Indicators (PSI)
- Infection Control Metrics
- Medication Management Records
- Clinical Protocols and Guidelines

**Administrative Evidence:**
- Policy and Procedure Documents
- Training Records and Competency Assessments
- Quality Assurance Programs
- Risk Management Documentation

**Infrastructure Evidence:**
- Equipment Calibration Records
- Maintenance Logs
- Safety Compliance Documents
- Environmental Monitoring Data

### 3. Template Structure

Each evidence template includes:
- **Header Information**: NABH standard reference, chapter, objective
- **Evidence Details**: Type, source, collection method, frequency
- **Compliance Matrix**: Requirements vs. current status
- **Supporting Documentation**: Attachments, references, cross-links
- **Review and Approval**: Sign-off sections, dates, responsible persons

## Quick Start

1. **Generate Evidence Template:**
   ```
   Create NABH evidence template for [Standard/Chapter]
   ```

2. **Customize for Specific Requirements:**
   ```
   Generate evidence for Infection Prevention and Control (IPC) chapter with monthly metrics
   ```

3. **Batch Evidence Creation:**
   ```
   Create all evidence templates for Pre-Assessment Self Evaluation (PASE)
   ```

## Usage Examples

**Example 1: Patient Safety Evidence**
```
Generate NABH evidence template for Patient Safety Goals (PSG) with quarterly review
```

**Example 2: Medication Management**
```
Create evidence template for Medication Management and Use (MMU) standard 3.1 - High Alert Medications
```

**Example 3: Infection Control**
```
Generate IPC evidence template for surgical site infection surveillance
```

## Template Categories

### Chapter-wise Templates
- **COP**: Continuum of Care
- **ASC**: Assessment of Patients  
- **CCC**: Care of Patients
- **MMU**: Medication Management and Use
- **PSG**: Patient Safety Goals
- **IPC**: Infection Prevention and Control
- **FMS**: Facility Management and Safety
- **HMS**: Human Resource Management
- **IMS**: Information Management System
- **QI**: Quality Improvement

### Evidence Types
- **Policies**: Documented procedures and protocols
- **Records**: Patient records, training logs, incident reports
- **Metrics**: KPIs, infection rates, safety indicators
- **Audits**: Internal audits, compliance checks
- **Training**: Staff competency, continuing education
- **Infrastructure**: Equipment, facilities, safety systems

## Resources

### scripts/
- `evidence_generator.py` - Main evidence template generator
- `nabh_validator.py` - Validates evidence against NABH standards
- `compliance_checker.py` - Checks completeness and compliance
- `export_formatter.py` - Formats evidence for submission

### references/
- `nabh_standards.md` - Complete NABH 5th Edition standards reference
- `evidence_requirements.md` - Evidence requirements by chapter/standard
- `compliance_matrix.md` - Mapping of standards to evidence types
- `audit_checklist.md` - Pre-assessment and audit preparation guidelines

### assets/
- `templates/` - Pre-formatted evidence templates (Word, Excel)
- `forms/` - Standard NABH forms and checklists
- `samples/` - Sample evidence documents for reference
- `logos/` - NABH and hospital branding assets

## Integration

Works seamlessly with:
- Document management systems
- Quality management software  
- Electronic health records (EHR)
- Audit management tools
- Compliance tracking platforms

## Compliance Features

- **Version Control**: Tracks template versions and updates
- **Audit Trail**: Maintains record of evidence creation and modifications
- **Cross-References**: Links related evidence and standards
- **Validation**: Ensures completeness and accuracy
- **Export Options**: Multiple formats for submission and review