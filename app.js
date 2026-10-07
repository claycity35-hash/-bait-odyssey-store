
const DATA_URL='catalog.json';
let catalog=[];
let cart=JSON.parse(localStorage.getItem('baitOdysseyCart')||'[]');
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function save(){localStorage.setItem('baitOdysseyCart',JSON.stringify(cart));updateCartCount()}
function updateCartCount(){document.querySelectorAll('[data-cart-count]').forEach(x=>x.textContent=cart.reduce((a,i)=>a+i.qty,0))}
function add(slug){const p=catalog.find(x=>x.slug===slug);if(!p)return;const i=cart.find(x=>x.slug===slug);i?i.qty++:cart.push({slug,qty:1});save();alert(`${p.name} added to bag.`)}
function productCard(p){
 return `<article class="card"><div class="photo-missing">EXACT PRODUCT PHOTO<br>FROM Bait Odyssey CATALOG</div><div class="card-body"><h3>${esc(p.name)}</h3><div class="price">$${p.price.toFixed(2)}</div><div class="meta">${esc(p.pack)} · ${esc(p.size)}</div><a class="btn secondary" href="product.html?id=${encodeURIComponent(p.slug)}">View product</a></div></article>`
}
async function boot(){
 catalog=(await fetch(DATA_URL).then(r=>r.json())).products;
 updateCartCount();
 const path=location.pathname.split('/').pop();
 if(path==='shop.html'||path==='worms.html'||path==='craws.html'||path==='swim-baits.html'){
   const c=path==='worms.html'?'worms':path==='craws.html'?'craws':path==='swim-baits.html'?'swimbaits':null;
   const list=c?catalog.filter(p=>p.category===c):catalog;
   document.querySelector('#productGrid').innerHTML=list.map(productCard).join('');
 }
 if(path==='product.html'){
   const p=catalog.find(x=>x.slug===new URLSearchParams(location.search).get('id'))||catalog[0];
   document.querySelector('#detail').innerHTML=`<div class="detail-grid"><div class="detail-photo"><div><b>EXACT PRODUCT PHOTO</b><br><br>This slot is reserved for the verified Bait Odyssey photo for this product. No AI or third-party photo is used.</div></div><div class="detail-copy"><span class="eyebrow">${esc(p.category.toUpperCase())}</span><h1>${esc(p.name)}</h1><div class="bigprice">$${p.price.toFixed(2)}</div><div class="specs"><div class="spec"><small>Pack / format</small><b>${esc(p.pack)}</b></div><div class="spec"><small>Size</small><b>${esc(p.size)}</b></div><div class="spec"><small>Material</small><b>${esc(p.material)}</b></div><div class="spec"><small>Made</small><b>USA</b></div></div><p>Custom-made fishing bait from Bait Odyssey. Choose your options on the live catalog when ordering.</p><button class="btn primary" onclick="add('${esc(p.slug)}')">Add to bag</button></div></div>`;
 }
 if(path==='cart.html') renderCart();
}
function renderCart(){
 const el=document.querySelector('#cartContent');
 if(!cart.length){el.innerHTML='<div class="empty"><h2>Your bag is empty.</h2><p>Add Bait Odyssey custom baits to build your order.</p><a class="btn primary" href="shop.html">Shop baits</a></div>';return}
 let total=0;
 el.innerHTML=cart.map(i=>{const p=catalog.find(x=>x.slug===i.slug);const line=p.price*i.qty;total+=line;return `<div class="cart-row"><div><b>${esc(p.name)}</b><div class="meta">$${p.price.toFixed(2)} each</div></div><div class="qty"><button onclick="change('${p.slug}',-1)">−</button><b>${i.qty}</b><button onclick="change('${p.slug}',1)">+</button></div><b>$${line.toFixed(2)}</b></div>`}).join('')+`<div style="text-align:right;margin-top:24px"><h2>Total $${total.toFixed(2)}</h2><p class="meta">Checkout is completed through Bait Odyssey's live commerce system so inventory and orders stay synchronized.</p><a class="btn primary" href="https://baitodyssey.com/products" target="_blank" rel="noopener">Continue to live checkout</a></div>`;
}
function change(slug,n){const i=cart.find(x=>x.slug===slug);if(!i)return;i.qty+=n;if(i.qty<=0)cart=cart.filter(x=>x.slug!==slug);save();renderCart()}
document.addEventListener('DOMContentLoaded',boot);
