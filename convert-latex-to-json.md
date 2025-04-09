# LaTeX 到 JSON 转换策略：西浦博士生非官方指南

## 背景与需求

当前 "西浦博士生非官方指南" 的内容是以 LaTeX 格式编写，而微信小程序端需要 JSON 格式的数据来展示内容。为了实现内容的动态更新而无需频繁发布小程序新版本，我们需要一种自动化的方式来将 LaTeX 内容转换为小程序可用的 JSON 格式。

## 目标

1. 建立一个自动化流程，将 LaTeX 文档转换为符合小程序数据结构的 JSON
2. 保留文档的层级结构（章节、小节）
3. 支持各种内容元素（文本、代码、图片、链接等）
4. 实现中英文双语支持
5. 避免每次内容更新都需要重新发布小程序

## 数据结构设计

小程序端当前使用的 JSON 数据结构如下：

```json
{
  "chapters": [
    {
      "id": "1",
      "title": "入学准备",
      "title_en": "Preparation",
      "icon": "preparation-icon",
      "sections": [
        {
          "id": "1_1",
          "title": "申请流程",
          "title_en": "Application Process",
          "contents": [
            {
              "type": "text",
              "content": "文本内容"
            },
            {
              "type": "code",
              "content": "代码块内容"
            },
            {
              "type": "image",
              "content": "图片路径"
            },
            {
              "type": "text-link",
              "content": ["前缀文本", "链接文本", "后缀文本"],
              "linkType": "website"
            }
          ]
        }
      ]
    }
  ]
}
```

## 转换方案对比

### 方案一：使用 Python 解析 LaTeX

#### 实现步骤
1. 使用 Python 库（如 `TexSoup` 或 `PyLaTeX`）解析 LaTeX 文档
2. 提取章节、小节结构和内容
3. 将内容转换为 JSON 格式
4. 生成符合小程序需求的 JSON 文件

#### 优点
- 完全自动化
- 可以精确控制转换逻辑
- 容易集成到 CI/CD 流程中

#### 缺点
- LaTeX 解析复杂，需要处理各种边缘情况
- 需要为不同的 LaTeX 命令和环境编写专门的处理逻辑

### 方案二：使用大模型直接转换为 JSON

#### 实现步骤
1. 使用大模型（如 GPT-3）直接将 LaTeX 转换为 JSON

#### 优点
- 无需手动转换，直接使用大模型
- 可自动处理各种 LaTeX 命令和环境

#### 缺点
- 需要使用大模型，需要消耗资源
- 可能无法精确控制转换逻辑
- 需要处理模型的输出格式和准确性

## 云端存储和获取策略

### 云存储选项

1. **云函数 + 云数据库**：
   - 使用微信小程序云开发
   - 将 JSON 数据存储在云数据库中
   - 小程序通过云函数获取数据

2. **GitHub + jsDelivr CDN**：
   - 将 JSON 文件存储在 GitHub 仓库
   - 通过 jsDelivr CDN 访问（无需备案，可直接在小程序中使用）
   - 免费且易于维护

## 自动化工作流

### GitHub Actions 工作流

1. 当 LaTeX 仓库有更新时，触发 GitHub Actions
2. 执行 LaTeX 到 JSON 的转换脚本
3. 将生成的 JSON 文件推送到指定位置（GitHub 仓库或云存储）
4. 小程序从固定 URL 获取最新 JSON 数据

```yaml
name: Convert LaTeX to JSON

on:
  push:
    branches: [ main ]
    paths:
      - 'xp_pgrs_unofficial_guide/**/*.tex'

jobs:
  convert:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.8'
      - name: Install dependencies
        run: |
          pip install texsoup pyyaml
      - name: Convert LaTeX to JSON
        run: python scripts/convert_latex_to_json.py
      - name: Deploy JSON
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./output
          destination_dir: json-data
```

## 图片处理

LaTeX 文档中的图片需要特殊处理：

1. 提取图片路径
2. 复制或转换图片到小程序可访问的位置
3. 在 JSON 中更新图片路径

可以考虑以下选项：
- 上传图片到云存储，并在 JSON 中使用云文件 ID
- 对于小图片，转换为 base64 编码直接嵌入 JSON
- 维护一个图片资源表，定期同步到小程序项目

## 中英文双语支持

### 方案一：双语并行文档

维护两个独立的 LaTeX 文档（中文和英文版本），分别转换为 JSON 数据结构。


### 方案二：翻译 API 辅助

对于只有一种语言的内容，使用翻译 API（如百度翻译、Google 翻译）自动生成另一种语言的版本。

## 推荐方案

综合考虑易用性和维护成本，推荐以下方案：

1. **技术选择**：使用 Python + TexSoup 解析 LaTeX 文件
2. **存储方式**：GitHub + jsDelivr CDN（免费、无需备案）
3. **自动化**：使用 GitHub Actions 实现内容更新时自动转换
4. **双语支持**：双语并行文档

## 下一步行动计划

1. 开发 LaTeX 解析脚本 `convert_latex_to_json.py`
2. 设置 GitHub Actions 工作流
3. 在小程序中实现 JSON 数据获取和缓存机制
4. 测试整个工作流程

## 示例代码：LaTeX 解析脚本

```python
from TexSoup import TexSoup
import json
import os
import re

def parse_latex_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        soup = TexSoup(f.read())
    
    # 提取章节结构
    chapters = []
    
    for chapter in soup.find_all('chapter'):
        chapter_id = chapter.attrs.get('label', f'chapter_{len(chapters)+1}')
        
        # 尝试提取双语标题
        title_zh = str(chapter.string)
        title_en = title_zh  # 默认值，可通过特殊注释提取或翻译
        
        # 查找特殊注释中的英文标题
        if hasattr(chapter, 'args') and len(chapter.args) > 0:
            comment_match = re.search(r'%\s*en:\s*(.*)', str(chapter))
            if comment_match:
                title_en = comment_match.group(1).strip()
        
        chapter_data = {
            "id": chapter_id.split('.')[-1],
            "title": title_zh,
            "title_en": title_en,
            "sections": []
        }
        
        # 提取小节
        for section_idx, section in enumerate(chapter.find_all('section')):
            section_id = section.attrs.get('label', f'{chapter_id}_{section_idx+1}')
            
            # 提取小节标题
            section_title_zh = str(section.string)
            section_title_en = section_title_zh  # 默认值
            
            # 查找特殊注释中的英文标题
            comment_match = re.search(r'%\s*en:\s*(.*)', str(section))
            if comment_match:
                section_title_en = comment_match.group(1).strip()
            
            section_data = {
                "id": section_id.split('.')[-1],
                "title": section_title_zh,
                "title_en": section_title_en,
                "contents": parse_section_content(section)
            }
            
            chapter_data["sections"].append(section_data)
        
        chapters.append(chapter_data)
    
    return {"chapters": chapters}

def parse_section_content(section):
    # 提取小节内容
    contents = []
    
    # 此处需要针对不同类型的内容编写解析逻辑
    # 例如文本、列表、代码块、图片等
    
    # 示例：提取普通文本段落
    for paragraph in section.find_all('p'):
        contents.append({
            "type": "text",
            "content": str(paragraph.string)
        })
    
    # 示例：提取代码块
    for verbatim in section.find_all('verbatim'):
        contents.append({
            "type": "code",
            "content": str(verbatim.string)
        })
    
    # 示例：提取图片
    for includegraphics in section.find_all('includegraphics'):
        image_path = includegraphics.args[0].string
        contents.append({
            "type": "image",
            "content": image_path
        })
    
    return contents

def main():
    # 主入口点
    data = parse_latex_file('xp_pgrs_unofficial_guide.tex')
    
    # 输出 JSON
    with open('output/guide_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
```

## 结论

通过建立 LaTeX 到 JSON 的自动转换流程，我们可以实现指南内容的动态更新，而无需重新发布小程序。推荐的方案结合了 Python 解析 LaTeX、GitHub 存储和 Actions 自动化，为内容更新提供了高效、低成本的解决方案。

后续可以根据实际需求和使用反馈，继续优化转换脚本和工作流程。