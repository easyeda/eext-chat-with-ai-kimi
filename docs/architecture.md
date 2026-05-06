# AI助手Kimi — 功能与实现文档

-   扩展名：`chat-with-kimi-ai`
-   版本：2.2.0
-   平台：嘉立创EDA专业版 (engines.eda ^2.2.34)

## 这个扩展是做什么的

AI助手Kimi 是一款集成在嘉立创EDA专业版中的 AI 对话工具。用户通过配置 Kimi（Moonshot）的 API 密钥，即可在 EDA 编辑器内与 AI 进行电路设计相关的对话。扩展支持自由问答、元件信息查询、相似物料推荐、网表分析和电路图图片分析五大功能，覆盖原理图和 PCB 编辑器场景。

## 菜单总览

扩展在 home、sch、pcb 三个编辑器页面注册了相同的菜单结构：

| #   | 菜单路径       | 功能                   | 注册函数  |
| --- | -------------- | ---------------------- | --------- |
| 1   | Kimi → Kimi    | 打开 AI 对话窗口       | `RunChat` |
| 2   | Kimi → 关于... | 显示扩展版本和描述信息 | `about`   |

---

## 1. Kimi（AI 对话窗口）

**做什么：** 打开一个聊天窗口，用户可以和 Kimi AI 进行电路设计相关的对话，也可以通过窗口内的功能按钮查询元件、推荐物料、分析网表和分析电路图。

**用户操作：**

1. 点击菜单 Kimi → Kimi，弹出 480×600 的 iframe 对话窗口
2. 首次使用需点击右下角齿轮按钮，配置 API 地址和密钥
3. 在输入框中输入问题，点击发送或按回车，AI 以流式方式逐步回复
4. 可通过底部功能按钮触发特定功能（见下方子功能）

### 1.1 自由问答

**做什么：** 用户输入任意电路设计问题，AI 给出专业回答。

**用户操作：** 在输入框输入问题 → 点击发送 → AI 流式回复。

### 1.2 查询元件

**做什么：** 用户在原理图中点选一个元件，AI 自动介绍该元件的功能和应用场景。

**用户操作：**

1. 点击"查询元件"按钮
2. 在原理图中左键单击目标元件
3. 扩展自动提取元件型号，构造提问发送给 AI

### 1.3 相似物料推荐

**做什么：** 用户在原理图中点选一个元件，AI 推荐可替换的相似物料。

**用户操作：**

1. 点击"相似物料"按钮
2. 在原理图中左键单击目标元件
3. 扩展自动提取元件型号，构造提问发送给 AI

### 1.4 网表分析

**做什么：** 获取当前原理图的网表数据，精简后发送给 AI 分析整体电路功能和潜在问题。

**用户操作：**

1. 确保已打开原理图
2. 确保使用 32K 以上模型或 K2 模型
3. 点击"分析网表"按钮
4. 扩展自动获取网表、精简数据、发送给 AI 分析

### 1.5 电路图分析（视觉模型）

**做什么：** 用户上传或粘贴电路图图片，视觉模型分析图片中的电路内容。

**用户操作：**

1. 在模型下拉框中选择视觉模型（含 `vision-preview` 的模型）
2. 点击"分析电路"按钮上传图片，或直接 Ctrl+V 粘贴截图
3. AI 分析图片并回复

**实现要点：**

-   注册函数：`RunChat`
-   入口调用：`eda.sys_IFrame.openIFrame('/iframe/index.html', 480, 600)`
-   iframe 内部功能实现：
    -   自由问答：通过 `eda.sys_ClientUrl.request()` 调用 Kimi API，流式读取响应
    -   查询元件/相似物料：`eda.sch_Event.addMouseEventListener()` 监听选择事件 → `eda.sch_SelectControl.getAllSelectedPrimitives()` 获取选中元件 → 提取 `subPartName` 构造提问
    -   网表分析：`eda.sch_Netlist.getNetlist('JLCEDA')` 获取网表 → JSON 解析精简 → 发送给 AI
    -   电路图分析：FileReader 将图片转 Base64 → 构造视觉模型请求体 → 发送给 AI
    -   粘贴图片：监听 `paste` 事件，自动切换到 8K 视觉模型
-   配置存储：`eda.sys_Storage.getExtensionUserConfig()` / `setExtensionUserConfig()` 存取 Key、Url、Model
-   提示信息：`eda.sys_ToastMessage.showMessage()` 显示操作提示
-   对话历史：内存数组 `messages`，限制上下文为最新 20 条
-   错误展示：`displayError()` 将错误信息以红色气泡显示在对话框中，包含 HTTP 状态码和具体原因，替代原先仅在控制台输出的方式
-   系统提示词：文本模型和视觉模型使用不同的 system prompt
-   支持的模型：kimi-k2-0905-preview、kimi-k2-turbo-preview、moonshot-v1-8k/32k/128k（含 vision-preview 变体）

---

## 2. 关于...

**做什么：** 弹窗显示扩展的版本号和描述信息。

**用户操作：** 点击菜单 Kimi → 关于...，弹出信息对话框。

**实现要点：**

-   注册函数：`about`
-   调用：`eda.sys_MessageBox.showInformationMessage()` 显示版本和描述
-   版本号从 `extension.json` 的 `version` 字段读取
-   描述从 `extension.json` 的 `description` 字段读取
-   使用 `eda.sys_I18n.text()` 支持多语言

---

## 附录 A：EDA API 清单

<details>
<summary>点击展开 API 列表</summary>

| 模块                    | 方法                                        | 用途                          | 使用功能   |
| ----------------------- | ------------------------------------------- | ----------------------------- | ---------- |
| `eda.sys_IFrame`        | `openIFrame(url, width, height)`            | 打开 iframe 对话窗口          | #1         |
| `eda.sys_MessageBox`    | `showInformationMessage(msg, title)`        | 显示信息弹窗                  | #2         |
| `eda.sys_I18n`          | `text(key, ...)`                            | 多语言文本                    | #2         |
| `eda.sys_Storage`       | `getExtensionUserConfig(key)`               | 读取用户配置                  | #1         |
| `eda.sys_Storage`       | `setExtensionUserConfig(key, value)`        | 保存用户配置                  | #1         |
| `eda.sys_ClientUrl`     | `request(url, method, body, options)`       | 发起 HTTP 请求（调用 AI API） | #1         |
| `eda.sys_ToastMessage`  | `showMessage(msg, type)`                    | 显示 Toast 提示               | #1         |
| `eda.sch_Event`         | `addMouseEventListener(id, type, cb, once)` | 监听原理图鼠标事件            | #1.2, #1.3 |
| `eda.sch_SelectControl` | `getAllSelectedPrimitives()`                | 获取选中的原理图元件          | #1.2, #1.3 |
| `eda.sch_Netlist`       | `getNetlist(format)`                        | 获取原理图网表                | #1.4       |

</details>

## 附录 B：技术架构

### 文件结构

| 文件                   | 职责                                                   |
| ---------------------- | ------------------------------------------------------ |
| `src/index.ts`         | 扩展入口，导出 `activate`、`RunChat`、`about` 三个函数 |
| `iframe/index.html`    | AI 对话窗口的完整前端实现（HTML + 内联 JS）            |
| `iframe/style.css`     | 对话窗口样式                                           |
| `extension.json`       | 扩展配置，定义菜单注册和元信息                         |
| `locales/en.json`      | 英文语言包                                             |
| `locales/zh-Hans.json` | 简体中文语言包                                         |

### 数据流

```
用户输入 → iframe JS 构造请求 → eda.sys_ClientUrl.request() → Kimi API
                                                                    ↓
用户看到回复 ← displayMessage() ← 流式读取 response.body.getReader() ←
                                                                    ↓ (失败时)
用户看到错误 ← displayError()  ← HTTP 状态码 / 异常信息           ←
```

### 已知限制

-   网表分析的 Token 消耗较大，大型原理图可能超出模型上下文限制
-   对话历史仅保存在内存中，关闭窗口后丢失
-   元件查询和相似物料功能仅在原理图编辑器中可用（依赖 `sch_Event` 和 `sch_SelectControl`）
-   视觉模型分析电路图时，图片以 Base64 内嵌，大图片会显著增加请求体积
-   菜单 ID 在 home/sch/pcb 三个页面中使用了相同的值（`chat`、`About...`），不符合全局唯一的最佳实践
