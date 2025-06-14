let creationBlock = document.getElementById("creation-block");
let categoriesBtn = document.querySelector("#nav-btn-link-categories");
let categoriesPage = document.querySelector("#categories-dropdown");
let itemPreview = document.querySelector("#item-container");
let creation = false;
let blocks = [];// Array to keep track of all blocks
let blocksCreation = [];


// Відкриття категорій
categoriesBtn.onclick = function() {
    if (categoriesPage.style.display === "none") {
        categoriesPage.style.display = "flex";
    }
    else {
        categoriesPage.style.display = "none";
    }
};

// Close blocks when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.item-container')) {
        document.querySelectorAll('.item-container-d-description').forEach(content => {
            content.classList.remove('active');
        });
    }
});

// Add click event listener to created preview for extention
function addBlock(id) {
    const block = document.querySelector(`[data-block-id="${id}"]`);
    const content = block.querySelector('.item-container-d-description');
    if (!content.classList.contains('active')) {
        // console.log(id);
        content.classList.add('active');
        // console.log(block.name);
    }
}

//remove extention
function removeBlock(id) {
    const block = document.querySelector(`[data-block-id="${id}"]`);
    console.log(id);
    const content = block.querySelector('.item-container-d-description');
    content.classList.remove('active');
    console.log(block.name);
}

async function getItemsInfo() {
  const response = await fetch('/api/item/read', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ name: null })
  });

  const data = await response.json();
  return data;
//   console.log(data);
//   data.forEach(item => {
//     console.log(item.name);
//   })
}

//image upload and refresh
async function displayItems() { 
    let itemsSection = document.getElementById("items-section");
    const itemsList = await getItemsInfo();
    console.log(itemsList);
    // clearAll()
    itemsList.forEach(item => {

        const displayBlock = document.createElement('div');
        displayBlock.className = 'item-container';
        
        if (item.status == true) {
            availability = 'В наявності';
        }
        else {
            availability = 'Немає в наявності';
        }
        // <img src="${item.img}" class="item-container-preview-img" id="creation-img-src"></img>
                                    // <h4 class="item-container-preview-statusBar-status" id="statusBar-status" style="display: block;">${availability}</h4>
        item.block = displayBlock;
        displayBlock.innerHTML = `
        <div class="item-container" data-block-id="${item.id}">
            <div class="item-container-onclick" onclick="window.location.href='/item.html?id=${item.id}'">
                <!-- dropdown edit partially completed -->
                <div class="item-container-preview" id="item-container-preview"> <!--flex-->
                    <div class="item-container-preview-img-container">
                        <img src="/img/js product img.png" class="item-container-preview-img">
                    </div>

                    <div class="item-container-preview-text"> <!-- Right part -->
                        <div class="item-container-preview-statusBar"> <!-- flex; space-between; -->
                            <h3 class="item-container-preview-statusBar-title" id="statusBar-title" style="display: block;">${item.name}</h3>

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
                <div style="display: none; justify-content: flex-start;" id="priceInputBlock">
                    <h2 class="price">₴</h2><h2 class="price" style="width: 50%;"><input class="preview-title" type="text" id="priceInput"></h2><h2 class="price" style="margin-left:10px;">грн</h2>
                </div>

            </div>
        </div>
        `;//onclick="shrinkBlock(${item.id})"
        itemsSection.appendChild(displayBlock)

    })
    // console.log('finish');
    
}
document.addEventListener("DOMContentLoaded", displayItems);