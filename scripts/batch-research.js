#!/usr/bin/env node
/**
 * THE DUPE EDIT — Batch Research Tool
 * 
 * Researches multiple products and generates a report
 * 
 * Usage: node scripts/batch-research.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Products to research (add more as needed)
const PRODUCTS_TO_RESEARCH = [
  // Fragrances
  "Baccarat Rouge 540",
  "Creed Aventus",
  "Tom Ford Lost Cherry",
  "Le Labo Santal 33",
  "Byredo Gypsy Water",
  "Maison Margiela Replica",
  "Chanel No 5",
  "Dior Sauvage",
  "YSL Libre",
  "Marc Jacobs Daisy",
  
  // Skincare
  "La Mer Creme",
  "Drunk Elephant Protini",
  "SkinCeuticals CE Ferulic",
  "Sunday Riley Good Genes",
  "Tatcha Dewy Skin Cream",
  "Augustinus Bader Rich Cream",
  "Paula's Choice BHA",
  "Estee Lauder Advanced Night Repair",
  "SK-II Essence",
  "Biologique Recherche P50",
  
  // Makeup
  "Charlotte Tilbury Pillow Talk",
  "MAC Ruby Woo",
  "NARS Orgasm Blush",
  "Too Faced Better Than Sex Mascara",
  "Urban Decay Naked Palette",
  "Fenty Beauty Gloss Bomb",
  "Pat McGrath MatteTrance",
  "Hourglass Ambient Lighting",
  "Rare Beauty Soft Pinch Blush",
  "Merit Flush Balm"
];

async function main() {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║        THE DUPE EDIT — Batch Research Tool                 ║
╠════════════════════════════════════════════════════════════╣
║  Researching ${PRODUCTS_TO_RESEARCH.length} products from multiple sources...          ║
╚════════════════════════════════════════════════════════════╝
`);

  const results = [];
  
  for (let i = 0; i < PRODUCTS_TO_RESEARCH.length; i++) {
    const product = PRODUCTS_TO_RESEARCH[i];
    console.log(`\n[${i + 1}/${PRODUCTS_TO_RESEARCH.length}] Researching: ${product}`);
    
    try {
      execSync(`node scripts/gather-data.js "${product}"`, {
        cwd: process.cwd(),
        stdio: 'inherit'
      });
      results.push({ product, status: 'success' });
    } catch (e) {
      results.push({ product, status: 'failed', error: e.message });
    }
    
    // Rate limiting between products
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n' + '═'.repeat(60));
  console.log('\n📊 BATCH RESEARCH COMPLETE\n');
  console.log(`Successful: ${results.filter(r => r.status === 'success').length}`);
  console.log(`Failed: ${results.filter(r => r.status === 'failed').length}`);
  console.log('\nResearch files saved in ./scripts/');
  console.log('\n✅ Review the JSON files and curate entries for data/dupes.js\n');
}

main();
