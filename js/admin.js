var editMode = false;
let creationBlock = document.getElementById("creation-block");
let categoriesBtn = document.querySelector("#nav-btn-link-categories");
let categoriesPage = document.querySelector("#categories-dropdown");
let itemPreview = document.querySelector("#item-container");
// let creation = false;

let blocks = [
    {
    id: "1740835238140",
    block: document.querySelector(`[data-block-id="1740835238140"]`),
    category: null,
    subcategory: null,
    img: "img/Background.jpg",
    name: "Aojiru in blocks",
    status: true, 
    previewDescriprion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a volutpat felis, lobortis molestie tellus. Quisque eget facilisis urna",
    mainDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a volutpat felis, lobortis molestie tellus. Quisque eget facilisis urna Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a volutpat felis, lobortis molestie tellus. Quisque eget facilisis urna ",
    rating: null,
    quantity: null,
    price: 600
},
{
    id: "1740835238141",
    block: document.querySelector(`[data-block-id="1740835238141"]`),
    category: null,
    subcategory: null,
    img: "img/Background.jpg",
    name: "Aojiru in blocks",
    status: false, 
    previewDescriprion: "previewDescr",
    mainDescription: "mainDescr",
    rating: null,
    quantity: null,
    price: 100009
},
{
    id: "1740835238142",
    block: document.querySelector(`[data-block-id="1740835238142"]`),
    category: null,
    subcategory: null,
    img: "img/photo_2024-12-29_18-43-55.png",
    name: "Aojiru in blocks",
    status: false, 
    previewDescriprion: "previewDescr",
    mainDescription: "mainDescr",
    rating: null,
    quantity: null,
    price: 10
}
];// Array to keep track of all blocks

console.log(blocks);

// {
//     id: "1741787553322",
//     block: document.querySelector(`[data-block-id="1740835238140"]`),
//     category: null,
//     subcategory: null,
//     img: http://127.0.0.1:5501/img/js%product%img.png,
//     name: "Aojiru in blocks",
//     status: false, 
//     previewDescriprion: "previewDescr",
//     mainDescription: "mainDescr"
// }

//image upload and refresh
function displayItems() { 
    let itemsSection = document.getElementById("items-section");
    clearAll()
    blocks.forEach(item => {

        const displayBlock = document.createElement('div');
        displayBlock.className = 'item-container';
        
        if (item.status == true) {
            availability = 'В наявності';
        }
        else {
            availability = 'Немає в наявності';
        }
        item.block = displayBlock;
        displayBlock.innerHTML = `
        <div class="item-container" data-block-id="${item.id}">
            <div class="item-container-onclick" onclick="extendBlock(${item.id})">
                <p id="item-id">ID: ${item.id}</p>
                <div class="item-edit-dropdowns" style="display: none;">
                    <select class="item-container-preview-statusBar-status" name="mainCategory">
                        <option>health</option>
                        <option>beauty</option>
                    </select>
                    <select class="item-container-preview-statusBar-status" name="subCategory">
                        <option>creame</option>
                        <option>powder</option>
                    </select>
                    <input type='file' class="img-input" id="creation-input-file" accept="image/*"/>
                </div>
                <!-- dropdown edit partially completed -->
                <div class="item-container-preview" id="item-container-preview"> <!--flex-->
                    <div class="item-container-preview-img-container">
                        <img src="${item.img}" class="item-container-preview-img" id="creation-img-src">
                    </div>

                    <div class="item-container-preview-text"> <!-- Right part -->
                        <div class="item-container-preview-statusBar"> <!-- flex; space-between; -->
                            <h3 class="item-container-preview-statusBar-title" id="statusBar-title" style="display: block;">${item.name}</h3>
                            <h3 class="item-container-preview-statusBar-title" id="statusBar-title-edit" style="display: none;">
                                <input class="preview-title" type="text" id="blockName">
                            </h3>
                            <h4 class="item-container-preview-statusBar-status" id="statusBar-status" style="display: block;">${availability}</h4>
                            <h4 class="item-container-preview-statusBar-status" id="statusBar-status-edit" style="display: none;">
                                <select class="item-container-preview-statusBar-status" name="status" id="status">
                                    <option value="true">В наявності</option>
                                    <option value="false">Немає в наявності</option>
                                </select>
                            </h4>
                        </div>
                        <p class="item-container-preview-s-descr" id="item-container-s-description"> <!-- Short description -->
                            ${item.previewDescriprion}
                        </p>
                        <p class="item-container-preview-s-descr">
                            <textarea class="description-input preview-input" name="previewDescr" id="previewDescr" style="display: none;"></textarea>
                        </p>
                    </div>
                </div>

                <div class="item-container-d-description" id="item-container-d-description-div"> <!-- Detailed description / expandable -->
                    <p id="item-container-d-description-p" style="display: block;">
                        ${item.mainDescription}
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
            <button class="item-container-expand-btn" id="item-container-expand-btn" onclick="shrinkBlock(${item.id})">...</button>
            <button class="admin-btn" id="admin-edit-btn" onclick="editBlock(${item.id})">Редагувати</button>
        </div>
        `;
        itemsSection.appendChild(displayBlock)

    })
    // console.log('finish');
    
}
document.addEventListener("DOMContentLoaded", displayItems);

function clearAll() {
    let itemsSection = document.getElementById("items-section");
    itemsSection.innerHTML = '';
};

function createBlock() {
    let itemsSection = document.getElementById("items-section")
    let imgLink = document.querySelector('.item-container-preview-img').src;
    let blockName = document.getElementById("blockName").value;
    let category;
    let subcategory;
    let status = (document.getElementById('status').value === 'true');
    let availability;
    let previewDescr = document.getElementById("previewDescr").value;
    let mainDescr = document.getElementById("mainDescr").value;
    let rating = null;
    let price = document.getElementById("priceInput").value;
    
    if (status == true) {
        availability = 'В наявності';
    }
    else {
        availability = 'Немає в наявності';
    }

    console.log(imgLink);

    const newBlock = document.createElement('div');
    newBlock.className = 'item-container';
    

    const id = Date.now().toString();   // Assign a unique ID for reference
    newBlock.dataset.blockId = id;

    blocks.push({
        id: id,
        block: newBlock,
        category: category,
        subcategory: subcategory,
        img: imgLink,
        name: blockName,
        status: status, 
        previewDescriprion: previewDescr,
        mainDescription: mainDescr,
        rating: rating,
        price: price
    });
    console.log(blocks)

    displayItems();

    // let itemsSection = document.getElementById("items-section")
    itemsSection.appendChild(newBlock);
    // Get the header and content elements of the new block
    const preview = newBlock.querySelector('.item-container-preview');
    const detailed = newBlock.querySelector('.item-container-d-description');
    creationBlock.style.display = "none"
    delete imgLink;
}
// createBlock();

document.getElementById('save-creation-btn').addEventListener('click', createBlock);

// Відкриття блоку для створення товару 
document.querySelector('#admin-add').onclick = function() {
    creationBlock.style.display = "block";
};

//Відміна створення товару
document.querySelector("#cancel-creation-btn").onclick = function() {
    creationBlock.style.display = "none"
}

// Відкриття категорій
categoriesBtn.onclick = function() {
    if (categoriesPage.style.display === "none") {
        categoriesPage.style.display = "flex";
    }
    else {
        categoriesPage.style.display = "none";
    }
};

//image creation update
var img = document.getElementById('creation-img-src');
window.addEventListener('load', function() {
document.getElementById('creation-input-file').addEventListener('change', function() {
    if (this.files && this.files[0]) {
        img.src = URL.createObjectURL(this.files[0]); // set src to blob url
    }
});
});

// Set up existing blocks (if any) for extention
// document.querySelectorAll('.item-container-onclick').forEach(preview => {
//     const content = preview.nextElementSibling;
//     preview.addEventListener('click', () => {
//         content.classList.toggle('active');
//     });
// });

// Close blocks when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.item-container') && editMode === false) {
        document.querySelectorAll('.item-container-d-description').forEach(content => {//може кудись сюди дописати іф який чекатиме чи редагується цей блок
            content.classList.remove('active');
        });
    }
});

// Add click event listener to created preview for extention
function extendBlock(id) {
    const block = document.querySelector(`[data-block-id="${id}"]`);
    const content = block.querySelector('.item-container-d-description');
    if (!content.classList.contains('active') && editMode === false) {
        content.classList.add('active');
    }
}

//remove extention
function shrinkBlock(id) {
    if (editMode === false) {
        const block = document.querySelector(`[data-block-id="${id}"]`);
        const content = block.querySelector('.item-container-d-description');
        content.classList.remove('active');
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function editBlock(id) {
    editMode = true;
    const itemBlock = document.querySelector(`[data-block-id="${id}"]`);
    const content = itemBlock.querySelector('.item-container-d-description');
    content.classList.add('active');
    const parentAddDropdowns = itemBlock.getElementsByClassName("item-container-onclick");

    let itemBlockName = itemBlock.getElementsByClassName("item-container-preview-statusBar-title").textContent;
    let category;
    let editBtn = itemBlock.querySelector("#admin-edit-btn");

    let expantionContainer = itemBlock.querySelector('.item-container-onclick');
    // expantionContainer.onclick = null;
    let shrinkBtn = itemBlock.querySelector('#item-container-expand-btn');
    shrinkBtn.style.display = 'none';
    editBtn.style.display = 'none';

    let dropdowns = itemBlock.querySelector('.item-edit-dropdowns');
    dropdowns.style.display = 'flex';

    //create input
    let input = itemBlock.querySelector('#creation-input-file');
    let imgContainer = itemBlock.querySelector("#creation-img-src");
    let initialImg = imgContainer.src;
    let newImg = initialImg;
    // console.log(initialImg);
    input.addEventListener("change", function(event) {
        let file = event.target.files[0]; // Get the selected file
        for (const file of this.files) {
            newImg = `img/${file.name}`
            console.log(file.name); 
        }
        if (file) {
            let reader = new FileReader();

            // On file load, update the image in the specific block
            reader.onload = function(e) {
                let parentBlock = event.target.closest('.item-container'); // Find the parent div (block)
                let imageDisplay = parentBlock.querySelector('#creation-img-src'); // The image inside the block

                // Replace the image source with the new image
                imageDisplay.src = e.target.result;
            };
            
            reader.readAsDataURL(file);
        }
    });

    let currentStatusBar = itemBlock.querySelector(`.item-container-preview-statusBar`);
    let currentNameBlock = itemBlock.querySelector('#statusBar-title');
    let currentName = currentNameBlock.textContent;
    let nameEditBlock = itemBlock.querySelector('#statusBar-title-edit');
    let nameEditInput = itemBlock.querySelector('#blockName');

    currentNameBlock.style.display = 'none';
    nameEditBlock.style.display = 'block';
    nameEditInput.value = currentName;

    let statusContainer = itemBlock.querySelector(`#statusBar-status`);
    let currentStatus = statusContainer.textContent;
    let statusContainerEdit = itemBlock.querySelector('#statusBar-status-edit');
    let availability;

    if (currentStatus == 'В наявності') {
        availability = true;
    }
    else {
        availability = false;
    }

    statusContainer.style.display = 'none';
    statusContainerEdit.style.display = 'block';

    let statusDisplay = itemBlock.querySelector('#status');
    statusDisplay.value = availability;

    const currentPreview = itemBlock.querySelector('.item-container-preview-s-descr');// Edit preview description
    let currentPreviewText = currentPreview.textContent.replace(/\s+/g, " ").trim();
    let previewDescrTextarea = itemBlock.querySelector('#previewDescr');
    previewDescrTextarea.value = currentPreviewText;
    currentPreview.style.display = 'none';
    previewDescrTextarea.style.display = 'block';

    const currentMainDescr = itemBlock.querySelector('#item-container-d-description-p');// Edit main description
    let currentMainDescrText = currentMainDescr.textContent.replace(/\s+/g, " ").trim();
    let mainDescrTextarea = itemBlock.querySelector('#mainDescr');
    mainDescrTextarea.value = currentMainDescrText;
    currentMainDescr.style.display = 'none';
    mainDescrTextarea.style.display = 'block';

    const currentPrice = itemBlock.querySelector("#price");
    let currentPriceText = currentPrice.textContent;
    let priceInput = itemBlock.querySelector("#priceInput");
    priceInput.value = currentPriceText;
    let priceDisplay = itemBlock.querySelector("#priceDisplay");
    priceDisplay.style.display = "none";
    let priceInputBlock = itemBlock.querySelector("#priceInputBlock");
    priceInputBlock.style.display = "flex";
    
    console.log(priceInput.value);

    let saveBtn = document.createElement('button');//Save
    saveBtn.id = 'admin-save-btn';
    saveBtn.classList.add('admin-btn');
    saveBtn.textContent = 'Зберегти';
    // console.log(typeof(id));
    saveBtn.onclick = function() {
        
        const saveThisBlock = blocks.find(block => block.id === id.toString());
  
        // console.log(id.toString());

        // console.log(saveThisBlock);
        // console.log(saveThisBlock.img)

        // blocks.push({
        //     id: id,
        //     block: newBlock,
        //     category: category,
        //     subcategory: subcategory,
        //     img: imgLink,
        //     name: blockName,
        //     status: status, 
        //     previewDescriprion: previewDescr,
        //     mainDescription: mainDescr
        // });
        // if (saveThisBlock) {
            saveThisBlock.img = newImg;
            console.log(saveThisBlock.img)
            saveThisBlock.name = nameEditInput.value.toString();

            if (statusDisplay.value === "true") {
                saveThisBlock.status = true;
            }
            else {
                saveThisBlock.status = false;
            }
            saveThisBlock.previewDescriprion = previewDescrTextarea.value;
            saveThisBlock.mainDescription = mainDescrTextarea.value;
            saveThisBlock.price = Number(priceInput.value)
            console.log(priceInput.value);
        // };
        
        console.log(saveThisBlock);
        console.log(blocks);

        editMode = false;

        alert('saved!');
        displayItems()
    }
    itemBlock.appendChild(saveBtn);

    let delBtn = document.createElement('button');//delete
    delBtn.id = 'admin-del-btn';
    delBtn.classList.add('admin-btn');
    delBtn.textContent = 'Видалити товар';
    delBtn.onclick = function() {
        editMode = false;
        itemBlock.remove();
        let deleteThisBlock = blocks.findIndex(block => block.id === id.toString());
        blocks.splice(deleteThisBlock, 1);
        alert('Deleted!')
        // console.log(blocks);
    }
    itemBlock.appendChild(delBtn);

    let cancelEditBtn = document.createElement('button');//cancel
    cancelEditBtn.id = 'admin-cancelEdit-btn';
    cancelEditBtn.classList.add('admin-btn');
    cancelEditBtn.textContent = 'Атмєна';
    cancelEditBtn.onclick = function() {
        dropdowns.style.display = 'none';//dropdowns
        imgContainer.src = initialImg;
        // nameEditInput.value = currentName;//name
        currentNameBlock.style.display = 'block';
        nameEditBlock.style.display = 'none';
        statusContainer.style.display = 'block';//status
        statusContainerEdit.style.display = 'none';
        previewDescrTextarea.value = currentPreviewText;//preview
        currentPreview.style.display = 'block';
        previewDescrTextarea.style.display = 'none';
        mainDescrTextarea.value = currentMainDescrText;//main
        currentMainDescr.style.display = 'block';
        mainDescrTextarea.style.display = 'none';
        shrinkBtn.style.display = 'block';
        editBtn.style.display = 'inline-block';
        priceDisplay.style.display = "flex";
        priceInputBlock.style.display = "none";
        saveBtn.remove();
        cancelEditBtn.remove();
        delBtn.remove();
        editMode = false;
    }
    itemBlock.appendChild(cancelEditBtn);
    // let saveBtn = itemBlock.querySelector('#admin-save-btn');//Save
    // let delBtn = itemBlock.querySelector('#admin-del-btn');//delete
    // let cancelEditBtn = itemBlock.querySelector('#admin-edit-btn');//cancel
};


