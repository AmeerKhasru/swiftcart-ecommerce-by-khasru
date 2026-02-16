// {
//     "id": 1,
//     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     "price": 109.95,
//     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//     "category": "men's clothing",
//     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
//     "rating": {
//       "rate": 3.9,
//       "count": 120
//     }
//   },

// Function to fetch and display categories
// 1. Load Categories
async function loadCategories() {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    const categories = await res.json();
    const container = document.getElementById('category-filters');
    let html = `<button onclick="loadProducts()" class="text-indigo-600 hover:text-white hover:bg-indigo-600 font-semibold bg-slate-100 px-5 py-2 rounded-xl capitalize">All</button>`;

    categories.forEach(cat => {
        html += `<button onclick="loadProducts('${cat}')" class="text-indigo-600 hover:text-white hover:bg-indigo-600 font-semibold bg-slate-100 px-5 py-2 rounded-xl capitalize">${cat}</button>`;
    });

    container.innerHTML = html;
}

// 2. Load Products
async function loadProducts(category = '') {
    // All products or Specific Category
    const url = category
        ? `https://fakestoreapi.com/products/category/${category}`
        : 'https://fakestoreapi.com/products';

    try {
        const res = await fetch(url);
        const products = await res.json();
        const container = document.getElementById('product-container');

        container.innerHTML = ''; // Clear previous products

        products.forEach(product => {
            const card = `
                <div class="card bg-white shadow-sm border border-slate-100 overflow-hidden ">
                  <figure class="relative h-64 bg-slate-100 flex justify-center items-center">
                    <img src="${product.image}" class="object-contain w-full h-full p-4" />
                  </figure>
                  <div class="card-body p-4">
                     <div class="flex justify-between items-center gap-4">
                      <p class="text-[10px] font-semibold bg-slate-300 text-indigo-600 rounded-xl text-center px-2 py-1 capitalize truncate">${product.category}</p>
                      <p class="text-sm whitespace-nowrap"><i class="fa-solid fa-star text-yellow-400"></i> ${product.rating.rate}(${product.rating.count})</p>
                    </div>
                    <h3 class="card-title text-lg mt-2 h-14 overflow-hidden line-clamp-2">${product.title}</h3>
                    <h2 class="text-black text-xl font-bold mt-1">$${product.price}</h2>
                    <div class="flex justify-between items-center mt-4">
                      <button onclick="showDetails(${product.id})" class="btn btn-ghost text-gray-600 px-2 flex-1 border border-slate-300 mr-2">
                        <i class="fa-regular fa-eye mr-1"></i>Details
                        </button>
                      <button class="btn btn-primary text-white flex-1">
                        <i class="fa-solid fa-cart-plus mr-1"></i> Add
                      </button>
                    </div>
                  </div>
                </div>
            `;
            container.innerHTML += card;
        });
    } catch (error) {
        console.error("Failed to load products:", error);
    }
}

async function showDetails(id) {
    const modal = document.getElementById('details-modal');
    const content = document.getElementById('modal-content');

    try {
        // Fetch specific product data
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await res.json();

        // Inject data into modal
        content.innerHTML = `
            <div>
                <p class="text-indigo-600 font-bold text-sm uppercase">${product.category}</p>
                <h2 class="text-2xl font-bold text-slate-800 mt-2">${product.title}</h2>
                <p class="text-slate-500 mt-4 text-sm leading-relaxed">${product.description}</p>
                <div class="mt-6 flex items-center justify-between">
                    <span class="text-3xl font-bold text-black">$${product.price}</span>
                    <button class="btn btn-primary text-white">Add to Cart</button>
                </div>
            </div>
        `;

        // Show the modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    } catch (error) {
        console.error("Error fetching details:", error);
    }
}

function closeModal() {
    document.getElementById('details-modal').classList.add('hidden');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}


// Initialize page
loadCategories();
loadProducts();