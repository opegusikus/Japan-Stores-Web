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
  data.forEach(car => {
    const div = document.createElement("div");
    console.log(car.id);
    div.innerHTML = `<h3>${car.name}</h3><h3>ID: ${car.id}</h3><p>${car.description}</p>
    <input type="text" style="display: none" id="category-name-${car.id}" placeholder="Category name" value="${car.name}">
    <input type="text" style="display: none" id="category-descr-${car.id}" placeholder="Category description" value="${car.description}">
    <button class="admin-btn" style="display: none" id="admin-categorySaveUpdate-btn-${car.id}" onclick="updateCategory(${car.id})">Save</button>
    <button class="admin-btn" style="display: none" id="admin-categoryCancelUpdate-btn-${car.id}" onclick="cancelUpdateCategory(${car.id})">Cancel</button>
    <button class="admin-btn" id="admin-update-btn" onclick="editCategory(${car.id})">Edit</button>
    <button class="admin-btn" style="background-color: brown;" id="admin-del-btn" onclick="deleteCategory(${car.id})">Delete</button>
    
    `;
    div.classList.add('category-block-area');
    document.querySelector('.categories-display-container').appendChild(div);

  })

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

function editCategory(categoryId) {
    let categoriesDisplayContainer = document.querySelector('.categories-display-container');
    console.log(categoryId);
    categoriesDisplayContainer.querySelector(`#category-name-${categoryId}`).style.display = "block";
    categoriesDisplayContainer.querySelector(`#category-descr-${categoryId}`).style.display = "block";
    categoriesDisplayContainer.querySelector(`#admin-categoryCancelUpdate-btn-${categoryId}`).style.display = "block";
    categoriesDisplayContainer.querySelector(`#admin-categorySaveUpdate-btn-${categoryId}`).style.display = "block";
}

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
    categoriesDisplayContainer.querySelector(`#admin-categoryCancelUpdate-btn-${categoryId}`).style.display = "none";
    categoriesDisplayContainer.querySelector(`#admin-categorySaveUpdate-btn-${categoryId}`).style.display = "none";
    updateCategoriesDisplay()
}

function cancelUpdateCategory(categoryId) {
    let categoriesDisplayContainer = document.querySelector('.categories-display-container');
    categoriesDisplayContainer.querySelector(`#category-name-${categoryId}`).style.display = "none";
    categoriesDisplayContainer.querySelector(`#category-descr-${categoryId}`).style.display = "none";
    categoriesDisplayContainer.querySelector(`#admin-categoryCancelUpdate-btn-${categoryId}`).style.display = "none";
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

function updateCategoriesDisplay() {
    clearCategoriesDisplay();
    getCategoriesInfo();
}

export { getCategoriesInfo, updateCategoriesDisplay, createCategory, updateCategory, deleteCategory, editCategory, cancelUpdateCategory, clearCategoriesDisplay };