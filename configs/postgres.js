import pg from 'pg';

const { Pool } = pg;

const dbConnection = async () => {
  try {
    const pool = new Pool({
      connectionString: process.env.POSTGRESQL_URL,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      ssl: { rejectUnauthorized: true }
    });

    // ----------- EVENTOS “similares” a MongoDB ---------------

    pool.on('error', (err) => {
      console.log('PostgreSQL | unexpected error', err);
    });

    pool.on('connect', () => {
      console.log('PostgreSQL | client connected');
    });

    pool.on('remove', () => {
      console.log('PostgreSQL | client removed');
    });

    // ----------- PROBAR CONEXIÓN ------------------
    const client = await pool.connect();
    console.log('PostgreSQL | connected to database');

    client.release();

    // ----------- EXPORTAR POOL GLOBALMENTE ----------
    global.pgPool = pool;

  } catch (error) {
    console.log('PostgreSQL | connection failed', error);
  }
};

export default dbConnection;
