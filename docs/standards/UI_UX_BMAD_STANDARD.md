# BMAD Standard — UI/UX Standard

Status: **ACTIVE STANDARD**

Dokumen ini menjadi pedoman UI/UX untuk semua halaman public, profile, Admin Desa, Internal Admin, modal, form, table/list, dashboard-lite, dan mobile.

## Tujuan
UI rapi, cepat dipahami, mobile-friendly, ringan, dan nyaman untuk user non-teknis.

## Prinsip UX Inti
1. Jelas
2. Ringkas
3. Mobile-first
4. Tidak membingungkan
5. Cepat terasa
6. Konsisten
7. Accessible
8. Trustworthy

## Design Direction
**Quiet luxury**:
- bersih, subtle, spacing efisien
- border/shadow tipis
- tipografi jelas
- minim visual berlebihan

## Mobile-First Rules
Target minimal: **iPhone 12 mini / 360px**
- tidak ada overflow horizontal tidak sengaja
- tombol mudah ditekan
- summary compact
- modal harus scrollable
- elemen penting tidak keluar layar

## Information Density
- hindari summary ganda/redundan
- gunakan chip/metric seperlunya
- gunakan progressive disclosure untuk detail

## Copywriting
- bahasa Indonesia sederhana
- hindari enum mentah
- error/rejection harus memberi langkah perbaikan
- gunakan kata kerja jelas (Setujui, Tolak, Unggah, Lihat detail)

## Badge/Status
- konsisten tone warna (success/warning/danger/info)
- hindari badge terlalu panjang
- gunakan `whitespace-nowrap` untuk mobile jika perlu

## Loading/Empty/Error
- gunakan skeleton untuk halaman query data
- jangan tampilkan data palsu
- empty state harus jujur dan jelas
- error state harus actionable

## Accessibility
- label tombol/input jelas
- icon-only button wajib `aria-label`
- focus ring tidak dihilangkan
- contrast cukup
- jangan hanya mengandalkan warna untuk status

## Completion Checklist
- mobile 360px aman
- tidak ada wrap aneh di badge/action penting
- tidak ada card terlalu panjang tanpa alasan
- loading/empty/error jelas
- copy sederhana dan ringkas
- screenshot QA relevan (bukan saat shimmer/login yang salah)
