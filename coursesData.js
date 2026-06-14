export const categories = [
  "All",
  "Web Development",
  "Artificial Intelligence",
  "Cyber Security",
  "UI/UX Design",
  "Cloud Computing"
];

export const dummyCourses = [
  {
    id: "web-dev-bootcamp",
    title: "Next-Gen Full-Stack Web Development Bootcamp",
    category: "Web Development",
    rating: 4.9,
    reviewsCount: 1420,
    duration: "52 hours",
    lessonsCount: 42,
    level: "Beginner to Advanced",
    instructor: {
      name: "Dr. Angela Thorne",
      title: "Senior Software Architect & Ex-Google Engineer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    },
    price: 3999,
    discountPrice: 499,
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600",
    description: "Master React, Node.js, Next.js, and modern CSS layout engines. Build 10+ real-world production grade SaaS products from scratch.",
    longDescription: "Dive deep into modern full-stack engineering. This comprehensive bootcamp will teach you React from basic rendering to complex hook optimization, server-side rendering with Next.js, building REST and GraphQL APIs with Node and Express, and data scaling. You will also build high-performance styling using CSS Grid, Flexbox, and Tailwind. By the end of this course, you will have a stellar portfolio of web applications that will stand out in interviews.",
    curriculum: [
      {
        sectionTitle: "Module 1: The Modern Web & React Fundamentals",
        lectures: [
          { title: "Welcome to the Bootcamp!", duration: "08:12", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { title: "React under the Hood: Reconciliation & Fiber", duration: "18:45", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
          { title: "Mastering State with useState and useEffect", duration: "25:30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
        ]
      },
      {
        sectionTitle: "Module 2: Advanced React & Routing",
        lectures: [
          { title: "Deep Dive: Context API & Custom Hooks", duration: "22:15", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { title: "React Router DOM: Dynamic Routing & Loaders", duration: "31:10", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
          { title: "Performance Tuning: useMemo and useCallback", duration: "19:50", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
        ]
      },
      {
        sectionTitle: "Module 3: Backend & Database Integration",
        lectures: [
          { title: "Express.js Setup & Middleware Architecture", duration: "20:40", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { title: "Designing MongoDB Schemas & Mongoose Models", duration: "27:18", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }
        ]
      }
    ]
  },
  {
    id: "ai-neural-networks",
    title: "Mastering Machine Learning & Deep Neural Networks",
    category: "Artificial Intelligence",
    rating: 4.8,
    reviewsCount: 890,
    duration: "45 hours",
    lessonsCount: 36,
    level: "Intermediate to Advanced",
    instructor: {
      name: "Prof. Alan Vance",
      title: "AI Researcher & Ex-DeepMind Scientist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    price: 4999,
    discountPrice: 699,
    thumbnail: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=600",
    description: "Build, train, and deploy advanced neural networks using TensorFlow and PyTorch. Master LLMs, CNNs, and reinforcement learning.",
    longDescription: "An advanced practical guide to Deep Learning. Skip the dry theory and implement actual neural networks from scratch. Learn how Convolutional Neural Networks recognize images, how Recurrent Networks and Transformers process text, and how Generative Adversarial Networks create art. We finish with deploying models to cloud environments.",
    curriculum: [
      {
        sectionTitle: "Module 1: Introduction to AI & Math Foundations",
        lectures: [
          { title: "AI/ML Evolution & Future Trends", duration: "12:05", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
          { title: "Linear Algebra & Calculus Refreshers", duration: "28:40", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
        ]
      },
      {
        sectionTitle: "Module 2: Custom Neural Networks",
        lectures: [
          { title: "Forward & Backpropagation Step-by-Step", duration: "32:15", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
          { title: "Building a Multi-Layer Perceptron in PyTorch", duration: "40:50", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }
        ]
      }
    ]
  },
  {
    id: "ethical-hacking-cyber",
    title: "Advanced Cybersecurity & Ethical Hacking Blueprint",
    category: "Cyber Security",
    rating: 4.7,
    reviewsCount: 730,
    duration: "38 hours",
    lessonsCount: 30,
    level: "Intermediate",
    instructor: {
      name: "Marcus Kane",
      title: "Whitehat Hacker & DevSecOps Consultant",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
    },
    price: 3499,
    discountPrice: 399,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",
    description: "Learn penetration testing, network sniffing, secure code analysis, and advanced digital forensics like an industry veteran.",
    longDescription: "Learn to think like a black-hat hacker to defend like a white-hat security professional. We will guide you through setting up a safe virtual hacking lab, scanning systems for vulnerabilities, writing exploits, performing SQL injections, and patching real-world applications. Fully hands-on.",
    curriculum: [
      {
        sectionTitle: "Module 1: Ethical Hacking Lab Setup",
        lectures: [
          { title: "Lab Setup: Installing Kali Linux & Target VMs", duration: "15:45", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
          { title: "Information Gathering with Nmap & Shodan", duration: "23:22", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
        ]
      },
      {
        sectionTitle: "Module 2: Web Application Attacks",
        lectures: [
          { title: "Exploiting SQL Injection Vulnerabilities", duration: "30:10", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
          { title: "Cross-Site Scripting (XSS) & Mitigation", duration: "25:40", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
        ]
      }
    ]
  },
  {
    id: "uiux-design-masterclass",
    title: "UI/UX Design Masterclass: Figma to Web Implementation",
    category: "UI/UX Design",
    rating: 4.9,
    reviewsCount: 1120,
    duration: "28 hours",
    lessonsCount: 24,
    level: "Beginner",
    instructor: {
      name: "Elena Rostova",
      title: "Lead UI Designer & Creative Director",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    },
    price: 2999,
    discountPrice: 299,
    thumbnail: "https://images.unsplash.com/photo-1561070791-26c113006238?w=600",
    description: "Design pixel-perfect responsive layouts, wireframes, style systems, and complex micro-interactions. Export directly into clean HTML/CSS.",
    longDescription: "Learn professional UI design from the ground up. This course shows you how to establish strong grid systems, pick color schemes with proper accessibility ratios, build reusable component libraries inside Figma, create wireframes, prototype flows, and prepare developer-ready designs.",
    curriculum: [
      {
        sectionTitle: "Module 1: Design Principles & Figma Basics",
        lectures: [
          { title: "Visual Hierarchy: Contrast, Alignment, Proximity", duration: "14:15", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
          { title: "Getting Started with Figma Auto-Layout", duration: "21:30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }
        ]
      },
      {
        sectionTitle: "Module 2: Prototyping & UX Workflows",
        lectures: [
          { title: "Creating Smart Animate Transitions", duration: "18:25", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
          { title: "User Persona Research & Wireframing Flows", duration: "24:10", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
        ]
      }
    ]
  },
  {
    id: "cloud-aws-kubernetes",
    title: "Cloud Engineering Blueprint: AWS & Kubernetes in Production",
    category: "Cloud Computing",
    rating: 4.8,
    reviewsCount: 650,
    duration: "40 hours",
    lessonsCount: 32,
    level: "Advanced",
    instructor: {
      name: "Dave Miller",
      title: "Solutions Architect & DevSecOps Lead",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
    },
    price: 4499,
    discountPrice: 599,
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
    description: "Architect secure, auto-scaling multi-region architectures on AWS. Deploy containers at scale using Kubernetes clusters.",
    longDescription: "Modern DevOps demands container orchestrations and serverless designs. You'll master VPC networking, IAM security, EC2 autoscaling groups, AWS Lambda, Dockerizing applications, and writing Terraform manifests to automate deployment on Kubernetes nodes.",
    curriculum: [
      {
        sectionTitle: "Module 1: Docker Containers & Virtualization",
        lectures: [
          { title: "Virtual Machines vs. Containers", duration: "10:15", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
          { title: "Writing a Production-Ready Dockerfile", duration: "19:40", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
        ]
      },
      {
        sectionTitle: "Module 2: Kubernetes Fundamentals",
        lectures: [
          { title: "Kubernetes Cluster Architecture: Control Plane & Nodes", duration: "26:30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
          { title: "Deploying Pods & Services in K8s", duration: "32:10", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }
        ]
      }
    ]
  }
];
