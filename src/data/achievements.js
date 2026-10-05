// Add, remove, or edit achievements as needed.
// Each achievement has: title, description, icon, date, category, highlight

export const achievements = [
  {
    id: 1,
    title: "Add Your Achievement",
    description: "Describe your achievement here — e.g., rank in a competition, hackathon win, academic excellence, etc.",
    icon: "Trophy",
    date: "Year",
    category: "Academic",
    highlight: false,
  },
  {
    id: 2,
    title: "Add Your Achievement",
    description: "Describe your achievement here — e.g., GATE score, competitive programming rank, research paper, etc.",
    icon: "Star",
    date: "Year",
    category: "Competitive",
    highlight: false,
  },
  {
    id: 3,
    title: "Add Your Achievement",
    description: "Describe your achievement here — e.g., internship experience, open-source contribution, etc.",
    icon: "Briefcase",
    date: "Year",
    category: "Experience",
    highlight: false,
  },
  {
    id: 4,
    title: "Add Your Achievement",
    description: "Describe your achievement here — e.g., hackathon participation, project recognition, etc.",
    icon: "Zap",
    date: "Year",
    category: "Hackathon",
    highlight: false,
  },
];

export const achievementCategories = ["All", "Academic", "Competitive", "Experience", "Hackathon"];

// Social links
export const socialLinks = [
  {
    id: "github",
    name: "GitHub",
    username: "pratikadamas",
    url: "https://github.com/pratikadamas",
    handle: "github.com/pratikadamas",
    color: "#333",
    darkColor: "#f1f5f9",
    bgHover: "hover:bg-gray-100 dark:hover:bg-gray-800",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    username: "pratik-giri-745b51291",
    url: "https://linkedin.com/in/pratik-giri-745b51291/",
    handle: "linkedin.com/in/pratik-giri-745b51291",
    color: "#0A66C2",
    bgHover: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
  },
  {
    id: "leetcode",
    name: "LeetCode",
    username: "pratik_giri2024",
    url: "https://www.leetcode.com/pratik_giri2024",
    handle: "leetcode.com/pratik_giri2024",
    color: "#FFA116",
    bgHover: "hover:bg-amber-50 dark:hover:bg-amber-900/20",
  },
  {
    id: "kaggle",
    name: "Kaggle",
    username: "pratikgiri2024",
    url: "https://kaggle.com/pratikgiri2024",
    handle: "kaggle.com/pratikgiri2024",
    color: "#20BEFF",
    bgHover: "hover:bg-sky-50 dark:hover:bg-sky-900/20",
  },
];

// Contact info
export const contactInfo = {
  email: "your.email@example.com", // Replace with your actual email
  location: "India",
  availability: "Open to internships & opportunities",
};

// Timeline / Journey
export const timeline = [
  {
    year: "2022",
    title: "Started B.E. in Computer Science",
    description: "Began the journey at college, exploring programming fundamentals, data structures, and algorithms.",
    icon: "GraduationCap",
    type: "education",
  },
  {
    year: "2023",
    title: "Dived into AI/ML & Full-Stack",
    description: "Built first ML models, learned React and Node.js, started contributing to projects.",
    icon: "Code2",
    type: "skill",
  },
  {
    year: "2024",
    title: "Real-World Projects",
    description: "Built ANPR system, AI data platform, and healthcare app. Explored quantum computing.",
    icon: "Rocket",
    type: "project",
  },
  {
    year: "2025",
    title: "Final Year & Research",
    description: "Final year CSE student, focusing on AI research, quantum transpilation, and building impactful software.",
    icon: "Star",
    type: "current",
  },
];
