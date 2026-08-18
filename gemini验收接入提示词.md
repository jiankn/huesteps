# HueSteps 验收与无损接入提示词

将下面整段交给执行接入的 AI。它只能在视觉验收通过后接入；不能自行生图、不能猜测文件、不能把候选或拒绝图直接上线。

```text
你负责 HueSteps 的“验收后无损接入”，不是生图任务。

项目根目录：C:\antigravity\huesteps

先完整阅读：
1. C:\antigravity\huesteps\docs\image-generation-system.md
2. C:\antigravity\huesteps\tmp\gemini-qa-gate-2026-08-18\final-visual-review.md
3. C:\antigravity\huesteps\src\data\recipes.json
4. C:\antigravity\huesteps\src\data\model-identity-registry.json
5. C:\antigravity\huesteps\src\data\tutorial-visual-migrations.json

原始候选根目录：`C:\antigravity\huesteps\tmp\gemini-image-handoff-2026-08-17`

本轮内置生图重绘候选根目录：`C:\antigravity\huesteps\tmp\native-imagegen-redraw-2026-08-18`

绝对禁止：
- 禁止生成新图、改图、裁切、缩放、重新压缩或覆盖任何候选源图。
- 禁止使用 `rejected/`、`texture-tests/`、名字含 `reject` 的文件，禁止用其他 recipe 的图。
- 禁止接入 `rich-berry-gold-makeup-deep-skin`；本轮 Step 4 与 Step 6 都被强重复皮纹硬拒。
- 禁止接入 `everyday-makeup-deep-set-eyes`，除非本轮重新补齐并验收通过一个原生 **1448×1086** 的 Step 7；现有 Step 7 候选尺寸失败。
- 禁止修改已经正式接入的其他 recipe、禁止部署、发布或 Git 提交。
- 任一 recipe 的 Hero 或任一步失败，整套 recipe 都保持不接入。

先做最终人工验收。逐张全尺寸、360/390/430px 手机宽度检查：身份连续、实际步骤递进、局部教学可读性、肤色/白平衡、广告级美感、无强重复指纹/旋涡/蚀刻纹、无蜡皮/假睫/文字/分屏/水印、Hero 与 Step 8 一致。尺寸硬规则：Hero 至少 1536px 宽；每个步骤必须为原生 PNG、精确 4:3、至少 1280×960。

本轮允许复审的精确替换候选如下（不存在于此表的步骤继续使用原始候选根目录同 slug 的 `raw\step-XX.png`，但也必须通过验收）：

| slug | 允许替换文件 |
| --- | --- |
| 5-minute-everyday-makeup | `...\5-minute-everyday-makeup\candidates\step-02-attempt-01.png` |
| easy-vacation-makeup | `...\easy-vacation-makeup\candidates\step-05-attempt-01.png`；`...\step-06-attempt-01.png` |
| natural-makeup-mature-skin | `...\natural-makeup-mature-skin\candidates\hero-attempt-01.png`；`...\step-06-attempt-01.png` |
| natural-no-makeup-makeup | `...\natural-no-makeup-makeup\candidates\step-03-attempt-01.png`（禁止使用尺寸失败的 `attempt-02-brow-detail.png`） |
| warm-bronze-makeup-medium-skin | `...\warm-bronze-makeup-medium-skin\candidates\step-03-attempt-01.png`；`...\step-07-attempt-02.png` |
| everyday-makeup-deep-set-eyes | 仅供审计，不得接入：`step-01-attempt-02.png`、`step-02-attempt-05.png`、`step-03-attempt-01.png`、`step-04-attempt-02.png`、`step-05-attempt-03.png`、`step-06-attempt-01.png`；Step 7 尚未合格。 |

对每个完整 PASS recipe，独立执行：
1. 在 `C:\antigravity\huesteps\tmp\model-rebuild\<slug>\pre-integration-backup-2026-08-18\` 备份将替换的正式 Hero、步骤资产和相关元数据；不得删除旧文件。
2. 建立 `C:\antigravity\huesteps\tmp\model-rebuild\<slug>\approved-native-redraw-2026-08-18\`。将审核通过的 Hero 复制为 `hero-master-approved.png`，最终八张原生 PNG 复制为 `sources\step-01.png` 至 `step-08.png`。源文件保持不动。
3. 逐个计算 SHA-256，确认来源严格对应上表和该 slug 原始候选后，才运行：
   - `node scripts/prepare-model-identity-heroes.mjs --slugs <slug> --master-file C:\antigravity\huesteps\tmp\model-rebuild\<slug>\approved-native-redraw-2026-08-18\hero-master-approved.png`
   - `node scripts/prepare-progressive-step-images.mjs --recipe <slug> --source-dir C:\antigravity\huesteps\tmp\model-rebuild\<slug>\approved-native-redraw-2026-08-18\sources`
4. 只更新 PASS slug 的 `model-identity-registry.json`、步骤审核记录、迁移清单和必需日期字段；不得改其他 slug。
5. 逐项运行并保留输出：`pnpm.cmd run audit:model-identities`、`pnpm.cmd run audit:step-images`、`pnpm.cmd run audit:content`、`pnpm.cmd run check`、`pnpm.cmd run build`。
6. 任一检查失败，立即停止该 recipe，恢复其备份，不部署、不发布、不提交。
7. 把通过/拒绝、精确源路径、备份路径、正式目标路径、SHA-256 和检查结果写入 `C:\antigravity\huesteps\docs\tutorial-image-redraw-daily-log.md`。

最后输出接入报告：每个 slug 的 PASS/REJECT、实际替换文件、备份位置、哈希和五项检查结果。不要部署或提交。
```
