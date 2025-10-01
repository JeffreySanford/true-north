# True North Insights - Task & Time Tracking Metadata Standard

*Created: October 1, 2025 6:20 PM EST*  
*Planned Duration: 30 minutes*  
*Status: In Progress*

## 🎯 **PURPOSE**

This document establishes the **standardized metadata format** for all markdown documents in the True North Insights project. This metadata will serve as the **primary data source** for our time-tracking application, creating a comprehensive project management system with real historical data.

---

## 📋 **STANDARDIZED METADATA FORMAT**

### **Required Header Format**
```markdown
# Document Title

*Created: [YYYY-MM-DD HH:MM AM/PM TZ]*  
*Planned Duration: [X hours/minutes]*  
*Actual Duration: [X hours/minutes]*  
*Status: [Not Started | In Progress | Completed | On Hold]*  
*Priority: [Low | Medium | High | Critical]*  
*Assigned To: [Name/Role]*  
*Dependencies: [List of dependent tasks/documents]*  
*Estimated Completion: [YYYY-MM-DD HH:MM AM/PM TZ]*  
*Actual Completion: [YYYY-MM-DD HH:MM AM/PM TZ]*  
*Last Updated: [YYYY-MM-DD HH:MM AM/PM TZ]*
```

### **Task Section Format**
```markdown
## 📝 **TASK BREAKDOWN**

### **Task 1: [Task Name]**
- **Created**: October 1, 2025 2:00 PM EST
- **Planned Duration**: 2 hours
- **Actual Duration**: 2.5 hours
- **Status**: Completed
- **Priority**: High
- **Started**: October 1, 2025 2:00 PM EST
- **Completed**: October 1, 2025 4:30 PM EST
- **Notes**: Implementation exceeded estimate due to testing requirements

### **Task 2: [Task Name]**
- **Created**: October 1, 2025 4:30 PM EST
- **Planned Duration**: 1 hour
- **Actual Duration**: [In Progress]
- **Status**: In Progress
- **Priority**: Medium
- **Started**: October 1, 2025 5:00 PM EST
- **Est. Completion**: October 1, 2025 6:00 PM EST
- **Dependencies**: Task 1 completion
```

---

## 🕐 **TIME TRACKING CATEGORIES**

### **Development Time**
- **Coding**: Active development work
- **Testing**: Unit tests, e2e tests, debugging
- **Documentation**: Technical documentation, README updates
- **Research**: Investigation, analysis, planning
- **Review**: Code review, testing, validation

### **Project Management Time**
- **Planning**: Task breakdown, estimation, roadmap
- **Meetings**: Standups, reviews, client calls
- **Administration**: Git management, deployment, setup

### **Quality Assurance Time**
- **Linting**: Code quality, standards compliance
- **Testing**: Manual testing, test creation
- **Bug Fixes**: Issue resolution, debugging
- **Refactoring**: Code improvement, optimization

---

## 📊 **DATA COLLECTION STRUCTURE**

### **For Time Tracking Application**
The metadata will be parsed to create:

```json
{
  "taskId": "unique-identifier",
  "title": "Task/Document Title",
  "created": "2025-10-01T14:00:00-04:00",
  "plannedDuration": 120, // minutes
  "actualDuration": 150,  // minutes
  "status": "completed",
  "priority": "high",
  "assignedTo": "developer",
  "dependencies": ["task-1", "task-2"],
  "estimatedCompletion": "2025-10-01T16:00:00-04:00",
  "actualCompletion": "2025-10-01T16:30:00-04:00",
  "lastUpdated": "2025-10-01T16:30:00-04:00",
  "category": "development",
  "subcategory": "coding",
  "notes": "Implementation notes",
  "timeEntries": [
    {
      "start": "2025-10-01T14:00:00-04:00",
      "end": "2025-10-01T15:00:00-04:00",
      "duration": 60,
      "activity": "coding"
    }
  ]
}
```

---

## 🎯 **IMPLEMENTATION PLAN**

### **Phase 1: Standardize Existing Documents**
- **Created**: October 1, 2025 6:20 PM EST
- **Planned Duration**: 1 hour
- **Status**: Not Started
- **Priority**: High
- **Tasks**:
  - Update PROJECT_STATUS.md with standardized metadata
  - Update README.md with time tracking headers
  - Update all documentation files in `/documentation/` folder
  - Create template for future documents

### **Phase 2: Create Parsing System**
- **Created**: October 1, 2025 6:20 PM EST
- **Planned Duration**: 3 hours
- **Status**: Not Started
- **Priority**: Medium
- **Dependencies**: Phase 1 completion
- **Tasks**:
  - Create markdown parser for metadata extraction
  - Design database schema for time tracking data
  - Implement data ingestion pipeline
  - Create validation for metadata format

### **Phase 3: Build Time Tracking UI**
- **Created**: October 1, 2025 6:20 PM EST
- **Planned Duration**: 8 hours
- **Status**: Not Started
- **Priority**: Medium
- **Dependencies**: Phase 2 completion
- **Tasks**:
  - Design time tracking dashboard
  - Implement task management interface
  - Create reporting and analytics views
  - Add real-time progress monitoring

---

## 📝 **TEMPLATE FOR NEW DOCUMENTS**

```markdown
# [Document Title]

*Created: [Date Time]*  
*Planned Duration: [Duration]*  
*Actual Duration: [Duration]*  
*Status: [Status]*  
*Priority: [Priority]*  
*Assigned To: [Name]*  
*Dependencies: [Dependencies]*  
*Estimated Completion: [Date Time]*  
*Actual Completion: [Date Time]*  
*Last Updated: [Date Time]*

## 🎯 **OBJECTIVE**
[Clear objective statement]

## 📋 **TASK BREAKDOWN**
[Detailed task breakdown with individual time tracking]

## ✅ **COMPLETION CRITERIA**
[Clear completion criteria]

## 📊 **TIME SUMMARY**
- **Total Planned**: X hours
- **Total Actual**: X hours
- **Variance**: +/- X hours
- **Efficiency**: X% (actual/planned)
```

---

## 🚀 **BENEFITS FOR TIME TRACKING APPLICATION**

### **Rich Historical Data**
- Real project timelines with accurate estimates vs actuals
- Task breakdown structures with dependencies
- Developer productivity metrics
- Project velocity tracking

### **Federal Contracting Compliance**
- Detailed audit trail for all work performed
- Time tracking with granular detail
- Project accountability with completion verification
- Professional documentation standards

### **Data-Driven Insights**
- Estimation accuracy improvement over time
- Task complexity analysis
- Resource allocation optimization
- Project timeline forecasting

---

*Last Updated: October 1, 2025 6:20 PM EST*  
*Document Status: In Progress*  
*Next Action: Begin Phase 1 implementation*