import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Use DB environment variables or connection string
const connectionString = process.env.DATABASE_URL || 
  `postgresql://${process.env.DB_USER || 'mineradora_user'}:${process.env.DB_PASSWORD || 'mineradora_password'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'mineradora_db'}`;

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' && process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

export default pool;
