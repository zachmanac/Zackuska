// Load .env data into process.env
require('dotenv').config();

// Other dependencies
const fs = require('fs');
const db = require('./connection');
const path = require('path');

// Loads the schema files from server/database/schema
const runSchemaFiles = async () => {
  console.log('-> Loading Schema Files ...');
  const dirPath = path.resolve(__dirname, './schema')

  const schemaFilenames = fs.readdirSync(dirPath);
  console.log("schemafilenames", schemaFilenames)
  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`${dirPath}/${fn}`, 'utf8');
    console.log(`-> Running ${fn}`);
    await db.query(sql);
  }
};

const runSeedFiles = async () => {
  console.log('-> Loading Seeds ...');

  const dirPath = path.resolve(__dirname, './seeds') 

  const seedFilenames = fs.readdirSync(dirPath);

  for (const fn of seedFilenames) {
    const sql = fs.readFileSync(`${dirPath}/${fn}`, 'utf8');
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
    process.exit();
  } catch (err) {
    console.error(`Failed due to error: ${err}`);
    process.exit();
  }
};

runResetDB();