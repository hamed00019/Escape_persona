import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    question: "وارد یک اتاق تاریک و نمور می‌شوید. صدای چک‌چک آب و ناله‌ای خفیف می‌آید. اولین حرکت؟",
    options: [
      {
        text: "چراغ‌قوه را روشن می‌کنم و جلو می‌روم. بقیه پشت سر من!",
        effect: { bravery: 3, leadership: 2 }
      },
      {
        text: "به دیوار می‌چسبم و می‌گویم: «بچه‌ها اول شما برید...»",
        effect: { bravery: -2, observation: 1 }
      }
    ]
  },
  {
    id: 2,
    question: "تیم سر یک قفل عددی گیر کرده و هر کس نظری می‌دهد. کلافه شده‌اید.",
    options: [
      {
        text: "داد می‌زنم: «ساکت!» و نظرات را یکی‌یکی بررسی می‌کنم.",
        effect: { leadership: 3, logic: 1 }
      },
      {
        text: "بی‌سروصدا می‌روم سراغ کشوها تا شاید کلیدی پیدا کنم.",
        effect: { observation: 2, logic: 1 }
      }
    ]
  },
  {
    id: 3,
    question: "یک دستگاه عجیب با کلی سیم و چرخ‌دنده روی میز است. به نظر خطرناک می‌آید.",
    options: [
      {
        text: "مسیر سیم‌ها را دنبال می‌کنم تا بفهمم چطور کار می‌کند.",
        effect: { logic: 2, observation: 2 } // Engineer vibe
      },
      {
        text: "دکمه قرمز بزرگ را فشار می‌دهم! یا درست می‌شود یا منفجر!",
        effect: { bravery: 1, logic: -2 } // Chaos vibe
      }
    ]
  },
  {
    id: 4,
    question: "یک نامه قدیمی و خون‌آلود روی میز است که داستان خانه را روایت می‌کند.",
    options: [
      {
        text: "سریع می‌خوانمش تا بفهمم روح سرگردان چه می‌خواهد.",
        effect: { observation: 2, bravery: 1 } // Medium vibe
      },
      {
        text: "ولش کن، دنبال عدد یا رمز داخل متن می‌گردم.",
        effect: { logic: 2, observation: -1 }
      }
    ]
  },
  {
    id: 5,
    question: "ناگهان برق می‌رود و یک بازیگر با اره برقی روشن وارد می‌شود!",
    options: [
      {
        text: "می‌ایستم و سعی می‌کنم حواسش را پرت کنم تا بقیه فرار کنند.",
        effect: { bravery: 3, leadership: 1 } // Tank
      },
      {
        text: "جیغ می‌زنم و به سمت نزدیک‌ترین کمد شیرجه می‌زنم.",
        effect: { bravery: -3 } // Screamer
      }
    ]
  },
  {
    id: 6,
    question: "یک پازل سخت ریاضی روی دیوار است. بقیه دارند ناامید می‌شوند.",
    options: [
      {
        text: "با خونسردی کاغذ و قلم برمی‌دارم و حلش می‌کنم.",
        effect: { logic: 3 } // Mastermind
      },
      {
        text: "می‌گویم: «بچه‌ها بگردید شاید جواب جایی نوشته شده باشد.»",
        effect: { leadership: 1, observation: 2 }
      }
    ]
  },
  {
    id: 7,
    question: "یک دریچه کوچک و تنگ در ارتفاع بالا وجود دارد. کسی باید بالا برود.",
    options: [
      {
        text: "من می‌روم! قلاب می‌گیرم و خودم را بالا می‌کشم.",
        effect: { bravery: 2, observation: 1 } // Scout/Physical
      },
      {
        text: "سبک‌ترین عضو گروه را انتخاب می‌کنم و کمک می‌کنم بالا برود.",
        effect: { leadership: 2, logic: 1 }
      }
    ]
  },
  {
    id: 8,
    question: "در اتاق بعدی، دکوراسیون شبیه یک مراسم احضار روح است. حس عجیبی داری.",
    options: [
      {
        text: "سعی می‌کنم ارتباط اشیاء با هم را درک کنم، شاید پیامی دارند.",
        effect: { observation: 3, logic: 1 } // Medium/Detective
      },
      {
        text: "به هیچ چیز دست نمی‌زنم! فقط دنبال در خروج می‌گردم.",
        effect: { bravery: -1, logic: 1 }
      }
    ]
  },
  {
    id: 9,
    question: "فقط ۵ دقیقه مانده و هنوز رمز آخر را ندارید. استرس بالاست.",
    options: [
      {
        text: "همه سرنخ‌ها را دوباره با هم مرور می‌کنیم. تمرکز کنید!",
        effect: { leadership: 3 }
      },
      {
        text: "شانسی چند عدد را امتحان می‌کنم، شاید گرفت!",
        effect: { logic: -2, bravery: 2 } // Chaos
      }
    ]
  },
  {
    id: 10,
    question: "یک جعبه فیوز خراب روی دیوار است که جرقه می‌زند.",
    options: [
      {
        text: "با ابزاری که پیدا کردم سعی می‌کنم تعمیرش کنم.",
        effect: { logic: 2, observation: 2 } // Engineer
      },
      {
        text: "ازش فاصله می‌گیرم، کار من نیست.",
        effect: { logic: -1 }
      }
    ]
  },
  {
    id: 11,
    question: "صدای گریه بچه از اتاق بغلی می‌آید...",
    options: [
      {
        text: "گوشم را تیز می‌کنم ببینم صدا دقیقاً از کجاست.",
        effect: { observation: 3 } // Scout
      },
      {
        text: "گوش‌هایم را می‌گیرم و بلند بلند آواز می‌خوانم!",
        effect: { bravery: -2 } // Screamer
      }
    ]
  },
  {
    id: 12,
    question: "بازی تمام شد و فرار کردید. اولین جمله تو؟",
    options: [
      {
        text: "«دیدید گفتم اون کد اشتباهه؟ باید به حرف من گوش می‌دادید.»",
        effect: { logic: 2, leadership: -1 } // Mastermind/Arrogant
      },
      {
        text: "«وای خیلی خوش گذشت! بریم یکی دیگه؟»",
        effect: { bravery: 2, leadership: 1 } // Tank/Leader
      }
    ]
  }
];