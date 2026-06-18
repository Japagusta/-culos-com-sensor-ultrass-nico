// ═══════════════════════════════════════════════════════
// NaviGlasses — Página de Compra | script.js
// ═══════════════════════════════════════════════════════

const PRICE       = 550;
const SHIPPING    = 25;
const STORAGE_KEY = 'ng_cart_v2';
const MAX_QTY     = 5;

// ── App State ────────────────────────────────────────
let state = {
  qty:      1,
  inCart:   false,
  step:     1,
  delivery: {},
  orderId:  null,
};

// ── Bootstrap ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  updateProductUI();
  setupMasks();
  showView('product');
});

// ── Persistence ──────────────────────────────────────
function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    state.qty    = clamp(saved.qty || 1, 1, MAX_QTY);
    state.inCart = !!saved.inCart;
  } catch (_) {}
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    qty:    state.qty,
    inCart: state.inCart,
  }));
}

// ── Quantity ─────────────────────────────────────────
function changeQty(delta) {
  state.qty = clamp(state.qty + delta, 1, MAX_QTY);
  updateProductUI();
}

// ── Add to Cart ───────────────────────────────────────
function addToCart() {
  state.inCart = true;
  saveCart();
  updateProductUI();

  const btn = document.getElementById('add-cart-btn');
  btn.disabled = true;
  btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="inline mr-1.5"><polyline points="20 6 9 17 4 12"/></svg>Adicionado ao Carrinho`;
  setTimeout(() => {
    btn.innerHTML = 'Adicionar ao Carrinho';
    btn.disabled = false;
  }, 1400);
}

// ── Checkout entrypoint ───────────────────────────────
function startCheckout() {
  state.step = 1;
  showView('checkout');
  updateCheckoutSidebar();
  updateStepDots();
  scrollTop();
}

function scrollToCheckout() {
  if (state.inCart) startCheckout();
  else document.getElementById('add-cart-btn')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ── Step 1 → 2 ────────────────────────────────────────
function goToStep2() {
  if (!validateDelivery()) return;
  captureDelivery();
  state.step = 2;
  updateStepDots();
  fillReview();
  showCheckoutStep(2);
  scrollTop();
}

// ── Step 2 → 3 ────────────────────────────────────────
function goToStep3() {
  state.step = 3;
  updateStepDots();
  showCheckoutStep(3);
  updatePixAmount();
  scrollTop();
}

// ── Step back helpers ─────────────────────────────────
function goToStep1() { state.step = 1; updateStepDots(); showCheckoutStep(1); }
function goToStep2Back() { state.step = 2; updateStepDots(); showCheckoutStep(2); }

// ── Delivery validation ───────────────────────────────
const REQUIRED_FIELDS = ['f-name','f-email','f-phone','f-cep','f-street','f-num','f-district','f-city','f-state'];

function validateDelivery() {
  let ok = true;
  REQUIRED_FIELDS.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('border-red-400');
    if (!el.value.trim()) { el.classList.add('border-red-400'); ok = false; }
  });
  const emailEl = document.getElementById('f-email');
  if (emailEl?.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
    emailEl.classList.add('border-red-400'); ok = false;
  }
  document.getElementById('form-error').classList.toggle('hidden', ok);
  return ok;
}

function captureDelivery() {
  const g = id => document.getElementById(id)?.value.trim() || '';
  state.delivery = {
    name: g('f-name'), email: g('f-email'), phone: g('f-phone'),
    cep: g('f-cep'), street: g('f-street'), num: g('f-num'),
    comp: g('f-comp'), district: g('f-district'),
    city: g('f-city'), state: g('f-state'),
  };
}

// ── PIX Simulation ────────────────────────────────────
function copyPix() {
  const key = 'ChaolinMatadorDePorco@gmail.com';
  navigator.clipboard.writeText(key).then(() => {
    const btn = document.getElementById('copy-pix-btn');
    btn.textContent = '✓ Copiado';
    btn.classList.replace('text-green-800', 'text-green-600');
    setTimeout(() => { btn.textContent = 'Copiar'; btn.classList.replace('text-green-600','text-green-800'); }, 2200);
  }).catch(() => {
    const el = document.getElementById('pix-key-text');
    const r = document.createRange(); r.selectNode(el);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
  });
}

const PIX_STEPS = [
  'Verificando pagamento PIX…',
  'Confirmando transferência…',
  'Processando pedido…',
  'Aguardando confirmação do banco…',
  'Pedido confirmado!',
];

function simulatePIX() {
  const btn     = document.getElementById('pay-pix-btn');
  const overlay = document.getElementById('pix-loading');
  const label   = document.getElementById('pix-status-text');

  btn.disabled = true;
  btn.innerHTML = `<span class="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2"></span>Aguardando…`;
  overlay.classList.remove('hidden');

  let i = 0;
  label.textContent = PIX_STEPS[0];
  const interval = setInterval(() => {
    i++;
    if (i < PIX_STEPS.length - 1) label.textContent = PIX_STEPS[i];
    if (i >= PIX_STEPS.length - 1) clearInterval(interval);
  }, 900);

  setTimeout(() => {
    overlay.classList.add('hidden');
    showSuccess();
  }, 4600);
}

// ── Success ───────────────────────────────────────────
function showSuccess() {
  state.orderId = 'NG-' + (Math.floor(10000 + Math.random() * 90000));
  state.inCart  = false;
  saveCart();

  const total = state.qty * PRICE + SHIPPING;
  setText('order-number', '#' + state.orderId);
  setText('success-qty-label', state.qty > 1 ? ` ×${state.qty}` : '');
  setText('success-total', fmtBRL(total));

  showView('success');
  scrollTop();
  setTimeout(launchConfetti, 400);
}

function goBackToProduct() {
  state.step   = 1;
  state.inCart = false;
  saveCart();
  updateProductUI();
  showView('product');
  scrollTop();
}

// ── Confetti ─────────────────────────────────────────
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const palette = ['#166534','#15803d','#4ade80','#bbf7d0','#111111','#e5e7eb','#f0fdf4'];
  const N = 90;
  const particles = Array.from({ length: N }, () => ({
    x:   Math.random() * canvas.width,
    y:   -10 - Math.random() * 120,
    w:   5 + Math.random() * 7,
    h:   3 + Math.random() * 4,
    col: palette[Math.floor(Math.random() * palette.length)],
    spd: 1.8 + Math.random() * 2.4,
    ang: Math.random() * 360,
    rot: (Math.random() - 0.5) * 5,
    drx: (Math.random() - 0.5) * 1.6,
    opa: 1,
  }));

  let frame = 0;
  const TOTAL = 160;

  (function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;
    particles.forEach(p => {
      p.y += p.spd; p.x += p.drx; p.ang += p.rot;
      if (frame > TOTAL * 0.55) p.opa -= 1 / (TOTAL * 0.45);
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.ang * Math.PI / 180);
      ctx.globalAlpha = Math.max(0, p.opa);
      ctx.fillStyle = p.col;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (frame < TOTAL) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  })();
}

// ── UI helpers ────────────────────────────────────────
function fmtBRL(n) {
  return 'R$\u00a0' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function showView(view) {
  ['product','checkout','success'].forEach(v =>
    document.getElementById('view-' + v)?.classList.toggle('hidden', v !== view)
  );
}

function showCheckoutStep(n) {
  [1,2,3].forEach(i =>
    document.getElementById('checkout-step-' + i)?.classList.toggle('hidden', i !== n)
  );
}

function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

function updateProductUI() {
  const sub = state.qty * PRICE;
  const tot = sub + SHIPPING;

  setText('qty-display', state.qty);
  setText('summary-qty', state.qty);
  setText('summary-sub', fmtBRL(sub));
  setText('summary-tot', fmtBRL(tot));

  // cart badge
  const badge = document.getElementById('cart-badge');
  const cartLabel = document.getElementById('cart-label');
  if (state.inCart) {
    badge?.classList.remove('hidden');
    if (badge) badge.textContent = state.qty;
    if (cartLabel) cartLabel.textContent = `${state.qty} item${state.qty > 1 ? 's' : ''}`;
  } else {
    badge?.classList.add('hidden');
    if (cartLabel) cartLabel.textContent = '0 itens';
  }

  const coBtn = document.getElementById('checkout-btn');
  if (coBtn) coBtn.classList.toggle('hidden', !state.inCart);
}

function updateCheckoutSidebar() {
  const sub = state.qty * PRICE;
  const tot = sub + SHIPPING;
  setText('co-qty', state.qty);
  setText('co-sub', fmtBRL(sub));
  setText('co-tot', fmtBRL(tot));
}

function updateStepDots() {
  [1,2,3].forEach(i => {
    const dot   = document.getElementById('step-dot-' + i);
    const label = document.getElementById('step-lbl-' + i);
    if (!dot) return;
    if (i < state.step) {
      dot.className = 'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold bg-gray-900 text-white';
      dot.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else if (i === state.step) {
      dot.className = 'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold bg-green-800 text-white';
      dot.textContent = i;
    } else {
      dot.className = 'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold bg-gray-100 text-gray-400';
      dot.textContent = i;
    }
    if (label) label.className = 'text-xs hidden sm:block ' + (i <= state.step ? 'text-gray-900 font-medium' : 'text-gray-400');
  });
}

function fillReview() {
  const sub = state.qty * PRICE;
  const tot = sub + SHIPPING;
  setText('review-qty', state.qty);
  setText('review-line', fmtBRL(state.qty * PRICE));
  setText('review-sub', fmtBRL(sub));
  setText('review-tot', fmtBRL(tot));

  const d = state.delivery;
  const el = document.getElementById('delivery-summary');
  if (el) el.innerHTML = `
    <p class="font-semibold text-gray-900">${d.name}</p>
    <p class="text-gray-600">${d.street}, ${d.num}${d.comp ? ', ' + d.comp : ''}</p>
    <p class="text-gray-600">${d.district}, ${d.city} — ${d.state} · CEP ${d.cep}</p>
    <p class="text-gray-400 text-xs mt-1">${d.email} · ${d.phone}</p>
  `;
}

function updatePixAmount() {
  const tot = state.qty * PRICE + SHIPPING;
  setText('pix-amount', fmtBRL(tot));
  setText('pix-amount-inline', fmtBRL(tot));
}

// ── Input Masks ───────────────────────────────────────
function setupMasks() {
  // CEP: 00000-000
  document.getElementById('f-cep')?.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').slice(0, 8);
    if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5);
    this.value = v;
  });
  // Phone: (00) 00000-0000
  document.getElementById('f-phone')?.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 7)      v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    this.value = v;
  });
}
