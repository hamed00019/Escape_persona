
import { Stats, PersonaResult, PersonaType } from '../types';

const personas: Record<PersonaType, PersonaResult> = {
  MASTERMIND: {
    type: 'MASTERMIND',
    title: 'The Mastermind',
    persianTitle: 'مغز متفکر',
    description: 'عاشق معماها و قفل‌ها. وقتی همه جیغ می‌زنند، تو داری عدد پی را محاسبه می‌کنی. بدون تو تیم در اتاق اول گیر می‌کرد.',
    color: 'text-cyan-400',
    iconName: 'Brain',
    aiPrompt: "Fantasy digital art portrait of a Mastermind character in a mystical escape room, surrounded by floating glowing geometric puzzles and ancient runes. Intelligent gaze, blue arcane magic atmosphere, stylized semi-realistic character design, high detail, 8k, masterpiece.",
    recommendedGames: ["اتاق فرار معمایی (Puzzle)", "تم جنایی/کاراگاهی", "فرار از زندان"]
  },
  TANK: {
    type: 'TANK',
    title: 'The Tank',
    persianTitle: 'سپر بلا',
    description: 'نترس و شجاع. تو اول وارد اتاق‌های تاریک می‌شوی. وظیفه تو این است که خوراک زامبی شوی تا بقیه فرار کنند.',
    color: 'text-emerald-500',
    iconName: 'Shield',
    aiPrompt: "Fantasy digital art portrait of a brave Tank hero holding a magical shield, standing firm against darkness in a dungeon-like escape room. Emerald green aura, strong stance, heroic lighting, stylized semi-realistic character design, high detail, 8k, masterpiece.",
    recommendedGames: ["تم ترسناک/اسلشر", "زامبی و بقا", "خانه‌های تسخیر شده"]
  },
  SCREAMER: {
    type: 'SCREAMER',
    title: 'The Screamer',
    persianTitle: 'جیغ‌زن حرفه‌ای',
    description: 'تو سیستم هشدار تیم هستی! هر سایه‌ای که تکان بخورد، با صدای تو همه می‌فهمند. نقش اصلی تو سکته دادن بقیه است.',
    color: 'text-rose-500',
    iconName: 'Ghost',
    aiPrompt: "Fantasy digital art portrait of a spooky Screamer character with a shocked expression, surrounded by cute but creepy spectral ghosts in a haunted escape room. Red dramatic lighting, expressive style, stylized semi-realistic character design, high detail, 8k, masterpiece.",
    recommendedGames: ["تئاتر تعاملی", "تم‌های دلهره‌آور روانی", "پارک وحشت"]
  },
  SCOUT: {
    type: 'SCOUT',
    title: 'The Scout',
    persianTitle: 'جستجوگر',
    description: 'چشمان عقاب داری. کلیدهای مخفی، کدهای ریز روی دیوار و دریچه‌های پنهان فقط توسط تو پیدا می‌شوند.',
    color: 'text-amber-400',
    iconName: 'Eye',
    aiPrompt: "Fantasy digital art portrait of a Scout character using a magical magnifying glass to find glowing hidden clues on an ancient wall. Amber magical dust particles, keen eyes, mystery adventure vibe, stylized semi-realistic character design, high detail, 8k, masterpiece.",
    recommendedGames: ["تم ماجراجویی/اکتشاف", "سرقت از بانک", "مقبره‌های باستانی"]
  },
  CHAOS: {
    type: 'CHAOS',
    title: 'The Chaos',
    persianTitle: 'آشوب‌گر',
    description: 'دست نزن؟ دقیقاً به همان دست می‌زنی. دکمه قرمز؟ فشارش می‌دهی. تو غیرقابل پیش‌بینی‌ترین عضو گروهی.',
    color: 'text-fuchsia-500',
    iconName: 'Zap',
    aiPrompt: "Fantasy digital art portrait of a Chaotic character playfully pressing a forbidden glowing button, triggering a burst of wild pink and purple magic sparks. Energetic pose, mischievous grin, stylized semi-realistic character design, high detail, 8k, masterpiece.",
    recommendedGames: ["تم‌های فان و کمدی", "بازی‌های گروهی بزرگ", "تم‌های تخیلی/فضایی"]
  }
};

export const calculatePersona = (stats: Stats): PersonaResult => {
  const { bravery, logic, observation, leadership } = stats;

  // Logic for determining persona
  if (bravery <= -2) return personas.SCREAMER;
  if (logic >= 5 && logic > bravery) return personas.MASTERMIND;
  if (observation >= 5 && observation > logic) return personas.SCOUT;
  if (bravery >= 4 && leadership >= 2) return personas.TANK;
  
  // Fallback/Mixed stats usually means Chaos or Mastermind depending on bias
  if (Math.abs(bravery) < 2 && Math.abs(logic) < 2) return personas.CHAOS;

  // Default strongest trait check
  const maxStat = Math.max(bravery, logic, observation);
  
  if (maxStat === logic) return personas.MASTERMIND;
  if (maxStat === observation) return personas.SCOUT;
  if (maxStat === bravery) return personas.TANK;

  return personas.CHAOS;
};
