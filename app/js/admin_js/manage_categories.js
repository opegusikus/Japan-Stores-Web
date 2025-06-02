
// Get categories info from the server and display them
async function getCategoriesInfo() {
  const response = await fetch('/api/category/read', {
    method: 'GET',
    credentials: 'include'
  });

  const data = await response.json();
  console.log(data);
  data.forEach(category => {
    console.log(category.name);
  })
  return data;
};

async function displayCategoriesInfo() {
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
    })
}

async function displayCategoriesForItemCreation() {
    const data = await getCategoriesInfo();
    data.forEach(category => {
        var categoriesDropdown = document.getElementById("category-id")
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name + " (ID: " + category.id + ", " + category.description + ")";
        categoriesDropdown.appendChild(option);
    });
}
displayCategoriesForItemCreation()

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
        updateCategoriesDisplay()
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
    updateCategoriesDisplay()
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

export { displayCategoriesInfo, updateCategoriesDisplay, createCategory, updateCategory, deleteCategory, editCategory, cancelEditCategory, clearCategoriesDisplay };