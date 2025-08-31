

# 🏙️ Urban Explorer

一个基于 AI 的城市漫游任务生成器后端服务。厌倦了千篇一律的旅游攻略？Urban Explorer 利用 Google Gemini 的强大能力，为任意城市或地点动态生成独特、有趣且富有创意的探索任务，帮助你像玩游戏一样重新发现身边的世界。

## ✨ 核心功能

  - **动态任务生成**: 输入任意地点，即可获得一份独一无二的探索任务列表。
  - **创意任务类型**: 任务涵盖观察、互动、创作、美食、感受等多个维度，告别无聊的观光打卡。
  - **结构化JSON输出**: API返回格式稳定、清晰的JSON数据，极易与前端应用集成。
  - **安全的密钥管理**: API密钥通过环境变量进行管理，不会暴露在代码中。
  - **交互式API文档**: 基于FastAPI，自动生成Swagger UI和ReDoc文档，方便调试和测试。

## 🏛️ 项目架构

本项目采用基于FastAPI的无服务器（Serverless-ready）架构，数据流如下：

`用户前端 -> Urban Explorer (FastAPI) -> Google Gemini API -> Urban Explorer -> 用户前端`

1.  前端向本API服务发起一个带有地点的 `POST` 请求。
2.  FastAPI后端接收请求，并使用安全存储的API密钥构造一个精心设计的Prompt。
3.  后端调用 Google Gemini API。
4.  Gemini返回生成的任务列表（文本格式）。
5.  后端对返回结果进行清洗、验证，并以结构化的JSON格式返回给前端。

## 🛠️ 技术栈

  - **框架 (Framework):** FastAPI
  - **服务器 (ASGI Server):** Uvicorn
  - **AI模型 (AI Model):** Google Gemini (`gemini-1.5-flash-latest`)
  - **数据验证 (Data Validation):** Pydantic
  - **环境管理 (Environment):** python-dotenv

## 🚀 快速开始

请按照以下步骤在本地运行本项目。

### 1\. 先决条件

  - Python 3.9 或更高版本
  - 一个 [Google AI Studio](https://aistudio.google.com/app) 的 API 密钥

### 2\. 安装步骤

**a. 克隆仓库**

```bash
git clone https://github.com/your-username/urban-explorer.git
cd urban-explorer
```

**b. 创建并激活Python虚拟环境**

  - **macOS / Linux:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```
  - **Windows:**
    ```bash
    python -m venv venv
    .\venv\Scripts\activate
    ```

**c. 安装项目依赖**

```bash
pip install -r requirements.txt
```

**d. 配置环境变量**

在项目根目录下创建一个名为 `.env` 的文件，并复制以下内容。请将 `YOUR_API_KEY_HERE` 替换为你自己的Gemini API密钥。

```ini
# .env
GEMINI_API_KEY="YOUR_API_KEY_HERE"
```

### 3\. 运行开发服务器

一切就绪！运行以下命令启动应用：

```bash
uvicorn main:app --reload
```

服务器将在 `http://127.0.0.1:8000` 启动。`--reload` 参数会使服务器在你修改代码后自动重启。

## 📖 API 使用说明

服务启动后，你可以通过以下方式与API进行交互：

### a. 交互式文档 (推荐)

FastAPI 会自动生成交互式文档，这是测试API的最佳方式。

  - **Swagger UI:** [http://127.0.0.1:8000/docs](https://www.google.com/search?q=http://127.0.0.1:8000/docs)
  - **ReDoc:** [http://127.0.0.1:8000/redoc](https://www.google.com/search?q=http://127.0.0.1:8000/redoc)

在文档页面，你可以直接对 `/api/v1/generate-quest` 端点发起测试请求。

### b. 使用 cURL

你也可以使用 cURL 或任何其他API客户端（如 Postman、Insomnia）来测试。

**请求示例:**

```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/api/v1/generate-quest' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "location": "南京"
}'
```

**成功响应示例:**

```json
{
  "tasks": [
    {
      "category": "感受",
      "icon": "🎧",
      "title": "梧桐细语",
      "description": "走在一条种满法国梧桐的安静街道上，闭上眼，聆听风吹过树叶的声音一分钟。"
    },
    {
      "category": "美食",
      "icon": "🍜",
      "title": "面馆奇遇",
      "description": "找到一家本地人排队最多的小面馆，点一碗你从未听说过的面条。"
    },
    {
      "category": "观察",
      "icon": "👁️",
      "title": "城墙印记",
      "description": "在明城墙的砖块上，寻找并拍下三个你觉得最有趣或最古老的铭文。"
    },
    {
      "category": "互动",
      "icon": "💬",
      "title": "方言一句",
      "description": "向一位和善的本地店主请教一句南京方言，并尝试用它来买一样东西。"
    },
    {
      "category": "创作",
      "icon": "🎨",
      "title": "秦淮速写",
      "description": "在秦淮河边，用手机或纸笔，花五分钟时间快速画下河上的一艘船或一盏灯。"
    }
  ]
}
```

## 🔮 未来计划

  - [ ]  增加缓存机制，对同一地点的请求在短时间内返回相同结果，降低API调用成本。
  - [ ]  支持更多自定义选项，如任务数量、探索主题（例如“历史”、“美食”、“艺术”）。
  - [ ]  增加多语言支持。
  - [ ]  将项目打包成 Docker 容器，方便部署。

## 📄 许可证

本项目采用 [MIT License](https://www.google.com/search?q=./LICENSE) 授权。