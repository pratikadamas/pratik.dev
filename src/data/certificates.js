// Replace the placeholder values with your actual certificate information and image paths.
// For images, place your certificate images in /public/certificates/ and reference them as:
// image: "/certificates/your-cert-name.jpg"

export const certificates = [
  {
    id: 1,
    title: "Add Your Certificate Title",
    organization: "Issuing Organization",
    date: "Month Year",
    image: null, // Replace with: "/certificates/cert-1.jpg"
    credentialUrl: "#", // Replace with actual credential URL
    category: "AI/ML",
  },
  {
    id: 2,
    title: "Add Your Certificate Title",
    organization: "Issuing Organization",
    date: "Month Year",
    image: null,
    credentialUrl: "#",
    category: "Full Stack",
  },
  {
    id: 3,
    title: "Add Your Certificate Title",
    organization: "Issuing Organization",
    date: "Month Year",
    image: null,
    credentialUrl: "#",
    category: "Cloud",
  },
  {
    id: 4,
    title: "Add Your Certificate Title",
    organization: "Issuing Organization",
    date: "Month Year",
    image: null,
    credentialUrl: "#",
    category: "Other",
  },
];

// Stats displayed in the About section — update these with your real numbers
export const stats = [
  { label: "Projects Built", value: "5+", icon: "Rocket" },
  { label: "Technologies", value: "30+", icon: "Code2" },
  { label: "Certifications", value: "4+", icon: "Award" },
  { label: "GitHub Repos", value: "10+", icon: "Github" },
];
