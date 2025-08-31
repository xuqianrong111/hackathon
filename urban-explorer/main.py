import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Literal  # 👈 引入 Literal 类型
import google.generativeai as genai
from dotenv import load_dotenv

# --- 1. 初始化和配置 (无变化) ---
load_dotenv()
app = FastAPI(
    title="Urban Explorer API",
    description="一个为城市漫游任务生成器提供后端支持的API",
    version="1.1.0",  # 版本号+1
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file.")
genai.configure(api_key=api_key)

# --- 2. Pydantic 数据模型 (✨ 已更新) ---

# 使用 Literal 定义允许的主题，提供输入建议和验证
Theme = Literal["默认模式", "文艺青年模式", "美食探索者模式", "摄影师模式","社交达人模式"]


# 更新请求体模型，加入可选的 theme 参数
class QuestRequest(BaseModel):
    location: str = Field(..., example="上海", description="用户想要探索的城市或地点")
    theme: Theme = Field("默认模式", description="探索主题，提供不同的任务风格")  # 👈 新增字段


# 响应模型 (无变化)
class Task(BaseModel):
    category: str
    icon: str
    title: str
    description: str


class QuestResponse(BaseModel):
    tasks: List[Task]


# --- 3. Prompt 模板 (✨ 已更新) ---

# 在模板中为“主题”增加了一个占位符 {theme_guideline}
PROMPT_TEMPLATE = """
# Role
You are a creative urban exploration game designer and a local culture expert. Your persona is witty, encouraging, and slightly mysterious.

# Task
Generate a list of 5 unique and engaging "Urban Explorer's Quests" for a user visiting "{location}" in China.

# Theme Guideline
{theme_guideline}

# Instructions & Constraints
1.  **Diversity is Key**: You MUST generate tasks from AT LEAST 4 of the following 5 categories:
    - **观察 (Observation)**
    - **互动 (Interaction)**
    - **创作 (Creation)**
    - **美食 (Cuisine)**
    - **感受 (Sensation)**
2.  **Content Rules**:
    - Avoid ultra-famous tourist traps. Focus on the spirit of a place.
    - All tasks must be safe, legal, respectful of local culture, and achievable by a solo traveler during the daytime.
    - Tasks should be free or very low-cost.
3.  **Tone**: The language should be inspiring, playful, and spark curiosity.

# Output Format
You MUST respond with a single, valid JSON object. Do not include any text, explanation, or markdown formatting before or after the JSON block.
The JSON object should have a single root key "tasks", which is an array of 5 task objects.
Each task object in the array MUST follow this exact structure:
{{
  "category": "string (Must be one of the 5 categories in Chinese)",
  "icon": "string (A single emoji that represents the category, e.g., 👁️, 💬, 🎨, 🍜, 🎧)",
  "title": "string (A creative and catchy title for the task, in Chinese, max 10 characters)",
  "description": "string (A detailed and engaging description of the task, in Chinese, max 100 characters)"
}}
"""


# --- 4. API 端点 (Endpoint) (✨ 已更新) ---

@app.post("/api/v1/generate-quest", response_model=QuestResponse)
async def generate_quest(request_body: QuestRequest):
    """
    接收一个地点和可选的主题，生成一份包含5个任务的城市漫游列表。
    """
    print(f"Received request for location: '{request_body.location}' with theme: '{request_body.theme}'")

    # 👈 根据主题动态生成主题指令
    theme_guideline_string = ""
    if request_body.theme and request_body.theme != "默认模式":
        theme_guideline_string = f"CRITICAL: All generated tasks MUST be tailored to the '{request_body.theme}'. This is the top priority and should heavily influence the nature of the tasks."

    try:
        model = genai.GenerativeModel('gemini-1.5-flash-latest')

        # 👈 将地点和主题指令都注入到Prompt中
        final_prompt = PROMPT_TEMPLATE.format(
            location=request_body.location,
            theme_guideline=theme_guideline_string
        )

        response = await model.generate_content_async(final_prompt)
        response_text = response.text
        cleaned_text = response_text.strip().lstrip("```json").rstrip("```").strip()

        print(f"Cleaned AI Response: {cleaned_text}")

        data = json.loads(cleaned_text)
        validated_data = QuestResponse.model_validate(data)

        return validated_data

    except json.JSONDecodeError:
        print(f"Error: Failed to decode JSON from AI response. Response was:\n{response_text}")
        raise HTTPException(status_code=500, detail="AI返回的JSON格式错误")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"服务器内部错误: {e}")


# --- 5. 健康检查端点 (无变化) ---
@app.get("/")
def read_root():
    return {"status": "Urban Explorer API is running!"}