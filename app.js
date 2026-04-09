// 初始化 Supabase
const SUPABASE_URL = 'https://rcpvbozkheafjbpsuanc.supabase.co'; // 請替換成你的 Supabase Project URL
const SUPABASE_ANON_KEY = 'sb_publishable_oTEpvc1UB2DH1du9HdpcPQ_j-JwMimI'; // 請替換成你的 Supabase Anon Key
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 產品資料庫 (模擬麥當勞最新價格與邏輯)
const productsData = {
    meals: [
        { id: 'm1', name: '龍蝦風味甘薯嫩煎堡', price: 129, emoji: '🍔' },
        { id: 'm2', name: '大麥克', price: 81, emoji: '🍔' },
        { id: 'm3', name: '雙層四盎司牛肉堡', price: 135, emoji: '🍔' },
        { id: 'm4', name: '四盎司牛肉堡', price: 95, emoji: '🍔' },
        { id: 'm5', name: 'BLT安格斯牛肉堡', price: 125, emoji: '🍔' },
        { id: 'm6', name: '蕈菇安格斯牛肉堡', price: 135, emoji: '🍔' },
        { id: 'm7', name: '帕瑪成功安格斯牛肉堡', price: 130, emoji: '🍔' },
        { id: 'm8', name: '雙層牛肉吉事堡', price: 75, emoji: '🍔' },
        { id: 'm9', name: '勁辣鷄腿堡', price: 81, emoji: '🍔' },
        { id: 'm10', name: '嫩煎鷄腿堡', price: 86, emoji: '🍔' },
        { id: 'm11', name: '帕瑪森主廚鷄腿堡', price: 130, emoji: '🍔' },
        { id: 'm12', name: '蕈菇主廚鷄腿堡', price: 135, emoji: '🍔' },
        { id: 'm13', name: 'BLT嫩煎鷄腿堡', price: 125, emoji: '🍔' },
        { id: 'm14', name: '麥香魚', price: 60, emoji: '🐟🍔' },
        { id: 'm15', name: '雙層麥香魚', price: 81, emoji: '🐟🍔' },
        { id: 'm16', name: '麥香鷄', price: 51, emoji: '🍔' },
        { id: 'm17', name: '藜麥烤鷄沙拉', price: 142, emoji: '🥗' },
        { id: 'm18', name: '藜麥辣味脆鷄沙拉', price: 142, emoji: '🥗' },
        { id: 'm19', name: '藜麥鱈魚沙拉', price: 142, emoji: '🥗' },
        { id: 'm20', name: '藜麥沙拉', price: 112, emoji: '🥗' }
    ],
    fried: [
        { id: 'f1', name: '麥克鷄塊 (10塊)', price: 110, emoji: '🍗' },
        { id: 'f2', name: '麥克鷄塊 (6塊)', price: 69, emoji: '🍗' },
        { id: 'f3', name: '原味麥脆鷄腿2塊', price: 129, emoji: '🍗' },
        { id: 'f4', name: '辣味麥脆鷄腿2塊', price: 129, emoji: '🍗' }
    ],
    drinks: [
        { id: 'd1', name: '草莓氣泡飲', price: 48, emoji: '🍓🥤' },
        { id: 'd2', name: '金選美式咖啡(熱)', price: 75, emoji: '☕' },
        { id: 'd3', name: '金選美式咖啡(冰)', price: 75, emoji: '🧊☕' },
        { id: 'd4', name: '經典美式咖啡(熱)', price: 65, emoji: '☕' },
        { id: 'd5', name: '金選那堤(熱)', price: 88, emoji: '☕' },
        { id: 'd6', name: '金選那堤(冰)', price: 88, emoji: '🧊☕' },
        { id: 'd7', name: '蜂蜜紅茶(冰)', price: 59, emoji: '🍯🥤' },
        { id: 'd8', name: '蜂蜜奶茶(冰)', price: 69, emoji: '🍯🥤' },
        { id: 'd9', name: '焦糖奶茶(冰)', price: 69, emoji: '🧋' },
        { id: 'd10', name: '玉米湯', price: 46, emoji: '🥣' },
        { id: 'd11', name: '可口可樂', price: 33, emoji: '🥤' },
        { id: 'd12', name: '檸檬風味紅茶(冰)', price: 33, emoji: '🥤' },
        { id: 'd13', name: '雪碧', price: 33, emoji: '🥤' },
        { id: 'd14', name: '無糖綠茶(冰)', price: 35, emoji: '🍵' },
        { id: 'd15', name: '無糖紅茶(冰)', price: 35, emoji: '🥤' },
        { id: 'd16', name: '可口可樂 Zero', price: 33, emoji: '🥤' },
        { id: 'd17', name: '蜂蜜奶茶(熱)', price: 69, emoji: '🍯☕' },
        { id: 'd18', name: '經典美式咖啡(冰)', price: 65, emoji: '🧊☕' },
        { id: 'd19', name: '經典那堤(冰)', price: 78, emoji: '🧊☕' },
        { id: 'd20', name: '經典那堤(熱)', price: 78, emoji: '☕' },
        { id: 'd21', name: '奶茶(冰)', price: 51, emoji: '🧋' },
        { id: 'd22', name: '奶茶(熱)', price: 51, emoji: '☕' },
        { id: 'd23', name: '紅茶(熱)', price: 38, emoji: '☕' },
        { id: 'd24', name: '台灣鮮榨柳丁汁', price: 69, emoji: '🍊' },
        { id: 'd25', name: '鮮乳', price: 33, emoji: '🥛' }
    ]
};

// 所有商品大集合 (給分類算圖用)
let allProducts = [];
Object.keys(productsData).forEach(cat => {
    productsData[cat].forEach(p => {
        allProducts.push({ ...p, category: cat });
    });
});

// 套餐升級資料
const combos = [
    { id: 'none', name: '單點 (不加價)', price: 0, showDrinks: false },
    { id: 'A', name: 'A 經典配餐 (中薯+中杯飲料)', price: 65, showDrinks: true }
];

// 預設飲料清單
const defaultDrinks = [
    { name: '可口可樂', price: 0 },
    { name: '可口可樂 ZERO', price: 0 },
    { name: '雪碧', price: 0 },
    { name: '無糖綠茶', price: 0 },
    { name: '冰紅茶(檸檬風味)', price: 0 },
    { name: '玉米湯(小)', price: 8 }
];

// DOM Element References
const productGrid = document.getElementById('productGrid');
const categoryBtns = document.querySelectorAll('.category-btn');
const cartToggle = document.getElementById('cartToggle');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartBody = document.getElementById('cartBody');
const totalPriceEl = document.getElementById('totalPrice');
const clearAllBtn = document.getElementById('clearAllBtn');

// Auth 相關元素與邏輯已移除，改為在 Modal 中輸入姓名
let lastUsedName = localStorage.getItem('lastUsedName') || '';

// Modal Elements
const orderModal = document.getElementById('orderModal');
const closeModalBtn = document.getElementById('closeModal');
const modalItemName = document.getElementById('modalItemName');
const modalItemPrice = document.getElementById('modalItemPrice');
const dynamicOptionsArea = document.getElementById('dynamicOptionsArea');
const confirmAddBtn = document.getElementById('confirmAddBtn');
const orderUserNameInput = document.getElementById('orderUserName');

let currentProduct = null;
let currentCalculatedPrice = 0;

// 初始化渲染
function renderProducts(category = 'meals') {
    productGrid.innerHTML = '';
    const filtered = allProducts.filter(p => p.category === category);
    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-name">${p.name}</div>
            <div class="product-price">$${p.price}</div>
        `;
        card.addEventListener('click', () => openModal(p));
        productGrid.appendChild(card);
    });
}
renderProducts();

// 分類切換事件
categoryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderProducts(e.target.dataset.category);
    });
});

// 打開點餐 Modal
function openModal(product) {
    currentProduct = product;
    currentCalculatedPrice = product.price;
    modalItemName.textContent = product.name;
    modalItemPrice.textContent = `$${currentCalculatedPrice}`;

    // 預填上次輸入的姓名
    orderUserNameInput.value = lastUsedName;

    // 動態清空配置區
    dynamicOptionsArea.innerHTML = '';

    if (product.category === 'meals' || product.category === 'fried') {
        // 主餐 -> 顯示 A-E 配餐邏輯
        dynamicOptionsArea.innerHTML = `
            <div class="combo-box">
                <h4>選擇配餐</h4>
                <div class="radio-group" id="comboRadios">
                    ${combos.map((c, i) => `
                        <label>
                            <input type="radio" name="comboSet" value="${c.id}" ${i === 0 ? 'checked' : ''}>
                            ${c.name} ${c.price > 0 ? `(+$${c.price})` : ''}
                        </label>
                    `).join('')}
                </div>
                
                <div id="comboAddonArea" class="hidden">
                    <h4>配餐飲料</h4>
                    <div class="radio-group" id="drinkSelectionGroup">
                        ${defaultDrinks.map((d, i) => `
                            <label>
                                <input type="radio" name="drinkSelection" value="${d.name}" data-price="${d.price}" ${i === 0 ? 'checked' : ''}>
                                ${d.name} ${d.price > 0 ? `(+$${d.price})` : ''}
                            </label>
                        `).join('')}
                    </div>
                    
                </div>
            </div>
        `;

        // 監聽套餐變更計算總計
        const radios = document.querySelectorAll('input[name="comboSet"]');
        const addonArea = document.getElementById('comboAddonArea');

        const updatePrice = () => {
            const selectedVal = document.querySelector('input[name="comboSet"]:checked').value;
            const cb = combos.find(x => x.id === selectedVal);

            // 是否顯示飲料選單
            if (cb.showDrinks) addonArea.classList.remove('hidden');
            else addonArea.classList.add('hidden');

            let drinkExtra = 0;
            if (cb.showDrinks) {
                const selectedDrink = document.querySelector('input[name="drinkSelection"]:checked');
                drinkExtra = selectedDrink ? parseInt(selectedDrink.dataset.price) : 0;
            }

            // 計算
            currentCalculatedPrice = product.price + cb.price + drinkExtra;
            modalItemPrice.textContent = `$${currentCalculatedPrice}`;
        };

        radios.forEach(r => r.addEventListener('change', updatePrice));
        document.querySelectorAll('input[name="drinkSelection"]').forEach(dr => dr.addEventListener('change', updatePrice));

    } else {
        // 單點點心或飲料 -> 預設客製化
        dynamicOptionsArea.innerHTML = `
            <div class="combo-box">
                <h4>客製化</h4>
                <select class="drink-select" id="customization">
                    <option value="">正常</option>
                    <option value="去冰">去冰</option>
                    <option value="少冰">少冰</option>
                    <option value="不加醬">不加醬</option>
                </select>
            </div>
        `;
    }

    orderModal.classList.add('active');
}

closeModalBtn.addEventListener('click', () => {
    orderModal.classList.remove('active');
});

// 送出並組織資料送後端
confirmAddBtn.addEventListener('click', () => {
    const userName = orderUserNameInput.value.trim();
    if (!userName) return alert('請輸入點餐人姓名！');
    
    // 儲存姓名方便下次使用
    lastUsedName = userName;
    localStorage.setItem('lastUsedName', userName);

    let finalDetails = '';

    if (currentProduct.category === 'meals' || currentProduct.category === 'fried') {
        const selectedVal = document.querySelector('input[name="comboSet"]:checked').value;
        const cb = combos.find(x => x.id === selectedVal);
        if (cb.id !== 'none') {
            const drink = document.querySelector('input[name="drinkSelection"]:checked').value;
            finalDetails = `搭配 ${cb.name} - ${drink}`;
        } else {
            finalDetails = '單點';
        }
    } else {
        const custom = document.getElementById('customization').value;
        if (custom) finalDetails = `[${custom}]`;
    }

    supabaseClient.from('orders').insert([{
        username: userName,
        item_name: currentProduct.name,
        item_price: currentCalculatedPrice,
        item_options: finalDetails
    }]).then(({ error }) => {
        if (error) {
            console.error('Error adding item:', error);
            alert('點餐失敗，請檢查網路連線或稍後再試！');
        }
    });

    orderModal.classList.remove('active');
});

// 渲染購物車
function renderCart(cartData) {
    let totalItems = 0;
    let globalTotal = 0;
    cartBody.innerHTML = '';

    if (!cartData || typeof cartData !== 'object' || Object.keys(cartData).length === 0) {
        cartBody.innerHTML = '<p style="text-align:center; color:#999; margin-top:20px;">購物車是空的</p>';
    } else {
        Object.keys(cartData).forEach(username => {
            const items = cartData[username];
            let userTotal = 0;
            const groupDiv = document.createElement('div');
            groupDiv.className = 'user-group';
            let itemsHtml = '';

            items.forEach((item) => {
                userTotal += item.price;
                totalItems++;
                itemsHtml += `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <strong>${item.name}</strong> 
                            <span class="cart-item-note">${item.options}</span>
                        </div>
                        <div style="font-weight:bold;">$${item.price}</div>
                    </div>
                `;
            });

            groupDiv.innerHTML = `
                <h4>
                    ${username} <span style="font-size:14px;color:#333">小計: $${userTotal}</span>
                    <button class="delete-user-btn" onclick="deleteUser('${username}')">刪除</button>
                </h4>
                ${itemsHtml}
            `;
            cartBody.appendChild(groupDiv);
            globalTotal += userTotal;
        });
    }

    cartCount.textContent = totalItems;
    totalPriceEl.textContent = globalTotal;
}

// Supabase 即時同步與 CRUD 邏輯
async function fetchOrders() {
    const { data, error } = await supabaseClient.from('orders').select('*').order('created_at', { ascending: true });
    if (error) {
        console.error('Error fetching orders:', error);
        return;
    }

    const cartData = {};
    if (data) {
        data.forEach(row => {
            if (!cartData[row.username]) cartData[row.username] = [];
            cartData[row.username].push({
                id: row.id,
                name: row.item_name,
                price: Number(row.item_price),
                options: row.item_options
            });
        });
    }
    renderCart(cartData);
}

// 監聽即時變更
supabaseClient.channel('public:orders')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, payload => {
        fetchOrders();
    })
    .subscribe();

// 初始呼叫
fetchOrders();

// 刪除
window.deleteUser = async function (username) {
    if (confirm(`確定要刪除 ${username} 的所有點單嗎？`)) {
        const { error } = await supabaseClient.from('orders').delete().eq('username', username);
        if (error) console.error('Error deleting user orders:', error);
    }
};

clearAllBtn.addEventListener('click', async () => {
    if (confirm('確定要清空所有人的點單嗎？')) {
        // Supabase 刪除全部需有條件，neq 空值可達到效果
        const { error } = await supabaseClient.from('orders').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        if (error) console.error('Error clearing all orders:', error);
    }
});

// 側邊欄開關
cartToggle.addEventListener('click', () => cartSidebar.classList.add('open'));
closeCart.addEventListener('click', () => cartSidebar.classList.remove('open'));
