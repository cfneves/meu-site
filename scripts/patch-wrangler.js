#!/usr/bin/env node
// Workaround for @astrojs/cloudflare + wrangler 4.81+ incompatibility.
//
// The adapter generates dist/server/wrangler.json by merging the root
// wrangler.jsonc (which has pages_build_output_dir) with Worker-specific
// fields (main, rules). Wrangler 4.81 rejects configs that mix both.
// It also rejects "ASSETS" as an explicit binding name in Pages projects.
//
// Fix: strip the Pages-incompatible fields from the server wrangler.json.
// The pages_build_output_dir stays in the ROOT wrangler.jsonc only.
// The ASSETS binding is auto-provided by Pages at runtime — no declaration needed.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const paths = [
  "dist/server/wrangler.json",
  "dist/server/.prerender/wrangler.json",
];

// Fields that belong only in a Pages config, not in a Worker config
const pagesOnlyFields = [
  "pages_build_output_dir",
  "configPath",
  "userConfigPath",
  "topLevelName",
  "definedEnvironments",
  "legacy_env",
  "jsx_factory",
  "jsx_fragment",
  "rules",
  "python_modules",
  "dev",
];

for (const p of paths) {
  if (!existsSync(p)) continue;
  const config = JSON.parse(readFileSync(p, "utf8"));
  let changed = false;

  // Remove reserved ASSETS binding
  if (config.assets?.binding === "ASSETS") {
    delete config.assets;
    changed = true;
    console.log(`  removed reserved ASSETS binding`);
  }

  // Remove Pages-only fields that conflict with Worker config
  for (const field of pagesOnlyFields) {
    if (field in config) {
      delete config[field];
      changed = true;
    }
  }

  if (changed) {
    writeFileSync(p, JSON.stringify(config, null, 2));
    console.log(`Patched ${p}`);
  }
}
