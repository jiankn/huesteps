# HueSteps 教程美妆视觉重制每日台账

计划文件：`docs/tutorial-image-redraw-plan-2026-08-15.md`  
台账建立：2026-08-15  
当前状态：11 套已接入；其余链路持续以 Hero → Clean Step 1 门槛筛选

## 总体计数器

| 指标 | 当前值 |
|---|---:|
| 核心步骤目标 | 156 |
| 核心步骤审核通过 | 88 |
| 已确认的模特/身份链追加图 | 29 |
| 仍待 Hero 审美审核的潜在追加图 | 0–43 |
| 当前最终目标范围 | 164–216 |
| 当前全部审核通过 | 117 |
| 已正式接入 | 117 |
| 已完成整套教程 | 13 / 24 |
| 原始生成候选累计 | 443 |
| 原始生成候选拒绝/不入库累计 | 271 |
| 非生成式合成测试淘汰 | 18 |

说明：`holiday-party-shimmer-makeup` 已确认不能保留当前 Hero/模特，需在核心 6 张之外追加 Hero、Step 1、Step 8，共 9 张完整身份链。其他教程的追加量在全站 Hero 审美审核后冻结。

## 模特身份分布计数器

下表按获批准的 24 个 recipe-owned identity 统计；测试候选和被拒绝候选不计入。

| 身份组 | 配额 | 已锁定 | 剩余 |
|---|---:|---:|---:|
| 白人模特 | 14 | 11 | 3 |
| 东亚模特 | 4 | 2 | 2 |
| 其他肤色/族裔模特 | 4 | 0 | 4 |
| 黑人/深肤色模特 | 2（上限） | 0 | 2 |

## Recipe 生产看板

状态枚举：`未开始`、`Hero审核中`、`生成中`、`整套QA`、`审核通过`、`已接入`、`已发布`。

| 批次 | Recipe | 核心目标 | 已确认追加 | 潜在追加 | 当前目标范围 | 审核通过 | 已接入 | 状态 |
|---|---|---:|---:|---:|---:|---:|---:|---|
| Golden A | holiday-party-shimmer-makeup | 6 | 3 | 0 | 9 | 9 | 9 | 已接入 |
| Golden B | elongated-eye-makeup-round-eyes | 8 | 1 | 0 | 9 | 9 | 9 | 已接入 |
| Occasion | soft-glam-wedding-guest-makeup | 6 | 3 | 0 | 9 | 9 | 9 | 已接入 |
| Occasion | easy-date-night-makeup | 6 | 3 | 0 | 9 | 9 | 9 | 已接入 |
| Occasion | polished-office-makeup-10-minutes | 6 | 0 | 3 | 6–9 | 0 | 0 | 底片止损 |
| Occasion | fresh-brunch-makeup | 6 | 3 | 0 | 9 | 9 | 9 | 已接入 |
| Occasion | easy-vacation-makeup | 6 | 0 | 3 | 6–9 | 0 | 0 | 生成中 |
| Occasion | elegant-dinner-party-makeup | 6 | 3 | 0 | 9 | 9 | 9 | 已接入 |
| Occasion | natural-job-interview-makeup | 6 | 3 | 0 | 9 | 9 | 9 | 已接入 |
| Eye Shape | soft-glam-hooded-eyes | 8 | 1 | 0 | 9 | 9 | 9 | 已接入 |
| Eye Shape | everyday-makeup-deep-set-eyes | 8 | 0 | 1 | 8–9 | 0 | 0 | 未开始 |
| Eye Shape | soft-shimmer-makeup-monolids | 8 | 1 | 0 | 9 | 9 | 9 | 已接入 |
| Eye Shape | lifted-makeup-downturned-eyes | 8 | 1 | 0 | 9 | 9 | 9 | 已接入 |
| Eye Shape | balanced-eye-makeup-close-set-eyes | 8 | 1 | 0 | 9 | 9 | 9 | 已接入 |
| Skin Tone | cool-rosy-makeup-fair-skin | 6 | 3 | 0 | 9 | 9 | 9 | 已接入 |
| Skin Tone | warm-peach-makeup-fair-skin | 6 | 0 | 3 | 6–9 | 0 | 0 | 生成中 |
| Skin Tone | neutral-soft-glam-olive-skin | 6 | 0 | 3 | 6–9 | 0 | 0 | 生成中 |
| Skin Tone | warm-bronze-makeup-medium-skin | 6 | 0 | 3 | 6–9 | 0 | 0 | 生成中 |
| Skin Tone | rich-berry-gold-makeup-deep-skin | 6 | 0 | 3 | 6–9 | 0 | 0 | 未开始 |
| Everyday | 5-minute-everyday-makeup | 6 | 0 | 3 | 6–9 | 0 | 0 | 生成中 |
| Everyday | natural-no-makeup-makeup | 6 | 0 | 3 | 6–9 | 0 | 0 | 未开始 |
| Everyday | easy-everyday-soft-glam | 6 | 0 | 3 | 6–9 | 0 | 0 | 未开始 |
| Everyday | wearable-clean-makeup-look | 6 | 3 | 0 | 9 | 9 | 9 | 已接入 |
| Everyday | natural-makeup-mature-skin | 6 | 0 | 3 | 6–9 | 0 | 0 | 未开始 |
| **合计** | **24 篇** | **156** | **29** | **0–43** | **164–216** | **117** | **117** | **13 套已接入；其余链路持续筛选** |

## 每日汇总

| 日期 | 会话 | 涉及教程 | 原始候选 | 通过 Hero | 通过步骤 | 拒绝 | 通过整套 | 已接入 | 累计通过 | 当前剩余 | 主要记录 |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 2026-08-15 | Baseline | 全项目 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 159–216 | 建立详细计划和每日台账；Holiday Party 当前 Hero/模特已判定不符合广告力和人物尺度要求。 |
| 2026-08-15 | S1 测试候选 | holiday-party-shimmer-makeup | 10 | 0 | 0 | 10 | 0 | 0 | 0 | 159–216 | 在全站身份配额要求明确前生成的同一身份组候选；全部标记为 `D`，不入库、不用于人工终审。 |
| 2026-08-15 | S2 Hero候选 | holiday-party-shimmer-makeup | 10 | 0 | 0 | 0 | 0 | 0 | 0 | 159–216 | 白人模特候选，符合当前分布配额；等待用户人工审计并选定唯一身份。 |
| 2026-08-15 | S3 首套步骤质检 | holiday-party-shimmer-makeup | 8 | 0 | 0 | 8 | 0 | 0 | 0 | 159–216 | 基于临时 Hero 候选生成 Step 1–8；保守纹理处理后仍有明显重复皮肤纹理，全部标记 `T` 技术淘汰，禁止接入，将以干净摄影方向重出。 |
| 2026-08-15 | S4 Hero/Step 1 技术验证 | holiday-party-shimmer-makeup | 5 | 0 | 0 | 4 | 0 | 0 | 0 | 159–216 | 测试两位白人 Hero 身份和三次 Step 1 转换；其中一张新的 Hero 候选仍待最终判断，其余均因 `T`（重绘后出现重复皮肤纹理，或强修复后出现蜡感）不入库。 |
| 2026-08-15 | S5 固定底片合成验证 | holiday-party-shimmer-makeup | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 159–216 | 新的干净 Step 1 候选保留待审；另从该底片派生 9 张非生成式合成测试图，因妆面像后期标记、不具备真实广告质感，全部淘汰且不计入“原始生图”。 |
| 2026-08-15 | S6/S7 参考分辨率与局部复原验证 | holiday-party-shimmer-makeup | 1 | 0 | 0 | 1 | 0 | 0 | 0 | 159–216 | 降低参考图分辨率后再图生图，Step 1 仍出现重复纹理，标记 `T`；随后尝试从最终 Hero 恢复真实妆面像素，9 张非生成式测试均有灰雾/残色，标记 `P`，全部淘汰。 |
| 2026-08-15 | S8 新身份 Hero / Step 1 | holiday-party-shimmer-makeup | 2 | 0 | 0 | 1 | 0 | 0 | 0 | 159–216 | 新 Hero 具备更强的广告感和明确身份特征，保留待审；同身份 Step 1 再次出现重复微纹理，标记 `T`，不入库。 |
| 2026-08-16 | S9 并行生产与接入 | easy-date-night-makeup；holiday-party-shimmer-makeup | 27 | 1 | 8 | 6 | 1 | 9 | 9 | 153–207 | Date Night 通过全尺寸人工视觉审计并接入 1 张 Hero + 8 张教程图；Holiday 候选仍只处于整套 QA，不计通过。 |
| 2026-08-16 | S10 Holiday 主审与接入 | holiday-party-shimmer-makeup | 0 | 1 | 8 | 0 | 1 | 9 | 18 | 144–198 | 复用 S9 已计的候选产量；Holiday 通过主审后接入 1 张 Hero + 8 张教程图。 |
| 2026-08-16 | S11 并行筛选与 Round Eyes 接入 | 多条隔离链；elongated-eye-makeup-round-eyes | 60 | 1 | 8 | 51 | 1 | 9 | 27 | 136–189 | 以 Hero → Clean Step 1 门槛淘汰 51 张不入库候选；Round Eyes 通过并接入 1 Hero + 8 步。 |
| 2026-08-16 | S12 Clean Step 1 技术筛选 | soft-glam-hooded-eyes；warm-peach-makeup-fair-skin；polished-office-makeup-10-minutes | 12 | 0 | 0 | 12 | 0 | 0 | 27 | 136–189 | Hero 虽达到人物/广告门槛，但 Clean Step 1 或 Step 2 出现强蚀刻/指纹皮纹，全部隔离淘汰。 |
| 2026-08-16 | S13 Monolids 主审与接入 | soft-shimmer-makeup-monolids | 11 | 1 | 8 | 2 | 1 | 9 | 36 | 128–180 | 真实单眼皮、脸部尺度、玫瑰铜微光递进、移动端局部清晰度通过；淘汰过宽 Step 3 与分屏 Step 5。 |
| 2026-08-16 | S14 下垂眼 Step 2 止损 | lifted-makeup-downturned-eyes | 5 | 0 | 0 | 3 | 0 | 0 | 36 | 128–180 | Hero 与 Clean Step 1 仅隔离暂存；3 张独立 Step 2 均强蚀刻皮纹，未接入。 |
| 2026-08-16 | S15 原生裸妆 Hero/Step 1 止损 | natural-no-makeup-makeup | 5 | 0 | 0 | 5 | 0 | 0 | 36 | 128–180 | 3 张 Hero 与 2 张 Clean Step 1 均有强重复皮纹，全部隔离淘汰。 |
| 2026-08-16 | S16 深眼窝 Clean Step 1 止损 | everyday-makeup-deep-set-eyes | 4 | 0 | 0 | 3 | 0 | 0 | 36 | 128–180 | Hero仅隔离保留；3次同身份 Step 1 均因强皮纹或尺寸错误淘汰。 |
| 2026-08-16 | S17 小间距眼 Clean Step 1 止损 | balanced-eye-makeup-close-set-eyes | 3 | 0 | 0 | 2 | 0 | 0 | 36 | 128–180 | Hero仅隔离保留；2 张 Clean Step 1 均有强连续蚀刻皮纹，未接入。 |
| 2026-08-16 | S18 日常柔光 Hero/Step 1 止损 | easy-everyday-soft-glam | 2 | 0 | 0 | 2 | 0 | 0 | 36 | 128–180 | Hero有广告力但Step 1强斜向指纹纹理，整条链不入库。 |
| 2026-08-16 | S19 成熟肌身份连续性止损 | natural-makeup-mature-skin | 2 | 0 | 0 | 2 | 0 | 0 | 36 | 128–180 | Hero质感合格，但纯文字Step 1换人，身份连续性硬拒。 |
| 2026-08-16 | S20 橄榄肤色 Clean Step 1 止损 | neutral-soft-glam-olive-skin | 2 | 0 | 0 | 1 | 0 | 0 | 36 | 128–180 | Hero仅隔离候选；参考Step 1 有环状/指纹式强皮纹，硬拒。 |
| 2026-08-16 | S21 清透妆主审与接入 | wearable-clean-makeup-look | 10 | 1 | 8 | 1 | 1 | 9 | 45 | 119–171 | Hero、全脸终妆和360px局部教学通过；淘汰首版小脸Step 8。 |
| 2026-08-16 | S22 晚宴妆主审与接入 | elegant-dinner-party-makeup | 12 | 1 | 8 | 3 | 1 | 9 | 54 | 110–162 | Hero、完整递进和360/390/430px审查通过；淘汰小脸Hero、强皮纹Step 3和错误比例Step 4。 |
| 2026-08-16 | S23 深肤色 Step 3 技术止损 | rich-berry-gold-makeup-deep-skin | 9 | 0 | 0 | 6 | 0 | 0 | 54 | 110–162 | Hero和Step 1/2仅隔离暂存；后续 Step 3 两次强蚀刻皮纹，整套不入库。 |
| 2026-08-16 | S24 冷玫瑰主审与接入 | cool-rosy-makeup-fair-skin | 16 | 1 | 8 | 7 | 1 | 9 | 63 | 101–153 | 新白人身份、广告力、完整局部教学与360/390/430px审查均通过。 |
| 2026-08-16 | S25 暖金铜妆 Step 2 技术止损 | warm-bronze-makeup-medium-skin | 11 | 0 | 0 | 5 | 0 | 0 | 63 | 101–153 | 3位Hero中第3位审美合格，但各Clean Step 2/3强结构皮纹，整套不入库。 |
| 2026-08-16 | S26 旅妆 Step 2 技术止损 | easy-vacation-makeup | 4 | 0 | 0 | 2 | 0 | 0 | 63 | 101–153 | 新Hero和Step 1仅隔离暂存；两张Step 2皆有结构性皮纹，未接入。 |
| 2026-08-16 | S27 婚礼宾客妆重建与接入 | soft-glam-wedding-guest-makeup | 22 | 1 | 8 | 14 | 1 | 9 | 72 | 92–144 | 首轮 11 张因教程源比例不合格整体撤回；新原生 4:3 重建链 11 张中，淘汰两张强皮纹 Step 2 与一张尺寸错误 Step 8。通过 Hero、8步、360/390/430px 审查并接入。 |
| 2026-08-16 | S28 早午餐妆重建与接入 | fresh-brunch-makeup | 10 | 1 | 8 | 1 | 1 | 9 | 81 | 83–135 | 新白人身份 Hero、原生 Clean Step 1 和独立八步均通过；淘汰一张眼妆变化过淡的 Step 4，Hero、局部教学和360/390/430px均满足美妆广告与移动端门槛。 |
| 2026-08-16 | S29 办公妆 Clean Step 1 技术止损 | polished-office-makeup-10-minutes | 3 | 0 | 0 | 2 | 0 | 0 | 81 | 83–135 | 新 Hero 美学合格但两张原生4:3 Clean Step 1 都有额头/面颊连续蚀刻皮纹；未使用 normalizer、未生成下游、未接入。 |
| 2026-08-16 | S30 求职妆、hooded eyes接入与在制链实时计数 | natural-job-interview-makeup；soft-glam-hooded-eyes；neutral-soft-glam-olive-skin；warm-peach-makeup-fair-skin | 40 | 2 | 16 | 19 | 2 | 18 | 99 | 65–117 | 求职妆与 Hooded Eyes 各以新Hero+8步接入；Hooded链拒绝两张强皮纹Step2，Step1及各步一次合规低对比正规化均复审通过；橄榄肤色链止损，暖桃妆两张Step1与三张独立Step2因强重复皮纹淘汰，Hero/Step1不构成可接入整套。 |
| 2026-08-16 | S32 下垂眼接入、暖金铜妆根审止损 | lifted-makeup-downturned-eyes；warm-bronze-makeup-medium-skin | 44 | 1 | 8 | 33 | 1 | 9 | 108 | 56–108 | 下垂眼以新白人Hero02、一次合规默认正规化的Clean Step 1及7张独立后续步骤通过全尺寸和360/390/430px审查，已接入。暖金铜妆首条及v2身份链的6张Clean Step 1均因强纹理或错误画幅淘汰；v3补充生成Step2–8共16张，代理初审暂存7张，但根审发现其默认正规化后仍存在连续指纹式微纹，连同此前暂存Hero01与Step1一并撤回；整条链不入库。 |
| 2026-08-16 | S33 日常五分钟妆 Hero/步骤实时计数 | 5-minute-everyday-makeup | 34 | 0 | 0 | 23 | 0 | 0 | 117 | 49–99 | 首条新白人身份链的Clean Step 1前两张分别因强重复皮纹和1449×1086画幅淘汰，第三张与一次合规低对比正规化Step 2暂存；3张独立Step 3均强重复皮纹，整条链止损，旧身份及全部帧冻结不复用。v2–v4亦在Clean Step 1失败后冻结。v5虽取得Hero、Clean Step 1、Step 2与Step 3，但第4步两张错误画幅、唯一真4:3又无法在手机端清楚教学taupe，整链冻结。v6全新Hero01虽通过主审，但三张原生Clean Step 1均为强重复皮纹 `T`，整链止损；现切换到新的 `natural-no-makeup-makeup` Hero 链。 |
| 2026-08-16 | S34 小间距眼 Hero/底片实时计数 | balanced-eye-makeup-close-set-eyes | 6 | 0 | 0 | 5 | 0 | 0 | 108 | 56–108 | 新隔离链的3张Hero中，仅Hero02通过美妆广告力、眼型、人物尺度与纹理门槛并被锁定；Hero01/03均强重复皮纹淘汰。Hero02的3张Clean Step 1 又分别因1449×1086画幅或强重复蚀刻皮纹全部淘汰；整条身份链冻结，现从全新Hero重新开始。后续图会追加到此会话。 |
| 2026-08-16 | S35 小间距眼新身份链接入 | balanced-eye-makeup-close-set-eyes | 14 | 1 | 8 | 5 | 1 | 9 | 117 | 49–99 | 新身份Hero01、一次合规默认正规化的Clean Step 1及7张固定双锚独立步骤通过全尺寸、递进和360/390/430px真实CSS焦点审查并接入。3张因教学不清或画幅错误拒绝，另外2张技术合格Hero未选且永久冻结。 |
| 2026-08-16 | S37 办公妆新身份链根审止损 | polished-office-makeup-10-minutes | 9 | 0 | 0 | 9 | 0 | 0 | 117 | 49–99 | 新链3张Hero、3张Clean Step 1与主流程1张Clean Step 1、2张Step2独立尝试均不入库；全尺寸发现底片和Step2额头/双颊连续蚀刻式皮纹，未生成Step3–8。 |
| 2026-08-16 | S38 自然裸妆 Hero/底片根审止损 | natural-no-makeup-makeup | 6 | 0 | 0 | 6 | 0 | 0 | 117 | 49–99 | 全新白人身份 Hero02 曾暂锁候选；Hero01因连续皮肤微纹 `T` 拒绝，Hero03未选。三张同身份原生Clean Step 1均有额头/双颊连续指纹式皮纹，Hero02随整链改为不入库。 |
| 2026-08-16 | S39 三条新 Hero 链与柔光妆止损 | easy-everyday-soft-glam；easy-vacation-makeup；warm-peach-makeup-fair-skin | 10 | 2 | 0 | 8 | 0 | 0 | 117 | 49–99 | 旅行妆与暖桃妆的新白人Hero通过根审并进入Clean Step 1闸门；两者各2张未选Hero不入库。日常柔光妆Hero虽达美学门槛，三张原生Clean Step 1均强重复皮纹 `T`，Hero随整链不入库。 |
| 2026-08-16 | S40 三条 Clean Step 1 闸门 | easy-vacation-makeup；warm-peach-makeup-fair-skin；everyday-makeup-deep-set-eyes | 10 | 0 | 0 | 8 | 0 | 0 | 117 | 49–99 | Vacation与Warm Peach各生成3张Step1：前者锁定一次合规默认正规化底片、后者锁定原生第3张底片；Deep-Set Eyes的Hero与3张Step1因错误画幅或强重复皮纹整链不入库。两条通过底片链进入独立步骤生成。 |
| 2026-08-16 | S41 橄榄肤色双锚点通过 | neutral-soft-glam-olive-skin | 3 | 1 | 1 | 1 | 0 | 0 | 117 | 49–99 | Hero01因强重复皮纹拒绝；Hero02和一次合规默认正规化的原生Clean Step 1经根审通过，进入独立步骤生成。 |

## 每日详细记录

### 2026-08-15 — 计划与基线

- 完成：确认 24 篇教程、192 个步骤和核心 156 张局部重制范围。
- 完成：将“漂亮、人物足够大、妆容清楚、美妆广告力、背景服务妆容”写成硬拒绝门槛。
- 完成：确认 `holiday-party-shimmer-makeup` 需要 Hero + Step 1–8 共 9 张完整身份链重建。
- 完成：建立分 recipe 看板、每日统计字段和统一拒绝原因代码。
- 生图：0 张。
- 审核通过：0 张。
- 正式接入：0 张。
- 下一步：等待用户明确要求开始生图；开始时先执行 24 张 Hero 审美审核，并生产 Holiday Party Golden A。

### 2026-08-15 — Session 1：Holiday Party 测试候选

- 生成：10 张 Holiday Party Hero/模特候选，均为测试用途。
- 审核通过：0 张；用户尚未进行人工美学审核。
- 不入库：10 张，原因 `D`（全站模特身份分布配额在本批生成后新增；此批不符合新要求）。
- 正式接入：0 张。
- 备注：不把这批候选的产生数量当作项目完成量；它们仅用于验证“脸够大、妆容可读、酒红背景”提示词方向。
- 下一步：按更新后的配额，为 Holiday Party 生成白人模特 Hero 候选。

### 2026-08-15 — Session 2：Holiday Party 白人 Hero 候选

- 生成：10 张白人模特 Holiday Party Hero 候选，统一使用紧凑大脸、深酒红/cocoa 背景、古金与蔓越莓眼妆、莓色唇的 Golden A 方向。
- 审核通过：0 张；等待用户人工审计。
- 不入库：0 张；候选尚未被用户选定或拒绝。
- 正式接入：0 张。
- 身份分布计数：尚未锁定任何正式身份；白人配额只有在用户选中唯一候选后才从 0 计为 1。
- 下一步：用户选择候选编号，或说明希望的脸型、发型、年龄、肤色和妆容调整；只在选定一人后生成该教程的 Step 1–8。

### 2026-08-15 — Session 3：Holiday Party 首套步骤技术质检

- 生成：以 Session 2 的第 04 号候选作为**临时**生产参考，生成同一白人身份的 Step 1–8 原始序列；每张为 1448 × 1086（4:3），并按不同教学重点采用全脸、眉眼、眼妆、睫毛、脸颊和唇部的受控大特写。
- 审核通过：0 张。第 04 号 Hero 仍是临时参考，未经最终美学审核，不锁定身份、不计入配额。
- 不入库：8 张，原因 `T`（重复的生成皮肤微纹理）。已按流程做保守标准化，但全尺寸复核仍可见纹理伪影；不允许以强磨皮、扩散或裁切来掩盖。
- 正式接入：0 张。
- 备注：构图和步骤可读性符合移动端方向；本次淘汰只针对技术清洁度，下一批将保留“漂亮、人物更大、局部可读、酒红摄影背景”的要求，并针对天然皮肤质感重出。
- 下一步：重出同一教程的干净 Hero/Step 1–8 生产链；再次通过技术与身份审查后，才计入完成量。

### 2026-08-15 — Session 4：Hero / Step 1 技术验证

- 生成：5 张。包括 2 张新的白人 Hero 身份候选和 3 次基于 Hero 的 Step 1 转换尝试。
- 审核通过：0 张。第 2 张新 Hero 保留为待审候选；尚未锁定为正式 recipe identity，也不计入正式配额或完成量。
- 不入库：4 张，原因 `T`。第一位新 Hero 及其 Step 1 在全尺寸检查中有重复皮肤纹理；第二位新 Hero 的两次 Step 1 转换均引入纹理。最大允许的纹理标准化会造成蜡感，不能作为修复方案。
- 正式接入：0 张。
- 备注：已验证“仅更改妆容、保留其余像素”的局部编辑提示词；当前生成器仍会重绘部分面部，不能把结果误称为像素保留或发布级素材。
- 下一步：继续以更干净的 Hero 源和独立 Step 1 出图探索，只有获得可通过全尺寸质检的 Step 1 才批量生产 Step 2–8。

### 2026-08-15 — Session 5：固定底片合成验证

- 生成：1 张新的独立 Step 1 候选，皮肤干净、脸部尺度足够、背景和模特广告感符合方向；它暂不计入审核通过，等待拥有同一身份的最终妆效和完整步骤链。
- 合成测试：从该底片独立渲染 8 个步骤状态与 1 张 Hero 预览，共 9 张；此项不是模型生图，不计入原始生成候选累计。
- 审核通过：0 张。
- 不入库：9 张合成测试图，原因 `P`（妆面边缘、眼线和唇形呈现为后期图层/指导线，非可信的真实美妆摄影）；相关临时脚本已移除，不会进入正式生产流程。
- 正式接入：0 张。
- 下一步：回到真实摄影感生图链，继续寻找可同时满足身份锁定、妆面可读和皮肤质量的 Hero + Step 1 组合。

### 2026-08-15 — Session 6 / 7：参考分辨率与局部复原验证

- 生成：1 张。将 Hero 参考降低至 1024 × 768 后再生成 Step 1，仍出现重复皮肤纹理，标记 `T`，不入库。
- 合成测试：从一张保留的 Hero 候选提取眼、颊、唇的原始像素，尝试得到无身份漂移的步骤状态，共输出 8 张步骤和 1 张 Hero 预览；这些不是模型生图，不计入原始生成候选累计。
- 审核通过：0 张。
- 不入库：1 张原始生图（`T`）；9 张合成测试（`P`）。合成测试的去妆区域出现灰雾、颜色残影和不可信的过渡，不能作为真实裸妆或教程证据；临时脚本已移除。
- 正式接入：0 张。
- 下一步：不再以当前图生图参考链批量扩产，避免浪费和把失败图计为完成；等待生成质量能通过“身份锁定 + 真实皮肤 + 清楚妆面”三项全尺寸门槛后恢复整套生产。

### 2026-08-15 — Session 8：新身份 Hero / Step 1

- 生成：2 张。一张新的 Holiday Party Hero 候选；一张以该 Hero 锁定发型、五官特征、痣位、背景和灯光的 Step 1。
- 审核通过：0 张。Hero 候选具备“漂亮、人物大、妆容清楚、背景服务妆容”的广告方向，暂留待审，但没有完整身份链时不计为通过。
- 不入库：1 张，原因 `T`。Step 1 在全尺寸检查中仍可见额头和面颊的重复生成微纹理。
- 正式接入：0 张。
- 下一步：继续尝试干净的身份锁定链；只有 Hero 与 Step 1 同时通过，才开始生成 Step 2–8。

### 2026-08-16 — 并行候选链：Easy Date Night Makeup（隔离暂存，后续已接入）

- 生成：13 张候选（2 张 Hero、1 张 Step 1、Step 2–8 八张独立状态、Step 3/5/7 三张局部特写重绘）。首张 Hero 因重复皮肤微纹理淘汰；其余仅为待主审候选。
- 暂存：选择 1 张 1536 × 1024 Hero 候选，以及 8 张 1448 × 1086（4:3）步骤候选。眉毛、眼妆/睫毛和唇部均改为移动端可读的受控局部特写；Hero、全脸和背景保持同一 cocoa/rosewood 摄影世界。
- 技术 QA：对允许的低对比生成微纹理应用项目受限标准化并复核；选中 8 张通过尺寸/比例/重复文件机械审计。混合焦点序列仍保留人工确认提示（肤色、白平衡、身份连续性与全尺寸残余伪影），不能据此自动批准。
- 未接入：0 张。未改动 `src/assets`、recipe 数据、身份注册表或发布配置。
- 隔离路径：`tmp/model-rebuild/easy-date-night-makeup/parallel-date-night/`；选中步骤在 `sources/`，接触表与审计 JSON 在 `qa/selected-progressive-audit/`。
- 后续结果：主视觉审计已完成，确认 Hero 与 8 张步骤满足高级美妆广告感、人物/目标区域移动端可读、身份连续性、真实皮肤和妆容递进门槛；详细接入记录见下方 Session 9。

### 2026-08-16 — Session 9：Easy Date Night Makeup（已接入）

- 原始候选：13 张；技术拒绝：1 张 Hero（重复皮肤微纹理）。另 14 张 Holiday 并行候选中有 5 张技术拒绝，均仅计入产量，不计为通过。
- 审核通过：1 张 Hero（1536 × 1024 主源）+ 8 张步骤主源（1448 × 1086，4:3）；其中眉、眼、睫、唇为真实受控教学特写。
- 主视觉 QA：HS-M002 为独特的白人身份链；Hero、Step 1 和 Step 8 同一张脸、同一深棕发型、同一酒红服装、同一 cocoa/rosewood 摄影世界。肌理自然、妆容可见、全脸尺度及局部裁切在移动端可读。
- 正式接入：已备份旧资源到 `tmp/model-rebuild/easy-date-night-makeup/pre-replacement-backup-2026-08-16/`；已替换 `src/assets/recipes-v5/easy-date-night-makeup.webp` 与 8 张 `src/assets/tutorial-steps/easy-date-night-makeup/*-curated.webp`，并写入新 SHA-256 审核记录与身份注册表。
- 自动 QA：`prepare-progressive-step-images`、`prepare-model-identity-heroes`、`audit-progressive-image-set` 均已通过；页面移动端组件已改为单列全宽、按教程目标做局部放大。

### 2026-08-16 — Agent 并行候选链：Holiday Party Shimmer Makeup（隔离暂存，未接入）

- 执行范围：仅 `tmp/model-rebuild/holiday-party-shimmer-makeup/parallel-holiday/`；未覆盖既有暂存结果，未改动 `src/assets`、recipe 数据、身份注册表或发布配置。
- 生成：14 张原始生图候选。包含 2 张白人 Hero 身份候选、4 张 Step 1 尝试、1 张 Step 2、1 张 Step 3、1 张 Step 4、2 张 Step 5（首张因假睫毛淘汰）、1 张 Step 6、1 张 Step 7、1 张 Step 8。计数仅为本 agent 的独立追踪，尚未并入页面级总计数器。
- 工作锁定：Hero 采用 `hero-candidate-02.png`（1536 × 1024）；八张原始步骤均为 1448 × 1086（4:3），来自固定的 Step 1 + Hero 双参考并分别独立生成。
- 技术 QA：原始图均存在低对比、重复性皮肤微纹理，因此按项目授权范围分别进行了保守与强档边缘保留标准化；强档结果保存在 `sources-strong/`。尺寸/比例/重复文件机械审计已通过；混合焦点序列保留人工确认提示，不能自动批准。
- 质检结论：Hero、身份连续性、妆容累积、局部教学裁切与移动端可读性达到候选门槛；首个 Hero、前三次 Step 1 和首个 Step 5 已淘汰（原因 `T`：重复蚀刻纹理，或近似假睫毛）。`sources-strong/step-01.png` 至 `step-08.png` 为待主审的唯一整套候选，尚未记为“审核通过”。
- 复核材料：`qa/progressive-contact-sheet.jpg` 与 `qa/progressive-image-audit.json`。Hero：`hero-master-provisional.png`；原始步骤：`raw/`；待主审强档源：`sources-strong/`。
- 正式接入：0 张。下一步：主视觉审计确认妆面、原图到标准化后的肤质、Hero-to-Step 8 匹配和 360/390/430px 页面裁切；确认后才允许复制到正式生产路径并运行 WebP 准备脚本。

### 2026-08-16 — Agent 并行候选链：Fresh Brunch Makeup 第一轮（硬性淘汰，隔离证据保留）

- 执行范围：仅 `tmp/model-rebuild/fresh-brunch-makeup/parallel-brunch/`；未改动 `src/assets`、recipe 数据、身份注册表或发布配置。
- 生成：9 张原始图（1 张 Hero、Step 1–8 各 1 张，步骤均 1448 × 1086 / 4:3）。该数量仅为本 agent 的隔离追踪，尚未并入页面级总计数器。
- 主审拒绝：整套 9 张均不入库。Hero 下半脸与下巴存在明显半透明弧线/套索状伪影（`T`）；全脸 Step 1、2、6、7、8 的人物尺度未满足移动端脸宽至少 60% 的硬门槛（`F`）。Hero 是同一身份链的锚点，故其余局部步骤不能脱离 Hero 单独入库。
- 处理：已保留 `hero-master-provisional.png`、`raw/`、`sources/` 和 `qa/` 作为拒绝证据；明确禁止用 normalizer、裁切或后期覆盖来修复该 Hero 伪影。
- 正式接入：0 张。下一步：新建完全不同的 Hero + Step 1 候选，源图即须满足脸宽 60% 以上、完整发际线和下巴、无透明线/接缝，并保持 Hero 与全脸教学步骤的相同尺度摄影世界；通过主审前不生成其余步骤。

### 2026-08-16 — Agent 并行候选链：Fresh Brunch Makeup Retry 04（Hero 保留，Step 1 技术阻断）

- 主审确认 Hero：`parallel-brunch/candidates/hero-retry-04-close-clean.png` 已通过美学、脸部尺度、妆容可读性、浅景深花园背景和下巴无弧线伪影检查。已非破坏性复制为 `hero-master-retry-04-provisional.png`；仍未批准发布或接入。
- Step 1：同一 Hero 参考下生成 2 张独立 4:3（1448 × 1086）底图尝试，均满足同尺度和身份方向，但全尺寸可见重复的蚀刻/指纹状皮肤微纹理，全部拒绝为 `T`。拒绝证据：`retry-04/candidates/step-01-rejected-etched-texture.png`、`step-01-rejected-etched-texture-02.png`。
- 处理：未对两张 Step 1 使用 normalizer，未生成 Step 2–8，避免将不合格底片扩散到身份链。首轮旧整套继续作为永久拒绝证据，任何旧步骤均不能复用。
- 正式接入：0 张。下一步：在获得无重复纹理的同身份 Clean Step 1 前暂停该链的后续出图；一旦通过全尺寸 Step 1 审核，再以该 Step 1 + Hero 双参考独立生成完整八步。

### 2026-08-16 — Session 10：Holiday Party Shimmer Makeup（已接入）

- 主视觉 QA：确认 HS-M005 为新的独特白人身份链；高端红发模特、脸部尺度、酒红莓果唇、cranberry/antique-gold 眼妆和克制深桃花木背景均达到广告级和移动端教学门槛。
- 审核通过：复用上方 agent 已记录的 14 张原始候选，其中 1 张 Hero + 8 张步骤源通过；首张 Hero、3 张 Step 1 与首张 Step 5 保持技术淘汰，不接入。
- 正式接入：旧 Hero、步骤源和网站 WebP 已备份至 `tmp/model-rebuild/holiday-party-shimmer-makeup/pre-replacement-backup-2026-08-16/`；已替换 `src/assets/recipes-v5/holiday-party-shimmer-makeup.webp` 与 8 张教程 WebP，并更新身份注册表、审核哈希、内容日期。
- 自动 QA：素材准备、Hero 准备和逐步序列机械审计均通过；360 / 390 / 430px 受控裁切联系表已由并行链复核，页面层另使用全宽单列和目标区域放大规则。

### 2026-08-16 — Agent 并行候选链：Elongated Eye Makeup for Round Eyes（隔离暂存，待主流程接入）

- 执行范围：仅 `tmp/model-rebuild/elongated-eye-makeup-round-eyes/parallel-round-eyes/`；未改动 `src/assets`、recipe 数据、身份注册表、发布配置或本台账的汇总计数器。
- 模特：一位新的原创、非名人东亚女性身份（短黑发、右颊痣位、暖玫瑰灰摄影世界）；仅作 `East Asian` 配额候选记录，正式配额须在主流程接入后再计入。
- 原始候选：共 27 张。首轮 13 张整套候选因 `A`（蓝灰正面肖像、广告力和成妆冲击力不足）整体不入库，保留在 `rejected-attempt-01/`，未尝试 normalizer 挽救。重启链路后生成 14 张，其中 1 Hero + 8 步为唯一待接入候选；5 张替代图不入库（1 张 Step 1 为 `T` 重复皮肤微纹理，1 张 Step 8 为 `F` 小脸移动端构图，其余为锁定清洁底片和最终构图后未选的探索稿）。
- 已完成 QA：Hero 为 1536 × 1024，八张选中步骤均为 1448 × 1086（4:3）；`audit-progressive-image-set` 通过尺寸、比例和重复文件检查。混合局部焦点仍保留人工肤色/白平衡/残余纹理提示，已进行全尺寸复核。低对比重复微纹理仅按项目范围作边缘保留标准化，不用其掩盖身份、解剖、妆容或构图问题。
- 移动端 QA：已生成并复核 360 / 390 / 430px 联系表；Step 1–7 均为真实眉眼/眼睑/睫毛教学近景，Step 8 使用替换后的近距离全脸终妆，眼线、睫毛与妆效在最窄规格仍清楚可见。
- 主审状态：根审确认选中 Hero、眼部递进、痣位/短发连续性、广告力和移动端局部清晰度通过；本 agent 不执行正式接入。复核材料：`qa/selected-progressive-audit/manual-qa.md`、`qa/selected-progressive-audit/progressive-contact-sheet.jpg` 和 `qa/mobile-review/`。
- 正式接入：0 张。下一步：由主流程将 Hero 与 `sources/step-01.png` 至 `step-08.png` 进入正式资源准备与页面级审计；`candidates/` 和 `rejected-attempt-01/` 均禁止作为接入源。

### 2026-08-16 — Session 11：Elongated Eye Makeup for Round Eyes（已接入）

- 审核通过：新 HS-M011 东亚身份链的 1 张 Hero + 8 张步骤；眼型教程只推进眼周，Step 1–7 均为移动端可读的真实局部教学近景，Step 8 以更紧的终妆全脸收束。
- 主视觉 QA：短黑发、两颗 viewer-right cheek 痣、暖玫瑰灰背景、眼部水平拉长方向和柔雾唇均连续；模型具有编辑级广告力，未发现可见重复皮纹、解剖/身份漂移或普通证件照构图。
- 正式接入：旧资源备份至 `tmp/model-rebuild/elongated-eye-makeup-round-eyes/pre-replacement-backup-2026-08-16/`；已替换该 recipe 的 Hero 与 8 张教程 WebP，并更新身份注册表、审核 SHA-256、内容日期。
- 自动 QA：素材准备、Hero 准备、机械步骤序列审计和 360/390/430px 联系表复核通过。移动端组件另将 final 卡片提高至 1.22 倍，以保证终妆脸部不显小。

### 2026-08-16 — Session 12：Clean Step 1 技术筛选（隔离淘汰）

- 原始候选：12 张，来自 Hooded Eyes（3 Hero + 1 Step 1）、Warm Peach（1 Hero + 1 Step 1）和 Office Retry 03（3 Hero + 1 Step 1 + 2 Step 2）。
- 结果：所有候选均不入库；Hooded Eyes 与 Warm Peach 的 Hero 已过广告力主审，但同身份 Step 1 出现高对比重复蚀刻/指纹纹理。Office 的 Hero 03 同样在 Step 1 和两张独立 Step 2 全尺寸二次审计中发现强重复皮纹。
- 正式接入：0 张。未使用 normalizer 掩盖强纹理；未在失败底片上生成剩余步骤。完整证据保留在各 recipe 的 `tmp/model-rebuild/*/parallel-*` QA 目录。

### 2026-08-16 — Session 13：Soft Shimmer Makeup for Monolids（已接入）

- 原始候选：11 张，包含 1 张 Hero、10 张独立步骤候选；其中 1 张过宽全脸 Step 3（`F`）和 1 张分屏 Step 5（`Q`）淘汰，不入库。
- 审核通过：1 张 Hero（1536 × 1024）与 8 张步骤主源（1448 × 1086，4:3）。每个步骤均从固定 Clean Step 1 与该 Hero 独立生成；只对 Step 1 的低对比残余微纹理执行一次边缘保留规范化并在全尺寸复审，未以处理掩盖强伪影。
- 主视觉 QA：HS-M012 是独特东亚身份链，保留真实暗棕单眼皮、viewer-left 下颊痣、黑发耳后、象牙色高领与暖奶油摄影世界。玫瑰铜微光、睫根深度、下睫映衬与分明睫毛递进清楚，Hero 与终妆具美妆广告力而非普通肖像；360 / 390 / 430px 联系表复核通过。
- 正式接入：旧 Hero、源图和 WebP 已备份至 `tmp/model-rebuild/soft-shimmer-makeup-monolids/pre-replacement-backup-2026-08-16/`；已替换正式 Hero 与 8 张教程 WebP，更新身份注册表、审核 SHA-256 和内容日期。
- 自动 QA：资源准备、Hero 准备、逐步序列审计、全站 identity 审计与类型检查全部通过；移动端利用单列全宽和分类局部放大，使眼部步骤与最终妆效均可读。

### 2026-08-16 — Agent 并行 Hero 候选：Soft Glam for Hooded Eyes（隔离暂存，等待主审）

- 执行范围：仅 `tmp/model-rebuild/soft-glam-hooded-eyes/parallel-hooded-eyes/`；未改动 `src/assets`、recipe 数据、身份注册表、发布配置或台账汇总计数器。
- 原始候选：3 张纯文本 Hero 生成，全部 1536 × 1024；无 Step 1–8 生成。每张均为原创、非名人、25–35 岁白人女性候选，人物尺度、hooded-eye 可读性、冷 taupe/玫瑰 satin/cobalt 微眼线、柔雾玫瑰褐背景和真实皮肤为共同硬标准。
- QA：三张均通过基本脸部尺度、完整五官、无文字/水印/假睫毛带/教学辅助线和自然肤质检查；Candidate 01 广告冲击力只达保留门槛，Candidate 03 相对更常规，Candidate 02 为当前推荐主审对象（大脸、高级美妆广告气质、眼皮结构和 cobalt 微翅均更直观）。未锁定任何身份，未计入配额。
- 复核材料：`qa/hero-candidate-review.md` 与 `candidates/hero-candidate-01.png` 至 `hero-candidate-03.png`。
- 正式接入：0 张。下一步：主审明确选择唯一 Hero 后，才以选中 Hero 建立同身份 Clean Step 1；随后每步均从 Step 1 + Hero 双参考独立生成。

### 2026-08-16 — Agent 并行 Hero 候选：Polished Office Makeup in 10 Minutes（Retry 03，隔离暂存，等待主审）

- 执行范围：仅 `tmp/model-rebuild/polished-office-makeup-10-minutes/parallel-office-retry-03/`；未改动 `src/assets`、recipe 数据、身份注册表、发布配置或台账汇总计数器。
- 原始候选：3 张纯文本 Hero（均为 1536 × 1024）；未生成 Step 1–8。三者都是新的原创、非名人白人女性候选，25–35 岁，避免复用此前 Office 身份；均要求完整发际线与下巴、脸部占幅至少约 60%、可读的轻盈 taupe 眼妆、柔和玫瑰血色和润唇，以及不抢人的玻璃办公室晨光散景。
- 初步 QA：Candidate 01 作为备选保留，脸部尺度略保守；Candidate 02 和 03 具备更强的近距离广告构图与妆容可读性。三张均完成全尺寸人工查看，未见文字、水印、边框、手部、企业标识或明显透明接缝；最终美学、身份和技术通过权仍由主审决定。
- 复核材料：`candidates/hero-candidate-01.png` 至 `hero-candidate-03.png`。本轮不锁定身份、不计入正式配额，也不允许以候选 Hero 推导步骤链。
- 正式接入：0 张。下一步：主审选择唯一 Hero 后，才以该 Hero 构建同身份、同尺度、无后续眼唇妆的 Clean Step 1；Clean Step 1 全尺寸通过后才开始独立生成 Step 2–8。

### 2026-08-16 — Agent 并行链：Soft Glam for Hooded Eyes Step 1 技术阻断

- Hero 决策：主审已选择 `parallel-hooded-eyes/candidates/hero-candidate-02.png` 为唯一暂存锚点（深棕中分低髻、榛棕 hooded eyes、嘴角旁小痣、黑色高领、玫瑰褐背景）；已非破坏性复制为 `hero-master-provisional.png`。Candidate 01/03 不入库，身份配额仍由正式接入流程管理。
- Step 1：从锁定 Hero 双参考方向生成 1 张独立 1448 × 1086（4:3）Clean Step 1 尝试。身份、眼色、发型、背景和教学近景基本连续，但在额头、鼻周及上颊全尺寸可见高对比重复蚀刻/指纹状皮纹，判为 `T`。
- 处理：该伪影超过低对比微纹理 normalizer 的允许范围；未执行 normalizer，未写入 `raw/` 或 `sources/`，只保留拒绝证据 `candidates/step-01-rejected-etched-texture.png` 与 `qa/step-01-review.md`。未生成 Step 2–8，避免将失败底片扩散。
- 正式接入：0 张；台账总计数器不变。下一步：等待主审决定是否对同一锁定 Hero 进行新的干净 Step 1 独立尝试；只有 Step 1 通过全尺寸皮肤和身份审计后，才可生成后续链。

### 2026-08-16 — Agent 并行候选链：Polished Office Makeup in 10 Minutes（Retry 03，Step 1 技术止损）

- Hero：主审已锁定 `parallel-office-retry-03/candidates/hero-candidate-03.png`，并非破坏性复制为 `hero-master-approved.png`；该 Hero 的广告力、脸部尺度、浅棕低髻、蓝灰眼、玻璃早光背景和轻柔办公妆均通过 Hero 门槛，但尚未取得完整身份链发布批准。
- 原始步骤尝试：1 张 Clean Step 1 + 2 张从固定 Step 1 与已锁定 Hero 双参考独立生成的 Step 2 候选，均为 1448 × 1086（4:3）。Step 2 的两张没有用作彼此参考。
- 二次全尺寸 QA：Step 1 和两张 Step 2 的额头、双颊和下半脸均可见强烈连续的蚀刻/指纹式重复皮肤纹理，判定 `T`。该问题超过允许使用 normalizer 的低对比微纹理范围；因此撤回此前对 Step 1 的初步通过判断，严禁 normalizer、裁切或后期覆盖修饰。
- 止损与证据：未生成 Step 3–8，也没有创建 `sources/`。拒绝证据在 `parallel-office-retry-03/rejected/step-01-rejected-strong-etched-texture.png`、`step-02-rejected-strong-etched-texture.png` 和 `step-02-rejected-strong-etched-texture-02.png`；原始 Step 1 仍保留在 `raw/` 仅供审计，禁止再用作身份底片。
- 正式接入：0 张。下一步：如要续做，必须从已锁定 Hero 重新取得全尺寸无重复纹理的 Clean Step 1，先单独通过再启动新的八步独立链；本轮任何步骤均不可复用。

### 2026-08-16 — Agent 并行 Hero 候选：Natural Job Interview Makeup（隔离暂存，等待主审）

- 执行范围：仅 `tmp/model-rebuild/natural-job-interview-makeup/parallel-job-interview/`；未改动 `src/assets`、recipe 数据、身份注册表、发布配置或台账汇总计数器。
- 原始候选：3 张纯文本 Hero 生成，均为 1536 × 1024；无 Step 1–8 生成。共同标准为原创非名人白人女性（25–35）、大脸、低饱和奶油灰办公室摄影世界、可读的自然哑光妆（精致眉、taupe 眼影、棕色睫根、rose-beige 颊/唇）和高端美妆广告力。
- QA：Candidate 01/03 虽技术干净，但前者近似普通职场头像、后者人物/广告冲击力不足，均为 `A/F` 不推荐。Candidate 02（短 ash-dark-blonde bob、暖棕眼、viewer-left 颊上两点浅雀斑）为唯一推荐主审候选：人物尺度、真实皮肤、妆面可读性、清爽专业感和美妆封面力均达候选门槛；未锁定身份或计入配额。
- 复核材料：`qa/hero-candidate-review.md` 与 `candidates/hero-candidate-01.png` 至 `hero-candidate-03.png`。
- 正式接入：0 张。下一步：主审决定唯一 Hero 后才创建同身份 Clean Step 1；随后所有步骤只可从锁定 Step 1 + Hero 双参考独立生成。

### 2026-08-16 — Agent 并行链：Natural Job Interview Makeup Step 1 技术阻断

- Hero 决策：主审已选择 `parallel-job-interview/candidates/hero-candidate-02.png` 作为唯一暂存 Hero（浅金棕 bob、viewer-left 两点浅雀斑、暖棕眼、灰白领、奶油灰背景），仅非破坏性复制为 `hero-master-provisional.png`；身份配额不在本 agent 流程计入。
- Step 1：以该 Hero 生成 1 张无后续妆容的 Clean Step 1 尝试。身份和摄影世界基本连续，但输出为 1536 × 1024（3:2），不符合教程步骤所需 4:3 (`F`)；全尺寸额头、眼下与上颊还可见重复蚀刻/指纹状生成皮纹 (`T`)。
- 处理：`T` 的结构性超过允许 normalizer 的低对比残余范围，且 normalizer 无法修复 3:2 尺寸硬错误；未执行 normalizer，未写入 `raw/` 或 `sources`。拒绝证据：`candidates/step-01-rejected-etched-texture.png` 和 `qa/step-01-review.md`。未生成 Step 2–8。
- 正式接入：0 张；台账总计数器不变。下一步：等待主审决定是否允许从此锁定 Hero 重新尝试干净 4:3 Step 1；在此之前，整条链保持止损。

### 2026-08-16 — Agent 并行候选链：Lifted Makeup for Downturned Eyes（Step 2 技术止损）

- 执行范围：仅 `tmp/model-rebuild/lifted-makeup-downturned-eyes/parallel-lifted-eyes/`；未改动 `src/assets`、recipe 数据、身份注册表、发布配置或台账汇总计数器。
- 模特与 Hero：1 张 1536 × 1024 的原创、非名人拉丁裔/中等暖橄榄肤色 Hero 暂存为 `hero-master-approved.png`。其大脸、琥珀榛眼、自然轻微下垂外眼角、右侧太阳穴小痣、espresso 低髻、克制 taupe/cocoa 背景和最终向上提拉眼妆均达到候选 Hero 门槛；不计入已注册身份或发布资产。
- Clean Step 1：1 张 1448 × 1086（4:3）眼部教学近景保留在 `raw/step-01.png` 与 `sources/step-01.png`；同一身份与摄影世界、自然下垂眼角、无后续眼影/眼线/睫毛状态和 360px 可读目标均通过初检。未使用 normalizer。
- Step 2：固定 Step 1 + Hero 双参考下独立生成 3 张 1448 × 1086 候选，均在额头、双颊和鼻周出现大面积高对比蚀刻/指纹式重复纹理，全部硬拒 `T`。拒绝证据：`rejected/step-02-rejected-strong-etched-texture.png` 至 `step-02-rejected-strong-etched-texture-03.png`；它们互不作为参考，也没有进入 `sources/`。
- 止损：强纹理不能由 normalizer、裁切或后期覆盖补救，因此未生成 Step 3–8，不能诚实地创建完整逐步审计或 360 / 390 / 430px 联系表。技术报告：`qa/technical-stop-review.md`。
- 正式接入：0 张。下一步：若继续，先对现有 Hero + Step 1 取得新的全尺寸干净 Step 2；只有通过纹理、身份、眼型递进和手机端清晰度审查后，才能从同一 Step 1 + Hero 独立生成余下步骤。本轮所有被拒 Step 2 均禁止复用。

### 2026-08-16 — Agent 并行候选链：Everyday Makeup for Deep-Set Eyes（Step 1 纹理阻断，隔离证据）

- 执行范围：仅 `tmp/model-rebuild/everyday-makeup-deep-set-eyes/parallel-deep-set/`；未改动 `src/assets`、recipe 数据、身份注册表、发布配置或台账汇总计数器。
- Hero：生成并保留 1 张 1536 × 1024 暂存 Hero；为新的原创非名人白人身份，蓝灰深眼窝、明显眉骨、浅金棕低髻、viewer-right 下巴小痣、海军蓝领口与灰石背景。人物尺度、终妆可读性、背景与美妆广告力满足 Hero 候选门槛，但没有合格 Step 1 前不计审核通过或身份配额。
- Step 1：生成 3 张独立尝试。Attempt 01 为 1449 × 1085（比例不精确）且有额头/颊部重复蚀刻纹理，`F/T` 淘汰；Attempt 02 为 1448 × 1086 但有重复皮纹，按允许范围只作一次保守 normalizer 后仍可见结构性纹理，`T` 淘汰；Attempt 03 为 1448 × 1086 眼部教学近景，仍有额头与上颊重复线纹，`T` 淘汰。
- 处理：没有对强纹理使用强 normalizer，不以裁切或磨皮掩盖；未写入可接入的 `raw/step-01.png` 或 `sources/`，未生成 Step 2–8。拒绝图、保守 normalizer 和详细门槛报告位于 `parallel-deep-set/candidates/`、`raw/`、`qa/step-01-rejection-report.md`。
- 原始产量：4 张（1 Hero + 3 Step 1）；拒绝：3 张 Step 1；可供正式接入：0 张。
- 正式接入：0 张。下一步：等待主审决定是否对同一暂存 Hero 继续重新寻找无纹理、真 4:3 的 Clean Step 1；在得到通过底片前整条链停止，禁止生成下游图。

### 2026-08-16 — Agent 并行候选链：Balanced Eye Makeup for Close-Set Eyes（Step 1 技术止损）

- 执行范围：仅 `tmp/model-rebuild/balanced-eye-makeup-close-set-eyes/parallel-close-set-eyes/`；未改动 `src/assets`、recipe 数据、身份注册表、发布配置或台账汇总计数器。
- Hero：生成 1 张 1536 × 1024 的新原创、非名人白人候选 Hero，暂存 `hero-master-approved.png`。其浅蜂蜜金低髻、近距绿色小间距眼型、浅石灰/灰玫瑰背景、明亮内眼角与外侧加深的最终平衡效果具备候选广告力、尺度和教学方向；尚不构成正式身份链批准。
- Clean Step 1：在 Hero 参考下生成 2 张独立 1448 × 1086（4:3）候选，均准确保持新身份、素眼状态和近距尺度，但全尺寸在额头、双颊与中脸均出现高对比、连续的蚀刻/指纹式重复纹理。两张全部硬拒 `T`，保存为 `rejected/step-01-rejected-strong-etched-texture.png` 与 `step-01-rejected-strong-etched-texture-02.png`。
- 处理：强纹理超出 normalizer 可处理的低对比残余范围，未执行 normalizer、裁切或后期掩盖；未写入 `sources/`，未生成 Step 2–8，也不能伪造完整机械审计或 360 / 390 / 430px 联系表。报告：`qa/technical-stop-review.md`。
- 正式接入：0 张。下一步：若续做，只能从该 Hero 再次获得一张原始全尺寸 Clean Step 1；通过纹理、身份、眼型/手机端清晰度审计后才允许从固定 Step 1 + Hero 双参考独立建立其余七步。本轮两张拒绝件禁止复用。

### 2026-08-16 — Agent 并行候选链：Wearable Clean Makeup Look（隔离整套候选，待主审）

- 执行范围：仅 `tmp/model-rebuild/wearable-clean-makeup-look/parallel-clean-look/`；未改动 `src/assets`、recipe 数据、身份注册表、发布配置或汇总计数器。
- 生成：10 张原始输出（1 Hero、Step 1–8、1 张 Step 8 小脸替代淘汰）。Hero 为新的原创非名人白人身份；暂存 1 张 1536×1024 Hero 与八张 1448×1086 4:3 教学候选。
- QA：Hero→Clean Step 1 身份、发型、痣位、暖米石灰背景与妆感连续；每步由固定 Step 1+Hero 独立生成。机械审计通过，360/390/430 联系表已生成；没有强蚀刻纹理、分屏或教学覆盖被接入。Step 8 首稿因人物偏小淘汰，替换稿仍需主审结合页面语境复核最终脸部尺度。
- 复核材料：`qa/manual-qa.md`、`qa/selected-progressive-audit/`、`qa/mobile-review/`；Hero/步骤候选在根目录、`raw/` 与 `sources/`。
- 正式接入：0 张。下一步：主审检查整套广告力、皮肤、移动端脸部尺度、妆面递进和 Hero-to-final 连续性；确认后才允许正式资源准备。

### 2026-08-16 — Session 27：Soft Glam Wedding Guest Makeup（已接入）

- 原始候选：22 张。首个隔离链有 1 张 Hero、3 张 Step 1 候选与 7 张后续候选；其中虽然曾选出 9 张，但步骤源的 3:2 画布不符合教程 4:3 硬规则，整组 11 张全部撤回、不接入。重建链另生成 11 张：1 张原生 Clean Step 1、3 张 Step 2 候选、6 张后续步骤与 1 张 Step 8 替代候选。
- 拒绝：14 张。旧链 11 张因错误源画布整体不入库；重建链淘汰两张强重复皮纹 Step 2（`T`）和一张 1449 × 1086 的比例错误 Step 8（`F`）。所有强纹理候选均未用作后续参考。
- 审核通过：HS-M001 新白人身份链的 1 张 Hero（1536 × 1024 主源）与 8 张步骤主源（全部原生 1448 × 1086，4:3）。步骤 2–8 仅对允许的低对比残余作一次保守边缘保留标准化，并逐张全尺寸复审；未出现蜡感、辅助线、分屏、明显重复皮纹或身份漂移。
- 主视觉 QA：灰绿眼、深栗色中分低髻、珍珠耳钉、香槟缎面高领和 cocoa-mauve 摄影世界贯穿 Hero 与八步；玫瑰灰褐眼、睫根、提亮腮红和玫瑰木缎唇按当前步骤规范累进。Hero 与终妆具美妆广告力，Step 4 / 5 / 7 是真实局部教学近景。
- 移动端 QA：重建链的 360 / 390 / 430px 联系表均通过。Step 1–3 与 Step 8 维持紧凑全脸，目标局部步骤使用受控近景；当前移动端组件再按目标区域放大，正常阅读无需放大原图。
- 正式接入：旧正式资源已保留于 `tmp/model-rebuild/soft-glam-wedding-guest-makeup/pre-replacement-backup-2026-08-16/`；已替换 Hero 与八张教程 WebP，并更新身份注册表、审核 SHA-256、内容日期和看板计数。
- 自动 QA：Hero 准备、步骤准备、逐步序列机械审计、identity 审计、步骤图审计与类型检查均通过。隔离主审证据：`tmp/model-rebuild/soft-glam-wedding-guest-makeup/parallel-wedding-retry-4x3/qa/`。

### 2026-08-16 — Session 28：Fresh Brunch Makeup（已接入）

- 原始候选：10 张，包含 1 张 Hero、1 张 Clean Step 1、8 张独立后续步骤候选。
- 拒绝：1 张 Step 4 初稿，眼部香槟提亮变化过淡，不能作为教学证据；没有被用于任何后续生成。
- 审核通过：HS-M004 新白人身份链的 1 张 Hero（1536 × 1024 主源）与 8 张原生 1448 × 1086、4:3 步骤主源。每个 Step 2–8 都只由固定 Step 1 + Hero 独立生成；所选图仅对允许的低对比残余执行一次保守边缘保留标准化，并再次全尺寸复核。
- 主视觉 QA：苔绿眼、暖棕大侧分 Italian bob、viewer-left 上唇痣、黄油奶油色高领及温暖桃光摄影世界在全链连续。香槟/桃米色眼妆、纤细焦糖睫根、高位粉杏腮红和透明杏桃唇逐步可见；Hero 与终妆具高级美妆广告力。
- 移动端 QA：360 / 390 / 430px 联系表均通过。眉、两眼、睫根、上颊和唇都使用真实局部近景，最终妆维持紧凑的近距离全脸；用户不需放大原图即可看见改变。
- 正式接入：旧资源已备份至 `tmp/model-rebuild/fresh-brunch-makeup/pre-replacement-backup-2026-08-16/`；新 Hero 与 8 张教程 WebP 已接入，并更新身份注册表、审核 SHA-256、内容日期与看板。
- 自动 QA：Hero / 步骤准备、机械序列审计、全站 identity 审计、步骤审核和类型检查通过。隔离主审证据：`tmp/model-rebuild/fresh-brunch-makeup/restart-2026-08-16/qa/`。

### 2026-08-16 — Session 29：Polished Office Makeup in 10 Minutes（Clean Step 1 技术止损）

- 原始候选：3 张（1 张 Hero、2 张同身份原生 1448 × 1086 Clean Step 1）。Hero 是新原创白人身份，脸部尺度、美妆广告力、浅灰建筑日光背景和自然哑光终妆方向均达到候选门槛，但不构成可发布身份链。
- 拒绝：两张 Step 1 均出现额头、眼下和面颊的连续细线/蚀刻重复皮纹，判 `T`。其严重程度不属于可用 normalizer 处理的低对比残余；未写入 `raw/` 或 `sources`，也没有被作为任何后续参考。
- 止损：不生成 Step 2–8、不制作误导性的完整审计或移动端联系表、不接入正式素材。证据和报告：`tmp/model-rebuild/polished-office-makeup-10-minutes/parallel-office-fresh-hero/qa/technical-stop-review.md`。
- 下一步：该身份链不再尝试；后续需从完全新的 Hero + Clean Step 1 开始，优先在底片阶段排除结构性重复皮纹。

### 2026-08-16 — Session 30：Natural Job Interview Makeup（已接入）

- 原始候选：17 张（3 张 Hero、2 张 Step 1、12 张 Step 2–8 尝试）。仅 Hero01、清洁 Step 1 和最终各步骤入库；其余 8 张不选或技术淘汰。
- 质量控制：Step 1 的首次尝试和两张 Step 3 尝试因强蚀刻皮纹/错误后续妆层拒绝；一张清洁但眉、睫、腮、唇目标过小的独立状态只用于产生受控 4:3 教学裁切，未从失败或最终妆帧裁切。唯一一次默认正规化仅用于 Step 1 低对比残余，后续全尺寸复审无蜡感。
- 审核通过：HS-M008 白人身份的 Hero + 8 张原生 1448 × 1086 教学源。灰蓝眼、栗棕低髻、viewer-left 高颊痣、石板灰高领与奶油灰建筑光线连续；自然哑光妆的眉、taupe 眼、棕睫根、玫瑰米腮与唇在手机端逐步可读。
- 正式接入：旧资源备份到 `tmp/model-rebuild/natural-job-interview-makeup/pre-replacement-backup-2026-08-16/`；Hero、八张 WebP、身份注册表、审核哈希和内容日期已更新。360 / 390 / 430px 联系表和全站审计通过。

### 2026-08-16 — Session 31：Soft Glam for Hooded Eyes（已接入）

- 原始候选：11 张。Hero + 8 张完整身份链入库；两张 Step 2 强重复皮纹图直接隔离，未规范化、未用作任何参考。
- 审核通过：HS-M009 白人身份的 Hero + 8 张原生 1448 × 1086 教学源。铂金侧扫发、灰绿 hooded eyes、viewer-right 下颌痣、灰蓝高领和灰玫瑰摄影世界连续；taupe 结构、玫瑰缎光、钴蓝微眼线、下睫呼应和分明睫毛依次清楚。
- 纹理与移动端：Step 1 和其余通过帧各只允许一次默认边缘保留正规化，均经全尺寸复核后未见强线纹、蜡感或身份漂移。360 / 390 / 430px 联系表通过，钴蓝微眼线与睫毛在最窄规格仍可读。
- 正式接入：旧资源备份到 `tmp/model-rebuild/soft-glam-hooded-eyes/pre-replacement-backup-2026-08-16/`；Hero、八张 WebP、身份注册表、审核哈希和内容日期已更新。全站审计通过。

### 2026-08-16 — Session 32：Lifted Makeup for Downturned Eyes（已接入）

- 原始候选：11 张（2 张 Hero、2 张 Clean Step 1、7 张从固定 Hero + Clean Step 1 双锚点独立生成的后续步骤）。
- 拒绝：Hero01 与首张 Step 1 均有强重复皮纹，直接隔离，未被 normalizer 或后续生成引用。
- 审核通过：HS-M013 新白人身份的 Hero + 8 张原生 1448 × 1086 教学源。灰蓝眼、蜂蜜金 blunt lob、viewer-left 颧骨雀斑、奶油色领口和 cocoa-gray 摄影世界全程一致；自然下垂的外眼角、上扬 taupe / brown-rose 外眼角、缎米色中央眼皮、短可可微眼线和分明上翘睫毛逐步清晰。
- 纹理与移动端：Clean Step 1 与各通过步骤最多只作一次合规默认边缘保留正规化；全尺寸复审保留眼褶、毛孔、雀斑、眉毛和睫毛，没有强重复纹理或蜡感。360 / 390 / 430px 联系表均通过，眼部目标无需放大原图即可阅读。
- 正式接入：旧资源已备份到 `tmp/model-rebuild/lifted-makeup-downturned-eyes/pre-replacement-backup-2026-08-16/`；新 Hero、八张教程 WebP、身份注册表、审核哈希和内容日期均已更新。
- 自动 QA：Hero / 步骤准备、逐步机械审计、全站 identity 审计、严格步骤审核和类型检查通过（全项目仅保留 2 个既有 `tmp/` 脚本提示）。

### 2026-08-16 — Session 35：Balanced Eye Makeup for Close-Set Eyes（已接入）

- 原始候选：14 张。新身份 Hero01、一次合规默认正规化的 Clean Step 1，以及固定 Hero + Clean Step 1 双锚点独立生成的 Step 2–8 组成完整候选链；所有入库步骤源均为原生 1448 × 1086。
- 拒绝/不入库：3 张后续候选分别因教学变化不清或原生画幅错误拒绝；Hero02 与 Hero03 虽技术合格但没有被选为该 recipe 的唯一身份，永久冻结。共 5 张不进入素材库。
- 审核通过：HS-M014 新白人身份。栗铜色低髻、琥珀色自然小间距眼、viewer-left 下颌痣、黑色高领与灰玫瑰摄影背景从 Hero 到最终妆稳定一致；外半眼睑 taupe、进一步外移阴影、内眼角提亮、espresso 睫根、下睫雾化与根根分明睫毛按教程递进，终妆保持高级美妆广告力。
- 纹理与移动端：Clean Step 1 和其余通过帧各最多一次默认边缘保留正规化，复核保留毛孔、细眼纹、眉毛、唇纹和痣，无强重复纹理或蜡感。真实 CSS 焦点的 360 / 390 / 430px 联系表通过，内眼角提亮和外移重心无需放大原图即可辨认。
- 正式接入：原资产已备份到 `tmp/model-rebuild/balanced-eye-makeup-close-set-eyes/pre-replacement-backup-2026-08-16/`；新 Hero、八张教程 WebP、身份注册表、审核哈希及内容日期已更新。
- 自动 QA：`pnpm.cmd run audit:model-identities`、`pnpm.cmd run audit:step-images` 和 `pnpm.cmd run check` 均通过；类型检查为 0 errors（仅保留 2 条既有 `tmp/` 脚本 hints）。

### 2026-08-16 — Session 36：Warm Bronze Makeup for Medium Skin（根审撤回）

- 补充原始候选：v3 后续 Step 2–8 共 16 张；至此该隔离链合计 21 张原始输出（3 Hero + 18 步骤候选）。
- 根审结论：不接入。虽然 Hero、构图、背景、铜色眼影/陶土腮红/焦糖唇的移动端呈现达到候选美学门槛，但全尺寸复核发现代理暂存的默认正规化源在额头与双颊仍有清楚的连续指纹式/蚀刻微纹。这不是可接受的低对比自然肤理，属于 `T` 硬拒。
- 处置：此前已计入在制的 Hero01 与 Clean Step 1 也因未能构成可信完整链而改为不入库；v3 的 21 张原始输出均留在 `tmp/model-rebuild/warm-bronze-makeup-medium-skin/parallel-warm-bronze-identity-reset-v3/` 作为审计证据，禁止复制到 `src/`、禁止作为下一轮参考。
- 统计校正：本次给全局原始候选累计补记后续 16 张；拒绝/不入库累计补记这 16 张及此前暂存的 Hero01、Clean Step 1 共 18 张。正式接入不变。

### 2026-08-16 — Session 37：Polished Office Makeup in 10 Minutes（新身份链根审止损）

- 原始候选：9 张（3 Hero、3 张同身份 Clean Step 1、主流程重试 1 张 Clean Step 1、2 张固定双锚 Step 2 独立尝试）。
- 根审结论：不接入。Hero03 的美妆广告力、人物尺度、浅石材日光背景及终妆方向合格；但 Clean Step 1 的复核和两张 Step 2 在额头、鼻侧、双颊出现连续波纹/指纹式微纹，判 `T`。这类覆盖全脸的结构性伪影不属于一次默认 normalizer 可以处理的低对比残余。
- 处置：所有候选均留在 `tmp/model-rebuild/polished-office-makeup-10-minutes/restart-identity-c-2026-08-16/` 作为可追溯证据，未改动 `src/data` 或 `src/assets`；没有生成 Step 3–8。为避免误用，主流程创建的 `raw/step-01.png`、`sources/step-01.png` 临时副本已移除，其同内容候选副本保留在 `rejected/`，因此可审计可恢复。
- 下一步：从完全新身份重新开始；只要原生 Clean Step 1 在 100% 复核有任何重复蚀刻纹，即整链停止。

### 2026-08-16 — Session 38：Natural No-Makeup Makeup（Hero / Clean Step 1 根审止损）

- 原始候选：3 张 1536 × 1024 的全新、非名人白人 Hero；旧链身份和所有失败帧均未引用。
- 暂选身份：Hero02 曾暂锁定于 `tmp/model-rebuild/natural-no-makeup-makeup/account-reset-2026-08-16/hero-master-provisional-awaiting-step1.png`。其栗棕耳后 lob、深棕眼、viewer-right 太阳穴细雀斑、雾灰高领、暖象牙/浅石材背景和可读的细紧线/中性奶油颊/透明玫瑰裸唇具备候选广告尺度。
- 根审止损：三张原生 1448 × 1086 的同身份 Clean Step 1 都在额头与双颊出现连续指纹式/蚀刻微纹，判 `T`，未运行 normalizer。Hero02 因不能形成可信身份链也改为不入库；Hero01 为 `T`，Hero03 未选。该隔离链 6 张原始输出全部不进入正式素材。
- 处置：所有证据保留在该隔离目录；没有创建 `sources/`、没有生成 Step 2–8、没有触碰 `src/`。下一次只能从完全新的 Hero 身份开始。

### 2026-08-16 — Session 39：三条新 Hero 身份链（Clean Step 1 前）

- 原始候选：7 张。`easy-everyday-soft-glam` 生成 1 张 Hero；`easy-vacation-makeup` 与 `warm-peach-makeup-fair-skin` 各生成 3 张 Hero。全部为新原创白人身份，和各自冻结的旧链没有身份或像素复用。
- 根审暂锁：旅行妆的深棕波浪发绿金眼 Hero01，以及暖桃妆的红棕蓬松低髻浅灰绿眼 Hero01。两者均满足紧凑大脸、清晰妆效、广告审美和背景服务妆容的门槛。
- 不入库：旅行妆与暖桃妆的 Hero02 / Hero03 均技术可用但未被选为该 recipe 唯一身份，共 4 张永久冻结。三条链没有正式接入；下一阶段只能从各自锁定 Hero 的原生 Clean Step 1 开始。
- 日常柔光妆止损：短发灰琥珀眼 Hero01 虽通过 Hero 美学与技术门槛，但三张原生 1448 × 1086 Clean Step 1 均在额头、双颊和下巴带有连续指纹/蚀刻纹理 `T`。未做 normalizer、未生成 Step 2–8；Hero01 随整链改为不入库。本节合计因该止损新增 3 张原始候选及 4 张拒绝/不入库计数（含先前暂锁 Hero）。

### 2026-08-16 — Session 40：Vacation / Warm Peach / Deep-Set Eyes（Clean Step 1 闸门）

- 原始候选：10 张。旅行妆 3 张 Clean Step 1、暖桃妆 3 张 Clean Step 1、深眼窝教程 1 张 Hero 与 3 张 Clean Step 1。
- 旅行妆：第 1 张原生 1448 × 1086 底片只有低对比残余，唯一一次默认边缘保留正规化与根审后通过；另 1 张不选、1 张 1449 × 1086 画幅错误。Hero01 + Clean Step 1 双锚点已锁，开始独立生成后续步骤。
- 暖桃妆：第 1、2 张底片分别有强卷曲/蚀刻纹理 `T`；第 3 张原生 1448 × 1086 经根审通过，不使用 normalizer。Hero01 + Clean Step 1 双锚点已锁，开始独立生成后续步骤。
- 深眼窝教程：Hero01 是本项目唯一深巧克力肤色候选链，广告表现与肤色准确性通过 Hero 审查；但 3 张底片分别为 1449 × 1086 `F`、以及两张强重复环纹/蚀刻 `T`。未用 normalizer、未生成下游，Hero 与三张底片全数不入库。

### 2026-08-16 — Session 41：中性橄榄肤色双锚点通过

- 原始候选：2 张原生 1536 × 1024 Hero。Hero01 因全尺寸强重复皮肤纹理 `T` 永久隔离；Hero02 经根审通过。
- 通过 Hero：Hero02 为本教程唯一原创中性橄榄肤色身份；脸部尺度大，玫瑰褐眼妆、克制玫瑰腮和玫瑰棕唇在缩略尺寸清楚，灰米背景不污染肤色，满足高级美妆广告门槛。
- Clean Step 1：追加 1 张原生 1448 × 1086 候选。其原图只有低对比残余，按合同进行唯一一次默认边缘保留正规化；根审确认真实皮肤、眉毛和唇纹保留，且没有强重复纹或蜡感。Hero02 + 该底片成为唯一双锚点。
- 下一步：每张后续状态均只从双锚点独立生成；按该教程的实际顺序使用眼/眉/睫局部近景，完成后才允许整套根审与正式接入。

### 2026-08-18 — Session 42：Gemini 候选验收后正式接入（9 套）

- 验收报告：`tmp/gemini-qa-gate-2026-08-18/final-visual-review.md`（4 套 PASS / 7 套 REJECT）。
- 本次接入 9 套：4 套 PASS 直接接入；5 套原 REJECT 在 `tmp/native-imagegen-redraw-2026-08-18/` 完成定点重画后接入。
- 仍未接入 2 套：`everyday-makeup-deep-set-eyes`（缺 step-07 合格重画，既有尝试因 1449×1086 被拒）、`rich-berry-gold-makeup-deep-skin`（step-04/step-06 全部尝试仍在 `rejected/`）。其候选与旧资产原样保留，未做任何改动。
- 未运行 `pins:build`：以上 9 套的 `public/pins/*.png` 仍是旧身份，需在下一次发布前单独重生成。
- 未部署、未发布、未提交 Git。

#### easy-everyday-soft-glam

| 项 | 值 |
|---|---|
| 备份目录（旧正式资产，未删除） | `tmp/model-rebuild/easy-everyday-soft-glam/pre-gemini-integration-backup-2026-08-18`（17 个文件） |
| 审批源目录 | `tmp/model-rebuild/easy-everyday-soft-glam/gemini-approved-2026-08-18` |
| Hero 源 | `tmp/gemini-image-handoff-2026-08-17/easy-everyday-soft-glam/hero/hero-master.png` |
| Hero 源 SHA-256 | `19737c9f40ee647975352d3119df54d7e439f59427ad79869d7f2cd2ab795d19` |
| Hero 正式文件 | `src/assets/recipes-v5/easy-everyday-soft-glam.webp` · 2560×1440 · SHA-256 `aec0e589023ff547d6c5bdb53ee9a839a193b9e383b171854fa1666198dc8ced` |

| Step | 源文件 | 源 SHA-256 | 正式文件 SHA-256 |
|---|---|---|---|
| 01 | `tmp/gemini-image-handoff-2026-08-17/easy-everyday-soft-glam/raw/step-01.png` | `638f65a85a6121d65f220ca6873046a8…` | `9c799664a605157258e87e78bc1dda4c…` |
| 02 | `tmp/gemini-image-handoff-2026-08-17/easy-everyday-soft-glam/raw/step-02.png` | `a76d281a1f162aec131a3b760e71dcb5…` | `e89d61f925e07d328bc96b69b77ec8e0…` |
| 03 | `tmp/gemini-image-handoff-2026-08-17/easy-everyday-soft-glam/raw/step-03.png` | `60bcedbf6dbdeaba9724ca798f1ef183…` | `a9f273d140e8a3554b13ea141ec82303…` |
| 04 | `tmp/gemini-image-handoff-2026-08-17/easy-everyday-soft-glam/raw/step-04.png` | `61626111519e86ddd5673c5a4538de80…` | `0ace493472032d5273a73a7362c1f249…` |
| 05 | `tmp/gemini-image-handoff-2026-08-17/easy-everyday-soft-glam/raw/step-05.png` | `2c803085b0b1cae72e97ef9a18085d67…` | `c16d4449128d471c32d1408729a0adaf…` |
| 06 | `tmp/gemini-image-handoff-2026-08-17/easy-everyday-soft-glam/raw/step-06.png` | `3ec945585f6f918ea14769358c5fd122…` | `c917226a3669f0e6e65ce8896a226b66…` |
| 07 | `tmp/gemini-image-handoff-2026-08-17/easy-everyday-soft-glam/raw/step-07.png` | `9121edaaf084fd123ad70d406c2da267…` | `79b4393ae93f57b67fb8712c3cb30150…` |
| 08 | `tmp/gemini-image-handoff-2026-08-17/easy-everyday-soft-glam/raw/step-08.png` | `0d79e78f8d812c2b7f7b6ecc87c28057…` | `a6e29274b92513087e7b2c57d6b52ed9…` |

#### neutral-soft-glam-olive-skin

| 项 | 值 |
|---|---|
| 备份目录（旧正式资产，未删除） | `tmp/model-rebuild/neutral-soft-glam-olive-skin/pre-gemini-integration-backup-2026-08-18`（17 个文件） |
| 审批源目录 | `tmp/model-rebuild/neutral-soft-glam-olive-skin/gemini-approved-2026-08-18` |
| Hero 源 | `tmp/gemini-image-handoff-2026-08-17/neutral-soft-glam-olive-skin/hero/hero-master.png` |
| Hero 源 SHA-256 | `d8099f52bdc4035d6043e3422dbca012ed9f1d5cd1cdab5baf91dea2bc6bef52` |
| Hero 正式文件 | `src/assets/recipes-v5/neutral-soft-glam-olive-skin.webp` · 2560×1440 · SHA-256 `1a210a0035f42c8f85c8a7e65415903a4fccf20dd38af854754efdce8035125e` |

| Step | 源文件 | 源 SHA-256 | 正式文件 SHA-256 |
|---|---|---|---|
| 01 | `tmp/gemini-image-handoff-2026-08-17/neutral-soft-glam-olive-skin/raw/step-01.png` | `b24198b511be88984ec8937fc7ff8db3…` | `a1f071718fd5e8183f2dcfdeafff3f25…` |
| 02 | `tmp/gemini-image-handoff-2026-08-17/neutral-soft-glam-olive-skin/raw/step-02.png` | `006d05b2369566f9eb80b892203d3035…` | `1d6a052623f7b8abde5fd65cda833436…` |
| 03 | `tmp/gemini-image-handoff-2026-08-17/neutral-soft-glam-olive-skin/raw/step-03.png` | `91230b04b0065f6cb19dc1ece854bbd7…` | `e0fe246cc1adbaa8318ce67a7fa3cf7f…` |
| 04 | `tmp/gemini-image-handoff-2026-08-17/neutral-soft-glam-olive-skin/raw/step-04.png` | `ccbece60c30c848291a6058ae03f7f34…` | `56e7fe3cb51a3151388b163b106bd749…` |
| 05 | `tmp/gemini-image-handoff-2026-08-17/neutral-soft-glam-olive-skin/raw/step-05.png` | `1d20af66935d4012a334d9b8a88de933…` | `3a0b13d1523404d683f629be637bdd3c…` |
| 06 | `tmp/gemini-image-handoff-2026-08-17/neutral-soft-glam-olive-skin/raw/step-06.png` | `2726e7197b6dc49c758e1519c0fec0aa…` | `94d690de718a2b8df2cafa9f9e51f38a…` |
| 07 | `tmp/gemini-image-handoff-2026-08-17/neutral-soft-glam-olive-skin/raw/step-07.png` | `ef723ef2a1fc56a7561ab6c7af517015…` | `d3322da4de31dda16cd3a106033ac67d…` |
| 08 | `tmp/gemini-image-handoff-2026-08-17/neutral-soft-glam-olive-skin/raw/step-08.png` | `956073672fb99ab2a639b668d7bd6374…` | `05b3e4c6bec95ac19b2cdd17242cab34…` |

#### polished-office-makeup-10-minutes

| 项 | 值 |
|---|---|
| 备份目录（旧正式资产，未删除） | `tmp/model-rebuild/polished-office-makeup-10-minutes/pre-gemini-integration-backup-2026-08-18`（17 个文件） |
| 审批源目录 | `tmp/model-rebuild/polished-office-makeup-10-minutes/gemini-approved-2026-08-18` |
| Hero 源 | `tmp/gemini-image-handoff-2026-08-17/polished-office-makeup-10-minutes/hero/hero-master.png` |
| Hero 源 SHA-256 | `d7a654ba80763ddd2abbfcbb739f3f351f15bfc30a201af7e1230cba0268051a` |
| Hero 正式文件 | `src/assets/recipes-v5/polished-office-makeup-10-minutes.webp` · 2560×1440 · SHA-256 `fc33cd1c955a9d08ea4a948e05464ae7022578af853aa6784341f1e1e7d20138` |

| Step | 源文件 | 源 SHA-256 | 正式文件 SHA-256 |
|---|---|---|---|
| 01 | `tmp/gemini-image-handoff-2026-08-17/polished-office-makeup-10-minutes/raw/step-01.png` | `3a6a9be9666e0a99cbf0c6eb44f1ae61…` | `649f49b689a366746b91ab9f9a89d648…` |
| 02 | `tmp/gemini-image-handoff-2026-08-17/polished-office-makeup-10-minutes/raw/step-02.png` | `c911b71bd3f2b6ae62fcfff9f8b83d17…` | `fff90b01a7ae969158d869abaa4b57b3…` |
| 03 | `tmp/gemini-image-handoff-2026-08-17/polished-office-makeup-10-minutes/raw/step-03.png` | `5055f0445e223f2949394d24043f7dd5…` | `a8260fa0c241f1a8e9ed7895ec4229a6…` |
| 04 | `tmp/gemini-image-handoff-2026-08-17/polished-office-makeup-10-minutes/raw/step-04.png` | `a4d285f25c579c2d538309f11997d42d…` | `22f11269afb1a298ed294ff711137875…` |
| 05 | `tmp/gemini-image-handoff-2026-08-17/polished-office-makeup-10-minutes/raw/step-05.png` | `b2a6eb9c525a5628dd116a47b67cec70…` | `5643b9407bc245b9088c4062adae8b8a…` |
| 06 | `tmp/gemini-image-handoff-2026-08-17/polished-office-makeup-10-minutes/raw/step-06.png` | `050925f9ed28b0455d1acb5eaf157226…` | `f562f770e2a3daeff842b995689adc42…` |
| 07 | `tmp/gemini-image-handoff-2026-08-17/polished-office-makeup-10-minutes/raw/step-07.png` | `e5f07bc39f90610ebe3ca7cf39449b4f…` | `416ad4a7439f41b91f664ebc468fbe4a…` |
| 08 | `tmp/gemini-image-handoff-2026-08-17/polished-office-makeup-10-minutes/raw/step-08.png` | `d4fdc7bd17e343094ad697fbe1875631…` | `9e37e5da2c1dd5ff30fa908f1db2026c…` |

#### warm-peach-makeup-fair-skin

| 项 | 值 |
|---|---|
| 备份目录（旧正式资产，未删除） | `tmp/model-rebuild/warm-peach-makeup-fair-skin/pre-gemini-integration-backup-2026-08-18`（17 个文件） |
| 审批源目录 | `tmp/model-rebuild/warm-peach-makeup-fair-skin/gemini-approved-2026-08-18` |
| Hero 源 | `tmp/gemini-image-handoff-2026-08-17/warm-peach-makeup-fair-skin/hero/hero-master.png` |
| Hero 源 SHA-256 | `f6a46d5af96223973d69fb80619c8227b4bb1ebb8301a78350d8f54c9af25dcc` |
| Hero 正式文件 | `src/assets/recipes-v5/warm-peach-makeup-fair-skin.webp` · 2560×1440 · SHA-256 `e4799fa8c91f6f83b40666f552aa184082da834adafa8936e0c1535fd5733aa5` |

| Step | 源文件 | 源 SHA-256 | 正式文件 SHA-256 |
|---|---|---|---|
| 01 | `tmp/gemini-image-handoff-2026-08-17/warm-peach-makeup-fair-skin/raw/step-01.png` | `84e40a632aa99e8013607a79ef82ac1e…` | `b74ceabb27dc6f344cba41ce9fbaf416…` |
| 02 | `tmp/gemini-image-handoff-2026-08-17/warm-peach-makeup-fair-skin/raw/step-02.png` | `7c013d03f1e72e16010549e61b16c7ee…` | `e04305fe29884fa1989b9590d7443c7f…` |
| 03 | `tmp/gemini-image-handoff-2026-08-17/warm-peach-makeup-fair-skin/raw/step-03.png` | `25b7fc3353bc2efb92f82ebc398030fc…` | `1d9f0c6033351f53509283dde193d5bf…` |
| 04 | `tmp/gemini-image-handoff-2026-08-17/warm-peach-makeup-fair-skin/raw/step-04.png` | `56e9666ba211bada4f09f4e448a87abc…` | `1a68df937926949792ca6b006a06cea1…` |
| 05 | `tmp/gemini-image-handoff-2026-08-17/warm-peach-makeup-fair-skin/raw/step-05.png` | `97a316e7b00e53469d11704720d4a1d4…` | `5adb149a954a1b6efddfcc39ebbc394d…` |
| 06 | `tmp/gemini-image-handoff-2026-08-17/warm-peach-makeup-fair-skin/raw/step-06.png` | `06937521645ee050a01fe2c4d85267b9…` | `63ad917dcbb359fcb7804c2fcb346d00…` |
| 07 | `tmp/gemini-image-handoff-2026-08-17/warm-peach-makeup-fair-skin/raw/step-07.png` | `27cd28e7ef03314661443733a537aefa…` | `23d8b5be8f082d16f055cfc703b9568d…` |
| 08 | `tmp/gemini-image-handoff-2026-08-17/warm-peach-makeup-fair-skin/raw/step-08.png` | `c946be74aba6cfaf3b8b8bf7801d5297…` | `b4e0ad7afd3f8df88b75c74b6b32d54f…` |

#### 5-minute-everyday-makeup

| 项 | 值 |
|---|---|
| 备份目录（旧正式资产，未删除） | `tmp/model-rebuild/5-minute-everyday-makeup/pre-gemini-integration-backup-2026-08-18`（17 个文件） |
| 审批源目录 | `tmp/model-rebuild/5-minute-everyday-makeup/gemini-approved-2026-08-18` |
| Hero 源 | `tmp/gemini-image-handoff-2026-08-17/5-minute-everyday-makeup/hero/hero-master.png` |
| Hero 源 SHA-256 | `942783d5ed531a49473e2a8ee35567798e162921d24cb4c330e83f055a6f13d6` |
| Hero 正式文件 | `src/assets/recipes-v5/5-minute-everyday-makeup.webp` · 2560×1440 · SHA-256 `bf4c233ed0dda8bf6ffc211ca191476bdda15d5aa795e0b2df89b786691050bc` |

| Step | 源文件 | 源 SHA-256 | 正式文件 SHA-256 |
|---|---|---|---|
| 01 | `tmp/gemini-image-handoff-2026-08-17/5-minute-everyday-makeup/raw/step-01.png` | `0cee8e30f7fa5a25b78aec3196c5f696…` | `02721bf5c92378851aab1f3cc950db96…` |
| 02 **重画** | `tmp/native-imagegen-redraw-2026-08-18/5-minute-everyday-makeup/candidates/step-02-attempt-01.png` | `8c93afe885d5a66bb9dc43e98233dd68…` | `2a2efe12b621fe077b368dd7307f4f1f…` |
| 03 | `tmp/gemini-image-handoff-2026-08-17/5-minute-everyday-makeup/raw/step-03.png` | `50366ad026fcdce924c6528ae164c896…` | `0c4bcf892d40a92cd48ccae9905129fa…` |
| 04 | `tmp/gemini-image-handoff-2026-08-17/5-minute-everyday-makeup/raw/step-04.png` | `44ab066f8ce04e417952accc87779c5c…` | `dc2c41f2bbdcbdcbceb29a394c99dfc7…` |
| 05 | `tmp/gemini-image-handoff-2026-08-17/5-minute-everyday-makeup/raw/step-05.png` | `f97d63a66327cd5c3072e46c8d7195df…` | `4e4f9d976c309e835a6422016198d8d8…` |
| 06 | `tmp/gemini-image-handoff-2026-08-17/5-minute-everyday-makeup/raw/step-06.png` | `67459128f628fcedc8652eae021e8e16…` | `1794f254999a33c3091747de8f0d9a84…` |
| 07 | `tmp/gemini-image-handoff-2026-08-17/5-minute-everyday-makeup/raw/step-07.png` | `f908738c6198ece2145a090975dd6053…` | `9b3736a6f9139fb08743c92fc225801c…` |
| 08 | `tmp/gemini-image-handoff-2026-08-17/5-minute-everyday-makeup/raw/step-08.png` | `3b1da43ad6489dc860a96b21fde9b76e…` | `28854bd917db22eb0d8a4216098ec894…` |

#### easy-vacation-makeup

| 项 | 值 |
|---|---|
| 备份目录（旧正式资产，未删除） | `tmp/model-rebuild/easy-vacation-makeup/pre-gemini-integration-backup-2026-08-18`（17 个文件） |
| 审批源目录 | `tmp/model-rebuild/easy-vacation-makeup/gemini-approved-2026-08-18` |
| Hero 源 | `tmp/gemini-image-handoff-2026-08-17/easy-vacation-makeup/hero/hero-master.png` |
| Hero 源 SHA-256 | `093f8abeff9174811460ee8c22ed172b6cf4a24025563120bc60aba2421a0e7f` |
| Hero 正式文件 | `src/assets/recipes-v5/easy-vacation-makeup.webp` · 2560×1440 · SHA-256 `8779ad1722c97b781b9b3262935299db3119f53aebb6ec0a7ec887ea137192d8` |

| Step | 源文件 | 源 SHA-256 | 正式文件 SHA-256 |
|---|---|---|---|
| 01 | `tmp/gemini-image-handoff-2026-08-17/easy-vacation-makeup/raw/step-01.png` | `1a08c39f21bea6d18670fae52bd7349e…` | `5cf3f4b51aa85b4c21cf7a45f6b2b2c3…` |
| 02 | `tmp/gemini-image-handoff-2026-08-17/easy-vacation-makeup/raw/step-02.png` | `c6193b4dede0bbf3cb62be868f53c937…` | `0aa5a3daf57c4503b413f8e9d7854c9c…` |
| 03 | `tmp/gemini-image-handoff-2026-08-17/easy-vacation-makeup/raw/step-03.png` | `b276646fa03dc87458491675f0283a86…` | `b4aa9244578927df7ae46bc72404ee17…` |
| 04 | `tmp/gemini-image-handoff-2026-08-17/easy-vacation-makeup/raw/step-04.png` | `0f323a582b0775c96887f00202a85dc3…` | `7cec967b6475e3e843f4f94a6dbd3736…` |
| 05 **重画** | `tmp/native-imagegen-redraw-2026-08-18/easy-vacation-makeup/candidates/step-05-attempt-01.png` | `033cff7de5a189f4cab4118280a494d8…` | `949db19c66c12365888e0829cd31ed96…` |
| 06 **重画** | `tmp/native-imagegen-redraw-2026-08-18/easy-vacation-makeup/candidates/step-06-attempt-01.png` | `52cae450e34b4a97aaa1a992b517dbf9…` | `407771422ed81bd0810ac3e0f64a2bb3…` |
| 07 | `tmp/gemini-image-handoff-2026-08-17/easy-vacation-makeup/raw/step-07.png` | `7f28eadd20284e3a836170b63294e1b5…` | `de61506d0c99d539bca7086926ecfc18…` |
| 08 | `tmp/gemini-image-handoff-2026-08-17/easy-vacation-makeup/raw/step-08.png` | `7679915d8d4ca4d39e0207fa1e8f4abe…` | `ae7dca3ebce8ab547d008d3653a452af…` |

#### natural-makeup-mature-skin

| 项 | 值 |
|---|---|
| 备份目录（旧正式资产，未删除） | `tmp/model-rebuild/natural-makeup-mature-skin/pre-gemini-integration-backup-2026-08-18`（17 个文件） |
| 审批源目录 | `tmp/model-rebuild/natural-makeup-mature-skin/gemini-approved-2026-08-18` |
| Hero 源 | `tmp/native-imagegen-redraw-2026-08-18/natural-makeup-mature-skin/candidates/hero-attempt-01.png` **（重画）** |
| Hero 源 SHA-256 | `cf1f3465fef54c8c9d188f6367bac269e0b93ef0bedadc936a133df322191bd8` |
| Hero 正式文件 | `src/assets/recipes-v5/natural-makeup-mature-skin.webp` · 2560×1440 · SHA-256 `ec5bd43751b4cc5d5859c82421d21dc052a22cf4468d0da8bb1ed98f375e53c4` |

| Step | 源文件 | 源 SHA-256 | 正式文件 SHA-256 |
|---|---|---|---|
| 01 | `tmp/gemini-image-handoff-2026-08-17/natural-makeup-mature-skin/raw/step-01.png` | `20e616d62e8b0594b989dc32cec1362d…` | `878de1e5f94113358df9d33542f43378…` |
| 02 | `tmp/gemini-image-handoff-2026-08-17/natural-makeup-mature-skin/raw/step-02.png` | `dd975e419e187120d3333a89a0e7bb31…` | `7c51fdf538417daa84ecca7b3761e347…` |
| 03 | `tmp/gemini-image-handoff-2026-08-17/natural-makeup-mature-skin/raw/step-03.png` | `35515cc7c74083f26fb7d97c330a2bbb…` | `ad0be21aecec865a2c5069df3444150f…` |
| 04 | `tmp/gemini-image-handoff-2026-08-17/natural-makeup-mature-skin/raw/step-04.png` | `3bc761aa705905b6664e76e113fff074…` | `6a888e6b300e05863d8ed25b4b950e16…` |
| 05 | `tmp/gemini-image-handoff-2026-08-17/natural-makeup-mature-skin/raw/step-05.png` | `902856a233c90ea62e8d138c0d09dfa7…` | `87e47702847b1fd5d0503146504f7382…` |
| 06 **重画** | `tmp/native-imagegen-redraw-2026-08-18/natural-makeup-mature-skin/candidates/step-06-attempt-01.png` | `af3e8b98f5a5259b97e37bb2e376acaf…` | `c3bb4dfb9baa3eabd4fbf569341b82de…` |
| 07 | `tmp/gemini-image-handoff-2026-08-17/natural-makeup-mature-skin/raw/step-07.png` | `c0989edb2deab08df5ff1473604fbf36…` | `0d05fbed603f231abb83dcad7639c8d2…` |
| 08 | `tmp/gemini-image-handoff-2026-08-17/natural-makeup-mature-skin/raw/step-08.png` | `7bf9d2db5d26503df4df072a35f46757…` | `857e574c20f2f83286b5b30c090567ed…` |

#### natural-no-makeup-makeup

| 项 | 值 |
|---|---|
| 备份目录（旧正式资产，未删除） | `tmp/model-rebuild/natural-no-makeup-makeup/pre-gemini-integration-backup-2026-08-18`（17 个文件） |
| 审批源目录 | `tmp/model-rebuild/natural-no-makeup-makeup/gemini-approved-2026-08-18` |
| Hero 源 | `tmp/gemini-image-handoff-2026-08-17/natural-no-makeup-makeup/hero/hero-master.png` |
| Hero 源 SHA-256 | `448c9a58e8303255ef390ba7d2799726137c305289576bf5f2e1337f57469ba1` |
| Hero 正式文件 | `src/assets/recipes-v5/natural-no-makeup-makeup.webp` · 2560×1440 · SHA-256 `c82b9ec200e5cd830b1730b7b93e8fc9c6a0163331945aef4b23e25dc10ade0d` |

| Step | 源文件 | 源 SHA-256 | 正式文件 SHA-256 |
|---|---|---|---|
| 01 | `tmp/gemini-image-handoff-2026-08-17/natural-no-makeup-makeup/raw/step-01.png` | `2b0d59e7cad3e28636c7af3bb2b1dbf4…` | `490103f40c176a3460b73ff719d1073a…` |
| 02 | `tmp/gemini-image-handoff-2026-08-17/natural-no-makeup-makeup/raw/step-02.png` | `e69bb0488f3ef04c6385ee88b5fc4683…` | `db2ff5c4a0d0969f65d7e66a1c2a2e85…` |
| 03 **重画** | `tmp/native-imagegen-redraw-2026-08-18/natural-no-makeup-makeup/candidates/step-03-attempt-02-brow-detail.png` | `9df552687a7c09833859117604d4f235…` | `726547c61d96be2a162a44ade6c25044…` |
| 04 | `tmp/gemini-image-handoff-2026-08-17/natural-no-makeup-makeup/raw/step-04.png` | `0dba8b453bc715ec5dde694cf6ac54a1…` | `289f8f63deeb96617c0d9589c87af40a…` |
| 05 | `tmp/gemini-image-handoff-2026-08-17/natural-no-makeup-makeup/raw/step-05.png` | `fdbdc68c5e1d0e71c18339f2c0c21492…` | `a0bce90e1f3b3a5186f80304bd2cd4ab…` |
| 06 | `tmp/gemini-image-handoff-2026-08-17/natural-no-makeup-makeup/raw/step-06.png` | `991678c2e255ebe3f63ac61f54dc98b2…` | `bd2e9dcb19934f8c8ea9cc9102510e82…` |
| 07 | `tmp/gemini-image-handoff-2026-08-17/natural-no-makeup-makeup/raw/step-07.png` | `16e6509990e3a9e5369166a3cee3720e…` | `eaca6885f6b2bba5fa9635ea1ac4741b…` |
| 08 | `tmp/gemini-image-handoff-2026-08-17/natural-no-makeup-makeup/raw/step-08.png` | `954ba322efb13a4a35f14627505f6ed2…` | `1f6b81b2a53b16fa07637f0bf764feae…` |

#### warm-bronze-makeup-medium-skin

| 项 | 值 |
|---|---|
| 备份目录（旧正式资产，未删除） | `tmp/model-rebuild/warm-bronze-makeup-medium-skin/pre-gemini-integration-backup-2026-08-18`（17 个文件） |
| 审批源目录 | `tmp/model-rebuild/warm-bronze-makeup-medium-skin/gemini-approved-2026-08-18` |
| Hero 源 | `tmp/gemini-image-handoff-2026-08-17/warm-bronze-makeup-medium-skin/hero/hero-master.png` |
| Hero 源 SHA-256 | `ec8c4da6842b9df76bd57ee47c2046f8d4435f298cd49feb35034fbed3620d1b` |
| Hero 正式文件 | `src/assets/recipes-v5/warm-bronze-makeup-medium-skin.webp` · 2560×1440 · SHA-256 `0fd528bce939b4f9c77602e101fe586ce3c129c22c0f7864f294a6894377785e` |

| Step | 源文件 | 源 SHA-256 | 正式文件 SHA-256 |
|---|---|---|---|
| 01 | `tmp/gemini-image-handoff-2026-08-17/warm-bronze-makeup-medium-skin/raw/step-01.png` | `52048ebff7fda0d14ab837932fc0f70a…` | `b85b5e156effccb9d32424d1934081ae…` |
| 02 | `tmp/gemini-image-handoff-2026-08-17/warm-bronze-makeup-medium-skin/raw/step-02.png` | `6ed5f94363a120b1139a3e11ad651f1e…` | `ba93dda42b242db0e0412fbaeeecd414…` |
| 03 **重画** | `tmp/native-imagegen-redraw-2026-08-18/warm-bronze-makeup-medium-skin/candidates/step-03-attempt-01.png` | `65a3c474182540e3c8c2028293ce1688…` | `5ed76f14d3183aa85000216eee9f12d8…` |
| 04 | `tmp/gemini-image-handoff-2026-08-17/warm-bronze-makeup-medium-skin/raw/step-04.png` | `5bceb045be8e4372cf8f0a782389fa0b…` | `6f9cea162ece2c01a9dd11d9d2dee1f0…` |
| 05 | `tmp/gemini-image-handoff-2026-08-17/warm-bronze-makeup-medium-skin/raw/step-05.png` | `0b9f1666bbfbe2df408533fe65bd10fa…` | `fe8ede1f18339e39d9b521ffa5d18575…` |
| 06 | `tmp/gemini-image-handoff-2026-08-17/warm-bronze-makeup-medium-skin/raw/step-06.png` | `2f2a8fca4fabd58e44ff54b8cec50e3e…` | `f51ae5b1e3c0fa3a8fd520f634b1bced…` |
| 07 **重画** | `tmp/native-imagegen-redraw-2026-08-18/warm-bronze-makeup-medium-skin/candidates/step-07-attempt-02.png` | `39edfa08b502a9c096442586a7513965…` | `91029eb002ce93299166b301fe73a665…` |
| 08 | `tmp/gemini-image-handoff-2026-08-17/warm-bronze-makeup-medium-skin/raw/step-08.png` | `438768ceb450f9ee6b2741cd613cdd81…` | `be452343a578fc6397af7b789b245a3d…` |

#### 数据与审计

- `src/data/model-identity-registry.json`：以上 9 个 slug 的身份描述（skin/face/eyes/hair/identityMarkers/wardrobe/backdrop/apparentAge）全部改写为新模特，modelId 保持不变；`updatedAt` 更新为 2026-08-18。已完成的 13 套条目未改动。
- `src/data/recipes.json`：仅这 9 个 slug 的 `updatedAt` = `2026-08-18`、`stepImagesReviewedAt` = `2026-08-18T10:30:00.000Z`。
- `src/data/tutorial-step-image-reviews.json`：`--sync` 后 72 条转 pending，再按 recipe 逐套写入 8 条具体审核记录，reviewer = `Claude visual QA gate (AI-assisted)`。
- 审计结果：
  - `audit:model-identities`（--strict-assets）：通过，24 recipes / 24 unique model IDs / production assets checked。
  - `audit:step-images`：物理集合 24 套全通过；review 严格模式 192 approved / 0 pending。
  - `audit:content`：通过，24 recipes / 192 steps / 192 unique step images。
  - `check`（astro check）：0 errors / 0 warnings / 2 hints。
- 说明：`pnpm` 未安装在本机，四项审计以 `npm run` / `node scripts/*.mjs` 等价执行。
- 已知偏差：`natural-no-makeup-makeup` 的 step-03 重画原图为 1449×1086（规范为原生 1448×1086），因其唯一 1448 版本仍是不合格的整脸构图而选用；导出的 1280×960 正式文件不受影响。

#### 2026-08-18 — Natural No-Makeup Step 3 source correction

| 项 | 值 |
|---|---|
| 原问题 | 已接入的 Step 3 原始源为 1449×1086，不符合原生 4:3 门槛。 |
| 新源 | `tmp/native-imagegen-redraw-2026-08-18/natural-no-makeup-makeup/candidates/step-03-attempt-04-native-4x3.png` · 1448×1086 PNG · SHA-256 `79b50bd9fdb312d41dacfc81801d87578633ad6f22077fb6579c2b74e14f88af` |
| 备份 | `tmp/model-rebuild/natural-no-makeup-makeup/pre-native-step03-correction-backup-2026-08-18/` |
| 正式输出 | `src/assets/tutorial-steps/natural-no-makeup-makeup/step-03-curated.webp` · SHA-256 `12be006e284a795a8d05c98e4a3e30780fb74df8753a54f3655c77d3f70972d5` |
| 验证 | `audit:model-identities`、`audit:step-images --strict`、`audit:content` 通过；`check` 正在本次会话完成。 |

#### 2026-08-18 — Native redraw continuation: deep-set / rich berry gate

| 项 | 值 |
|---|---|
| 规范变更 | `docs/image-generation-system.md` 已去除 `everyday-makeup-deep-set-eyes` 与 `rich-berry-gold-makeup-deep-skin` 的强制深肤色模特限制；两者改为不限定具体肤深/种族，以妆容清晰、身份一致、广告力和真实肤理为准。 |
| `everyday-makeup-deep-set-eyes` | 新东亚身份链位于 `tmp/model-rebuild/everyday-makeup-deep-set-eyes/asian-identity-reset-2026-08-18/`；Hero + Step 01-08 均已生成，步骤尺寸均为 1448x1086；机械审计通过。人工复核后 Step 06、Step 07 仍有可见重复弯曲微纹理，强档 normalizer 也未彻底消除，因此整套暂不接入正式路径。 |
| `rich-berry-gold-makeup-deep-skin` | 新东南亚身份链位于 `tmp/model-rebuild/rich-berry-gold-makeup-deep-skin/asian-identity-reset-2026-08-18/`；Step 01-07 已有 1448x1086 源图，但 Step 07 有强重复指纹/蚀刻纹理；Step 08 两次候选均硬拒，证据为 `rejected/step-08-attempt-01-strong-repeated-microtexture.png` 与 `rejected/step-08-attempt-02-strong-repeated-microtexture.png`。 |
| 历史完整链复核 | `rich-berry-gold-makeup-deep-skin/identity-reset-2026-08-18/`、`rebuild-clean-v2/`、根目录旧 `sources/` 虽均为 8/8，但均为旧黑人模特方向，且不符合用户本轮“不要黑色人种，换其他种族色彩”的要求；继续冻结，不接入。 |
| 当前工具状态 | 本次恢复后的会话没有暴露内置 `image_gen` 工具；本机 `OPENAI_API_KEY` 缺失；按用户要求不使用 Gemini 或其他外部绘图工具。因此当前不能继续原生重画，只能完成审计和记录。 |
| 下一步 | 恢复内置 image generation 能力后，优先重画 `everyday-makeup-deep-set-eyes` 的 Step 06、Step 07；并为 `rich-berry-gold-makeup-deep-skin` 重画 Step 07、Step 08，若同身份继续出纹理，则直接换全新非黑人身份重新生成 Hero + Step 01-08。 |

## 单次生成会话记录模板

复制本节并按日期追加，不覆盖历史记录。

### YYYY-MM-DD — Session N

- Recipe：
- 今日计划：
- 原始候选：
- 审核通过 Hero：
- 审核通过步骤：
- 拒绝数量：
- 拒绝原因：`A / C / M / P / I / BG / T / Q / D`
- 完成整套：
- 已接入正式资产：
- 移动端 QA：`360 / 390 / 430`
- 构建与内容审计：
- 核心累计：`0 / 156`
- 追加累计：
- 全部累计：
- 当前最终目标：
- 剩余：
- 下一步：
