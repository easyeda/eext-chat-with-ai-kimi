/**
 * getAllSelectedPrimitives() Promise 挂起测试
 *
 * 验证问题：V2 上该方法返回的 Promise 永远不会 resolve 也不会 reject，
 *          原因是底层 WebSocket bridge server 未连接。
 *
 * 使用方法：
 *   1. 在嘉立创EDA专业版中打开一张原理图
 *   2. 选中一个元件（或不选也行，测的是 Promise 本身）
 *   3. F12 打开开发者工具，粘贴本脚本执行
 *   4. 观察 10 秒内的输出
 *
 * 预期结果：
 *   V3：1-2 秒内输出 ✅ RESOLVED
 *   V2：10 秒后输出 ❌ TIMEOUT（Promise 挂起）
 */

(async function testGetAllSelectedPrimitives() {
	console.log('====== getAllSelectedPrimitives Promise 挂起测试 ======\n');

	// 前置检查
	if (typeof eda === 'undefined') {
		console.error('❌ eda 未定义，请在 EDA 环境中运行');
		return;
	}
	if (!eda.sch_SelectControl?.getAllSelectedPrimitives) {
		console.error('❌ sch_SelectControl.getAllSelectedPrimitives 不存在');
		return;
	}

	const TIMEOUT_MS = 10000;
	let settled = false;
	const startTime = performance.now();

	console.log(`⏱ 开始调用 getAllSelectedPrimitives()，超时 ${TIMEOUT_MS / 1000}s ...\n`);

	// 超时计时器
	const timer = setTimeout(() => {
		if (!settled) {
			settled = true;
			const elapsed = ((performance.now() - startTime) / 1000).toFixed(1);
			console.error(`❌ TIMEOUT (${elapsed}s)：Promise 未 resolve 也未 reject`);
			console.error('   原因：底层 WebSocket bridge server 未连接，请求无响应');
			console.error('   影响：查询元件、相似物料等依赖此 API 的功能将永久卡住');
		}
	}, TIMEOUT_MS);

	try {
		const result = await eda.sch_SelectControl.getAllSelectedPrimitives();
		if (!settled) {
			settled = true;
			clearTimeout(timer);
			const elapsed = ((performance.now() - startTime) / 1000).toFixed(1);
			console.log(`✅ RESOLVED (${elapsed}s)：返回 ${Array.isArray(result) ? result.length + ' 个对象' : typeof result}`);
			if (Array.isArray(result) && result.length > 0) {
				console.log('   首个元件 subPartName:', result[0].subPartName ?? '(无)');
			}
		}
	} catch (e) {
		if (!settled) {
			settled = true;
			clearTimeout(timer);
			const elapsed = ((performance.now() - startTime) / 1000).toFixed(1);
			console.warn(`⚠️ REJECTED (${elapsed}s)：${e.message}`);
		}
	}
})();
