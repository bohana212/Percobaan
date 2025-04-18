import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, username, password } = req.body;
  const filePath = path.resolve("data/users.json");
  const users = JSON.parse(fs.readFileSync(filePath));

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, username, password: hashed, banned: false });
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  res.status(200).json({ message: "User registered!" });
}
