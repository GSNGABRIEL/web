import pool from '../config/db.js';

export async function initializeDatabase() {
  let client;
  let retries = 10;
  while (retries > 0) {
    try {
      client = await pool.connect();
      break;
    } catch (err) {
      retries -= 1;
      console.log(`Banco de dados não está pronto ainda. Aguardando... (${retries} tentativas restantes)`);
      if (retries === 0) throw err;
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  try {
    await client.query('BEGIN');
    
    // Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS cidades (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        estado VARCHAR(2) NOT NULL
      );
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS equipamentos (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        setor VARCHAR(255) NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS funcionarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        cargo VARCHAR(255) NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS servicos (
        id SERIAL PRIMARY KEY,
        descricao TEXT NOT NULL,
        tipo VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'Pendente'
      );
    `);

    await client.query('COMMIT');
    console.log('Database initialized successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
}
