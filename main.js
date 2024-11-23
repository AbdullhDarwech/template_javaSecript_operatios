const categoryFilter = document.getElementById("categoryFilter");
const sortPriceBtn = document.getElementById("sortPrice");
const sortRatingBtn = document.getElementById("sortRating");
const searchInput = document.getElementById("searchInput");
const productsGrid = document.getElementById("productsGrid");
const spinner = document.getElementById("spinner");

let products = [];
let filteredProducts = [];
let sortBy = ""; 
let searchQuery = ""; 

const fetchProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    products = response.data;
    filteredProducts = [...products];

    populateCategoryFilter(products);
    applyFilters();
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    spinner.style.display = "none";
  }
};

const populateCategoryFilter = (prods) => {
  const categories = [...new Set(prods.map((product) => product.category))];
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
};

const applyFilters = () => {

  filteredProducts = products.filter((product) => {
    const matchesCategory =
      !categoryFilter.value || product.category === categoryFilter.value;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort if necessary
  if (sortBy === "price") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "rating") {
    filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  displayProducts(filteredProducts);
};

const displayProducts = (products) => {
  productsGrid.innerHTML = products
    .map(
      (product) => `
    <div class="col-md-3 col-sm-4">
      <div class="card h-100">
        <div class="card-img-container">
          <img src="${product.image}" class="card-img-top" alt="${
        product.title
      }">
        </div>
        <div class="card-body">
          <h5 class="card-title">${product.title.substring(0, 20)}</h5>
          <p class="card-text">${product.description.substring(0, 40)}...</p>
        </div>
        <div class="card-footer">
          <p>Price: $${product.price}</p>
          <p>Rating: $${product.rating.rate} ⭐</p>
        </div>
      </div>
    </div>`
    )
    .join("");
};

categoryFilter.addEventListener("change", () => {
  applyFilters();
});
sortPriceBtn.addEventListener("click", () => {
  sortBy = "price";
  applyFilters();
});
sortRatingBtn.addEventListener("click", () => {
  sortBy = "rating";
  applyFilters();
});
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  applyFilters();
});

// Fetch products on load
fetchProducts();
