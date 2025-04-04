const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  
const Opportunity = require('./models/Opportunity');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/DreamHigh', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Error connecting to MongoDB:', err));

app.use(cors()); 
app.use(express.json()); 

app.get("/api/opportunities", async (req, res) => {
  try {
    const { category } = req.query;
    
    if (!category) {
      return res.status(400).json({ message: "Не указана категория" });
    }

    const opportunities = await Opportunity.find({ category }, "name deadline imageUrl");

    res.json(opportunities);
  } catch (error) {
    console.error("Ошибка сервера:", error);
    res.status(500).json({ message: "Ошибка сервера. Попробуйте позже." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
