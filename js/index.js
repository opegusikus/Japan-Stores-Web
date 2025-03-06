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
    let state = true;
    let blockName = document.getElementById("blockName").value;
    let previewDescr = document.getElementById("previewDescr").value;
    let mainDescr = document.getElementById("mainDescr").value;
    // blockName = window.prompt("please enter the name");
    // blockName = String(blockName)

    // previewDescr = window.prompt("please enter the preview description");

    const newBlock = document.createElement('div');
    newBlock.className = 'item-container';
    

    const id = Date.now().toString();   // Assign a unique ID for reference
    newBlock.dataset.blockId = id;

    blocks.push({
        id: id,
        name: blockName,
        element: newBlock,
        state: state, 
        previewDescriprion: previewDescr,
        mainDescription: mainDescr
    });
    console.log(blocks)

    newBlock.innerHTML = `
        <div class="item-container-onclick" onclick="toggleBlock(${id})">
            <p>ID: ${id}</p>
            <div class="item-container-preview" id="item-container-preview"> <!--flex-->
                <div class="item-container-preview-img-container">
                    <img src="${img.src}" class="item-container-preview-img">
                </div>

                <div class="item-container-preview-text"> <!-- Right part -->
                    <div class="item-container-preview-statusBar"> <!-- flex; space-between; -->
                        <h3 class="item-container-preview-statusBar-title">${blockName}</h3>
                        <h4 class="item-container-preview-statusBar-status">В наявності</h4>
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
        <button class="admin-btn">Редагувати</button>
    `;


    // let itemsSection = document.getElementById("items-section")
    itemsSection.appendChild(newBlock);
    // Get the header and content elements of the new block
    const preview = newBlock.querySelector('.item-container-preview');
    const detailed = newBlock.querySelector('.item-container-d-description');
    creationBlock.style.display = "none"
}
// createBlock();

document.querySelector('#save-creation-btn').addEventListener('click', createBlock);

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


// це фігзна шо
//  function toggleBlock() {
//     const container = document.querySelector("#item-container-d-description");
//     itemPreview.addEventListener('click', () => {
//          container.classList.toggle('active');

//     })
//  };

// Set up existing blocks (if any)
document.querySelectorAll('.item-container-onclick').forEach(preview => {
    const content = preview.nextElementSibling;
    preview.addEventListener('click', () => {
        content.classList.toggle('active');
    });
});

// Close blocks when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.item-container')) {
        document.querySelectorAll('.item-container-d-description').forEach(content => {
            content.classList.remove('active');
        });
    }
});

// Add click event listener to created preview
function toggleBlock(id) {
    const block = document.querySelector(`[data-block-id="${id}"]`);
    console.log(id);
    const content = block.querySelector('.item-container-d-description');
    content.classList.toggle('active');
    console.log(block.name);
}

//Прев'ю картинки
var img = document.querySelector('#creation-img-src');
window.addEventListener('load', function() {
    document.querySelector('#creation-input-file').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        }
    });
});

function editBlock() {
    
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
