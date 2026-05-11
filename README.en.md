# Kimi AI Assistant

[中文](./README.md)

## Overview

Kimi AI Assistant is an intelligent tool developed for PCB designers, offering the following core features:

1. **Content Query**: During PCB design, users can quickly query needed design content through AI conversations.
2. **Component Management**: Supports component selection and detailed information queries, including similar part recommendations, netlist parsing, and circuit analysis.
3. **Intelligent Interaction**: Achieves efficient content retrieval and problem-solving through AI conversations.

![Feature Overview](images/c22286429bc15044a0eae325fa42fd5d905bba85e9e6077f945906a156759fd4.png)

## Feature Access

Users can access the following features through the top menu bar:

- Kimi > Kimi AI Assistant
- Kimi > About

## Usage Instructions

1. Enable the extension in the Extension Manager and make sure **External Interaction** is turned on.

   ![Enable External Interaction](images/4711bf8484a67ab55c9cb8a5dbaadebafc53235f74ed1e6009dfc576d13495d7.png)

2. Click the configuration button in the bottom right corner, and fill in the API Key on the configuration page.

   ![Configuration Button](images/750dfb4beadcd6b50e9ebc8a9d71e4f1da84b9ef17246d6f08c4fe8e93c40523.png)

3. Fill in the API Key in the configuration panel. For details on obtaining Kimi API credentials, see: [Kimi API Acquisition Guide](https://lceda001.feishu.cn/wiki/V9ScwIjk0iBc8fk9RhWcork9nGc)

   ![API Configuration Panel](images/be725a35de8d9c8ea70693235452a1b40d37e6265970fce2f9735ce876d036cc.png)

## Feature Introduction

### AI Q&A

Enter questions related to schematic or PCB design in the input box, and the AI will provide professional answers based on your questions.

![AI Q&A Demo](images/PixPin_2025-06-04_11-35-28.gif)

### Component Query

Click the **Query Component** button at the bottom, then left-click on a component in the schematic to query its detailed information.

![Component Query Demo](images/8dd5b6ed0c7f4ea100abe6e0dd9347242bd7bccc58e945dc8ed34f3f60f36f12.gif)

### Similar Part Recommendations

Click the **Similar Parts** button at the bottom, then left-click on a component in the schematic to query replacement parts for that component.

![Similar Parts Demo](images/f537ff797be0a2cc644061aa3e3856c1d4b069468f67728421ac1fb765a0f3fb.gif)

### Netlist Analysis

Click the **Analyze Netlist** button at the bottom, and the AI will analyze the netlist in the schematic and provide detailed analysis results.

> Note: This feature consumes a large number of Tokens and will be optimized in future versions.

![Netlist Analysis Demo](images/cc938a4f4a2de5b95a1b8f9e6617bb831ae18ae85e46b0e9f3590135ea650eaa.gif)

### Circuit Diagram Analysis

After selecting a vision model, you can click the **Analyze Circuit** button or directly press Ctrl + V to paste an image into the input box. The assistant will analyze and respond with the circuit diagram content.

![Circuit Analysis Demo](images/8726c946606ae15c9f03e8ab2eadf02f5694c2774b5cb04075862dea87a03b8c.gif)
