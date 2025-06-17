// ITEMS
// import { response } from 'express';
// import e from 'express';
import { getCategoriesInfo } from './manage_categories.js';

async function getItemsInfo() {
  const response = await fetch('/api/item/read', {
    method: 'POST',
    credentials: 'include',
  });

  const data = await response.json();
  return data;
}

// document.getElementById('admin-select-display-byCategory').addEventListener('change', displayItems());



// document.addEventListener("DOMContentLoaded", () => {
//   const select = document.getElementById("admin-select-display-byCategory");
  
//   select.addEventListener("change", async () => {
//     const value = select.value;
//     const category_id = value === "null" ? null : Number(value);

//     console.log("Selected category_id:", category_id);

//     const response = await fetch('./api/item/read', {
//       method: 'POST',
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({"category_id": category_id }),
//     });

//     const data = await response.json();
//     console.log("Fetched items:", data);
//     // тут вивід на сторінку
//   });
// });

const searchBtn = document.getElementById('items-nav-search-btn');
searchBtn.addEventListener('click', searchByName);

async function searchByName() {
    const searchInput = document.getElementById('items-nav-search-input');
    const searchInputValue = searchInput.value.trim();
    const response = await fetch('./api/item/read', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
        body: JSON.stringify({"name": searchInputValue})
  });
  const data = await response.json();
  console.log(data);
  return data;
}


async function getItemsInfoByCategory() {//(param)
    const itemsFilterSelect = document.getElementById('selectHeader');
    let targetCategory = itemsFilterSelect.dataset.id;
    const payload = targetCategory === "all" ? null : targetCategory;
    const response = await fetch('./api/item/read', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
        body: JSON.stringify({"category_id": payload})
  });
  const data = await response.json();
  return data;
};



// getItemsInfoByParam();

async function createItem() {
    let categoryId = document.getElementById('category-id').value; // Replace with actual category ID or logic to get it
    let short_description = document.getElementById('previewDescr-creation').value;
    let imgSrc = document.getElementById('item-creation-img-src-input').value; // Replace with actual image source logic
    let nameEditInput = document.querySelector('#blockName-creation');
    let markupStr = $('#summernote').summernote('code');
    let price = document.getElementById('priceInput').value;
    let quantity = document.getElementById('item-creation-quantityInput').value;
    console.log(markupStr);
    if (!categoryId  || categoryId === "null" || short_description === "" || markupStr === "<p><br></p>" || imgSrc === "" || quantity === "" || price === "") {
        alert("Please enter all required fields: category, short description, image URL etc.");
        return;
    }
    else {
        const response = await fetch('/api/item/create', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: nameEditInput.value,
            category_id: categoryId,
            short_description: short_description,
            long_description: markupStr,
            price: price,
            image_url: imgSrc,
            availability: quantity
        })
    });
    const data = await response.json();
    console.log(data);
    alert("Item created");
    updateItemsDisplay()
    }
}

async function updateItem(id) {     
    const imageUrlEdit = document.getElementById('item-edit-img-src-input').value;
    const categoryEdit = document.getElementById('category-id').value;
    const nameEdit = document.getElementById('blockName').value;
    const shortDescriptionEdit = document.getElementById('previewDescr').value;
    const priceEdit = document.getElementById('priceInput').value;
    const quantityEdit = document.getElementById('item-quantityInput-edit').value;
    const markupStrEdit = $('#summernote-edit').summernote('code');
    console.group(`LOG`)
    console.log(imageUrlEdit);
    console.log(categoryEdit);
    console.log(nameEdit);
    console.log(shortDescriptionEdit);
    console.log(priceEdit);
    console.log(quantityEdit);
    console.log(markupStrEdit);
    console.groupEnd(`LOG`)
    const response = await fetch('/api/item/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },//
        body: JSON.stringify({
            id: id,
            name: nameEdit,
            category_id: categoryEdit,
            short_description: shortDescriptionEdit,
            long_description: 'markupStr',
            price: priceEdit,
            image_url: imageUrlEdit,
            availability: quantityEdit
        })
    })
    const result = await response.json();
    console.log(result);
    alert("Item updated");
    updateItemsDisplay();
}

async function deleteItem(itemId) {
    const response = await fetch('/api/item/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: itemId
        })
    });
    const data = await response.json();
    // console.log(data);
    alert("Item deleted");
    updateItemsDisplay()
}

//image upload and refresh
async function displayItems() {
    clearAllItems(); 
    let itemsSection = document.getElementById("items-section");
    const itemsList = await getItemsInfoByCategory();
    // console.log(itemsList);
    itemsList.forEach(item => {

        const displayBlock = document.createElement('div');
        displayBlock.className = 'item-container';
        displayBlock.dataset.blockId = item.id; // автоматично створить data-block-id
        
        // <img src="${item.img}" class="item-container-preview-img" id="creation-img-src"></img>
                                    // <h4 class="item-container-preview-statusBar-status" id="statusBar-status" style="display: block;">${availability}</h4>
        item.block = displayBlock;
        displayBlock.innerHTML = `
            <div class="item-container-onclick" onclick="window.location.href='/item.html?id=${item.id}'">
                <p id="item-id">ID: ${item.id}</p>
                <p id="item-category-id">Category ID: ${item.category_id}</p>

                <div class="item-container-preview" id="item-container-preview"> <!--flex-->
                    <div class="item-container-preview-img-container">
                        <img scr="${item.image_url}" class="item-container-preview-img">
                    </div>

                    <div class="item-container-preview-text"> <!-- Right part -->
                        <div class="item-container-preview-statusBar"> <!-- flex; space-between; -->
                            <h3 class="item-container-preview-statusBar-title" id="statusBar-title" style="display: block;">${item.name}</h3>
                        </div>
                        <p class="item-container-preview-s-descr" id="item-container-s-description"> <!-- Short description -->
                            ${item.short_description}
                        </p>
                    </div>
                </div>
                <a href="/item.html?id=${item.id}">View Item</a>
                <div class="item-container-d-description" id="item-container-d-description-div"> <!-- Detailed description / expandable -->
                    <p id="item-container-d-description-p" style="display: block;">
                        ${item.long_description}
                    </p>
                </div>
                <div style="display: flex; justify-content: flex-start;" id="priceDisplay">
                    <h2 class="price">₴</h2>
                    <h2 class="price" id="price">${item.price}</h2>
                    <h2 class="price" style="margin-left:10px;">грн</h2>
                </div>
            </div>
            <button class="admin-btn" id="admin-edit-btn-${item.id}">Редагувати</button>
            <button class="admin-btn" id="admin-delete-btn-${item.id}">Видалити</button>
        `;//onclick="shrinkBlock(${item.id})"
        itemsSection.appendChild(displayBlock)
        document.getElementById(`admin-edit-btn-${item.id}`).addEventListener('click', function() {
            editItem(item.id);
        });
        document.getElementById(`admin-delete-btn-${item.id}`).addEventListener('click', function() {
            deleteItem(item.id);
        });
    })
}

async function displayCategoriesForItemEdit() { //select for every item inside item edit
    const data = await getCategoriesInfo();

    let categoriesSelectionEdit = document.getElementById("category-id")
    data.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name + " (ID: " + category.id + ", " + category.description + ")";
        categoriesSelectionEdit.appendChild(option);
    });
}



function editItem(id) {

    const itemBlock = document.querySelector(`.item-container[data-block-id="${id}"]`);
    itemBlock.querySelector('.item-container-onclick').style.display = 'none';
    const editWorkspace = document.createElement('div');
    editWorkspace.className = 'item-edit-workspace';
    editWorkspace.innerHTML = `
    <div class="item-container" id="edit-block">
        <div class="item-container-onclick">
            <div class="item-edit-dropdowns">
                <p>ID: ${id} editing</p>
                    <select id="category-id" class="item-edit-dropdowns">

                    </select>
                <input type='file' class="img-input" id="edit-input-file" accept="image/*"/>
                 <input type="text" id="item-edit-img-src-input" placeholder="Посилання на зображення" class="img-input">
            </div>
                <div class="item-container-preview" id="item-container-preview"> <!--flex-->
                    
                    <div class="item-container-preview-img-container">
                        <img src="/img/js product img.png" class="item-container-preview-img" id="edit-img-src">
                    </div>
                    <!-- <input type="text" id="category-id-NOTINUSEFORNOW" placeholder="ID категорії"> -->
                    
                    <div class="item-container-preview-text"> <!-- Right part -->
                        <div class="item-container-preview-statusBar"> <!-- flex; space-between; -->
                            <h3 class="item-container-preview-statusBar-title"><input class="preview-title" type="text" id="blockName" placeholder="Назва"></h3>
                            <h4 class="item-container-preview-statusBar-status">
                                <input type="text" class="" id="item-quantityInput-edit" placeholder="Кількість" style="width: 128px; text-align: center;">
                            </h4>
                        </div>
                        <p cl   ass="item-container-preview-s-descr"> <!-- Short description -->
                            <textarea class="description-input preview-input" name="previewDescr" id="previewDescr" placeholder="Опис прев'ю"></textarea>
                        </p>
                    </div>
                </div>

                <div class="item-container-d-description-fake" id="item-container-d-description"> <!-- Detailed description / expandable -->
                    <p>
                        <!-- <textarea class="description-input" name="mainDescr" id="mainDescr"></textarea> -->
                            <div id="summernote-edit"></div>
                        </p>
                </div>
                <div  style="display: flex; justify-content: flex-start;">
                    <h2 class="price">₴</h2><h2 class="price" style="width: 50%;"><input class="preview-title" type="text" id="priceInput"></h2><h2 class="price" style="margin-left:10px;">грн</h2>
                </div>
                <button class="item-container-expand-btn" id="item-container-expand-btn">...</button>
        </div>
        <button class="admin-btn" id="save-edit-btn">Зберегти</button>
        <button class="admin-btn" id="cancel-edit-btn">Атмєна</button>  
    </div>
    `;

    itemBlock.appendChild(editWorkspace);
    itemBlock.querySelector('#save-edit-btn').addEventListener('click', () => updateItem(id));
    console.log(itemBlock.querySelector('#save-edit-btn'));
    $('#summernote-edit').summernote({
        placeholder: 'Hello Bootstrap 4',
        tabsize: 2,
        height: 100
    });
    displayCategoriesForItemEdit();
}

document.addEventListener("DOMContentLoaded", displayItems);

function updateItemsDisplay() {
    clearAllItems();
    displayItems();
};

function clearAllItems() {
    let itemsSection = document.getElementById("items-section");
    itemsSection.innerHTML = '';
};

export { getItemsInfoByCategory, displayItems, createItem, updateItem, deleteItem, clearAllItems, updateItemsDisplay };