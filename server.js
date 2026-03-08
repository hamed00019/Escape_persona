import express from 'express';
import cors from 'cors';
import { Client } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('DATABASE_URL is missing in .env');
    process.exit(1);
}

const client = new Client({ connectionString });
client.connect().catch(err => console.error('Database connection error:', err));

app.post('/api/users', async (req, res) => {
    const { phone_number, persona_type, persona_title, stats } = req.body;

    if (!phone_number) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    try {
        const insertQuery = `
      INSERT INTO users (phone_number, persona_type, persona_title, stats)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
        const result = await client.query(insertQuery, [phone_number, persona_type, persona_title, JSON.stringify(stats)]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Local API Server running on http://localhost:${PORT}`);
});
