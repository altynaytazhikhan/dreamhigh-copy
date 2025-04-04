document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    if (!category) {
        document.body.innerHTML = "<h2>Ошибка: категория не указана!</h2>";
        return;
    }

    document.getElementById("category-title").textContent = `Категория: ${category}`;

    try {
        const response = await fetch(`http://localhost:3000/api/opportunities?category=${encodeURIComponent(category)}`);
        
        if (!response.ok) {
            throw new Error("Ошибка загрузки данных");
        }

        const opportunities = await response.json();
        const container = document.getElementById("category-results");

        container.innerHTML = "";

        if (opportunities.length === 0) {
            container.innerHTML = "<p>❌ Нет возможностей в этой категории.</p>";
            return;
        }

        opportunities.forEach(opportunity => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <div class="image-wrapper">
                    <img src="${opportunity.imageUrl}" alt="Изображение">
                </div>
                <div class="card-content">
                    <h3>${opportunity.name}</h3>
                    <p><strong>📅 Дедлайн:</strong> ${opportunity.deadline}</p>
                    <a href="detail.html?id=${opportunity._id}" class="apply-button">Подробнее</a>
                </div>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        console.error("Ошибка загрузки:", error);
        document.getElementById("category-results").innerHTML = "<p>❌ Ошибка загрузки данных</p>";
    }
});
