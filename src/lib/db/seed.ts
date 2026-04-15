import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { users } from "./schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function seed() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is required");
    process.exit(1);
  }

  const pool = new pg.Pool({ connectionString: url });
  const db = drizzle(pool);

  const email = "efe@worgoo.com";
  const password = "Samsun55255.";

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing.length > 0) {
    console.log("Admin user already exists, skipping seed.");
  } else {
    const hash = await bcrypt.hash(password, 12);
    await db.insert(users).values({
      email,
      passwordHash: hash,
      name: "Efehan Yıldız",
    });
    console.log("Admin user created:", email);
  }

  await pool.end();
  process.exit(0);
}

seed().catch((e) => {
  console.error("Seed error:", e);
  process.exit(1);
});
