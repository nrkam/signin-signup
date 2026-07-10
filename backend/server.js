require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'db.json');

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // разрешаем фронтенду
app.use(express.json());

// Инициализация базы данных (файл)
const initDB = () => {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ users: [] }, null, 2));
  }
};
initDB();

// Вспомогательная функция чтения/записи
const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// Регистрация
app.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const db = readDB();
  const existing = db.users.find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    firstName,
    lastName,
    email,
    password: hashedPassword,
  };
  db.users.push(newUser);
  writeDB(db);

  // Генерируем токен
  const token = jwt.sign({ userId: newUser.id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.status(201).json({ token, user: { email, firstName, lastName } });
});

// Вход
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  const db = readDB();
  const user = db.users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { email, firstName: user.firstName, lastName: user.lastName } });
});

// Защищённый профиль (пример)
app.get('/api/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const db = readDB();
    const user = db.users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ email: user.email, firstName: user.firstName, lastName: user.lastName });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));