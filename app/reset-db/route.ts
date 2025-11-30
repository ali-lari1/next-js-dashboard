import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    // Drop all tables
    await sql`DROP TABLE IF EXISTS invoices CASCADE`;
    await sql`DROP TABLE IF EXISTS customers CASCADE`;
    await sql`DROP TABLE IF EXISTS revenue CASCADE`;
    await sql`DROP TABLE IF EXISTS users CASCADE`;

    return Response.json({ message: 'Database tables dropped successfully. Now visit /seed to reseed.' });
  } catch (error) {
    console.error('Reset error:', error);
    return Response.json({ error }, { status: 500 });
  }
}
