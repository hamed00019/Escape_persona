import { Stats, PersonaResult, PersonaType } from '../types';

export const personas: Record<PersonaType, PersonaResult> = {
  MASTERMIND: {
    type: 'MASTERMIND',
    title: 'The Mastermind',
    persianTitle: 'مغز متفکر',
    description: 'تبریک! شما موفق شدید زاویه تابش خورشید رو محاسبه کنید، در حالی که کلید زیر پادری بود. شما همون کسی هستید که ۵۵ دقیقه از وقت بازی رو صرف رمزگشایی از طرح کاغذ دیواری کرد چون فکر می‌کرد «الگوی فیبوناچی» داره. آخرش هم تیم با زور بازوی اون یکی هم‌تیمی نجات پیدا کرد، ولی شما هنوز معتقدی که «تئوری» درست بود.',
    color: 'text-cyan-400',
    iconName: 'Brain',
    aiPrompt: 'Gravity Falls art style, 2D cartoon, flat colors, thick outlines. A stressed genius character with messy hair standing in front of a glass wall covered in complex neon blue math formulas. The character is staring intensely at a simple padlock with confusion. Cyberpunk detective vibe, expressive face, high quality animation style.',
    videoPrompt: 'The character paces back and forth nervously in front of the formulas. They stop, adjust their glasses, look at the padlock, and scratch their head in confusion. 6 second loop.',
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
    motto: 'من حلش کردم (ولی وقت تموم شد)',
    survivalRate: '۹۸٪'
  },
  TANK: {
    type: 'TANK',
    title: 'The Tank',
    persianTitle: 'سپر بلا (تانک)',
    description: 'تنها استراتژی شما در زندگی «کله‌خرابی» است. وقتی در باز نشد، به جای گشتن دنبال کلید، سعی کردی لولاها رو از جا دربیاری. وظیفه اصلیت تو بازی این بود که اول بری تو اتاق تاریک تا اگه جن بود، اول تو رو بخوره. تبریک میگم، شما زنده موندید (احتمالا چون جن‌ها هم ازت ترسیدن).',
    color: 'text-emerald-500',
    iconName: 'Shield',
    aiPrompt: 'Gravity Falls art style, 2D cartoon, flat colors, thick outlines. A big tough character standing heroically in a dark corridor, wearing makeshift armor made of cardboard and duct tape. Holding a tiny flashlight like a weapon. Green atmospheric fog, confident but goofy expression.',
    videoPrompt: 'The character flexes their muscles confidently. A piece of the cardboard armor falls off, they quickly stick it back on and give a thumbs up. 6 second loop.',
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
    motto: 'من نمی‌ترسم (چون نمی‌فهمم)',
    survivalRate: '۹۰٪'
  },
  SCREAMER: {
    type: 'SCREAMER',
    title: 'The Screamer',
    persianTitle: 'جیغ‌زن حرفه‌ای',
    description: 'شما دلیل اصلی ناشنوا شدن هم‌تیمی‌هاتون هستید. سطح کورتیزول خونت از ضریب هوشیت بالاتره. کلاً ۱۰ دقیقه مفید بودی، اونم وقتی که غش کرده بودی و ساکت شدی. اکتور بازی ماسکش رو برداشت و گفت «داداش آروم باش، منم مجیدم»، ولی شما همچنان داشتی جیغ می‌زدی.',
    color: 'text-rose-500',
    iconName: 'Ghost',
    aiPrompt: 'Gravity Falls art style, 2D cartoon, flat colors, thick outlines. Close up of a terrified character screaming, eyes popping out, hands on cheeks. Background is a blurry haunted house with red and pink neon lighting. Sweat drops flying, extremely expressive fear.',
    videoPrompt: 'The character screams and shakes uncontrollably, looking left and right rapidly. The background lights flicker ominously. 6 second loop.',
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
    motto: 'لطفا منو نخورید',
    survivalRate: '۱۲٪'
  },
  SCOUT: {
    type: 'SCOUT',
    title: 'The Scout',
    persianTitle: 'کاوشگر (عقاب)',
    description: 'شما همون کسی هستی که ۵ تا کلید، ۳ تا باتری و یک دست دندون مصنوعی پیدا کرد، گذاشت تو جیبش و یادش رفت به تیم بگه. کل تیم داشت ۲۰ دقیقه دنبال باتری می‌گشت و شما داشتی با دقت بافت کاغذ دیواری رو بررسی می‌کردی. آخر بازی هم با جیب پر از وسایل رفتی خونه.',
    color: 'text-amber-400',
    iconName: 'Eye',
    aiPrompt: 'Gravity Falls art style, 2D cartoon, flat colors, thick outlines. A detective character inspecting a dusty floor with a magnifying glass. Pockets are overflowing with random items like keys, locks, and bones. Amber lighting, dust motes floating, mystery vibe.',
    videoPrompt: 'The character moves the magnifying glass around, inspecting the floor closely. A key falls out of their overflowing pocket, they quickly pick it up and stuff it back in. 6 second loop.',
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
    motto: 'همه چیز مال منه',
    survivalRate: '۸۵٪'
  },
  CHAOS: {
    type: 'CHAOS',
    title: 'The Chaos Agent',
    persianTitle: 'عامل آشوب',
    description: 'چرا دکمه قرمز رو فشار دادی؟ چون قرمز بود! شما کسی هستی که وسط حل معما، فیوز برق رو قطع می‌کنی فقط برای اینکه ببینی چی میشه. گیم‌مسترها عکس شما رو زدن رو دیوار اتاق کنترل با عنوان «تحت تعقیب». تیم شما برنده نشد، ولی قطعا شما بهتون خوش گذشت.',
    color: 'text-fuchsia-500',
    iconName: 'Zap',
    aiPrompt: 'Gravity Falls art style, 2D cartoon, flat colors, thick outlines. A mischievous character with a wide manic grin, hand hovering over a giant red button marked "DO NOT PRESS". Sparks flying, background is chaotic. Vibrant purple and neon colors.',
    videoPrompt: 'The character repeatedly presses the big red button with a laugh. Every time they press it, sparks fly and the background shakes. 6 second loop.',
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
    motto: 'اوه، خراب شد!',
    survivalRate: '۵۰-۵۰'
  },
  COMMANDER: {
    type: 'COMMANDER',
    title: 'The Commander',
    persianTitle: 'فرمانده',
    description: 'شما ۵۰ دقیقه از وقت بازی رو صرف «مدیریت بحران» و تقسیم وظایف کردی و ۱۰ دقیقه آخر رو صرف توجیه اینکه چرا باختیم. در حالی که بقیه داشتن عرق می‌ریختن، شما داشتی با دست‌به‌سینه ایستادن، روحیه‌شون رو تقویت می‌کردی. ممنون رئیس، خیلی کمک کردی!',
    color: 'text-indigo-500',
    iconName: 'Shield',
    aiPrompt: 'Gravity Falls art style, 2D cartoon, flat colors, thick outlines. A character standing on a chair pointing forward dramatically, wearing a bucket as a helmet and holding a broom like a staff. Serious expression, indigo lighting, satirical heroism.',
    videoPrompt: 'The character points forward authoritatively, then crosses their arms and nods approvingly. A map held in their hand flutters in the wind. 6 second loop.',
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
    motto: 'مشکل از استراتژی نبود، از اجرا بود',
    survivalRate: '۹۵٪'
  },
  ENGINEER: {
    type: 'ENGINEER',
    title: 'The Engineer',
    persianTitle: 'مهندس (آچار فرانسه)',
    description: 'چرا رمز رو پیدا کنم وقتی می‌تونم قفل دیجیتال رو هک کنم؟ شما سعی کردی با گیره کاغذ پریز برق رو باز کنی تا «مدارش رو بای‌پس کنی». گیم‌مستر ۳ بار با بلندگو داد زد: «دست نزن مهندس! اون دکوره!». ۹۴٪ از مهندس‌ها به خاطر باز کردن پیچ‌های پنل برق بن شده‌اند.',
    color: 'text-blue-500',
    iconName: 'Brain',
    aiPrompt: 'Gravity Falls art style, 2D cartoon, flat colors, thick outlines. A character tangled in wires, holding a screwdriver and a disassembled electronic lock. Soot on face, hair standing up from electric shock, confused but determined smile. Blue and orange industrial lighting.',
    videoPrompt: 'The character tries to connect two sparking wires. A small explosion of sparks happens, they jump back slightly, then shrug and try again. 6 second loop.',
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
    motto: 'پیچ‌گوشتی داری؟',
    survivalRate: '۸۸٪'
  },
  MEDIUM: {
    type: 'MEDIUM',
    title: 'The Medium',
    persianTitle: 'مدیوم (احضارگر)',
    description: 'شما کلاً تو باغ نبودی. وقتی تیم داشت معما حل می‌کرد، شما داشتی با مانکنِ گوشه اتاق ارتباط برقرار می‌کردی چون «انرژی سنگینی» داشت. یه جا گفتی «حس می‌کنم روح اینجاست»... داداش اون اکتور بود که داشت سیگار می‌کشید.',
    color: 'text-purple-500',
    iconName: 'Ghost',
    aiPrompt: 'Gravity Falls art style, 2D cartoon, flat colors, thick outlines. A character sitting at a seance table holding a candle, eyes rolled back. Surrounded by purple smoke and faint friendly ghosts. Mystical and spooky atmosphere.',
    videoPrompt: 'The character waves their hands over a crystal ball. Objects around them (candle, cards) float up and down gently in the purple mist. 6 second loop.',
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
    motto: 'من می‌بینم (چیزایی که نیست)',
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
