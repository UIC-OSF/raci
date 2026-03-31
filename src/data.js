export const people = [
    { id: 'blake', name: 'Blake' },
    { id: 'gemma', name: 'Jemma' },
    { id: 'stefin', name: 'Stefin' },
    { id: 'trey', name: 'Trey' },
    { id: 'new_support_hire', name: 'New Support Hire' },
    { id: 'amanda', name: 'Amanda' },
    { id: 'chris', name: 'Chris' },
    { id: 'brother_j', name: 'Brother J' },
    { id: 'ck', name: 'CK' },
    { id: 'michelle', name: 'Michelle' },
    { id: 'asya', name: 'Asya' },
    { id: 'jason', name: 'Jason' },
    { id: 'dylan', name: 'Dylan' },
    { id: 'lucy', name: 'Lucy' },
    { id: 'helen', name: 'Helen' }
];

export const projects = [
    { id: 'dae', name: 'DAE' },
    { id: 'equalify', name: 'Equalify' },
    { id: 'ai_leaders', name: 'AI Leaders' },
    { id: 'open_source_fund', name: 'Open Source Fund' }
];

export const areas = [
    {
        id: 'dae_team_management',
        label: 'Team Management',
        project: 'dae',
        objective: 'Overarchingly manage the areas in this RACI chart.',
        meetingRegularity: 'As needed',
        informedRegularity: 'On updates',
        effectiveDate: '2026-02-27?',
        r: ['blake'],
        a: ['gemma'],
        c: ['trey', 'chris', 'stefin', 'helen'],
        i: ['new_support_hire', 'amanda', 'brother_j', 'ck', 'michelle', 'asya', 'dylan']
    },
    {
        id: 'support',
        label: 'Support',
        project: 'equalify',
        objective: 'Provide timely and effective assistance to Equalify users and maintain high satisfaction through comprehensive support services.',
        meetingRegularity: 'Monthly (1st Fri)',
        informedRegularity: 'On updates',
        effectiveDate: 'TBD',
        r: ['new_support_hire'],
        a: ['amanda'],
        c: ['chris', 'ck', 'trey', 'dylan', 'blake'],
        i: ['gemma']
    },
    {
        id: 'documentation',
        label: 'Equalify Documentation',
        project: 'equalify',
        objective: 'Develop, maintain, and innovate the Equalify Documentation to serve as the central accessibility management system.',
        meetingRegularity: 'Monthly (2nd Tue)',
        informedRegularity: 'On updates',
        effectiveDate: 'TBD',
        r: ['chris'],
        a: ['blake'],
        c: ['trey', 'amanda', 'ck', 'new_support_hire'],
        i: ['gemma']
    },
    {
        id: 'reflow_development',
        label: 'Reflow',
        project: 'equalify',
        objective: 'Direct the architecture, development, and cross-project integration of the Reflow design system for UI consistency.',
        meetingRegularity: 'Monthly (3rd Wed)',
        informedRegularity: 'On updates',
        effectiveDate: 'TBD',
        r: ['dylan'],
        a: ['blake'],
        c: ['gemma'],
        i: ['chris', 'trey', 'ck', 'amanda', 'new_support_hire']
    },
    {
        id: 'dashboard_product',
        label: 'Dashboard Product',
        project: 'equalify',
        objective: 'Design and implement interactive, data-driven dashboards for visualizing complex accessibility metrics and trends.',
        meetingRegularity: 'Monthly (3rd Mon at 11 CST)',
        informedRegularity: 'On updates',
        effectiveDate: 'March 27, 2026',
        r: ['trey'],
        a: ['blake'],
        c: ['chris', 'amanda'],
        i: ['ck', 'new_support_hire', 'gemma']
    },
    {
        id: 'open_source_community_management',
        label: 'Equalify Open Source Community Management',
        project: 'equalify',
        objective: 'Foster collaboration and engagement within the open source community.',
        meetingRegularity: 'TBD',
        informedRegularity: 'On updates',
        effectiveDate: 'TBD',
        r: [],
        a: ['blake'],
        c: [],
        i: []
    },
    {
        id: 'accessibility',
        label: 'Accessibility',
        project: 'equalify',
        objective: 'Enforce and validate rigorous accessibility standards across all Equalify products to ensure an inclusive user experience.',
        meetingRegularity: 'Monthly (1st Tue)',
        informedRegularity: 'On updates',
        effectiveDate: 'TBD',
        r: ['ck'],
        a: ['chris'],
        c: ['brother_j', 'trey'],
        i: ['blake', 'gemma']
    },
    {
        id: 'equalify_release',
        label: 'Release',
        project: 'equalify',
        objective: 'Manage the full lifecycle of software releases, ensuring stability, performance, and seamless deployment of new features.',
        meetingRegularity: 'Monthly (3rd Thu)',
        informedRegularity: 'On updates',
        effectiveDate: 'TBD',
        r: ['amanda'],
        a: ['trey'],
        c: ['blake', 'chris', 'ck', 'new_support_hire'],
        i: ['gemma']
    },
    {
        id: 'user_testing_extension',
        label: 'User Testing Extension',
        project: 'equalify',
        objective: 'Develop and maintain specialized tools for gathering and analyzing direct user feedback on accessibility barriers.',
        responsibleRegularity: 'Weekly (Tue and Thu)',
        accountableRegularity: 'Weekly (Mon and Fri)',
        meetingRegularity: 'Monthly (3rd Wed)',
        informedRegularity: 'Monthly (2nd Mon)',
        effectiveDate: 'March 18, 2026',
        r: ['ck', 'brother_j'],
        a: ['chris'],
        c: ['blake'],
        i: ['trey', 'gemma', 'amanda', 'new_support_hire', 'lucy']
    },
    {
        id: 'operations',
        label: 'Operations',
        project: 'open_source_fund',
        objective: 'Streamline administrative workflows, internal communications, and operational efficiency for the Open Source Fund.',
        meetingRegularity: 'Monthly (3rd Tue)',
        informedRegularity: 'On updates',
        effectiveDate: 'TBD',
        r: ['michelle'],
        a: ['blake'],
        c: ['stefin'],
        i: ['gemma']
    },
    {
        id: 'board_creation',
        label: 'Management',
        project: 'open_source_fund',
        objective: 'Oversee strategic governance, stakeholder relations, and high-level fundraising initiatives for the fund.',
        meetingRegularity: 'Monthly (2nd Wed)',
        informedRegularity: 'On updates',
        effectiveDate: 'TBD',
        r: ['blake'],
        a: ['jason'],
        c: ['stefin', 'gemma'],
        i: ['michelle']
    },
    {
        id: 'admissions',
        label: 'Student Services',
        project: 'ai_leaders',
        objective: 'Execute targeted recruitment, streamline the enrollment process, and provide comprehensive support to students throughout the AI Leaders program.',
        meetingRegularity: 'Monthly (1st Wed)',
        informedRegularity: 'On updates',
        effectiveDate: 'TBD',
        r: ['asya'],
        a: ['stefin'],
        c: ['blake'],
        i: ['gemma', 'jason']
    },
    {
        id: 'ail_management',
        label: 'Management',
        project: 'ai_leaders',
        objective: 'Provide strategic direction and administrative oversight for the AI Leaders program and its constituent representation.',
        meetingRegularity: 'Monthly (2nd Thu)',
        informedRegularity: 'On updates',
        effectiveDate: '2026-02-27',
        r: ['stefin'],
        a: ['blake'],
        c: ['gemma', 'asya'],
        i: ['jason']
    },
    {
        id: 'ail_platform_buildout',
        label: 'Platform Buildout',
        project: 'ai_leaders',
        objective: 'Execute the initial platform buildout and support until May 14, followed by a transition to a newly established engineering team.',
        meetingRegularity: 'Weekly (Tue)',
        informedRegularity: 'On updates',
        effectiveDate: '2026-02-27',
        r: ['blake'],
        a: ['stefin'],
        c: ['asya'],
        i: ['jason', 'gemma']
    }
];

export const roleDefinitions = {
    R: {
        title: 'Responsible',
        description: 'The person who performs the work or completes the task.',
        color: '#d50032'
    },
    A: {
        title: 'Accountable',
        description: 'The person who is ultimately answerable for the correct and thorough completion of the task.',
        color: '#f59e0b'
    },
    C: {
        title: 'Consulted',
        description: 'Those whose opinions are sought, typically subject-matter experts.',
        color: '#3b82f6'
    },
    I: {
        title: 'Informed',
        description: 'Those who are kept up-to-date on progress or completion.',
        color: '#6b7280'
    }
};

export const sops = [
    {
        id: 'sop_dae_management',
        title: 'Procedure and Management',
        project: 'dae',
        area: 'dae_team_management',
        responsible: 'blake',
        accountable: 'gemma',
        effectiveDate: '2026-02-27?',
        reviewCadence: 'Monthly (Last Tue at 11AM)',
        reportRegularity: 'On Updates',
        content: `
<h3>1) Overview</h3>
<p>This SOP overarchingly details how to manage the areas in this RACI chart. <mark><strong>The SOP's primary focus is to empower individual ownership and streamline communication to maximize the performance of team projects.</strong></mark> Each responsible party can create an SOP with those accountable for their RACI area. SOPs are agreements laying out clear objectives and communication strategies that the Responsible and Accountable parties agree to.</p>
<h3>2) Communication Procedures</h3>
<ol>
    <li>Responsible and Accountable parties <strong>collaborate continuously</strong> on the development of the area.</li>
    <li>Those accountable <strong>support</strong> the presentation and <strong>validate</strong> area progress.</li>
    <li>The Responsible person <strong>presents</strong> updates and <strong>solicits</strong> feedback from those who need to be consulted during the regular update meeting.</li>
    <li>Those informed <strong>receive update reports</strong> from the responsible person within the agreed regularity, stipulated in the SOP.</li>
</ol>
<h3>3) Success and Failure Verification</h3>
<p><strong>Success:</strong> Team operations remain strictly within the communication procedures outlined in this document.</p>
<p><strong>Failure:</strong> Procedures are circumnavigated, leading to operational inefficiency.</p>
<p><strong>Failure Examples:</strong> Additional meetings or communication required by parties who are neither Responsible nor Accountable for the specific area.</p>
<h3>4) Remediation</h3>
<p>In the event of failure, the team is expected to work down this sequential list:</p>
<ol>
    <li>Address the system that created the bug causing the failure.</li>
    <li>Increase consultation meeting regularity for the impacted area.</li>
    <li>Update RACI items to ensure clarity and alignment with operational needs. Updating the RACI is the final end of the remediation process and should be prevented at all costs.</li>
</ol>
<h3>5) Procedure Flow Diagram</h3>
<pre class="mermaid">
graph TD
    Start((Operational Start)) --> Process[Continuous Collaboration<br/>R & A Parties]
    Process --> Prep[Accountable Support &<br/>Validate Progress]
    Prep --> Presentation[Responsible Presents & Solicits<br/>Consulted Feedback at Meeting]
    Presentation --> Informed[Informed Receive Regular Update Reports]
    Informed --> SuccessCheck{Procedures Followed?}
    
    SuccessCheck -- Yes --> Success([Success: Efficient Operations])
    SuccessCheck -- No --> Failure([Failure: Procedures Circumnavigated])
    
    Failure --> Remediation1[1. Address System Bug<br/>Causing Failure]
    Remediation1 --> Remediation2[2. Increase Consultation<br/>Meeting Regularity]
    Remediation2 --> Remediation3[3. Update RACI Items<br/>Final End - Prevent if possible]
    
    Success --> Start
    Remediation3 --> Start
</pre>
<h3>6) RACI Update Process</h3>
<p>In the case of a new area implementation or a required RACI update, the following process is followed:</p>
<ol>
    <li><strong>Call a meeting</strong> with those who may be affected by the RACI update and anyone who raised concerns leading to the update.</li>
    <li><strong>Agree on updates</strong> collaboratively during the meeting.</li>
    <li><strong>Note the effective date</strong> on the updated RACI item.</li>
    <li><strong>Proceed</strong> with team operations under the new assignments.</li>
</ol>
        `
    },
    {
        id: 'sop_user_testing_extension',
        title: 'User Testing Extension Development',
        project: 'equalify',
        area: 'user_testing_extension',
        responsible: 'ck',
        accountable: 'chris',
        effectiveDate: 'March 18, 2026',
        reviewCadence: 'Weekly (Tue and Thu)',
        reportRegularity: 'Monthly (2nd Mon)',
        content: `
<h3>1. Purpose</h3>
<p>This document outlines the standard operating procedures, communication protocols, and the development timeline for the User Testing Extension. It serves to align the engineering team on feature planning, UI considerations, and implementation milestones.</p>
<h3>2. Team Communication & Cadence</h3>
<p>Continuous and structured communication is critical to maintaining momentum and addressing technical constraints.</p>
<h4>2.1. Design Meetings</h4>
<ul>
    <li><strong>Frequency:</strong> Weekly (Tue and Thu)</li>
    <li><strong>Participants:</strong> CK, Brother J, Lucy (optional)</li>
    <li><strong>Objective:</strong> Plan upcoming features, refine user flows, and discuss User Interface (UI) considerations.</li>
</ul>
<h4>2.2. Development Meetings</h4>
<ul>
    <li><strong>Frequency:</strong> Weekly (Mon and Fri)</li>
    <li><strong>Participants:</strong> CK, Brother J, CA, Lucy (optional)</li>
    <li><strong>Objective:</strong> Discuss feature implementation, troubleshoot technical constraints, and forecast further development phases.</li>
</ul>
<h4>2.3. Consulted Monthly Reviews</h4>
<ul>
    <li><strong>Frequency:</strong> Monthly (3rd Wed)</li>
    <li><strong>Participants:</strong> Blake, CK, Brother J</li>
    <li><strong>Objective:</strong> Provide updates to Consulted members to gather insight, clear roadblocks, and validate features against overarching accessibility goals.</li>
</ul>
<h4>2.4. Informed Project Updates</h4>
<ul>
    <li><strong>Frequency:</strong> Monthly (2nd Mon)</li>
    <li><strong>Participants:</strong> DASE Team</li>
    <li><strong>Objective:</strong> Notify Informed stakeholders of overall project trajectory and key developments during the scheduled DASE monthly meeting.</li>
</ul>
<h4>2.5. Asynchronous Communication</h4>
<ul>
    <li>Responsible and Accountable Team members are expected to maintain ongoing asynchronous communication throughout the week to unblock team members, share progress, and ask questions outside of scheduled meetings.</li>
</ul>
<h3>3. Development Roadmap & Milestones</h3>
<h4>Phase 1: Foundational Prototype (Target: Late March)</h4>
<p>The initial release focuses on establishing core functionality, basic user flow, and fundamental tracking capabilities.</p>
<ul>
    <li><strong>Onboarding & UI:</strong> Implement initial setup/first-run screens and the default start screen.</li>
    <li><strong>Configuration:</strong> Develop functionality to set Assistive Technology (AT) and user agent configurations (via auto-detection or manual declaration).</li>
    <li><strong>Core Features:</strong>
        <ul>
            <li>Implement issue filing functionality.</li>
            <li>Establish focus tracking capabilities.</li>
            <li>Develop a system to check for existing audits based on the current URL.</li>
            <li>Map and establish functions triggered by user-assignable keyboard commands.</li>
        </ul>
    </li>
    <li><strong>Equalify Integration:</strong> Implement data reporting so that user testing information successfully syncs and displays directly on the corresponding Equalify audit.</li>
</ul>
<h4>Phase 2: Media & External Integration (Target: Mid April)</h4>
<p>The second phase expands the reporting capabilities to include rich media and third-party tools.</p>
<ul>
    <li><strong>Screen Capture Options:</strong> Explore and implement screenshot, video, and audio capture functionalities.</li>
    <li><strong>External Tools:</strong> Investigate direct integrations and triggers for external tools (e.g., Zoom, Microsoft Teams, Loom) to streamline the user testing workflow.</li>
    <li><strong>Continuous Equalify Integration:</strong> Ensure all captured rich media generated by user testing seamlessly attaches to the corresponding Equalify audit tracking system.</li>
</ul>
<h4>Phase 3: Advanced Accessibility (a11y) Integration (Target: Mid May)</h4>
<p>The final planned phase focuses on deep integration with screen reading software to enhance the depth of bug reporting.</p>
<ul>
    <li><strong>Information Sharing:</strong> Research how screen readers can communicate directly with the extension to share information that contextualizes a11y bugs and enhances reporting.</li>
    <li><strong>NVDA Integration:</strong> Explore the feasibility of building an NVDA add-on to relay information to the extension.</li>
    <li><strong>JAWS Integration:</strong> Explore the creation of JAWS scripts for data relay.</li>
    <li><strong>VoiceOver Integration:</strong> Investigate potential integration capabilities and data relay workflows for macOS VoiceOver.</li>
    <li><strong>Advanced Tracking:</strong> Investigate if these advanced integrations can effectively capture user interaction data that is otherwise not exposed through conventional browser APIs.</li>
    <li><strong>Continuous Equalify Integration:</strong> Route all advanced screen reader diagnostics directly back to the Equalify auditing platform to provide unprecedented context for a11y issues.</li>
</ul>
<h3>4. Document Maintenance</h3>
<p>This SOP and roadmap should be reviewed regularly during monthly reviews.</p>
        `
    },
    {
        id: 'sop_dashboard_product',
        title: 'Equalify Service Request Standard Operating Procedure (SOP)',
        project: 'equalify',
        area: 'dashboard_product',
        responsible: 'trey',
        accountable: 'blake',
        effectiveDate: 'March 27, 2026',
        reviewCadence: 'Monthly (3rd Mon at 11 CST)',
        reportRegularity: 'On updates',
        content: `
<h3>1. Purpose &amp; Scope</h3>
<p>To define the process for handling service requests related to the use of the Equalify accessibility scanning platform.</p>
<h3>2. Procedures</h3>
<h4>Step 1: Receipt and Logging</h4>
<p>Requests for Equalify support should be filed in the Issues section of the Equalify github repository, by clicking the "New Issue" button in the top-right. Users may submit issues as either Bugs or Feature Requests; depending on the type of issue the user selects, the user will be given a pre-formatted issue which they should edit to include the details and information appropriate to their issue.</p>
<ul>
    <li><strong>Bugs</strong> are any issues with the Equalify interface or scan not performing as expected.</li>
    <li><strong>Feature Requests</strong> are requests for additional functionally, changes in UI/UX, or any other new feature.</li>
</ul>
<p>Please include as much information as possible in your issue. The user creating the issue will be treated as the point of contact.</p>
<p><em>Note for DASE team users:</em> In the case of an emergency issue - e.g. inability to access the Equalify service, breaking errors, etc - DASE team members may contact the Engineering team directly in the DASE Engineering chat in Microsoft Teams for immediate action. If appropriate, the Engineering team may create a git issue summarizing the problem.</p>
<h4>Step 2: Prioritization</h4>
<p>During Equalify Engineering's biweekly standups (Tues and Thurs at 12 CST), new Bug issues will be reviewed and added to the development schedule, based on severity/impact. Minor Feature Requests may also be added to the development schedule at this time.</p>
<p>Major Feature Requests will be reviewed in the Monthly Feature Request meeting (Monthly on the 3rd Monday at 11 CST), and added to the roadmap and development schedule if deemed appropriate.</p>
<h4>Step 3: Assignment &amp; Action</h4>
<p>During the biweekly Engineering standups (Tues and Thurs at 12 CST), outstanding issues will be assigned to an Engineering team member and added to their development schedule, and a status note will be placed on the original issue indicating a solution is being worked on.</p>
<h4>Step 4: Verification &amp; Closure</h4>
<p>Status of the assigned outstanding issue will be reviewed at the biweekly Engineering standups (Tues and Thurs at 12 CST), and upon completion, the git issue will be updated to notify the original filer the issue has been resolved.</p>
        `
    }
];
