import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    question: "در یک اتاق تاریک هستی و صدایی عجیب از کمد می‌شنوی. چه می‌کنی؟",
    options: [
      { 
        text: "کمد را باز می‌کنم تا ببینم چه خبر است.", 
        effect: { bravery: 3, leadership: 1 } 
      },
      { 
        text: "جیغ می‌زنم و پشت هم‌تیمی‌ام قایم می‌شوم.", 
        effect: { bravery: -2, logic: -1 } 
      }
    ]
  },
  {
    id: 2,
    question: "تیم گیر کرده و همه دارند همزمان داد می‌زنند. واکنش تو؟",
    options: [
      { 
        text: "داد می‌زنم: «همه ساکت!» و وظایف را تقسیم می‌کنم.", 
        effect: { leadership: 3, logic: 1 } 
      },
      { 
        text: "گوشه‌ای می‌ایستم و سعی می‌کنم قفل را بی‌سروصدا باز کنم.", 
        effect: { logic: 2, observation: 1 } 
      }
    ]
  },
  {
    id: 3,
    question: "یک جعبه پر از دکمه‌های رنگی و سیم‌های عجیب می‌بینی.",
    options: [
      { 
        text: "الگوها را بررسی می‌کنم تا منطق‌اش را پیدا کنم.", 
        effect: { logic: 3 } 
      },
      { 
        text: "همه دکمه‌ها را فشار می‌دهم ببینم چه می‌شود!", 
        effect: { bravery: 1, logic: -2 } // Chaos factor
      }
    ]
  },
  {
    id: 4,
    question: "کلید خروج جایی در اتاق پنهان شده است. چطور می‌گردی؟",
    options: [
      { 
        text: "زیر فرش، پشت تابلوها و لای درز دیوارها را چک می‌کنم.", 
        effect: { observation: 3 } 
      },
      { 
        text: "صبر می‌کنم بقیه پیدا کنند، من حواسم به زامبی‌هاست.", 
        effect: { bravery: 2, observation: -1 } 
      }
    ]
  },
  {
    id: 5,
    question: "یک بازیگر با اره برقی وارد اتاق می‌شود!",
    options: [
      { 
        text: "می‌ایستم و سعی می‌کنم با او صحبت کنم یا مسیرش را سد کنم.", 
        effect: { bravery: 3, leadership: 1 } 
      },
      { 
        text: "چنان می‌دوم که به دیوار می‌خورم.", 
        effect: { bravery: -3 } 
      }
    ]
  },
  {
    id: 6,
    question: "یک معمای ریاضی سخت روی دیوار نوشته شده.",
    options: [
      { 
        text: "کاغذ و قلم برمی‌دارم و سریع حلش می‌کنم.", 
        effect: { logic: 3 } 
      },
      { 
        text: "می‌گویم: «بچه‌ها این با من نیست، من فقط زور بازو دارم.»", 
        effect: { logic: -1, bravery: 1 } 
      }
    ]
  },
  {
    id: 7,
    question: "یک شیء براق کوچک زیر مبل افتاده که به سختی دیده می‌شود.",
    options: [
      { 
        text: "سریع متوجهش می‌شوم و برش می‌دارم.", 
        effect: { observation: 3 } 
      },
      { 
        text: "اصلاً متوجه نمی‌شوم و رویش پا می‌گذارم.", 
        effect: { observation: -2 } 
      }
    ]
  },
  {
    id: 8,
    question: "در لحظه آخر، فقط ۱۰ ثانیه مانده و رمز ۴ رقمی را ندارید.",
    options: [
      { 
        text: "شانسی یک عدد وارد می‌کنم. بادا باد!", 
        effect: { bravery: 1, logic: -1 } 
      },
      { 
        text: "سرنخ‌های قبلی را سریع در ذهنم مرور می‌کنم.", 
        effect: { logic: 2, observation: 1 } 
      }
    ]
  }
];