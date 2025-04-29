// src/pages/courses.js
export const courses = [
    {
      id: 1,
      title: "Java Programming",
      instructor: "Dr. Emily Chen",
      description: "A comprehensive course covering core Java concepts, object-oriented programming principles, and practical application development.",
      duration: "12 weeks",
      level: "Intermediate",
      rating: 4.7,
      enrolled: 1240,
      image: "/images/java-course.jpg",
      tags: ["Programming", "Java", "Object-Oriented"],
      topics: [
        "Java Fundamentals",
        "Object-Oriented Programming",
        "Exception Handling",
        "Collections Framework",
        "File I/O",
        "Multithreading",
        "GUI Development"
      ],
      progress: 45
    },
    {
      id: 2,
      title: "Computer Organisation and Architecture",
      instructor: "Prof. Robert Williams",
      description: "Explore the fundamental concepts of computer architecture, including processor design, memory systems, and performance analysis.",
      duration: "10 weeks",
      level: "Advanced",
      rating: 4.5,
      enrolled: 890,
      image: "/images/computer-architecture.jpg",
      tags: ["Hardware", "Architecture", "Systems"],
      topics: [
        "Digital Logic Design",
        "CPU Architecture",
        "Memory Hierarchy",
        "I/O Systems",
        "Pipelining",
        "Cache Design",
        "Performance Evaluation"
      ],
      progress: 32
    },
    {
      id: 3,
      title: "Startup Management",
      instructor: "Sarah Johnson, MBA",
      description: "Learn practical strategies for launching and growing successful startups, from ideation and market validation to funding and scaling.",
      duration: "8 weeks",
      level: "Beginner",
      rating: 4.8,
      enrolled: 1560,
      image: "/images/startup-management.jpg",
      tags: ["Business", "Entrepreneurship", "Management"],
      topics: [
        "Idea Validation",
        "Business Model Canvas",
        "Market Research",
        "MVP Development",
        "Funding Strategies",
        "Growth Hacking",
        "Team Building"
      ],
      progress: 78
    },
    {
      id: 4,
      title: "Foundations of Data Science",
      instructor: "Dr. Michael Park",
      description: "Master the essential skills of data science including statistical analysis, data visualization, and machine learning fundamentals.",
      duration: "14 weeks",
      level: "Intermediate",
      rating: 4.6,
      enrolled: 2100,
      image: "/images/data-science.jpg",
      tags: ["Data Science", "Statistics", "Machine Learning"],
      topics: [
        "Statistical Analysis",
        "Data Cleaning & Preparation",
        "Data Visualization",
        "Exploratory Data Analysis",
        "Regression Analysis",
        "Classification Algorithms",
        "Python for Data Science"
      ],
      progress: 60
    }
  ];
  
  export default courses;