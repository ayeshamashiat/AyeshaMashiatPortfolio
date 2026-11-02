// Usage: node scripts/import-goodreads.mjs path/to/goodreads_library_export.csv
// Goodreads: My Books -> Import and export -> Export Library. Writes data/books.json.
import { readFileSync, writeFileSync } from "node:fs";

const input = process.argv[2];
if (!input) {
  console.error("Usage: node scripts/import-goodreads.mjs <goodreads_library_export.csv>");
  process.exit(1);
}

// Minimal RFC-4180 CSV parser (quoted fields, escaped quotes, newlines in fields).
function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((f) => f !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const [header, ...rows] = parseCsv(readFileSync(input, "utf8").replace(/^﻿/, ""));
const col = (name) => header.indexOf(name);
const get = (r, name) => (r[col(name)] ?? "").trim();

const books = rows
  .map((r) => ({
    title: get(r, "Title").replace(/\s*\(.*?#\d+\)\s*$/, ""), // drop "(Series #3)"
    author: get(r, "Author"),
    rating: Number(get(r, "My Rating")) || 0,
    pages: Number(get(r, "Number of Pages")) || 0,
    status: get(r, "Exclusive Shelf"),
    dateRead: get(r, "Date Read").replaceAll("/", "-"),
  }))
  .filter((b) => b.title && (b.status === "read" || b.status === "currently-reading"))
  .sort((a, b) => (a.status === "currently-reading" ? -1 : b.status === "currently-reading" ? 1 : b.dateRead.localeCompare(a.dateRead)));

writeFileSync(new URL("../data/books.json", import.meta.url), JSON.stringify(books, null, 2) + "\n");
console.log(`Wrote ${books.length} books to data/books.json`);
