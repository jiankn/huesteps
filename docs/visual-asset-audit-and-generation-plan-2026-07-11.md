# HueSteps 视觉资产全面审计与生图改造方案

日期：2026-07-11

## 结论

当前页面结构和响应式技术基线可继续使用，但图片系统没有达到“高冲击、时尚、美妆教学可辨识”的验收标准，暂不建议上线作为最终视觉版本。

这不是单纯的 CSS 裁切问题。根因是同一张 1280×720 横图被同时复用于 Hero、卡片、眼部特写、Skin Tone 窄条和 2:3 Pin，而数据层没有按图片、按场景记录焦点与安全区。

## 一、量化审计

| 验收项 | 结果 | 判定 |
|---|---:|---|
| 24 张活动图片严格 C 位 | 22/24 失败，91.7% | 不通过 |
| Skin Tone 五联画 | 5/5 失败，100% | P0 |
| Eye Shape 选择卡 | 5/6 失败，83.3% | P0 |
| 高冲击时尚妆容 | 24/24 需要升级 | P1 |
| 已确认 Pin 裁切失败 | 2/48，4.2% | P2；架构仍普遍脆弱 |

### P0

1. Skin Tone 五张图必须作为同灯光、同镜位、同背景、同脸部尺度的完整系列重新生成。当前窄条出现半脸和背景块，不能承担肤色比较。
2. Eye Shape 六张图必须改成眉毛到上脸颊的专用 macro，并保留双眼、内眼角与外眼角。不能再将普通人像放大 2.35 倍冒充眼型素材。

### P1

1. Occasion 八张需要形成清晰可辨的 wedding、date、office、brunch、holiday、vacation、dinner、interview 妆容差异。
2. Everyday 五张需要保持真实可复制，同时在缩略图尺寸仍能看出妆效。
3. Home、Occasion、Eye、Skin、Everyday Hero 应采用专用画面，不继续共享普通 recipe 图。

### P2

1. 新图确认后重建 24 张 Final Pin、24 张 Steps Pin 和默认社交分享图。
2. 替换当前旧酒红色 favicon。
3. 确认无外部流程依赖后，归档未被活动加载器使用的 24 张 legacy recipe 图。

## 二、参考图库结论

`C:\antigravity\aibeautystylist\images` 共 147 个图像文件，但只有 95 个独立内容。

- 根目录 52 张主素材是真 WebP，总计约 4.39 MB，是主要视觉参考。
- `generated-ai` 下 36 个 `.webp` 实际为 JPEG 编码，总计约 22.6 MB，不应直接搬入 HueSteps。
- 参考库没有横向 Hero，也没有真正合格的 Eye Shape macro。因此只借鉴妆容、灯光、镜头与造型语言，不复制人物或直接替换。

### 各页面最佳参考

| 页面 | 参考图 |
|---|---|
| Home | `style-soft-glam.webp`、`hero-inclusive-glow.webp`、`look-vacation-bronze.webp` |
| Occasion | `look-bronze-evening.webp`、`look-burgundy-velvet.webp`、`look-wedding-guest.webp` |
| Eye Shape | `look-douyin-soft-focus.webp`、`look-monolid-makeup.webp`、`look-burgundy-velvet.webp` |
| Skin Tone | `hero-polished-elegant.webp`、`look-latina-bronze-glam.webp`、`style-glass-skin.webp` |
| Everyday | `style-clean-girl.webp`、`look-korean-dewy-glow.webp`、`look-sunburn-satin-glow.webp` |

## 三、2025–2026 妆容与网页方向

趋势不是全站继续做同一种 clean glam，而是：**真实肤质 + soft-focus 底妆 + 一个高辨识妆容信号**。

- Occasion：bronze/gold、berry/cherry、金属眼线、缎光肌、清晰唇线。
- Eye Shape：柔化蓝色或冷调眼影、结构眼线、smudged liner、burgundy mascara；眼型结构必须清楚。
- Skin Tone：中性日光、真实肤色、统一曝光和白平衡，只改变适配 undertone 的色彩。
- Everyday：cloud skin、梳理眉、棕色或酒红睫毛、透明腮红、tinted gloss；现代但不应像素颜证件照。

外部依据：

- [Vogue Business：2025 beauty consumer trends](https://www.vogue.com/article/the-beauty-consumer-trends-set-to-define-2025)
- [Allure：2025 makeup trends](https://www.allure.com/story/2025-makeup-trends)
- [Vogue：2026 beauty trends](https://www.vogue.com/article/cellness-bold-makeup-and-80s-hair-the-2026-beauty-trends-brands-need-to-know)
- [Vogue：2026 eye makeup trends](https://www.vogue.com/article/eye-makeup-trends-2026)

### 可参考的官网

1. [Dior Beauty Summer 2025](https://www.dior.com/en_int/beauty/makeup/summer-2025-makeup-collection-pink-splash-and-pop-coral-looks.html)：横屏与移动端分别 art direction，单一色彩故事明确。
2. [CHANEL Summer’s Calling](https://www.chanel.com/us/makeup/chanel-summer-calling-collection/)：Hero、质地、眼、唇分别使用专用镜头，而不是一张万能人像。
3. [PAT McGRATH LABS](https://www.patmcgrath.com/)：macro、金属反光、深背景和强眼妆适合 Eye/Party 支线。
4. [Fenty Beauty](https://fentybeauty.com/)：跨肤色展示同类妆效，妆面在缩略图中仍清晰可辨。
5. [Rare Beauty](https://www.rarebeauty.com/)：自然肤质、鲜活腮红和广泛肤色覆盖，适合 Skin Tone 的可比性设计。
6. [Glossier](https://www.glossier.com/)：Desktop/Tablet/Mobile 分开资源，适合 Everyday 的轻妆支线。

## 四、统一摄影与妆容合同

### 摄影

- 全脸：85mm 美妆人像观感，眼平机位，45° 大柔光，轻微 negative fill，受控轮廓光。
- 眼部：100mm macro，眉毛到上脸颊，双眼清晰，不让碎发遮住虹膜。
- 皮肤：保留毛孔、细纹和真实色阶；禁止塑料磨皮、灰脸、过曝高光和橙色污染。
- 背景分三组：mineral/ivory 教学；near-black/cocoa 夜间；cobalt/berry 品牌冲击。

### 构图验收

- 普通卡片：鼻梁中心 `x=48–52%`；双眼 `y=34–42%`；下巴完整；头顶最多裁 3–8%。
- 普通母图：面部处于中央 40% 安全区，眼、鼻、唇、下巴、发际线距边缘至少 12%。
- Hero 左文右图：脸在图片面板内部居中或 `x=62–72%`，不以整张网页几何中心为准；装饰图形不得覆盖眼睛、嘴唇和主要妆效。
- Eye Shape：目标虹膜 `x=50%±4%`、`y=48%±6%`，双眼、内眼角和外眼角完整。
- Skin Tone：人物偏移不超过 5%，同一镜头、曝光、白平衡、背景和修图强度。
- 所有资产必须在 1440、768、375 三档做实际容器裁切 QA。

## 五、资产架构

推荐从单字段 `heroImage` 升级为 look family：

```text
look family
├─ hero.webp       横向品牌/页面 Hero
├─ card.webp       卡片与列表
├─ detail.webp     Recipe 详情与可放大纹理
└─ metadata        focalX / focalY / mobileFocalX / mobileFocalY / subjectBox
```

Eye Shape 增加 `macro.webp`；Skin Tone 使用独立的 matched-lighting tone set。焦点元数据仍然需要，但它只负责同一组件家族内的小范围响应式调整，不能代替不同镜头距离的专用资产。

## 六、Logo 与 Favicon

### 推荐字标

采用原创 `Editorial Signature`：`Hue` 使用流动脚本字形，`Steps` 使用高反差时尚 serif；`t` 的横画延伸为轻微上扬的 step line。保留 Instagram 式“时尚签名感”，但不复制其商标字形、渐变或相机图标。

- Header：完整 SVG wordmark，黑色字标 + cobalt 单色强调。
- Footer：使用完全同一份 SVG，做白色反相，不再用另一套字体重打。
- 字标必须同时通过 1440 桌面和 375 手机 Header 的清晰度验收。

### Favicon

使用独立的“蓝色四角星 + 两级上升台阶”符号；不把完整 `HueSteps` 压缩到 16px。交付 SVG、16/32/48 PNG、180 apple-touch、ICO 和 monochrome mask icon。

## 七、三个执行方案

| 方案 | 内容 | 优点 | 风险 |
|---|---|---|---|
| A 快速修正 | Logo/Favicon；先换 11 张 P0；其余只调焦点 | 最快解决功能性错误 | 全站妆容仍不够统一，后续还要二次返工 |
| **B 完整改造（推荐）** | Logo/Favicon；24 张 recipe 专用资产；5 张 Hub/Home Hero；focal metadata；重建 Pin/social | 质量、工作量与一致性最平衡，可达到验收线 | 需要先确认 3 张 golden samples |
| C 奢华 Campaign | 每个 look family 都做 hero/card/detail，多端独立 art direction，并增加局部 texture 素材 | 最接近 CHANEL/Dior 的完整视觉叙事 | 资产量大，内容维护成本最高 |

## 八、多 Agent 生图流程

先生成 3 张 golden samples，确认后再并行：

1. Home/Occasion 样张：时装人像、cobalt 或 cocoa 背景、bronze/mauve 妆面。
2. Eye Shape 样张：hooded-eye 双眼 macro，结构眼线，真实眼睑与睫毛。
3. Skin Tone 样张：中性日光、标准化镜头与背景，验证真实肤色与微纹理。

通过样张后：

- Agent A：Home、Occasion、Everyday Hero 和响应式版本。
- Agent B：六类 Eye Shape macro 与眼妆 recipe 资产。
- Agent C：五级 Skin Tone 与 undertone 标准化系列。
- Root：Logo/Favicon、24 个 look family 映射、焦点元数据、页面替换、Pin/social 重建和三断点视觉 QA。

禁止各 Agent 自行改变白平衡、镜头、皮肤修图强度和品牌蓝。所有 Agent 使用同一正向词表、负面约束与三张 golden samples。

## 九、最终验收门槛

1. 24/24 卡片在 240–360px 宽度仍能识别妆容差异。
2. Eye Shape 6/6 保留双眼和眼型关键边界。
3. Skin Tone 5/5 在同一摄影条件下可比较，不出现背景块或半脸。
4. Hero 装饰不遮挡眼睛、嘴唇或妆面焦点。
5. 1440/768/375 无截眼、截下巴、主体漂移或糊化放大。
6. 真实皮肤纹理，无蜡像感、灰脸、畸形眼睑、重复睫毛、融合耳饰或发丝遮眼。
7. Header/Footer 字标完全一致；favicon 在 16px 清晰可辨。
8. 新资产完成后重新运行构建、浏览器 QA、图片体积与 Pin 裁切审计。
