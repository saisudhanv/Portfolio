export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  highlights: string[];
  github?: string;
  live?: string;
  category: 'Full Stack' | 'Backend/API' | 'Automation' | 'AI/ML';
  image: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100 for progress bar
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Achievement {
  title: string;
  subtitle: string;
  ratingLabel?: string;
  ratingValue?: string;
  details?: string;
}

export interface Certification {
  name: string;
  issuer: string;
}

export const personalDetails = {
  name: "Challapalli Sai Sudhanv",
  roles: [
    "Software Engineer",
    "Full Stack Developer",
    "Problem Solver"
  ],
  bio: "I build scalable web applications, AI-powered solutions and production-ready backend systems with a focus on clean architecture and exceptional user experience.",
  aboutText: "I am a passionate Computer Science undergraduate who loves solving complex challenges. I specialize in crafting robust backend architectures, sleek and interactive frontends, and automated workflows leveraging state-of-the-art AI. With a solid academic background and hands-on industry experience from multiple internships, I focus on engineering clean, scalable, and responsive software systems.",
  education: {
    degree: "Computer Science Undergraduate",
    cgpa: "8.82",
  },
  stats: [
    { value: "500+", label: "LeetCode Problems", target: 500 },
    { value: "4+", label: "Major Projects", target: 4 },
    { value: "2", label: "Internships", target: 2 },
    { value: "8.82", label: "CGPA", target: 8.82, isDecimal: true }
  ],
  socials: {
    github: "https://github.com/saisudhanv",
    linkedin: "https://www.linkedin.com/in/challapalli-sai-sudhanv-555326250/",
    leetcode: "https://leetcode.com/saisudhanv2004",
    email: "mailto:saisudhanv2004@gmail.com", // Replace with standard template/placeholder if needed
    phone: "+91 8309559346",
    location: "India"
  }
};

export const experiences: Experience[] = [
  {
    title: "Frontend Developer Intern",
    company: "Om Softwares",
    period: "Aug 2025 – Jan 2026",
    highlights: [
      "Built 15+ reusable Next.js UI components",
      "Integrated 10+ REST APIs",
      "Worked closely with backend developers",
      "Ensured production-grade UI consistency"
    ]
  },
  {
    title: "Frontend Developer Trainee",
    company: "Finsol Consultancy Pvt Ltd",
    period: "Apr 2024 – May 2024",
    highlights: [
      "Developed hospital management website",
      "React.js",
      "Tailwind CSS",
      "Improved mobile responsiveness",
      "Enhanced UX"
    ]
  }
];

export const projects: Project[] = [
  {
    id: "ai-bg-remover",
    title: "AI SaaS Image Background Remover",
    description: "A cloud-based software-as-a-service application that allows users to instantly remove background from images using AI processing. Features robust authentication, concurrent queue handling, and billing readiness.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    highlights: [
      "Cloud image processing",
      "JWT Authentication",
      "MongoDB optimization",
      "REST APIs",
      "Concurrent AI processing"
    ],
    github: "https://github.com/saisudhanv/AI-Image-Background-Remover",
    live: "https://ai-image-background-remover-l9vu.onrender.com/",
    category: "Full Stack",
    image: "ai_bg_remover"
  },
  {
    id: "rest-api-platform",
    title: "Production Ready REST API Platform",
    description: "A highly-scalable, production-grade backend API boilerplate featuring comprehensive unit test coverage, automated CI/CD pipelines, rate limiting, and dockerized microservices.",
    stack: ["Node.js", "Express", "PostgreSQL", "Docker", "GitHub Actions", "CI/CD", "Drizzle ORM", "JWT"],
    highlights: [
      "Production backend",
      "Authentication",
      "Testing",
      "Dockerized deployment",
      "Rate limiting",
      "ESLint",
      "Prettier"
    ],
    github: "https://github.com/saisudhanv/Acquisitions",
    // live: "https://demo.com",
    category: "Backend/API",
    image: "rest_api_platform"
  },
  {
    id: "ai-automation-assistant",
    title: "AI Personal Automation Assistant",
    description: "A workflow automation ecosystem that integrates with calendar and task platforms, allowing users to orchestrate tasks and schedules using natural language commands processed by an AI agent.",
    stack: ["n8n", "Google Calendar API", "Google Tasks API", "Workflow Automation"],
    highlights: [
      "Agentic workflows",
      "Webhook automation",
      "Natural language scheduling",
      "Task orchestration"
    ],
    // github: "https://github.com",
    // live: "https://demo.com",
    category: "Automation",
    image: "automation_assistant"
  },
  {
    id: "doc-extraction-platform",
    title: "AI Powered Document Extraction",
    description: "A high-performance system designed to extract structured information from unstructured documents using advanced Optical Character Recognition (OCR) and Gemini 2.5 Flash LLM, sending real-time stream updates to a dashboard.",
    stack: ["Next.js", "FastAPI", "Gemini 2.5 Flash", "SQLite", "Python"],
    highlights: [
      "Document OCR",
      "LLM extraction",
      "Confidence scoring",
      "SSE",
      "Real-time dashboard",
      "Async processing"
    ],
    github: "https://github.com/saisudhanv/AI-Powered-Document-Data-Extraction-Dashboard",
    live: "https://ai-powered-document-data-extraction.vercel.app/",
    category: "AI/ML",
    image: "doc_extraction"
  }
];

export const skillsData: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "JavaScript", level: 92 },
      { name: "React", level: 92 },
      { name: "Next.js", level: 90 },
      { name: "Tailwind", level: 95 },
      { name: "Redux", level: 80 }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 90 },
      { name: "REST APIs", level: 95 },
      { name: "JWT", level: 90 },
      { name: "FastAPI", level: 80 }
    ]
  },
  {
    category: "Database",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 82 },
      { name: "SQLite", level: 80 }
    ]
  },
  {
    category: "Programming",
    skills: [
      { name: "JavaScript", level: 92 },
      { name: "Python", level: 85 },
      { name: "C++", level: 78 }
    ]
  },
  {
    category: "DevOps",
    skills: [
      { name: "Docker", level: 80 },
      { name: "Git", level: 88 },
      { name: "GitHub", level: 90 },
      { name: "CI/CD", level: 75 },
      { name: "Linux", level: 82 }
    ]
  },
  {
    category: "Testing",
    skills: [
      { name: "Postman", level: 90 },
      { name: "Jest", level: 78 }
    ]
  },
  {
    category: "Automation",
    skills: [
      { name: "n8n", level: 85 },
      { name: "Workflow Automation", level: 88 }
    ]
  },
  {
    category: "AI/ML",
    skills: [
      { name: "Gemini", level: 82 },
      { name: "Scikit-learn", level: 70 },
      { name: "NumPy", level: 75 },
      { name: "Pandas", level: 75 }
    ]
  }
];

export const achievementsData = {
  platforms: [
    {
      name: "LeetCode",
      problemsSolved: "500+ Problems",
      ratingLabel: "Max Rating",
      ratingValue: "1555",
      color: "from-amber-500 to-yellow-600"
    },
    {
      name: "CodeChef",
      problemsSolved: "2-Star Developer",
      ratingLabel: "Rating",
      ratingValue: "1445",
      color: "from-emerald-500 to-teal-600"
    }
  ],
  certifications: [
    { name: "Python Essentials", issuer: "Cisco" },
    { name: "Networking Essentials", issuer: "Cisco" },
    { name: "SQL Basics", issuer: "HackerRank" }
  ]
};
