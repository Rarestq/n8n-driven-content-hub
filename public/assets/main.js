// public/assets/main.js
document.addEventListener('DOMContentLoaded', () => {
    if (!window.dailyData) return;

    const container = document.getElementById('report-container');
    const filtersContainer = document.getElementById('filters');
    const allItems = window.dailyData;

    // 动态创建筛选按钮
    const sources = ['All', ...new Set(allItems.map(item => item.source))];
    sources.forEach(source => {
        const button = document.createElement('button');
        button.textContent = source;
        button.dataset.source = source;
        filtersContainer.appendChild(button);
    });

    // 渲染函数
    function renderItems(items) {
        container.innerHTML = '';
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-source">${item.source}</div>
                <h3 class="card-title"><a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a></h3>
                <p class="card-summary">${item.summary || ''}</p>
            `;
            container.appendChild(card);
        });
    }

    // 筛选事件
    filtersContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const source = e.target.dataset.source;
            const filteredItems = source === 'All' ? allItems : allItems.filter(item => item.source === source);
            renderItems(filteredItems);
        }
    });

    // 初始渲染
    renderItems(allItems);
});