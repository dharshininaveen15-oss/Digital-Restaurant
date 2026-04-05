document.addEventListener('DOMContentLoaded', () => {
    // --- 1. TABLE & URL LOGIC ---
    const urlParams = new URLSearchParams(window.location.search);
    const tableNo = urlParams.get('table') || 'Guest';
    const tableDisplay = document.getElementById('table-number-display');
    
    if(tableDisplay) {
        tableDisplay.innerText = tableNo === 'Guest' ? 'Guest' : `Table: ${tableNo}`;
    }

    // --- 2. NAVBAR SCROLL EFFECT ---
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('shadow-md', 'bg-white/90');
            } else {
                nav.classList.remove('shadow-md', 'bg-white/90');
            }
        });
    }

    // --- 3. DYNAMIC MENU RENDERING ---
    const menuGrid = document.getElementById('menu-grid');
    
    function displayMenu(items) {
        if(!menuGrid) return; // Guard clause if grid doesn't exist on page
        
        menuGrid.innerHTML = items.map(item => `
            <div class="food-card group bg-white rounded-[2.5rem] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-orange-100">
                <div class="relative overflow-hidden rounded-[2rem] h-52 mb-5">
                    <div class="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-gray-900 shadow-sm">
                        ⭐ ${item.rating}
                    </div>
                    <img src="${item.image}" class="w-full h-full object-cover transition-transform duration-700" alt="${item.name}">
                </div>
                <div class="px-2">
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-lg font-extrabold text-gray-900 group-hover:text-orange-600 transition-colors">${item.name}</h3>
                        <span class="text-lg font-black text-gray-900">$${item.price.toFixed(2)}</span>
                    </div>
                    <p class="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-2">${item.desc}</p>
                    <button onclick="addToCart('${item.id}', '${item.name}', ${item.price})" class="w-full py-4 bg-gray-900 group-hover:bg-orange-600 text-white rounded-2xl font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-gray-200 group-hover:shadow-orange-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    }

    // --- 4. CATEGORY FILTER LOGIC ---
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update Active Styles
            categoryButtons.forEach(b => {
                b.classList.remove('active-category', 'text-white');
                b.classList.add('bg-white', 'text-gray-500');
            });
            btn.classList.add('active-category', 'text-white');
            btn.classList.remove('bg-white', 'text-gray-500');

            // Filter the Data
            const selectedCategory = btn.innerText.replace('🔥 ', '').replace('🍔 ', '').replace('🍕 ', '').replace('🍹 ', '').trim();
            
            if (selectedCategory === "All Items") {
                displayMenu(menuItems);
            } else {
                const filtered = menuItems.filter(item => item.category === selectedCategory);
                displayMenu(filtered);
            }
        });
    });

    // Initial render
    if (typeof menuItems !== 'undefined') {
        displayMenu(menuItems);
    }
});