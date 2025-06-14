import { updateItemsDisplay } from './manage_items.js';

// Get categories info from the server and display them
async function getCategoriesInfo() {
  const response = await fetch('/api/category/read', {
    method: 'GET',
    credentials: 'include'
  });

  const data = await response.json();
//   console.log(data);
//   data.forEach(category => {
//     console.log(category.name);
//   })
  return data;
};

async function displayCategoriesInfo() {
    // Custom select dropdown functionality 1
    // ------------------------------------
    const select = document.getElementById('customSelect');
    const header = document.getElementById('selectHeader');
    const options = document.getElementById('options');
    const allOption = document.createElement('div');
    allOption.classList.add('option'); //All items option
    allOption.textContent = 'Всі товари';
    allOption.dataset.id = 'all';
    allOption.addEventListener('click', () => { 
        header.textContent = 'Всі товари';
        header.dataset.id = 'all';
        options.classList.remove('show');
        // Тут можна зробити fetch або іншу дію
    });
    options.appendChild(allOption);
    header.textContent = 'Всі товари';
    header.dataset.id = 'all';
    // ------------------------------------

    const data = await getCategoriesInfo();
    console.log(data);
    data.forEach(category => {
    const div = document.createElement("div");
    
    div.innerHTML = `<h3>${category.name}</h3><h3>ID: ${category.id}</h3><p>${category.description}</p>
    <input type="text" style="display: none" id="category-name-${category.id}" placeholder="Category name" value="${category.name}">
    <input type="text" style="display: none" id="category-descr-${category.id}" placeholder="Category description" value="${category.description}">
    <button class="admin-btn" style="display: none" id="admin-categorySaveUpdate-btn-${category.id}">Save</button>
    <button class="admin-btn" style="display: none" id="admin-categorycancelEdit-btn-${category.id}">Cancel</button>
    <button class="admin-btn" id="admin-update-btn-${category.id}">Edit</button>
    <button class="admin-btn" style="background-color: brown;" id="admin-del-btn-${category.id}">Delete</button>
    
    `;
    div.classList.add('category-block-area');
    document.querySelector('.categories-display-container').appendChild(div);


    // Save btn
    var categorySaveUpdateBtn = document.getElementById(`admin-categorySaveUpdate-btn-${category.id}`);
    categorySaveUpdateBtn.addEventListener('click', function() {
        updateCategory(category.id);
    });

    // Cancel btn
    var categorycancelEditBtn = document.getElementById(`admin-categorycancelEdit-btn-${category.id}`);
    categorycancelEditBtn.addEventListener('click', function() {
        cancelEditCategory(category.id);
    });

    // Edit btn
    var editBtn = document.getElementById(`admin-update-btn-${category.id}`);
    editBtn.addEventListener('click', function() {
        editCategory(category.id);
    });

    // Delete btn
    var deleteBtn = document.getElementById(`admin-del-btn-${category.id}`);
    deleteBtn.addEventListener('click', function() {
        deleteCategory(category.id);
    });

    // Custom select dropdown functionality 2
    // ------------------------------------
        const option = document.createElement('div');
        option.classList.add('option');
        option.textContent = category.name;
        option.dataset.id = category.id;

        // Дія при натисканні
        option.addEventListener('click', () => {
            header.textContent = category.name;
            header.dataset.id = category.id;
            options.classList.remove('show');
        });
        options.appendChild(option);
    }) //ForEach ends here

    // Закриваємо селект при кліку поза ним
    document.addEventListener('click', (e) => {
    if (!select.contains(e.target)) {
        options.classList.remove('show');
    }
    });
    // Показати / сховати список
    header.addEventListener('click', () => {
        options.classList.toggle('show');
    // ------------------------------------
    });
}

document.addEventListener('DOMContentLoaded', () => {
  displayCategoriesInfo();
  displayCategoriesForItemCreation();
});




async function displayCategoriesForItemCreation() {
    const data = await getCategoriesInfo();
    let categoriesSelectionCreation = document.getElementById("category-id")
    // console.log(categoriesSelectionCreation);
    data.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name + " (ID: " + category.id + ", " + category.description + ")";
        categoriesSelectionCreation.appendChild(option);
    });
}


// async function deleteCookie() {
//     const response = await fetch('/api/category/deleteCookie', {
//         method: 'DELETE',
//         credentials: 'include'
//     });

//     const result = await response.json();
//     console.log(result);
//     if (result.status === 0) {
//         alert("Cookie deleted successfully");
//     } else {
//         alert("Failed to delete cookie: " + (result.error || "Unknown error"));
//     }
// }

async function createCategory() {
    let name = document.getElementById("category-name").value;
    let description = document.getElementById("category-descr").value;
    console.log(name);
    console.log(description);
    if (name === "" || description === "") {
        alert("Please fill in all fields");
        return;
    }
    else {
        const response = await fetch('/api/category/create', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                description: description
            })
        })
        const result = await response.json();
        console.log(result);
        alert("Category created");
        updateCategoriesDisplay();
    }

    // if (result.status === 0) {
    //     alert("✅ Category created successfully");
    //     // Optionally reload or update category list:
    //     clearCategoriesDisplay()
    //     getCategoriesInfo()
    // } 
    // else {
    //     alert("❌ Failed to create category: " + (result.error || "Unknown error"));
    // }
    
}

// Opens category edit form
function editCategory(categoryId) {
    let categoriesDisplayContainer = document.querySelector('.categories-display-container');
    // console.log(categoryId);
    categoriesDisplayContainer.querySelector(`#category-name-${categoryId}`).style.display = "block";
    categoriesDisplayContainer.querySelector(`#category-descr-${categoryId}`).style.display = "block";
    categoriesDisplayContainer.querySelector(`#admin-categorycancelEdit-btn-${categoryId}`).style.display = "block";
    categoriesDisplayContainer.querySelector(`#admin-categorySaveUpdate-btn-${categoryId}`).style.display = "block";
}
// Update category information on a server
async function updateCategory(categoryId) {
    let categoriesDisplayContainer = document.querySelector('.categories-display-container');
    let name = categoriesDisplayContainer.querySelector(`#category-name-${categoryId}`).value;
    let description = categoriesDisplayContainer.querySelector(`#category-descr-${categoryId}`).value;
    const response = await fetch('/api/category/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: categoryId,
            name: name,
            description: description
        })
    })
    const result = await response.json();
    console.log(result);
    alert("Category updated");

    categoriesDisplayContainer.querySelector(`#category-name-${categoryId}`).style.display = "none";
    categoriesDisplayContainer.querySelector(`#category-descr-${categoryId}`).style.display = "none";
    categoriesDisplayContainer.querySelector(`#admin-categorycancelEdit-btn-${categoryId}`).style.display = "none";
    categoriesDisplayContainer.querySelector(`#admin-categorySaveUpdate-btn-${categoryId}`).style.display = "none";
    updateCategoriesDisplay();
    updateItemsDisplay();
}
// Cancel category update
function cancelEditCategory(categoryId) {
    let categoriesDisplayContainer = document.querySelector('.categories-display-container');
    categoriesDisplayContainer.querySelector(`#category-name-${categoryId}`).style.display = "none";
    categoriesDisplayContainer.querySelector(`#category-descr-${categoryId}`).style.display = "none";
    categoriesDisplayContainer.querySelector(`#admin-categorycancelEdit-btn-${categoryId}`).style.display = "none";
    categoriesDisplayContainer.querySelector(`#admin-categorySaveUpdate-btn-${categoryId}`).style.display = "none";
}

async function deleteCategory(categoryId) {
    console.log(categoryId);
    const response = await fetch('/api/category/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: categoryId
            })
        })
        const result = await response.json();
        console.log(result);
        alert("Category deleted");
        updateCategoriesDisplay()
}

function clearCategoriesDisplay() {
    document.querySelector('.categories-display-container').innerHTML = '';
}

function clearCategoriesListForCreation() {
    let categoriesDropdown = document.getElementById("category-id");
    while (categoriesDropdown.firstChild) {
        categoriesDropdown.removeChild(categoriesDropdown.firstChild);
    }
}

function updateCategoriesDisplay() {
    clearCategoriesListForCreation()
    clearCategoriesDisplay();
    displayCategoriesInfo();
    displayCategoriesForItemCreation();
}

export { displayCategoriesInfo, updateCategoriesDisplay, createCategory, updateCategory, deleteCategory, editCategory, cancelEditCategory, clearCategoriesDisplay, getCategoriesInfo };