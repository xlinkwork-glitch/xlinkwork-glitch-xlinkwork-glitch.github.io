#!/usr/bin/env node
/**
 * 将 Jekyll _posts/ 中的英文文章发布到 Dev.to
 * 用法：node publish-devto.js <path-to-md-file>
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.DEVTO_API_KEY;
const BLOG_BASE = process.env.BLOG_URL || 'https://xlinkwork-glitch.github.io';

if (!API_KEY) {
  console.error('Missing DEVTO_API_KEY');
  process.exit(1);
}

const filePath = process.argv[2];
if (!filePath || !fs.existsSync(filePath)) {
  console.error('File not found:', filePath);
  process.exit(1);
}

const raw = fs.readFileSync(filePath, 'utf8');

// 解析 Jekyll front matter
const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!fmMatch) {
  console.log('No front matter, skipping:', filePath);
  process.exit(0);
}

const fmRaw = fmMatch[1];
const body = fmMatch[2].trim();

function getFmValue(key) {
  const m = fmRaw.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, 'm'));
  return m ? m[1].trim() : '';
}

const lang = getFmValue('lang');
const title = getFmValue('title');
const description = getFmValue('description') || getFmValue('excerpt');

// 只发英文文章到 Dev.to
if (lang !== 'en') {
  console.log(`Skipping non-English post (lang: ${lang}):`, filePath);
  process.exit(0);
}

// 从文件名生成 canonical URL
// 格式: 2026-06-20-en-some-slug.md → /2026/06/20/en-some-slug/
const filename = path.basename(filePath, '.md');
const dateMatch = filename.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
const canonicalUrl = dateMatch
  ? `${BLOG_BASE}/${dateMatch[1]}/${dateMatch[2]}/${dateMatch[3]}/${dateMatch[4]}/`
  : `${BLOG_BASE}/`;

// 解析 tags（取前 4 个，Dev.to 限制）
const tagsMatch = fmRaw.match(/^tags:\s*\[([^\]]+)\]/m);
const tags = tagsMatch
  ? tagsMatch[1].split(',').map(t => t.trim().replace(/^["']|["']$/g, '').toLowerCase().replace(/\s+/g, '')).slice(0, 4)
  : ['remotework', 'productivity'];

// 去掉正文中的本地图片引用（Dev.to 无法解析）
const cleanBody = body
  .replace(/!\[.*?\]\(\/assets\/images\/.*?\)/g, '')
  .replace(/\n{3,}/g, '\n\n')
  .trim();

const article = {
  title,
  body_markdown: cleanBody,
  published: true,
  tags,
  description: description.slice(0, 160),
  canonical_url: canonicalUrl,
};

const payload = JSON.stringify({ article });

const options = {
  hostname: 'dev.to',
  path: '/api/articles',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'api-key': API_KEY,
    'Content-Length': Buffer.byteLength(payload),
  },
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 201) {
      const result = JSON.parse(data);
      console.log(`✅ Published: ${result.url}`);
    } else {
      console.error(`❌ Failed (${res.statusCode}):`, data);
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
  process.exit(1);
});

req.write(payload);
req.end();
