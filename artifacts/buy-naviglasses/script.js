/* ============================================================
   NaviGlasses — Buy Page Script
   ============================================================ */

const PRICE_UNIT = 550;
const PRICE_SHIP = 25;
const MAX_QTY    = 5;
const PIX_KEY    = 'ChaolinMatadorDePorco@gmail.com';

let qty       = 1;
let cartAdded = false;

/* ── helpers ── */
const $ = (id) => document.getElementById(id);
const fmt = (n) => 'R$\u00a0' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

function calcTotal(q) { return q * PRICE_UNIT + PRICE_SHIP; }
function calcSub(q)   { return q * PRICE_UNIT; }

/* ── quantity ── */
window.changeQty = function (delta) {
  qty = Math.min(MAX_QTY, Math.max(1, qty + delta));
  $('qty-display').textContent = qty;
  updatePrices();
};

function updatePrices() {
  const sub = calcSub(qty);
  const tot = calcTotal(qty);

  // sidebar
  if ($('sb-qty')) $('sb-qty').textContent = qty;
  if ($('sb-sub')) $('sb-sub').textContent = fmt(sub);
  if ($('sb-tot')) $('sb-tot').textContent = fmt(tot);

  // cart header
  if ($('cart-label')) $('cart-label').textContent = qty + (qty === 1 ? ' item' : ' itens');
  if ($('cart-badge')) $('cart-badge').textContent = qty;

  // review step
  if ($('rev-qty'))  $('rev-qty').textContent  = qty;
  if ($('rev-line')) $('rev-line').textContent = fmt(sub);
  if ($('rev-sub'))  $('rev-sub').textContent  = fmt(sub);
  if ($('rev-tot'))  $('rev-tot').textContent  = fmt(tot);

  // pix step
  const pixAmt = fmt(tot);
  if ($('pix-amt'))        $('pix-amt').textContent        = pixAmt;
  if ($('pix-amt-inline')) $('pix-amt-inline').textContent = pixAmt;
}

/* ── add to cart / start checkout ── */
window.handleAddToCart = function () {
  cartAdded = true;

  const badge = $('cart-badge');
  if (badge) { badge.textContent = qty; badge.style.display = 'flex'; }
  const cartLbl = $('cart-label');
  if (cartLbl) { cartLbl.textContent = qty + (qty === 1 ? ' item' : ' itens'); cartLbl.style.display = 'block'; }

  if ($('sb-cta'))            $('sb-cta').style.display            = 'none';
  if ($('section-add-cart'))  $('section-add-cart').style.display  = 'none';

  const area = $('checkout-area');
  if (area) {
    area.style.display = 'block';
    setTimeout(() => area.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }

  setStepUI(1);
};

window.jumpToCheckout = function () {
  if (!cartAdded) handleAddToCart();
  else if ($('checkout-area')) $('checkout-area').scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* ── step UI ── */
function setStepUI(step) {
  const views = { 1: $('step-1'), 2: $('step-2'), 3: $('step-3') };
  const dots  = { 1: $('dot-1'),  2: $('dot-2'),  3: $('dot-3') };
  const lbls  = { 1: $('lbl-1'),  2: $('lbl-2'),  3: $('lbl-3') };

  for (let i = 1; i <= 3; i++) {
    if (views[i]) views[i].style.display = (i === step) ? 'block' : 'none';
    if (dots[i])  dots[i].className = 'step-dot ' + (i < step ? 'done' : i === step ? 'active' : 'inactive');
    if (lbls[i]) {
      lbls[i].style.color      = i <= step ? '#111' : '#9ca3af';
      lbls[i].style.fontWeight = i === step ? '500' : '400';
    }
  }

  updatePrices();
}

window.goStep1Back = function () {
  setStepUI(1);
  if ($('form-error')) $('form-error').style.display = 'none';
  setTimeout(() => { if ($('f-name')) $('f-name').focus(); }, 80);
};

window.goStep2 = function () {
  if (!validateForm()) return;
  populateReview();
  setStepUI(2);
  scrollToCheckout();
};

window.goStep2Back = function () {
  setStepUI(2);
  scrollToCheckout();
};

window.goStep3 = function () {
  setStepUI(3);
  scrollToCheckout();
};

function scrollToCheckout() {
  const el = $('checkout-area') || $('step-bar');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── form validation ── */
function validateForm() {
  const required = ['f-name','f-email','f-phone','f-cep','f-state','f-street','f-num','f-district','f-city'];
  let ok = true;

  required.forEach((id) => {
    const el = $(id);
    if (!el) return;
    const val = el.value.trim();
    const invalid = !val || (id === 'f-email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
    el.classList.toggle('err', invalid);
    if (invalid) ok = false;
  });

  if ($('form-error')) $('form-error').style.display = ok ? 'none' : 'block';
  if (!ok) {
    const first = document.querySelector('.inp.err');
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  return ok;
}

/* ── input masking ── */
document.addEventListener('DOMContentLoaded', () => {
  updatePrices();

  const phone = $('f-phone');
  if (phone) phone.addEventListener('input', () => {
    let v = phone.value.replace(/\D/g, '').slice(0, 11);
    v = v.length <= 10
      ? v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
      : v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    phone.value = v.replace(/-$/, '');
  });

  const cep = $('f-cep');
  if (cep) cep.addEventListener('input', () => {
    let v = cep.value.replace(/\D/g, '').slice(0, 8);
    if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5);
    cep.value = v;
  });

  document.querySelectorAll('.inp').forEach((el) => {
    el.addEventListener('input',  () => el.classList.remove('err'));
    el.addEventListener('change', () => el.classList.remove('err'));
  });
});

/* ── populate review ── */
function populateReview() {
  const g = (id) => { const el = $(id); return el ? el.value.trim() : ''; };
  const name     = g('f-name');
  const email    = g('f-email');
  const phone    = g('f-phone');
  const cep      = g('f-cep');
  const street   = g('f-street');
  const num      = g('f-num');
  const comp     = g('f-comp');
  const district = g('f-district');
  const city     = g('f-city');
  const state    = g('f-state');

  const lines = [
    street + ', ' + num + (comp ? ' – ' + comp : ''),
    district,
    city + ' – ' + state,
    'CEP ' + cep,
  ].filter(Boolean);

  const html = `<strong style="color:#111;">${esc(name)}</strong><br>` +
    `${esc(email)}<br>${esc(phone)}<br>` +
    `<span style="white-space:pre-line;">${lines.map(esc).join('\n')}</span>`;

  if ($('delivery-summary')) $('delivery-summary').innerHTML = html;
  updatePrices();
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ── copy PIX key ── */
window.copyPix = function () {
  const setBtn = (txt) => { if ($('copy-btn')) $('copy-btn').textContent = txt; };

  const fallback = () => {
    const ta = document.createElement('textarea');
    ta.value = PIX_KEY;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    setBtn('✓ Copiado');
    setTimeout(() => setBtn('Copiar'), 2500);
  };

  if (navigator.clipboard) {
    navigator.clipboard.writeText(PIX_KEY).then(() => {
      setBtn('✓ Copiado');
      setTimeout(() => setBtn('Copiar'), 2500);
    }).catch(fallback);
  } else {
    fallback();
  }
};

/* ── confirm PIX (simulate) ── */
window.confirmPix = function () {
  const btn = $('confirm-pix-btn');
  if (btn) { btn.disabled = true; btn.innerHTML = '<span style="opacity:.7">Verificando…</span>'; }

  const overlay = $('loading-overlay');
  if (overlay) overlay.classList.add('show');

  const statusEl = overlay ? overlay.querySelector('p') : null;
  const msgs = ['Verificando pagamento…','Conectando ao Banco Central…','Confirmando transferência…','Registrando pedido…'];
  let i = 0;
  const iv = setInterval(() => { i = (i + 1) % msgs.length; if (statusEl) statusEl.textContent = msgs[i]; }, 700);

  setTimeout(() => {
    clearInterval(iv);
    if (overlay) overlay.classList.remove('show');
    if (btn) { btn.disabled = false; btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Confirmar Pagamento PIX'; }
    showSuccess();
  }, 3000);
};

/* ── success ── */
function showSuccess() {
  const num = 'NG-' + String(Math.floor(10000 + Math.random() * 90000));
  if ($('order-num'))    $('order-num').textContent    = '#' + num;
  if ($('suc-tot'))      $('suc-tot').textContent      = fmt(calcTotal(qty));
  if ($('suc-qty-lbl'))  $('suc-qty-lbl').textContent  = qty > 1 ? ' ×' + qty : '';

  const overlay = $('success-overlay');
  if (overlay) overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
  launchConfetti();
}

window.resetToStart = function () {
  const overlay = $('success-overlay');
  if (overlay) overlay.classList.remove('show');
  document.body.style.overflow = '';

  qty = 1;
  cartAdded = false;

  if ($('qty-display')) $('qty-display').textContent = '1';
  updatePrices();
  if ($('section-add-cart')) $('section-add-cart').style.display = 'block';
  if ($('checkout-area'))    $('checkout-area').style.display    = 'none';
  if ($('sb-cta'))           $('sb-cta').style.display           = 'block';

  const badge = $('cart-badge');
  if (badge) badge.style.display = 'none';

  ['f-name','f-email','f-phone','f-cep','f-state','f-street','f-num','f-comp','f-district','f-city']
    .forEach((id) => { const el = $(id); if (el) el.value = ''; });

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/* ── confetti ── */
function launchConfetti() {
  const canvas = $('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#166534','#111','#374151','#6b7280','#d1d5db','#4ade80','#86efac'];
  const pieces = Array.from({ length: 110 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * .5,
    w: 5 + Math.random() * 7,
    h: 4 + Math.random() * 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - .5) * .1,
    vx: (Math.random() - .5) * 2.5,
    vy: 2 + Math.random() * 3,
    opacity: 1,
  }));

  let raf;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = 0;
    pieces.forEach((p) => {
      p.x     += p.vx;
      p.y     += p.vy;
      p.angle += p.spin;
      if (p.y > canvas.height * .65) p.opacity = Math.max(0, p.opacity - .025);
      if (p.opacity > 0 && p.y < canvas.height + 20) {
        alive++;
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    });
    if (alive > 0) raf = requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  draw();
  setTimeout(() => { cancelAnimationFrame(raf); ctx.clearRect(0, 0, canvas.width, canvas.height); }, 5500);
}
