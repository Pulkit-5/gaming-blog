// Sample data for articles
export const articles = [
  {
    id: 1,
    title: "Starfield Breaks Records with 10 Million Players in First Week",
    excerpt: "Bethesda's highly anticipated space RPG is off to a stellar start with incredible player numbers.",
    content: "Bethesda's latest release has shattered expectations with over 10 million players exploring the cosmos in the first week of release. The game, which has been in development for over a decade, represents the studio's first new IP in 25 years...",
    image: "https://placehold.co/600x400?text=Starfield",
    category: "News",
    author: "Alex Johnson",
    date: "Sept 15, 2023",
    featured: true
  },
  {
    id: 2,
    title: "Review: The Latest PS5 Pro - Worth the Upgrade?",
    excerpt: "We take an in-depth look at Sony's mid-generation console refresh and whether it deserves your hard-earned cash.",
    content: "The PS5 Pro represents Sony's attempt to extend the lifecycle of the current console generation with improved hardware specifications. Featuring enhanced ray-tracing capabilities and improved frame rates across the board...",
    image: "https://placehold.co/600x400?text=PS5+Pro",
    category: "Reviews",
    author: "Samantha Lee",
    date: "Sept 12, 2023",
    featured: true
  },
  {
    id: 3,
    title: "Upcoming Indie Games You Shouldn't Miss This Fall",
    excerpt: "From puzzle platformers to narrative adventures, these indie titles are poised to make a big impact.",
    content: "While AAA releases tend to dominate the headlines, the indie scene continues to deliver some of the most innovative and creative experiences in gaming. This fall's lineup is particularly impressive...",
    image: "https://placehold.co/600x400?text=Indie+Games",
    category: "Features",
    author: "Marcus Green",
    date: "Sept 10, 2023",
    featured: true
  },
  {
    id: 4,
    title: "E-Sports Tournament Breaks Viewership Records",
    excerpt: "The International Dota 2 Championship sees unprecedented global audience numbers.",
    content: "The competitive gaming scene continues to grow as this year's International tournament for Dota 2 broke all previous viewership records. With over 5 million concurrent viewers at its peak...",
    image: "https://placehold.co/600x400?text=Esports",
    category: "Esports",
    author: "Leila Wang",
    date: "Sept 8, 2023",
    featured: false
  },
  {
    id: 5,
    title: "Next-Gen Graphics Cards Announced: What You Need to Know",
    excerpt: "Industry giants reveal their newest GPU architectures promising significant performance leaps.",
    content: "The next generation of PC gaming is about to get a serious boost with the announcement of new graphics card lineups from industry leaders. Initial benchmarks suggest performance improvements of up to 70% compared to current generation cards...",
    image: "https://placehold.co/600x400?text=Graphics+Cards",
    category: "Hardware",
    author: "Ryan Chen",
    date: "Sept 5, 2023",
    featured: false
  },
  {
    id: 6,
    title: "Classic RPG Series Getting Modern Remake",
    excerpt: "Beloved fantasy RPG franchise from the early 2000s set for a complete overhaul with modern graphics and gameplay.",
    content: "Fans of classic RPGs have reason to celebrate as developer StudioName has announced a complete remake of the beloved fantasy series that defined the early 2000s gaming landscape. Using the latest Unreal Engine technology...",
    image: "https://placehold.co/600x400?text=RPG+Remake",
    category: "News",
    author: "Diana Rodriguez",
    date: "Sept 3, 2023",
    featured: false
  }
];

// Helper functions to get specific article subsets
export const getFeaturedArticles = () => articles.filter(article => article.featured);
export const getRecentArticles = (count = 3) => [...articles].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, count);
export const getArticleById = (id) => articles.find(article => article.id === parseInt(id));
export const getArticlesByCategory = (category) => articles.filter(article => article.category === category);

export const featuredArticles = getFeaturedArticles();
export const recentArticles = getRecentArticles(); 