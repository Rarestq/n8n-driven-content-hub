// public/assets/main.js
document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.querySelector('.tabs-container');
    const searchBox = document.getElementById('search-box');
    const items = document.querySelectorAll('.item-card');
    const feedContainer = document.getElementById('feed-container');
  
    if (!tabsContainer || !searchBox || !items.length || !feedContainer) return;
    
    const firstTab = tabsContainer.querySelector('.tab-btn');
    if(firstTab) firstTab.classList.add('active');
  
    // --- Tab 筛选逻辑 ---
    tabsContainer.addEventListener('click', (e) => {
      if (!e.target.classList.contains('tab-btn')) return;
  
      tabsContainer.querySelector('.tab-btn.active')?.classList.remove('active');
      e.target.classList.add('active');
      
      const targetSource = e.target.getAttribute('data-source');
      
      items.forEach(item => {
        const itemSource = item.getAttribute('data-source');
        const show = (targetSource === 'All' || itemSource === targetSource);
        item.classList.toggle('hidden', !show);
      });
      
      searchBox.value = ''; // 点击 Tab 时重置搜索框
    });
    
    // --- 搜索逻辑 ---
    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        // 搜索时，激活 "All" 标签
        tabsContainer.querySelector('.tab-btn.active')?.classList.remove('active');
        const allTab = tabsContainer.querySelector('.tab-btn[data-source="All"]');
        if(allTab) allTab.classList.add('active');
        
        items.forEach(item => {
            const title = item.querySelector('h2 a').textContent.toLowerCase();
            const content = (item.querySelector('.content') || {}).textContent.toLowerCase();
            const matches = title.includes(searchTerm) || content.includes(searchTerm);
            item.classList.toggle('hidden', !matches);
        });
    });
  
    // --- 内容展开/折叠逻辑 ---
    feedContainer.addEventListener('click', (e) => {
      if (!e.target.classList.contains('toggle-content-btn')) return;
      const contentDiv = e.target.closest('.content.collapsible');
      if (contentDiv) {
        contentDiv.classList.toggle('expanded');
        e.target.textContent = contentDiv.classList.contains('expanded') ? 'Show less' : 'Read more...';
      }
    });
  });