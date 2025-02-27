let categoriesBtn = document.querySelector("#nav-btn-link-categories");
let categoriesPage = document.querySelector("#categories-dropdown");
let itemPreview = document.querySelector("#item-container");
let blocks = [{
    id: "01",
    name: "Aojiru loaded",
    // element: div.block,
    state: "true", 
    PreviewDescriprion: "Blabla",
    MainDescription: "Blablabla"
}];

// blocks.push({
//     id: id,
//     name: blockName,
//     element: newBlock,
//     state: state, 
//     Preview descriprion: previewDescr,
//     Main description: mainDescr
// });

function displayBlock(blocks) {
    const newBlock = document.createElement('div');
    let blockName
    blockName = blocks[name]
    blockName = String(blockName)

    const id = Date.now().toString();
    newBlock.dataset.blockId = id;
    console.log(blocks)

    newBlock.innerHTML = `
            <div class="item-container" id="${id}">
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
                        Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit. Sed a volutpat felis, lobortis molestie tellus. Quisque eget facilisis urna
                    </p>
                </div>
            </div>


            <div class="item-container-d-description" id="item-container-d-description"> <!-- Detailed description / expandable -->
                <p>Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit. Sed a volutpat felis, lobortis molestie tellus. Quisque eget facilisis urna Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit. Sed a volutpat felis, lobortis molestie tellus. Quisque eget facilisis urna
                </p>
            </div>
            <!-- тут має бути кнопка expand -->
            <button class="item-container-expand-btn" id="item-container-expand-btn">...</button>
        </div>
    `;

    document.body.appendChild(newBlock);
}

categoriesBtn.onclick = function() {
    if (categoriesPage.style.display === "none") {
        categoriesPage.style.display = "flex";
    }
    else {
        categoriesPage.style.display = "none";
    }
}

function toggleBlock() {
    const container = document.querySelector("#item-container-d-description");
    const threeDots = document.querySelector("#item-container-expand-btn");

    itemPreview.addEventListener('click', () => {
        container.classList.toggle('active');
        threeDots.classList.toggle('active');
    })

};

itemPreview.onclick = toggleBlock();
// document.querySelector('#test-btn').addEventListener('click', displayBlock(blocks))

// document.querySelectorAll('.item-container-d-description').forEach(p => {
//     const content = header.nextElementSibling;
//     header.addEventListener('click', () => {
//         content.classList.toggle('active');
//     });
// });onclick="toggleBlock"