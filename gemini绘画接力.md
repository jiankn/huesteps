# Gemini 绘画接力任务书

项目根目录：`C:\antigravity\huesteps`

接力日期：`2026-08-18`

目标：只补画 4 张当前未通过的教程步骤图。不要重画、替换或移动任何已经通过的图片。

> Gemini：本文件是最新接力指令，覆盖旧的 2026-08-17 接力任务书。开始前请阅读 `C:\antigravity\huesteps\docs\image-generation-system.md`，但以本文件列出的 4 张补图为本轮唯一执行范围。

## 当前人工验收结论

用户已人工确认 `attempt-02` 的画面方向合格，但这些文件仍是 `1200 x 896`，低于项目脚本最低要求 `1280 x 960`，不能直接接入。下一轮不是改审美方向，而是按 `attempt-02` 的画面效果重新输出合规高分辨率版本。

视觉参考稿如下，只能作为画面参考，不得覆盖：

```text
C:\antigravity\huesteps\tmp\gemini-redraw-2026-08-18\everyday-makeup-deep-set-eyes\candidates\step-06-attempt-02.png
C:\antigravity\huesteps\tmp\gemini-redraw-2026-08-18\everyday-makeup-deep-set-eyes\candidates\step-07-attempt-02.png
C:\antigravity\huesteps\tmp\gemini-redraw-2026-08-18\rich-berry-gold-makeup-deep-skin\candidates\step-07-attempt-02.png
C:\antigravity\huesteps\tmp\gemini-redraw-2026-08-18\rich-berry-gold-makeup-deep-skin\candidates\step-08-attempt-02.png
```

请生成对应 `attempt-03`，保持 `attempt-02` 的人物、构图、妆容和广告感，只修正为原生 4:3 高分辨率 PNG。

## 绝对不要替换的内容

不要修改这些正式路径：

```text
C:\antigravity\huesteps\src\assets\recipes-v5\
C:\antigravity\huesteps\src\assets\tutorial-steps\
C:\antigravity\huesteps\src\data\model-identity-registry.json
C:\antigravity\huesteps\src\data\recipes.json
C:\antigravity\huesteps\src\data\tutorial-step-image-reviews.json
```

不要覆盖这些已存在的隔离源图：

```text
C:\antigravity\huesteps\tmp\model-rebuild\everyday-makeup-deep-set-eyes\asian-identity-reset-2026-08-18\sources\step-01.png
C:\antigravity\huesteps\tmp\model-rebuild\everyday-makeup-deep-set-eyes\asian-identity-reset-2026-08-18\sources\step-02.png
C:\antigravity\huesteps\tmp\model-rebuild\everyday-makeup-deep-set-eyes\asian-identity-reset-2026-08-18\sources\step-03.png
C:\antigravity\huesteps\tmp\model-rebuild\everyday-makeup-deep-set-eyes\asian-identity-reset-2026-08-18\sources\step-04.png
C:\antigravity\huesteps\tmp\model-rebuild\everyday-makeup-deep-set-eyes\asian-identity-reset-2026-08-18\sources\step-05.png
C:\antigravity\huesteps\tmp\model-rebuild\everyday-makeup-deep-set-eyes\asian-identity-reset-2026-08-18\sources\step-08.png

C:\antigravity\huesteps\tmp\model-rebuild\rich-berry-gold-makeup-deep-skin\asian-identity-reset-2026-08-18\sources\step-01.png
C:\antigravity\huesteps\tmp\model-rebuild\rich-berry-gold-makeup-deep-skin\asian-identity-reset-2026-08-18\sources\step-02.png
C:\antigravity\huesteps\tmp\model-rebuild\rich-berry-gold-makeup-deep-skin\asian-identity-reset-2026-08-18\sources\step-03.png
C:\antigravity\huesteps\tmp\model-rebuild\rich-berry-gold-makeup-deep-skin\asian-identity-reset-2026-08-18\sources\step-04.png
C:\antigravity\huesteps\tmp\model-rebuild\rich-berry-gold-makeup-deep-skin\asian-identity-reset-2026-08-18\sources\step-05.png
C:\antigravity\huesteps\tmp\model-rebuild\rich-berry-gold-makeup-deep-skin\asian-identity-reset-2026-08-18\sources\step-06.png
```

本轮只允许把新图片输出到：

```text
C:\antigravity\huesteps\tmp\gemini-redraw-2026-08-18\everyday-makeup-deep-set-eyes\candidates\
C:\antigravity\huesteps\tmp\gemini-redraw-2026-08-18\rich-berry-gold-makeup-deep-skin\candidates\
```

如果某张失败，保留失败文件并另存为新的 attempt，不要覆盖旧 attempt。当前 `attempt-01` 和 `attempt-02` 均因尺寸失败，本轮请输出 `attempt-03`。

## 统一硬性标准

每张输出都必须是原生 4:3 PNG，最低 `1280 × 960`。优先输出 `1448 × 1086`；如果 Gemini 不能导出这个尺寸，请直接输出原生 `1600 × 1200` 或 `2048 × 1536`。禁止再输出 `1200 × 896`，也不要用后期拉伸、补边、裁切、改尺寸伪造。

画面必须是高端彩妆广告质感：模特漂亮、脸足够大、妆容清楚，手机 360/390/430 px 下也能看清步骤变化。

必须保留同一 recipe 的同一个原创非名人身份：脸型、五官、年龄、肤色底色、眼色、发际线、痣/雀斑、发型、衣服、光线、白平衡、背景世界都不能漂移。

Step 2-8 必须只使用固定 Hero 和固定 Clean Step 1 作为参考，不要使用失败的 Step 06、Step 07、Step 08，也不要用上一步当输入。

保留真实皮肤：自然毛孔、细纹、绒毛、唇纹、单根眉毛。出现指纹纹理、旋涡纹、等高线、蚀刻线、网格皮肤、重复波纹、塑料皮、蜡皮，直接判失败。

禁止文字、数字、箭头、点线、教学标记、分屏、产品、手、logo、水印、假睫毛带、重复睫毛、错误解剖。

## 任务 1：everyday-makeup-deep-set-eyes / Step 06

输出文件：

```text
C:\antigravity\huesteps\tmp\gemini-redraw-2026-08-18\everyday-makeup-deep-set-eyes\candidates\step-06-attempt-03.png
```

参考图：

```text
Image 1 = C:\antigravity\huesteps\tmp\model-rebuild\everyday-makeup-deep-set-eyes\asian-identity-reset-2026-08-18\sources\step-01.png
Image 2 = C:\antigravity\huesteps\tmp\model-rebuild\everyday-makeup-deep-set-eyes\asian-identity-reset-2026-08-18\hero-master-provisional.png
```

提示词：

```text
Use case: identity-preserve
Asset type: HueSteps progressive makeup tutorial Step 06 image
Output: one native 4:3 PNG, minimum 1280 x 960. Prefer 1448 x 1086; if unavailable, use 1600 x 1200 or 2048 x 1536. Do not output 1200 x 896. No border, no text, no overlay.

Input images:
Image 1 is the locked clean Step 1 base and controls identity, camera, lighting, hair, wardrobe, background and clean skin.
Image 2 is the locked Hero/final makeup reference and controls only the final deep-set eye makeup direction.

Subject identity lock:
Keep exactly the same original East Asian woman from the references: early 30s, warm light-medium ivory neutral-gold skin, deep-set almond dark brown eyes, long shoulder-length black waves tucked behind her right ear, tiny beauty mark on viewer-left lower cheek, warm gray draped high-neck top with one shoulder bare, misty warm gray studio background. Do not change her ethnicity, age, face geometry, eye color, hairline, beauty mark, wardrobe or background.

Step state:
This is Step 06, "Balance the lower lash line." Show the cumulative eye look through Step 05: light taupe mapped with eyes open, built open-eye socket structure, soft beige pressed on the mobile lid, and a very thin burgundy-brown/espresso definition at the upper lash roots. Now add only Step 06: a soft, controlled taupe-brown haze along the lower lash line, strongest on the outer third and fading before the inner corner. It must balance the deep-set eyes without creating a heavy lower rim.

Composition:
Use a premium beauty-editorial eye or upper-face close-up, both eyes open and fully visible, brows and lower lash lines complete. The lower lash change must be immediately readable on a 360 px mobile screen. Keep enough surrounding face for identity, but the eyes/lower lash target should dominate the frame.

Skin and texture:
Real irregular skin only: natural pores, fine lines, peach fuzz and subtle product texture. The forehead, under-eyes and cheeks must not show any fingerprint loops, whorl, swirl, topographic contour lines, repeated mesh, etched texture, HDR pores, wax skin or plastic smoothing.

Strict avoid:
No new cheek makeup, no new lip color, no heavy eyeliner, no strip lashes, no false-lash band, no duplicated lashes, no hair crossing the iris, no text, no logo, no watermark, no arrows, no dots, no split screen, no changed identity.
```

## 任务 2：everyday-makeup-deep-set-eyes / Step 07

输出文件：

```text
C:\antigravity\huesteps\tmp\gemini-redraw-2026-08-18\everyday-makeup-deep-set-eyes\candidates\step-07-attempt-03.png
```

参考图：

```text
Image 1 = C:\antigravity\huesteps\tmp\model-rebuild\everyday-makeup-deep-set-eyes\asian-identity-reset-2026-08-18\sources\step-01.png
Image 2 = C:\antigravity\huesteps\tmp\model-rebuild\everyday-makeup-deep-set-eyes\asian-identity-reset-2026-08-18\hero-master-provisional.png
```

提示词：

```text
Use case: identity-preserve
Asset type: HueSteps progressive makeup tutorial Step 07 image
Output: one native 4:3 PNG, minimum 1280 x 960. Prefer 1448 x 1086; if unavailable, use 1600 x 1200 or 2048 x 1536. Do not output 1200 x 896. No border, no text, no overlay.

Input images:
Image 1 is the locked clean Step 1 base and controls identity, camera, lighting, hair, wardrobe, background and clean skin.
Image 2 is the locked Hero/final makeup reference and controls only the final deep-set eye makeup direction.

Subject identity lock:
Keep exactly the same original East Asian woman from the references: early 30s, warm light-medium ivory neutral-gold skin, deep-set almond dark brown eyes, long shoulder-length black waves tucked behind her right ear, tiny beauty mark on viewer-left lower cheek, warm gray draped high-neck top with one shoulder bare, misty warm gray studio background. Do not change her ethnicity, age, face geometry, eye color, hairline, beauty mark, wardrobe or background.

Step state:
This is Step 07, "Curl and separate the lashes." Show the cumulative eye look through Step 06: open-eye taupe structure, soft beige mobile lid, thin burgundy-brown upper lash-root definition, and soft taupe-brown lower lash balance. Now add only Step 07: naturally curled, separated lashes with burgundy-brown mascara. The lashes should look lifted and defined but still natural, with individual visible hairs. No false strip, no dramatic extension fan, no thick black wing.

Composition:
Use a premium beauty-editorial eye close-up with both eyes open, both brows visible, upper and lower lash lines complete. Lashes must be clear at 360 px mobile width. Keep enough nose/cheek/forehead context for identity, but make the lash separation the obvious teaching target.

Skin and texture:
Real irregular skin only: natural pores, fine lines, peach fuzz and subtle product texture. The forehead, under-eyes and cheeks must not show any fingerprint loops, whorl, swirl, topographic contour lines, repeated mesh, etched texture, HDR pores, wax skin or plastic smoothing.

Strict avoid:
No new cheek makeup, no new lip color, no heavy eyeliner, no strip lashes, no false-lash band, no duplicated lashes, no clumped spider lashes, no hair crossing the iris, no text, no logo, no watermark, no arrows, no dots, no split screen, no changed identity.
```

## 任务 3：rich-berry-gold-makeup-deep-skin / Step 07

输出文件：

```text
C:\antigravity\huesteps\tmp\gemini-redraw-2026-08-18\rich-berry-gold-makeup-deep-skin\candidates\step-07-attempt-03.png
```

参考图：

```text
Image 1 = C:\antigravity\huesteps\tmp\model-rebuild\rich-berry-gold-makeup-deep-skin\asian-identity-reset-2026-08-18\sources\step-01.png
Image 2 = C:\antigravity\huesteps\tmp\model-rebuild\rich-berry-gold-makeup-deep-skin\asian-identity-reset-2026-08-18\hero-master-provisional.png
```

提示词：

```text
Use case: identity-preserve
Asset type: HueSteps progressive makeup tutorial Step 07 image
Output: one native 4:3 PNG, minimum 1280 x 960. Prefer 1448 x 1086; if unavailable, use 1600 x 1200 or 2048 x 1536. Do not output 1200 x 896. No border, no text, no overlay.

Input images:
Image 1 is the locked clean Step 1 base and controls identity, camera, lighting, hair, wardrobe, background and clean skin.
Image 2 is the locked Hero/final makeup reference and controls only the final berry-gold makeup direction.

Subject identity lock:
Keep exactly the same original Southeast Asian woman from the references: mid-30s, rich warm-brown golden complexion, center-parted sleek black low chignon, tiny oval dark mark at viewer-left temple, deep aubergine/plum high neck, cocoa-berry seamless studio background, soft neutral beauty light. Do not change her ethnicity, face shape, skin undertone, eye color, hairline, temple mark, wardrobe, background or camera distance.

Step state:
This is Step 07, "Connect the lip to the palette." Show the cumulative look through Step 06: smooth luminous complexion, light natural brow frame, soft deep wine-brown outer-eye contour, antique-gold sheen on inner and mobile lids, thin burgundy-brown lash-root definition, separated natural lashes, and a restrained deep-berry cheek veil on the upper cheekbones. Now add only Step 07: a clean deep berry satin lip that connects to the berry cheek and wine-gold eye palette. The lip edge must be precise, satin not glossy, rich but not blackened.

Composition:
Use a premium beauty-editorial lip/lower-face close-up or tight face crop. Lips must dominate enough to be readable on a 360 px mobile screen, while still showing enough eyes, nose, cheek and temple mark context to prove same identity. Keep the face large and elegant, magazine beauty ad quality.

Skin and texture:
Real skin only: natural pores, soft cheek texture, lip grooves and fine lines. The forehead, cheeks, nose bridge and upper lip area must not show fingerprint loops, whorl, swirl, topographic contour lines, repeated mesh, etched texture, HDR pores, wax skin or plastic smoothing.

Strict avoid:
No extra heavy contour, no ashy highlight, no orange cast, no overdrawn lip shape, no smeared lipstick, no black lipstick, no extra jewelry, no hand, no product, no text, no logo, no watermark, no arrows, no dots, no split screen, no changed identity.
```

## 任务 4：rich-berry-gold-makeup-deep-skin / Step 08

输出文件：

```text
C:\antigravity\huesteps\tmp\gemini-redraw-2026-08-18\rich-berry-gold-makeup-deep-skin\candidates\step-08-attempt-03.png
```

参考图：

```text
Image 1 = C:\antigravity\huesteps\tmp\model-rebuild\rich-berry-gold-makeup-deep-skin\asian-identity-reset-2026-08-18\sources\step-01.png
Image 2 = C:\antigravity\huesteps\tmp\model-rebuild\rich-berry-gold-makeup-deep-skin\asian-identity-reset-2026-08-18\hero-master-provisional.png
```

提示词：

```text
Use case: identity-preserve
Asset type: HueSteps progressive makeup tutorial Step 08 final review image
Output: one native 4:3 PNG, minimum 1280 x 960. Prefer 1448 x 1086; if unavailable, use 1600 x 1200 or 2048 x 1536. Do not output 1200 x 896. No border, no text, no overlay.

Input images:
Image 1 is the locked clean Step 1 base and controls identity, camera, lighting, hair, wardrobe, background and clean skin.
Image 2 is the locked Hero/final makeup reference and controls the completed berry-gold final look.

Subject identity lock:
Keep exactly the same original Southeast Asian woman from the references: mid-30s, rich warm-brown golden complexion, center-parted sleek black low chignon, tiny oval dark mark at viewer-left temple, deep aubergine/plum high neck, cocoa-berry seamless studio background, soft neutral beauty light. Do not change her ethnicity, face shape, skin undertone, eye color, hairline, temple mark, wardrobe, background or camera distance.

Step state:
This is Step 08, "Review and set only where needed." Show the completed final accumulated makeup look: smooth but real luminous complexion; natural precise brows; soft deep wine-brown outer-eye contour; antique-gold sheen limited to the inner and mobile lids; thin burgundy-brown lash-root definition; separated natural lashes; restrained deep-berry cheek veil on upper cheekbones; clean deep berry satin lip. The finish should look lightly set only where needed, with controlled shine but no flat powder mask.

Composition:
Use a tight full-face premium luxury beauty campaign crop. Complete hairline and chin visible, face large, eyes and lips immediately readable at 360 px mobile width. Keep the cocoa-berry background simple and non-distracting. This should look like a polished final result users want to click, not a passport photo or ordinary stock portrait.

Skin and texture:
Real skin only: natural pores, soft cheek texture, eye creases, lip grooves and subtle product texture. The forehead, cheeks, nose bridge and chin must not show fingerprint loops, whorl, swirl, topographic contour lines, repeated mesh, etched texture, HDR pores, wax skin or plastic smoothing.

Strict avoid:
No extra heavy contour, no ashy highlight, no orange cast, no overdrawn or smeared lipstick, no black lipstick, no strip lashes, no duplicated lashes, no jewelry, no hand, no product, no text, no logo, no watermark, no arrows, no dots, no split screen, no changed identity.
```

## Gemini 交付后需要回报

生成完请只回报这些信息：

```text
1. 每张生成图的完整本地路径
2. 每张图的像素尺寸
3. 每张图是否为原生 4:3，且是否达到至少 1280 x 960
4. 是否出现指纹/旋涡/蚀刻/网格微纹理
5. 是否保持同一身份
6. 哪些图建议 Codex 接入 sources，哪些图建议拒绝
```

不要替换正式路径。Codex 会在人工验收通过后再做无损接入、prepare、身份审计、步骤审计、内容审计和构建检查。
