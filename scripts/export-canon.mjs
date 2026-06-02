#!/usr/bin/env tsx
/**
 * export-canon.mjs — 可重現的資料集匯出腳本
 *
 * 從 lius.cc 來源（dingren-daoxue 專案的 src/app/llm/canon/data.ts）匯出
 * SCRIPTURES → JSONL（每部一筆 + 每章一筆）。
 *
 * 用法（在 dingren-daoxue 專案根目錄）：
 *   cp scripts/export-canon.mjs <dingren-daoxue>/_export.mjs
 *   cd <dingren-daoxue> && ./node_modules/.bin/tsx _export.mjs
 *
 * 環境變數：
 *   OUT_DIR  輸出資料夾（預設 ./data）
 *   VERSION  版本號（預設 v0.1）
 */
import { SCRIPTURES, CATEGORY_META } from "./src/app/llm/canon/data.ts";
import { writeFileSync } from "fs";

const OUT = process.env.OUT_DIR || "./data";
const VERSION = process.env.VERSION || "v0.1";
const SOURCE = "https://lius.cc/llm/canon";
const lic = {
  original: "Public Domain (通行公眾領域底本)",
  vernacular: "CC0-1.0", preface: "CC0-1.0", note: "CC0-1.0",
};

let perScript = [], perChapter = [], nCh = 0;
const catCount = {};
for (const s of SCRIPTURES) {
  const chs = (s.chapters || []).map((c) => ({
    num: c.num, title: c.title || null,
    original: c.original || "", vernacular: c.vernacular || "", note: c.note || null,
  }));
  nCh += chs.length;
  catCount[s.category] = (catCount[s.category] || 0) + 1;
  perScript.push(JSON.stringify({
    scripture_id: s.id, title: s.title, short_title: s.short_title || s.title,
    category: s.category, category_label: CATEGORY_META[s.category]?.label || s.category,
    period: s.period || null, version: s.version || null,
    daozang: s.daozang || null, collation_status: s.collation_status || null,
    preface: s.preface || null, scholars: s.scholars || [],
    n_chapters: chs.length, chapters: chs,
    source_url: `${SOURCE}/${s.id}`, dataset_version: VERSION, license: lic,
  }));
  for (const c of chs) {
    perChapter.push(JSON.stringify({
      scripture_id: s.id, scripture_title: s.title, category: s.category,
      chapter_num: c.num, chapter_title: c.title,
      original: c.original, vernacular: c.vernacular, note: c.note,
      source_url: `${SOURCE}/${s.id}`, dataset_version: VERSION, license: lic,
    }));
  }
}
writeFileSync(`${OUT}/canon-${VERSION}.jsonl`, perScript.join("\n") + "\n");
writeFileSync(`${OUT}/canon-chapters-${VERSION}.jsonl`, perChapter.join("\n") + "\n");
const stats = {
  dataset_version: VERSION, source: SOURCE, generated_from: "lius.cc data.ts",
  n_scriptures: SCRIPTURES.length, n_chapters: nCh,
  by_category: Object.fromEntries(
    Object.entries(catCount).map(([k, v]) => [`${k} (${CATEGORY_META[k]?.label || k})`, v])),
};
writeFileSync(`${OUT}/STATS.json`, JSON.stringify(stats, null, 2));
console.log(JSON.stringify(stats, null, 2));
