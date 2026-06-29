# 通宝VPN 博客 — CLAUDE.md

Jekyll 静态博客，托管于 GitHub Pages（`xlinkwork-glitch.github.io`），为通宝VPN 产品提供多语言内容营销。

---

## 一、Git 身份（最高红线）

**每次提交前必须验证 repo 级别的 git 身份，绝不能用全局身份暴露个人信息。**

```bash
# 步骤 1：验证本地身份（必做，每次开新会话都要确认）
git config --local user.email
git config --local user.name

# 若未设置，执行：
git config --local user.email "xlinkwork-glitch@users.noreply.github.com"
git config --local user.name "xlinkwork-glitch"

# 步骤 2：验证 remote 使用正确的 SSH alias（必做）
git remote -v
# 正确输出应包含 github-xlinkwork，而不是 github.com：
# origin  git@github-xlinkwork:xlinkwork-glitch/... (fetch)
# origin  git@github-xlinkwork:xlinkwork-glitch/... (push)

# 若 remote 显示 github.com，立即修正（否则会走 Speedlinc 的默认 key）：
git remote set-url origin git@github-xlinkwork:xlinkwork-glitch/xlinkwork-glitch-xlinkwork-glitch.github.io.git

# 步骤 3：推送
git push origin main
```

全局 git config 含个人真实身份（Bamboo742 / Jim），**绝不能出现在此仓库的任何提交中**。

> ⚠️ **教训（2026-06）**：重建 GitHub 仓库后，GitHub 给出的初始化命令用的是 `git@github.com:...`，这会走 Speedlinc 的默认 SSH key 导致推送失败或身份泄露。每次重建仓库后必须手动把 remote 改为 `github-xlinkwork` alias 再推送。

---

## 二、架构定位（必读）

### 这是"引流线"站，不是"权重线"站

本站属于**引流线**：公开 VPN 博客，目标是让真人直接点击访问 tongbaovpn.com 完成转化。

| 项目 | 引流线（本站）| 权重线（不在此）|
|------|-------------|--------------|
| 内容 | 公开 VPN / AI 加速 / 办公专线话题 | 完全不碰 VPN 的中立工具内容 |
| 目标 | 真人直接点击下载 | 境内外收录 + DA |
| 流量来源 | Google 境外 + 社群 + 联盟 | 百度 / 必应 / Google 全量 |

**不要期待百度/必应中国/夸克收录**——VPN 内容在中文搜索引擎直接被过滤。  
**不要期待外链给 tongbaovpn.com 传 SEO 权重**——引流站的价值是直接转化，不是权重传递。

### 全隔离要求

- **不与任何其他 VPN 站互链**（包括 nasavpn、tonbovpn 主域、matosrf506-gif 站）
- 独立统计 ID（不共用 GA / 百度统计 / 任何追踪代码）
- 独立注册信息（GitHub 账号、邮箱全部独立）

### 跨站文章防重复（强制）

本站文章**禁止**与 nasavpn / tonbovpn 任何现有文章相同或高度相似：
- 选题角度必须不同（换话题、换人群、换场景）
- 即使同一关键词，行文结构和案例也必须完全重写
- 可以完全重写已有文章，但产出必须与其他站的版本判然有别

---

## 三、产品定位

**通宝VPN** — 跨境办公专线加速器

| 核心卖点 | 描述 |
|---------|------|
| **IEPL 专线** | 运营商级国际专用线路，延迟稳定 40–60ms，与公共流量物理隔离 |
| **AI 智能路由** | 自动识别 ChatGPT / Claude / Gemini 等 AI 工具，优先择优路由 |
| **独享纯净 IP** | 非共享数据中心 IP，适合跨境办公账号稳定接入 |
| **全平台** | Windows / macOS / iOS / Android 多设备同步 |

官网：`https://www.tongbaovpn.com/`

### 写文章时的产品描述规范

**✅ 正确描述（必须使用）**
- 跨境办公专线 / IEPL 专线加速
- AI 路由 / 智能路由
- 稳定访问 ChatGPT / Claude / Zoom / Google Workspace
- 独享纯净 IP（强调：稳定接入，不讲防关联）
- 跨境办公 / 商务出行 / 远程协作

**❌ 禁止描述（内容合规红线，换账号也不能写）**
- ~~翻墙 / 梯子 / 科学上网 / FQ~~
- ~~防风控 / 防封号 / 防关联 / 降低风控~~
- ~~突破封锁 / 绕过审查 / 让平台认不出你是 VPN~~
- ~~独享 IP 防账号关联~~（这条属于 nasavpn 方向，且本身是红线）

---

## 四、提交规范

```
feat     新文章、新功能
fix      修复 bug、修正内容
chore    配置变更
refactor 重构
docs     文档
perf     性能优化
```

示例：
```
feat: add zh post — IEPL office acceleration for Zoom
fix: update CTA links in sidebar to zh locale
chore: update navigation yaml
```

---

## 五、文章写作规范

### 5.1 文件命名

```
_posts/YYYY-MM-DD-{slug}.md              # 中文
_posts/YYYY-MM-DD-{lang}-{slug}.md      # 小语种
```

### 5.2 Front Matter 模板

```yaml
---
title: "文章标题"
date: YYYY-MM-DD HH:MM:SS +0800
categories: [分类]
tags: [标签1, 标签2, 标签3]
lang: zh
excerpt: "一句话摘要，100字以内"
description: "SEO描述，160字以内，含主关键词"
image: /assets/images/covers/chatgpt-office.svg
faq:
  - q: "问题1"
    a: "答案1"
speakable_selector:
  - ".post__title"
  - ".post__meta"
---
```

### 5.3 可用封面图

| 文件 | 适用话题 |
|------|---------|
| `chatgpt-office.svg` | ChatGPT 办公 / AI 工具接入 |
| `zoom-office.svg` | Zoom / Teams / 视频会议 |
| `dedicated-ip.svg` | 独享 IP / 账号接入稳定性 |
| `intro.svg` | 产品综合介绍 |

### 5.4 分类参考

| 适用场景 | 中文 | 英文 | 越南语 | 日语 | 韩语 |
|---------|------|------|-------|------|------|
| AI 工具 | AI 加速 | AI Tools | Công Cụ AI | AI活用 | AI 도구 |
| 视频会议 | 办公专线 | Office VPN | VPN Văn Phòng | オフィス回線 | 오피스 전용선 |
| 跨境业务 | 跨境办公 | Cross-Border | Làm Việc Quốc Tế | 越境ビジネス | 해외 업무 |
| 产品介绍 | 产品介绍 | Product | Giới Thiệu | 製品紹介 | 제품 소개 |

### 5.5 内容要求

- 字数：中文 1000–1800 字，小语种 700–1200 字
- 角度围绕**跨境办公 + AI 工具稳定接入**；娱乐/流媒体是 nasavpn 的主方向，本站少写
- 结构：办公痛点场景 → 根本原因分析 → 通宝VPN 解决方案 → 实操步骤/对比 → CTA
- 必须包含：FAQ（3–4 条，贴近真实办公场景）、blockquote CTA
- CTA 格式：
  ```
  > 🚀 **[立即试用通宝VPN](https://www.tongbaovpn.com/zh/)** — 办公专线 + AI 路由，稳定连上 ChatGPT / Zoom / Google Workspace
  ```

### 5.6 "干净文章"标准

文章定性为**工具使用教程**，不是"绕过审查"操作指南：

- ✅ 讲办公场景的网络稳定性问题和解决方案
- ✅ 讲 IEPL 专线的技术原理（延迟、带宽、与 CDN 的区别）
- ✅ 讲 AI 工具在工作流中的使用场景
- ❌ 不讲如何规避平台检测机制
- ❌ 不讲账号安全的防关联技巧
- ❌ 不用任何暗示"欺骗平台"的表述

---

## 六、多语言结构

| 语言 | 目录 | lang 值 |
|------|------|--------|
| 中文（默认） | `/` | zh |
| 英文 | `/en/` | en |
| 越南语 | `/vi/` | vi |
| 日语 | `/ja/` | ja |
| 韩语 | `/ko/` | ko |
| 土耳其语 | `/tr/` | tr |

---

## 七、项目结构

```
xlinkwork-glitch.github.io/
├── _layouts/
│   ├── default.html     # head / header（含语言切换）/ footer
│   ├── home.html        # 首页：Hero SVG + 文章列表
│   ├── post.html        # 文章页：双栏 + 侧边栏 CTA（含产品介绍，6 语言）
│   └── page.html / category.html
├── _posts/              # 所有文章（中文 + 小语种）
├── _data/
│   └── navigation.yml   # 6 种语言导航菜单
├── assets/
│   ├── css/style.css    # 全站样式
│   ├── images/
│   │   ├── covers/      # 文章封面图
│   │   └── tongbaovpn-logo.png
│   └── js/lazy-load.js
├── en/ vi/ ja/ ko/ tr/  # 各语言子目录（index.html + category/）
├── about/
└── index.html           # 中文首页
```

---

## 八、SEO

- hreflang 已在 `default.html` 配置（6 种语言，domain: `xlinkwork-glitch.github.io`）
- Speakable schema（GEO 优化，供 AI 问答引擎引用）已在 `post.html` 配置
- **目标搜索引擎：仅 Google 境外流量**，不期待中文搜索引擎收录
- 关键词重点：`通宝VPN`、`ChatGPT 办公加速`、`IEPL 专线`、`跨境办公`、`Zoom 加速`
