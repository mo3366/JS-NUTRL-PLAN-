let meals = document.getElementById("meals-page");
let mealDetails = document.getElementById("meal-details-page");
let products = document.getElementById("products-section");
let foodlog = document.getElementById("foodlog-section");
let HeroSection = document.getElementById("HeroSection");
let app_loading = document.getElementById("app-loading-overlay");
let Meal_Content_Grid = document.getElementById("Meal_Content_Grid");

// navbar bottoms -------------------------------------------------
let bottonProductScanner = document.getElementById("ProductScanner");
let Mealsbottom = document.getElementById("Mealsbottom");
let FoodLogbotton = document.getElementById("FoodLogbotton");
let header_title = document.getElementById("header_title");

bottonProductScanner.addEventListener("click", function () {
  products.classList.remove("hidden");
  meals.classList.add("hidden");
  mealDetails.classList.add("hidden");
  foodlog.classList.add("hidden");
  HeroSection.classList.add("hidden");
  bottonProductScanner.classList.add("bg-emerald-50", "text-emerald-700");
  FoodLogbotton.classList.remove("bg-emerald-50", "text-emerald-700");
  Mealsbottom.classList.remove("bg-emerald-50", "text-emerald-700");
  header_title.innerHTML = `
     <h1 class="text-2xl font-bold text-gray-900">
         Product Scanner
     </h1>
      <p class="text-sm text-gray-500 mt-1">
         Search packaged foods by name or barcode
      </p>`;
});

Mealsbottom.addEventListener("click", function () {
  products.classList.add("hidden");
  meals.classList.remove("hidden");
  mealDetails.classList.add("hidden");
  foodlog.classList.add("hidden");
  HeroSection.classList.add("hidden");
  bottonProductScanner.classList.remove("bg-emerald-50", "text-emerald-700");
  FoodLogbotton.classList.remove("bg-emerald-50", "text-emerald-700");
  Mealsbottom.classList.add("bg-emerald-50", "text-emerald-700");

  header_title.innerHTML = `
     <h1 class="text-2xl font-bold text-gray-900">
         Meals & Recipes
     </h1>
      <p class="text-sm text-gray-500 mt-1">
        Discover delicious and nutritious recipes tailored for you
      </p>`;
});

//------------------------------------------------

// (api_index_meals) meals bottoms -------------------------------------------------

let mealsAPI = document.getElementById("recipes-grid");

async function api_index_meals() {
  //loading
  app_loading.classList.remove("hidden");

  let response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/random?count=25`,
  );
  if (response.ok) {
    let global_postlist;
    global_postlist = await response.json();
    displayall(global_postlist);
    app_loading.classList.add("hidden");
  } else {
    console.log("error");
  }
}
function displayall(global_postlist) {
  var box = "";
  for (var i = 0; i < global_postlist.results.length; i++) {
    box += `  <div onclick="show_meal_details( ${global_postlist.results[i].id})" class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-meal-id="${global_postlist.results[i].id}">
     <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${global_postlist.results[i].thumbnail}"
                  alt="${global_postlist.results[i].name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${global_postlist.results[i].category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${global_postlist.results[i].area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                ${global_postlist.results[i].name}

                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  Delicious recipe to try!
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                     ${global_postlist.results[i].category}

                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                       ${global_postlist.results[i].area}

                  </span>
                </div>
              </div>
               </div>  `;
  }
  mealsAPI.innerHTML = box;
}

api_index_meals();

//--------------------------------------------------------------------
// (categories_bottns home)-------------------------------------------------
let categories_bottns = document.getElementById("categories-grid");
let global_categories;

async function api_categories_bottns() {
  let response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/categories?count=12`,
  );
  if (response.ok) {
    global_categories = await response.json();

    displayallcategories();
  } else {
    console.log("error");
  }
}

function displayallcategories() {
  var box = "";
  for (var i = 0; i < 12; i++) {
    box += `   <div class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
              data-category="${global_categories.results[i].name}"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid fa-drumstick-bite"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${global_categories.results[i].name}</h3>
                </div>
              </div>
            </div> `;
  }
  categories_bottns.innerHTML = box;

  document.querySelectorAll(".category-card").forEach((btn) => {
    btn.addEventListener("click", function () {
      let category = this.dataset.category;
      console.log(category); // اطبعها
      filterByCategory(category);
    });
  });
}

async function filterByCategory(category_name) {
  let response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/filter?category=${category_name}&page=1&limit=25`,
  );
  if (response.ok) {
    let dataa = await response.json();

    displayall(dataa);
  } else {
    console.log("error");
  }
}

api_categories_bottns();
//--------------------------------------------------------------------
// (areas buttons home) ---------------------------------------------
let areas_buttons = document.getElementById("areas-grid");
let global_areas;

async function api_areas_buttons() {
  let response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/areas`,
  );

  if (response.ok) {
    global_areas = await response.json();
    displayAllAreas();
  } else {
    console.log("error");
  }
}

function displayAllAreas() {
  let box = `
    <button
      class="area-btn px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap"
      data-area="all">
      All Recipes
    </button>
  `;

  for (let i = 0; i < global_areas.results.length; i++) {
    box += `
      <button
        class="area-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
        data-area="${global_areas.results[i].name}">
        ${global_areas.results[i].name}
      </button>
    `;
  }

  areas_buttons.innerHTML = box;

  // لما ادوس
  document.querySelectorAll(".area-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      let area = this.dataset.area;
      console.log(area);
      filterByArea(area);
    });
  });
}

async function filterByArea(area_name) {
  if (area_name === "all") {
    api_index_meals();
    return;
  }

  let response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/filter?area=${area_name}&page=1&limit=25`,
  );

  if (response.ok) {
    let data = await response.json();
    displayall(data);
  } else {
    console.log("error");
  }
}
api_areas_buttons();
//--------------------------------------------------------------------

// (search home) ---------------------------------------------
let searchInput = document.getElementById("search-input");

async function search_meals(search_value) {
  let response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/search?q=${search_value}&page=1&limit=25`,
  );

  if (response.ok) {
    let dataa = await response.json();
    displayall(dataa);
  } else {
    console.log("error");
  }
}

searchInput.addEventListener("input", function (e) {
  search_meals(e.target.value);
});
//==========================================================================================================================================================
// (show_meal_details) -------------------------------------- left -----------
async function show_meal_details(id) {
  //loading
  app_loading.classList.remove("hidden");

  let response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/${id}`,
  );
  if (response.ok) {
    details = await response.json();
    console.log(details);
    display_meal_details(details);

    //loading
    app_loading.classList.add("hidden");
  } else {
    console.log("error");
  }
}
// (show_meal_details) ------------------------------------- right -----------
async function display_meal_details(details) {
  meals.classList.add("hidden");
  HeroSection.classList.remove("hidden");
  mealDetails.classList.remove("hidden");

  const youtubeEmbed = getYouTubeEmbedUrl(details.result.youtube);

  HeroSection.innerHTML = `  <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div class="relative h-80 md:h-96">
              <img
                src="${details.result.thumbnail}"
                alt="${details.result.name}"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              ></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-3">
                  <span
                    class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                    >${details.result.category}</span
                  >
                  <span
                    class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
                    >${details.result.area}</span>
                
                ${showtags(details.result.tags)}


                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                  ${details.result.name}
                </h1>
                <div class="flex items-center gap-6 text-white/90">
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-clock"></i>
                    <span>30 min</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i>
                    <span id="hero-servings">4 servings</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-fire"></i>
                    <span id="hero-calories">Calculating....</span>
                  </span>
                </div>
              </div>
            </div>
          </div> 
          
          `;

  // Log This Meal bottom
  let logMealContainer = document.getElementById("log-meal-btn");
  logMealContainer.innerHTML = `
  <button
    class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
    data-meal-id="${details.result.id}"
  >
    <i class="fa-solid fa-clipboard-list"></i>
    <span>Log This Meal</span>
  </button>
`;

  logMealContainer.addEventListener("click", function () {
    log_meal_modal.classList.remove("hidden");
  });

  function showtags(tags) {
    return tags
      .map(
        (tag) => `
    <span class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">
      ${tag}
    </span>
  `,
      )
      .join("");
  }

  Meal_Content_Grid.innerHTML = `<!-- Left Column - Ingredients & Instructions -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Ingredients -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-list-check text-emerald-600"></i>
                  Ingredients
                  <span class="text-sm font-normal text-gray-500 ml-auto"
                    >${details.result.ingredients.length} items</span
                  >
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                 ${ingredientss()} 
              </div>
              </div>

              <!-- Instructions -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                  Instructions
                </h2>
                <div class="space-y-4">
                   ${renderInstructions(details)}
                </div>
              </div>

              <!-- Video Section -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-video text-red-500"></i>
                  Video Tutorial
                </h2>
                <div
                  class="relative aspect-video rounded-xl overflow-hidden bg-gray-100"
                >
                  <iframe
                    src="${details.result.youtube.replace("watch?v=", "embed/")}"
                    class="absolute inset-0 w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  >
                  </iframe>
                </div>
              </div>
            </div>
            

            <!-- Right Column - Nutrition -->
<div class="space-y-6">
  <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
    <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
      <i class="fa-solid fa-chart-pie text-emerald-600"></i>
      Nutrition Facts
    </h2>

    <div id="nutrition-facts-container">

      <p class="text-gray-400 text-sm">Calculating nutrition...</p>
    </div>
  </div>
</div>

            `;

  //------------------ingredientss دا عشلشان ال فيها اكتر من عنصر جوة
  function ingredientss() {
    let box = "";
    for (var i = 0; i < details.result.ingredients.length; i++) {
      box += `  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">${details.result.ingredients[i].measure}</span> ${details.result.ingredients[i].ingredient}
                      sauce
                    </span>
                  </div>`;
    }
    return box;
  }

  function renderInstructions(details) {
    let box = "";
    details.result.instructions.forEach((step, index) => {
      box += `
                    <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                     ${index + 1}
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                       ${step}
                    </p>
                  </div>
    `;
    });

    return box;
  }

  //-----------------------لازم الفيديو يبقي embaded يعم
  function getYouTubeEmbedUrl(url) {
    if (!url) return null;

    const videoId = url.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }
  //-----------------------------------------------------------------
  //-----------------------------------------بيانات ال nutrition

  const ingredientsForAPI = details.result.ingredients.map(
    (i) => `${i.measure} ${i.ingredient}`,
  );
  const nutrition = await fetchNutrition(
    details.result.name,
    ingredientsForAPI,
  );

  async function fetchNutrition(recipeName, ingredients) {
    try {
      let response = await fetch(
        "https://nutriplan-api.vercel.app/api/nutrition/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "X88YcqdxlnvRt5dDH06tdGYCGmcFZdTCevkYUoyi",
          },
          body: JSON.stringify({
            recipeName: recipeName,
            ingredients: ingredients,
          }),
        },
      );

      if (!response.ok) throw new Error("Nutrition API error");

      return await response.json();
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  //هعرض العدد الكلي فوق عند الصورة
  var hero_calories = document.getElementById("hero-calories");

  if (nutrition) {
    const perServing = nutrition.data.perServing;

    //هعرض العدد الكلي فوق عند الصورة
    hero_calories.innerText = `${perServing.calories} cal/serving`;

    display_log_meal_modal(perServing, details.result);

    document.getElementById("nutrition-facts-container").innerHTML = `
<p class="text-sm text-gray-500 mb-4">Per serving</p>

<div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
    <p class="text-sm text-gray-600">Calories per serving</p>
    <p class="text-4xl font-bold text-emerald-600">${perServing.calories}</p>
    <p class="text-xs text-gray-500 mt-1">Total: ${nutrition.data.totals.calories} cal</p>
</div>

<div class="space-y-4">
    ${[
      {
        label: "Protein",
        value: perServing.protein,
        color: "emerald",
        percent: Math.round(
          (perServing.protein / nutrition.data.totals.protein) * 100,
        ),
      },
      {
        label: "Carbs",
        value: perServing.carbs,
        color: "blue",
        percent: Math.round(
          (perServing.carbs / nutrition.data.totals.carbs) * 100,
        ),
      },
      {
        label: "Fat",
        value: perServing.fat,
        color: "purple",
        percent: Math.round((perServing.fat / nutrition.data.totals.fat) * 100),
      },
      {
        label: "Fiber",
        value: perServing.fiber,
        color: "orange",
        percent: Math.round(
          (perServing.fiber / nutrition.data.totals.fiber) * 100,
        ),
      },
      {
        label: "Sugar",
        value: perServing.sugar,
        color: "pink",
        percent: Math.round(
          (perServing.sugar / nutrition.data.totals.sugar) * 100,
        ),
      },
      {
        label: "Saturated Fat",
        value: perServing.saturatedFat,
        color: "red",
        percent: Math.round(
          (perServing.saturatedFat / nutrition.data.totals.saturatedFat) * 100,
        ),
      },
    ]
      .map(
        (n) => `
      <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-${n.color}-500"></div>
              <span class="text-gray-700">${n.label}</span>
          </div>
          <span class="font-bold text-gray-900">${n.value}g</span>
      </div>
      <div class="w-full bg-gray-100 rounded-full h-2">
          <div class="bg-${n.color}-500 h-2 rounded-full" style="width:${n.percent}%"></div>
      </div>
    `,
      )
      .join("")}
</div>

<div class="mt-6 pt-6 border-t border-gray-100">
    <h3 class="text-sm font-semibold text-gray-900 mb-3">Other</h3>
    <div class="grid grid-cols-2 gap-3 text-sm">
        <div class="flex justify-between">
            <span class="text-gray-600">Cholesterol</span>
            <span class="font-medium">${perServing.cholesterol}mg</span>
        </div>
        <div class="flex justify-between">
            <span class="text-gray-600">Sodium</span>
            <span class="font-medium">${perServing.sodium}mg</span>
        </div>
    </div>
</div>
`;
  }
}

//==========================================================================================================================================================
//=========================== Product Search & Barcode Scanner ===================================

let input_product_search = document.getElementById("product-search-input");
let bottom_product_search = document.getElementById("search-product-btn");

let input_Barcode_search = document.getElementById("barcode-input");
let lock_up = document.getElementById("lookup-barcode-btn");

let post = document.getElementById("products-grid");

let global_value;
// ------------------------------
bottom_product_search.addEventListener("click", function () {
  unified_search(input_product_search.value, false);
});

lock_up.addEventListener("click", function () {
  unified_search(input_Barcode_search.value, true);
});

// ------------------------------
async function unified_search(value_search, isBarcode = false) {
  if (!value_search) return;

  app_loading.classList.remove("hidden");

  let url = isBarcode
    ? `https://nutriplan-api.vercel.app/api/products/barcode/${value_search}`
    : `https://nutriplan-api.vercel.app/api/products/search?q=${value_search}&page=1&limit=24`;

  try {
    let response = await fetch(url);

    if (!response.ok) {
      global_value = null;
      displayall_search(isBarcode, value_search);
      return;
    }

    let data = await response.json();

    if (isBarcode) {
      // لو الباركود موجود حوله لمصفوفة
      if (data && data.result) {
        global_value = { results: [data.result] };
      } else {
        global_value = null;
      }
    } else {
      global_value = data;
    }

    displayall_search(isBarcode, value_search);
  } catch (err) {
    console.log("Error:", err);
    post.innerHTML = "<p class='text-red-500'>Error fetching products</p>";
  } finally {
    app_loading.classList.add("hidden");
  }
}
// -----------------------------

function displayall_search(isBarcode = false, search_value = "") {
  let products_count = document.getElementById("products-count");

  if (
    !global_value ||
    !global_value.results ||
    global_value.results.length === 0
  ) {
    products_count.innerHTML = `No product found for ${isBarcode ? "Barcode" : "Search"} "${search_value}"`;
    post.innerHTML = "";
    return;
  }

  if (isBarcode) {
    products_count.innerHTML = `Found 1 product for Barcode "${search_value}"`;
  } else {
    products_count.innerHTML = `Found ${global_value.pagination.total} products for "${search_value}"`;
  }

  var box = "";
  for (var i = 0; i < global_value.results.length; i++) {
    let product = global_value.results[i];

    box += `
      <div   onclick="ProductDetailsModal('${product.barcode}')"  class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group">
        <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            src="${product.image || ""}" alt="${product.name || ""}" loading="lazy" />

          <div class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
            Nutri-Score ${product.nutritionGrade || "-"}
          </div>

          <div class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            ${product.novaGroup || "0"}
          </div>
        </div>

        <div class="p-4">
          <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">${product.brand || "Unknown Brand"}</p>
          <h3 class="font-bold text-gray-900 mb-2 line-clamp-2">${product.name || ""}</h3>

          <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span><i class="fa-solid fa-fire mr-1"></i> ${product.nutrients?.calories ?? 0} kcal</span>
          </div>

          <div class="grid grid-cols-4 gap-1 text-center">
            <div class="bg-emerald-50 rounded p-1.5">
              <p class="text-xs font-bold text-emerald-700">${product.nutrients?.protein ?? 0}g</p>
              <p class="text-[10px] text-gray-500">Protein</p>
            </div>
            <div class="bg-blue-50 rounded p-1.5">
              <p class="text-xs font-bold text-blue-700">${product.nutrients?.carbs ?? 0}g</p>
              <p class="text-[10px] text-gray-500">Carbs</p>
            </div>
            <div class="bg-purple-50 rounded p-1.5">
              <p class="text-xs font-bold text-purple-700">${product.nutrients?.fat ?? 0}g</p>
              <p class="text-[10px] text-gray-500">Fat</p>
            </div>
            <div class="bg-orange-50 rounded p-1.5">
              <p class="text-xs font-bold text-orange-700">${product.nutrients?.sugar ?? 0}g</p>
              <p class="text-[10px] text-gray-500">Sugar</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  post.innerHTML = box;
}
//-------------------------------------------------------------------------filter botton
document.querySelectorAll(".nutri-score-filter").forEach((btn) => {
  btn.addEventListener("click", function () {
    filterByNutriScore(this.dataset.grade);
  });
});

// -------------------
function filterByNutriScore(grade) {
  if (!global_value || !global_value.results) return;

  let resultsToShow;

  if (!grade) {
    resultsToShow = global_value.results;
  } else {
    resultsToShow = global_value.results.filter(
      (p) => p.nutritionGrade?.toLowerCase() === grade.toLowerCase(),
    );
  }

  displayFilteredResults(resultsToShow, grade || "All");
}
// ---------------
function displayFilteredResults(results, grade) {
  let products_count = document.getElementById("products-count");

  if (!results || results.length === 0) {
    products_count.innerHTML = `No products with Nutri-Score ${grade}`;
    post.innerHTML = "";
    return;
  }

  products_count.innerHTML = `Found ${results.length} products with Nutri-Score ${grade}`;

  let box = "";
  for (let product of results) {
    box += `
      <div   onclick="ProductDetailsModal('${product.barcode}')"  class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group">
        <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            src="${product.image || ""}" alt="${product.name || ""}" loading="lazy" />

          <div class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
            Nutri-Score ${product.nutritionGrade || "-"}
          </div>

          <div class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            ${product.novaGroup || "0"}
          </div>
        </div>

        <div class="p-4">
          <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">${product.brand || "Unknown Brand"}</p>
          <h3 class="font-bold text-gray-900 mb-2 line-clamp-2">${product.name || ""}</h3>

          <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span><i class="fa-solid fa-fire mr-1"></i> ${product.nutrients?.calories ?? 0} kcal</span>
          </div>

          <div class="grid grid-cols-4 gap-1 text-center">
            <div class="bg-emerald-50 rounded p-1.5">
              <p class="text-xs font-bold text-emerald-700">${product.nutrients?.protein ?? 0}g</p>
              <p class="text-[10px] text-gray-500">Protein</p>
            </div>
            <div class="bg-blue-50 rounded p-1.5">
              <p class="text-xs font-bold text-blue-700">${product.nutrients?.carbs ?? 0}g</p>
              <p class="text-[10px] text-gray-500">Carbs</p>
            </div>
            <div class="bg-purple-50 rounded p-1.5">
              <p class="text-xs font-bold text-purple-700">${product.nutrients?.fat ?? 0}g</p>
              <p class="text-[10px] text-gray-500">Fat</p>
            </div>
            <div class="bg-orange-50 rounded p-1.5">
              <p class="text-xs font-bold text-orange-700">${product.nutrients?.sugar ?? 0}g</p>
              <p class="text-[10px] text-gray-500">Sugar</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  post.innerHTML = box;
}

//------------------------------------------------------------------------- Browse by Category
document.querySelectorAll(".product-category-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    let category = this.dataset.category;
    if (category) {
      // نبحث عادي ومش باركود
      unified_search(category, false);
    }
  });
});
//------------------------------------------------------------------------- product_barcode modal
let modal_view = document.getElementById("product-detail-modal");

function ProductDetailsModal(product_barcode) {
  console.log(product_barcode);
  api_ProductDetailsModal(product_barcode);

  modal_view.classList.remove("hidden");
}
async function api_ProductDetailsModal(barcode) {
  let response = await fetch(
    `https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`,
  );
  if (response.ok) {
    let data_modal = await response.json();

    display_modal(data_modal);
  } else {
    console.log("error");
  }
}

function display_modal(modal) {
  let product = modal.results ? modal.results[0] : modal.result;
  let box = ` 
    <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <!-- Header -->
        <div class="flex items-start gap-6 mb-6">
          <div class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-contain">
          </div>
          <div class="flex-1">
            <p class="text-sm text-emerald-600 font-semibold mb-1">${product.brand}</p>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">${product.name}</h2>
            <p class="text-sm text-gray-500 mb-3">1.5 l</p>
            
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: #03814120">
                <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold" style="background-color: #038141">
                  A
                </span>
                <div>
                  <p class="text-xs font-bold" style="color: #038141">Nutri-Score</p>
                  <p class="text-[10px] text-gray-600">${product.nutritionGrade || "N/A"}</p>
                </div>
              </div>
              
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: #03814120">
                <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style="background-color: #038141">
                  ${product.novaGroup || "-"}
                </span>
                <div>
                  <p class="text-xs font-bold" style="color: #038141">NOVA</p>
                  <p class="text-[10px] text-gray-600">Unprocessed</p>
                </div>
              </div>
            </div>
          </div>
          <button class="close-product-modal text-gray-400 hover:text-gray-600">✖</button>
        </div>

        <!-- Nutrition Facts -->
        <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200">
          <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
            Nutrition Facts <span class="text-sm font-normal text-gray-500">(per 100g)</span>
          </h3>
          <div class="text-center mb-4 pb-4 border-b border-emerald-200">
            <p class="text-4xl font-bold text-gray-900">${product.nutrients.calories || 0}</p>
            <p class="text-sm text-gray-500">Calories</p>
          </div>
          <div class="grid grid-cols-4 gap-4">
            <div class="text-center">
              <p class="text-lg font-bold text-emerald-600">${product.nutrients.protein || 0}g</p>
              <p class="text-xs text-gray-500">Protein</p>
            </div>
            <div class="text-center">
              <p class="text-lg font-bold text-blue-600">${product.nutrients.carbs || 0}g</p>
              <p class="text-xs text-gray-500">Carbs</p>
            </div>
            <div class="text-center">
              <p class="text-lg font-bold text-purple-600">${product.nutrients.fat || 0}g</p>
              <p class="text-xs text-gray-500">Fat</p>
            </div>
            <div class="text-center">
              <p class="text-lg font-bold text-orange-600">${product.nutrients.sugar || 0}g</p>
              <p class="text-xs text-gray-500">Sugar</p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3">
          <button class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all" data-barcode="${product.barcode}">
            Log This Food
          </button>
          <button class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
            Close
          </button>
        </div>
      </div>
    </div>
  `;

  modal_view.innerHTML = box;

  // close button
  modal_view.querySelectorAll(".close-product-modal").forEach((btn) => {
    btn.addEventListener("click", () => {
      modal_view.classList.add("hidden");
    });
  });

  [log_meal_modal, modal_view].forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  });

  modal_view
    .querySelector(".add-product-to-log")
    .addEventListener("click", () => {
      addToFoodLog({
        id: product.barcode,
        type: "product",
        name: product.name,
        thumbnail: product.image,
        calories: product.nutrients.calories,
        protein: product.nutrients.protein,
        carbs: product.nutrients.carbs,
        fat: product.nutrients.fat,
        servings: product.brand || "Unknown Brand",
        time: new Date().toLocaleTimeString(),
      });

      modal_view.classList.add("hidden");
      alert("Product added to Food Log ✅");
    });
}
//-------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------- log_meal_modal
let log_meal_modal = document.getElementById("log-meal-modal");

function display_log_meal_modal(nutrition_data, meal) {
  let nutritions = nutrition_data.results
    ? nutrition_data.results[0]
    : nutrition_data.result;
  let box = ` 
    <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                <div class="flex items-center gap-4 mb-6">
                    <img src="${meal.thumbnail}" alt="${meal.name}" class="w-16 h-16 rounded-xl object-cover">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
                        <p class="text-gray-500 text-sm">${meal.name}</p>
                    </div>
                </div>
                
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Servings</label>
                    <div class="flex items-center gap-3">
                       
                        <input type="number" id="meal-servings" value="1" min="0.5" max="10" step="0.5" class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-lg py-2">
                       
                    </div>
                </div>
                
                
                <div class="bg-emerald-50 rounded-xl p-4 mb-6">
                    <p class="text-sm text-gray-600 mb-2">Estimated nutrition per serving:</p>
                    <div class="grid grid-cols-4 gap-2 text-center">
                        <div>
                            <p class="text-lg font-bold text-emerald-600" id="modal-calories">${nutrition_data.calories}</p>
                            <p class="text-xs text-gray-500">Calories</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-blue-600" id="modal-protein">${nutrition_data.protein}g</p>
                            <p class="text-xs text-gray-500">Protein</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-amber-600" id="modal-carbs">${nutrition_data.carbs}g</p>
                            <p class="text-xs text-gray-500">Carbs</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-purple-600" id="modal-fat">${nutrition_data.fat}g</p>
                            <p class="text-xs text-gray-500">Fat</p>
                        </div>
                    </div>
                </div>
                
                
                <div class="flex gap-3">
                    <button id="cancel-log-meal" class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                        Cancel
                    </button>
                    <button id="confirm-log-meal" class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all">
                        <i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-clipboard-list" data-prefix="fas" data-icon="clipboard-list" role="img" viewBox="0 0 384 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M311.4 32l8.6 0c35.3 0 64 28.7 64 64l0 352c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l8.6 0C83.6 12.9 104.3 0 128 0L256 0c23.7 0 44.4 12.9 55.4 32zM248 112c13.3 0 24-10.7 24-24s-10.7-24-24-24L136 64c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0zM128 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm32 0c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0c-13.3 0-24 10.7-24 24zm0 128c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0c-13.3 0-24 10.7-24 24zM96 416a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"></path></svg></i>
                        Log Meal
                    </button>
                </div>
            </div>
  `;
  log_meal_modal.innerHTML = box;

  [log_meal_modal, modal_view].forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  });

  //-------------------
  document.getElementById("confirm-log-meal").addEventListener("click", () => {
    const servings = parseFloat(document.getElementById("meal-servings").value);

    addToFoodLog({
      id: meal.id,
      type: "meal",
      name: meal.name,
      thumbnail: meal.thumbnail,
      calories: nutrition_data.calories * servings,
      protein: nutrition_data.protein * servings,
      carbs: nutrition_data.carbs * servings,
      fat: nutrition_data.fat * servings,
      servings,
      time: new Date().toLocaleTimeString(),
    });

    log_meal_modal.classList.add("hidden");
    alert("Meal added to Food Log ✅");
  });

  //------------------

  document.getElementById("cancel-log-meal").addEventListener("click", () => {
    log_meal_modal.classList.add("hidden");
  });
}

//==========================================================================================================================
//=============== Food Log page

//تاريخ لنهاردة
function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}
//لو فيه بيانات رجعها Object
function getFoodLog() {
  return JSON.parse(localStorage.getItem("foodLog")) || {};
}

function saveFoodLog(log) {
  localStorage.setItem("foodLog", JSON.stringify(log));
}

function addToFoodLog(item) {
  const log = getFoodLog();
  const today = getTodayKey();

  if (!log[today]) {
    log[today] = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      items: [],
    };
  }

  log[today].calories += item.calories;
  log[today].protein += item.protein;
  log[today].carbs += item.carbs;
  log[today].fat += item.fat;

  log[today].items.push(item);
  saveFoodLog(log);

  updateProgressBars(log[today]);
}

function loadTodayProgress() {
  const log = getFoodLog();
  const today = getTodayKey();

  if (log[today]) {
    updateProgressBars(log[today]);
    renderLoggedItems(log[today].items);
  } else {
    updateProgressBars({
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    });
  }
}

const DAILY_LIMITS = {
  calories: 2000,
  protein: 50,
  carbs: 250,
  fat: 65,
};

function updateProgressBars(data) {
  updateBar("calories", data.calories, DAILY_LIMITS.calories);
  updateBar("protein", data.protein, DAILY_LIMITS.protein);
  updateBar("carbs", data.carbs, DAILY_LIMITS.carbs);
  updateBar("fat", data.fat, DAILY_LIMITS.fat);

  document.getElementById("ProgressCalories").innerHTML =
    `${data.calories} / ${DAILY_LIMITS.calories} kcal`;

  document.getElementById("ProgressProtein").innerHTML =
    `${data.protein} / ${DAILY_LIMITS.protein} g`;

  document.getElementById("ProgressCarbs").innerHTML =
    `${data.carbs} / ${DAILY_LIMITS.carbs} g`;

  document.getElementById("ProgressFat").innerHTML =
    `${data.fat} / ${DAILY_LIMITS.fat} g`;
}

function updateBar(type, value, max) {
  const percent = Math.min((value / max) * 100, 100);
  document.querySelector(`.${type}-bar`).style.width = percent + "%";
}

const countTitle = document.querySelector("h4");

function renderLoggedItems(items) {
  const container = document.getElementById("logged-items-list");

  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-gray-500">
        <i class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"></i>
        <p class="font-medium">No meals logged today</p>
      </div>
    `;
    return;
  }

  countTitle.innerText = `Logged Items (${items.length})`;

  items.forEach((item) => {
    container.innerHTML += `
     
                    <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                        <div class="flex items-center gap-4">
                            <img src="${item.thumbnail}" alt="${item.name}" class="w-14 h-14 rounded-xl object-cover">
                            <div>
                                <p class="font-semibold text-gray-900">${item.name}</p>
                                <p class="text-sm text-gray-500">
                                    ${item.servings} serving
                                    <span class="mx-1">•</span>
                                    <span class="text-emerald-600">${item.type}</span>
                                </p>
                                <p class="text-xs text-gray-400 mt-1">${item.time}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-right">
                                <p class="text-lg font-bold text-emerald-600">${item.calories}</p>
                                <p class="text-xs text-gray-500">kcal</p>
                            </div>
                            <div class=" md:flex gap-2 text-xs text-gray-500">
                                <span class="px-2 py-1 bg-blue-50 rounded">${item.protein}g P</span>
                                <span class="px-2 py-1 bg-amber-50 rounded">${item.carbs}g C</span>
                                <span class="px-2 py-1 bg-purple-50 rounded">${item.fat}g F</span>
                            </div>
                            <button class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2" data-index="0">
                                <i data-fa-i2svg=""><svg class="svg-inline--fa fa-trash-can" data-prefix="fas" data-icon="trash-can" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z"></path></svg></i>
                            </button>
                        </div>
                    </div>
                
    `;

    // بعد عرض كل العناصر
    document.querySelectorAll(".remove-foodlog-item").forEach((btn, index) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const log = getFoodLog();
        const today = getTodayKey();

        if (log[today] && log[today].items[index]) {
          // خصم القيم الغذائية قبل الحذف
          const item = log[today].items[index];
          log[today].calories -= item.calories;
          log[today].protein -= item.protein;
          log[today].carbs -= item.carbs;
          log[today].fat -= item.fat;

          // حذف العنصر
          log[today].items.splice(index, 1);

          saveFoodLog(log);

          // إعادة عرض الصفحة
          renderFoodLogPage();
        }
      });
    });
  });
}

FoodLogbotton.addEventListener("click", function () {
  products.classList.add("hidden");
  meals.classList.add("hidden");
  mealDetails.classList.add("hidden");
  foodlog.classList.remove("hidden");
  HeroSection.classList.add("hidden");
  bottonProductScanner.classList.remove("bg-emerald-50", "text-emerald-700");
  FoodLogbotton.classList.add("bg-emerald-50", "text-emerald-700");
  Mealsbottom.classList.remove("bg-emerald-50", "text-emerald-700");
  header_title.innerHTML = `
     <h1 class="text-2xl font-bold text-gray-900">
         Food Log
     </h1>
      <p class="text-sm text-gray-500 mt-1">
        Track your daily nutrition and food intake
      </p>`;

  renderFoodLogPage();

  // زر مسح اليوم
  const clearFoodLogBtn = document.getElementById("clear-foodlog");
  if (clearFoodLogBtn) {
    clearFoodLogBtn.addEventListener("click", () => {
      const log = getFoodLog();
      const today = getTodayKey();

      if (log[today]) {
        if (confirm("Are you sure you want to clear today's food log?")) {
          delete log[today]; //
          saveFoodLog(log);

          updateProgressBars({
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            items: [],
          });

          // مسح قائمة العناصر
          const itemsList = document.getElementById("logged-items-list");
          if (itemsList) {
            itemsList.innerHTML = `<p class="text-gray-500 text-sm">No food logged today.</p>`;
          }

          alert("Today's food log cleared ");
        }
      } else {
        alert("No food logged today.");
      }
    });
  }
  //-----------------------
});

function renderFoodLogPage() {
  const log = getFoodLog();
  const today = getTodayKey();

  if (!log[today]) return;

  updateProgressBars(log[today]);
  renderLoggedItems(log[today].items);
  countTitle.innerText = `Logged Items (${items.length})`;
}

document.getElementById("add-product-btn").addEventListener("click", () => {
  addToFoodLog(product);
  alert("Product added to Food Log -_-");
});

//-----------------------------------
