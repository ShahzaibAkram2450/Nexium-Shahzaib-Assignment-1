export interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
  tags: string[];
}

export const quotes: Quote[] = [
  // Success & Achievement
  {
    id: 1,
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "success",
    tags: ["success", "achievement", "courage", "perseverance", "leadership"]
  },
  {
    id: 2,
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    category: "success",
    tags: ["success", "journey", "beginning", "action", "motivation"]
  },
  {
    id: 3,
    text: "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill",
    category: "success",
    tags: ["success", "failure", "enthusiasm", "perseverance", "resilience"]
  },

  // Motivation & Inspiration
  {
    id: 4,
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "motivation",
    tags: ["motivation", "dreams", "future", "belief", "inspiration"]
  },
  {
    id: 5,
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: "motivation",
    tags: ["motivation", "hope", "darkness", "light", "focus"]
  },
  {
    id: 6,
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "motivation",
    tags: ["motivation", "belief", "confidence", "achievement", "mindset"]
  },

  // Leadership & Growth
  {
    id: 7,
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "leadership",
    tags: ["leadership", "action", "beginning", "execution", "productivity"]
  },
  {
    id: 8,
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    category: "leadership",
    tags: ["leadership", "innovation", "creativity", "distinction", "vision"]
  },
  {
    id: 9,
    text: "A leader is one who knows the way, goes the way, and shows the way.",
    author: "John C. Maxwell",
    category: "leadership",
    tags: ["leadership", "guidance", "direction", "example", "mentorship"]
  },

  // Personal Development
  {
    id: 10,
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    category: "personal",
    tags: ["personal", "authenticity", "individuality", "self", "unique"]
  },
  {
    id: 11,
    text: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson",
    category: "personal",
    tags: ["personal", "choice", "destiny", "decision", "growth"]
  },
  {
    id: 12,
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
    category: "personal",
    tags: ["personal", "inner strength", "past", "future", "self-belief"]
  },

  // Work & Career
  {
    id: 13,
    text: "Choose a job you love, and you will never have to work a day in your life.",
    author: "Confucius",
    category: "work",
    tags: ["work", "career", "passion", "love", "fulfillment"]
  },
  {
    id: 14,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "work",
    tags: ["work", "greatness", "love", "passion", "excellence"]
  },
  {
    id: 15,
    text: "Don't be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller",
    category: "work",
    tags: ["work", "career", "ambition", "risk", "excellence"]
  },

  // Life & Happiness
  {
    id: 16,
    text: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon",
    category: "life",
    tags: ["life", "present", "planning", "mindfulness", "awareness"]
  },
  {
    id: 17,
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    category: "life",
    tags: ["life", "happiness", "purpose", "fulfillment", "joy"]
  },
  {
    id: 18,
    text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    author: "Martin Luther King Jr.",
    category: "life",
    tags: ["life", "friendship", "loyalty", "relationships", "memory"]
  },

  // Change & Growth
  {
    id: 19,
    text: "Be the change that you wish to see in the world.",
    author: "Mahatma Gandhi",
    category: "change",
    tags: ["change", "world", "action", "leadership", "transformation"]
  },
  {
    id: 20,
    text: "Progress is impossible without change, and those who cannot change their minds cannot change anything.",
    author: "George Bernard Shaw",
    category: "change",
    tags: ["change", "progress", "mind", "adaptation", "growth"]
  },
  {
    id: 21,
    text: "The secret of change is to focus all of your energy not on fighting the old, but on building the new.",
    author: "Socrates",
    category: "change",
    tags: ["change", "energy", "focus", "building", "transformation"]
  },

  // Perseverance & Resilience
  {
    id: 22,
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "perseverance",
    tags: ["perseverance", "persistence", "progress", "patience", "determination"]
  },
  {
    id: 23,
    text: "Fall seven times, stand up eight.",
    author: "Japanese Proverb",
    category: "perseverance",
    tags: ["perseverance", "resilience", "failure", "recovery", "strength"]
  },
  {
    id: 24,
    text: "The difference between ordinary and extraordinary is that little extra.",
    author: "Jimmy Johnson",
    category: "perseverance",
    tags: ["perseverance", "extra effort", "extraordinary", "excellence", "dedication"]
  }
];

export const categories = [
  "success",
  "motivation", 
  "leadership",
  "personal",
  "work",
  "life",
  "change",
  "perseverance"
];

export function getQuotesByTopic(topic: string): Quote[] {
  const searchTerm = topic.toLowerCase().trim();
  
  if (!searchTerm) {
    // Return random quotes if no topic specified
    const shuffled = [...quotes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }

  // Filter quotes that match the topic in category or tags
  const matchingQuotes = quotes.filter(quote => 
    quote.category.toLowerCase().includes(searchTerm) ||
    quote.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    quote.text.toLowerCase().includes(searchTerm) ||
    quote.author.toLowerCase().includes(searchTerm)
  );

  // If we have matching quotes, return up to 3
  if (matchingQuotes.length > 0) {
    const shuffled = [...matchingQuotes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }

  // If no matches, return 3 random quotes
  const shuffled = [...quotes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}