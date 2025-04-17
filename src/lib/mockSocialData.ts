// src/lib/mockSocialData.ts

// Mock user data for posts and comments
export const mockUsers = [
    {
      id: 'user-1',
      name: 'Boss Samsay',
      email: 'boss.samsay@example.com',
      avatar: '/assets/images/avatar.svg',
      isVerified: true,
      isFollowing: false,
    },
    {
      id: 'user-2',
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      avatar: '/assets/images/avatar.svg',
      isVerified: false,
      isFollowing: true,
    },
    {
      id: 'user-3',
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      avatar: '/assets/images/avatar.svg',
      isVerified: true,
      isFollowing: true,
    },
    {
      id: 'user-4',
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      avatar: '/assets/images/avatar.svg',
      isVerified: false,
      isFollowing: false,
    },
    {
      id: 'user-5',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      avatar: '/assets/images/avatar.svg',
      isVerified: false,
      isFollowing: true,
    },
  ];
  
  // Mock posts data
  export const mockPosts = [
    {
      id: 'post-1',
      author: {
        id: 'user-2',
        name: 'Alex Johnson',
        avatar: '/assets/images/avatar.svg',
        isVerified: false,
        isFollowing: true,
      },
      content: 'Just finished my first deep learning model! The results are impressive, especially considering I only used a small dataset. #MachineLearning #AI',
      media: [
        {
          type: 'image',
          url: 'https://media.istockphoto.com/id/2196492361/tr/foto%C4%9Fraf/ai-technology-concept-with-artificial-intelligence-chatbot-and-generative-smart-system.jpg?s=1024x1024&w=is&k=20&c=yFyyjszvV2FibWPOVXsCU9T42XCaIqWtmhDY-3nSl5c=',
        },
      ],
      voiceNote: null,
      gleContent: null,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      likes: 42,
      comments: [
        {
          id: 'comment-1-1',
          author: {
            id: 'user-3',
            name: 'Sarah Williams',
            avatar: '/assets/images/avatar.svg',
            isVerified: true,
          },
          content: 'This is amazing! What kind of architecture did you use?',
          createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(), // 50 minutes ago
          likes: 5,
        },
        {
          id: 'comment-1-2',
          author: {
            id: 'user-2',
            name: 'Alex Johnson',
            avatar: '/assets/images/avatar.svg',
            isVerified: false,
          },
          content: "Thanks! I used a convolutional neural network with a few custom layers. I can share the code if you're interested.",
          createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
          likes: 3,
        },
      ],
      shares: 12,
      bookmarks: 8,
      isLiked: false,
      isBookmarked: true,
      trending: true,
    },
    {
      id: 'post-2',
      author: {
        id: 'user-3',
        name: 'Sarah Williams',
        avatar: '/assets/images/avatar.svg',
        isVerified: true,
        isFollowing: true,
      },
      content: 'I just published my research paper on collaborative learning techniques! It explores how group dynamics affect problem-solving efficiency in academic settings. #Education #Research',
      media: [],
      voiceNote: null,
      gleContent: {
        id: 'gle-123',
        type: 'insight',
        title: 'Insight: Collaborative Learning Effectiveness',
        topic: 'Collaborative Learning',
        format: 'concise',
        complexity: 75,
        content: 'Recent research on collaborative learning shows that well-structured group work can improve learning outcomes by up to 40%. Three key factors that contribute to success are clear role assignment, equal participation opportunities, and scheduled reflection periods. The most effective collaborative environments balance individual accountability with group interdependence.',
        sources: [
          { title: 'Journal of Educational Psychology', url: '#' },
          { title: 'Collaborative Learning Handbook', url: '#' },
        ],
        relatedTopics: ['Group Dynamics', 'Academic Performance', 'Peer Learning'],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      likes: 87,
      comments: [
        {
          id: 'comment-2-1',
          author: {
            id: 'user-4',
            name: 'Michael Chen',
            avatar: '/assets/images/avatar.svg',
            isVerified: false,
          },
          content: "I've been looking for research on this topic. Is your paper available online somewhere?",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
          likes: 2,
        },
      ],
      shares: 34,
      bookmarks: 22,
      isLiked: true,
      isBookmarked: false,
      trending: true,
    },
    {
      id: 'post-3',
      author: {
        id: 'user-5',
        name: 'Emily Davis',
        avatar: '/assets/images/avatar.svg',
        isVerified: false,
        isFollowing: true,
      },
      content: "Recording a quick explanation of how differential equations are used in engineering problems. Listen to this if you're struggling with the concept!",
      media: [],
      voiceNote: {
        url: '/assets/audio/sample-voicenote.mp3',
        duration: 65, // seconds
      },
      gleContent: null,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
      likes: 56,
      comments: [],
      shares: 18,
      bookmarks: 30,
      isLiked: false,
      isBookmarked: false,
      trending: false,
    },
    {
      id: 'post-4',
      author: {
        id: 'user-1',
        name: 'Boss Samsay',
        avatar: '/assets/images/avatar.svg',
        isVerified: true,
        isFollowing: false,
      },
      content: 'I created this visual guide to understanding quantum computing basics. Hope it helps clarify some of the fundamental concepts! #QuantumComputing #Science',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1667487935540-f59515f6c7fd?q=80&w=1581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          type: 'image',
          url: 'https://plus.unsplash.com/premium_photo-1690297732750-88ff82cb8542?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
      ],
      voiceNote: null,
      gleContent: null,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(), // 10 hours ago
      likes: 143,
      comments: [],
      shares: 76,
      bookmarks: 54,
      isLiked: true,
      isBookmarked: true,
      trending: true,
    },
    {
      id: 'post-5',
      author: {
        id: 'user-4',
        name: 'Michael Chen',
        avatar: '/assets/images/avatar.svg',
        isVerified: false,
        isFollowing: false,
      },
      content: 'Working on my final project for the Architectural Design course. Would love some feedback on the sustainable elements!',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
      ],
      voiceNote: null,
      gleContent: null,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      likes: 38,
      comments: [],
      shares: 5,
      bookmarks: 12,
      isLiked: false,
      isBookmarked: false,
      trending: false,
    },
    {
      id: 'post-6',
      author: {
        id: 'user-3',
        name: 'Sarah Williams',
        avatar: '/assets/images/avatar.svg',
        isVerified: true,
        isFollowing: true,
      },
      content: "Created a new GLE on effective study techniques based on cognitive science. Take a look if you're preparing for exams!",
      media: [],
      voiceNote: null,
      gleContent: {
        id: 'gle-456',
        type: 'tips',
        title: 'Tips for Effective Study Techniques',
        topic: 'Study Techniques',
        format: 'detailed',
        complexity: 60,
        content: '1. Use spaced repetition instead of cramming - review material at increasing intervals.\n2. Practice active recall by testing yourself rather than rereading notes.\n3. Implement the Pomodoro Technique: 25 minutes of focused study followed by a 5-minute break.\n4. Connect new information to existing knowledge using concept maps.\n5. Teach concepts to others to identify gaps in your understanding.\n\nResearch shows these methods can improve retention by up to 70% compared to traditional studying.',
        sources: [
          { title: 'Journal of Memory and Learning', url: '#' },
          { title: 'Cognitive Science Quarterly', url: '#' },
        ],
        relatedTopics: ['Memory Techniques', 'Time Management', 'Cognitive Load'],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(), // 30 hours ago
      likes: 125,
      comments: [],
      shares: 89,
      bookmarks: 103,
      isLiked: true,
      isBookmarked: true,
      trending: true,
    },
  ];
  
  // Mock trending topics
  export const mockTrendingTopics = [
    {
      id: 'topic-1',
      name: 'Machine Learning',
      postCount: 1243,
    },
    {
      id: 'topic-2',
      name: 'Quantum Computing',
      postCount: 876,
    },
    {
      id: 'topic-3',
      name: 'Sustainable Design',
      postCount: 654,
    },
    {
      id: 'topic-4',
      name: 'Cognitive Science',
      postCount: 521,
    },
    {
      id: 'topic-5',
      name: 'Collaborative Learning',
      postCount: 489,
    },
  ];
  
  // Mock suggested users
  export const mockSuggestedUsers = [
    {
      id: 'user-6',
      name: 'Daniel Wilson',
      avatar: '/assets/images/avatar.svg',
      bio: 'Physics PhD student | Quantum Computing Researcher',
      mutualConnections: 5,
    },
    {
      id: 'user-7',
      name: 'Olivia Martinez',
      avatar: '/assets/images/avatar.svg',
      bio: 'Data Scientist | AI Ethics Advocate',
      mutualConnections: 3,
    },
    {
      id: 'user-8',
      name: 'James Taylor',
      avatar: '/assets/images/avatar.svg',
      bio: 'Architecture Professor | Sustainable Design Expert',
      mutualConnections: 2,
    },
    {
      id: 'user-9',
      name: 'Sophia Lee',
      avatar: '/assets/images/avatar.svg',
      bio: 'Cognitive Science Researcher | Educational Psychology',
      mutualConnections: 7,
    },
  ];
  
  // Mock GLE recommendations for personal dashboard
  export const mockGLERecommendations = [
    {
      id: 'gle-rec-1',
      title: 'Understanding Neural Networks',
      relevanceScore: 98,
      topic: 'Artificial Intelligence',
      complexity: 75,
    },
    {
      id: 'gle-rec-2',
      title: 'Effective Research Methodologies',
      relevanceScore: 92,
      topic: 'Academic Research',
      complexity: 65,
    },
    {
      id: 'gle-rec-3',
      title: 'Data Visualization Techniques',
      relevanceScore: 88,
      topic: 'Data Science',
      complexity: 60,
    },
  ];