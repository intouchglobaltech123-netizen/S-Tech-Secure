/**
 * SEO content for each service page.
 * Wording is taken from the S TEC SECURE company brochure.
 */

export type ServiceSeo = {
  /** Clear, search-friendly name used for headings, titles and alt text */
  name: string;
  /** Short name used inside sentences, e.g. "Where CCTV is used" */
  shortName: string;
  /** Search result description (under 160 characters) */
  description: string;
  useCases: { title: string; desc: string }[];
  /** "Title: description" installation items, used where the main data file has none */
  included?: string[];
  faqs: { q: string; a: string }[];
};

export const SURVEY_FAQ = {
  q: "Do you offer a free site survey?",
  a: "Yes. An S TEC SECURE engineer visits your property in Erode, Salem, Coimbatore or nearby areas, checks what you need and gives you a clear quote. The survey is free.",
};

export const SERVICE_SEO: Record<string, ServiceSeo> = {
  cctv: {
    name: "CCTV Surveillance Systems",
    shortName: "CCTV",
    description:
      "CCTV camera installation in Erode, Salem and Coimbatore. HD and night-vision cameras with mobile viewing and motion alerts. Free site survey.",
    useCases: [
      { title: "Homes & villas", desc: "Protects homes from intrusions and vandalism." },
      { title: "Shops & offices", desc: "Monitors business premises to prevent theft and keep staff safe." },
      { title: "Public spaces", desc: "Deters crime and improves community safety." },
    ],
    faqs: [
      {
        q: "What is a CCTV system?",
        a: "A closed-circuit television (CCTV) system sends video from cameras to recorders, monitors and your phone, giving round-the-clock security for homes and businesses.",
      },
      {
        q: "Can I watch my CCTV cameras on my phone?",
        a: "Yes. We set up remote access so you can view live and recorded footage on your mobile or computer, anytime and from anywhere.",
      },
      {
        q: "Will the cameras work at night and in the rain?",
        a: "Yes. We install cameras with night vision in weatherproof housings, suitable for both indoor and outdoor use.",
      },
    ],
  },
  "home-automation": {
    name: "Smart Home Automation",
    shortName: "home automation",
    description:
      "Smart home automation in Erode, Salem and Coimbatore. Control lights, climate and appliances from your phone or by voice. Free site survey.",
    useCases: [
      { title: "Independent houses", desc: "Control lighting, climate and appliances from one app." },
      { title: "Villas", desc: "Smart locks, cameras and motion sensors work together." },
      { title: "Apartments", desc: "Schedules and voice control for everyday comfort." },
    ],
    faqs: [
      {
        q: "What is home automation?",
        a: "Home automation brings technology into your home to improve convenience, security and energy efficiency. You can control lights, climate and appliances remotely or on automatic schedules.",
      },
      {
        q: "Can I control my home with Alexa or Google Assistant?",
        a: "Yes. Voice control works with virtual assistants like Amazon Alexa and Google Assistant, so you can control devices hands-free.",
      },
      {
        q: "Does home automation save energy?",
        a: "Energy management lets you see consumption in real time and schedule lights and appliances, so you can cut waste and save on bills.",
      },
    ],
  },
  "burglar-alarm": {
    name: "Burglar Alarm Systems",
    shortName: "a burglar alarm",
    description:
      "Burglar alarm installation in Erode, Salem and Coimbatore. Door, window and motion sensors with sirens and phone alerts. Free site survey.",
    useCases: [
      { title: "Homes", desc: "Door, window and motion sensors guard every entry point." },
      { title: "Shops & showrooms", desc: "A loud siren deters intruders after hours." },
      { title: "Offices", desc: "Arm and disarm from the keypad or your phone." },
    ],
    faqs: [
      {
        q: "How does a burglar alarm work?",
        a: "Door and window contacts and infrared motion detectors sense unauthorised entry. The system then sounds a loud siren and sends real-time alerts to your phone.",
      },
      {
        q: "What is a panic button?",
        a: "A panic button lets you raise an alert instantly in an emergency, adding an extra layer of safety.",
      },
      {
        q: "Can I control the alarm from my phone?",
        a: "Yes. You can arm, disarm and monitor the system through a mobile app or web platform and get alerts in real time.",
      },
    ],
  },
  "gate-automation": {
    name: "Automatic Gate Systems",
    shortName: "gate automation",
    description:
      "Automatic gate installation in Erode, Salem and Coimbatore. Open your gate by remote or phone, with safety sensors. Free site survey.",
    useCases: [
      { title: "Homes & villas", desc: "Open the gate from your car with a remote or your phone." },
      { title: "Apartments & gated communities", desc: "Key fobs, cards or biometrics for residents." },
      { title: "Commercial premises", desc: "Scheduled opening and closing for staff and deliveries." },
    ],
    faqs: [
      {
        q: "How do I open an automatic gate?",
        a: "With a remote control, your smartphone or a keypad, so you can let people in without leaving your vehicle.",
      },
      {
        q: "Is an automatic gate safe?",
        a: "Yes. Safety sensors such as photoelectric beams detect obstacles and stop the gate before it closes, preventing injuries or damage.",
      },
      {
        q: "Can the gate open and close at fixed times?",
        a: "Yes. Gates can be programmed to open or close at set times, which makes managing access easier.",
      },
    ],
  },
  "boom-barriers": {
    name: "Automatic Boom Barriers",
    shortName: "a boom barrier",
    description:
      "Automatic boom barrier installation for parking lots, toll booths and secure sites across Tamil Nadu. Remote and card control. Free site survey.",
    included: [
      "Site survey & lane planning: We check the entry width, traffic flow and power point to choose the right boom length.",
      "Barrier installation: Mounting of the barrier cabinet and boom arm, built for heavy use and all weather.",
      "Access setup: Remote controls, access cards or integration with your CCTV and security system.",
      "Safety checks & testing: Obstacle sensors are set up and every opening and closing cycle is tested.",
    ],
    useCases: [
      { title: "Parking lots", desc: "Control which vehicles enter and leave." },
      { title: "Toll booths", desc: "Fast opening and closing keeps traffic moving." },
      { title: "Secure facilities", desc: "Regulate vehicle entry at gates and checkpoints." },
    ],
    faqs: [
      {
        q: "What is a boom barrier?",
        a: "A boom barrier is a gate with a horizontal arm that raises and lowers to allow or stop vehicles at entry and exit points.",
      },
      {
        q: "How is a boom barrier operated?",
        a: "By remote control or access cards, or automatically when it is linked to your security system.",
      },
      {
        q: "Can a boom barrier work with CCTV?",
        a: "Yes. Boom barriers can be combined with surveillance cameras, intercoms and other security systems for better monitoring and control.",
      },
    ],
  },
  "access-control": {
    name: "Biometric Access Control",
    shortName: "access control",
    description:
      "Biometric access control in Erode, Salem and Coimbatore. Fingerprint, face, card and PIN entry with full audit logs. Free site survey.",
    included: [
      "Site survey & door planning: We map every door, gate and sensitive area that needs controlled entry.",
      "Reader & lock installation: Card, fingerprint, face or PIN readers fitted with electric locks.",
      "Users & permissions setup: Staff are added with access levels and schedules on the central platform.",
      "Handover & training: We show your team how to add users and check the audit trail.",
    ],
    useCases: [
      { title: "Offices", desc: "Control who can enter which rooms, and when." },
      { title: "Factories & warehouses", desc: "Log every entry and exit at gates and stores." },
      { title: "Sensitive rooms", desc: "Restrict server rooms and records to authorised staff." },
    ],
    faqs: [
      {
        q: "What is an access control system?",
        a: "An access control system manages who can enter or leave certain areas of a building, so only authorised people get through doors, gates and other entry points.",
      },
      {
        q: "How can people unlock a door?",
        a: "With a key card or fob, fingerprint or face recognition, a PIN code, or a smartphone app.",
      },
      {
        q: "Can I see who entered and when?",
        a: "Yes. Audit trails record who entered and left each area and when, which helps with security checks and investigations.",
      },
    ],
  },
  "video-door-phone": {
    name: "Video Door Phones",
    shortName: "a video door phone",
    description:
      "Video door phone installation in Erode, Salem and Coimbatore. See and talk to visitors and unlock the door from your phone. Free site survey.",
    included: [
      "Site survey: We choose the best spot for the outdoor unit and the indoor monitor.",
      "Outdoor & indoor unit installation: Camera unit at the entrance and a screen inside your home or office.",
      "Mobile app setup: See, talk to visitors and unlock the door from your phone.",
      "Door lock connection & testing: Electric lock or gate connected and tested by day and night.",
    ],
    useCases: [
      { title: "Homes & villas", desc: "See and speak to visitors before you open the door." },
      { title: "Apartments", desc: "Check who is at the gate from inside your flat." },
      { title: "Offices", desc: "Screen visitors at reception or the main entrance." },
    ],
    faqs: [
      {
        q: "What is a video door phone?",
        a: "A video door phone lets you see and talk to a visitor at the door using audio and video. The outdoor unit has a camera, microphone and speaker, and the indoor unit has a screen.",
      },
      {
        q: "Can I answer the door from my phone?",
        a: "Yes. Remote access lets you see and talk to visitors from anywhere using a mobile app, and unlock electronic doors remotely.",
      },
      {
        q: "Does it work at night?",
        a: "Yes. Infrared night vision lets you see visitors clearly in low light.",
      },
    ],
  },
  "nurse-calling": {
    name: "Nurse Call Systems",
    shortName: "a nurse call system",
    description:
      "Nurse call system installation for hospitals, clinics and care homes across Tamil Nadu. Bed call buttons, panels and alerts. Free site survey.",
    included: [
      "Ward survey & layout planning: We plan call points for every bed, restroom and corridor.",
      "Call buttons & indicator lights: Patient call buttons with lights above each room door.",
      "Nurse station panel setup: The panel shows which room and patient needs help.",
      "Testing & staff training: Every call point is tested and nurses are shown how to respond.",
    ],
    useCases: [
      { title: "Hospitals", desc: "Patients can call for help from the bed or restroom." },
      { title: "Clinics", desc: "Staff see instantly which room needs attention." },
      { title: "Care facilities", desc: "Residents can reach a carer whenever they need to." },
    ],
    faqs: [
      {
        q: "What is a nurse call system?",
        a: "A nurse call system lets patients in hospitals, clinics and care facilities alert nursing staff when they need help.",
      },
      {
        q: "How does a nurse know which patient called?",
        a: "The nurse call panel shows the location and identity of the patient, and a light above the door shows which room needs attention.",
      },
      {
        q: "Can nurses get alerts on their phones?",
        a: "Yes. Mobile app integration sends smartphone alerts, so nurses can respond even when they are away from the station.",
      },
    ],
  },
  intercom: {
    name: "Intercom Phone Systems",
    shortName: "an intercom system",
    description:
      "Intercom phone systems for offices, hospitals, schools, hotels and apartments across Tamil Nadu. Direct calling and paging. Free site survey.",
    included: [
      "Site survey & extension planning: We map rooms and departments that need an extension.",
      "Intercom units & wiring: Phones installed in each room, department or gatehouse.",
      "Extension programming: Direct calling, paging and broadcast groups set up for your team.",
      "Testing & training: Every extension is tested and your staff are shown how to use it.",
    ],
    useCases: [
      { title: "Offices", desc: "Connect departments for smoother coordination." },
      { title: "Hospitals", desc: "Staff reach different areas of the facility quickly." },
      { title: "Schools", desc: "Link classrooms with the administrative office." },
      { title: "Residential complexes", desc: "Residents talk to security and management." },
      { title: "Hotels", desc: "Staff and departments stay in touch to serve guests." },
    ],
    faqs: [
      {
        q: "What is an intercom phone system?",
        a: "An intercom phone system combines intercoms with phone features, so people can talk to each other within a building or across buildings.",
      },
      {
        q: "Do intercom calls need an outside phone line?",
        a: "No. Extensions and intercom units call each other directly without using external phone lines.",
      },
      {
        q: "Can I make announcements to the whole building?",
        a: "Yes. Paging and broadcasting let you make announcements to all stations or to selected groups, which is useful in emergencies.",
      },
    ],
  },
};

export const serviceSeoName = (id: string, fallback: string) => SERVICE_SEO[id]?.name ?? fallback;
