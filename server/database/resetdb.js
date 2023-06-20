// Load .env data into process.env
require('dotenv').config();

// Other dependencies
const fs = require('fs');
const db = require('./connection.');

// Loads the schema files from server/database/schema
const runSchemaFiles = async () => {
  console.log('-> Loading Schema Files ...');
  const schemaFilenames = fs.readdirSync('./schema');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./schema/${fn}`, 'utf8');
    console.log(`-> Running ${fn}`);
    await db.query(sql);
  }
};

const runSeedFiles = async () => {
  console.log('-> Loading Seeds ...');
  const seedFilenames = fs.readdirSync('./seeds');

  for (const fn of seedFilenames) {
    const sql = fs.readFileSync(`./seeds/${fn}`, 'utf8');
    console.log(`-> Running ${fn}`);
    await db.query(sql);
  }
};

const runResetDB = async () => {
  try {
    console.log(`-> Connecting to PG on ${process.env.DB_HOST} as ${process.env.DB_USER}...`);

    await runSchemaFiles();
    await runSeedFiles();
    console.log('Database reset complete.');
  } catch (err) {
    console.error(`Failed due to error: ${err}`);
  }
};

runResetDB();