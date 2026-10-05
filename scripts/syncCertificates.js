import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const certsDir = path.resolve(rootDir, 'public/certificates');
const outputFile = path.resolve(rootDir, 'src/data/auto-certificates.json');

const KNOWN_METADATA = {
  "AWS Cloud Operations traning Badeg.png": {
    title: "AWS Cloud Operations Training",
    organization: "AWS Academy Graduate",
    category: "Cloud",
    date: "2026"
  },
  "AWS Data Engineering Training Badge.png": {
    title: "AWS Data Engineering Training",
    organization: "AWS Academy Graduate",
    category: "Data & Cloud",
    date: "2026"
  },
  "AWS Machine Learning Foundation Training Badge.png": {
    title: "AWS Machine Learning Foundations",
    organization: "AWS Academy Graduate",
    category: "AI/ML",
    date: "2026"
  },
  "C Language NPTEL.jpg": {
    title: "Problem Solving Through Programming in C",
    organization: "NPTEL Elite (IIT Kharagpur)",
    category: "Programming",
    date: "2024"
  },
  "C++ NPTEL.jpg": {
    title: "Programming in Modern C++",
    organization: "NPTEL Elite (IIT Kharagpur)",
    category: "Programming",
    date: "2024"
  },
  "ISRO Hackathon.png": {
    title: "Bharatiya Antariksh Hackathon 2024",
    organization: "ISRO",
    category: "Hackathon",
    date: "2024"
  },
  "Introduction to Data Science.png": {
    title: "Introduction to Data Science",
    organization: "Infosys Springboard",
    category: "Data Science",
    date: "2026"
  },
  "Introduction to Natural Language Processing.png": {
    title: "Introduction to Natural Language Processing",
    organization: "Infosys Springboard",
    category: "AI/ML",
    date: "2026"
  },
  "JAVA NPTEL.jpg": {
    title: "Data Structures & Algorithms Using Java",
    organization: "NPTEL Elite (IIT Kharagpur)",
    category: "Programming",
    date: "2024"
  },
  "Machine Learning Algorithm.jpg": {
    title: "Machine Learning Algorithms",
    organization: "Great Learning",
    category: "AI/ML",
    date: "2024"
  },
  "Udemy-jQuery.jpg": {
    title: "JavaScript, jQuery & TypeScript: Full-Stack",
    organization: "Udemy",
    category: "Web Dev",
    date: "2024"
  },
  "Unstop.jpeg": {
    title: "QuizOff 2026 - India's Biggest AI Quiz",
    organization: "Unstop & CampusCrew",
    category: "Competitions",
    date: "2026"
  },
  "code.jpg": {
    title: "Coding & Problem Solving",
    organization: "Adamas University",
    category: "Programming",
    date: "2024"
  },
  "skillindia.jpg": {
    title: "AI For Youth & Digital Skills",
    organization: "Intel & Skill India",
    category: "Government",
    date: "2023"
  }
};

function formatTitle(filename) {
  const ext = path.extname(filename);
  let name = path.basename(filename, ext);
  // Remove numbering like (1), - Copy, etc.
  name = name.replace(/\(\d+\)/g, '').replace(/-\s*copy/gi, '').trim();
  name = name.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function detectMeta(filename, title) {
  const lower = (filename + ' ' + title).toLowerCase();
  let organization = "Verified Issuer";
  let category = "Certification";

  if (lower.includes("aws") || lower.includes("amazon")) {
    organization = "Amazon Web Services (AWS)";
    category = lower.includes("machine learning") || lower.includes("ml") ? "AI/ML" : "Cloud";
  } else if (lower.includes("nptel") || lower.includes("swayam") || lower.includes("iit")) {
    organization = "NPTEL Elite";
    category = "Programming";
  } else if (lower.includes("isro")) {
    organization = "ISRO";
    category = "Hackathon";
  } else if (lower.includes("infosys")) {
    organization = "Infosys Springboard";
    category = lower.includes("data") ? "Data Science" : "AI/ML";
  } else if (lower.includes("great learning")) {
    organization = "Great Learning";
    category = "AI/ML";
  } else if (lower.includes("udemy")) {
    organization = "Udemy";
    category = "Web Dev";
  } else if (lower.includes("unstop") || lower.includes("quiz")) {
    organization = "Unstop";
    category = "Competitions";
  } else if (lower.includes("skill india") || lower.includes("intel")) {
    organization = "Skill India / Intel";
    category = "Government";
  } else if (lower.includes("adamas")) {
    organization = "Adamas University";
    category = "Programming";
  } else if (lower.includes("google")) {
    organization = "Google";
    category = "AI/ML";
  } else if (lower.includes("microsoft") || lower.includes("azure")) {
    organization = "Microsoft";
    category = "Cloud";
  } else if (lower.includes("coursera")) {
    organization = "Coursera";
    category = "Online Course";
  } else if (lower.includes("python") || lower.includes("java") || lower.includes("c++") || lower.includes("c language")) {
    organization = "Programming Credential";
    category = "Programming";
  } else if (lower.includes("machine learning") || lower.includes("ai") || lower.includes("data")) {
    organization = "AI & ML Credential";
    category = "AI/ML";
  }

  return { organization, category };
}

export function syncCertificates() {
  if (!fs.existsSync(certsDir)) {
    fs.mkdirSync(certsDir, { recursive: true });
  }

  const validExts = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'];
  const allFiles = fs.readdirSync(certsDir);

  const imageFiles = allFiles.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return validExts.includes(ext);
  });

  const currentYear = new Date().getFullYear().toString();

  const certificates = imageFiles.map((file, index) => {
    const known = KNOWN_METADATA[file];
    const generatedTitle = formatTitle(file);
    const meta = detectMeta(file, generatedTitle);

    return {
      id: index + 1,
      title: known?.title || generatedTitle,
      organization: known?.organization || meta.organization,
      date: known?.date || currentYear,
      image: `/certificates/${file}`,
      credentialUrl: "#",
      category: known?.category || meta.category,
    };
  });

  const targetDir = path.dirname(outputFile);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(certificates, null, 2), 'utf-8');
  return certificates;
}

// Run immediately when executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = syncCertificates();
  console.log(`Successfully synced ${result.length} certificates to ${outputFile}`);
}
