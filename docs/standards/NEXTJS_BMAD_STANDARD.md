# BMAD Standard — Next.js Engineering Standard

Status: **ACTIVE STANDARD**

Dokumen ini menjadi pedoman engineering untuk fitur baru, refactor, bugfix besar, dan pekerjaan performa.

## Tujuan Utama
1. Kode rapi dan konsisten.
2. File kecil dengan tanggung jawab jelas.
3. Business logic tidak tercecer di UI.
4. Query cepat dan bisa diaudit.
5. Data sensitif aman.
6. UI punya loading/skeleton yang jelas.
7. Fitur baru mudah dikembangkan tanpa merusak core flow.

## Prinsip Wajib
- SOLID, DRY, KISS, YAGNI
- Type-safe (hindari `any`)
- Security-first
- Performance-aware
- Mobile-first
- Observable
- Testable

## Struktur Rekomendasi
Gunakan struktur `src/` dengan pemisahan:
- `app/` untuk routing/layout/loading
- `features/` untuk domain fitur
- `server/repositories/` untuk query DB
- `server/services/` untuk business orchestration
- `server/policies/` untuk permission
- `validators/`, `mappers/`, `copy/`, `constants/`

## Rules Penting
- `page.tsx`: komposisi + auth check + panggil service, bukan business logic panjang.
- Hard limit file 500 baris (warning 300, ideal 80–250).
- Semua external input wajib divalidasi (disarankan Zod).
- Query DB tidak ditaruh di komponen UI.
- API response harus konsisten (`success/data` atau `success:false/code/message`).
- Sensitive action wajib audit trail.
- Hindari log data sensitif (email/token/payload privat).

## Performance Baseline
- Shell/shimmer < 1 detik.
- Query sederhana 100–500ms.
- Query > 1 detik harus diinvestigasi.
- Query > 2 detik dianggap blocker.

## Testing Baseline
Minimal per fitur:
- lint
- typecheck
- build
- unit test untuk policy/mapper/validator
- integration test service jika memungkinkan

## Completion Checklist
Sebelum task ditandai selesai, pastikan:
- Tidak ada file > 500 baris
- Tidak ada `any` baru
- Validation schema tersedia
- Boundary repository/service/policy jelas
- Loading/empty/error state tersedia
- Tidak ada data sensitif di log
- Build/test checks lulus
