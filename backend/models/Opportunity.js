const mongoose = require('mongoose');

// Создаем схему для модели
const opportunitySchema = new mongoose.Schema({
    category: String,    // Категория
    name: String,        // Название
    description: String, // Описание
    deadline: String,    // Дедлайн
    imageUrl: String,    // Ссылка на изображение
});

// Создаем модель из схемы
const Opportunity = mongoose.model('Opportunity', opportunitySchema);

// Экспортируем модель, чтобы использовать в других файлах
module.exports = Opportunity;