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

