# Changelog

## [2.4.0] - 2026-04-27

### 优化

-   错误信息直接显示在对话框中，用户无需打开控制台即可排查问题（API 请求失败、网表分析失败、图片分析失败、粘贴处理失败等场景）
-   错误消息以红色醒目样式展示，包含具体的 HTTP 状态码和错误原因

## [2.1.1] - 2026-04-27

### 修复

-   修复按钮失效

## [2.1.0]

### 新增

-   增加 Kimi K2 新模型（kimi-k2-0905-preview、kimi-k2-turbo-preview）

### 使用的 EDA API

-   `eda.sys_ClientUrl.request()` — 网络请求（替代 Fetch）

## [1.3.11]

### 修复

-   修复无法粘贴文本

## [1.3.10]

### 修复

-   修复在非视觉模型下的问题

## [1.3.9]

### 变更

-   简化分析时的网表内容，只支持在 32K 以上模型使用

### 新增

-   增加额度超过时的提示

## [1.3.8]

### 变更

-   补充扩展描述

## [1.3.7]

### 修复

-   删除敏感词

## [1.3.6]

### 新增

-   支持粘贴截图
-   聊天容器能显示缩略图

## [1.3.5]

### 新增

-   支持分析网表

### 使用的 EDA API

-   `eda.sch_Netlist.getNetlist()` — 获取原理图网表

## [1.3.4]

### 变更

-   修改元件修改的提示方式

### 新增

-   增加 Logo

## [1.3.3]

### 新增

-   支持视觉模型
-   支持分析电路

## [1.3.2]

### 新增

-   支持模型切换

## [1.3.1]

### 新增

-   支持多轮对话
-   支持对话中断
-   增加折叠配置栏

## [1.3.0]

### 变更

-   全面修改界面 UI

## [1.2.2]

### 变更

-   数据保存改为修改输入框时触发

## [1.2.1]

### 新增

-   支持 URL 和 Key 数据保存

### 使用的 EDA API

-   `eda.sys_Storage.setExtensionUserConfig()` — 保存用户配置

## [1.2.0]

### 变更

-   修改菜单入口及弹窗标题
-   修改查询元件时用的属性为 subPartName
-   网络请求 Fetch 改为 eda.sys_ClientUrl

### 新增

-   增加教程跳转链接
-   增加提示 Toast 信息
-   支持检查 URL、Key 是否正确

### 使用的 EDA API

-   `eda.sys_ClientUrl.request()` — 网络请求
-   `eda.sys_ToastMessage.showMessage()` — Toast 提示

## [1.1.2]

### 新增

-   增加网表解析
-   修改按钮 UI

## [1.1.1]

### 新增

-   增加元件选取功能
-   支持查询元件信息
-   支持查询相似物料
-   增加关于菜单

### 使用的 EDA API

-   `eda.sch_Event.addMouseEventListener()` — 监听鼠标事件
-   `eda.sch_SelectControl.getAllSelectedPrimitives()` — 获取选中元件
-   `eda.sys_MessageBox.showInformationMessage()` — 信息弹窗

## [1.0.1]

### 修复

-   修复聊天框方向错误

### 新增

-   完善插件描述
-   添加关于菜单
-   添加自定义 URL 和 Key
-   修改文字大小和类型

## [1.0.0]

### 新增

-   完成互动 UI，以聊天框的形式展现
-   实现流传输，避免长段对话回复时间过长

### 使用的 EDA API

-   `eda.sys_IFrame.openIFrame()` — 打开 iframe 窗口
