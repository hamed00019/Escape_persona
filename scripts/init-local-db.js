import { Client } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error("DATABASE_URL is missing in .env");
    process.exit(1);
}

const client = new Client({ connectionString });

async function init() {
    try {
        await client.connect();
        console.log("Connected to local PostgreSQL database.");

        const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        phone_number TEXT NOT NULL,
        persona_type TEXT,
        persona_title TEXT,
        stats JSONB
      );
    `;

        await client.query(createTableQuery);
        console.log("Table 'users' created or already exists.");
    } catch (err) {
        console.error("Error initializing database:", err);
    } finally {
        await client.end();
    }
}

init();
