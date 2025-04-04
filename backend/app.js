const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Opportunity = require('./models/Opportunity'); // Импорт модели

const app = express();
const PORT = 3000;

// Подключение к базе данных
mongoose.connect('mongodb://localhost:27017/DreamHigh', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Успешно подключено к базе данных'))
  .catch(err => console.error('❌ Ошибка подключения к базе данных:', err));

app.use(cors());
app.use(express.json());
app.use(express.static('../frontend/public'));

// Получение возможностей с фильтрацией по категории и стране
app.get("/opportunities", async (req, res) => {
    try {
        const { category, country } = req.query;
        let query = {};

        if (category && category !== "All") query.category = category;
        if (country && country !== "All") query.country = country;

        const opportunities = await Opportunity.find(query, 'title deadline category country'); // Возвращаем только нужные поля
        res.json(opportunities);
    } catch (error) {
        console.error("Ошибка при получении возможностей:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

// Добавление новой возможности
app.post("/opportunities", async (req, res) => {
    try {
        console.log("📩 Полученные данные:", req.body);

        const { title, description, category, country, deadline } = req.body;

        if (!title || !description || !category || !country || !deadline) {
            console.log("❌ Ошибка: Не все поля заполнены");
            return res.status(400).json({ error: "Все поля должны быть заполнены!" });
        }

        const newOpportunity = new Opportunity({
            title,
            description,
            category,
            country,
            deadline // Теперь deadline сохраняется
        });

        await newOpportunity.save();
        console.log("✅ Возможность успешно добавлена!");
        res.status(201).json({ message: "Возможность успешно добавлена!" });
    } catch (error) {
        console.error("❌ Ошибка при добавлении возможности:", error);
        res.status(500).json({ error: "Ошибка сервера", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
