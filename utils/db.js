// lib/db.js

import Database from "better-sqlite3";
import path from "path";

// Initialize the database and ensure the table exists
const db = new Database(path.resolve("transactions.db"), {
  verbose: console.log,
});

// Create the table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status TEXT NOT NULL,
    creation_time TEXT NOT NULL,
    expiration_date TEXT NOT NULL,
    receiver_address TEXT NOT NULL,
    temporary_address TEXT NOT NULL,
    private_key TEXT NOT NULL,
    user_name TEXT NOT NULL DEFAULT 'Misc',
    amount_in_toman REAL NOT NULL DEFAULT 0.0,  -- Amount in Toman
    amount_in_eth REAL NOT NULL DEFAULT 0.0,    -- Amount in ETH
    amount_in_wei TEXT NOT NULL DEFAULT '0',    -- Amount in Wei (as string)
    transfer_fee_in_wei TEXT NOT NULL DEFAULT '0', -- Transfer fee in Wei (as string)
    transaction_hash TEXT DEFAULT NULL          -- Transaction hash, default NULL
  )
`);

export default db;
