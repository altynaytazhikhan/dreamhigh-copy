const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    country: String,
    deadline: String,  // Добавлено поле deadline
}, { collection: 'Opportunities' });

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

module.exports = Opportunity;
