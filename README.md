# 道教經典白話翻譯集 · Daoist Canon Vernacular Translation Dataset (v0.1)

**1,275 部道教經典 · 17,081 章 · 原文 + 白話 + 學者註 三欄對照**

A CC0 dataset of 1,275 Daoist scriptures, each presented in three parallel columns:
**original text (classical Chinese)** + **modern vernacular translation** + **scholarly annotation**.

- 線上瀏覽 / Browse online: <https://lius.cc/canon>
- 釋出單位 / Publisher: 劉厝派鼎新門 · 鼎稔道學館 (Dingren Daoxue Academy, Liu-Cuo Pai)
- 版本 / Version: v0.1 (pre-peer-review, preprint-style)
- 釋出日 / Released: 2026-06-02

> ⚠️ **引用資格 / Citation status**: v0.1 為公開先發版（preprint-style）。可作 preprint 引用；
> 正式學術引用仍須待後續同儕審查。白話翻譯與學者註為本館原創內容，可作「方法重現」與研究參考。

---

## 資料內容 / Contents

| 類別 Category | 部數 |
|---|---|
| 基礎經典 foundational | 845 |
| 科儀 / 寶懺 ritual | 189 |
| 內丹 / 修煉 alchemy | 131 |
| 救度 / 度亡 salvation | 48 |
| 勸善 / 倫理 moral | 32 |
| 神祇主經 deity | 30 |
| **合計 Total** | **1,275** |

共 **17,081 章**。

## 檔案 / Files

| File | 說明 |
|---|---|
| `data/canon-v0.1.jsonl.gz` | 每部一筆（1,275 行）。含 preface、scholars、chapters[]（原文/白話/學者註）、daozang 底本、category。 |
| `data/canon-chapters-v0.1.jsonl.gz` | 每章一筆（17,081 行），扁平化，RAG-ready。 |
| `data/STATS.json` | 統計摘要。 |
| `scripts/export-canon.mjs` | 可重現的匯出腳本（從 lius.cc 來源資料產生本資料集）。 |

解壓 / Decompress:
```bash
gunzip -k data/canon-v0.1.jsonl.gz
```

## 資料結構 / Schema

每部 (`canon-v0.1.jsonl`):
```jsonc
{
  "scripture_id": "badu-xuehu-baochan",
  "title": "太一救苦天尊說拔度血湖寶懺",
  "short_title": "...",
  "category": "ritual",
  "category_label": "科儀 / 寶懺",
  "daozang": { "dz": null, "fascicle": "...", "confidence": "medium" },  // 底本卷次（如有）
  "preface": "導讀……",
  "scholars": ["Teiser", "Schipper", "..."],
  "n_chapters": 8,
  "chapters": [
    { "num": 1, "title": "青華說法、慈悲緣起",
      "original": "原文……", "vernacular": "白話……", "note": "學者註……" }
  ],
  "source_url": "https://lius.cc/llm/canon/badu-xuehu-baochan",
  "dataset_version": "v0.1",
  "license": { "original": "Public Domain", "vernacular": "CC0-1.0", "preface": "CC0-1.0", "note": "CC0-1.0" }
}
```

## 授權 / License

- **原文 (`original`)**：採通行公眾領域底本（《道藏》《雲笈七籤》《王弼本》等），屬 **Public Domain**。
- **白話翻譯 (`vernacular`)、導讀 (`preface`)、學者註 (`note`)**：由鼎稔道學館原創編譯，以 **[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)** 釋出（放入公眾領域，無條件可用、無需註明出處）。

學者註為本館原創之「摘述並引用」二手學術文獻的註解（標明 Teiser、Schipper、Robinet、Lagerwey、康豹、卿希泰等學者觀點），其表述為本館原創，不含第三方著作之逐字重製。如需查證原始論點，請逕查所引原著。

雖採 CC0 無需署名，仍歡迎引用以利學術追蹤。

## 引用 / Citation

**APA**
> Liu, C.-Y. (2026). *道教經典白話翻譯集 / Daoist Canon Vernacular Translation Dataset* (v0.1) [Dataset]. Zenodo. https://doi.org/[pending]

**BibTeX**
```bibtex
@dataset{liu_daoist_canon_2026,
  author    = {Liu, Chi-Ying},
  title      = {道教經典白話翻譯集 / Daoist Canon Vernacular Translation Dataset},
  year       = {2026},
  version    = {v0.1},
  publisher  = {Zenodo},
  doi        = {[pending]},
  url        = {https://lius.cc/canon}
}
```

## 相關釋出 / Related releases

- **Daoism-Qwen3.5-9B**（全球首個開源道教 LLM）— Zenodo DOI [10.5281/zenodo.20248697](https://doi.org/10.5281/zenodo.20248697)。本資料集為其知識來源語料之一。
- 官方 Cookbook：<https://lius.cc/llm/cookbook>

---

*釋出者非 AI 開發公司，而是一間道教教育機構（台灣正一道劉厝派鼎新門）。本資料集旨在把道教經典整理成人人可讀、可引用的形式，作為學界與民間共用的基礎材料。*
