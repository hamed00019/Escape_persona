# Escape Persona - AI-Powered Escape Room Personality Test

A gamified web app that analyzes your escape room persona using scenario-based questions.

## Features
- **Scenario-Based Quiz:** 12 immersive questions to determine your role in an escape room team.
- **8 Unique Personas:** From "The Mastermind" to "The Screamer", each with unique traits and descriptions.
- **Viral Result Screen:** Designed for Instagram sharing with "My Disaster Team" challenge.
- **AI Integration:** Prompts ready for generating cartoon avatars (Gravity Falls style).
- **User Authentication:** Phone number verification via Kavenegar API.
- **Database:** User data storage using Supabase (PostgreSQL).

## Prerequisites
- Node.js (v16 or higher)

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   *(Note: Kavenegar API Key is currently handled in `utils/kavenegar.ts`)*

3. **Run the app:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Admin Scripts
- **Database Management:** Run `npx ts-node scripts/dbManager.ts` to manage schema (requires Connection String).
- **Content Management:** Run `npx ts-node scripts/adminSupabase.ts` to manage user data (requires Service Role Key).
