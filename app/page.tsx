"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { categories, icons } from "gcp-icons";

const GCP_ICONS_VERSION = process.env.NEXT_PUBLIC_GCP_ICONS_VERSION ?? "1.0.4";
const CDN_BASE = `https://unpkg.com/gcp-icons@${GCP_ICONS_VERSION}/dist`;

const ACRONYMS = new Set([
  "ai",
  "ml",
  "api",
  "sql",
  "cdn",
  "dns",
  "gpu",
  "iam",
  "ip",
  "k8s",
  "vpc",
  "ssl",
  "tls",
  "http",
  "https",
  "ssh",
  "dnssec",
]);

function toTitleWord(word: string) {
  if (!word) return word;
  if (ACRONYMS.has(word)) return word.toUpperCase();
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}

function humanizeIconKey(iconKey: string) {
  let base = iconKey;

  // Common gcp-icons suffixes (keep this intentionally conservative).
  base = base.replace(/-\d+-color-rgb$/i, "");
  base = base.replace(/-\d+-color$/i, "");
  base = base.replace(/-\d+-mono$/i, "");
  base = base.replace(/-\d+$/i, "");

  return base
    .split("-")
    .map((w) => toTitleWord(w.toLowerCase()))
    .join(" ");
}

function stableCategoryList() {
  return Object.entries(categories)
    .map(([key, value]) => ({ key, ...value }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default function HomePage() {
  const categoryList = useMemo(() => stableCategoryList(), []);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  const toggleCategory = (key: string) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const visibleCategories =
    selectedKeys.size === 0 ? categoryList : categoryList.filter((c) => selectedKeys.has(c.key));

  return (
    <>
      <header className="topbar">
        <div className="topbarInner">
          <div>
            <div className="title">GCP Icons Showcase</div>
            <div className="subtitle">
              Powered by{" "}
              <a href="https://www.npmjs.com/package/gcp-icons" target="_blank" rel="noreferrer">
                gcp-icons
              </a>
              {" · "}
              {categoryList.length} categories
              {" · "}
              {selectedKeys.size > 0 ? (
                <button
                  type="button"
                  className="clearFilter"
                  onClick={() => setSelectedKeys(new Set())}
                >
                  Show all
                </button>
              ) : (
                <span className="clearFilterPlaceholder" aria-hidden="true">
                  Show all
                </span>
              )}
            </div>
          </div>
          <nav className="nav" aria-label="Filter by category">
            {categoryList.map((c) => (
              <button
                key={c.key}
                type="button"
                className={"navPill" + (selectedKeys.has(c.key) ? " navPillSelected" : "")}
                onClick={() => toggleCategory(c.key)}
                aria-pressed={selectedKeys.has(c.key)}
              >
                {c.name}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container">
        {visibleCategories.map((category) => {
          const iconKeys = Array.from(
            new Set([...(category.iconKeys ?? []), ...(category.productKeys ?? [])])
          );

          const items = iconKeys
            .map((iconKey) => ({
              iconKey,
              label: humanizeIconKey(iconKey),
              relPath: icons[iconKey],
            }))
            .filter((x) => typeof x.relPath === "string" && x.relPath.length > 0)
            .sort((a, b) => a.label.localeCompare(b.label));

          return (
            <section key={category.key} id={category.key} className="section">
              <div className="sectionHeader">
                <h2 className="sectionTitle">{category.name}</h2>
                <div className="sectionMeta">{items.length} icons</div>
              </div>

              <div className="grid">
                {items.map((item) => {
                  const url = `${CDN_BASE}/${item.relPath}`;
                  return (
                    <a
                      key={item.iconKey}
                      className="card"
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      title={item.iconKey}
                    >
                      <Image className="icon" src={url} alt={item.label} width={44} height={44} />
                      <div className="label">{item.label}</div>
                    </a>
                  );
                })}
              </div>
            </section>
          );
        })}

        <footer className="footer">
          Built for Vercel. Icons are loaded from the{" "}
          <a href="https://www.npmjs.com/package/gcp-icons" target="_blank" rel="noreferrer">
            gcp-icons
          </a>{" "}
          package via{" "}
          <a href="https://unpkg.com" target="_blank" rel="noreferrer">
            unpkg
          </a>{" "}
          CDN; the showcase does not host the SVG files.
        </footer>
      </main>
    </>
  );
}

