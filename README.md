# Noita法术投票箱

一个基于社区投票的《Noita》法术排名系统。

现已初步拓展以支持法术投票与天赋投票双模式运行。

**前端技术栈**: React, TypeScript, Tailwind CSS

**后端项目**: [SlpAus/noita-spells-tier-backend](https://github.com/SlpAus/noita-spells-tier-backend)

## 快速开始

### 依赖环境

* **Node.js** (版本 16+)
* **npm** (通常随 Node.js 一起安装)

---

### 运行应用

1. **安装依赖**:

```bash
npm install
```

2. **启动开发服务器**:

```bash
npm start
```

应用将在 `http://localhost:3000` 上运行。

---

### 配置

应用的核心配置位于 `.env.development` 和 `.env.production` 两个文件中。

* **`REACT_APP_SPELL_BACKEND_URL`**: 法术后端服务的地址。默认为 `http://localhost:8080`。

* **`REACT_APP_PERK_BACKEND_URL`**: 天赋后端服务的地址。默认为 `http://localhost:8081`。

* **`REACT_APP_FRONTEND_URL`**: 前端服务的地址。默认为 `http://localhost:3000`。

在连接到不同的后端环境时，请相应地更新环境变量文件。