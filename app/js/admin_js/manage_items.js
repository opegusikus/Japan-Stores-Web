// ITEMS
async function getItemsInfo() {
  const response = await fetch('/api/item/read', {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();
  return data;
}

async function createItem() {
    let categoryId = document.querySelector('#category-id').value; // Replace with actual category ID or logic to get it
    let nameEditInput = document.querySelector('#blockName');
    let markupStr = $('#summernote').summernote('code');
    console.log(markupStr);
    const response = await fetch('/api/item/create', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            category_id: 139,
            name: nameEditInput.value,
            short_description: "Short description of the new item",
            long_description: markupStr,
            price: 100,
        })
    });
    const data = await response.json();
    console.log(data);
    alert("Item created");
    clearAllItems();
    displayItems();
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
    console.log(data);
    alert("Item deleted");
    clearAllItems();
    displayItems();
}

//image upload and refresh
async function displayItems() { 
    let itemsSection = document.getElementById("items-section");
    const itemsList = await getItemsInfo();
    console.log(itemsList);
    clearAllItems();
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

function clearAllItems() {
    let itemsSection = document.getElementById("items-section");
    itemsSection.innerHTML = '';
};

export { getItemsInfo, displayItems, createItem, updateItem, deleteItem, clearAllItems };