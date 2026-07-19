# HueSteps 详细妆容教程内容标准

> 状态：v1.0（基于 `src/data/recipes.json` 的 24 篇教程全量审计）  
> 适用范围：所有可索引妆容教程页、教程图片、编辑流程与发布 QA  
> 核心原则：Pinterest 长图只能是分发素材，不能代替网页教程；字数不是价值，独有判断、可执行步骤和可靠复核才是页面值得被收录的理由。

## 1. 结论与发布决策

当前 24 篇教程已有基本元数据、步骤、适配和纠错字段，但整体仍处在“统一模板填色”的阶段，不应直接把现有结构当作未来批量生产模板。主要风险不是某一篇特别短，而是所有页面以近乎相同的八步顺序、用量和完成标准展开，信息增益不足，且若干步骤存在标题、动作、使用部位互相矛盾的问题。

发布决策：

- 保留现有 URL，不为同义关键词继续扩页。
- 新教程在本标准落地前不得按旧结构批量上线。
- 现有教程按“一个完整样板页 → 每个 hub 一篇 → 其余页面分批”的顺序升级。
- 未达到独立搜索意图、逐步图片和人工复核门槛的页面，不应进入索引型 sitemap；应继续完善、合并到更强页面，或暂不发布。
- 本标准只能降低薄页、重复页和低信任风险，不能承诺 Google 一定收录。

## 2. 当前数据审计

### 2.1 审计口径

审计对象为 `src/data/recipes.json` 全部 24 条记录。统计包含顶层字段、嵌套字段、每页可见教学文本近似字数、完全重复字段和全页教学文本的词频余弦相似度。相似度只作为内部“换皮风险”信号，不代表 Google 的算法或收录阈值。

### 2.2 已确认事实

| 项目 | 全量结果 | 判断 |
| --- | ---: | --- |
| 教程数量 | 24 | 分布于 4 个 hub：occasion 8、eye shape 6、skin tone 5、everyday 5 |
| 顶层字段 | 每篇均为同一组 28 个字段 | 结构完整但过度齐整 |
| 步骤数量 | 24 篇全部固定 8 步 | 步数由模板决定，而非真实任务决定 |
| 其他数组数量 | palette、before、placement、adjustment、mistake、product 均固定 3 项 | 明显的批量模板信号 |
| 近似教学字数 | 每篇约 653–711 个英文词，平均约 677 | 按描述、意图、答案、palette、步骤、适配、纠错和产品等教学字段估算；区间仅相差 58 词，且大量内容来自结构字段，不足以证明页面厚度 |
| 当前页面使用的独有教学字段 | 每篇约 609–663 个英文词，平均约 632 | 不含页面共享 UI 文案；进一步说明现有主体仍偏短 |
| 来源 | 24 篇 `sources` 全为空数组 | 无法追溯需要证据的事实或产品判断 |
| 图片字段 | 仅有 `heroImage` / `heroAlt` | 数据层无法支持每一步独立图片 |
| FAQ | 无字段 | 无法系统回答真实的后续疑问 |
| 编辑身份 | 24 篇作者与复核者均为同一组织 ID | 不能证明发生过独立二审 |
| 日期 | 24 篇发布日期和更新日期完全相同 | 当前批量生成痕迹明显；未来不能用构建时间制造“更新” |
| AI 图片 | 24 篇均标记 `aiGenerated: true` | 已披露是优点，但缺少逐图一致性复核记录 |
| 内链 | 所有 `relatedRecipes` slug 均有效 | 基础完整，但缺少关系、锚文本和推荐理由 |

### 2.3 重复度与模板风险

- 六个步骤标题在全部 24 篇中完全相同：`Prepare the surface`、`Even only what needs it`、`Set the brow frame`、`Add lash definition`、`Balance cheeks and lips`、`Refine and set`。
- 192 个步骤的 `amount` 只有 8 个唯一值；每个位置的用量在 24 篇中完全相同。
- 192 个步骤的 `completeWhen` 只有 8 个唯一值；每个位置的完成标准在 24 篇中完全相同。
- `placement` 192 项仅 53 个唯一值；其中五个泛化位置分别在 24 篇中重复。
- 24 篇的教学主体共形成 276 个页面对，词频余弦相似度为 0.796–0.934，平均 0.854。最高相似页面对是 `soft-glam-wedding-guest-makeup` 与 `soft-glam-hooded-eyes`，为 0.934。
- 将准备、步骤、位置、适配、错误和产品字段拆成标量后，共 1,824 个教学值；其中 1,061 个值落入“至少重复一次”的完全相同文本组，占 58.2%。该比例不是重复字数比例，但足以表明大量教学判断来自共享壳层。
- 产品建议的 Budget / Mid-range / Luxury 三条选择理由，在 24 篇中分别原样重复 24 次；只是把每页的产品角色替换进去。

允许共享的是 UI 标签和少量真正通用的安全提示，不允许把共享文案混入页面独有教学内容来制造厚度。通用内容应由组件提供，页面数据只存该教程特有判断。

### 2.4 内容一致性问题示例

以下不是文风问题，而是会妨碍用户实际完成妆容的语义错误：

- `polished-office-makeup-10-minutes` 第 5 步位置是“upper cheek and lips”，动作却说把颜色压入焦点区域、不要扫过“whole eye”；第 7 步标题为平衡腮红和唇妆，实际动作和位置却是 soft brown / outer upper lash line。
- `fresh-brunch-makeup` 第 4 步把 apricot cream 写成“first eye-shape guide”，位置却是 upper cheek and lips；第 7 步仍以腮红唇妆为标题，实际操作 caramel brown upper lash line。
- `easy-vacation-makeup` 第 4 步的 sheer bronze 同时指向 lid and outer cheek，第 7 步标题为 cheeks and lips，实际是 espresso upper lash roots。
- 多个眼型教程第 7 步标题仍为 `Balance cheeks and lips`，实际是在处理眼线、睫毛根部或眼影外缘。
- 所有第 8 步都复用 `only areas that crease, transfer, or need final balance`，即使真实动作分别发生在嘴唇、脸颊、睫毛或眼皮，位置字段也没有对应动作。

这说明旧模型把“第几个位置应该出现什么字段”放在了“这个教程真实需要什么步骤”之前。升级时必须重新编排任务，不能只把旧句子扩写。

### 2.5 缺失的信息增益

当前模型无法表达或不能充分表达：

- 每一步的独立图片、图注、图片中应看到的阶段状态，以及图片与文字的一致性复核。
- 该步骤为什么有效、刷具运动方向、具体范围、耗时和与前一步的依赖。
- 失败后的即时恢复动作；现有 `commonMistakes` 只在页面后部集中出现，无法就地纠错。
- 同一步骤针对眼型、肤色、底色或熟练度的精确变化。
- 教程独有的技巧、决策表、时间分配、替代路径和“不适合谁”。
- 真正的工具清单、产品质地和选色标准，以及产品信息的核验日期。
- 用户常问问题、对应步骤和简明回答。
- 来源支持了哪项陈述、来源类型、访问日期、编辑试做或视觉复核状态。
- 更新日志、下次复核日期、内容为何发生实质更新。

### 2.6 优先级

**P0**

- 仅凭数据文件未确认 robots、canonical、状态码等技术型 P0；这些必须在最终构建 HTML 中另行审计。

**P1**

- 修正标题、动作、位置和产品角色冲突，阻止错误教程继续批量复制。
- 增加逐步图片数据模型与渲染能力；单张 hero 或 Pinterest 合成长图不计作逐步教程。
- 取消固定八步和固定三项结构，让步骤由真实任务决定。
- 为每页建立独立意图和信息增益门槛，降低近重复和换皮页风险。
- 建立独立人工二审、视觉一致性复核和来源映射。

**P2**

- 增加 FAQ、带理由的内链、更新日志、图片尺寸/图注和产品核验字段。
- 建立自动重复度、字段完整性、图片存在性和链接有效性检查。

## 3. 页面产品结构

### 3.1 页面必须完成的用户任务

每个教程只服务一个主任务，例如：

- 在 hooded eyes 上让 soft glam 睁眼后仍可见。
- 在 10 分钟内完成适合办公室室内光线的妆容。
- 在 deep skin 上使用 berry 与 gold 而不出现发灰边缘。

“介绍一种好看的妆”不是合格主任务。标题、首屏答案、每个步骤、适配、FAQ 和内链都应围绕同一个结果。如果两个拟建页面给出的步骤、适配和结果几乎相同，应合并为一个强页面，而不是换关键词建两个 URL。

### 3.2 推荐页面顺序

1. 面包屑、唯一 H1、最终效果图和 2–3 句直接答案。
2. `At a glance`：时间、难度、完成效果、适合对象、不适合或需要调整的对象。
3. `What makes this look work`：2–4 条该妆容独有的视觉逻辑，不写空泛卖点。
4. 工具与产品角色：先告诉用户使用现有产品的选色、质地和刷具标准，再出现可选商品。
5. 开始前准备：每项包含动作、原因和完成检查点。
6. 逐步教程：每一步独立图片与完整文字必须在同一卡片中，图片不可与对应动作分离。
7. 第一个完整步骤组之后可预留广告位；不得插在步骤标题、图片与说明之间。
8. 其余步骤与最终检查。
9. 针对眼型、肤色、底色、熟练度或场景的适配矩阵。
10. 常见错误：症状 → 原因 → 当下修复 → 下次预防。
11. 1–3 个有实质差异的变体，例如更柔和、夜间加强或五分钟路线。
12. FAQ、来源/方法、复核日期和更新说明。
13. 3–6 条有理由的相关教程内链。

Pinterest 合成长图可在页面底部作为分享资产，或由网页步骤素材自动生成；它不能代替上述任何核心内容，也不计入页面独立步骤图数量。

### 3.3 广告与内容关系

- 广告位只能出现在完整语义区块之间，例如工具清单之后、步骤 3 之后或适配区之后。
- 不得把广告放在某一步的图片和动作说明之间，也不得让广告比首屏直接答案更早出现。
- 页面不能为了增加广告位把一个动作拆成多个没有独立结果的伪步骤。
- 广告标签、留白和高度预留应清楚，不能伪装成产品推荐或造成布局跳动。
- 页面内容应在关闭广告或广告未填充时仍然完整、连贯。

## 4. 可扩展内容模型 v2

### 4.1 顶层结构

建议引入 `schemaVersion: 2`，保留 slug 与 hub 兼容现有路由。顶层结构如下：

| 对象 | 必需内容 | 作用 |
| --- | --- | --- |
| `identity` | id、slug、hub、title、description | 稳定页面身份与搜索摘要 |
| `intent` | primaryQuery、primaryIntent、directAnswer、audience、userOutcome、notFor、differentiators | 证明页面为何独立存在 |
| `editorial` | publishedAt、updatedAt、author、reviewer、reviewedAt、nextReviewAt、status、aiAssistance、changeLog | 真实责任人与更新记录 |
| `lookProfile` | difficulty、time、finish、coverage、occasion、eyeShapes、skinTones、undertones、skillPrerequisites | 快速适配判断 |
| `visuals` | hero、final、optional before、socialComposite | 页面级素材；social composite 不能替代步骤图 |
| `palette` | shade role、texture、finish、placement、selection rule、substitute | 从颜色名升级为可选购/可替代的功能说明 |
| `tools` | id、type、purpose、substitute | 可被步骤引用的刷具与辅助工具 |
| `products` | id、role、format、finish、shadeGuide、amountGuide、substitute、可选商品 | 角色优先，商品次要 |
| `preparation` | action、why、checkpoint | 开始前准备不是孤立提示 |
| `steps` | 见 4.2 | 教程核心 |
| `adjustments` | condition、stepIds、change、why、checkpoint | 让适配落到具体步骤 |
| `mistakes` | symptom、stepIds、cause、fixNow、preventNext | 可诊断、可恢复 |
| `variations` | useCase、changes、resultDifference | 提供真正不同的分支，而非同义改写 |
| `faq` | question、shortAnswer、detail、stepIds、sourceIds | 回答真实后续问题 |
| `sources` | id、type、publisher/author、title、url、accessedAt、supports | 将证据映射到具体陈述 |
| `internalLinks` | targetSlug、relation、anchor、reason | 可解释的主题路径 |
| `qa` | technique、visual、editorial、seo、approvedAt | 发布门禁，不必全部公开展示 |

### 4.2 步骤对象：每一步都必须能独立完成

每一步建议包含以下字段：

| 字段 | 必需 | 内容要求 |
| --- | --- | --- |
| `id` / `order` | 是 | 稳定 ID 与真实顺序；禁止按模板硬凑八步 |
| `title` | 是 | 以结果或明确动作为标题，例如“把 taupe 放到睁眼可见的位置” |
| `outcome` | 是 | 本步结束后相较上一步发生了什么可见变化 |
| `image` | 是 | 独立图片对象；见 4.3 |
| `toolIds` / `productIds` | 是 | 引用工具和产品角色，不能只写模糊的“brush”或“shade” |
| `action` | 是 | 2–4 句，包含顺序、手法、范围和停手条件 |
| `placement` | 是 | 使用可定位的解剖/面部参照，而非 `as described` 或 `recipe-specific direction` |
| `motion` | 是 | press、stamp、short outward strokes、small circles 等，并说明方向 |
| `amount` | 是 | 可感知量级，例如“一次轻蘸后先卸掉一半粉”，避免所有页面统一一句 |
| `durationSeconds` | 建议 | 适用于晕染、等待成膜、快速路线等场景 |
| `whyItWorks` | 是 | 解释该动作如何服务本页结果，而非泛化美妆常识 |
| `checkpoint` | 是 | 用户照镜子可判断的完成标准，必须与本步独有结果一致 |
| `ifWrong` | 是 | 出现过深、过宽、不对称、结块等情况时的即时修复 |
| `adaptationRefs` | 条件必需 | 引用与本步有关的眼型/肤色适配 |
| `safetyNote` | 条件必需 | 仅在眼部卫生、过敏风险等确有必要时出现，不制造医疗结论 |

步骤标题、动作、位置、图片和完成标准必须指向同一面部区域和同一阶段结果。任何一项冲突均为发布阻断项。

### 4.3 图片对象

所有 `hero`、`final`、`step.image` 和可选适配图使用统一图片对象：

```json
{
  "src": "soft-glam-hooded-eyes-step-04-taupe-placement.webp",
  "alt": "Taupe shadow placed just above the hood fold and visible while the eye is open.",
  "caption": "Keep the upper edge below the brow bone; only the softened taupe should remain visible with eyes open.",
  "width": 1280,
  "height": 960,
  "kind": "step-state",
  "aiGenerated": true,
  "disclosure": "AI-assisted instructional visualization, editorially checked against this step.",
  "shows": ["taupe above hood fold", "clean mobile-lid center"],
  "mustNotShow": ["shadow touching brow", "closed-eye-only placement"],
  "reviewStatus": "approved"
}
```

图片硬规则：

- 每个核心步骤至少一张独立图片；hero、final 和 Pinterest composite 不计入。
- 教程 hero 必须来自可安全裁成 16:9 的横向高清母版，生产文件不得低于 1920×1080，并输出 480、720、960、1280、1600、1920 响应式档位；720px 宽不得作为最高源图。
- 图片必须显示“该步完成后的状态”和相对前一步新增的妆效；不能用成品图裁切、轻微调色或重复人像冒充步骤变化。
- 每一步只能出现当步及此前已经完成的妆效，不得提前泄露后续眼影、眼线、下眼影、睫毛或唇颊效果。
- 以当前教程步骤定义为唯一进度依据，不把通用全脸流程硬套到专项教程：眼型教程从第 1 步到第 8 步保持底妆、腮红和唇色不变，只递进当前命名的眼部区域；全脸教程的唇颊也只能在各自命名步骤首次变化。
- 同一教程必须从 Pinterest Pin、网页 hero/final 到全部步骤图保持同一人物身份；脸型、五官、年龄感、肤色深浅、冷暖底调、眼色、发际线等身份特征不得漂移，方向、白平衡、光线和裁切也应保持可比较的一致性。不同教程禁止复用同一模特身份。
- `progressive-high-detail-v2` 源图与交付图均不得低于 1280 × 960，统一使用 4:3 比较画幅。应能看见自然毛孔、眼皮细纹、细小绒毛、轻微眼下纹理及真实粉质；磨皮、塑料皮、虚焦和过度锐化均为发布阻断项。
- 一步一图，不做拼图，不在步骤图中烧录步骤编号或说明文字；标题、操作方法和图注由网页的可访问 HTML 承担。
- 眼型教程必须至少包含睁眼视图；不能只用闭眼图证明 hooded / monolid 等位置可见。
- 方向必须一致。若为镜像或左右眼示范，正文和图注要明确说明。
- AI 图必须逐张做解剖、肤色/底调、白平衡、颜色、步骤顺序、皮肤质感和工具接触位置复核；明显眼球、睫毛、眉毛或皮肤畸形必须重做，不得靠缩小图片掩盖。
- AI 图不得暗示真实产品试用、持妆测试或专业认证。
- alt 描述图中对完成步骤有用的信息；caption 解释用户需要观察什么。两者不能为关键词堆叠，也不能逐字相同。
- 由这些已审核步骤图和同一人物 hero 派生 Pinterest 长图，不反向从一张长图裁切后假装成完整网页教程。Pin、落地页 hero 与八步图必须是同一人物和同一妆容承诺；任一不一致均为发布阻断项。

新增教程默认必须采用 `progressive-high-detail-v2`。迁移清单 `src/data/tutorial-visual-migrations.json` 只允许现有待升级页面暂时使用 `legacy-focus-guide-v1`；新 slug 不得加入该清单以绕过生图和人工审核。升级完成后从清单中移除对应 slug，并填写 `stepImagesReviewedAt`。

### 4.4 示例步骤

```json
{
  "id": "map-visible-taupe",
  "order": 4,
  "title": "Map taupe where it stays visible",
  "outcome": "A soft lifted guide remains visible above the hood while the center lid stays clean.",
  "image": {
    "src": "soft-glam-hooded-eyes-step-04-taupe-placement.webp",
    "alt": "Taupe mapped above the hood fold on an open eye.",
    "caption": "Look straight ahead: the upper third of the taupe should remain visible.",
    "width": 1280,
    "height": 960,
    "kind": "step-state",
    "aiGenerated": true,
    "reviewStatus": "approved"
  },
  "toolIds": ["small-tapered-blending-brush"],
  "productIds": ["matte-neutral-taupe"],
  "action": "Look straight ahead and mark the top edge 2–3 mm above the fold. With the eye half open, connect that mark to the outer lash line using short upward strokes. Soften only the upper edge with a clean brush; keep the lower edge intact so the lift does not disappear.",
  "placement": "From the outer third of the upper lash line toward the brow-tail direction, ending below the brow bone.",
  "motion": "Short outward-and-upward strokes, followed by tiny circles only on the upper border.",
  "amount": "One light brush pickup, tapped off before contact; add a second pickup only at the outer third.",
  "durationSeconds": 75,
  "whyItWorks": "Placing the guide above the fold keeps the gradient visible when the hood covers the mobile lid, while preserving a lifted outer direction.",
  "checkpoint": "With both eyes open, a narrow taupe haze is visible and neither eye has a lower or heavier outer corner.",
  "ifWrong": "If the shadow reaches the brow bone, lift the upper edge with a clean brush and restore space with a small amount of base shade.",
  "adaptationRefs": ["deep-skin-taupe-depth", "downturned-eye-endpoint"]
}
```

这个示例展示字段深度，不要求所有步骤使用相同句式。编辑者应根据动作复杂度调整长度。

### 4.5 产品与工具

产品内容先回答“需要什么”，再回答“可以买什么”。每个产品角色至少包含：

- 质地与 finish，例如 matte powder、flexible cream、smudgeable pencil。
- 选色规则，以相对肤色/底色和最终效果描述，不只给一个颜色名。
- 该教程中的用量和应用区域。
- 至少一种合理替代品或“不必购买”的复用方法。
- 若出现具名商品：merchant、URL、核验日期、库存/色号不确定性和商业披露。
- Budget / Mid-range / Luxury 只有在公式、色号、工具精度或体验确有可解释差异时才使用；不得用同一段理由换三个价格标签。

### 4.6 来源与复核

不是每个审美动作都需要外链，但每个可核实的事实、产品信息、卫生/安全提示和“适合/持久/防水”等声明必须有来源或明确的编辑依据。

`sources` 至少记录：

- `id`：供步骤、FAQ 或产品声明引用。
- `type`：official、manufacturer、professional-reference、editorial-method、community-signal、inference。
- `title`、publisher/author、URL（如适用）、`accessedAt`。
- `supports`：具体支持哪些 claim ID，不能只在页尾堆链接。
- `limitations`：来源没有证明什么，或结论适用范围。

`editorial-method` 应记录教程是否由真实编辑按步骤走查、使用何种复核清单以及发现了什么，不得把 AI 生成后浏览一遍写成“tested”。作者与复核者必须是不同的责任人；若无法完成独立复核，应移除“reviewed”暗示并保持草稿状态。

### 4.7 FAQ 与内链

- 每页通常提供 4–8 个真实问题；问题来自该任务的决策点、失败点和适配差异，而不是把小标题改成问句。
- 答案先用 1–2 句直接回答，再补充必要原因，并链接到相关步骤 ID。
- FAQ 是为用户完成任务服务，不以富结果为承诺；结构化数据只能反映页面可见内容，并须在上线时再次核对当前搜索规范。
- 每页 3–6 条内链，每条记录 `relation`（prerequisite / alternative / adaptation / next-look）、自然锚文本和推荐理由。
- 不使用“read more”作为唯一锚文本；不为了数量互相循环链接无关页面。

## 5. 页面厚度与信息增益门槛

### 5.1 内部内容量基线

以下是 HueSteps 的编辑运营基线，不是 Google 的排名或收录规则：

- 完整教程建议有 1,400–2,200 个可见英文编辑词，复杂教程可更长；不含导航、广告标签、结构化数据和重复 UI 文案。
- 核心步骤通常为 5–12 步，由实际任务决定；每一步通常 80–160 个有意义的英文词，短动作可以少，但仍需动作、原因、完成判断和修复。
- FAQ 通常 4–8 项；适配至少覆盖与该页面主意图真正相关的 2–4 种条件。
- 不以凑字达标。若 1,200 词即可完整解决一个狭窄任务，可由编辑负责人说明例外；若 2,000 词仍只是重复通用底妆步骤，则仍不合格。

### 5.2 每页至少三类独有信息增益

每页至少包含下列三类，并且内容必须对该教程特定：

1. 精确位置图或逐步状态图。
2. 眼型/肤色/底色适配矩阵。
3. 失败症状诊断与即时修复。
4. 时间分配或快速路线。
5. 选色/质地决策表。
6. 与近邻教程的差异说明。
7. 编辑走查记录或有边界的来源结论。
8. 最终效果检查表，包括正面、侧面或不同光线下观察点。

### 5.3 反换皮规则

- 通用步骤可以共享概念，不能逐页原样共享完整动作、位置、用量和完成标准。
- 新页面立项时必须写出三个不可被 sibling 页面替代的判断；写不出则合并。
- 自动 QA 应排除 UI 标签后检查正文：若任一 sibling 页面对的相似度超过内部预警线，或精确复用句子超过正文的 15%，必须人工比较搜索意图和信息增益后才能发布。预警不是自动判定重复，也不能被同义词替换规避。
- 禁止为了降低机器相似度做无意义改写；应改变真正的步骤、决策、图像、适配和结果。
- 诸如“work in thin layers”这类通用提示应放到全站组件或方法页，不应在 24 篇正文中反复作为独有内容计数。

## 6. 新教程编辑 SOP

### 阶段 A：URL 准入与内容 brief

1. 写明主查询、搜索意图、用户完成后的可观察结果和适用人群。
2. 对照现有教程，记录最接近的 2–3 个页面以及本页不可替代的差异。
3. 写出 `notFor` 和需要调整的情况，避免承诺适合所有人。
4. 预先列出至少三类信息增益和所需图片。
5. 若只是颜色、场合或人群词替换，合并到现有页面的 variation / adjustment，不创建 URL。

产出：一页 brief；由产品/SEO 编辑批准后才进入制作。

### 阶段 B：真实任务拆解

1. 先写最终效果和判断标准，再倒推必要步骤。
2. 每一步必须造成可见变化或完成必要依赖；无法描述变化的步骤应与相邻步骤合并。
3. 先完成步骤标题、产品/工具引用、位置和依赖图，再写段落。
4. 检查总时长是否与每步耗时和等待时间一致。
5. 快速教程优先删掉低收益动作，不可把完整 30 分钟教程压成同样八步后宣称 5 分钟。

产出：步骤 storyboard 和工具/产品清单。

### 阶段 C：图片计划与制作

1. 为 hero、final、每个核心步骤和必要适配图编写 shot list。
2. 每张图在生成/拍摄前定义 `shows`、`mustNotShow`、方向、光线、裁切和肤色/眼型。
3. 逐步制作独立图片；保持人物和视角连续。
4. 图片完成后先做视觉一致性审核，再写最终 alt 和 caption。
5. 所有步骤图通过后，才派生 Pinterest composite 和社交分享图。

产出：完整资产清单与逐图审核状态。

### 阶段 D：正文、适配和纠错

1. 按 4.2 写每一步，不复用旧页整句作为起稿模板。
2. 在步骤内提供就地修复；在页后错误区提供症状诊断和预防。
3. 让每个 adjustment 引用具体步骤 ID，并描述改变后的完成标准。
4. 增加与主任务最相关的 FAQ、变体和最终检查表。
5. 通读时只看标题、图片、checkpoint，确认用户即使快速浏览也能理解进展。

产出：可供技术复核的完整 JSON / 内容文件。

### 阶段 E：产品、来源与信任

1. 先写功能角色、质地、选色和替代品，再决定是否需要具名商品。
2. 给事实声明、产品信息和安全提示分配 claim ID 与 source ID。
3. 明确 AI 参与了图片、研究、初稿还是其他环节。
4. 技术复核者确认动作、顺序和适配；视觉复核者确认所有图片与文字一致。
5. reviewer 必须是独立责任人，并记录日期与具体通过项。

产出：来源映射、审核记录和商业披露。

### 阶段 F：SEO 与构建 QA

1. title、description、H1、direct answer 均为唯一且与同一主意图一致。
2. 页面首屏直接回答任务，不以长背景或广告阻挡。
3. canonical 自指、HTTP 状态、robots、sitemap、trailing slash 和最终 host 一致。
4. 最终生成 HTML 中存在主要正文、H1、图片 alt、可抓取内链、Article/Breadcrumb 数据和真实日期。
5. 所有结构化数据只描述可见内容；不得标记未显示 FAQ、虚构评价或不真实测试。
6. 检查图片文件存在、尺寸稳定、hero 优先加载、首屏以下步骤图懒加载。
7. 检查断链、孤儿页、related slug、重复标题/描述和 sibling 相似度预警。
8. 在移动端和无 JavaScript 情况下完成一次从准备到最终检查的阅读走查。

产出：自动 QA 报告、构建 HTML 抽查和发布批准。

### 阶段 G：发布后

1. 仅在内容、图片、来源或用户路径发生实质变化时更新 `updatedAt` 和 sitemap `lastmod`。
2. 记录 GSC 的发现、抓取、索引和查询数据；状态变化可能滞后，不把重新提交 sitemap 当作内容修复。
3. 对有曝光无点击页面检查标题/意图，对已抓取未收录页面优先检查重复、薄内容和信息增益。
4. 每 6 个月复核核心教程；具名商品链接按更短周期核验。
5. 发生教程/图片不一致、产品失效或用户纠错时，记录 change log 并优先修复页面本身。

## 7. 发布阻断清单

以下任一项成立，教程不得标记为 `approved`：

- 主意图无法与现有页面清楚区分。
- 只是替换颜色、场合、眼型或肤色词，核心步骤与 sibling 基本相同。
- 任一核心步骤没有独立图片，或只提供 hero / Pinterest 合成长图。
- 步骤标题、动作、位置、产品、图片、完成标准不指向同一阶段结果。
- 图片中颜色、方向、眼型或工具与文字矛盾。
- 步骤没有 `whyItWorks`、`checkpoint` 或 `ifWrong`。
- 声称适合某眼型/肤色，却没有在具体步骤中解释如何适配。
- 具名商品或可验证声明没有来源/核验日期。
- 作者与复核者没有独立责任，或 AI 初稿未经人工复核。
- FAQ、来源和内链只是模板占位符。
- 最终 HTML 缺少主内容、H1、自指 canonical、有效图片或可抓取内链。
- 广告把图片与对应步骤文字分开，或页面为增加广告位而制造伪步骤。

## 8. 现有 24 篇迁移方案

### 第 1 批：建立一个金标准样板

选择一篇眼型特征明确、图片变化容易验证的教程，例如 `soft-glam-hooded-eyes`。不要复用旧八步顺序，按真实任务重新 storyboard，完成全部字段、逐步图片、FAQ、来源与审核。样板必须先通过移动端、构建 HTML 和内容相似度 QA。

### 第 2 批：每个 hub 各一篇

- occasion：选择一个场景约束明确的页面，如 wedding guest 或 office。
- eye shape：在样板之外选择 round / downturned 等不同位置逻辑页面。
- skin tone：选择 deep skin 或 olive skin，重点验证选色和发灰/偏色判断。
- everyday：选择 5-minute，重点验证步骤数量由时间任务决定而非固定八步。

这四篇用于验证同一模型能承载不同页面结构，而不是形成新的统一文案。

### 第 3 批：审查、合并、升级其余页面

1. 依据真实 GSC / analytics 数据、featured 状态和 hub 覆盖决定优先级。
2. 为每篇写差异 brief；无法写出三个独有判断的页面并入近邻教程。
3. 先修当前语义冲突，再制作图片，避免按错误步骤生成资产。
4. 保留升级页面原 slug 和既有内链；合并页使用单跳重定向并更新 sitemap、canonical 和内链。
5. 不一次性用同一提示词重写 24 篇；每批完成后抽查跨页重复度和视觉趋同。

## 9. 自动化 QA 建议

未来应让内容 schema 和构建审计至少检查：

- 所有必填字段与枚举、唯一 id/slug、日期顺序。
- 步骤数 5–12，order 连续，step ID 唯一，引用的 tool/product/adjustment/source ID 存在。
- 每一步图片存在、宽高有效、alt/caption 不为空、图片不与 hero/social composite 混用。
- `progressive-high-detail-v2` 必须使用连续的 `step-XX-curated.webp`、4:3 画幅、至少 1280 × 960，并具有人工审核日期；新教程不得使用 legacy 状态。
- action / placement / checkpoint 的最低实质长度；拒绝 `as described`、`recipe-specific`、`if needed` 等无法定位的占位语。
- related/internal link 目标存在、没有自链和重复链接。
- sources URL、accessedAt、claim 映射和具名商品 verifiedAt。
- title、description、H1、direct answer 唯一；页面正文和 sibling 的重复句、n-gram 或相似度预警。
- 最终 HTML 的状态、canonical、noindex/sitemap 冲突、H1 数量、JSON-LD 可解析性和本地链接/图片完整性。
- 页面至少具有三类信息增益模块；这项需要 schema 计数加人工判断，不能完全交给机器。

## 10. 完成定义

统一教程模板落地，不等于页面长得一样，而是所有页面都达到同一质量底线：

- 用户能根据独立步骤图和文字完成妆容，并在每一步判断“是否做对、做错怎么救”。
- 页面围绕一个独立任务提供真实信息增益，而不是用共享八步骨架换色。
- 图片、动作、适配、产品和最终效果互相一致，且有人对结果负责。
- 页面在无广告、无 JavaScript和移动端条件下仍可完整阅读。
- Googlebot 能在最终 HTML 中发现唯一意图、完整正文、稳定图片、有效内链、真实日期和一致 canonical。
- Pinterest 长图成为网页内容的派生产物，而不再是网页内容本身。
