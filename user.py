# Run this once to create your user
import sqlite3
import hashlib

conn = sqlite3.connect('users.db')
cursor = conn.cursor()
cursor.execute('CREATE TABLE IF NOT EXISTS users (email TEXT, password_hash TEXT)')

email = "user@example.com"
raw_password = "mypassword"
hashed_password = hashlib.sha256(raw_password.encode()).hexdigest()

cursor.execute('INSERT INTO users (email, password_hash) VALUES (?, ?)', (email, hashed_password))
conn.commit()
conn.close()
