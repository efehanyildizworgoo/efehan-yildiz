const { Pool } = require("pg");
const crypto = require("crypto");

async function hashPassword(password) {
  // Simple bcrypt-compatible approach using built-in crypto
  // We'll use the bcryptjs that's bundled in standalone
  try {
    const bcrypt = require("bcryptjs");
    return bcrypt.hashSync(password, 12);
  } catch {
    // Fallback: sha256 (not bcrypt but works as bootstrap)
    return "$2a$12$" + crypto.createHash("sha256").update(password).digest("hex");
  }
}

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.log("No DATABASE_URL, skipping seed");
    return;
  }

  const pool = new Pool({ connectionString: url });

  try {
    // Create tables if not exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
      CREATE TABLE IF NOT EXISTS pages (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(255) NOT NULL,
        seo_title VARCHAR(255),
        seo_desc TEXT,
        blocks JSONB DEFAULT '[]' NOT NULL,
        status VARCHAR(20) DEFAULT 'draft' NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        content TEXT DEFAULT '',
        excerpt TEXT DEFAULT '',
        category VARCHAR(100),
        status VARCHAR(20) DEFAULT 'draft' NOT NULL,
        featured BOOLEAN DEFAULT FALSE,
        featured_image TEXT,
        seo_title VARCHAR(255),
        seo_desc TEXT,
        author VARCHAR(255) DEFAULT 'Efehan Yıldız',
        read_time VARCHAR(20),
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(255) NOT NULL,
        blocks JSONB DEFAULT '[]' NOT NULL,
        sort_order INTEGER DEFAULT 0,
        status VARCHAR(20) DEFAULT 'published' NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
      CREATE TABLE IF NOT EXISTS trainings (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        price DECIMAL(10,2),
        duration VARCHAR(100),
        status VARCHAR(20) DEFAULT 'published' NOT NULL,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        source VARCHAR(50) DEFAULT 'form' NOT NULL,
        subject VARCHAR(255),
        message TEXT,
        pipeline_stage VARCHAR(50) DEFAULT 'new' NOT NULL,
        value DECIMAL(10,2),
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
      CREATE TABLE IF NOT EXISTS lead_notes (
        id SERIAL PRIMARY KEY,
        lead_id INTEGER NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
      CREATE TABLE IF NOT EXISTS media (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(500) NOT NULL,
        url TEXT NOT NULL,
        size INTEGER,
        mime_type VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) NOT NULL UNIQUE,
        value TEXT
      );
    `);
    console.log("Tables created/verified");

    // Seed admin user
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", ["efe@worgoo.com"]);
    if (existing.rows.length === 0) {
      const hash = await hashPassword("Samsun55255.");
      await pool.query(
        "INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3)",
        ["efe@worgoo.com", hash, "Efehan Yıldız"]
      );
      console.log("Admin user created: efe@worgoo.com");
    } else {
      console.log("Admin user already exists");
    }
  } catch (err) {
    console.error("Seed error:", err.message);
  } finally {
    await pool.end();
  }
}

main();
