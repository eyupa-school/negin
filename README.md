# 🎂 İyi ki Doğdun Negin

26. yaş gününe özel hazırlanmış, tek sayfalık bir kutlama sitesi.
Saf HTML + CSS + JavaScript — hiçbir kütüphane, hiçbir build adımı yok.

## İçerik

- **Açılış perdesi** — hediye kutusuna tıklanınca konfetiyle açılır
- **Hero** — isim, yaş rozeti (isme tıklayınca konfeti patlar)
- **Yaşam sayacı** — doğduğu andan bu yana geçen gün/saat/dakika/saniye
- **Mektup** — kişisel not
- **Galeri** — üç fotoğraf, üstüne gelince açılan yazılar
- **Dilek kartları** — tıklanınca/üstüne gelinince dönen 6 kart
- **Pasta** — tıklayınca mumlar söner, konfeti patlar
- **Kapanış**

## Dosyalar

```
.
├── index.html      # sayfa yapısı ve tüm metinler
├── style.css       # tasarım, animasyonlar, responsive
├── script.js       # konfeti, sayaç, pasta, scroll animasyonları
└── images/
    ├── foto-1.jpg  # mezuniyet
    ├── foto-2.jpg  # doğum günü şapkası
    └── foto-3.jpg  # yılbaşı
```

## Yerelde çalıştırma

`index.html` dosyasına çift tıklaman yeterli. Sunucu gerekmiyor.

## GitHub Pages ile yayına alma

```bash
git init
git add .
git commit -m "Negin'in doğum günü sitesi"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/REPO_ADI.git
git push -u origin main
```

Ardından repo sayfasında **Settings → Pages → Source: Deploy from a branch → main / (root)**
seçip kaydet. Birkaç dakika içinde şu adreste yayında olur:

```
https://KULLANICI_ADIN.github.io/REPO_ADI/
```

## Düzenlemek istersen

- **Metinler:** hepsi `index.html` içinde, açık Türkçe.
- **Doğum tarihi:** `script.js` en üstteki `DOGUM_TARIHI` satırı.
- **Renkler:** `style.css` en üstteki `:root` bloğu.
