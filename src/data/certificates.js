import autoCertificates from './auto-certificates.json';

// Automatically rendered certificates from /public/certificates/
export const certificates = autoCertificates && autoCertificates.length > 0 ? autoCertificates : [];

// Stats displayed in the About section — automatically dynamically updates based on certificate count
export const stats = [
  { label: "Projects Built", value: "5+", icon: "Rocket" },
  { label: "Technologies", value: "30+", icon: "Code2" },
  { label: "Certifications", value: `${Math.max(certificates.length, 14)}+`, icon: "Award" },
  { label: "GitHub Repos", value: "10+", icon: "Github" },
];
