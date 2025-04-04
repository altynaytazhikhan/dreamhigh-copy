document.addEventListener("DOMContentLoaded", function () {
    function goToCategory(category) {
        window.location.href = `category.html?category=${encodeURIComponent(category)}`;
    }

    document.querySelectorAll(".category").forEach(item => {
        item.addEventListener("click", function () {
            const category = this.dataset.category;
            goToCategory(category);
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category) {
        document.getElementById('category-title').textContent = `Результаты по категории: ${category}`;
        fetchOpportunities(category);
    }
});

async function fetchOpportunities(category) {
    try {
        const response = await fetch(`/api/opportunities?category=${encodeURIComponent(category)}`);
        
        if (!response.ok) {
            throw new Error('Не удалось загрузить данные');
        }

        const data = await response.json();
        renderOpportunities(data);

    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
}

function renderOpportunities(opportunities) {
    const container = document.getElementById('opportunities-container'); 
    container.innerHTML = '';

    if (opportunities.length === 0) {
        container.innerHTML = '<p>Нет возможностей в данной категории.</p>';
        return;
    }

    opportunities.forEach(opportunity => {
        const card = document.createElement('div');
        card.classList.add('opportunity-card');

        card.innerHTML = `
            <h3>${opportunity.name}</h3>
            <img src="${opportunity.imageUrl}" alt="${opportunity.name}">
            <p>Срок подачи: ${opportunity.deadline}</p>
        `;

        container.appendChild(card);
    });
}
