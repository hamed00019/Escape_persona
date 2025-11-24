import { Stats, PersonaResult, PersonaType } from '../types';

export const personas: Record<PersonaType, PersonaResult> = {
  MASTERMIND: {
    type: 'MASTERMIND',
    title: 'The Mastermind',
    persianTitle: 'مغز متفکر',
    description: 'شما کسی هستید که الگوها را می‌بینید، نه آشوب را. در اتاق فرار، شما قفل‌ها را باز می‌کنید در حالی که بقیه هنوز دارند صورت‌مسئله را می‌خوانند. خونسرد، تحلیل‌گر و کمی ترسناک برای کسانی که چیزی برای پنهان کردن دارند.',
    color: 'text-cyan-400',
    iconName: 'Brain',
    aiPrompt: 'A hyper-realistic cinematic portrait of a genius mastermind in a high-tech escape room, analyzing complex holographic puzzles, cool blue lighting, intense focus, cyberpunk aesthetic, 8k resolution.',
    videoPrompt: 'Cinematic shot of a genius mastermind solving a holographic puzzle, blue lighting, intense focus, slow motion.',
    shareText: 'من در اتاق فرار "مغز متفکر" هستم! 🧠🔓',
    voicePrompt: 'A calm, calculated, and slightly arrogant voice, like Sherlock Holmes. Intelligent and precise.',
    recommendedGames: [
      { title: 'اتاق فرار فرار از زندان', url: 'https://escaperoom.ir/game/%d8%a7%d8%aa%d8%a7%d9%82-%d9%81%d8%b1%d8%a7%d8%b1-%d9%81%d8%b1%d8%a7%d8%b1-%d8%a7%d8%b2-%d8%b2%d9%86%d8%af%d8%a7%d9%86-2/' },
      { title: 'اتاق فرار سرقت بزرگ', url: 'https://escaperoom.ir/game/%d8%a7%d8%aa%d8%a7%d9%82-%d9%81%d8%b1%d8%a7%d8%b1-%d8%b3%d8%b1%d9%82%d8%aa-%d8%a8%d8%b2%d8%b1%da%af/' }
    ],
    videoUrl: '/videos/mastermind.mp4',
    rarity: '۸٪',
    bestMatch: ['TANK', 'SCOUT'],
    worstMatch: ['CHAOS'],
    motto: 'هیچ قفلی بی‌کلید نیست.',
    survivalRate: '۹۸٪'
  },
  TANK: {
    type: 'TANK',
    title: 'The Tank',
    persianTitle: 'سپر بلا (تانک)',
    description: 'شجاعت شما افسانه‌ای است. وقتی چراغ‌ها خاموش می‌شوند، شما جلو می‌روید. شما از تیم محافظت می‌کنید و کارهای فیزیکی سخت را انجام می‌دهید. بدون شما، تیم در اولین اتاق از ترس فلج می‌شد.',
    color: 'text-emerald-500',
    iconName: 'Shield',
    aiPrompt: 'A hyper-realistic cinematic portrait of a brave protector standing in front of a dark scary corridor, holding a flashlight, strong stance, protective gear, warm rim lighting, heroic atmosphere, 8k resolution.',
    videoPrompt: 'Cinematic shot of a brave hero walking into a dark corridor with a flashlight, protecting others, strong and determined.',
    shareText: 'من "سپر بلا" تیم هستم! 🛡️💪',
    voicePrompt: 'A deep, strong, and reassuring voice. Like a military commander or a protective big brother.',
    recommendedGames: [
      { title: 'اتاق فرار احضار', url: 'https://escaperoom.ir/game/%d8%a7%d8%aa%d8%a7%d9%82-%d9%81%d8%b1%d8%a7%d8%b1-%d8%a7%d8%ad%d8%b6%d8%a7%d8%b1/' },
      { title: 'اتاق فرار طاعون', url: 'https://escaperoom.ir/game/%d8%a7%d8%aa%d8%a7%d9%82-%d9%81%d8%b1%d8%a7%d8%b1-%d8%b7%d8%a7%d8%b9%d9%88%d9%86/' }
    ],
    videoUrl: '/videos/tank.mp4',
    rarity: '۱۵٪',
    bestMatch: ['MASTERMIND', 'MEDIUM'],
    worstMatch: ['SCREAMER'],
    motto: 'نترس، من جلوتم.',
    survivalRate: '۹۰٪'
  },
  SCREAMER: {
    type: 'SCREAMER',
    title: 'The Screamer',
    persianTitle: 'جیغ‌زن حرفه‌ای',
    description: 'شما سیستم هشدار تیم هستید! هر سایه‌ای که تکان بخورد، با صدای شما همه می‌فهمند. شاید معما حل نکنید، اما هیجان بازی را ۱۰۰ برابر می‌کنید. نقش اصلی شما سکته دادن بقیه است.',
    color: 'text-rose-500',
    iconName: 'Ghost',
    aiPrompt: 'A hyper-realistic cinematic portrait of a terrified person screaming in a haunted house, expressive face, dynamic motion blur, dramatic horror lighting, spooky background, 8k resolution.',
    videoPrompt: 'Close up of a terrified face screaming in reaction to a jump scare, dramatic lighting, horror movie style.',
    shareText: 'من "جیغ‌زن" گروهم! 😱🔊',
    voicePrompt: 'A high-pitched, shaky, and nervous voice. Fast talker, easily startled.',
    recommendedGames: [
      { title: 'اتاق فرار کلبه وحشت', url: 'https://escaperoom.ir/game/%d8%a7%d8%aa%d8%a7%d9%82-%d9%81%d8%b1%d8%a7%d8%b1-%da%a9%d9%84%d8%a8%d9%87-%d9%88%d8%ad%d8%b4%d8%aa/' },
      { title: 'اتاق فرار جیغ', url: 'https://escaperoom.ir/game/%d8%a7%d8%aa%d8%a7%d9%82-%d9%81%d8%b1%d8%a7%d8%b1-%d8%ac%db%8c%d8%ba/' }
    ],
    videoUrl: '/videos/screamer.mp4',
    rarity: '۲۰٪',
    bestMatch: ['TANK', 'COMMANDER'],
    worstMatch: ['MASTERMIND'],
    motto: 'اون چی بود؟!؟!؟',
    survivalRate: '۱۲٪'
  },
  SCOUT: {
    type: 'SCOUT',
    title: 'The Scout',
    persianTitle: 'کاوشگر (عقاب)',
    description: 'چشم‌های شما چیزی را از قلم نمی‌اندازد. کلید زیر فرش؟ کد روی سقف؟ شما همه را پیدا می‌کنید. شما جزئی‌نگرترین عضو تیم هستید و بدون شما، تیم ساعت‌ها دنبال سرنخ می‌گشت.',
    color: 'text-amber-400',
    iconName: 'Eye',
    aiPrompt: 'A hyper-realistic cinematic portrait of an observant detective examining a clue with a magnifying glass, dusty attic setting, shafts of light, detailed textures, mystery atmosphere, 8k resolution.',
    videoPrompt: 'Cinematic shot of a detective finding a hidden key under a dusty book, focus pull, mysterious atmosphere.',
    shareText: 'من "عقاب" تیمم! 🦅🔍',
    voicePrompt: 'A sharp, quick, and energetic voice. Always pointing things out.',
    recommendedGames: [
      { title: 'اتاق فرار شرلوک', url: 'https://escaperoom.ir/game/%d8%a7%d8%aa%d8%a7%d9%82-%d9%81%d8%b1%d8%a7%d8%b1-%d8%b4%d8%b1%d9%84%d9%88%da%a9/' },
      { title: 'اتاق فرار راز داوینچی', url: 'https://escaperoom.ir/game/%d8%a7%d8%aa%d8%a7%d9%82-%d9%81%d8%b1%d8%a7%d8%b1-%d8%b1%d8%a7%d8%b2-%d8%af%d8%a7%d9%88%db%8c%d9%86%da%8c%db%8c/' }
    ],
    videoUrl: '/videos/scout.mp4',
    rarity: '۱۲٪',
    bestMatch: ['MASTERMIND', 'ENGINEER'],
    worstMatch: ['CHAOS'],
    motto: 'یه چیزی اینجا سر جاش نیست...',
    survivalRate: '۸۵٪'
  },
  CHAOS: {
    type: 'CHAOS',
    title: 'The Chaos Agent',
    persianTitle: 'عامل آشوب',
    description: 'شما دکمه‌ها را فشار می‌دهید تا ببینید چه می‌شود. قوانین؟ کدام قوانین؟ شما غیرقابل پیش‌بینی هستید و گاهی اوقات شانسی معما را حل می‌کنید (یا همه چیز را خراب می‌کنید). بازی با شما هرگز خسته‌کننده نیست.',
    color: 'text-fuchsia-500',
    iconName: 'Zap',
    aiPrompt: 'A hyper-realistic cinematic portrait of a chaotic character laughing while pressing a big red button, sparks flying, dynamic angle, vibrant neon colors, mischievous expression, 8k resolution.',
    videoPrompt: 'Action shot of a character randomly pulling levers and pushing buttons, sparks flying, chaotic energy.',
    shareText: 'من "عامل آشوب" هستم! 😈💥',
    voicePrompt: 'A playful, mischievous, and slightly crazy voice. Like the Joker but less evil.',
    recommendedGames: [
      { title: 'اتاق فرار دیوانه', url: 'https://escaperoom.ir/game/%d8%a7%d8%aa%d8%a7%d9%82-%d9%81%d8%b1%d8%a7%d8%b1-%d8%af%db%8c%d9%88%d8%a7%d9%86%d9%87/' },
      { title: 'اتاق فرار انفجار', url: 'https://escaperoom.ir/game/%d8%a7%d8%aa%d8%a7%d9%82-%d9%81%d8%b1%d8%a7%d8%b1-%d8%a7%d9%86%d9%81%d8%ac%d8%a7%d8%b1/' }
    ],
    videoUrl: '/videos/chaos.mp4',
    rarity: '۵٪',
    bestMatch: ['MEDIUM', 'SCREAMER'],
    worstMatch: ['COMMANDER', 'MASTERMIND'],
    motto: 'بذار ببینیم چی میشه!',
    survivalRate: '۵۰-۵۰'
  },
  COMMANDER: {
    type: 'COMMANDER',
    title: 'The Commander',
    persianTitle: 'فرمانده',
    description: 'شما گروه را مدیریت می‌کنید. وقتی همه گیج شده‌اند، شما وظایف را تقسیم می‌کنید. "تو بگرد، تو کد بزن، تو جیغ نزن!" شما چسبی هستید که تیم را کنار هم نگه می‌دارد.',
    color: 'text-indigo-500',
    iconName: 'Shield',
    aiPrompt: 'A hyper-realistic cinematic portrait of a charismatic leader pointing forward, tactical gear, determined expression, team in background, dramatic lighting, leadership vibe, 8k resolution.',
    videoPrompt: 'Cinematic shot of a leader giving instructions to a team, pointing at a map, confident and authoritative.',
    shareText: 'من "فرمانده" تیم هستم! 🫡📋',
    voicePrompt: 'A clear, authoritative, and confident voice. Natural leader.',
    recommendedGames: [
      { title: 'اتاق فرار عملیات غیرممکن', url: 'https://escaperoom.ir/game/%d8%a7%d8%aa%d8%a7%d9%82-%d9%81%d8%b1%d8%a7%d8%b1-%d8%b9%d9%85%d9%84%db%8c%d8%a7%d8%aa-%d8%ba%db%8c%d8%b1%d9%85%d9%85%da%a9%d9%86/' },
      { title: 'اتاق فرار سرقت بانک', url: 'https://escaperoom.ir/game/%d8%a7%d8%aa%d8%a7%d9%82-%d9%81%d8%b1%d8%a7%d8%b1-%d8%b3%d8%b1%d9%82%d8%aa-%d8%a8%d8%a7%d9%86%da%a9/' }
    ],
    videoUrl: '/videos/commander.mp4',
    rarity: '۱۰٪',
    bestMatch: ['SCREAMER', 'SCOUT'],
    worstMatch: ['CHAOS'],
    motto: 'همه گوش کنید، نقشه اینه...',
    survivalRate: '۹۵٪'
  },
  ENGINEER: {
    type: 'ENGINEER',
    title: 'The Engineer',
    persianTitle: 'مهندس (آچار فرانسه)',
    description: 'شما عاشق مکانیزم‌ها هستید. سیم‌ها، چرخ‌دنده‌ها و قفل‌های عجیب و غریب تخصص شماست. وقتی بقیه دنبال کلید می‌گردند، شما قفل را باز می‌کنید.',
    color: 'text-blue-500',
    iconName: 'Brain',
    aiPrompt: 'A hyper-realistic cinematic portrait of an engineer working on a complex mechanical lock, sparks, steampunk vibes, goggles, intense focus on hands, detailed machinery, 8k resolution.',
    videoPrompt: 'Close up of hands working on a complex mechanical lock, gears turning, unlocking mechanism.',
    shareText: 'من "مهندس" تیمم! 🛠️⚙️',
    voicePrompt: 'A thoughtful, curious voice. Uses technical terms.',
    recommendedGames: [
      { title: 'اتاق فرار راکتور', url: 'https://escaperoom.ir/game/%d8%a7%d8%aa%d8%a7%d9%82-%d9%81%d8%b1%d8%a7%d8%b1-%d8%b1%d8%a7%da%a9%d8%aa%d9%88%d8%b1/' },
      { title: 'اتاق فرار آزمایشگاه', url: 'https://escaperoom.ir/game/%d8%a7%d8%aa%d8%a7%d9%82-%d9%81%d8%b1%d8%a7%d8%b1-%d8%a2%d8%b2%d9%85%d8%a7%db%8c%d8%b4%da%af%d8%a7%d9%87/' }
    ],
    videoUrl: '/videos/engineer.mp4',
    rarity: '۱۸٪',
    bestMatch: ['SCOUT', 'MASTERMIND'],
    worstMatch: ['MEDIUM'],
    motto: 'این چطوری کار می‌کنه؟',
    survivalRate: '۸۸٪'
  },
  MEDIUM: {
    type: 'MEDIUM',
    title: 'The Medium',
    persianTitle: 'مدیوم (احضارگر)',
    description: 'شما ارتباط خاصی با فضای بازی دارید. حس ششم شما قوی است و چیزهایی را حس می‌کنید که بقیه نمی‌بینند. شما با داستان بازی یکی می‌شوید.',
    color: 'text-purple-500',
    iconName: 'Ghost',
    aiPrompt: 'A hyper-realistic cinematic portrait of a mystic medium touching a glowing spirit board, ethereal atmosphere, purple mist, mysterious eyes, supernatural vibes, 8k resolution.',
    videoPrompt: 'Cinematic shot of a medium sensing a presence, looking around slowly, ethereal lighting, mysterious.',
    shareText: 'من "مدیوم" هستم! 🔮👻',
    voicePrompt: 'A whispery, mysterious, and slow voice. Spooky and atmospheric.',
    recommendedGames: [
      { title: 'اتاق فرار جن‌گیر', url: 'https://escaperoom.ir/game/%d8%a7%d8%aa%d8%a7%d9%82-%d9%81%d8%b1%d8%a7%d8%b1-%d8%ac%d9%86-%da%af%db%8c%d8%b1/' },
      { title: 'اتاق فرار آنابل', url: 'https://escaperoom.ir/game/%d8%a7%d8%aa%d8%a7%d9%82-%d9%81%d8%b1%d8%a7%d8%b1-%d8%a2%d9%86%d8%a7%d8%a8%d9%84/' }
    ],
    videoUrl: '/videos/medium.mp4',
    rarity: '۷٪',
    bestMatch: ['TANK', 'CHAOS'],
    worstMatch: ['ENGINEER'],
    motto: 'حس می‌کنم یکی اینجاست...',
    survivalRate: '۶۶٪'
  }
};

export const calculatePersona = (stats: Stats): PersonaResult => {
  const { bravery, logic, observation, leadership } = stats;
  const totalEngagement = Math.abs(bravery) + Math.abs(logic) + Math.abs(observation) + Math.abs(leadership);

  // SCREAMER - scared
  if (bravery <= -3) return personas.SCREAMER;

  // CHAOS - balanced/random
  if (totalEngagement < 6) return personas.CHAOS;

  // High combinations
  if (leadership >= 4 && logic >= 3) return personas.COMMANDER;
  if (logic >= 4 && observation >= 3) return personas.ENGINEER;
  if (observation >= 4 && bravery >= 3) return personas.MEDIUM;

  // Primary dominance
  const maxStat = Math.max(bravery, logic, observation, leadership);

  if (logic === maxStat && logic >= 5) return personas.MASTERMIND;
  if (observation === maxStat && observation >= 5) return personas.SCOUT;
  if (bravery === maxStat && bravery >= 5) return personas.TANK;
  if (leadership === maxStat && leadership >= 4) return personas.COMMANDER;

  // Medium tier
  if (logic >= 3 && logic > observation) return personas.MASTERMIND;
  if (observation >= 3) return personas.SCOUT;
  if (bravery >= 3) return personas.TANK;
  if (leadership >= 3) return personas.COMMANDER;

  // Paths
  if (logic >= 2 && observation >= 2) return personas.ENGINEER;
  if (observation >= 2 && bravery >= 1) return personas.MEDIUM;

  // Fallback
  if (maxStat === leadership) return personas.COMMANDER;
  if (maxStat === logic) return personas.MASTERMIND;
  if (maxStat === observation) return personas.SCOUT;
  if (maxStat === bravery) return personas.TANK;

  return personas.CHAOS;
};
