export const priorityList = {
  '7-Eleven Canada, Inc.': [
    { value: 'P1', description: 'Critical (Respond within 4 hours)' },
    { value: 'E1', description: 'Escalation - Level 1' },
    { value: 'P2', description: 'Emergency (Respond within 24 hours)' },
    { value: 'E2', description: 'Escalation - Level 2' },
    { value: 'P3', description: 'Normal (Respond within 48 hours)' },
    { value: 'E3', description: 'Escalation - Level 3' },
    { value: 'P5', description: 'NA' }
  ],
  '7-Eleven Grass Roots': [
    { value: 'P1', description: 'Critical (Respond within 4 hours)' },
    { value: 'P2', description: 'Emergency (Respond within 24 hours)' },
    { value: 'P3', description: 'Normal (Respond within 48 hours)' },
    { value: 'P5', description: 'NA' }
  ],
  '7-Eleven Sunoco': [
    { value: 'P1', description: 'Critical (Respond within 4 hours)' },
    { value: 'E1', description: 'Escalation - Level 1' },
    { value: 'E2', description: 'Escalation - Level 2' },
    { value: 'P2', description: 'Emergency (Respond within 24 hours)' },
    { value: 'E3', description: 'Escalation - Level 3' },
    { value: 'P3', description: 'Normal (Respond within 48 hours)' },
    { value: 'P5', description: 'NA' }
  ],
  '7-Eleven Wholesale Fuel': [
    { value: 'P1', description: 'Critical (Respond within 4 hours)' },
    { value: 'P2', description: 'Emergency (Respond within 24 hours)' },
    { value: 'P3', description: 'Normal (Respond within 48 hours)' },
    { value: 'P5', description: 'NA' }
  ],
  '7-Eleven, Inc.': [
    { value: 'P1', description: 'Critical (Respond within 4 hours)' },
    { value: 'E1', description: 'Escalation - Level 1' },
    { value: 'P2', description: 'Emergency (Respond within 24 hours)' },
    { value: 'E2', description: 'Escalation - Level 2' },
    { value: 'E3', description: 'Escalation - Level 3' },
    { value: 'P3', description: 'Normal (Respond within 48 hours)' },
    { value: 'P5', description: 'NA' }
  ],
  'Advance Auto Parts': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'Ahold USA': [
    { value: 'P1 - Immediate', description: 'Within 4 hours' },
    { value: 'P2 - Next Business Day', description: 'Next Business Day' },
    { value: 'P3 - Normal', description: 'Five Business Days' },
    { value: 'Scheduled Maintenance', description: '30 Days' },
    { value: 'Preventative Maintenance', description: '60 Days' },
    {
      value: 'Next Scheduled Maintenance',
      description: 'Complete During Next PM'
    },
    { value: 'Special Project', description: 'Complete by Due Date' }
  ],
  'Albertsons LLC': [
    { value: 'Emergency', description: 'Completion within 24 hours' },
    { value: 'Urgent', description: 'Completion within 48 hours' },
    { value: 'Planned', description: 'Completion in 1 month' }
  ],
  'Alliance Energy, LLC': [
    { value: 'Critical', description: 'Respond within 2 hours' },
    { value: 'ER', description: 'Respond within 4 hours' },
    { value: 'Normal', description: 'Respond within 48 hours' },
    { value: 'Planned', description: 'No Response SLA - Completion in 30' },
    { value: 'Special Project', description: 'Complete by Due Date' },
    {
      value: 'Preventative Maintenance',
      description:
        'Low priority request. Complete with next scheduled maintenance.'
    }
  ],
  'AMF Bowling Centers, Inc.': [
    { value: '2 days', description: '2 business days' },
    { value: '5 days', description: '5 business days' },
    { value: '14 days', description: '14 business days' },
    { value: '30 days', description: '30 business days' },
    { value: '40 days', description: '35 business days' }
  ],
  'Aspen Dental': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'CAD - STARBUCKS LICENSED/FRANCHSED RECORD': [
    { value: 'Emergency', description: 'Completion within 24 hours' },
    { value: 'Urgent', description: 'Completion within 48 hours' },
    { value: 'Planned', description: 'Completion in 1 month' }
  ],
  'Canadian Tire': [
    {
      value: 'P1',
      description: 'Onsite within 4 hours, completion within 24 hours'
    },
    {
      value: 'P1',
      description: 'Onsite within 4 hours, completion within 24 hours'
    },
    {
      value: 'P2',
      description:
        'Onsite within 16 hours, completion within 48 hours (business hours)'
    },
    {
      value: 'P2',
      description:
        'Onsite within 16 hours, completion within 48 hours (business hours)'
    },
    {
      value: 'P3',
      description:
        'Onsite within 72 hours, completion within 7 days (business hours)'
    },
    {
      value: 'P3',
      description:
        'Onsite within 72 hours, completion within 7 days (business hours)'
    },
    {
      value: 'P5',
      description: 'Respond within 20 days, completion within 30'
    },
    { value: 'P6', description: 'Complete by Due Date' },
    {
      value: 'P5',
      description: 'Respond within 20 days, completion within 30'
    },
    { value: 'P4', description: 'At next scheduled maintenance' },
    { value: 'P4', description: 'At next scheduled maintenance' },
    { value: 'P6', description: 'Scheduled Project Up to 365 Days' }
  ],
  'Carrier Corp.': [
    { value: 'Special Project', description: 'Complete by Due Date' }
  ],
  'Chanel USA': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  'Cinemark USA': [
    { value: 'Emergency', description: 'Respond within 4 hours' },
    { value: 'Normal', description: 'Respond within 24 hours' },
    { value: 'Scheduled/Project', description: 'Complete in 30 days' },
    { value: 'Deferred', description: 'Complete in 90 days' },
    { value: 'Special Project', description: 'Complete by Due Date' }
  ],
  'Coldwell Banker Residential Brokerage': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  "Conn's HomePlus": [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'Creme De La Creme': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  CubeSmart: [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'Cushman & Wakefield': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'Dentalone Partners, Inc.': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  'Discount Tire Co.': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'Extra Space Storage Inc.': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'Eyemart Express': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  'Foot Locker Retail, Inc.': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'Gabriel Bros./Rugged Wearhouse': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  'Gold Stores - C/O Goldtoemoretz, Llc': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  'Harbor Freight Tools': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'Harris Teeter LLC': [
    { value: 'Emergency', description: 'Completion within 24 hours' },
    { value: 'Urgent', description: 'Completion within 48 hours' },
    { value: 'Planned', description: 'Completion in 1 month' }
  ],
  'Jimmy Jazz': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  "Jockey Int'L Global Inc. (454)": [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  'Kellwood Company': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  'Kentucky Fried Chicken': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'Kimco Realty': [
    { value: 'Project', description: 'No Response SLA - Completion in 45' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' }
  ],
  'Kirklands, Inc.': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  'Le Creuset Of America, Inc.': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  'Learning Care Group': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  'Macy�s Retail Holdings Inc.': [
    { value: 'Emergency', description: 'Completion within 24 hours' },
    { value: 'Urgent', description: 'Completion within 48 hours' },
    { value: 'Planned', description: 'Completion in 1 month' }
  ],
  'Michaels Stores, Inc - Canada': [
    { value: 'Critical', description: 'Respond within 4 hours' },
    { value: 'Emergency', description: 'Respond within 24 hours' },
    { value: 'Lighting - Emergency', description: 'Within 3 business days' },
    { value: 'Normal', description: 'Respond within 5 days' },
    {
      value: 'Planned',
      description: 'No Response SLA - Completion in 60 days'
    },
    { value: 'Special Project', description: 'Complete by Due Date' }
  ],
  'Michaels Stores, Inc.': [
    { value: 'Critical', description: 'Respond within 4 hours' },
    { value: 'Emergency', description: 'Respond within 24 hours' },
    { value: 'Lighting - Emergency', description: 'Within 3 business days' },
    { value: 'Normal', description: 'Respond within 5 days' },
    {
      value: 'Planned',
      description: 'No Response SLA - Completion in 60 days'
    },
    { value: 'Special Project', description: 'Complete by Due Date' }
  ],
  'Nationwide Mutual Insurance Co.': [
    { value: '2 days', description: '2 business days' },
    { value: '5 days', description: '5 business days' },
    { value: '14 days', description: '14 business days' },
    { value: '30 days', description: '30 business days' },
    { value: '40 days', description: '35 business days' }
  ],
  'Payless Shoe Source': [
    {
      value: 'Critical',
      description: 'Respond within 4 Hours, Repair within 24 hours'
    },
    {
      value: 'Emergency',
      description: 'Respond within 4 Hours, Repair within 24 hours'
    },
    {
      value: 'Urgent - Flooring/Laminate',
      description: 'Respond within 24 Hours, Repair within 48 hours'
    },
    {
      value: 'Urgent',
      description: 'Respond within 24 Hours, Repair within 48 hours'
    },
    {
      value: 'Standard',
      description: 'Respond within 48 Hours, Repair within 96 hours'
    },
    {
      value: 'ASSESSMENT',
      description: 'Respond within 7 Days, Repair within 14 days'
    },
    { value: 'PROJECT', description: 'Respond within 45 days' },
    { value: 'Special Project', description: 'Complete by Due Date' }
  ],
  'Pep Boys': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'PetSmart, Inc.': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    {
      value: 'Work/Next Scheduled Maintenance',
      description: 'At next scheduled maintenance'
    },
    { value: 'Project', description: 'By project schedule' },
    { value: 'Project', description: 'By project schedule' },
    {
      value: 'Work/Next Scheduled Maintenance',
      description: 'At next scheduled maintenance'
    },
    {
      value: 'Work/Next Scheduled Maintenance',
      description: 'At next scheduled maintenance'
    },
    { value: 'Project', description: 'By project schedule' },
    {
      value: 'Queue For Review',
      description: 'Respond within 3 days; fix within 1 week'
    },
    {
      value: 'Queue For Review',
      description: 'Respond within 3 days; fix within 1 week'
    },
    {
      value: 'Queue For Review',
      description: 'Respond within 3 days; fix within 1 week'
    }
  ],
  Progressive: [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'Public Storage': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  RaceTrac: [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'Regal Entertainment Group': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'Regis Corporation': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  REI: [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'Rent-A-Center': [
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' }
  ],
  'Safeguard Self Storage': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  Safeway: [
    { value: 'Emergency', description: 'Complete within 24 hours' },
    { value: 'Urgent', description: 'Complete within 2 business days' },
    { value: 'Non-Emergency', description: 'Complete with 5 business Days' },
    { value: 'Special Project', description: 'Complete by Due Date' }
  ],
  'Sally Beauty Holdings, Inc.': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'Scrubs & Beyond, Llc': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  'Select Staffing': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  'Simply Self Storage': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'Smile Brands, Inc.': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'Starbucks Corporation': [
    { value: 'P1 - Prime Emergency', description: 'Respond ASAP, Repair ASAP' },
    { value: 'P1 - Prime Emergency', description: 'Respond ASAP, Repair ASAP' },
    {
      value: 'P1 - High',
      description: 'Respond within 6 Hours, Repair within 24 hours'
    },
    {
      value: 'P1 - High',
      description: 'Respond within 6 Hours, Repair within 24 hours'
    },
    {
      value: 'P2 - Medium',
      description:
        'Respond within 1 Business Day, Repair within 2 Business Days'
    },
    {
      value: 'P2 - Medium',
      description:
        'Respond within 1 Business Day, Repair within 2 Business Days'
    },
    { value: 'P3 - Low', description: 'Repair within 5 Business Days' },
    { value: 'P3 - Low', description: 'Repair within 5 Business Days' },
    { value: 'Planned', description: 'See Instructions on Work Order' },
    { value: 'Planned', description: 'See Instructions on Work Order' },
    { value: 'Special Project', description: 'Complete by Due Date' },
    { value: 'Special Project', description: 'Complete by Due Date' }
  ],
  'Starbucks Licensed/Franchsed Record': [
    { value: 'Emergency', description: 'Completion within 24 hours' },
    { value: 'Urgent', description: 'Completion within 48 hours' },
    { value: 'Planned', description: 'Completion in 1 month' }
  ],
  "Swim 'N Sport Retail, Inc.": [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  'Target Corporation': [
    {
      value: 'Emergency Maintenance - EM',
      description: 'Complete within 24 hours'
    },
    {
      value: 'Corrective Maintenance - CM',
      description: 'Complete within 72 hours'
    },
    { value: 'Planned', description: 'Complete within 30 Days' }
  ],
  'Target US': [
    {
      value: 'Emergency Maintenance - EM',
      description: 'Respond within 24 hours'
    },
    {
      value: 'Corrective Maintenance - CM',
      description: 'Respond within 48 hours'
    },
    { value: 'Planned', description: 'Completion within 30 days' }
  ],
  'TBC Corp': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'The Cellular Connection, LLC.': [
    { value: 'P1', description: 'Respond Within 4 Hours' },
    { value: 'P2', description: 'Respond Within 16 Hours' },
    { value: 'P3', description: 'Respond Within 24 Hours' },
    { value: 'P5', description: 'Bundling' },
    { value: 'P4', description: 'Next Scheduled Maintenance' },
    { value: 'P6', description: 'Complete by Due Date' }
  ],
  Travelpro: [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  'Trueblue, Inc.': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  "Uncle Bob's Self Storage": [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'US Signs - Cost Center Based Managed Account': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'Viox - Learning Care Group': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  'Viox Services': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  'William Warren Group': [
    { value: 'Critical - 4hr.', description: 'Respond within 4 hours' },
    { value: 'Critical - 8 hr.', description: 'Respond within 8 hours' },
    { value: 'Next Day', description: 'Respond within 24 hours' },
    { value: 'Normal', description: 'Respond within 72 hours' },
    { value: 'Project', description: 'No Response SLA - Completion in 45' }
  ],
  'World Kitchen LLC': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  'Zumiez Canada Holdings, Inc.': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ],
  'Zumiez, Inc.': [
    {
      value: 'Critical',
      description: 'Respond within 4 hours; Fix within 1 day'
    },
    {
      value: 'Emergency',
      description: 'Respond Same Day or Next Day; Fix within 2 days'
    },
    {
      value: 'Normal',
      description: 'Respond within 3 days; fix within 1 week'
    },
    { value: 'Project/Maintenance', description: 'Complete by Due Date' }
  ]
};
