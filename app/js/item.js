const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('id');
// const item = getItem(itemId);
// console.log(item); // 123

async function getItem(itemId) {
    const response = await fetch(`/api/item/read`, {
    method: 'GET',
    credentials: 'include',
    // data: JSON.stringify({ 
    //     id: itemId 
    // })
  });

  const data = await response.json();
  const item = data.find(item => item.id === parseInt(itemId));
  console.log(item); // 123
  return item;
}

async function editItem(item) {
    const response = await fetch(`/api/item/update`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        id: itemId,
        category_id: 1,
        name: "Router AX60",
        short_description: "Updated Wi-Fi router",
        long_description: `<img src="/img/photo_2024-12-29_18-43-55.png" alt="Aojiru" class="item-image">
            <h1 class="item-title">Аоджіру</h1>
            <p class="item-description">Аоджіру - це японський зелений порошок, виготовлений з молодих листків ячменю. Він відомий своїми корисними властивостями, такими як покращення травлення, підвищення енергії та зміцнення імунної системи.</p>`,
        price: 89.99
    })
  });

  const data = await response.json();
//   const updatedItem = data.find(item => item.id === parseInt(itemId));
  console.log(data); // 123
}
// editItem(item);

async function displayItem(itemId) {
    const item = await getItem(itemId); // ✅ чекаємо результат
    const itemsSection = document.getElementById('items-section');
    if (!item) {
        itemsSection.innerHTML = '<p>Item not found.</p>';
        return;
    }
    else {
        itemsSection.innerHTML = `
            ${item.long_description}
            `;
        console.log(item.long_description);
    }
}
displayItem(itemId);