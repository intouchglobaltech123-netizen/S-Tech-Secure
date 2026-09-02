import {
  Camera,
  Cctv,
  Cpu,
  Radar,
  ShieldCheck,
  Wifi,
  Building2,
  Factory,
  Home,
  ShoppingBag,
  GraduationCap,
  Warehouse,
  Fingerprint,
  Server,
  MonitorPlay,
  Bell,
} from "lucide-react";

export const heroCameras = [
  { id: "cam-01", code: "CAM 01", label: "Outdoor Bullet", type: "bullet" as const },
  { id: "cam-02", code: "CAM 02", label: "AI Dome", type: "dome" as const },
  { id: "cam-03", code: "CAM 03", label: "PTZ Tracking", type: "ptz" as const },
  { id: "cam-04", code: "CAM 04", label: "Color Night Vision", type: "bullet" as const },
  { id: "cam-05", code: "CAM 05", label: "ANPR / Entry Lane", type: "ptz" as const },
  { id: "cam-06", code: "CAM 06", label: "Indoor Dome", type: "dome" as const },
];

export const solutions = [
  {
    icon: Cctv,
    title: "CCTV & IP Surveillance",
    copy: "Site-surveyed camera layouts using bullet, dome and PTZ hardware, wired on structured cabling with PoE switching.",
  },
  {
    icon: Cpu,
    title: "AI Video Analytics",
    copy: "Human and vehicle detection, line crossing and intrusion zones configured on supported recorders and cameras.",
  },
  {
    icon: Wifi,
    title: "Wireless & Wi-Fi Systems",
    copy: "Wi-Fi and wireless camera setups for locations where trenching or cable runs are not practical.",
  },
  {
    icon: Fingerprint,
    title: "Access Control & Biometrics",
    copy: "Door access, biometric attendance and video door phones integrated with your surveillance network.",
  },
  {
    icon: Radar,
    title: "Remote Monitoring",
    copy: "Mobile and desktop viewing, motion alerts and recording retention planning across single or multiple sites.",
  },
  {
    icon: ShieldCheck,
    title: "Service & Maintenance",
    copy: "Preventive maintenance, fault repair, firmware and storage health checks, plus hardware replacement support.",
  },
];

export const productCategories = [
  { icon: Camera, name: "Bullet Cameras", spec: "Outdoor perimeter · IR / color night vision" },
  { icon: Cctv, name: "Dome Cameras", spec: "Indoor & semi-outdoor · vandal resistant" },
  { icon: Radar, name: "PTZ Cameras", spec: "Pan · tilt · optical zoom · tracking" },
  { icon: Cpu, name: "AI Cameras", spec: "Human / vehicle classification on device" },
  { icon: Wifi, name: "Wi-Fi Cameras", spec: "Wireless indoor & outdoor units" },
  { icon: Server, name: "NVR / DVR / XVR", spec: "Recording, storage and RAID options" },
  { icon: MonitorPlay, name: "Video Door Phones", spec: "Intercom and entrance verification" },
  { icon: Fingerprint, name: "Access & Biometrics", spec: "Attendance, door control, readers" },
  { icon: Bell, name: "Alarms & Sensors", spec: "Intrusion, siren and sensor integration" },
];

export const aiFeatures = [
  { label: "Human Detection", detail: "Person classified inside a monitored zone" },
  { label: "Vehicle Detection", detail: "Cars and two-wheelers separated from people" },
  { label: "Line Crossing", detail: "Directional trip-wire on gates and lanes" },
  { label: "Intrusion Zone", detail: "Restricted area entry with dwell time" },
  { label: "ANPR", detail: "Number plate capture at entry lanes" },
  { label: "Smart Search", detail: "Filter recorded footage by object type" },
];

export const coverageModes = [
  { name: "Wide Angle", copy: "Short-focal lenses cover forecourts, shop floors and lobbies in a single frame." },
  { name: "Blind Spot Reduction", copy: "Overlapping cones so no approach to an entry point is unobserved." },
  { name: "Night Coverage", copy: "IR and color night-vision units matched to available ambient light." },
  { name: "Entry Monitoring", copy: "Face-height framing at doors, gates and reception counters." },
  { name: "Perimeter Monitoring", copy: "Boundary walls and fence lines with directional trip-wires." },
];

export const industries = [
  { icon: Home, name: "Residential", need: "Entry, driveway and boundary coverage with mobile viewing." },
  { icon: Building2, name: "Offices", need: "Reception, cabins, server room and access logging." },
  { icon: Factory, name: "Factories", need: "Production lines, gates, weighbridge and material movement." },
  { icon: Warehouse, name: "Warehousing", need: "Loading bays, racking aisles and dispatch verification." },
  { icon: ShoppingBag, name: "Retail", need: "Billing counters, shop floor and stock room monitoring." },
  { icon: GraduationCap, name: "Institutions", need: "Corridors, campus gates and common areas." },
];

export const processSteps = [
  { no: "01", title: "Site Survey", copy: "We walk the property, note entries, blind spots and cable routes." },
  { no: "02", title: "Security Assessment", copy: "Risks are ranked so the budget goes where exposure is highest." },
  { no: "03", title: "System Design", copy: "Camera positions, lens choice, storage days and network layout." },
  { no: "04", title: "Product Selection", copy: "Hardware matched to the design — no over-specifying." },
  { no: "05", title: "Installation", copy: "Clean cabling, proper mounting, weather-sealed terminations." },
  { no: "06", title: "Configuration", copy: "Recording schedules, detection zones, users and mobile access." },
  { no: "07", title: "Testing", copy: "Day and night verification of every camera and alert path." },
  { no: "08", title: "Handover", copy: "Walkthrough of playback, backup and app usage with your team." },
  { no: "09", title: "After-Sales Support", copy: "Maintenance visits, fault attendance and expansion planning." },
];

export const whyUs = [
  "Professional installation by an experienced field team",
  "Genuine products with manufacturer warranty support",
  "Security planning customised to each site",
  "Clean, documented cabling and network layout",
  "Technical support after handover",
  "Scalable systems you can expand later",
];

export const projects = [
  {
    type: "Factory Surveillance",
    location: "Erode district",
    requirement: "Gate movement, material dispatch and production floor visibility.",
    solution: "IP cameras on PoE switching with a central recorder and remote access.",
    result: "Single-screen oversight of gates, stores and dispatch.",
  },
  {
    type: "Retail Security",
    location: "Erode",
    requirement: "Billing counter accountability and shop-floor coverage.",
    solution: "Dome cameras at counters with wide-angle floor coverage and cloud-free playback.",
    result: "Faster dispute resolution from searchable footage.",
  },
  {
    type: "Residential Security",
    location: "Perundurai",
    requirement: "Gate, driveway and boundary wall monitoring for a family home.",
    solution: "Color night-vision bullet cameras with mobile alerts and a compact recorder.",
    result: "Clear night footage and instant motion notifications.",
  },
];

/** Placeholder slots — replace with verified customer testimonials only. */
export const testimonialSlots = [
  { project: "Warehouse installation", area: "Namakkal" },
  { project: "Office surveillance", area: "Salem" },
  { project: "Home security", area: "Erode" },
];

export const faqs = [
  {
    q: "How many cameras does my property need?",
    a: "It depends on entries, blind spots and the area to be covered. We complete a site survey first and then propose a camera count and placement plan — you only pay for coverage that adds value.",
  },
  {
    q: "What is the difference between an IP camera and an analog CCTV camera?",
    a: "IP cameras send digital video over a network cable to an NVR, generally offering higher resolution and on-camera analytics. Analog systems use coaxial cabling with a DVR/XVR and are often the cost-effective route when existing cabling can be reused.",
  },
  {
    q: "How many days of recording can I keep?",
    a: "Retention depends on camera count, resolution, frame rate and hard-drive size. We size storage during the design stage for the number of days you want to keep.",
  },
  {
    q: "Can I view the cameras on my phone?",
    a: "Yes. Mobile and desktop viewing is configured at handover, along with motion notifications and user accounts for the people who should have access.",
  },
  {
    q: "Do you service and repair existing CCTV systems?",
    a: "Yes — maintenance, fault repair, camera replacement and upgrades of existing installations, including systems installed by others.",
  },
  {
    q: "Do you handle wireless or Wi-Fi CCTV installation?",
    a: "Where cabling is impractical we use Wi-Fi or wireless links. Wired PoE remains our recommendation for critical coverage because it is more stable.",
  },
];
