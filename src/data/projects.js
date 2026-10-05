export const projects = [
  {
    id: 1,
    title: "Smart Car Parking / ANPR System",
    description:
      "An intelligent license plate recognition system that detects vehicle number plates using YOLO and extracts plate numbers using EasyOCR, with ESP32-CAM integration for real-time parking management.",
    longDescription:
      "Combines computer vision with embedded systems to create an end-to-end automated parking solution. Features real-time video stream processing, YOLO-based plate detection, OCR extraction, and a Flask web dashboard.",
    technologies: ["Python", "Flask", "YOLO", "EasyOCR", "OpenCV", "ESP32-CAM"],
    category: "ai-ml",
    image: null,
    github: "https://github.com/yourusername/anpr-parking",
    demo: null,
    featured: true,
  },
  {
    id: 2,
    title: "AI Data Analysis Platform",
    description:
      "A full-stack AI-powered data analysis platform that allows users to upload datasets, analyze data, generate insights, and interact with their data using natural language queries.",
    longDescription:
      "Built with React frontend and Python/FastAPI backend. Uses DuckDB for in-browser analytics, Pandas for data manipulation, and LLM integration for natural language to SQL conversion.",
    technologies: ["React", "Python", "FastAPI", "DuckDB", "Pandas", "LLM"],
    category: "full-stack",
    image: null,
    github: "https://github.com/yourusername/ai-data-platform",
    demo: null,
    featured: true,
  },
  {
    id: 3,
    title: "MediBook",
    description:
      "A healthcare appointment booking platform designed to simplify doctor discovery, appointment scheduling, and patient-doctor management with a clean, accessible interface.",
    longDescription:
      "Full-stack healthcare application with role-based authentication, doctor profiles, appointment calendar, and notification system.",
    technologies: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
    category: "full-stack",
    image: null,
    github: "https://github.com/yourusername/medibook",
    demo: null,
    featured: false,
  },
  {
    id: 4,
    title: "Course Enrollment System",
    description:
      "A web-based course enrollment system for managing student course registration, academic data, and enrollment workflows in an educational institution.",
    longDescription:
      "Includes admin panel, student dashboard, course catalog, prerequisite validation, and enrollment history management.",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    category: "other",
    image: null,
    github: "https://github.com/yourusername/course-enrollment",
    demo: null,
    featured: false,
  },
  {
    id: 5,
    title: "Quantum Circuit Transpiler",
    description:
      "Exploring quantum circuit transpilation, qubit mapping, gate decomposition, and circuit optimization for quantum hardware backends using Qiskit.",
    longDescription:
      "Research-focused project implementing custom transpilation passes, qubit routing algorithms, and gate synthesis for NISQ device compatibility.",
    technologies: ["Python", "Qiskit", "Quantum Computing", "Linear Algebra"],
    category: "quantum",
    image: null,
    github: "https://github.com/yourusername/quantum-transpiler",
    demo: null,
    featured: true,
  },
];

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "full-stack", label: "Full Stack" },
  { id: "quantum", label: "Quantum" },
  { id: "other", label: "Other" },
];
