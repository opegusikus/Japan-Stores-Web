// ITEMS
// import { response } from 'express';
import { getCategoriesInfo } from './manage_categories.js';

async function getItemsInfo() {
  const response = await fetch('/api/item/read', {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();
  return data;
}

async function getItemsInfoByCategory() {
    const xhr = new XMLHttpRequest();
    xhr.onload = (ret) => {console.log(ret);};
    xhr.open('POST', 'api/item/read');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
    if (xhr.status === 200) {
      try {
        const response = JSON.parse(xhr.responseText); // ⬅️ Зберігаєш відповідь у змінну
        console.log('Отримані дані:', response);

        // Наприклад, зберегти в іншу змінну:
        const items = response.items || response; // або адаптуй під свою структуру
        // далі можеш використовувати items
      } catch (e) {
        console.error('Помилка парсингу JSON:', e);
      }
    } else {
      console.error('Помилка запиту:', xhr.status, xhr.statusText);
    }
  };

  xhr.onerror = () => {
    console.error('Помилка мережі або сервера');
  };

  xhr.send(JSON.stringify({ category_id: 139 }));
};

//     const response = await fetch('./api/item/read', {
//     method: 'GET',
//     // credentials: 'include',
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({"category_id":139}), // body data type must match "Content-Type" header
//   });
//   const data = await response.json();
//   console.log(data);

getItemsInfoByCategory()

async function createItem() {
    let categoryId = document.getElementById('category-id').value; // Replace with actual category ID or logic to get it
    if (!categoryId) {
        alert("Please select a category before creating an item.");
        return;
    }
    let nameEditInput = document.querySelector('#blockName');
    let markupStr = $('#summernote').summernote('code');
    console.log(markupStr);
    const response = await fetch('/api/item/create', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            category_id: categoryId,
            name: nameEditInput.value,
            short_description: "Short description of the new item",
            long_description: markupStr,
            price: 100,
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
    let itemsSection = document.getElementById("items-section");
    const itemsList = await getItemsInfo();
    const categoriesList = await getCategoriesInfo();
    console.log(itemsList);
    console.log(categoriesList);
    // clearAllItems();
    itemsList.forEach(item => {

        const displayBlock = document.createElement('div');
        displayBlock.className = 'item-container';
        
        // <img src="${item.img}" class="item-container-preview-img" id="creation-img-src"></img>
                                    // <h4 class="item-container-preview-statusBar-status" id="statusBar-status" style="display: block;">${availability}</h4>
        item.block = displayBlock;
        displayBlock.innerHTML = `
        <div class="item-container" data-block-id="${item.id}">
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
                <h2><input class="preview-title" type="text" id="priceInput" style="display: none;"></h2>
            </div>
            <button class="admin-btn" id="admin-edit-btn" onclick="editBlock(${item.id})">Редагувати</button>
            <button class="admin-btn" id="admin-edit-btn-${item.id}">Видалити</button>
        </div>
        `;//onclick="shrinkBlock(${item.id})"
        itemsSection.appendChild(displayBlock)
        document.getElementById(`admin-edit-btn-${item.id}`).addEventListener('click', function() {
            deleteItem(item.id);
        });
    })
    // console.log('finish');
    
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

export { getItemsInfo, displayItems, createItem, updateItem, deleteItem, clearAllItems, updateItemsDisplay };