var editMode = false;
let creationBlock = document.getElementById("creation-block");
let categoriesBtn = document.querySelector("#nav-btn-link-categories");
let categoriesPage = document.querySelector("#categories-dropdown");
let itemPreview = document.querySelector("#item-container");
let creation = false;
let blocks = [];// Array to keep track of all blocks
let blocksCreation = [];
// {
    // id: "01",
    // name: "Aojiru loaded",
    // // element: div.block,
    // state: "true", 
    // PreviewDescriprion: "Blabla",
    // MainDescription: "Blablabla"
// }

//image upload and refresh

function createBlock() {
    // createBlockOption2();
    let itemsSection = document.getElementById("items-section")
    let imgLink = document.querySelector('.item-container-preview-img').src;
    let blockName = document.getElementById("blockName").value;
    let category;
    let status = (document.getElementById('status').value === 'true');
    let availability;
    let previewDescr = document.getElementById("previewDescr").value;
    let mainDescr = document.getElementById("mainDescr").value;
    
    if (status == true) {
        availability = 'В наявності';
    }
    else {
        availability = 'Немає в наявності';
    }

    console.log(imgLink);
    // blockName = window.prompt("please enter the name");
    // blockName = String(blockName)

    // previewDescr = window.prompt("please enter the preview description");

    const newBlock = document.createElement('div');
    newBlock.className = 'item-container';
    

    const id = Date.now().toString();   // Assign a unique ID for reference
    newBlock.dataset.blockId = id;

    blocks.push({
        id: id,
        element: newBlock,
        categorie: category,
        img: imgLink,
        name: blockName,
        status: status, 
        previewDescriprion: previewDescr,
        mainDescription: mainDescr
    });
    console.log(blocks)

    newBlock.innerHTML = `
        <div class="item-container-onclick" onclick="addBlock(${id})">
            <p>ID: ${id}</p>
            <div class="item-container-preview" id="item-container-preview"> <!--flex-->
                <div class="item-container-preview-img-container">
                    <img src="${imgLink}" class="item-container-preview-img">
                </div>

                <div class="item-container-preview-text"> <!-- Right part -->
                    <div class="item-container-preview-statusBar"> <!-- flex; space-between; -->
                        <h3 class="item-container-preview-statusBar-title">${blockName}</h3>
                        <h4 class="item-container-preview-statusBar-status">${availability}</h4>
                    </div>
                    <p class="item-container-preview-s-descr"> <!-- Short description -->
                        ${previewDescr}
                    </p>
                </div>
            </div>


            <div class="item-container-d-description" id="item-container-d-description"> <!-- Detailed description / expandable -->
                <p>
                    ${mainDescr}
                </p>
            </div>
            <!-- тут має бути кнопка expand -->
            <button class="item-container-expand-btn">...</button>
        </div>
        <button class="item-container-expand-btn" id="item-container-expand-btn" onclick="removeBlock(${id})">...</button>
        <button class="admin-btn" id="admin-edit-btn" onclick="editBlock(${id})">Редагувати</button>
    `;


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
function addBlock(id) {
    const block = document.querySelector(`[data-block-id="${id}"]`);
    const content = block.querySelector('.item-container-d-description');
    if (!content.classList.contains('active') && editMode === false) {
        // console.log(id);
        content.classList.add('active');
        // console.log(block.name);
    }
}

//remove extention
function removeBlock(id) {
    if (editMode === false) {
        const block = document.querySelector(`[data-block-id="${id}"]`);
        console.log(id);
        const content = block.querySelector('.item-container-d-description');
        content.classList.remove('active');
        console.log(block.name);
    }
}

function editBlock(id) {
    // editMode = true;
    const itemBlock = document.querySelector(`[data-block-id="${id}"]`);
    const content = itemBlock.querySelector('.item-container-d-description');
    content.classList.add('active');
    // console.log(itemBlock);
    const parentAddDropdowns = itemBlock.getElementsByClassName("item-container-onclick");
    // console.log(parentAddDropdowns);
    let img = itemBlock.getElementsByClassName("item-container-preview-img");
    let itemBlockName = itemBlock.getElementsByClassName("item-container-preview-statusBar-title").textContent;
    let category;
    let editBtn = itemBlock.querySelector("#admin-edit-btn");

    let expantionContainer = itemBlock.querySelector('.item-container-onclick');
    expantionContainer.onclick = null;
    let shrinkBtn = itemBlock.querySelector('#item-container-expand-btn');
    shrinkBtn.onclick = null;
    console.log(expantionContainer);


    editBtn.style.display = 'none';



    const addDropdowns = document.createElement('div');
    addDropdowns.className = 'item-edit-dropdowns';

    itemBlock.querySelector('#item-id').remove();

    addDropdowns.innerHTML = `
        <p>ID: ${id}</p>
        <select class="item-container-preview-statusBar-status" name="mainCategory">
            <option>health</option>
            <option>beauty</option>
        </select>
        <select class="item-container-preview-statusBar-status" name="subCategory">
            <option>creame</option>
            <option>powder</option>
        </select>
    `;
    parentAddDropdowns[0].insertBefore(addDropdowns, parentAddDropdowns[0].firstChild);

    //create input
    let input = document.createElement("input");
    input.type = "file";
    input.classList.add("img-input");
    input.accept = "image/*";

    itemBlock.querySelector('.item-edit-dropdowns').appendChild(input);
    input.addEventListener("change", function(event) {
        let file = event.target.files[0]; // Get the selected file

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
    let currentName = itemBlock.querySelector(`.item-container-preview-statusBar-title`).textContent;
    itemBlock.querySelector(`.item-container-preview-statusBar-title`).innerHTML = `
    <input class="preview-title" type="text" id="blockName">
    `;

    itemBlock.querySelector('#blockName').value = currentName;

    let statusContainer = itemBlock.querySelector(`#status`);
    let currentStatus = statusContainer.textContent;
    let availability;

    if (currentStatus == 'В наявності') {
        availability = true;
    }
    else {
        availability = false;
    }


    statusContainer.innerHTML = `
        <select class="item-container-preview-statusBar-status" name="status" id="status">
            <option value="true">В наявності</option>
            <option value="false">Немає в наявності</option>
        </select>
    `;

    let currentPreview = itemBlock.querySelector('.item-container-preview-s-descr');
    let currentPreviewText = currentPreview.textContent.replace(/\s+/g, " ").trim();
    // console.log(currentPreviewText);

    currentPreview.innerHTML = `
    <textarea class="description-input preview-input" name="previewDescr" id="previewDescr"></textarea>
    `
    itemBlock.querySelector('#previewDescr').value = currentPreviewText;

    let currentMainDescr = itemBlock.querySelector('#item-container-d-description-p');
    let currentMainDescrText = currentMainDescr.textContent.replace(/\s+/g, " ").trim();
    // console.log(currentMainDescr);

    currentMainDescr.innerHTML = `
    <textarea class="description-input" name="mainDescr" id="mainDescr"></textarea>
    `
    itemBlock.querySelector('#mainDescr').value = currentMainDescrText;


    let saveBtn = document.createElement('button');//Save
    saveBtn.id = 'admin-save-btn';
    saveBtn.classList.add('admin-btn');
    saveBtn.textContent = 'Зберегти';
    saveBtn.onclick = function() {
        // shrinkBtn.addEventListener("click", removeBlock);
        alert('saved!')
    }
    itemBlock.appendChild(saveBtn);

    let delBtn = document.createElement('button');//delete
    delBtn.id = 'admin-del-btn';
    delBtn.classList.add('admin-btn');
    delBtn.textContent = 'Видалити товар';
    delBtn.onclick = function() {
        alert('Deleted!')
    }
    itemBlock.appendChild(delBtn);

    let cancelEditBtn = document.createElement('button');//cancel
    cancelEditBtn.id = 'admin-cancelEdit-btn';
    cancelEditBtn.classList.add('admin-btn');
    cancelEditBtn.textContent = 'Атмєна';
    cancelEditBtn.onclick = function() {
        alert('canceled!')
    }
    itemBlock.appendChild(cancelEditBtn);
};








// Ще один спосіб стоврити блок товару

// function createBlockOption2() {
//     let itemsSection = document.getElementById("items-section")

//     const blockCreation = document.createElement('div');
//     blockCreation.className = 'item-container';
    

//     const id = Date.now().toString();   // Assign a unique ID for reference
//     let idTemp = Date.now().toString();
//     blockCreation.dataset.blockId = id;

//     blockCreation.innerHTML = `
        // <div class="item-container-onclick">
        // <div style="display:flex; align-items:center; justify-content:space-evenly; margin:0">
        //     <p>ID: ${id}</p><select>
        //     <option>health</option>
        //     <option>beauty</option>
        //     </select>
        //     <input type='file' class="img-input" id="creation-input-file" />
        // </div>
        //     <div class="item-container-preview" id="item-container-preview"> <!--flex-->
        //         <div class="item-container-preview-img-container">
        //             <img src="img/js product img.png" class="item-container-preview-img" id="creation-img-src">
        //         </div>

        //         <div class="item-container-preview-text"> <!-- Right part -->
        //             <div class="item-container-preview-statusBar"> <!-- flex; space-between; -->
        //                 <h3 class="item-container-preview-statusBar-title"><input class="preview-title" type="text" id="blockName"></h3>
        //                 <h4 class="item-container-preview-statusBar-status">
        //                     <select class="item-container-preview-statusBar-status" name="status" id="status">
        //                         <option value="available">В наявності</option>
        //                         <option value="not-available">Немає в наявності</option>
        //                     </select>
        //                 </h4>
        //             </div>
        //             <p class="item-container-preview-s-descr"> <!-- Short description -->
        //                 <textarea class="description-input preview-input" name="previewDescr" id="previewDescr"></textarea>
        //             </p>
        //         </div>
        //     </div>


        //     <div class="item-container-d-description-fake" id="item-container-d-description"> <!-- Detailed description / expandable -->
        //         <p>
        //             <textarea class="description-input" name="mainDescr" id="mainDescr"></textarea>
        //         </p> <!-- rows="20" cols="70" -->
        //     </div>
        //     <!-- тут має бути кнопка expand -->
        //     <button class="item-container-expand-btn">...</button>
        // </div>
        // <button class="admin-btn" id="save-creation-btn">Зберегти</button>
        // <button class="admin-btn" id="cancel-creation-btn">Атмєна</button>
//     `;

//     // blockCreation.push({
//     // id: id,
//     // img: "img/js product img.png",
//     // name: "Aojiru or smth",
//     // // element: div.block,
//     // state: "not-available", 
//     // PreviewDescriprion: "Blabla",
//     // MainDescription: "Blablabla"
//     // });

//     // let itemsSection = document.getElementById("items-section")
//     itemsSection.appendChild(blockCreation);
//     // Get the header and content elements of the new block
//     // const preview = blockCreation.querySelector('.item-container-preview');
//     // const detailed = blockCreation.querySelector('.item-container-d-description');
//     creation = true;
// }
// // createBlockOption2();
// document.querySelector('#admin-add').addEventListener('click', createBlockOption2);
// // document.getElementById('save-creation-btn').addEventListener('click', createBlock);
