import bcrypt from 'bcrypt';
import { generateJWT } from '../helpers/generate-jwt.js'; 
const SALT_ROUNDS = 12;

/**
 * REGISTER
 */
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      });
    }

    // 1️⃣ Verificar si el usuario ya existe
    const existingUser = await global.pgPool.query(
      'SELECT id_user FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        error: 'User already exists'
      });
    }

    // 2️⃣ Hash de la contraseña
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // 3️⃣ Crear usuario
    const { rows } = await global.pgPool.query(
      `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING id_user, email, status, registration_date
      `,
      [email, passwordHash]
    );

    return res.status(201).json({
      message: 'User created successfully',
      user: rows[0]
    });

  } catch (error) {
    console.error('REGISTER ERROR:', error);

    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};


/**
 * LOGIN
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      });
    }

    // 1️⃣ Buscar usuario
    const { rows } = await global.pgPool.query(
      `
      SELECT id_user, email, password
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    const user = rows[0];

    // 2️⃣ Comparar contraseñas
    const isValidPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    // 3️⃣ Generar JWT
    const token = await generateJWT(user.id_user);

    // 4️⃣ Respuesta
    return res.json({
      message: 'Login successful',
      user: {
        id: user.id_user,
        email: user.email
      },
      token
    });

  } catch (error) {
    console.error('LOGIN ERROR:', error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};
