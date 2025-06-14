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
    let short_description = document.getElementById('previewDescr').value;
    if (!categoryId) {
        alert("Please select a category before creating an item.");
        return;
    }
    let nameEditInput = document.querySelector('#blockName');
    let markupStr = $('#summernote').summernote('code');
    // console.log(markupStr);
    const response = await fetch('/api/item/create', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: nameEditInput.value,
            category_id: categoryId,
            short_description: short_description,
            long_description: markupStr,
            price: 100,
            image_url: "img/3467b654b3d189c5d7430e5cd0dc189d84d4c0221a365bf3688a7ce16a68cb1c.png",
            availability: 10
        })
    });
    const data = await response.json();
    console.log(data);
    alert("Item created");
    updateItemsDisplay()
}

async function updateItem(itemId) {
    return null;
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
                
                <div class="item-edit-dropdowns" style="display: none;">
                    <input type='file' class="img-input" id="creation-input-file" accept="image/*"/>
                </div>
                <!-- dropdown edit partially completed -->
                <div class="item-container-preview" id="item-container-preview"> <!--flex-->
                    <div class="item-container-preview-img-container">
                        
                    </div>

                    <div class="item-container-preview-text"> <!-- Right part -->
                        <div class="item-container-preview-statusBar"> <!-- flex; space-between; -->
                            <h3 class="item-container-preview-statusBar-title" id="statusBar-title" style="display: block;">${item.name}</h3>
                            <h3 class="item-container-preview-statusBar-title" id="statusBar-title-edit" style="display: none;">
                                <input class="preview-title" type="text" id="blockName">
                            </h3>

                            <h4 class="item-container-preview-statusBar-status" id="statusBar-status-edit" style="display: none;">
                                <select class="item-container-preview-statusBar-status" name="status" id="status">
                                    <option value="true">В наявності</option>
                                    <option value="false">Немає в наявності</option>
                                </select>
                            </h4>
                        </div>
                        <p class="item-container-preview-s-descr" id="item-container-s-description"> <!-- Short description -->
                            ${item.short_description}
                        </p>
                        <p class="item-container-preview-s-descr">
                            <textarea class="description-input preview-input" name="previewDescr" id="previewDescr" style="display: none;"></textarea>
                        </p>
                    </div>
                </div>
                <a href="/item.html?id=${item.id}">View Item</a>
                <div class="item-container-d-description" id="item-container-d-description-div"> <!-- Detailed description / expandable -->
                    <p id="item-container-d-description-p" style="display: block;">
                        ${item.long_description}
                    </p>
                    <p>
                        <textarea class="description-input" name="mainDescr" id="mainDescr" style="display: none;"></textarea>
                    </p>
                </div>
                <div style="display: flex; justify-content: flex-start;" id="priceDisplay">
                    <h2 class="price">₴</h2>
                    <h2 class="price" id="price">${item.price}</h2>
                    <h2 class="price" style="margin-left:10px;">грн</h2>
                </div>
                <div style="display: none; justify-content: flex-start;" id="priceInputBlock">
                    <h2 class="price">₴</h2><h2 class="price" style="width: 50%;"><input class="preview-title" type="text" id="priceInput"></h2><h2 class="price" style="margin-left:10px;">грн</h2>
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
    // console.log('finish');
}

function editItem(id) {
    const itemBlock = document.querySelector(`.item-container[data-block-id="${id}"]`);
    itemBlock.querySelector('.item-container-onclick').style.display = 'none';
    const editWorkspace = document.createElement('div');
    editWorkspace.className = 'item-edit-workspace';
    editWorkspace.innerHTML = `
    <div style="display: flex;" >
        <input type='file' class="img-input" id="creation-input-file" accept="image/*"/>
        <img src="/static/app/img/edit-icon.png" alt="Edit Icon">
    </div>
    <div class="item-container" id="creation-block">
        <div class="item-container-onclick">
            <div class="item-edit-dropdowns">
                <p>ID: creation</p>
                    <select id="category-id" class="item-edit-dropdowns">

                    </select>
                <input type='file' class="img-input" id="creation-input-file" accept="image/*"/>
            </div>
                <div class="item-container-preview" id="item-container-preview"> <!--flex-->
                    
                    <div class="item-container-preview-img-container">
                        <img src="/img/js product img.png" class="item-container-preview-img" id="creation-img-src">
                    </div>
                    <!-- <input type="text" id="category-id-NOTINUSEFORNOW" placeholder="ID категорії"> -->
                    
                    <div class="item-container-preview-text"> <!-- Right part -->
                        <div class="item-container-preview-statusBar"> <!-- flex; space-between; -->
                            <h3 class="item-container-preview-statusBar-title"><input class="preview-title" type="text" id="blockName" placeholder="Назва"></h3>
                            <h4 class="item-container-preview-statusBar-status">
                                <select class="item-container-preview-statusBar-status" name="status" id="status">
                                </select>
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
                        <div id="summernote"></div>
                    </p>
                </div>
                <div  style="display: flex; justify-content: flex-start;">
                    <h2 class="price">₴</h2><h2 class="price" style="width: 50%;"><input class="preview-title" type="text" id="priceInput"></h2><h2 class="price" style="margin-left:10px;">грн</h2>
                </div>
                <button class="item-container-expand-btn" id="item-container-expand-btn">...</button>
        </div>
        <button class="admin-btn" id="save-creation-btn">Зберегти</button>
        <button class="admin-btn" id="cancel-creation-btn">Атмєна</button>  
    </div>

    `;

    itemBlock.appendChild(editWorkspace);
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