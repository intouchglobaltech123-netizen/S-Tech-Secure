export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  icon: string;
  badge: string;
  overview: string;
  secondaryText?: string;
  keyFeatures: {
    title: string;
    description: string;
  }[];
  whatsIncluded: string[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  brochureUrl: string;
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: "cctv",
    slug: "cctv-systems",
    title: "CCTV",
    eyebrow: "Closed–Circuit Television",
    tagline: "High-definition surveillance systems with real-time mobile monitoring and motion alerts.",
    icon: "📹",
    badge: "SURVEILLANCE",
    overview:
      "A Closed–Circuit Television (CCTV) system transmits live video footage to designated monitors and mobile devices, providing round-the-clock security and peace of mind for homes and businesses.",
    secondaryText:
      "Reliable 24/7 surveillance with sharp night vision, instant mobile alerts, and zero monthly subscription fees.",
    keyFeatures: [
      {
        title: "High-Resolution Imaging",
        description: "Clear HD & 4K video for easy facial recognition and vehicle license plate identification.",
      },
      {
        title: "Real-Time Monitoring",
        description: "Live video feeds streamed directly to your monitors and smartphones with low latency.",
      },
      {
        title: "Remote Mobile Access",
        description: "Watch live feeds and playback recordings anytime on iOS, Android, and PC with zero monthly fees.",
      },
      {
        title: "Smart Motion Detection",
        description: "AI sensors detect human and vehicle movement, sending instant alerts while filtering false alarms.",
      },
      {
        title: "Weatherproof Durability",
        description: "Rugged IP67 metal housing built to endure heavy monsoon rain, extreme heat, and dust.",
      },
      {
        title: "Flexible Storage",
        description: "Dedicated surveillance hard drives store 15 to 60 days of continuous recording with auto-looping.",
      },
    ],
    whatsIncluded: [
      "On-Site Survey & Assessment: Property evaluation to identify optimal camera angles and eliminate blind spots.",
      "High-Definition Camera Installation: Weatherproof mounting, concealed cabling, and precision lens focusing.",
      "Remote Monitoring Setup: Simple smartphone and tablet app configuration for live remote viewing.",
      "DVR/NVR Configuration & Training: Setting up recording schedules and hands-on guidance to retrieve footage.",
    ],
    faqs: [
      {
        question: "On-Site Survey & Assessment",
        answer:
          "Our experts will visit your property to assess security requirements and identify optimal camera locations for maximum coverage and effectiveness.",
      },
      {
        question: "High-Definition CCTV Camera Installation",
        answer:
          "We provide and install full HD/4K surveillance cameras with night vision, weatherproof design, and wide-angle lenses for both indoor and outdoor areas.",
      },
      {
        question: "Remote Monitoring Setup",
        answer:
          "Access your CCTV feed live from your mobile device or desktop using our secure cloud-based remote viewing system, from anywhere at any time.",
      },
      {
        question: "DVR/NVR Configuration & Training",
        answer:
          "Our team configures your DVR or NVR system with optimal settings and provides hands-on training to ensure you can easily review and retrieve recordings.",
      },
    ],
    brochureUrl: "/stec-secure-brochure.pdf",
  },
  {
    id: "home-automation",
    slug: "home-automation",
    title: "Home Automation",
    eyebrow: "Smarter Living, Everyday",
    tagline: "Intelligent Living Powered by Seamless Connected IoT",
    icon: "🏠",
    badge: "SMART IOT",
    overview:
      "Home Automation refers to the integration of technology into residential spaces to enhance convenience, security, and energy efficiency. Through smart devices and systems, homeowners can control various aspects of their homes remotely or through automated schedules.",
    secondaryText:
      "Smarter Living, Everyday: Home automation transforms regular homes into smart, connected spaces with easy control over lighting, security, climate, and appliances. From remote access to automated routines, it brings greater convenience, energy efficiency, and peace of mind — all powered by intelligent technology.",
    keyFeatures: [
      {
        title: "Smart Lighting",
        description: "Control lighting levels, colors, and schedules through smartphones or voice commands, enhancing ambiance and saving energy.",
      },
      {
        title: "Climate Control",
        description: "Smart thermostats adjust heating and cooling based on user preferences and occupancy, optimizing comfort and energy use.",
      },
      {
        title: "Security Systems",
        description: "Integrate smart locks, cameras, and motion sensors to monitor and secure the home, providing alerts and remote access.",
      },
      {
        title: "Home Appliances",
        description: "Automate and remotely manage appliances like air conditioners, geysers, and entertainment systems for improved efficiency and convenience.",
      },
      {
        title: "Voice Control",
        description: "Use virtual assistants (like Amazon Alexa or Google Assistant) to control devices hands-free, simplifying daily tasks.",
      },
      {
        title: "Energy Management",
        description: "Monitor energy consumption in real-time, allowing homeowners to make informed decisions about usage and utility savings.",
      },
    ],
    whatsIncluded: [
      "Smart Lighting System Setup: Install and configure smart lighting solutions that adapt to your lifestyle and can be controlled via smartphone or voice.",
      "Climate & Thermostat Integration: Automated control of temperature settings to ensure optimal comfort and energy savings with smart thermostats.",
      "Smart Security Integration: Setup of smart locks, sensors, and surveillance cameras with remote access and real-time alerts.",
      "Voice Assistant Configuration: Connect your system with voice assistants like Alexa or Google Assistant for seamless voice control of your home.",
    ],
    faqs: [
      {
        question: "Can I automate an existing home without rewiring?",
        answer: "Yes, our modular retrofit touch switches fit directly into standard electrical gang boxes without damaging your walls or requiring new wiring.",
      },
      {
        question: "What happens if the internet goes down?",
        answer: "All physical touch switches and local RF/Zigbee automations continue working normally even if your home Wi-Fi is temporarily offline.",
      },
    ],
    brochureUrl: "/stec-secure-brochure.pdf",
  },
  {
    id: "burglar-alarm",
    slug: "burglar-alarm-systems",
    title: "Burglar Alarm Systems",
    eyebrow: "Protect What Matters",
    tagline: "Specialized Security Solutions to Detect Unauthorized Entry & Prevent Theft",
    icon: "🚨",
    badge: "INTRUSION SHIELD",
    overview:
      "Burglar Alarm Systems are specialized security solutions designed to detect unauthorized entry and prevent theft or vandalism in residential and commercial properties. These systems use various sensors and technologies to provide real-time alerts and enhance overall security.",
    secondaryText:
      "Protect What Matters with Burglar Alarm Systems: Our advanced burglar alarm systems are designed to safeguard your home and loved ones around the clock. Featuring motion sensors, door/window contacts, and real-time alerts, these systems detect unauthorized access the moment it happens. Integrated with your smart devices, you stay informed and in control—whether you're at home or away. Enjoy enhanced security, instant notifications, and total peace of mind.",
    keyFeatures: [
      {
        title: "Intrusion Sensors (Door & Window Contacts)",
        description: "Trigger loud alarms and instant alerts when doors or windows are opened unexpectedly.",
      },
      {
        title: "Motion Detectors",
        description: "Use dual-technology infrared technology to sense movement within designated zones while filtering pet movements.",
      },
      {
        title: "Keypad and Control Panel",
        description: "Central hub for arming and disarming the system, featuring user-friendly interfaces, PIN codes, and RFID fobs.",
      },
      {
        title: "Panic Buttons",
        description: "Allow users to quickly alert authorities and family in emergencies, providing an essential layer of personal safety.",
      },
      {
        title: "Remote Access and Monitoring",
        description: "Users can control and monitor the system via mobile apps, receiving real-time push notifications and GSM SMS alerts.",
      },
      {
        title: "Audible Alarms",
        description: "Loud 110dB sirens sound during a perimeter breach, instantly deterring intruders and alerting nearby security.",
      },
      {
        title: "24/7 Monitoring Services",
        description: "Professional auto-dialer connectivity contacts up to 5 predefined phone numbers immediately upon breach detection.",
      },
    ],
    whatsIncluded: [
      "Door & Window Sensors Installation: We install magnetic contact sensors at key entry points to detect unauthorized access and instantly trigger the alarm system.",
      "Motion Detector Setup: Calibration of dual-technology infrared motion sensors across hallways and perimeters with pet-immunity.",
      "Central Control Panel Configuration: Central hub setup with battery backup, 110dB siren module, and user keypads.",
      "Remote Monitoring & Mobile Alerts: GSM cellular emergency calling and real-time SMS alerts to up to 5 family phones.",
    ],
    faqs: [
      {
        question: "Door & Window Sensors Installation",
        answer:
          "We install magnetic contact sensors at key entry points to detect unauthorized access and instantly trigger the alarm system.",
      },
      {
        question: "Motion Detector Setup",
        answer:
          "We install and calibrate dual-technology infrared motion sensors in key hallways, living spaces, and perimeters to detect unauthorized movement while filtering out household pets.",
      },
      {
        question: "Central Control Panel Configuration",
        answer:
          "Our team configures your central alarm control hub with backup power, loud 110dB siren integration, tamper detection, and customized arm/disarm keypad PINs.",
      },
      {
        question: "Remote Monitoring & Mobile Alerts",
        answer:
          "We configure automated GSM emergency dialing and SMS push notifications so up to 5 family members receive instant calls and alerts the second an intrusion is detected.",
      },
    ],
    brochureUrl: "/stec-secure-brochure.pdf",
  },
  {
    id: "gate-automation",
    slug: "gate-automation",
    title: "Gate Automation",
    eyebrow: "Access & Perimeter Security",
    tagline: "Remote Controlled Automated Gate Motors for Safety & Privacy",
    icon: "⛩️",
    badge: "GATE AUTOMATION",
    overview:
      "Gate Automation refers to the use of technology to control the opening and closing of gates, enhancing security and convenience for residential and commercial properties. Automated gates can be operated remotely, providing seamless access while ensuring safety and privacy.",
    secondaryText:
      "Gate automation systems offer a perfect blend of security and convenience, making them an essential addition to modern property management. Enjoy effortless gate control right from your car or smartphone without stepping into the rain or heat.",
    keyFeatures: [
      {
        title: "Remote Access Control",
        description: "Operate gates via remote controls, smartphones, or keypads, allowing users to grant access without leaving their vehicles.",
      },
      {
        title: "Safety Sensors",
        description: "Equipped with safety mechanisms to prevent injuries or damage, such as photoelectric sensors that detect obstacles before closing.",
      },
      {
        title: "Intercom Systems",
        description: "Integrated intercoms allow communication with visitors at the gate, providing an additional layer of security before granting access.",
      },
      {
        title: "Access Control Options",
        description: "Supports various access methods, including key fobs, RFID cards, or biometric scanners for enhanced property security.",
      },
      {
        title: "Automated Timing",
        description: "Gates can be programmed to open or close at specific times, enhancing convenience and managing scheduled access.",
      },
      {
        title: "Durability",
        description: "Built with heavy-duty oil-bath gearboxes to withstand harsh weather conditions, ensuring reliable operation in all environments.",
      },
    ],
    whatsIncluded: [
      "Swing / Sliding Gate Motor Setup: Installation of motor systems for swing or sliding gates, tailored to your gate type and size.",
      "Remote & Mobile App Integration: Setup of encrypted RF handheld remote controls and smartphone app integration for convenient gate operation from anywhere.",
      "Safety Sensor Configuration: Installation of dual infrared photoelectric safety sensors to prevent gate contact with vehicles or pedestrians.",
      "Intercom & Access Control Integration: Integration with video door phones, numeric keypads, and RFID systems for seamless visitor entry.",
    ],
    faqs: [
      {
        question: "Swing / Sliding Gate Motor Setup",
        answer:
          "Installation of motor systems for swing or sliding gates, tailored to your gate type and size.",
      },
      {
        question: "Remote & Mobile App Integration",
        answer:
          "Setup of encrypted RF handheld remote controls and smartphone app integration for convenient gate operation from anywhere.",
      },
      {
        question: "Safety Sensor Configuration",
        answer:
          "Installation of dual infrared photoelectric safety beam sensors to detect vehicles, pets, and pedestrians, automatically stopping and reversing the gate to prevent accidents.",
      },
      {
        question: "Intercom & Access Control Integration",
        answer:
          "Integration with video door phones, RFID card readers, and wireless keypad switches to allow easy visitor screening and 1-tap remote unlocking.",
      },
    ],
    brochureUrl: "/stec-secure-brochure.pdf",
  },
  {
    id: "boom-barriers",
    slug: "boom-barriers",
    title: "Boom Barriers",
    eyebrow: "Vehicle Traffic Management",
    tagline: "Automatic Boom Barrier Gate Systems for Regulated Vehicle Entry",
    icon: "🚧",
    badge: "VEHICLE CONTROL",
    overview:
      "Boom barriers are automatic gate systems used to regulate vehicle access in parking areas, gated communities, toll booths, and commercial complexes across Erode and nearby regions. These barriers ensure controlled entry, improved security, and hassle-free traffic management.",
    secondaryText:
      "Boom barriers are essential for controlling vehicle access and enhancing security at various locations, offering a practical and efficient solution for property management.",
    keyFeatures: [
      {
        title: "Robust Construction",
        description: "Made from durable, weather-resistant materials to withstand heavy cyclic use and harsh outdoor conditions.",
      },
      {
        title: "Automatic Operation",
        description: "Can be operated via remote control, access cards, push buttons, or integrated with security systems for automated functionality.",
      },
      {
        title: "Security Systems Integration",
        description: "Integrate with surveillance cameras, RFID tags, and ANPR license plate recognition for automated authorized vehicle entry.",
      },
      {
        title: "Safety Features",
        description: "Equipped with pneumatic pressure sensors and optical safety loop detectors to prevent accidents during boom arm lowering.",
      },
      {
        title: "Quick Response Time",
        description: "Designed for fast opening and closing (1.5 to 3 seconds), facilitating smooth and efficient traffic flow.",
      },
      {
        title: "Customizable Length",
        description: "Booms come in various lengths (3m to 6m, telescopic or articulated) to accommodate different widths of driveways or entry points.",
      },
    ],
    whatsIncluded: [
      "Where Are Boom Barriers Commonly Used?: Widely used in parking lots, gated communities, toll plazas, industrial areas, and commercial premises to control vehicle access.",
      "How Do Automatic Boom Barriers Work?: Powered by high-torque electric motors with rapid 1.5–3s opening and automatic safety loop lowering.",
      "Can Boom Barriers Be Integrated With CCTV And Access Control?: Seamless integration with long-range RFID, ANPR license plate cameras, and guard push buttons.",
      "What Are The Maintenance Requirements?: Engineered for 100% duty cycle reliability with simple seasonal lubrication and sensor checkups.",
    ],
    faqs: [
      {
        question: "Where Are Boom Barriers Commonly Used?",
        answer:
          "Boom barriers are widely used in parking lots, gated communities, toll plazas, industrial areas, and commercial premises to control and monitor vehicle access efficiently.",
      },
      {
        question: "How Do Automatic Boom Barriers Work?",
        answer:
          "Automatic boom barriers use a high-torque electric motor and gearbox connected to a counterbalanced arm. When triggered by a remote control, push button, RFID tag, or loop sensor, the arm lifts in 1.5 to 3 seconds to allow authorized passage and lowers automatically once the vehicle clears.",
      },
      {
        question: "Can Boom Barriers Be Integrated With CCTV And Access Control?",
        answer:
          "Yes, boom barriers can be seamlessly integrated with ANPR automatic number plate recognition cameras, FASTag / RFID long-range vehicle readers, biometric scanners, and security guardhouse push buttons.",
      },
      {
        question: "What Are The Maintenance Requirements?",
        answer:
          "Boom barriers require minimal routine maintenance—mainly periodic optical sensor dusting, checking arm balance springs, and inspecting gearbox oil levels every 6 to 12 months for 100% duty cycle reliability.",
      },
    ],
    brochureUrl: "/stec-secure-brochure.pdf",
  },
  {
    id: "access-control",
    slug: "access-control-system",
    title: "Access Control System",
    eyebrow: "Physical Access Regulation",
    tagline: "Manage & Regulate Physical Entry to Sensitive Facilities with Audit Logs",
    icon: "🪪",
    badge: "ACCESS CONTROL",
    overview:
      "An Access Control System is a security solution that manages and regulates who can enter or exit certain areas within a building or facility. It is designed to enhance security by controlling physical access to doors, gates, or other entry points, ensuring only authorized individuals can gain entry.",
    secondaryText:
      "Access control systems provide comprehensive physical security, eliminating the vulnerabilities of traditional brass keys and maintaining an immutable audit log of every movement across your premises.",
    keyFeatures: [
      {
        title: "Key Cards / RFID Fobs",
        description: "Users swipe or tap a contactless card or key fob on a reader to gain instant authorized entry.",
      },
      {
        title: "Biometric Systems",
        description: "Uses fingerprints, facial recognition, or retina verification for foolproof identity authentication.",
      },
      {
        title: "PIN Codes",
        description: "Users enter a personal identification number on a vandal-resistant digital keypad.",
      },
      {
        title: "Mobile Access",
        description: "Uses smartphone apps via Bluetooth BLE or NFC for seamless digital key credentials.",
      },
      {
        title: "Centralized Control",
        description: "Managed via a central platform that allows administrators to set user permissions, manage entry schedules, and monitor access in real-time.",
      },
      {
        title: "Audit Trails",
        description: "Provides detailed logs showing who entered and exited certain areas and when, crucial for compliance, security audits, and incident investigations.",
      },
    ],
    whatsIncluded: [
      "What Types Of Access Control Systems Are Available?: RFID card access, biometric fingerprint & facial recognition, digital PINs, and mobile app smart access.",
      "Can Access Control Systems Be Integrated With CCTV?: Seamless integration with cameras to link entry logs with real-time video snapshots.",
      "Is Remote Access Management Possible?: Cloud and web-based management to grant permissions, schedule timings, and review live logs.",
      "How Secure And Scalable Are Your Access Control Solutions?: Encrypted controllers and fail-secure electromagnetic locks scalable from 1 door to multi-building sites.",
    ],
    faqs: [
      {
        question: "What Types Of Access Control Systems Are Available?",
        answer:
          "We offer a range of systems including RFID-based card access, biometric access using fingerprints or facial recognition, PIN-based systems, and mobile app-enabled smart access for both commercial and residential use.",
      },
      {
        question: "Can Access Control Systems Be Integrated With CCTV?",
        answer:
          "Yes, our access control systems seamlessly integrate with CCTV surveillance cameras to trigger automatic video snapshots and bookmarks whenever a door is opened or an unauthorized entry is attempted.",
      },
      {
        question: "Is Remote Access Management Possible?",
        answer:
          "Yes, administrators can manage user credentials, unlock doors remotely, schedule automatic lock/unlock times, and view real-time entry logs from any web browser or mobile application.",
      },
      {
        question: "How Secure And Scalable Are Your Access Control Solutions?",
        answer:
          "Our solutions utilize encrypted communication protocols, tamper-resistant hardware, and battery-backed electromagnetic locks. They easily scale from a single glass office door to enterprise campuses with hundreds of access points across multiple facilities.",
      },
    ],
    brochureUrl: "/stec-secure-brochure.pdf",
  },
  {
    id: "video-door-phone",
    slug: "video-door-phone",
    title: "Video Door Phone",
    eyebrow: "Entry Communication",
    tagline: "Two-Way Audio & Video Communication with Remote Door Unlocking",
    icon: "🚪",
    badge: "VIDEO INTERCOM",
    overview:
      "A Video Door Phone is a security device that allows two-way communication between a visitor at the door and the homeowner or building occupant through both audio and video. It enhances home security by allowing users to see and speak to visitors before granting entry.",
    secondaryText:
      "Outdoor Unit: Mounted at the entrance, this unit has a camera, microphone, and speaker to capture video of the visitor and enable two-way conversation with night vision. Indoor Unit: Installed inside the home, it features a color touch monitor to view visitors, speak, record snapshots, and trigger remote gate unlocks.",
    keyFeatures: [
      {
        title: "HD Camera Resolution",
        description: "Provides clear, high-definition video for easy identification of visitors, ensuring precise facial recognition.",
      },
      {
        title: "Night Vision",
        description: "Enables visibility in low-light conditions with infrared LEDs, allowing users to see visitors clearly even at night.",
      },
      {
        title: "Two-Way Audio",
        description: "Allows real-time, hands-free communication between indoor and outdoor units, with noise cancellation for clear sound.",
      },
      {
        title: "Remote Access",
        description: "Lets users monitor and interact with visitors from anywhere using a mobile app, enhancing convenience and control.",
      },
      {
        title: "Motion Detection and Alerts",
        description: "Sends real-time notifications of movement at the door, helping users stay aware of unexpected activity.",
      },
      {
        title: "Door Unlocking Function",
        description: "Provides remote unlocking for electronic doors and motorized gates, allowing controlled access for guests or service providers.",
      },
    ],
    whatsIncluded: [
      "What Is A Video Door Phone System?: Two-way audio and visual communication between resident and visitor before granting entry.",
      "Can I Unlock The Door Remotely Using This System?: 1-tap electric door strike and automated gate unlocking from indoor screen or smartphone.",
      "Does It Work At Night?: High-definition camera with infrared night vision LEDs for clear visibility in total darkness.",
      "Is Mobile Access Available?: Simultaneous ringing on indoor monitor and mobile app with encrypted remote answering.",
    ],
    faqs: [
      {
        question: "What Is A Video Door Phone System?",
        answer:
          "A video door phone system allows two-way audio and visual communication between a resident and a visitor before granting access. It ensures improved entry control and security for homes and businesses.",
      },
      {
        question: "Can I Unlock The Door Remotely Using This System?",
        answer:
          "Yes, you can unlock electronic door strikes, magnetic locks, or motorized main gates directly from your indoor touchscreen monitor or from anywhere using your smartphone app.",
      },
      {
        question: "Does It Work At Night?",
        answer:
          "Yes, our video door phone outdoor stations are equipped with built-in infrared night vision LEDs and low-light sensors to provide crystal-clear live video of callers even in total darkness.",
      },
      {
        question: "Is Mobile Access Available?",
        answer:
          "Yes, whenever a visitor presses the outdoor doorbell, the call rings simultaneously on your indoor wall screen and your smartphone app, allowing you to see, speak, and unlock the door remotely over 4G/5G or Wi-Fi.",
      },
    ],
    brochureUrl: "/stec-secure-brochure.pdf",
  },
  {
    id: "nurse-calling",
    slug: "nurse-calling-system",
    title: "Nurse Calling System",
    eyebrow: "Healthcare Emergency Response",
    tagline: "Essential Hospital-Grade Communication for Prompt Patient Care",
    icon: "🏥",
    badge: "HEALTHCARE",
    overview:
      "A Nurse Calling System is an essential communication tool in hospitals, clinics, and care facilities that allows patients to alert nursing staff when they need assistance. Immediate communication ensures prompt care, prioritized response, and peace of mind.",
    secondaryText:
      "Benefits: Immediate communication helps ensure that patients receive prompt care when needed. Nurses can prioritize calls based on urgency, improving response time and resource allocation. Patients feel reassured knowing they can easily reach a nurse when necessary. Advanced features include smartphone alerts that allow nurses to respond quickly, even when away from the station.",
    keyFeatures: [
      {
        title: "Patient Call Button",
        description: "A button or device located near the patient’s bed or in the restroom. When pressed, it sends a signal indicating that the patient needs help.",
      },
      {
        title: "Nurse Call Panel",
        description: "A central control panel or display at the nurses’ station that shows the location and identity of the patient who has initiated a call.",
      },
      {
        title: "Notification System",
        description: "Visual or audible alerts ensure nurses are aware of calls, with some systems also sending notifications to their mobile devices or pagers.",
      },
      {
        title: "Intercom Functionality",
        description: "Enables two-way communication between the patient and the nursing staff so the nurse can determine the patient’s needs before arriving at the room.",
      },
      {
        title: "Indicator Lights",
        description: "Lights above the patient’s door that illuminate when a call is active, helping nurses quickly identify which room needs attention.",
      },
      {
        title: "Emergency Call Buttons",
        description: "Additional emergency buttons in critical areas, such as restrooms or hallways, to ensure patient safety outside of the main bed area.",
      },
    ],
    whatsIncluded: [
      "What Is A Nurse Calling System?: Communication solution enabling hospital patients to alert nursing staff via bedside and pull buttons.",
      "Where Are Nurse Call Buttons Typically Installed?: Bedsides, patient restrooms, ICU recovery units, and emergency corridors.",
      "Can Nurses Respond Remotely Or Receive Mobile Alerts?: Direct call notifications to mobile handsets and wearable pagers for instant two-way response.",
      "Are These Systems Scalable For Large Hospitals?: Modular architecture scaling from 10-bed clinics to 500+ bed hospital campuses.",
    ],
    faqs: [
      {
        question: "What Is A Nurse Calling System?",
        answer:
          "A nurse calling system is a communication solution used in hospitals and care facilities, enabling patients to alert nurses when assistance is needed using call buttons and alert indicators.",
      },
      {
        question: "Where Are Nurse Call Buttons Typically Installed?",
        answer:
          "Nurse call buttons are installed at patient bedsides, inside patient restrooms and showers, in ICU/recovery bays, and along emergency hospital corridors.",
      },
      {
        question: "Can Nurses Respond Remotely Or Receive Mobile Alerts?",
        answer:
          "Yes, advanced systems route call signals directly to on-duty nurses' smartphones, DECT handsets, or wearable pagers, enabling instant two-way voice communication from anywhere in the ward.",
      },
      {
        question: "Are These Systems Scalable For Large Hospitals?",
        answer:
          "Yes, our modular bus and IP nurse call architectures scale seamlessly from 10-bed specialty clinics to 500+ bed multi-wing medical hospitals with central operator software.",
      },
    ],
    brochureUrl: "/stec-secure-brochure.pdf",
  },
  {
    id: "intercom",
    slug: "intercom-phone-system",
    title: "Intercom Phone System",
    eyebrow: "Internal Voice Architecture",
    tagline: "Seamless Voice Communication for Offices, Hospitals, Schools & Residences",
    icon: "📞",
    badge: "COMMUNICATIONS",
    overview:
      "An Intercom Phone System is a type of internal communication system that combines the functions of traditional intercoms with phone capabilities, allowing for seamless voice communication within a building or network of buildings. These systems are widely used in offices, schools, hospitals, and residential complexes to facilitate internal communication and improve efficiency.",
    secondaryText:
      "This communication tool is essential for facilities looking to improve accessibility, strengthen security, and streamline interactions within their space. Facilitates coordination across corporate departments, connects security gatehouses with resident apartments, and allows broadcast paging.",
    keyFeatures: [
      {
        title: "Two-Way Communication",
        description: "Allows users to initiate and receive calls between different extensions or intercom units without using external phone lines.",
      },
      {
        title: "Direct Calling",
        description: "Each room or department can be assigned an extension, making it easy to call specific locations.",
      },
      {
        title: "Hands-Free Operation",
        description: "Many systems offer hands-free communication for convenience and safety, especially useful in medical or industrial environments.",
      },
      {
        title: "Paging and Broadcasting",
        description: "Provides the ability to make announcements to all or specific groups of intercom stations at once, useful for emergencies or general announcements.",
      },
      {
        title: "Multiple Lines and Extensions",
        description: "Systems can support multiple lines to manage high call volumes and allow for flexible internal communication.",
      },
    ],
    whatsIncluded: [
      "What Is An Intercom Phone System?: Enables internal voice communication within a building through connected intercom units or extensions.",
      "Where Are Intercom Systems Typically Used?: Corporate offices, security gatehouses, apartment complexes, hospitals, and schools.",
      "Can Intercom Systems Be Integrated With Security Systems?: Direct integration to verify visitors and trigger motorized gate locks from handsets.",
      "Do You Provide Installation And Maintenance In Erode?: End-to-end installation, extension programming, and annual AMC maintenance.",
    ],
    faqs: [
      {
        question: "What Is An Intercom Phone System?",
        answer:
          "An intercom phone system enables internal voice communication within a building or facility, allowing users to call and speak with each other through connected intercom units or extensions.",
      },
      {
        question: "Where Are Intercom Systems Typically Used?",
        answer:
          "Corporate offices, security gatehouses, apartment complexes, hospitals, schools, and warehouse facilities.",
      },
      {
        question: "Can Intercom Systems Be Integrated With Security Systems?",
        answer:
          "Yes, guards can verify visitors with residents and trigger gate locks directly from their intercom handset.",
      },
      {
        question: "Do You Provide Installation And Maintenance In Erode?",
        answer:
          "Yes, we provide end-to-end installation, extension programming, and on-site annual maintenance across Erode and surrounding districts.",
      },
    ],
    brochureUrl: "/stec-secure-brochure.pdf",
  },
];

export const COMPANY_CONTACT = {
  phone: "+91 96 00 25 26 05",
  phoneRaw: "919600252605",
  email: "info@stecsecure.com",
  address: "S TEC SECURE, Erode, Tamil Nadu, India",
  brochurePdf: "/stec-secure-brochure.pdf",
};
