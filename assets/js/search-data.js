// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "Projects",
          description: "Selected research and software projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-received-the-best-paper-presentation-award-at-iemek-2024-for-the-eo-ir-drone-object-detection-work",
          title: 'Received the Best Paper Presentation Award at IEMEK 2024 for the EO/IR drone...',
          description: "",
          section: "News",},{id: "news-published-a-first-author-journal-paper-on-vehicle-speed-estimation-and-accident-risk-classification",
          title: 'Published a first-author journal paper on vehicle speed estimation and accident-risk classification.',
          description: "",
          section: "News",},{id: "news-received-the-excellence-award-from-the-dsc-platform-university-for-completing-its-curriculum-with-distinction-and-growing-as-a-regional-talent-in-future-mobility",
          title: 'Received the Excellence Award from the DSC Platform University for completing its curriculum...',
          description: "",
          section: "News",},{id: "news-grit-edu-lms-cms-launched-for-academy-operations",
          title: 'GRIT Edu LMS/CMS launched for academy operations.',
          description: "",
          section: "News",},{id: "news-advanced-to-the-finals-of-the-sk-hynix-ai-hackathon-2026-individual-contest-coex",
          title: 'Advanced to the finals of the SK hynix AI Hackathon 2026 (individual contest,...',
          description: "",
          section: "News",},{id: "projects-real-time-eo-ir-drone-object-detection",
          title: 'Real-Time EO/IR Drone Object Detection',
          description: "Real-time drone object detection using EO/IR sensors with private 5G transmission.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/eo-ir-drone-object-detection/";
            },},{id: "projects-grit-edu-lms-cms",
          title: 'GRIT Edu LMS/CMS',
          description: "An academy website and management system for online courses, offline classes, users, and public content.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/grit-edu-lms/";
            },},{id: "projects-jejuoneeyes-jeju-data-analysis-agent",
          title: 'JeJuOneEyes - Jeju Data Analysis Agent',
          description: "A natural-language data exploration agent for Jeju public data, built as a one-day team contest MVP.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/jejuoneyes/";
            },},{id: "projects-ridesure-bus-boarding-likelihood",
          title: 'RideSure — Bus Boarding Likelihood',
          description: "A transit prototype that judges boarding likelihood from historical bus load data and compares alternative routes.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/ridesure/";
            },},{id: "projects-teleguiderag-telecom-technology-guide",
          title: 'TeleGuideRAG — Telecom Technology Guide',
          description: "A RAG service that explains networking and telecom technologies with cited sources, side-by-side comparisons, and device connection checklists.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/teleguiderag/";
            },},{id: "projects-vitas-vision-ai-traffic-accident-prevention",
          title: 'VITAS — Vision AI Traffic Accident Prevention',
          description: "A vision-based intersection system for vehicle detection, speed estimation, and accident-risk classification.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/vitas/";
            },},{id: "projects-youtube-live-transcript-stt",
          title: 'YouTube Live Transcript STT',
          description: "A Chrome extension that transcribes YouTube live audio in real time with a local Whisper server, even when no captions are available.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/youtube-live-stt/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%73%67%68%6E%30%33%33%30@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/ksh0330", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/sghnkim", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
