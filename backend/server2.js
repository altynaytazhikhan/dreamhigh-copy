app.get("/api/opportunities/add/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Проверяем, является ли id корректным MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Некорректный ID" });
        }

        const opportunity = await Opportunity.findById(id);
        
        if (!opportunity) {
            return res.status(404).json({ message: "Возможность не найдена" });
        }

        res.json(opportunity);
    } catch (error) {
        console.error("Ошибка сервера:", error);
        res.status(500).json({ message: "Ошибка сервера. Попробуйте позже." });
    }
});
