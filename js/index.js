let categoriesBtn = document.querySelector("#nav-btn-link-categories");
let categoriesPage = document.querySelector("#categories-dropdown");
let itemPreview = document.querySelector("#item-container");
let blocks = [];// Array to keep track of all blocks
// {
    // id: "01",
    // name: "Aojiru loaded",
    // // element: div.block,
    // state: "true", 
    // PreviewDescriprion: "Blabla",
    // MainDescription: "Blablabla"
// }


function createBlock() {
    let itemsSection = document.getElementById("items-section")
    let state = true;
    let blockName
    let previewDescr = "Hey";
    let mainDescr = "blablabla";
    
    blockName = window.prompt("please enter the name");
    blockName = String(blockName)

    previewDescr = window.prompt("please enter the preview description");

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
            <div class="item-container-preview" id="item-container-preview"> <!--flex-->
                <div class="item-container-preview-img-container">
                    <img src="img/photo_2024-12-29_18-43-55.png" class="item-container-preview-img">
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
                <p>${mainDescr}
                </p>
            </div>
            <!-- тут має бути кнопка expand -->
            <button class="item-container-expand-btn">...</button>
        </div>
        <button class="admin-btn" id="admin-edit-btn">Редагувати</button>
    `;


    // let itemsSection = document.getElementById("items-section")
    itemsSection.appendChild(newBlock);
    // Get the header and content elements of the new block
    const preview = newBlock.querySelector('.item-container-preview');
    const detailed = newBlock.querySelector('.item-container-d-description');
}
createBlock();
document.querySelector('#test-btn').addEventListener('click', createBlock);

categoriesBtn.onclick = function() {
    if (categoriesPage.style.display === "none") {
        categoriesPage.style.display = "flex";
    }
    else {
        categoriesPage.style.display = "none";
    }
}



// function toggleBlock() {
//     const container = document.querySelector("#item-container-d-description");
//     itemPreview.addEventListener('click', () => {
//         container.classList.toggle('active');

//     })
// };

// Add click event listener to the header
function toggleBlock(id) {
    const block = document.querySelector(`[data-block-id="${id}"]`);
    console.log(id);
    const content = block.querySelector('.item-container-d-description');
    content.classList.toggle('active');
    console.log(block.name);
}

// // Set up existing blocks (if any)
// document.querySelectorAll('.block-header').forEach(header => {
//     const content = header.nextElementSibling;
//     header.addEventListener('click', () => {
//         content.classList.toggle('active');
//     });
// });

// // Close blocks when clicking outside
// document.addEventListener('click', (e) => {
//     if (!e.target.closest('.block')) {
//         document.querySelectorAll('.block-content').forEach(content => {
//             content.classList.remove('active');
//         });
//     }
// });

