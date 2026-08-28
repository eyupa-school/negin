/* ============================================
   Negin — Doğum Günü Sitesi
   ============================================ */

// Negin'in doğum tarihi (26 yaşına bastığı gün: 27 Ağustos 2026)
const DOGUM_TARIHI = new Date(2000, 7, 27, 0, 0, 0); // 27 Ağustos 2000

const az = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --------------------------------------------
   1) KONFETİ
   -------------------------------------------- */
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let parcaciklar = [];
let konfetiCalisiyor = false;

const RENKLER = ['#ff8fb8', '#ffc2d8', '#c69bff', '#ffd79a', '#fff6f9', '#ff6f9f'];

function canvasBoyutla() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
canvasBoyutla();
window.addEventListener('resize', canvasBoyutla);

function parcacikUret(adet, kaynakX, kaynakY) {
  const W = window.innerWidth;
  for (let i = 0; i < adet; i++) {
    parcaciklar.push({
      x: kaynakX !== undefined ? kaynakX : Math.random() * W,
      y: kaynakY !== undefined ? kaynakY : -20 - Math.random() * 120,
      g: 6 + Math.random() * 7,             // genişlik
      y_: 8 + Math.random() * 9,            // yükseklik
      vx: (Math.random() - 0.5) * 4.5,
      vy: 2 + Math.random() * 3.5,
      donus: Math.random() * Math.PI * 2,
      donusHizi: (Math.random() - 0.5) * 0.22,
      renk: RENKLER[(Math.random() * RENKLER.length) | 0],
      omur: 1
    });
  }
}

function konfetiCiz() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  const H = window.innerHeight;

  for (let i = parcaciklar.length - 1; i >= 0; i--) {
    const p = parcaciklar[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.045;                    // yerçekimi
    p.vx *= 0.995;
    p.donus += p.donusHizi;

    if (p.y > H * 0.72) p.omur -= 0.012;

    if (p.y > H + 60 || p.omur <= 0) {
      parcaciklar.splice(i, 1);
      continue;
    }

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.donus);
    ctx.globalAlpha = Math.max(p.omur, 0);
    ctx.fillStyle = p.renk;
    ctx.fillRect(-p.g / 2, -p.y_ / 2, p.g, p.y_);
    ctx.restore();
  }

  if (parcaciklar.length > 0) {
    requestAnimationFrame(konfetiCiz);
  } else {
    konfetiCalisiyor = false;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

function konfetiPatlat(adet = 130, x, y) {
  if (az) return;
  parcacikUret(adet, x, y);
  if (!konfetiCalisiyor) {
    konfetiCalisiyor = true;
    requestAnimationFrame(konfetiCiz);
  }
}

/* --------------------------------------------
   2) AÇILIŞ PERDESİ
   -------------------------------------------- */
const perde  = document.getElementById('perde');
const hediye = document.getElementById('hediye');
const site   = document.getElementById('site');

document.body.classList.add('kilitli');

let acildiMi = false;
function siteyiAc() {
  if (acildiMi) return;
  acildiMi = true;

  hediye.classList.add('acik');
  konfetiPatlat(180);

  setTimeout(() => konfetiPatlat(120), 450);

  setTimeout(() => {
    perde.classList.add('acildi');
    site.classList.add('gorunur');
    site.setAttribute('aria-hidden', 'false');
    document.body.classList.remove('kilitli');
    sayaciBaslat();
    gozlemciyiBaslat();
  }, 700);
}

hediye.addEventListener('click', siteyiAc);
perde.addEventListener('click', siteyiAc);
window.addEventListener('keydown', (e) => {
  if (!acildiMi && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    siteyiAc();
  }
});

/* --------------------------------------------
   3) YAŞAM SAYACI
   -------------------------------------------- */
const eGun     = document.getElementById('s-gun');
const eSaat    = document.getElementById('s-saat');
const eDakika  = document.getElementById('s-dakika');
const eSaniye  = document.getElementById('s-saniye');

function sayilariGuncelle() {
  const fark = Date.now() - DOGUM_TARIHI.getTime();
  const saniye = Math.floor(fark / 1000);
  const dakika = Math.floor(saniye / 60);
  const saat   = Math.floor(dakika / 60);
  const gun    = Math.floor(saat / 24);

  eGun.textContent    = gun.toLocaleString('tr-TR');
  eSaat.textContent   = saat.toLocaleString('tr-TR');
  eDakika.textContent = dakika.toLocaleString('tr-TR');
  eSaniye.textContent = saniye.toLocaleString('tr-TR');
}

let sayacBasladi = false;
function sayaciBaslat() {
  if (sayacBasladi) return;
  sayacBasladi = true;
  sayilariGuncelle();
  setInterval(sayilariGuncelle, 1000);
}

/* --------------------------------------------
   4) DİLEK KARTLARI (dokunmatik için)
   -------------------------------------------- */
document.querySelectorAll('.dilek').forEach((kart) => {
  kart.addEventListener('click', () => kart.classList.toggle('cevrik'));
  kart.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      kart.classList.toggle('cevrik');
    }
  });
});

/* --------------------------------------------
   5) PASTA — mumları üfle
   -------------------------------------------- */
const pasta  = document.getElementById('pasta');
const mesaj  = document.getElementById('pasta-mesaj');

pasta.addEventListener('click', () => {
  if (pasta.classList.contains('uflendi')) {
    // Tekrar yak
    pasta.classList.remove('uflendi');
    mesaj.classList.remove('gorunur');
    return;
  }

  pasta.classList.add('uflendi');
  mesaj.classList.add('gorunur');

  const kutu = pasta.getBoundingClientRect();
  konfetiPatlat(160, kutu.left + kutu.width / 2, kutu.top + 40);
});

/* --------------------------------------------
   6) SCROLL İLE BELİRME
   -------------------------------------------- */
function gozlemciyiBaslat() {
  const hedefler = document.querySelectorAll(
    '.bolum > .kart, .bolum > .bolum-baslik, .bolum > .bolum-alt, .foto, .dilek, .pasta, .son > *'
  );

  hedefler.forEach((el, i) => {
    el.classList.add('acilir');
    el.style.transitionDelay = (i % 6) * 70 + 'ms';
  });

  if (!('IntersectionObserver' in window)) {
    hedefler.forEach((el) => el.classList.add('icerde'));
    return;
  }

  const gozlemci = new IntersectionObserver(
    (girisler) => {
      girisler.forEach((giris) => {
        if (giris.isIntersecting) {
          giris.target.classList.add('icerde');
          gozlemci.unobserve(giris.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  hedefler.forEach((el) => gozlemci.observe(el));
}

/* --------------------------------------------
   7) İSME TIKLAYINCA KONFETİ (küçük sürpriz)
   -------------------------------------------- */
const isim = document.querySelector('.hero-baslik .isim');
if (isim) {
  isim.style.cursor = 'pointer';
  isim.addEventListener('click', () => {
    const k = isim.getBoundingClientRect();
    konfetiPatlat(90, k.left + k.width / 2, k.top + k.height / 2);
  });
}
