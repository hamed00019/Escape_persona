# مستندات جامع پروژه Escape Persona (تحلیل شخصیت اتاق فرار)

این سند به عنوان یک راهنمای جامع برای درک منطق، ساختار، محتوا و اصول طراحی پروژه "Escape Persona" تهیه شده است. این فایل می‌تواند توسط توسعه‌دهندگان یا هوش مصنوعی‌های دیگر برای درک کامل سیستم و تولید محتوای مشابه یا توسعه بیشتر استفاده شود.

---

## ۱. معرفی پروژه (Project Overview)

**Escape Persona** یک وب‌اپلیکیشن تعاملی گیمیفای شده است که با پرسیدن سوالاتی در سناریوی "اتاق فرار"، شخصیت و نقش کاربر را در یک تیم اتاق فرار تحلیل می‌کند.

### اصول کلیدی:
*   **گیمیفیکیشن (Gamification):** استفاده از المان‌های بازی (سوالات سناریو محور، امتیازدهی پنهان، کارت‌های شخصیت، مدال‌ها) برای جذاب کردن پروسه روانشناسی.
*   **سناریو محور:** سوالات به جای پرسش مستقیم (مثلاً "آیا شجاع هستید؟")، کاربر را در موقعیت قرار می‌دهند (مثلاً "برق رفت و صدای اره برقی آمد، چه می‌کنی؟").
*   **طراحی بصری (Visual Design):** استفاده از تم تاریک، نئونی و مرموز برای القای حس اتاق فرار.

---

## ۲. منطق و محاسبات (Logic & Calculations)

سیستم بر اساس ۴ ویژگی اصلی (Stats) امتیازدهی می‌کند:
1.  **شجاعت (Bravery):** میزان نترس بودن و پیش‌قدم شدن در خطر.
2.  **منطق (Logic):** توانایی حل مسئله، پازل‌های ریاضی و تفکر تحلیلی.
3.  **دقت/مشاهده (Observation):** توجه به جزئیات محیطی و پیدا کردن سرنخ‌ها.
4.  **رهبری (Leadership):** توانایی مدیریت تیم و تصمیم‌گیری در بحران.

### سوالات و وزن‌دهی (Questions & Weights)

در مجموع ۱۲ سوال وجود دارد. هر پاسخ به یک یا چند ویژگی امتیاز مثبت یا منفی می‌دهد.

| شناسه | سوال (خلاصه) | گزینه ۱ (اثر) | گزینه ۲ (اثر) |
| :--- | :--- | :--- | :--- |
| 1 | اتاق تاریک و صدای ناله | چراغ‌قوه و حرکت جلو (Bravery +3, Leadership +2) | چسبیدن به دیوار (Bravery -2, Observation +1) |
| 2 | دعوا سر قفل عددی | مدیریت و سکوت (Leadership +3, Logic +1) | گشتن بی‌سروصدا (Observation +2, Logic +1) |
| 3 | دستگاه عجیب با سیم | بررسی مهندسی (Logic +2, Observation +2) | فشار دکمه قرمز (Bravery +1, Logic -2) |
| 4 | نامه خون‌آلود | خواندن سریع (Observation +2, Bravery +1) | گشتن دنبال عدد (Logic +2, Observation -1) |
| 5 | حمله با اره برقی | پرت کردن حواس (Bravery +3, Leadership +1) | جیغ و فرار (Bravery -3) |
| 6 | پازل سخت ریاضی | حل با کاغذ و قلم (Logic +3) | واگذاری به تیم (Leadership +1, Observation +2) |
| 7 | دریچه تنگ در ارتفاع | رفتن خود (Bravery +2, Observation +1) | فرستادن سبک‌وزن (Leadership +2, Logic +1) |
| 8 | دکوراسیون احضار روح | درک ارتباط اشیاء (Observation +3, Logic +1) | دست نزدن و فرار (Bravery -1, Logic +1) |
| 9 | ۵ دقیقه مانده و استرس | مرور سرنخ‌ها (Leadership +3) | امتحان شانسی (Logic -2, Bravery +2) |
| 10 | جعبه فیوز خراب | تعمیر کردن (Logic +2, Observation +2) | فاصله گرفتن (Logic -1) |
| 11 | صدای گریه بچه | گوش تیز کردن (Observation +3) | آواز خواندن (Bravery -2) |
| 12 | پایان بازی | "دیدید گفتم؟" (Logic +2, Leadership -1) | "خوش گذشت!" (Bravery +2, Leadership +1) |

### الگوریتم محاسبه شخصیت (Persona Algorithm)

تابع `calculatePersona` در فایل `utils/calculatePersona.ts` مسئول تعیین شخصیت نهایی است. اولویت‌بندی به شرح زیر است:

1.  **SCREAMER (جیغ‌زن):** اگر `Bravery <= -3`. (ترس بر همه چیز غلبه دارد).
2.  **CHAOS (آشوبگر):** اگر مجموع امتیازات درگیری (`Total Engagement`) کمتر از ۶ باشد. (بازیکن منفعل یا بی‌هدف).
3.  **ترکیبات خاص (Hybrids):**
    *   `COMMANDER`: اگر `Leadership >= 4` و `Logic >= 3`.
    *   `ENGINEER`: اگر `Logic >= 4` و `Observation >= 3`.
    *   `MEDIUM`: اگر `Observation >= 4` و `Bravery >= 3`.
4.  **تسلط تک ویژگی (Dominant Stat):** بالاترین امتیاز بین ۴ ویژگی، شخصیت را تعیین می‌کند (اگر بالای حد نصاب ۵ باشد).
5.  **لایه‌های میانی و فال‌بک:** اگر هیچکدام نبود، بر اساس بالاترین امتیاز نسبی تصمیم‌گیری می‌شود.

---

## ۳. شخصیت‌ها (Personas)

در حال حاضر ۸ کهن‌الگو (Archetype) تعریف شده است.

### 1. مغز متفکر (The Mastermind)
*   **ویژگی بارز:** منطق بالا.
*   **توصیف:** حلال پازل‌ها، خونسرد، تحلیل‌گر.
*   **رنگ:** Cyan (آبی روشن).
*   **آیکون:** Brain.
*   **AI Prompt:** "A hyper-realistic cinematic portrait of a genius mastermind in a high-tech escape room, analyzing complex holographic puzzles, cool blue lighting, intense focus, cyberpunk aesthetic, 8k resolution."

### 2. سپر بلا / تانک (The Tank)
*   **ویژگی بارز:** شجاعت بالا.
*   **توصیف:** محافظ تیم، پیش‌قدم در تاریکی، انجام کارهای فیزیکی.
*   **رنگ:** Emerald (سبز زمردی).
*   **آیکون:** Shield.
*   **AI Prompt:** "A hyper-realistic cinematic portrait of a brave protector standing in front of a dark scary corridor, holding a flashlight, strong stance, protective gear, warm rim lighting, heroic atmosphere, 8k resolution."

### 3. جیغ‌زن حرفه‌ای (The Screamer)
*   **ویژگی بارز:** شجاعت بسیار پایین.
*   **توصیف:** سیستم هشدار تیم، ترسو، ایجاد هیجان با جیغ زدن.
*   **رنگ:** Rose (صورتی/قرمز).
*   **آیکون:** Ghost.
*   **AI Prompt:** "A hyper-realistic cinematic portrait of a terrified person screaming in a haunted house, expressive face, dynamic motion blur, dramatic horror lighting, spooky background, 8k resolution."

### 4. کاوشگر / عقاب (The Scout)
*   **ویژگی بارز:** دقت/مشاهده بالا.
*   **توصیف:** پیدا کننده کلیدها و سرنخ‌های مخفی، جزئی‌نگر.
*   **رنگ:** Amber (زرد کهربایی).
*   **آیکون:** Eye.
*   **AI Prompt:** "A hyper-realistic cinematic portrait of an observant detective examining a clue with a magnifying glass, dusty attic setting, shafts of light, detailed textures, mystery atmosphere, 8k resolution."

### 5. عامل آشوب (The Chaos Agent)
*   **ویژگی بارز:** غیرقابل پیش‌بینی / منطق پایین یا شانس بالا.
*   **توصیف:** فشار دادن دکمه‌های قرمز، کارهای شانسی، خرابکاری خنده‌دار.
*   **رنگ:** Fuchsia (بنفش روشن).
*   **آیکون:** Zap.
*   **AI Prompt:** "A hyper-realistic cinematic portrait of a chaotic character laughing while pressing a big red button, sparks flying, dynamic angle, vibrant neon colors, mischievous expression, 8k resolution."

### 6. فرمانده (The Commander)
*   **ویژگی بارز:** رهبری بالا.
*   **توصیف:** مدیریت تیم، تقسیم وظایف، چسب نگهدارنده گروه.
*   **رنگ:** Indigo (نیلی).
*   **آیکون:** Shield (یا نشان نظامی).
*   **AI Prompt:** "A hyper-realistic cinematic portrait of a charismatic leader pointing forward, tactical gear, determined expression, team in background, dramatic lighting, leadership vibe, 8k resolution."

### 7. مهندس (The Engineer)
*   **ویژگی بارز:** ترکیب منطق و دقت.
*   **توصیف:** عاشق مکانیزم‌ها، قفل‌های مکانیکی، سیم‌کشی.
*   **رنگ:** Blue (آبی).
*   **آیکون:** Brain/Gear.
*   **AI Prompt:** "A hyper-realistic cinematic portrait of an engineer working on a complex mechanical lock, sparks, steampunk vibes, goggles, intense focus on hands, detailed machinery, 8k resolution."

### 8. مدیوم / احضارگر (The Medium)
*   **ویژگی بارز:** ترکیب دقت و شجاعت (حس ششم).
*   **توصیف:** ارتباط با داستان بازی، حس کردن چیزهای نامرئی.
*   **رنگ:** Purple (بنفش).
*   **آیکون:** Ghost/Crystal Ball.
*   **AI Prompt:** "A hyper-realistic cinematic portrait of a mystic medium touching a glowing spirit board, ethereal atmosphere, purple mist, mysterious eyes, supernatural vibes, 8k resolution."

---

## ۴. رابط کاربری و نمایش (UI & Display)

### نسخه موبایل (Mobile First)
طراحی کاملاً برای موبایل بهینه شده است (`max-w-md` در کانتینر اصلی).
*   **کارت شخصیت:** شبیه کارت‌های بازی‌های RPG طراحی شده. شامل تصویر (تولید شده یا پیش‌فرض)، عنوان، آیکون کلاس، و نوار کمیابی (Rarity).
*   **نمودارها:** از کامپوننت `StatMini` استفاده می‌شود که اعداد را به فارسی (با فونت `Yekan Bakh FaNum`) و به صورت `X/10` نمایش می‌دهد.
*   **بخش هم‌تیمی/دشمن:** به صورت کارت‌های کوچک با تصویر بندانگشتی (Thumbnail) در سمت راست و متن در چپ. کلیک روی آن‌ها یک پاپ‌آپ (Modal) باز می‌کند.

### فونت‌ها
*   اصلی: `Yekan Bakh FaNum` (برای اعداد و متون فارسی).
*   فال‌بک: `Vazirmatn`.

### مدیا (Media)
*   **تصاویر:** در مسیر `/images/[type].png` ذخیره می‌شوند.
*   **ویدیوها:** در مسیر `/videos/[type].mp4` ذخیره می‌شوند.
*   **صدا:** در مسیر `/audio/[type].mp3` ذخیره می‌شوند (توضیحات صوتی شخصیت).

---

## ۵. توسعه آینده (Future Development)

برای توسعه‌دهندگان یا هوش مصنوعی بعدی:
1.  **اضافه کردن شخصیت جدید:**
    *   یک `type` جدید در `types.ts` اضافه کنید.
    *   آبجکت مربوطه را در `utils/calculatePersona.ts` با تمام فیلدها (Prompt, Description, etc) بسازید.
    *   منطق `calculatePersona` را آپدیت کنید تا شرایط رسیدن به این شخصیت را تعریف کنید.
    *   تصویر و ویدیوی مربوطه را در پوشه `public` قرار دهید.

2.  **تغییر سوالات:**
    *   فایل `data/questions.ts` را ویرایش کنید. دقت کنید که `effect` ها تعادل بازی را برهم نزنند (جمع جبری امتیازات خیلی زیاد یا کم نشود).

3.  **تولید محتوا با هوش مصنوعی:**
    *   از پرامپت‌های موجود در بخش ۳ به عنوان الگو (Template) استفاده کنید. برای ویدیو از ابزارهایی مثل Runway یا Kling و برای تصویر از Midjourney یا Flux استفاده کنید.
