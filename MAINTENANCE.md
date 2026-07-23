# Xinrong 网站运维指南

本文档覆盖网站上线后的日常维护操作，按场景分类。

---

## 1. 域名配置

### 推荐域名方案

| 域名 | 用途 | 优先级 |
|------|------|--------|
| **xinrongtools.com** | 主站域名 | ★★★ |
| **xinrong-tools.com** | 备选（如主域已被注册） | ★★ |
| xinrongpowertools.com | 可考虑 | ★ |

### 购买步骤

1. 在 [Namecheap](https://namecheap.com)、[Cloudflare Registrar](https://cloudflare.com/products/registrar/) 或 [GoDaddy](https://godaddy.com) 搜索并购买
2. 如果在 Cloudflare Pages 部署，建议直接在 Cloudflare 购买域名，DNS 自动配置
3. 费用约 \$10-15/年

### 域名绑定到 Cloudflare Pages

1. Cloudflare Dashboard → Pages → 你的项目 → Custom domains
2. 添加 `xinrongtools.com`
3. Cloudflare 会自动配置 DNS 和 SSL 证书

---

## 2. 询盘通知与处理

### 当前状态

询盘数据已写入 Supabase 数据库 ✅  
邮件通知 Edge Function 已部署，但需要配置邮件发送服务方可激活 ⚠️

### 方案 A：配置 Resend 邮件通知（推荐，5 分钟完成）

**Resend** 是开发者友好的邮件发送服务，免费额度 100 封/天（足够外贸询盘使用）。

**操作步骤：**

1. 访问 [resend.com](https://resend.com)，用 Google 账号注册
2. 在 Dashboard → API Keys 创建一个 API Key
3. 添加你的域名 `xinrongtools.com` 到 Resend（按引导验证 DNS）
4. 把 API Key 告诉我，我帮你配置到 Supabase Edge Function 中
5. 配置完成后，每当有客户提交询盘，你会立刻收到邮件到 `mike@xinrongtools.com`

### 方案 B：Supabase 数据库直接查看（已可用）

访问 `https://your-domain.com/dashboard.html`
- 密码：`xinrong2024`（上线后建议修改）
- 能看到所有询盘列表，支持导出/复制

### 方案 C：手机实时通知

可以在 Edge Function 中接入：
- **Telegram Bot**：询盘提交后自动推送到你的 Telegram
- **钉钉机器人**：推送到钉钉群
- **企业微信**：推送到企业微信

需要哪个告诉我，我帮你配置。

---

## 3. 产品更新

网站是纯静态 HTML，更新产品信息有两种方式：

### 日常方式：告诉我改什么

告诉我你要改的产品信息（名称、描述、图片、价格），我直接帮你更新 HTML 文件。比如：
- "把 Circular Saw 的图片换成新拍的这张"
- "新增一款 40V 电锤，描述是..."
- "激光水平仪系列降价了，更新价格"

### 国际站自动同步

目前国际站（xinrongtool.en.alibaba.com）的产品已经同步到网站。如果你在国际站新增/修改了产品，告诉我一声，我重新抓取并更新网站数据。

### 添加新产品

发送给我：
1. 产品名称
2. 简短描述（1-2 句）
3. 产品图片（或图片链接）
4. 主要规格（电压、功率、转速等）

我会更新 `products.html` 和首页相关内容。

---

## 4. 空白内容填充

网站目前有几处占位内容需要替换：

### 工厂图片（3 张）

需要 3 张真实工厂照片，尺寸建议 800×480px：
| 位置 | 建议内容 |
|------|----------|
| 首页工厂展示 1 | 生产车间全景 |
| 首页工厂展示 2 | 质检实验室 |
| 首页工厂展示 3 | 仓库/物流区 |
| 关于我们页 3 张 | R&D 中心、质检、仓库 |

**操作**：把图片发给我，我替换掉占位 SVG。

### 产品图片

当前已从国际站同步了产品图片。如果你想用更高清的图片，发给我替换。

### Google Maps

在 contact.html 中，地图目前是占位。替换方式：
1. 在 Google Maps 搜索 "Weifang, Shandong, China"
2. 点击"分享" → "嵌入地图"
3. 复制 `<iframe>` 代码发给我
4. 我替换到 contact.html 中

### Logo

目前导航栏是纯文字 "XINRONG"，如果你有品牌 Logo 图（建议 PNG/SVG，高度 40-50px），发给我替换。

### WhatsApp 号码

在 contact.html 和 footer 中 WhatsApp 是占位。告诉我你的 WhatsApp 号码，我更新到所有页面。

---

## 5. 日常维护清单

| 频率 | 操作 | 方式 |
|------|------|------|
| 每天 | 查看询盘 | 打开 dashboard.html 或查收邮件 |
| 每周 | 跟进高潜询盘 | Dashboard 筛选本周新询盘 |
| 每月 | 检查网站是否正常 | 访问首页，测试提交一个询盘 |
| 有新模具/新品时 | 更新产品页 | 告诉我，我添加 |
| 有新认证时 | 更新认证区域 | 发我认证图标/名称 |
| 参展/重大事件 | 更新新闻/动态 | 可新增 News 页面 |

---

## 6. 安全建议

1. **修改 Dashboard 密码**
   编辑 `dashboard.html`，找到 `DASH_PASSWORD = 'xinrong2024'`，换成你的密码

2. **HTTPS 自动配置**
   Cloudflare Pages 默认启用 HTTPS，无需额外配置

3. **定期备份**
   GitHub 自动保存所有历史版本，随时可回滚

4. **监控网站状态**
   Cloudflare Pages 自带可用性监控，出问题会邮件通知

---

## 7. 获取帮助

需要任何修改，直接告诉我：
- "更新产品..." → 我更新产品页
- "修改首页..." → 我改首页
- "添加/删除功能..." → 我改代码
- "网站打不开了" → 我排查问题

所有改动通过 Git 提交，历史可追溯、可回滚。
