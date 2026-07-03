export const blogs = [
  {
    id: 'intro-ukg-dimensions',
    title: 'Introduction to UKG Dimensions',
    category: 'Fundamentals',
    readTime: '5 min',
    date: 'June 1, 2025',
    summary: 'A beginner-friendly overview of what UKG Dimensions is, who uses it, and why it matters in modern workforce management.',
    content: [
      {
        type: 'intro',
        text: 'UKG Dimensions (formerly Kronos Workforce Dimensions) is a cloud-based Workforce Management (WFM) platform used by organizations to manage employee time, scheduling, accruals, and labor compliance. Think of it as the single system that answers: "Who worked, when, how long, and did we pay them correctly?"',
      },
      {
        type: 'heading',
        text: 'Why Does It Exist?',
      },
      {
        type: 'text',
        text: 'Before WFM tools like UKG, organizations managed timesheets on paper, spreadsheets, or disconnected systems. This led to payroll errors, compliance violations, and hours of manual work. UKG Dimensions brings all of this into one platform.',
      },
      {
        type: 'heading',
        text: 'Who Uses It?',
      },
      {
        type: 'list',
        items: [
          'Large enterprises in Healthcare, Manufacturing, Retail, and Finance',
          'Organizations with hourly and shift-based workforces',
          'HR, Payroll, Operations, and IT teams',
        ],
      },
      {
        type: 'heading',
        text: 'Core Modules at a Glance',
      },
      {
        type: 'table',
        headers: ['Module', 'What It Does'],
        rows: [
          ['Timekeeping', 'Tracks employee clock-in/out and calculates hours'],
          ['Scheduling', 'Builds and manages employee work schedules'],
          ['Accruals', 'Tracks PTO, sick leave, and vacation balances'],
          ['Pay Rules', 'Defines how hours translate into pay (OT, premiums)'],
          ['Forecasting', 'Predicts staffing needs based on demand'],
          ['Analytics', 'Reports and dashboards for insights'],
        ],
      },
      {
        type: 'example',
        label: 'Real-World Example',
        text: 'A hospital with 500 nurses uses UKG Dimensions to automatically schedule shifts based on patient census forecasts, track each nurse\'s hours against union rules, calculate overtime after 8 hours in a shift, and accrue PTO based on hours worked — all without any manual spreadsheet work.',
      },
    ],
  },
  {
    id: 'timekeeping-basics',
    title: 'Timekeeping 101: How UKG Dimensions Tracks Time',
    category: 'Timekeeping',
    readTime: '6 min',
    date: 'June 3, 2025',
    summary: 'Learn how employees clock in and out, what a timecard looks like, and how the system processes raw punches into payable hours.',
    content: [
      {
        type: 'intro',
        text: 'Timekeeping is the heart of UKG Dimensions. It records every moment an employee works and turns those raw punches into hours that can be paid.',
      },
      {
        type: 'heading',
        text: 'How Punches Work',
      },
      {
        type: 'text',
        text: 'An employee clocks in using a time clock device, mobile app, or web browser. Each tap creates a "punch" — a timestamp with the employee ID, date, time, and punch type (IN or OUT).',
      },
      {
        type: 'example',
        label: 'Example',
        text: 'Maria clocks in at 8:02 AM and clocks out at 4:58 PM. UKG records two punches. The system calculates 8 hours 56 minutes of raw time worked.',
      },
      {
        type: 'heading',
        text: 'From Punches to Payable Hours',
      },
      {
        type: 'list',
        items: [
          'Raw punch → Duration calculated (out minus in)',
          'Pay rules applied (e.g., round to nearest 15 min)',
          'Deductions applied (e.g., 30-min auto meal break)',
          'Result = Payable hours on the timecard',
        ],
      },
      {
        type: 'table',
        headers: ['Step', 'Value'],
        rows: [
          ['Clock In', '8:02 AM'],
          ['Clock Out', '4:58 PM'],
          ['Raw Hours', '8h 56m'],
          ['Rounding Applied', '9h 00m (rounded to nearest 15 min)'],
          ['Meal Break Deducted', '8h 30m'],
          ['Payable Hours', '8.5 hours'],
        ],
      },
      {
        type: 'heading',
        text: 'What Is a Timecard?',
      },
      {
        type: 'text',
        text: 'A timecard is the weekly summary of all an employee\'s punches, hours, and pay codes. Managers review and approve timecards before payroll runs. In UKG Dimensions, timecards can show Regular, Overtime, and Holiday hours in separate rows.',
      },
      {
        type: 'example',
        label: 'Tip',
        text: 'If an employee forgets to clock out, UKG flags it as a "missed punch" exception. The manager then manually edits the timecard to add the missing punch — no silent payroll gaps.',
      },
    ],
  },
  {
    id: 'pay-rules-explained',
    title: 'Pay Rules Explained: Making Sense of How Hours Become Pay',
    category: 'Payrules',
    readTime: '7 min',
    date: 'June 5, 2025',
    summary: 'Understand what pay rules are, how they stack (cascading rules), and see practical examples of overtime, premiums, and shift differentials.',
    content: [
      {
        type: 'intro',
        text: 'Pay rules are the brain of the UKG timekeeping system. They tell the system: "Given these hours worked, apply these pay codes." Without correct pay rules, employees get paid wrong — which causes compliance issues and distrust.',
      },
      {
        type: 'heading',
        text: 'What Makes Up a Pay Rule?',
      },
      {
        type: 'list',
        items: [
          'Work Rule: Defines regular vs. overtime thresholds',
          'Zone: Time-of-day ranges (e.g., night shift = 11 PM–7 AM)',
          'Pay Code: The wage category applied (Regular, OT, Weekend Premium)',
          'Cascading order: Which rule takes priority when multiple apply',
        ],
      },
      {
        type: 'heading',
        text: 'Daily Overtime Example',
      },
      {
        type: 'example',
        label: 'Example: California Daily OT Rule',
        text: 'John works 10 hours on Monday. The pay rule says: first 8 hours = Regular pay, hours 8–12 = OT at 1.5x, hours beyond 12 = Double time. So John gets 8h Regular + 2h OT(1.5x). The system applies this automatically from the pay rule — no manual calculation needed.',
      },
      {
        type: 'table',
        headers: ['Hours Worked', 'Pay Code Applied', 'Rate'],
        rows: [
          ['0 – 8 hours', 'Regular', '1.0x'],
          ['8 – 12 hours', 'Overtime', '1.5x'],
          ['12+ hours', 'Double Time', '2.0x'],
        ],
      },
      {
        type: 'heading',
        text: 'Shift Differential Example',
      },
      {
        type: 'example',
        label: 'Example: Night Shift Premium',
        text: 'Sarah works 11 PM to 7 AM. Her pay rule has a "Night Zone" defined from 11 PM–7 AM. Any hours in this zone automatically apply the Night Differential pay code ($2 extra per hour). She earns her base wage + $2/hr for all 8 hours worked.',
      },
    ],
  },
  {
    id: 'accruals-guide',
    title: 'Accruals in UKG Dimensions: PTO, Sick Leave & Vacation Explained',
    category: 'Accruals',
    readTime: '6 min',
    date: 'June 7, 2025',
    summary: 'Understand how UKG Dimensions automatically tracks and updates leave balances, what accrual rules look like, and common accrual policy scenarios.',
    content: [
      {
        type: 'intro',
        text: 'Accruals in UKG Dimensions are the automated system that grows (and shrinks) employee leave balances. Instead of HR manually updating PTO balances in a spreadsheet, UKG does it based on rules you configure.',
      },
      {
        type: 'heading',
        text: 'How Accruals Work',
      },
      {
        type: 'list',
        items: [
          'An accrual rule defines: "Earn X hours for every Y hours worked (or per pay period)"',
          'UKG runs the accrual on a set frequency (weekly, biweekly, monthly)',
          'The employee\'s balance grows automatically',
          'When an employee takes leave, the balance decreases',
        ],
      },
      {
        type: 'example',
        label: 'Example: Standard PTO Accrual',
        text: 'Policy: Employees earn 1.54 hours of PTO per week worked. After 6 months, the rate increases to 2.31 hours/week. UKG stores both rates in the accrual profile. At week 26, it automatically switches to the higher rate — no HR action needed.',
      },
      {
        type: 'table',
        headers: ['Tenure', 'Accrual Rate', 'Annual Total'],
        rows: [
          ['0–1 year', '1.54 hrs/week', '~80 hours (10 days)'],
          ['1–3 years', '2.31 hrs/week', '~120 hours (15 days)'],
          ['3+ years', '3.08 hrs/week', '~160 hours (20 days)'],
        ],
      },
      {
        type: 'heading',
        text: 'Carry-Over Rules',
      },
      {
        type: 'text',
        text: 'Most organizations limit how many hours roll over at year-end. UKG enforces this automatically. For example: "Max carry-over = 40 hours. Any unused balance above 40 is forfeited on Jan 1."',
      },
      {
        type: 'example',
        label: 'Tip',
        text: 'UKG can also trigger a "use-it-or-lose-it" notification email to employees 30 days before year-end if their balance exceeds the cap. This reduces forfeiture surprises.',
      },
    ],
  },
  {
    id: 'scheduling-basics',
    title: 'Scheduling in UKG Dimensions: Shifts, Patterns & Coverage',
    category: 'Scheduling',
    readTime: '7 min',
    date: 'June 9, 2025',
    summary: 'How to think about schedule patterns, shift templates, and coverage rules — and how UKG Dimensions automates the scheduling process for managers.',
    content: [
      {
        type: 'intro',
        text: 'Scheduling in UKG Dimensions is about answering one question: "Who should be working, when, and where?" The system lets you build reusable shift templates, define coverage targets, and auto-fill gaps.',
      },
      {
        type: 'heading',
        text: 'Key Building Blocks',
      },
      {
        type: 'table',
        headers: ['Term', 'Meaning'],
        rows: [
          ['Shift', 'A block of time: e.g., 7 AM–3 PM'],
          ['Schedule Pattern', 'Repeating weekly shift assignments for one person'],
          ['Coverage Rule', 'Minimum staff required per shift per role'],
          ['Schedule Group', 'A team of employees that share a schedule'],
        ],
      },
      {
        type: 'example',
        label: 'Example: Retail Store Scheduling',
        text: 'A store manager needs 3 cashiers from 9 AM–5 PM and 2 cashiers from 5 PM–9 PM, Monday through Saturday. She sets up two shift templates and a coverage rule saying "minimum 3 for morning, 2 for evening." UKG flags any day where coverage isn\'t met, and auto-suggests employees who are available and qualified.',
      },
      {
        type: 'heading',
        text: 'Auto-Scheduling',
      },
      {
        type: 'list',
        items: [
          'UKG can auto-fill the schedule using employee availability, skills, and seniority',
          'It respects constraints like max weekly hours, required rest between shifts, and union rules',
          'Managers review the auto-generated schedule and approve or adjust before publishing',
        ],
      },
      {
        type: 'example',
        label: 'Real Example',
        text: 'Before UKG, a nursing manager at a hospital spent 6 hours every Friday building next week\'s schedule in Excel. With UKG auto-scheduling, the draft is generated in minutes, and the manager spends 30 minutes reviewing and approving — saving 5+ hours per week.',
      },
    ],
  },
  {
    id: 'forecasting-demand',
    title: 'Forecasting in UKG Dimensions: Predicting the Right Staffing Levels',
    category: 'Forecasting',
    readTime: '7 min',
    date: 'June 11, 2025',
    summary: 'Learn how UKG Dimensions uses historical data to forecast labor demand, and how that forecast drives smarter scheduling decisions.',
    content: [
      {
        type: 'intro',
        text: 'Forecasting in UKG Dimensions answers: "How many employees do we need, and when?" Instead of guessing, it uses historical data (sales volume, patient census, transaction counts) to predict demand — and then translates that into a staffing number.',
      },
      {
        type: 'heading',
        text: 'How the Forecast Engine Works',
      },
      {
        type: 'list',
        items: [
          '1. You connect a "volume driver" — e.g., daily customer transactions, patient admissions, or sales revenue',
          '2. UKG analyzes historical patterns (same week last year, trends, seasonality)',
          '3. It generates a volume forecast for the upcoming weeks',
          '4. The volume is divided by a "coverage ratio" to get the headcount needed per hour',
        ],
      },
      {
        type: 'example',
        label: 'Example: Retail Forecasting',
        text: 'A grocery store forecasts 1,200 customer transactions on Saturday between 10 AM–2 PM. The coverage ratio is 1 cashier per 60 transactions per hour. So: 1,200 ÷ 4 hours ÷ 60 = 5 cashiers needed per hour during that window. UKG automatically converts this into a staffing requirement on the schedule.',
      },
      {
        type: 'table',
        headers: ['Hour', 'Forecasted Transactions', 'Cashiers Needed'],
        rows: [
          ['9 AM', '150', '3'],
          ['10 AM', '280', '5'],
          ['11 AM', '320', '6'],
          ['12 PM', '300', '5'],
          ['1 PM', '200', '4'],
        ],
      },
      {
        type: 'heading',
        text: 'Actual vs. Estimated',
      },
      {
        type: 'text',
        text: 'After the week closes, UKG compares the forecast vs. actual volume. If you forecasted 5 cashiers but only needed 3, the variance is flagged. Over time, this data improves forecast accuracy.',
      },
    ],
  },
  {
    id: 'hyperfind-queries',
    title: 'Hyperfind Queries: Finding the Right Employees Fast',
    category: 'Fundamentals',
    readTime: '5 min',
    date: 'June 13, 2025',
    summary: 'Hyperfind is UKG\'s powerful employee filter tool. Learn how to build queries to find specific groups of employees for reporting, scheduling, or bulk actions.',
    content: [
      {
        type: 'intro',
        text: 'A Hyperfind query in UKG Dimensions is like a saved search filter. Instead of scrolling through thousands of employees, you define conditions — and UKG instantly returns only the employees who match.',
      },
      {
        type: 'heading',
        text: 'Common Use Cases',
      },
      {
        type: 'list',
        items: [
          'View all employees in the "Night Shift" job category in Building A',
          'Find all full-time employees who have not had a timecard approved this week',
          'Pull all employees whose PTO balance exceeds 80 hours',
          'Identify employees who clocked overtime in the last 7 days',
        ],
      },
      {
        type: 'example',
        label: 'Example Query',
        text: 'You want to see all employees in the "Warehouse" department who are scheduled this Saturday. You build a Hyperfind with two conditions: (1) Department = Warehouse AND (2) Scheduled = Saturday. Save it as "Warehouse Saturday Crew." Next Saturday, run the same query — it auto-refreshes with the current week\'s data.',
      },
      {
        type: 'table',
        headers: ['Condition Type', 'Examples'],
        rows: [
          ['Employment', 'Full-time, Part-time, Contractor'],
          ['Location', 'Building, Department, Cost Center'],
          ['Job', 'Job Code, Pay Grade, Skill'],
          ['Schedule', 'Scheduled today, On leave, Not scheduled'],
          ['Timecard', 'Unapproved, Has exceptions, Overtime flagged'],
        ],
      },
      {
        type: 'heading',
        text: 'Public vs. Personal Queries',
      },
      {
        type: 'text',
        text: 'You can save queries as "Personal" (only you see them) or "Public" (shared with your team). Managers often share a "My Team — This Week" query so everyone uses the same filter for approvals.',
      },
    ],
  },
  {
    id: 'exceptions-management',
    title: 'Timekeeping Exceptions: What They Are and How to Handle Them',
    category: 'Timekeeping',
    readTime: '6 min',
    date: 'June 15, 2025',
    summary: 'Exceptions alert managers when something is off — a missed punch, early departure, or unauthorized overtime. Learn how to read and resolve them.',
    content: [
      {
        type: 'intro',
        text: 'In UKG Dimensions, an exception is any timekeeping event that deviates from the expected. Think of exceptions as alerts that say: "Something needs your attention before payroll runs."',
      },
      {
        type: 'heading',
        text: 'Common Exception Types',
      },
      {
        type: 'table',
        headers: ['Exception', 'What It Means', 'Action Required'],
        rows: [
          ['Missed Punch', 'Employee clocked in but not out (or vice versa)', 'Manager edits timecard to add missing punch'],
          ['Early In', 'Employee clocked in earlier than scheduled', 'Review if overtime is triggered; approve or adjust'],
          ['Late Out', 'Employee stayed later than shift end', 'Confirm if authorized; check for OT impact'],
          ['Long Break', 'Break exceeded the allowed duration', 'Verify with employee; adjust if needed'],
          ['Absent', 'No punches found when employee was scheduled', 'Assign leave code (FMLA, Sick, Unpaid)'],
          ['Unexcused Absence', 'Absent with no approved leave', 'HR follow-up required'],
        ],
      },
      {
        type: 'example',
        label: 'Example',
        text: 'Tom was scheduled 8 AM–4 PM. He clocked in at 7:45 AM but forgot to clock out. His timecard shows: Exception — "Missed Punch." The manager opens the timecard, sees the gap, and adds a 4:00 PM out-punch. The exception clears, and the timecard is ready for approval.',
      },
      {
        type: 'heading',
        text: 'Exception Severity Levels',
      },
      {
        type: 'list',
        items: [
          'Low (Informational): Noted but does not block payroll processing',
          'Medium (Warning): Needs review before approval',
          'High (Critical): Blocks timecard approval until resolved',
        ],
      },
      {
        type: 'example',
        label: 'Tip for BAs',
        text: 'When configuring exception rules during implementation, always ask: "Should this exception block payroll or just notify?" Blocking too many exceptions creates manager workload; blocking too few misses compliance issues.',
      },
    ],
  },
  {
    id: 'leave-management',
    title: 'Leave Management in UKG Dimensions',
    category: 'Accruals',
    readTime: '6 min',
    date: 'June 17, 2025',
    summary: 'How leave requests flow through UKG Dimensions — from employee request to manager approval to timecard update and accrual deduction.',
    content: [
      {
        type: 'intro',
        text: 'Leave management in UKG Dimensions covers the full cycle of employee time-off: requesting leave, getting it approved, deducting from the right accrual balance, and reflecting it on the timecard and schedule.',
      },
      {
        type: 'heading',
        text: 'The Leave Request Workflow',
      },
      {
        type: 'list',
        items: [
          '1. Employee submits a leave request via the UKG mobile app or web portal',
          '2. System checks if the employee has sufficient balance',
          '3. Manager receives a notification and approves or denies',
          '4. On approval: schedule updated, timecard gets the leave pay code, accrual balance deducted',
        ],
      },
      {
        type: 'example',
        label: 'Example',
        text: 'Lisa requests 3 days of PTO for July 4–6. UKG checks her PTO balance (she has 40 hours). The system flags that the 4th is a holiday — so only 2 days (16 hours) will come from PTO. The July 4th holiday pay is automatic. Her manager approves, her schedule shows "PTO" on those days, and her timecard reflects 8h PTO on the 5th and 6th.',
      },
      {
        type: 'table',
        headers: ['Leave Type', 'Pay Code Used', 'Deducted From'],
        rows: [
          ['Vacation', 'VACATION', 'Vacation accrual balance'],
          ['Sick', 'SICK', 'Sick leave balance'],
          ['FMLA', 'FMLA', 'FMLA bank (or concurrent PTO)'],
          ['Holiday', 'HOLIDAY', 'No deduction — employer-paid'],
          ['Unpaid Leave', 'UNPAID', 'No balance deduction'],
        ],
      },
    ],
  },
  {
    id: 'overtime-rules',
    title: 'Overtime Rules: Daily, Weekly, and Weighted Average',
    category: 'Payrules',
    readTime: '8 min',
    date: 'June 19, 2025',
    summary: 'A clear breakdown of daily vs. weekly overtime, how California rules differ from federal FLSA, and how UKG handles weighted average OT for employees with multiple pay rates.',
    content: [
      {
        type: 'intro',
        text: 'Overtime rules are one of the most complex and compliance-critical areas in WFM. Get them wrong and you face lawsuits, back-pay, and regulatory fines. UKG Dimensions lets you configure them precisely per state, union, or company policy.',
      },
      {
        type: 'heading',
        text: 'Federal (FLSA) vs. California OT',
      },
      {
        type: 'table',
        headers: ['Rule Type', 'Federal (FLSA)', 'California'],
        rows: [
          ['Daily OT threshold', 'None', 'After 8 hours/day'],
          ['Weekly OT threshold', 'After 40 hours/week', 'After 40 hours/week'],
          ['Double time', 'Not required', 'After 12 hrs/day or 7th consecutive day'],
          ['7th day rule', 'Not required', '1.5x for first 8 hrs, 2x after 8'],
        ],
      },
      {
        type: 'example',
        label: 'Example: California Employee',
        text: 'David works Mon–Sun: 10, 10, 10, 10, 0, 0, 8 hours. UKG calculates: Monday–Thursday: 8h Regular + 2h OT each day = 8 OT hours from daily rule. Sunday (7th consecutive day): 8h at 1.5x. Weekly total: 48h worked. Weekly OT kicks in after 40h. UKG picks the greater of daily vs. weekly — employees aren\'t double-counted.',
      },
      {
        type: 'heading',
        text: 'Weighted Average Overtime',
      },
      {
        type: 'text',
        text: 'If an employee works two different jobs at different pay rates in the same week and earns overtime, federal law requires a "weighted average" overtime rate.',
      },
      {
        type: 'example',
        label: 'Weighted Average Example',
        text: 'Amy works 30 hours as a Cashier at $15/hr and 15 hours as a Supervisor at $20/hr = 45 total hours. Total earnings: (30×$15) + (15×$20) = $450 + $300 = $750. Weighted avg rate: $750 ÷ 45h = $16.67/hr. OT premium for 5 OT hours: $16.67 × 0.5 × 5 = $41.67. UKG calculates this automatically.',
      },
    ],
  },
  {
    id: 'timecard-approval',
    title: 'Timecard Approval Workflow: From Entry to Payroll',
    category: 'Timekeeping',
    readTime: '5 min',
    date: 'June 21, 2025',
    summary: 'Walk through the end-to-end timecard approval process — who approves what, in what order, and what happens when payroll runs.',
    content: [
      {
        type: 'intro',
        text: 'A timecard in UKG Dimensions isn\'t just a record — it\'s a workflow. Before hours become pay, they must pass through a defined approval chain. This ensures accuracy, accountability, and audit-readiness.',
      },
      {
        type: 'heading',
        text: 'Standard Approval Flow',
      },
      {
        type: 'list',
        items: [
          '1. Employee reviews and self-approves their own timecard (optional, by policy)',
          '2. Manager reviews exceptions, edits if needed, and approves',
          '3. Payroll administrator does a final review and signoff',
          '4. Payroll exports the approved data to the HR/payroll system (e.g., UKG Pro)',
        ],
      },
      {
        type: 'table',
        headers: ['Stage', 'Who Acts', 'What They Do'],
        rows: [
          ['Employee Sign-off', 'Employee', 'Reviews and confirms their own hours'],
          ['Manager Approval', 'Direct Manager', 'Resolves exceptions, approves hours'],
          ['Payroll Lock', 'Payroll Admin', 'Locks timecard period for export'],
          ['Payroll Export', 'System (automated)', 'Sends hours to payroll system'],
        ],
      },
      {
        type: 'example',
        label: 'Example',
        text: 'Pay period ends Sunday. By Monday 10 AM, employees must self-approve. By Tuesday noon, managers must approve. By Wednesday, payroll locks the period. Any late edits after lock require a payroll adjustment in the next cycle — so timeliness matters.',
      },
      {
        type: 'heading',
        text: 'What Blocks Approval?',
      },
      {
        type: 'list',
        items: [
          'Unresolved high-severity exceptions (e.g., missed punches)',
          'Unapproved overtime (if your policy requires pre-approval)',
          'Missing attestation responses (e.g., meal break compliance)',
        ],
      },
    ],
  },
  {
    id: 'attestation',
    title: 'Attestation in UKG Dimensions: Ensuring Break & Meal Compliance',
    category: 'Timekeeping',
    readTime: '5 min',
    date: 'June 23, 2025',
    summary: 'Attestation prompts employees to confirm compliance with break and meal rules. Learn how it works and why it\'s critical in states like California.',
    content: [
      {
        type: 'intro',
        text: 'Attestation is UKG\'s built-in compliance tool. It asks employees a question at clock-out time: "Did you take your required meal break today?" The employee\'s answer is recorded and becomes part of the audit trail.',
      },
      {
        type: 'heading',
        text: 'Why Attestation Matters',
      },
      {
        type: 'text',
        text: 'California law (and others) requires employers to provide a 30-minute uninterrupted meal break if an employee works more than 5 hours. If the break isn\'t taken, the employer owes a "premium pay" of 1 additional hour of pay. Without attestation, proving compliance in a lawsuit is nearly impossible.',
      },
      {
        type: 'example',
        label: 'How It Works',
        text: 'When a California employee clocks out after 6+ hours, UKG shows a popup: "Did you receive your uninterrupted 30-minute meal break today? Yes / No / Waived." If they say "No," UKG automatically adds a Meal Break Premium pay code to their timecard. If they say "Waived," a waiver record is created.',
      },
      {
        type: 'table',
        headers: ['Employee Answer', 'System Action'],
        rows: [
          ['Yes', 'Compliance confirmed, no additional pay'],
          ['No', 'Meal break premium pay code auto-added (+1 hr pay)'],
          ['Waived', 'Waiver recorded, signed waiver may be required per policy'],
        ],
      },
      {
        type: 'heading',
        text: 'Types of Attestation',
      },
      {
        type: 'list',
        items: [
          'Meal break attestation (most common)',
          'Rest break attestation',
          'Safety check attestation (e.g., "Did you wear PPE today?")',
          'COVID screening (used during pandemic for some orgs)',
        ],
      },
    ],
  },
  {
    id: 'labor-analytics',
    title: 'Labor Analytics in UKG Dimensions: Turning Data Into Decisions',
    category: 'Analytics',
    readTime: '7 min',
    date: 'June 25, 2025',
    summary: 'An introduction to UKG Dimensions\' analytics layer — what reports and dashboards are available, and how to use labor data to improve operations.',
    content: [
      {
        type: 'intro',
        text: 'UKG Dimensions collects enormous amounts of workforce data. The Analytics module turns that data into reports, dashboards, and alerts that help managers and executives make better decisions faster.',
      },
      {
        type: 'heading',
        text: 'Key Report Categories',
      },
      {
        type: 'table',
        headers: ['Category', 'What It Shows'],
        rows: [
          ['Timekeeping', 'Hours by employee, department, pay code, period'],
          ['Scheduling', 'Scheduled vs. actual hours, coverage gaps, no-shows'],
          ['Accruals', 'Current balances, accrual history, projected year-end'],
          ['Overtime', 'OT hours by person, team, week; OT cost trend'],
          ['Compliance', 'Exception counts, missed punches, unapproved timecards'],
          ['Labor Cost', 'Budgeted vs. actual labor cost by department'],
        ],
      },
      {
        type: 'example',
        label: 'Example Dashboard Use Case',
        text: 'An operations director wants to reduce overtime spend. She opens the "Overtime Trend" dashboard, filters to the last 90 days, and sees that the Packaging department has 40% higher OT than any other. She drills down to see that 3 employees account for 60% of that OT — all on the night shift. This data drives a scheduling conversation, not a gut-feel one.',
      },
      {
        type: 'heading',
        text: 'Dataviews vs. Reports',
      },
      {
        type: 'list',
        items: [
          'Dataviews: Live, configurable grids — like Excel tables you can sort, filter, and export',
          'Reports: Scheduled or on-demand formatted reports (PDF/Excel)',
          'Dashboards: Visual widgets (charts, scorecards) on a customizable home screen',
        ],
      },
    ],
  },
  {
    id: 'mobile-ukg',
    title: 'Using UKG Dimensions on Mobile: What Employees and Managers Can Do',
    category: 'Fundamentals',
    readTime: '5 min',
    date: 'June 27, 2025',
    summary: 'The UKG mobile app gives employees and managers real-time access to timecards, schedules, and requests from anywhere. Here\'s what\'s possible.',
    content: [
      {
        type: 'intro',
        text: 'UKG Dimensions has a native mobile app (iOS and Android) that brings the full WFM experience to a phone. For field workers, remote employees, and managers on the go, it\'s essential.',
      },
      {
        type: 'heading',
        text: 'What Employees Can Do',
      },
      {
        type: 'list',
        items: [
          'Clock in and out using GPS-verified location',
          'View their current timecard and hours for the week',
          'Submit time-off requests and check leave balances',
          'View their upcoming schedule and swap shifts with coworkers',
          'Respond to attestation prompts at clock-out',
        ],
      },
      {
        type: 'heading',
        text: 'What Managers Can Do',
      },
      {
        type: 'list',
        items: [
          'Approve timecards and time-off requests on the go',
          'View real-time who is clocked in, late, or absent',
          'Edit punches and resolve exceptions from their phone',
          'Approve schedule changes and shift swaps',
          'Receive push notifications for high-priority exceptions',
        ],
      },
      {
        type: 'example',
        label: 'Real Scenario',
        text: 'A warehouse manager is at a vendor meeting when an employee calls in sick at 7 AM. On her phone she opens UKG, sees the open shift, taps to find available employees, sends a shift offer to 3 qualified employees, and the first one to accept fills the gap — all before the meeting ends.',
      },
    ],
  },
  {
    id: 'activity-tracking',
    title: 'Activity Tracking in UKG Dimensions: Beyond Simple Clock-In',
    category: 'Timekeeping',
    readTime: '6 min',
    date: 'June 29, 2025',
    summary: 'Activity tracking lets employees log time against specific tasks, cost centers, or projects during a shift — enabling granular labor cost allocation.',
    content: [
      {
        type: 'intro',
        text: 'Standard timekeeping tells you "Maria worked 8 hours on Monday." Activity tracking tells you "Maria spent 3 hours on Assembly Line A, 2 hours on Quality Control, and 3 hours on Training." This granularity is critical for labor costing and project billing.',
      },
      {
        type: 'heading',
        text: 'How Employees Log Activities',
      },
      {
        type: 'list',
        items: [
          'At a time clock or mobile app, employees clock into a specific Activity or Work Order',
          'They can switch activities during a shift without clocking out (an "activity transfer")',
          'Each activity entry captures: employee, start time, end time, and activity code',
        ],
      },
      {
        type: 'example',
        label: 'Example: Manufacturing Plant',
        text: 'Jake\'s shift is 6 AM–2 PM. He clocks in at 6 AM to Activity "Machine Setup." At 7:30 AM, he transfers to "Production Run." At 12 PM he transfers to "Break." At 12:30 PM back to "Production Run." UKG captures all four segments. At payroll, labor costs are split: 1.5h to Setup cost center, 6h to Production cost center.',
      },
      {
        type: 'table',
        headers: ['Time', 'Activity', 'Duration'],
        rows: [
          ['6:00 AM', 'Machine Setup', '1.5 hours'],
          ['7:30 AM', 'Production Run', '4.5 hours'],
          ['12:00 PM', 'Break', '0.5 hours'],
          ['12:30 PM', 'Production Run', '1.5 hours'],
        ],
      },
    ],
  },
  {
    id: 'shift-swapping',
    title: 'Shift Swapping and Open Shifts in UKG Dimensions',
    category: 'Scheduling',
    readTime: '5 min',
    date: 'July 1, 2025',
    summary: 'How employees can request shift swaps and how managers can post open shifts — giving teams flexibility while keeping coverage requirements met.',
    content: [
      {
        type: 'intro',
        text: 'Life happens — employees need to swap shifts. UKG Dimensions has a built-in shift swap and open shift process that keeps managers in control while giving employees flexibility.',
      },
      {
        type: 'heading',
        text: 'Shift Swap Process',
      },
      {
        type: 'list',
        items: [
          '1. Employee A selects their shift and requests a swap with Employee B',
          '2. Employee B receives a notification and accepts or declines',
          '3. UKG checks that the swap doesn\'t violate rules (overtime, qualifications, rest time)',
          '4. Manager receives the proposed swap for approval',
          '5. On approval, both schedules update automatically',
        ],
      },
      {
        type: 'example',
        label: 'Example',
        text: 'Carlos has a dentist appointment on Thursday and needs to swap with Ana. He opens the UKG app, selects his Thursday 8 AM–4 PM shift, taps "Request Swap," and selects Ana. Ana gets a push notification, reviews it, and accepts. Their manager approves in 2 minutes. Both schedules flip — no emails, no phone tag.',
      },
      {
        type: 'heading',
        text: 'Open Shifts',
      },
      {
        type: 'text',
        text: 'When a shift is uncovered (due to call-out or understaffing), managers can post it as an "Open Shift." Qualified employees in the schedule group see it and can claim it first-come, first-served — or the manager can select the best candidate.',
      },
    ],
  },
  {
    id: 'integration-payroll',
    title: 'Integrating UKG Dimensions with Payroll Systems',
    category: 'Fundamentals',
    readTime: '6 min',
    date: 'July 3, 2025',
    summary: 'How UKG Dimensions sends approved time data to payroll — the interfaces, data formats, and common integration patterns with UKG Pro, ADP, and SAP.',
    content: [
      {
        type: 'intro',
        text: 'UKG Dimensions is a time and labor system — it calculates hours. But it doesn\'t cut checks. That\'s the payroll system\'s job. Integration connects the two so approved hours flow automatically into payroll each cycle.',
      },
      {
        type: 'heading',
        text: 'What Gets Sent to Payroll',
      },
      {
        type: 'table',
        headers: ['Data Element', 'Example Value'],
        rows: [
          ['Employee ID', 'EMP-00123'],
          ['Pay Code', 'REG, OT, SICK, VACATION'],
          ['Hours', '40.0 REG, 5.0 OT'],
          ['Pay Period', '2025-06-01 to 2025-06-15'],
          ['Cost Center', 'CC-2041 (Warehouse)'],
        ],
      },
      {
        type: 'heading',
        text: 'Common Integration Patterns',
      },
      {
        type: 'list',
        items: [
          'UKG Dimensions → UKG Pro (native integration, same vendor)',
          'UKG Dimensions → ADP Workforce Now (flat file or API)',
          'UKG Dimensions → SAP HCM (middleware like MuleSoft or Dell Boomi)',
          'UKG Dimensions → Workday Payroll (API-based)',
        ],
      },
      {
        type: 'example',
        label: 'Integration Scenario',
        text: 'Pay period closes Sunday. Monday morning, payroll admin clicks "Lock Period" in UKG Dimensions. An automated job runs at 6 AM Tuesday, extracts all approved timecard data as a flat file, and drops it on a secure SFTP server. ADP picks it up, maps each pay code to the ADP earnings code, and loads it into payroll for processing. The whole handoff is automated — no CSV emailing.',
      },
    ],
  },
  {
    id: 'labor-compliance',
    title: 'Labor Compliance in UKG Dimensions: Rules, Audits, and Alerts',
    category: 'Payrules',
    readTime: '7 min',
    date: 'July 5, 2025',
    summary: 'How UKG Dimensions helps organizations stay compliant with labor laws — from configuring rule-based alerts to generating audit reports.',
    content: [
      {
        type: 'intro',
        text: 'Labor compliance is about making sure your workforce practices follow the law — federal, state, and local. UKG Dimensions acts as a compliance guardrail, catching violations before they become lawsuits.',
      },
      {
        type: 'heading',
        text: 'Key Compliance Areas UKG Covers',
      },
      {
        type: 'list',
        items: [
          'Overtime laws (FLSA federal, state-specific daily OT)',
          'Meal and rest break requirements',
          'Minimum shift length and rest period between shifts',
          'Predictive scheduling laws (advance notice of schedule changes)',
          'Minor labor laws (maximum hours for employees under 18)',
        ],
      },
      {
        type: 'example',
        label: 'Example: Predictive Scheduling',
        text: 'Chicago\'s Fair Workweek Ordinance requires 10 days advance notice of schedules. In UKG, you configure a rule that flags any shift added less than 10 days before the work date. The system auto-calculates if a "predictability pay" premium is owed. Managers see a warning before they publish late-notice schedules.',
      },
      {
        type: 'table',
        headers: ['Law / Rule', 'UKG Feature Used'],
        rows: [
          ['CA Meal Break', 'Attestation + Meal Premium pay code'],
          ['FLSA Overtime', 'Work rule configured at 40h/week threshold'],
          ['Predictive Scheduling', 'Schedule change notification + premium pay rule'],
          ['Minor Labor (< 18)', 'Employee attribute triggers max-hours alert'],
          ['Rest Period (8h between shifts)', 'Scheduling rule blocks shifts violating rest gap'],
        ],
      },
    ],
  },
  {
    id: 'kpi-wfm',
    title: 'Key WFM KPIs Every Business Analyst Should Know',
    category: 'Analytics',
    readTime: '7 min',
    date: 'July 7, 2025',
    summary: 'A practical guide to the most important workforce management KPIs — what they measure, how they\'re calculated, and what good looks like.',
    content: [
      {
        type: 'intro',
        text: 'As a BA working on WFM projects, you\'ll constantly be asked: "How do we measure success?" These are the KPIs that matter most in UKG Dimensions implementations.',
      },
      {
        type: 'table',
        headers: ['KPI', 'Formula', 'Target (typical)'],
        rows: [
          ['Schedule Adherence', 'Actual hours worked ÷ Scheduled hours × 100', '> 95%'],
          ['Overtime %', 'OT hours ÷ Total hours worked × 100', '< 5%'],
          ['Timecard Approval Rate', 'Approved timecards ÷ Total timecards × 100', '> 98% by day 1 post period'],
          ['Exception Rate', 'Exceptions ÷ Total punches × 100', '< 3%'],
          ['Absenteeism Rate', 'Unplanned absences ÷ Scheduled days × 100', '< 2.5%'],
          ['Forecast Accuracy', '1 - |Forecast - Actual| ÷ Actual × 100', '> 90%'],
          ['Labor Cost Variance', 'Actual labor cost - Budgeted labor cost', 'Within ±3%'],
        ],
      },
      {
        type: 'example',
        label: 'Example: Using KPIs in a BA Project',
        text: 'During a UKG implementation for a retail chain, the baseline exception rate was 12% (very high). After implementing proper punch rounding rules, geo-fenced mobile clocking, and mandatory break reminders, the exception rate dropped to 2.4% within 60 days. This became the measurable success metric in the project closure report.',
      },
      {
        type: 'heading',
        text: 'How to Surface These in UKG',
      },
      {
        type: 'list',
        items: [
          'Schedule Adherence: Dataview comparing scheduled vs. actual hours',
          'Overtime %: Pay code summary report filtered to OT codes',
          'Exception Rate: Exception Summary report by department',
          'Timecard Approval Rate: Timecard Audit report, status = Approved',
        ],
      },
    ],
  },
  {
    id: 'advance-scheduling-wfm',
    title: 'Advance Scheduling: Planning Workforce 4–6 Weeks Out',
    category: 'Forecasting',
    readTime: '6 min',
    date: 'July 9, 2025',
    summary: 'What advance scheduling means in WFM, why it reduces costs and improves satisfaction, and how UKG Dimensions supports publishing schedules weeks in advance.',
    content: [
      {
        type: 'intro',
        text: 'Advance scheduling means publishing employee work schedules weeks — not days — before the work period starts. It benefits employees (they can plan their lives) and employers (less last-minute scrambling and agency spend).',
      },
      {
        type: 'heading',
        text: 'Why Go Further in Advance?',
      },
      {
        type: 'table',
        headers: ['Horizon', 'Typical In', 'Impact'],
        rows: [
          ['1–2 days', 'Low-maturity orgs', 'High OT, agency use, low morale'],
          ['1 week', 'Most retail/hospitality', 'Better, but reactive to demand changes'],
          ['4 weeks', 'Healthcare, manufacturing', 'Employees plan childcare, 2nd jobs; lower no-shows'],
          ['6+ weeks', 'Leading WFM orgs', 'Max employee satisfaction, lowest labor variance'],
        ],
      },
      {
        type: 'example',
        label: 'How UKG Enables 6-Week Advance Scheduling',
        text: 'A healthcare network runs a 6-week rolling advance schedule. Each Monday, the system auto-generates week 7\'s schedule based on: (1) forecasted patient census, (2) employee preferences submitted via the app, (3) union rotation rules. The draft is ready by Tuesday, managers review and publish by Friday — giving nurses 6 weeks of visibility.',
      },
      {
        type: 'heading',
        text: 'Employee Self-Scheduling',
      },
      {
        type: 'list',
        items: [
          'Employees submit availability and preferences in UKG up to 8 weeks out',
          'The scheduling engine considers preferences when auto-filling shifts',
          'Employees who set availability get first priority for preferred shifts',
          'This drives adoption and reduces schedule change requests',
        ],
      },
      {
        type: 'example',
        label: 'Business Impact',
        text: 'One healthcare client saw agency nursing spend drop by $2.1M per year after moving from 1-week to 6-week advance scheduling. Nurses knew their schedules far enough ahead to avoid last-minute call-outs, and managers stopped scrambling to fill gaps with expensive agency staff.',
      },
    ],
  },
];
