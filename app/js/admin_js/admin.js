import { getItemsInfoByParam, displayItems, createItem, updateItem, deleteItem, clearAllItems } from './manage_items.js';
import { displayCategoriesInfo, updateCategoriesDisplay, createCategory, updateCategory, deleteCategory, editCategory, cancelEditCategory, clearCategoriesDisplay } from './manage_categories.js';

document.getElementById('save-creation-btn').addEventListener('click', () => {
    createItem();
});
document.getElementById('categoryEdit-add-btn').addEventListener('click', () => {
    createCategory();
});

document.getElementById('update_display').addEventListener('click', displayItems)
var editMode = false;
let creationBlock = document.getElementById("creation-block");
let categoryEditBlock = document.getElementById("edit-categories");
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
    img: "/img/Background.jpg",
    name: "Aojiru in blocks",
    status: true, 
    previewDescriprion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a volutpat felis, lobortis molestie tellus. Quisque eget facilisis urna",
    mainDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a volutpat felis, lobortis molestie tellus. Quisque eget facilisis urna Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a volutpat felis, lobortis molestie tellus. Quisque eget facilisis urna ",
    rating: null,
    quantity: null,
    price: 600
}
];


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
    imgLink = null;
}
// createBlock();

// document.getElementById('save-creation-btn').addEventListener('click', createBlock);

// Відкриття блоку для створення товару 
document.querySelector('#admin-add').onclick = function() {
    if (categoryEditBlock.style.display === "none") {
        creationBlock.style.display = "block";
        // var markupStr = $('#summernote').summernote('code');
        // console.log(markupStr);
    }
    else {
        creationBlock.style.display = "none";
    }
};

//Відміна створення товару
document.querySelector("#cancel-creation-btn").onclick = function() {
    creationBlock.style.display = "none";
};

// Відкриття блоку для створення категорій
document.querySelector('#admin-categoryEdit').onclick = function() {
    if (creationBlock.style.display === "none") {
        document.getElementById("admin-categoryEdit").disabled = true;
        displayCategoriesInfo();
        categoryEditBlock.style.display = "block";
    }
    else {
        categoryEditBlock.style.display = "none";
    }
};

//Відміна створення категорій
document.querySelector('#cancel-categoryEdit-btn').onclick = function() {
    document.getElementById("admin-categoryEdit").disabled = false;
    categoryEditBlock.style.display = "none";
    clearCategoriesDisplay();
    
};

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

// Close blocks when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.item-container') && editMode === false) {
        document.querySelectorAll('.item-container-d-description').forEach(content => {//може кудись сюди дописати іф який чекатиме чи редагується цей блок
            content.classList.remove('active');
        });
    }
});

  document.getElementById("menuToggle").addEventListener("click", function() {
    document.body.classList.toggle("no-scroll");
  });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function editItem2(id) {
    const itemsList = await getItemsInfo();
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









// async function logout() {
//   const res = await fetch('/logout', {
//     method: 'POST',
//     credentials: 'include'
//   });

//   const result = await res.json();

//   if (result.status === 0) {
//     alert('Вихід виконано успішно');
//     window.location.href = '/'; // або на сторінку логіну
//   } else {
//     alert('Помилка при виході');
//   }
// }

