
let cart=JSON.parse(localStorage.getItem('boCart')||'[]');
const money=n=>'$'+Number(n).toFixed(2);
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function count(){document.querySelectorAll('[data-count]').forEach(x=>x.textContent=cart.reduce((n,i)=>n+i.qty,0))}
function save(){localStorage.setItem('boCart',JSON.stringify(cart));count()}
function add(i){const p=BAIT_ODYSSEY_CATALOG[i];let x=cart.find(x=>x.i===i);x?x.qty++:cart.push({i,qty:1});save();alert(p.name+' added to bag.')}
function cards(list){return list.map((p,i)=>`<article class="card"><div class="photo"><b>PRODUCT PHOTO<br><span class="muted">Verified Bait Odyssey photo required</span></b></div><div class="card-body"><h3>${esc(p.name)}</h3><div class="price">${money(p.price)}</div><div class="small">${esc(p.qty)} · ${esc(p.size)} · ${esc(p.material)}</div><a class="btn secondary" href="product.html?i=${i}">VIEW PRODUCT</a></div></article>`).join('')}
function render(){count();const page=document.body.dataset.page;
 if(page==='home'){document.querySelector('#featured').innerHTML=cards(BAIT_ODYSSEY_CATALOG.slice(0,5))}
 if(page==='shop'){document.querySelector('#products').innerHTML=cards(BAIT_ODYSSEY_CATALOG)}
 if(page==='cat'){const c=document.body.dataset.cat;document.querySelector('#products').innerHTML=cards(BAIT_ODYSSEY_CATALOG.filter(p=>p.category===c))}
 if(page==='product'){const i=Number(new URLSearchParams(location.search).get('i'));const p=BAIT_ODYSSEY_CATALOG[i]||BAIT_ODYSSEY_CATALOG[0];document.querySelector('#product').innerHTML=`<div class="detail"><div class="detail-photo"><b>EXACT Bait Odyssey product photo<br><span class="muted">No substitute or AI image is used.</span></b></div><div><span class="pill">${esc(p.category.toUpperCase())}</span><h1>${esc(p.name)}</h1><div class="big">${money(p.price)}</div><div class="specs"><div class="spec"><small>Quantity</small><b>${esc(p.qty)}</b></div><div class="spec"><small>Dimensions</small><b>${esc(p.size)}</b></div><div class="spec"><small>Material</small><b>${esc(p.material)}</b></div><div class="spec"><small>Made</small><b>USA</b></div></div><button class="btn primary" onclick="add(${i})">ADD TO BAG</button> <a class="btn secondary" href="${p.live}" target="_blank" rel="noopener">LIVE PRODUCT / OPTIONS</a></div></div>`}
 if(page==='cart'){cartRender()}
}
function cartRender(){const e=document.querySelector('#cart');if(!cart.length){e.innerHTML='<div class="empty"><h2>Your bag is empty.</h2><a class="btn primary" href="shop.html">SHOP BAITS</a></div>';return}let t=0;e.innerHTML=cart.map(x=>{let p=BAIT_ODYSSEY_CATALOG[x.i],v=p.price*x.qty;t+=v;return `<div class="cartrow"><div><b>${esc(p.name)}</b><div class="small">${money(p.price)} each</div></div><div class="qty"><button onclick="chg(${x.i},-1)">−</button> ${x.qty} <button onclick="chg(${x.i},1)">+</button></div><b>${money(v)}</b></div>`}).join('')+`<div style="text-align:right;margin-top:25px"><h2>Total ${money(t)}</h2><p class="muted">Product options and final checkout remain synchronized with the live Bait Odyssey store.</p><a class="btn primary" href="https://baitodyssey.com/products" target="_blank" rel="noopener">CONTINUE TO LIVE CHECKOUT</a></div>`}
function chg(i,n){let x=cart.find(x=>x.i===i);if(!x)return;x.qty+=n;if(x.qty<1)cart=cart.filter(x=>x.i!==i);save();cartRender()}
document.addEventListener('DOMContentLoaded',render)
