import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const publishedAt = '2026-07-10';
const visualMigration = JSON.parse(await readFile(path.resolve('src/data/tutorial-visual-migrations.json'), 'utf8'));
const stepReviewManifest = await readFile(path.resolve('src/data/tutorial-step-image-reviews.json'), 'utf8')
  .then(JSON.parse)
  .catch(() => ({ reviews: {} }));

const seeds = [
  {
    id: 'soft-glam-wedding-guest-makeup', hub: 'occasion-makeup', title: 'Soft Glam Wedding Guest Makeup', time: 30, difficulty: 'Intermediate', finish: 'soft satin', featured: true, contentUpdatedAt: '2026-07-12',
    intent: 'Create polished wedding guest makeup that photographs well without competing with the wedding party.',
    description: 'A soft rose and taupe wedding guest look with controlled shimmer, balanced skin, and placement notes for different eye shapes.',
    answer: 'Choose softly reflective rose on the lid, a diffused taupe crease, and a satin complexion so the look stays polished in daylight and evening photos.',
    occasions: ['wedding guest', 'formal daytime event'], eyes: ['hooded', 'almond', 'round'], tones: ['fair', 'light', 'medium', 'deep'], undertones: ['cool', 'neutral', 'warm'],
    palette: [['Mushroom taupe','#8A776E','matte transition','above the natural crease'],['Muted rose','#B67882','satin lid color','center of the mobile lid'],['Soft berry','#8E4F62','cheek and lip harmony','upper cheek and lips']],
    prep: 'Use a thin gripping base only where makeup usually separates, then blot the eyelids.', base: 'Apply light-to-medium coverage in thin layers and keep natural skin visible around the perimeter.', brows: 'Brush brows upward and fill only clear gaps so the frame stays soft.', definition: 'Press deep taupe into the outer lash line, keeping the tail short and slightly lifted.', finishStep: 'Tap satin berry onto the lips, blot once, and set only the center of the face.',
    placement: ['Keep shimmer below the visible crease so flash does not enlarge texture.','Angle the outer shadow toward the brow tail, not straight sideways.','Place blush high and slightly back to balance the soft eye.'],
    adjustments: [['Hooded eyes','Move the taupe slightly above the fold while looking straight ahead.','The transition remains visible when the eye is open.'],['Deep skin','Use a richer berry and a bronze-rose lid instead of pale pink.','Extra depth prevents the colors from turning ashy.'],['Warm undertones','Shift the rose toward warm mauve and use a caramel taupe.','The colors stay harmonious without becoming orange.']],
    mistakes: [['Shimmer reaches the brow bone','The satin shade was blended too high.','Cover the upper edge with matte taupe and keep reflection on the mobile lid.'],['The outer corner looks heavy','Too much deep shade was placed at once.','Lift excess with a clean brush, then rebuild only along the lash line.'],['Base looks flat in photos','Powder covered the entire face.','Mist lightly and tap a small amount of cream blush onto the upper cheek.']],
    shoppingRole: 'rose-taupe eye palette'
  },
  {
    id: 'easy-date-night-makeup', hub: 'occasion-makeup', title: 'Easy Date Night Makeup', time: 20, difficulty: 'Easy', finish: 'luminous', featured: true, contentUpdatedAt: '2026-07-12',
    intent: 'Create warm, softly defined date night makeup that still looks like skin at close distance.',
    description: 'A twenty-minute cocoa and rose date night look with smudged definition, luminous skin, and an easy blurred lip.',
    answer: 'Use cocoa shadow close to the lashes, a rose cream on cheeks and lips, and pinpoint glow rather than a full layer of shimmer.',
    occasions: ['date night', 'evening dinner'], eyes: ['almond', 'round', 'downturned'], tones: ['fair', 'light', 'medium', 'deep'], undertones: ['warm', 'neutral', 'cool'],
    palette: [['Soft cocoa','#6F5148','lash definition','upper and lower outer lash line'],['Rose bronze','#A9676B','lid accent','inner two-thirds of the lid'],['Tea rose','#A85D6B','cream cheek and lip','cheek center and lips']],
    prep: 'Massage in a small amount of moisturizer and wait two minutes before makeup.', base: 'Spot-conceal around the center of the face and blend the edges with fingers.', brows: 'Use clear or tinted gel and leave the front of each brow airy.', definition: 'Smudge cocoa pencil between the upper lashes, then soften the outer third with a small brush.', finishStep: 'Press tea-rose color into lips with a fingertip and add balm only to the center.',
    placement: ['Keep cocoa tight to the lashes for definition without a hard line.','Put rose-bronze reflection on the lid center, not across the crease.','Blend cheek color up toward the temple while leaving space below the eye.'],
    adjustments: [['Downturned eyes','Stop lower-lash color before the outer corner and lift the upper smudge.','The eye reads lifted instead of pulled down.'],['Cool undertones','Choose a true rose rather than copper for lid and lip.','A cooler rose avoids an orange cast.'],['Deep skin','Use espresso at the lashes and a saturated rose-brown cream.','The contrast remains visible in evening light.']],
    mistakes: [['The liner looks harsh','The pencil set before it was softened.','Work one eye at a time and smudge immediately with a short dense brush.'],['Glow emphasizes texture','Highlighter was swept over a wide area.','Remove the edge with a sponge and keep glow on the highest cheek point only.'],['The lip edge looks uneven','Opaque lipstick was applied straight from the tube.','Blur the perimeter with a clean fingertip for a deliberate soft edge.']],
    shoppingRole: 'blendable cocoa eye pencil'
  },
  {
    id: 'polished-office-makeup-10-minutes', hub: 'occasion-makeup', title: 'Polished Office Makeup in 10 Minutes', time: 10, difficulty: 'Beginner', finish: 'natural satin', featured: true, contentUpdatedAt: '2026-07-12',
    intent: 'Build a fast office makeup routine that looks awake and tidy in indoor light.',
    description: 'A streamlined office makeup recipe using taupe, muted peach, and strategic concealer for a polished result in ten minutes.',
    answer: 'Prioritize evenness around the eyes and nose, one matte taupe wash, curled lashes, and a muted cream color shared by cheeks and lips.',
    occasions: ['office', 'video meeting'], eyes: ['hooded', 'deep-set', 'almond'], tones: ['fair', 'light', 'medium', 'deep'], undertones: ['warm', 'neutral', 'cool'],
    palette: [['Workday taupe','#85766F','single eye shadow','lid and slightly above crease'],['Muted peach','#B97868','multi-use color','upper cheek and lips'],['Soft brown','#59443D','lash definition','outer upper lash line']],
    prep: 'Apply sunscreen first and let it settle before pressing tissue over shiny areas.', base: 'Conceal inner eye corners, nose redness, and individual marks instead of covering the whole face.', brows: 'Sweep tinted gel through the tail first, then use the remaining product at the front.', definition: 'Press soft brown shadow into the outer upper lashes with a flat brush.', finishStep: 'Tap muted peach onto cheeks and lips, then powder only beside the nose.',
    placement: ['Keep the taupe visible just above the fold for hooded eyes.','Concentrate concealer at inner eye corners to brighten with less product.','Keep cheek color behind the pupil so the center of the face stays clean.'],
    adjustments: [['Deep-set eyes','Use a mid-tone taupe on the lid and skip dark crease shading.','Lighter placement prevents the socket from looking deeper.'],['Cool undertones','Swap muted peach for dusty rose.','The shared cheek and lip color stays balanced.'],['Deep skin','Choose a medium cocoa taupe and terracotta-rose cream.','These tones remain visible without turning gray.']],
    mistakes: [['The base looks patchy','Concealer was blended after it dried.','Apply and blend one small zone at a time with a damp sponge.'],['Taupe makes eyes look tired','The shade is too gray or extends below the eye.','Choose a warmer taupe and clean the lower outer corner with concealer.'],['Brows look blocky','Too much gel collected at the front.','Brush the front upward with a clean spoolie until skin shows through.']],
    shoppingRole: 'one-and-done matte taupe shadow'
  },
  {
    id: 'fresh-brunch-makeup', hub: 'occasion-makeup', title: 'Fresh Brunch Makeup', time: 15, difficulty: 'Easy', finish: 'fresh dewy', featured: false, contentUpdatedAt: '2026-07-12',
    intent: 'Create fresh daytime makeup that stays lively in natural light without heavy coverage.',
    description: 'A sheer apricot and champagne brunch look with bright inner corners, translucent skin, and softly groomed brows.',
    answer: 'Use sheer apricot on cheeks and lips, champagne only at the inner lid, and spot coverage so natural daylight still shows skin texture.',
    occasions: ['brunch', 'daytime gathering'], eyes: ['monolid', 'almond', 'round'], tones: ['fair', 'light', 'medium', 'deep'], undertones: ['warm', 'neutral', 'cool'],
    palette: [['Apricot cream','#D48568','cheek and lip color','upper cheek and lips'],['Soft champagne','#C8A987','eye brightener','inner lid and tear duct'],['Caramel brown','#765848','soft definition','upper lash line']],
    prep: 'Use a hydrating sunscreen and press extra moisturizer only onto dry patches.', base: 'Sheer a skin tint over the center of the face and spot-conceal after it settles.', brows: 'Brush brows diagonally outward for a relaxed shape.', definition: 'Tightline the upper lashes with caramel brown and keep the lower lash line clean.', finishStep: 'Tap apricot cream onto lips and cheeks, then press champagne at the inner lid.',
    placement: ['Keep champagne inside the inner third so the eye stays bright, not metallic.','Place apricot slightly higher than the fullest cheek area.','Leave the lower eye clean to preserve a daytime finish.'],
    adjustments: [['Monolids','Carry champagne slightly higher at the center and keep definition at the lash roots.','The bright point remains visible with the eye open.'],['Cool undertones','Choose a pink-apricot rather than orange apricot.','The warmth stays fresh instead of sallow.'],['Deep skin','Use copper-champagne and a saturated coral cream.','Richer pigment avoids a pale cast.']],
    mistakes: [['The complexion looks greasy','Dewy product was layered across the T-zone.','Blot the center and keep glow on cheekbones and outer forehead.'],['Champagne looks frosty','The highlight is too pale or opaque.','Mix it with the transition shade and press on a thinner layer.'],['Apricot disappears','The cream was over-blended into the base.','Add a second thin layer after powdering only around, not over, the cheek.']],
    shoppingRole: 'sheer apricot multi-use cream'
  },
  {
    id: 'holiday-party-shimmer-makeup', hub: 'occasion-makeup', title: 'Holiday Party Shimmer Makeup', time: 35, difficulty: 'Intermediate', finish: 'dimensional shimmer', seasonal: true, featured: true, contentUpdatedAt: '2026-07-12',
    intent: 'Create controlled holiday shimmer that catches evening light without fallout or a heavy smoky eye.',
    description: 'A cranberry and antique-gold holiday look with contained shimmer, clean outer corners, and balanced berry lips.',
    answer: 'Anchor antique-gold shimmer with a cream base, frame it with matte cranberry, and keep the lower edge clean for an evening look that remains wearable.',
    occasions: ['holiday party', 'evening celebration'], eyes: ['hooded', 'monolid', 'almond'], tones: ['fair', 'light', 'medium', 'deep'], undertones: ['cool', 'neutral', 'warm'],
    palette: [['Matte cranberry','#7E3D4C','crease and outer shade','outer lid and crease'],['Antique gold','#B58B4F','shimmer focal point','center and inner mobile lid'],['Deep berry','#71354B','lip and cheek anchor','lips and upper cheek']],
    prep: 'Finish eye makeup before complexion and press a thin tacky base onto the lid.', base: 'After the eyes are complete, sweep away fallout and use medium coverage only where needed.', brows: 'Define the tail cleanly while keeping the brow front soft.', definition: 'Deepen the upper lash line with matte espresso, then connect it to the cranberry outer corner.', finishStep: 'Blot a deep berry lip, soften the edge, and add a light veil of powder to the T-zone.',
    placement: ['Press shimmer rather than sweeping it to keep particles on the mobile lid.','Keep cranberry above the outer fold but below the brow bone.','Balance the strong eye with berry placed high and sheer on the cheeks.'],
    adjustments: [['Hooded eyes','Use shimmer on the visible center lid and keep the outer matte shade narrow.','The shimmer remains visible without transferring far above the fold.'],['Warm undertones','Shift cranberry toward brick-berry and use bronze-gold.','Warmer versions harmonize with golden skin.'],['Deep skin','Choose saturated wine and old gold with a warm base.','The colors stay rich instead of muted or gray.']],
    mistakes: [['Shimmer falls onto the cheeks','A fluffy brush or dry lid was used.','Pick up shimmer with a fingertip and press it over a tacky base before complexion.'],['Cranberry makes the eyes look sore','Red reached the inner lower lash line.','Keep cranberry on the outer upper eye and add brown between the lashes.'],['Both eye and lip feel too heavy','Berry was applied fully opaque.','Blot twice and blur balm through the center for a softer stain.']],
    shoppingRole: 'adhesive-friendly antique gold shimmer'
  },
  {
    id: 'easy-vacation-makeup', hub: 'occasion-makeup', title: 'Easy Vacation Makeup', time: 12, difficulty: 'Beginner', finish: 'sheer sunlit', seasonal: true, contentUpdatedAt: '2026-07-12',
    intent: 'Create a compact vacation routine with multi-use color and minimal tools.',
    description: 'A suitcase-friendly bronze and coral makeup recipe using sheer layers, cream textures, and only a few multipurpose roles.',
    answer: 'Use a sheer bronze cream around the eye, coral on cheeks and lips, and spot coverage so the routine stays quick and easy to pack.',
    occasions: ['vacation', 'casual daytime'], eyes: ['monolid', 'hooded', 'almond'], tones: ['fair', 'light', 'medium', 'deep'], undertones: ['warm', 'neutral', 'cool'],
    palette: [['Sheer bronze','#9A6A4A','eye and face warmth','lid and outer cheek'],['Coral flush','#D06F63','cheek and lip color','upper cheek and lips'],['Espresso','#4A332D','water-resistant definition','upper lash roots']],
    prep: 'Apply broad-spectrum sunscreen and let it form an even layer before makeup.', base: 'Use concealer only where needed and avoid mixing makeup into fresh sunscreen.', brows: 'Set brows with clear gel that can travel in a small kit.', definition: 'Press espresso pencil into the upper lash roots and smudge before it sets.', finishStep: 'Blend coral into cheeks and lips, then blot the center of the face.',
    placement: ['Keep bronze on the lid and just above the crease rather than across the brow bone.','Place coral high so it remains visible after natural fading.','Keep complexion products away from the hairline to avoid sunscreen pilling.'],
    adjustments: [['Cool undertones','Use rose-coral and neutral taupe-bronze.','The look stays sunlit without turning orange.'],['Monolids','Blend bronze upward in a soft oval and deepen only the lash base.','The gradient remains visible with the eye open.'],['Deep skin','Choose copper-bronze and vivid coral-red.','Higher chroma keeps the colors clear on deeper skin.']],
    mistakes: [['Sunscreen pills under makeup','The base was rubbed before sunscreen set.','Wait several minutes, then press makeup on with fingers or a sponge.'],['Cream color slides','Too much emollient product was layered.','Use thinner layers and set only crease-prone areas with translucent powder.'],['Bronze looks muddy','The shade is too dull for the undertone.','Choose neutral bronze for cool skin or golden bronze for warm skin.']],
    shoppingRole: 'travel-friendly cream bronze stick'
  },
  {
    id: 'elegant-dinner-party-makeup', hub: 'occasion-makeup', title: 'Elegant Dinner Party Makeup', time: 30, difficulty: 'Intermediate', finish: 'velvet satin', featured: false, contentUpdatedAt: '2026-07-12',
    intent: 'Create refined evening makeup with sculpted plum definition and a restrained satin finish.',
    description: 'A plum, pewter, and muted-wine dinner look with softly sculpted eyes and a polished complexion that avoids heavy contour.',
    answer: 'Build plum depth at the outer lash line, use pewter satin sparingly on the lid, and repeat muted wine on cheeks and lips for a unified result.',
    occasions: ['dinner party', 'formal evening'], eyes: ['almond', 'deep-set', 'downturned'], tones: ['fair', 'light', 'medium', 'deep'], undertones: ['cool', 'neutral', 'warm'],
    palette: [['Soft plum','#6E4A5D','outer definition','outer lid and lash line'],['Pewter taupe','#8B8383','satin lid shade','center mobile lid'],['Muted wine','#8A4D5A','cheek and lip color','upper cheek and lips']],
    prep: 'Smooth a lightweight primer only across pores and let skincare settle fully.', base: 'Apply medium coverage in the center and sheer it toward the jaw for a skin-like edge.', brows: 'Extend the brow tail no farther than the lifted eye-shadow angle.', definition: 'Blend plum into the outer quarter and press it between the upper lashes.', finishStep: 'Use a muted-wine satin lip and powder in a narrow band beside the nose.',
    placement: ['Keep plum concentrated at lash level before diffusing upward.','Place pewter on the center lid to catch table-level light.','Angle cheek color toward the temple without hollowing the face.'],
    adjustments: [['Downturned eyes','End the plum before the natural outer corner and lift the blend.','The shadow creates an upward visual line.'],['Warm undertones','Choose aubergine-brown and warm pewter.','These versions keep depth without looking overly cool.'],['Deep-set eyes','Keep pewter across the mobile lid and use plum only at the lashes.','The reflective center brings the lid forward.']],
    mistakes: [['Plum looks bruised','It was blended too low without lash definition.','Clean the lower edge and add espresso tightly between upper lashes.'],['Pewter turns silver','The shade is too pale or heavily layered.','Mix it with taupe and press on one thin satin layer.'],['Contour competes with the eye','Dark sculpting was added under the cheek.','Soften it with the base sponge and keep dimension in blush placement.']],
    shoppingRole: 'plum and pewter eye duo'
  },
  {
    id: 'natural-job-interview-makeup', hub: 'occasion-makeup', title: 'Natural Job Interview Makeup', time: 15, difficulty: 'Beginner', finish: 'natural matte', featured: false, contentUpdatedAt: '2026-07-12',
    intent: 'Create composed interview makeup that reads clearly in person and on camera without distraction.',
    description: 'A neutral interview makeup routine with tidy brows, soft brown definition, balanced skin, and a comfortable rose-beige lip.',
    answer: 'Even only the areas that need it, define lashes with soft brown, groom brows, and use a muted rose-beige lip that can be reapplied easily.',
    occasions: ['job interview', 'professional meeting'], eyes: ['hooded', 'deep-set', 'round'], tones: ['fair', 'light', 'medium', 'deep'], undertones: ['cool', 'neutral', 'warm'],
    palette: [['Neutral taupe','#81736C','matte eye wash','lid and crease'],['Soft brown','#5C463D','lash definition','upper lash roots'],['Rose beige','#9C6A68','cheek and lip color','cheeks and lips']],
    prep: 'Use familiar skincare and avoid testing a new texture on interview day.', base: 'Apply thin coverage where redness or discoloration distracts, then check in window light.', brows: 'Fill sparse points with short strokes and set the shape without making it rigid.', definition: 'Tightline only the upper lashes and soften the line with matte taupe.', finishStep: 'Press rose-beige color into lips and carry the product for a quick touch-up.',
    placement: ['Keep all eye definition above the lower waterline for a rested look.','Place blush just behind the cheek center for balanced color.','Powder only where camera light creates distracting shine.'],
    adjustments: [['Video interviews','Use slightly more cheek and lip color than in-person makeup.','Webcams can reduce facial contrast.'],['Deep skin','Choose cocoa taupe and a deeper rose-brown lip.','Adequate depth prevents an ashy finish.'],['Cool undertones','Use mushroom taupe and blue-rose beige.','These shades stay neutral on cooler skin.']],
    mistakes: [['The base looks mask-like','Coverage was carried evenly over the entire face.','Sheer the perimeter with a damp sponge until natural skin shows.'],['Brows draw too much attention','The front edge was squared off.','Brush upward with a clean spoolie and remove product at the inner edge.'],['Lip color fades unevenly','A thick creamy layer was applied.','Blot, add a second thin layer, and keep the center comfortable with balm.']],
    shoppingRole: 'reliable neutral eye and brow kit'
  },
  {
    id: 'soft-glam-hooded-eyes', hub: 'eye-shape-makeup', title: 'Soft Glam for Hooded Eyes', time: 30, difficulty: 'Intermediate', finish: 'soft satin', featured: true, contentUpdatedAt: '2026-07-11',
    intent: 'Keep a soft-glam gradient visible on hooded eyes while minimizing transfer.',
    description: 'A hooded-eye soft glam recipe that maps taupe above the fold, controls lid shimmer, and keeps the outer shape lifted.',
    answer: 'Map the transition with eyes open, keep shimmer on the visible center lid, and build depth at the outer lash line instead of inside the fold.',
    occasions: ['evening', 'wedding guest'], eyes: ['hooded'], tones: ['fair', 'light', 'medium', 'deep'], undertones: ['cool', 'neutral', 'warm'],
    palette: [['Visible taupe','#806E67','matte transition','just above the hood fold'],['Satin rose','#AE747B','lid focal shade','visible center lid'],['Cobalt micro-liner','#244C8A','micro-wing definition','outer upper lash line']],
    prep: 'Blot the lids and use a thin eye base from lashes to just above the fold.', base: 'Complete the complexion after testing the open-eye shadow placement.', brows: 'Keep the underside of the brow clean but avoid bright shimmer there.', definition: 'Draw cobalt between the outer upper lashes, then lift a micro-wing a few millimeters toward the brow tail.', finishStep: 'Curl lashes at the root and use mascara mainly on the center and outer lashes.',
    placement: ['Look straight ahead to place taupe where it remains visible.','Keep satin below the taupe border to reduce transfer.','Leave a small clean gap below the brow for separation.'],
    adjustments: [['Very deep hood','Use a smaller brush and move the matte transition only a few millimeters above the fold.','A controlled band preserves lid space.'],['Round hooded eyes','Extend the cobalt micro-wing slightly outward before lifting.','This lengthens without closing the eye.'],['Deep skin','Use rich taupe, bronze-rose satin, and an opaque cobalt liner.','Enough contrast keeps every color zone visible without ashiness.']],
    mistakes: [['The gradient disappears','All shadow was placed inside the closed-eye crease.','Re-map the transition while looking straight ahead.'],['Shimmer transfers high','The lid shade is too wet or too broad.','Press less product on the visible center and set the fold with matte taupe.'],['Liner consumes the lid','A thick cobalt band was drawn above the lashes.','Keep cobalt between the outer lashes and end with a very thin micro-wing.']],
    shoppingRole: 'precise opaque cobalt micro-liner'
  },
  {
    id: 'everyday-makeup-deep-set-eyes', hub: 'eye-shape-makeup', title: 'Everyday Makeup for Deep-Set Eyes', time: 15, difficulty: 'Easy', finish: 'bright satin', featured: false, contentUpdatedAt: '2026-07-12',
    intent: 'Brighten deep-set eyes without adding extra socket depth.',
    description: 'An everyday deep-set eye recipe that keeps the lid light, uses definition at the roots, and avoids dark crease shading.',
    answer: 'Use a light satin across the mobile lid, keep medium shadow above rather than inside the socket, and concentrate liner between the lashes.',
    occasions: ['everyday', 'office'], eyes: ['deep-set'], tones: ['fair', 'light', 'medium', 'deep'], undertones: ['cool', 'neutral', 'warm'],
    palette: [['Soft beige','#B69D8B','bright lid shade','mobile lid'],['Light taupe','#948177','soft structure','above the socket edge'],['Brown espresso','#513C34','lash definition','upper lash roots']],
    prep: 'Hydrate the eye area lightly and avoid thick primer in the natural socket.', base: 'Use concealer at the inner corner and blend outward without filling every crease.', brows: 'Lift brow hairs and keep the lower brow edge softly defined.', definition: 'Press espresso between the upper lashes, stopping before a heavy outer block forms.', finishStep: 'Add satin to the lid center and curl lashes away from the brow bone.',
    placement: ['Keep the darkest tone at lash level, not in the socket.','Bring light satin across the full mobile lid.','Blend taupe just above the natural hollow with a clean edge below the brow.'],
    adjustments: [['Hooded and deep-set eyes','Place light satin only on the visible center and map taupe with eyes open.','This protects both brightness and visible structure.'],['Cool undertones','Choose pink-beige and mushroom taupe.','Cool neutrals avoid a yellow cast.'],['Deep skin','Use caramel satin and medium cocoa structure.','Light does not need to mean pale or ashy.']],
    mistakes: [['Eyes look more recessed','Dark shadow was packed into the socket.','Remove depth with a base-colored matte and brighten the lid.'],['Mascara marks the brow bone','Lashes touched skin before drying.','Use a thinner coat and look downward until it sets.'],['Inner corner looks chalky','The brightener is too pale.','Choose a satin one or two shades lighter than the skin, not white.']],
    shoppingRole: 'skin-tone satin lid shade'
  },
  {
    id: 'elongated-eye-makeup-round-eyes', hub: 'eye-shape-makeup', title: 'Elongated Eye Makeup for Round Eyes', time: 25, difficulty: 'Intermediate', finish: 'soft matte', featured: true, contentUpdatedAt: '2026-07-12',
    intent: 'Create horizontal length on round eyes without a sharp graphic wing.',
    description: 'A softly elongated round-eye look using sideward taupe placement, outer lash definition, and controlled lower shadow.',
    answer: 'Pull mid-tone shadow outward from the outer iris, keep the inner lid bright, and place mascara toward the outer lashes to create length.',
    occasions: ['evening', 'date night'], eyes: ['round'], tones: ['fair', 'light', 'medium', 'deep'], undertones: ['neutral', 'warm', 'cool'],
    palette: [['Mid taupe','#806D63','elongating transition','outer half and slightly beyond corner'],['Soft bronze','#9B7657','lid dimension','center to outer lid'],['Deep brown','#49352F','lash depth','outer upper and lower lashes']],
    prep: 'Prime the outer eye and set only the inner half with a small amount of powder.', base: 'Clean the outer shadow edge before applying concealer or base.', brows: 'Direct the brow tail outward without extending it down.', definition: 'Smudge deep brown from the outer iris to a lifted endpoint just beyond the corner.', finishStep: 'Angle outer lashes sideways with mascara and leave the inner lower lash line clean.',
    placement: ['Begin elongation at the outer iris, not the inner corner.','Keep the lower shadow on the outer third only.','Blend the endpoint softly so the shape stays wearable.'],
    adjustments: [['Prominent eyes','Use matte bronze instead of high shine on the center lid.','A matte surface creates length without adding roundness.'],['Downturned round eyes','Lift the endpoint before the natural corner drops.','The outer line supports rather than follows the downturn.'],['Deep skin','Use rich cocoa and copper-brown instead of pale taupe.','Deeper neutrals keep the horizontal shape visible.']],
    mistakes: [['The eye looks rounder','Dark color circles the entire lash line.','Remove inner lower shadow and focus definition from the outer iris outward.'],['The wing looks disconnected','The endpoint starts after a gap at the lash line.','Build from between the outer lashes before extending.'],['Both ends look heavy','The inner corner was darkened to match the outer corner.','Brighten the inner third and keep weight only at the outer edge.']],
    shoppingRole: 'smudgeable deep brown pencil'
  },
  {
    id: 'soft-shimmer-makeup-monolids', hub: 'eye-shape-makeup', title: 'Soft Shimmer Makeup for Monolids', time: 20, difficulty: 'Easy', finish: 'soft shimmer', featured: true, contentUpdatedAt: '2026-07-12',
    intent: 'Build visible shimmer and depth on monolids without relying on a crease.',
    description: 'A monolid shimmer recipe using a vertical gradient, root-level definition, and a centered reflective point that stays visible.',
    answer: 'Blend depth upward from the lash roots, press shimmer at the center of the visible lid, and keep the upper edge softly diffused.',
    occasions: ['everyday', 'evening'], eyes: ['monolid'], tones: ['fair', 'light', 'medium', 'deep'], undertones: ['cool', 'neutral', 'warm'],
    palette: [['Cocoa matte','#74564B','root depth','upper lash roots'],['Rose copper','#B17868','shimmer focal shade','center visible lid'],['Soft tan','#A48777','gradient edge','upper edge of eye color']],
    prep: 'Blot the lid and apply eye base in a thin layer from lashes to the visible upper boundary.', base: 'Finish the eye first if the shimmer formula has loose particles.', brows: 'Keep brow definition light so the vertical eye gradient has breathing room.', definition: 'Press cocoa along the full upper lash root, deepest at the outer half.', finishStep: 'Tap rose copper onto the center, then soften only its upper edge with tan.',
    placement: ['Build a vertical root-to-brow gradient instead of drawing a false crease.','Keep the brightest point on the center visible lid.','Use the lower lash line only on the outer third for balance.'],
    adjustments: [['Low crease monolids','Keep shimmer below the upper fold and use a drier formula.','This reduces transfer while preserving reflection.'],['Cool undertones','Choose rose-taupe shimmer instead of orange copper.','The reflection stays flattering rather than brassy.'],['Deep skin','Use rich espresso at the root and saturated copper-rose.','Strong pigment keeps the gradient visible.']],
    mistakes: [['Shimmer disappears','It was placed only on the hidden lower lid.','Look forward and press shimmer onto the visible center.'],['The eye looks puffy','One pale shimmer covers the whole lid.','Restore cocoa at the roots and tan at the upper edge.'],['The gradient has a hard line','The upper border was blended with a dirty brush.','Use a clean small brush and short horizontal strokes at the edge only.']],
    shoppingRole: 'smooth rose-copper shimmer single'
  },
  {
    id: 'lifted-makeup-downturned-eyes', hub: 'eye-shape-makeup', title: 'Lifted Makeup for Downturned Eyes', time: 25, difficulty: 'Intermediate', finish: 'satin matte', featured: true, contentUpdatedAt: '2026-07-12',
    intent: 'Create a lifted eye shape without forcing a long or sharp wing.',
    description: 'A downturned-eye placement guide using an early lifted endpoint, upward outer shading, and selective lower-lash definition.',
    answer: 'Stop shadow before the natural corner drops, lift the endpoint toward the brow tail, and keep the outer lower lash line mostly clean.',
    occasions: ['everyday', 'evening'], eyes: ['downturned'], tones: ['fair', 'light', 'medium', 'deep'], undertones: ['neutral', 'warm', 'cool'],
    palette: [['Lift taupe','#806F67','outer structure','outer lid angled upward'],['Satin beige','#B69A82','lid light','inner and center lid'],['Deep cocoa','#4F3932','lash lift','upper lashes ending before downturn']],
    prep: 'Mark the lifted endpoint with eyes open before laying down any dark color.', base: 'Keep the outer eye free of heavy concealer until the lifted shape is complete.', brows: 'Brush the tail slightly upward and avoid drawing it down toward the temple.', definition: 'Press cocoa through the upper lashes and flick it up before the natural corner turns down.', finishStep: 'Add mascara mainly to center and upper outer lashes while leaving lower outer lashes light.',
    placement: ['Choose the endpoint before the outer corner descends.','Blend taupe up and inward from that point.','Keep lower shadow under the iris or skip it entirely at the outer edge.'],
    adjustments: [['Hooded downturned eyes','Use a very short lifted wedge visible above the fold.','A compact shape avoids transfer and keeps the lift readable.'],['Round downturned eyes','Extend slightly outward before lifting.','A small horizontal section adds length before elevation.'],['Deep skin','Use dark cocoa with a warm caramel transition.','Enough depth creates structure without a gray cast.']],
    mistakes: [['The wing follows the downturn','The line was drawn along the last lashes to their lowest point.','End earlier and place the endpoint with eyes open.'],['Outer shadow looks detached','The lifted wedge has no connection to the lash roots.','Blend its lower edge into the outer upper lashes.'],['Lower mascara pulls the eye down','Heavy product coats the outer lower lashes.','Comb it away and keep emphasis on upper center and outer lashes.']],
    shoppingRole: 'precise smudge-resistant cocoa pencil'
  },
  {
    id: 'balanced-eye-makeup-close-set-eyes', hub: 'eye-shape-makeup', title: 'Balanced Eye Makeup for Close-Set Eyes', time: 20, difficulty: 'Easy', finish: 'bright satin', featured: false, contentUpdatedAt: '2026-07-12',
    intent: 'Create visual space between close-set eyes with brightness and outer-focused definition.',
    description: 'A close-set eye recipe that keeps the inner corners clear, places depth beyond the iris, and directs lashes outward.',
    answer: 'Keep the inner third bright and clean, begin deeper shadow after the pupil, and direct liner and mascara toward the outer half.',
    occasions: ['everyday', 'office'], eyes: ['close-set'], tones: ['fair', 'light', 'medium', 'deep'], undertones: ['cool', 'neutral', 'warm'],
    palette: [['Bright satin','#C2AA96','inner lid light','inner third of lid'],['Neutral taupe','#86746C','outer structure','outer half of lid'],['Brown espresso','#513A34','lash definition','outer upper lash line']],
    prep: 'Correct inner-corner darkness lightly before adding eye color.', base: 'Blend concealer away from the nose so it does not collect at the inner eye.', brows: 'Avoid overextending the inner brow; begin hairlike strokes at the natural start.', definition: 'Start espresso near the center of the upper lash line and extend softly outward.', finishStep: 'Add mascara to the outer half and clean any shadow from the inner bridge area.',
    placement: ['Reserve the inner third for light satin or bare skin.','Begin taupe outside the pupil and blend outward.','Keep brow fronts soft and at their natural starting points.'],
    adjustments: [['Hooded close-set eyes','Place light satin on the visible inner lid and taupe above the outer fold.','Both spacing and visibility are preserved.'],['Deep skin','Use warm gold-beige light and rich cocoa depth.','The inner highlight stays luminous without turning pale.'],['Cool undertones','Choose pearl-taupe light and mushroom outer shade.','Cooler neutrals avoid yellowing the inner eye.']],
    mistakes: [['Eyes look closer together','Dark shadow reaches the inner corner or nose bridge.','Remove inner depth with a clean brush and add skin-tone satin.'],['The outer half looks abrupt','Taupe starts in a vertical block at the pupil.','Blend the start with a clean brush so it fades gradually.'],['Brows crowd the center','Pencil extends beyond the natural brow start.','Remove the extra inner strokes and brush the front upward.']],
    shoppingRole: 'bright satin and neutral taupe eye duo',
    decisionGuideOverride: {
      heading: 'How to decide if Balanced Eye Makeup for Close-Set Eyes is the right tutorial',
      summary: 'This 20-minute close-set eye routine uses negative space as deliberately as shadow. The inner corners and brow fronts stay visually open, taupe begins beyond the pupil, and the darkest definition is reserved for the outer upper lashes. Those placement decisions make the eyes appear farther apart without relying on a long wing. Each checkpoint is judged straight on, because an angled mirror can hide inner-corner crowding that is obvious in conversation or an office video call.',
      items: [
        {
          title: 'Choose it when the inner eye feels crowded',
          body: 'Use this tutorial when shadow, liner, or strong brow fronts make the space above the nose bridge look compressed. It is designed for a polished daytime result: the inner lid remains bright, the transition starts after the pupil, and mascara is weighted toward the outer half. Choose another tutorial if your main concern is a recessed socket or a hidden mobile lid, because those shapes need vertical brightness decisions rather than this page\'s horizontal spacing strategy.'
        },
        {
          title: 'Build a light-to-dark path away from the bridge',
          body: 'Think of the palette as a horizontal gradient. A skin-compatible satin creates clean reflection beside the tear duct, neutral taupe begins softly near the center and gains strength outward, and brown espresso finishes only the outer upper lash line. The exact undertone can change, but the value order should not: lightest inside, midtone through the outer lid, deepest at the outside roots. Reversing that order visually pulls the eyes back toward the nose.'
        },
        {
          title: 'Adapt the spacing map to lid visibility and skin depth',
          body: 'On hooded close-set eyes, place the satin where it can still be seen with the eyes open and lift the taupe slightly above the outer fold; do not carry either shade into the nose-side socket. On deep skin, replace pale beige with warm gold-beige and choose rich cocoa instead of gray taupe so the gradient stays luminous rather than ashy. Cool complexions can use pearl-taupe and mushroom, provided the inner shade remains close enough to the skin to avoid a white dot.'
        },
        {
          title: 'Close-set priority: open the inner distance',
          body: 'Close-set eyes need a spacing strategy before they need more darkness. This page keeps the inner lid bright, moves structure toward the outer half, and prevents brow pencil or liner from crowding the nose bridge. If the eyes appear closer together, remove depth from the inner corner first, then rebuild only the outer upper lash line. The goal is a wider-looking center gap with enough espresso at the outside to keep the eyes defined. A useful final check is the bridge test: the brightest satin should sit near the tear duct, the taupe should begin after the inner third, and the brow fronts should look brushed open rather than shaded inward. Check a phone selfie straight on; the center space should read cleaner before the outer wing reads stronger.'
        },
        {
          title: 'Run three spacing checks before building depth',
          body: 'Face the mirror squarely and inspect three landmarks. First, the tear-duct side should remain the cleanest and lightest zone. Second, taupe should fade in gradually after the pupil rather than starting as a vertical stripe. Third, the brow fronts must end at their natural starting points and remain softer than the tails. If all three are true, adding more darkness will not improve the spacing illusion; it will only make the daytime finish heavier.'
        },
        {
          title: 'Repair crowding without restarting the eye',
          body: 'If the eyes look closer together, sweep a clean brush through the inner socket and bridge-side lid, then press a skin-tone satin over the cleared area. If the outside now looks disconnected, blur only the leading edge of the taupe with tiny inward strokes; do not drag the dark color back to the tear duct. Brow pencil that has crossed the natural start should be lifted with a spoolie rather than covered with concealer, which can leave a conspicuous pale block.'
        },
        {
          title: 'Stop when the center reads open at conversation distance',
          body: 'Step back until the whole face is visible. The two inner corners should catch light without obvious white spots, the taupe should be noticed mainly outside the pupils, and the lash emphasis should point outward without becoming a graphic wing. Check one straight-on phone photo as well as the mirror. When the bridge area looks cleaner before the liner looks stronger, the spacing goal is complete; another layer of shadow is more likely to undo it than refine it.'
        }
      ]
    }
  },
  {
    id: 'cool-rosy-makeup-fair-skin', hub: 'skin-tone-undertone', title: 'Cool Rosy Makeup for Fair Skin', time: 20, difficulty: 'Easy', finish: 'soft rosy satin', featured: true, contentUpdatedAt: '2026-07-12',
    intent: 'Use cool rosy color on fair skin without creating redness or a frosty finish.',
    description: 'A fair-skin cool rose recipe with mushroom definition, controlled blush placement, and a soft raspberry-beige lip.',
    answer: 'Pair a muted cool rose with mushroom taupe, keep blush away from existing facial redness, and choose satin instead of icy shimmer.',
    occasions: ['everyday', 'date night'], eyes: ['hooded', 'almond', 'round'], tones: ['fair'], undertones: ['cool', 'neutral'],
    palette: [['Mushroom taupe','#82736F','eye structure','crease and outer lash line'],['Cool rose','#B77989','lid and cheek color','lid center and upper cheek'],['Raspberry beige','#9F5F72','lip balance','the lips']],
    prep: 'Use a sheer green corrector only on concentrated redness, not over the full face.', base: 'Apply light coverage and let natural freckles or skin variation remain visible.', brows: 'Choose an ash or neutral brow tone rather than a warm red-brown.', definition: 'Blend mushroom taupe at the outer lash line and keep the lower eye clean.', finishStep: 'Place cool rose high on the cheek and blot raspberry-beige onto the lips.',
    placement: ['Keep blush behind the center of the cheek if the nose area is naturally red.','Use rose satin on the lid center, not under the brow.','Anchor cool colors with neutral mushroom at the lashes.'],
    adjustments: [['Visible surface redness','Use less pink on the central cheek and place it higher and farther back.','The blush reads intentional instead of merging with redness.'],['Neutral undertones','Add a small amount of beige to rose shades.','The result stays rosy without looking blue.'],['Very fair skin','Build all colors with a nearly clean brush.','Thin layers prevent sudden patches of contrast.']],
    mistakes: [['Rose looks like irritation','Blush sits low and close to the nose.','Lift placement toward the outer upper cheek and soften the inner edge.'],['The lid looks frosty','A white-based pink shimmer was used.','Switch to muted rose satin with a skin-tone base.'],['Brows look reddish','A warm brow pencil competes with cool makeup.','Use neutral taupe strokes and brush through thoroughly.']],
    shoppingRole: 'muted cool rose multi-use color'
  },
  {
    id: 'warm-peach-makeup-fair-skin', hub: 'skin-tone-undertone', title: 'Warm Peach Makeup for Fair Skin', time: 18, difficulty: 'Easy', finish: 'fresh satin', featured: false, contentUpdatedAt: '2026-07-12',
    intent: 'Use warm peach on fair skin in sheer layers that stay fresh rather than orange.',
    description: 'A sheer peach and soft-caramel makeup recipe for fair warm skin, with placement that keeps warmth controlled and transparent.',
    answer: 'Choose a translucent pink-peach, ground it with light caramel taupe, and apply in thin layers so the warmth never becomes an opaque orange block.',
    occasions: ['everyday', 'brunch'], eyes: ['almond', 'round', 'monolid'], tones: ['fair'], undertones: ['warm', 'neutral'],
    palette: [['Light caramel','#9B7B68','eye transition','lid and soft crease'],['Pink peach','#D28773','cheek and lip color','upper cheek and lips'],['Soft bronze','#8C6B57','lash definition','outer upper lash line']],
    prep: 'Use a thin hydrating base and avoid heavy yellow corrector across the face.', base: 'Spot-conceal and keep the complexion translucent around the cheeks.', brows: 'Use neutral light-brown strokes and avoid overly warm brow color.', definition: 'Smudge soft bronze through the outer upper lashes.', finishStep: 'Tap pink-peach onto cheeks and lips, then blend with the remaining base sponge.',
    placement: ['Keep peach high and sheer with a diffused lower edge.','Use light caramel around, not far above, the eye socket.','Leave a clean skin border between cheek color and under-eye concealer.'],
    adjustments: [['Neutral undertones','Mix peach with a small amount of muted rose.','The warmth stays balanced instead of yellow.'],['Freckled fair skin','Use sheer base and place cream color between visible freckles.','Natural variation keeps the look believable.'],['Round eyes','Extend caramel slightly beyond the outer iris.','A horizontal blend balances the rounded shape.']],
    mistakes: [['Peach turns orange','The formula is opaque or too yellow.','Sheer it with base and switch to pink-peach.'],['The face looks uniformly warm','Bronzer and peach cover the same wide area.','Remove bronzer near the cheek and let peach be the only warm focal color.'],['Eye color disappears','The caramel is too close to the skin tone.','Add a small amount of soft bronze at the lash roots.']],
    shoppingRole: 'sheer pink-peach cream blush'
  },
  {
    id: 'neutral-soft-glam-olive-skin', hub: 'skin-tone-undertone', title: 'Neutral Soft Glam for Olive Skin', time: 28, difficulty: 'Intermediate', finish: 'neutral satin', featured: true, contentUpdatedAt: '2026-07-12',
    intent: 'Create neutral soft glam on olive skin without pulling too orange, pink, or gray.',
    description: 'An olive-skin soft glam recipe built from balanced taupe, muted mauve-brown, and antique beige satin.',
    answer: 'Use balanced taupe and muted mauve-brown rather than strongly orange bronze, then add antique beige satin for dimension without ashiness.',
    occasions: ['evening', 'wedding guest'], eyes: ['almond', 'hooded', 'deep-set'], tones: ['light', 'medium'], undertones: ['olive', 'neutral'],
    palette: [['Balanced taupe','#7C6B62','eye transition','crease and outer lid'],['Antique beige','#A58A6E','satin focal shade','center mobile lid'],['Mauve brown','#80575A','cheek and lip color','upper cheek and lips']],
    prep: 'Use complexion products with neutral or olive undertones and avoid over-correcting natural green tones.', base: 'Blend a thin neutral base from the center outward and correct only clear discoloration.', brows: 'Use neutral brown and keep the front softly feathered.', definition: 'Press deep neutral brown into the upper lashes and soften with balanced taupe.', finishStep: 'Repeat muted mauve-brown on cheeks and lips to tie the neutral palette together.',
    placement: ['Keep antique beige on the lid center so it adds light without turning pale.','Use mauve-brown high on the cheek for color that stays neutral.','Check the base at the jaw in daylight before adding warmth.'],
    adjustments: [['Cool olive skin','Choose mushroom taupe and plum-mauve.','Cooler neutrals avoid an orange shift.'],['Warm olive skin','Choose caramel taupe and rose-brown.','Slight warmth supports the skin without turning brassy.'],['Hooded eyes','Map taupe above the visible fold and keep satin narrow.','The neutral gradient remains visible when open.']],
    mistakes: [['Bronze turns orange','The transition has a strong terracotta base.','Neutralize with taupe and use a balanced brown at the lashes.'],['Mauve looks gray','The cheek color is too pale or cool.','Layer a deeper rose-brown through the center.'],['Foundation looks peach','The base lacks olive or neutral balance.','Sheer it and spot-correct instead of adding more warm pigment.']],
    shoppingRole: 'balanced neutral taupe palette'
  },
  {
    id: 'warm-bronze-makeup-medium-skin', hub: 'skin-tone-undertone', title: 'Warm Bronze Makeup for Medium Skin', time: 25, difficulty: 'Easy', finish: 'warm satin', featured: true, contentUpdatedAt: '2026-07-12',
    intent: 'Build warm bronze dimension on medium skin without losing contrast.',
    description: 'A medium-skin bronze recipe using caramel transition, copper satin, and terracotta-rose color for clear warm definition.',
    answer: 'Layer caramel and copper instead of one flat bronze, keep espresso at the lash roots, and use terracotta-rose to balance warmth across the face.',
    occasions: ['evening', 'vacation'], eyes: ['almond', 'round', 'monolid'], tones: ['medium'], undertones: ['warm', 'neutral'],
    palette: [['Caramel matte','#9A684B','eye transition','crease and lid edge'],['Copper satin','#B56F42','lid focal shade','center and inner lid'],['Terracotta rose','#A85F54','cheek and lip color','upper cheek and lips']],
    prep: 'Hydrate, then blot the T-zone so warm satin reads as light rather than oil.', base: 'Use a medium-skin match through the center and leave the outer face sheer.', brows: 'Define with neutral deep brown instead of warm orange-brown.', definition: 'Press espresso between upper lashes and soften into the caramel outer corner.', finishStep: 'Apply terracotta-rose to cheeks and lips, then add copper only to the lid center.',
    placement: ['Layer caramel at the outer eye and copper at the center for separate values.','Keep terracotta-rose above the natural hollow of the cheek.','Use espresso at the lash roots to maintain contrast.'],
    adjustments: [['Neutral undertones','Choose rose-terra cotta and neutral bronze.','Less yellow warmth keeps the palette balanced.'],['Round eyes','Extend caramel outside the outer iris and keep copper centered.','The two placements create length and dimension.'],['Monolids','Build caramel upward from the roots and press copper on the visible center.','A vertical gradient keeps both shades readable.']],
    mistakes: [['The eye looks flat','One bronze shade covers every zone.','Restore caramel at the edge, copper at the center, and espresso at the roots.'],['Warmth turns orange','Every product has a strong orange base.','Replace one layer with neutral brown or muted rose.'],['Copper emphasizes texture','A flaky shimmer was swept over the lid.','Use a smooth satin pressed in one thin layer over hydrated lids.']],
    shoppingRole: 'caramel and copper eye palette'
  },
  {
    id: 'rich-berry-gold-makeup-deep-skin', hub: 'skin-tone-undertone', title: 'Rich Berry and Gold Makeup for Deep Skin', time: 30, difficulty: 'Intermediate', finish: 'rich luminous', featured: true, contentUpdatedAt: '2026-07-12',
    intent: 'Create saturated berry and gold makeup on deep skin without ashy edges or weak pigment.',
    description: 'A deep-skin makeup recipe with rich wine structure, warm gold reflection, and berry color that stays saturated across eyes, cheeks, and lips.',
    answer: 'Use saturated wine over a compatible base, choose warm old gold rather than pale champagne, and keep deep brown at the lash line for structure.',
    occasions: ['evening', 'holiday party'], eyes: ['hooded', 'monolid', 'almond'], tones: ['deep'], undertones: ['warm', 'neutral', 'cool'],
    palette: [['Rich wine','#713747','eye structure','outer lid and crease'],['Warm old gold','#C18A38','lid focal shade','center and inner lid'],['Deep berry','#7B304D','cheek and lip color','upper cheek and lips']],
    prep: 'Use an eye base close to the skin depth or a warm brown cream beneath pigment.', base: 'Match the center and perimeter carefully and avoid bright powder around the mouth.', brows: 'Use deep neutral brown with visible hair texture.', definition: 'Press the deepest brown through the lashes before adding wine around it.', finishStep: 'Layer deep berry on lips and cheeks, then press warm gold onto the lid center.',
    placement: ['Keep old gold concentrated on the mobile lid for a rich focal point.','Blend wine with a warm brown edge rather than a pale beige edge.','Place berry where light naturally catches the upper cheek.'],
    adjustments: [['Cool undertones','Choose blue-berry wine and a neutral antique gold.','The rich palette stays cool without becoming gray.'],['Warm undertones','Choose red-wine berry and yellow old gold.','Warm saturation connects cleanly to the skin.'],['Hooded eyes','Keep gold on the visible center and blend wine just above the fold.','Both color zones remain readable with the eye open.']],
    mistakes: [['The edge looks ashy','A pale transition powder was used to blend wine.','Use a medium warm brown or skin-depth powder at the edge.'],['Gold looks chalky','The shimmer has a white base.','Switch to transparent warm gold or layer it over caramel cream.'],['Berry disappears on cheeks','The formula is too sheer or over-blended.','Build a second saturated layer and soften only the perimeter.']],
    shoppingRole: 'saturated wine and warm gold palette'
  },
  {
    id: '5-minute-everyday-makeup', hub: 'everyday-makeup', title: '5-Minute Everyday Makeup', time: 5, difficulty: 'Beginner', finish: 'fresh natural', featured: true, contentUpdatedAt: '2026-07-12',
    intent: 'Complete a credible everyday makeup routine in five minutes with only high-impact steps.',
    description: 'A five-minute routine focused on inner-corner concealer, brows, lashes, and one cream color for cheeks and lips.',
    answer: 'Spend time on the center of the face, brows, curled lashes, and one cheek-lip cream instead of attempting a full complexion and detailed eye.',
    occasions: ['everyday', 'errands'], eyes: ['hooded', 'monolid', 'round', 'almond'], tones: ['fair', 'light', 'medium', 'deep'], undertones: ['warm', 'neutral', 'cool'],
    palette: [['Skin-tone taupe','#8D7A70','optional eye wash','lid and crease'],['Fresh rose','#B46874','cheek and lip color','upper cheek and lips'],['Soft brown','#61483F','brow and lash definition','brows and upper lashes']],
    prep: 'Apply sunscreen before the five-minute timer starts and keep tools within reach.', base: 'Conceal inner eye corners, nose redness, and one or two marks only.', brows: 'Brush and set brows in one pass, filling only the clearest gap.', definition: 'Curl lashes and press soft brown between the outer upper lashes if time allows.', finishStep: 'Tap one cream color onto both cheeks and lips, then blend with fingers.',
    placement: ['Concentrate base correction at the center for the greatest visible change.','Keep cheek color high so quick blending does not pull the face down.','Treat the taupe eye wash as optional, not a required delay.'],
    adjustments: [['Hooded eyes','Skip lid color and prioritize curled lashes plus visible brow shape.','These steps remain visible and use the limited time well.'],['Deep skin','Choose saturated rose-brown rather than pale pink cream.','One product needs enough depth to carry cheeks and lips.'],['Dry skin','Blend concealer with a fingertip and skip powder except beside the nose.','Minimal texture keeps the quick base fresh.']],
    mistakes: [['Five minutes becomes fifteen','Too many optional products are open.','Preselect one base, one brow product, mascara, and one cream color.'],['The base looks spotty','Concealer edges were not blended.','Tap around each spot with a clean finger until no boundary remains.'],['Cheeks look uneven','Different amounts were applied to each side.','Touch both cheeks once before blending either side.']],
    shoppingRole: 'reliable cheek and lip cream'
  },
  {
    id: 'natural-no-makeup-makeup', hub: 'everyday-makeup', title: 'Natural No-Makeup Makeup', time: 15, difficulty: 'Easy', finish: 'barely-there satin', featured: true, contentUpdatedAt: '2026-07-19',
    intent: 'Create believable no-makeup makeup with pinpoint correction, quiet lash definition, and translucent color that still looks like real skin.',
    description: 'A 15-minute no-makeup makeup tutorial with pinpoint concealing, airy brows, soft-brown lashes, sheer rose cheeks, transparent lip tint, and honest step visuals.',
    answer: 'Correct only the areas that interrupt evenness, keep freckles and perimeter skin uncovered, then add airy brows, soft-brown lash depth, sheer rose cheeks, and a transparent lip tint.',
    occasions: ['everyday', 'casual daytime'], eyes: ['hooded', 'monolid', 'deep-set', 'round'], tones: ['fair', 'light', 'medium', 'deep'], undertones: ['warm', 'neutral', 'cool'],
    palette: [['Skin-shadow taupe','#8C7B72','invisible eye structure','lash line and crease edge'],['Natural flush','#B56E70','sheer cheek color','cheek center diffused upward'],['Lip tone rose','#9E6468','lip evening','center of lips']],
    prep: 'Let moisturizer and sunscreen settle, then blot only where the skin feels slippery.', base: 'Spot-correct discoloration with a precise brush and melt each edge with fingers.', brows: 'Brush hairs into place and add only a few hairlike strokes.', definition: 'Press skin-shadow taupe between the upper lashes, curl them, and comb through one thin coat of soft-brown mascara so no visible line remains.', finishStep: 'Press a transparent rose-beige tint from the center of the lips outward, preserving the natural lip edge and texture.',
    placement: ['Keep every edge diffused beyond the exact corrected area.','Place eye depth at the lash roots, not as a visible stripe.','Match cheek placement to the face natural flush pattern, then lift slightly.'],
    adjustments: [['Visible freckles','Correct around rather than over them.','Preserving natural variation prevents a uniform makeup layer.'],['Deep skin','Choose a rich translucent red-brown flush.','A pale base would turn gray instead of invisible.'],['Oily skin','Use thin long-wear concealer and powder only corrected zones.','Targeted setting preserves the bare-skin effect.']],
    mistakes: [['The base is obvious','Tint covers the entire face at one opacity.','Lift product from the perimeter and reintroduce natural skin variation.'],['Brows look styled','Gel creates a glossy rigid block.','Comb through with a clean spoolie and leave a few hairs relaxed.'],['Blush looks like a circle','Color was placed and blended in one small spot.','Diffuse the edge upward and outward with the clean side of the sponge.'],['The eye definition looks like eyeliner','Too much taupe sits above the upper lash roots.','Press a clean detail brush over the visible edge until only root depth remains.'],['The lip looks like lipstick','Too much pigment or gloss covers the natural lip texture.','Blot once, then soften the perimeter with a clean fingertip.']],
    stepGuidance: [
      { ifWrong: 'Blot only the moving or slippery areas and wait another minute before adding complexion product.', proTip: 'Check the skin from the side; settled skincare should reflect softly without sliding under a fingertip.', avoid: 'Avoid adding primer everywhere when only the nose or center forehead still feels slippery.' },
      { ifWrong: 'Tap a clean fingertip around each corrected spot until its boundary disappears into uncovered skin.', proTip: 'Work around freckles instead of covering them so the finished complexion keeps believable variation.', avoid: 'Avoid spreading leftover concealer across the outer cheeks, hairline, temples, or jaw.' },
      { ifWrong: 'Comb both brows through with a clean spoolie and remove product from the inner thirds first.', proTip: 'Add a stroke only where you can still see skin through a genuine gap between brow hairs.', avoid: 'Avoid making the brow fronts, arches, and tails equally dark or perfectly symmetrical.' },
      { ifWrong: 'Use a clean tapered brush to lift any taupe that reads as a visible stripe or hard crease.', proTip: 'Look straight ahead after each light pass; the eye should appear quietly structured, not shadowed.', avoid: 'Avoid extending taupe past the outer eye or building a smoky edge for this low-contrast look.' },
      { ifWrong: 'Comb through the upper lashes immediately and press away any visible line above the roots.', proTip: 'Concentrate the mascara comb at the roots, then pull the remaining product through the tips once.', avoid: 'Avoid a second full mascara coat, a wing, lower-lash darkness, or any visible strip-lash band.' },
      { ifWrong: 'Press the clean side of the sponge around the blush edge, then lift the blend slightly upward.', proTip: 'Place less cream than you think you need and assess both cheeks in straight-on daylight.', avoid: 'Avoid a round opaque patch, low placement below the cheek center, or shimmer over textured areas.' },
      { ifWrong: 'Blot once and soften the lip perimeter with a clean fingertip until natural grooves show again.', proTip: 'Keep the deepest tint at the natural lip center and use only residue near the outer edge.', avoid: 'Avoid overlining, opaque lipstick coverage, or glassy gloss that becomes the main focal point.' },
      { ifWrong: 'Lift excess from the problem area before adding powder, color, or another correction layer.', proTip: 'Compare the face at conversational distance; every individual product should be difficult to identify.', avoid: 'Avoid automatically powdering the full face or intensifying every feature during the final check.' }
    ],
    shoppingRole: 'skin-like precision concealer'
  },
  {
    id: 'easy-everyday-soft-glam', hub: 'everyday-makeup', title: 'Easy Everyday Soft Glam', time: 20, difficulty: 'Easy', finish: 'soft satin', featured: true, contentUpdatedAt: '2026-07-12',
    intent: 'Scale soft glam down for daytime using a limited neutral palette and thin layers.',
    description: 'An everyday soft-glam recipe with a one-brush taupe gradient, satin lid center, soft liner, and muted rose-brown color.',
    answer: 'Use one taupe from sheer to deep, add satin only at the lid center, and soften liner so the result has polish without evening-level intensity.',
    occasions: ['everyday', 'office'], eyes: ['hooded', 'almond', 'round'], tones: ['fair', 'light', 'medium', 'deep'], undertones: ['neutral', 'warm', 'cool'],
    palette: [['Buildable taupe','#837168','eye gradient','lid, crease, and outer corner'],['Soft satin beige','#B29B83','lid light','center mobile lid'],['Rose brown','#9A6261','cheek and lip color','upper cheek and lips']],
    prep: 'Prime only the eyelids and the areas where base usually fades.', base: 'Apply a sheer base and keep coverage lighter around the hairline and jaw.', brows: 'Shape the tail and leave the front feathery.', definition: 'Use the deepest application of taupe at the upper lash roots, then soften with the same brush.', finishStep: 'Tap satin onto the center lid and repeat rose-brown on cheeks and lips.',
    placement: ['Build one taupe in separate intensity zones rather than using many colors.','Keep satin narrow and centered for daytime light.','Place rose-brown high enough to support the eye shape.'],
    adjustments: [['Hooded eyes','Map the sheer taupe above the fold while keeping satin below it.','Both zones stay visible without heavy depth.'],['Round eyes','Carry the deepest taupe from the outer iris slightly outward.','The gradient gains subtle length.'],['Deep skin','Use cocoa taupe, caramel satin, and deep rose-brown.','Appropriate depth preserves the same low-contrast effect.']],
    mistakes: [['The look becomes smoky','Deep taupe covers the full crease.','Lift excess and keep strong pigment at the lash roots only.'],['Satin reads as glitter','The product has large reflective particles.','Choose a smooth satin and press on a single thin layer.'],['Cheek and lip colors clash','Two unrelated undertones were chosen.','Use one muted rose-brown family across both areas.']],
    shoppingRole: 'buildable neutral taupe single'
  },
  {
    id: 'wearable-clean-makeup-look', hub: 'everyday-makeup', title: 'Wearable Clean Makeup Look', time: 15, difficulty: 'Easy', finish: 'clean satin', featured: false, contentUpdatedAt: '2026-07-12',
    intent: 'Create a crisp, wearable clean makeup look without laminated brows or overly glossy skin.',
    description: 'A practical clean makeup recipe with airy brows, pinpoint glow, lifted blush, and soft lash definition for daily wear.',
    answer: 'Keep brows flexible, place glow only on high points, define the upper lashes, and use a lifted translucent blush rather than coating the face in shine.',
    occasions: ['everyday', 'brunch'], eyes: ['hooded', 'monolid', 'almond'], tones: ['fair', 'light', 'medium', 'deep'], undertones: ['warm', 'neutral', 'cool'],
    palette: [['Neutral tan','#9B8272','soft eye wash','lid and upper crease edge'],['Clear rose','#C16E78','lifted cheek color','upper outer cheek'],['Soft espresso','#59413A','lash definition','upper lash roots']],
    prep: 'Use lightweight skincare and wait until the surface is no longer wet.', base: 'Sheer skin tint only through the center and spot-conceal after blush if needed.', brows: 'Lift hairs with flexible gel and press down any that stand vertically.', definition: 'Tightline upper lashes with soft espresso and curl before mascara.', finishStep: 'Place clear rose high on the cheek and tap balm on the lip center only.',
    placement: ['Keep brow fronts airy and avoid a rigid vertical fan.','Place glow on the highest cheek point, not over textured zones.','Lift blush toward the temple while maintaining a soft inner edge.'],
    adjustments: [['Dry skin','Use cream textures and skip powder outside the nose area.','The clean finish stays flexible rather than flaky.'],['Oily skin','Use satin, not glossy, products and set the center strategically.','Controlled light keeps the look clean throughout the day.'],['Deep skin','Choose clear berry-rose and rich espresso.','Saturated translucent color remains visible without chalkiness.']],
    mistakes: [['Brows feel stiff','Too much strong-hold gel was layered.','Comb through with a clean spoolie before the product fully sets.'],['Skin looks wet everywhere','Glow covers the forehead, nose, and cheeks.','Blot the center and keep reflection on two high points only.'],['Blush sits too close to the eye','Color touches the under-eye concealer.','Soften the upper edge and leave a small clear skin gap.']],
    shoppingRole: 'flexible clear brow gel'
  },
  {
    id: 'natural-makeup-mature-skin', hub: 'everyday-makeup', title: 'Natural Makeup for Mature Skin', time: 20, difficulty: 'Easy', finish: 'soft natural satin', featured: true, contentUpdatedAt: '2026-07-12',
    intent: 'Create comfortable natural makeup on mature skin using flexible texture and restrained powder.',
    description: 'A mature-skin makeup recipe with thin complexion layers, soft eye definition, cream color, and placement that avoids emphasizing texture.',
    answer: 'Use flexible thin layers, keep shimmer smooth and localized, place definition at the lashes, and powder only where makeup creases or transfers.',
    occasions: ['everyday', 'daytime event'], eyes: ['hooded', 'deep-set', 'downturned'], tones: ['fair', 'light', 'medium', 'deep'], undertones: ['warm', 'neutral', 'cool'],
    palette: [['Soft taupe','#87756D','matte eye structure','above fold and lash line'],['Satin beige rose','#B39488','lid light','center mobile lid'],['Muted rose cream','#A66570','cheek and lip color','upper cheek and lips']],
    prep: 'Apply moisturizer in thin layers and allow time for it to settle before makeup.', base: 'Press a flexible base only where tone needs evening and avoid repeated rubbing.', brows: 'Use a fine pencil for individual gaps and a soft gel for shape.', definition: 'Press taupe between the upper lashes and blend any visible edge upward.', finishStep: 'Tap muted rose cream onto cheeks and lips, then powder only beside the nose and under transfer-prone areas.',
    placement: ['Keep powder away from broad dry or textured areas.','Use smooth satin on the lid center and avoid chunky sparkle.','Place cheek color above the natural hollow with a diffused edge.'],
    adjustments: [['Hooded eyes','Map taupe above the fold and keep satin on the visible center.','The structure remains visible without a thick line.'],['Downturned eyes','Lift outer definition before the corner descends.','A short upward endpoint supports the eye shape.'],['Deep skin','Use cocoa taupe, warm rose satin, and saturated rose cream.','Adequate depth avoids a pale or ashy finish.']],
    mistakes: [['Base settles into lines','Too much product or powder was layered.','Press with a clean damp sponge and remove excess before setting.'],['Eye makeup looks heavy','Dark shadow fills the entire crease.','Keep depth at lash level and use soft taupe above it.'],['Glow emphasizes texture','A metallic highlighter was swept widely.','Use a satin cream on one high point or skip separate highlighter.']],
    shoppingRole: 'flexible satin cream blush'
  }
];

// These are the existing v1 target-area guides. Keep this list explicit so a
// newly added recipe cannot silently ship generated crops as finished step art.
// Semantic approval of progressive assets is tracked separately in
// tutorial-step-image-reviews.json and enforced by its strict audit.
const LEGACY_STEP_IMAGE_GUIDES = new Set(visualMigration.legacyFocusGuideRecipeIds);

const usesProgressiveHighDetailImages = (seed) => !LEGACY_STEP_IMAGE_GUIDES.has(seed.id);

const resolveStepImagesReviewedAt = async (seed, steps) => {
  if (!usesProgressiveHighDetailImages(seed)) return undefined;

  const reviewedAt = [];
  for (const [index, step] of steps.entries()) {
    const review = stepReviewManifest.reviews?.[step.image];
    const previousStepImage = index === 0 ? null : steps[index - 1].image;
    if (review?.status !== 'approved'
      || review.targetRegion !== step.visualFocus
      || review.expectedOutcome !== step.outcome
      || review.previousStepImage !== previousStepImage
      || typeof review.reviewer !== 'string'
      || review.reviewer.trim().length < 2
      || typeof review.notes !== 'string'
      || review.notes.trim().length < 12
      || !review.reviewedAt
      || Number.isNaN(Date.parse(review.reviewedAt))) return undefined;

    let assetSha256;
    try {
      const file = path.resolve('src/assets/tutorial-steps', ...step.image.split('/'));
      assetSha256 = createHash('sha256').update(await readFile(file)).digest('hex');
    } catch {
      return undefined;
    }
    if (review.assetSha256 !== assetSha256) return undefined;
    reviewedAt.push(Date.parse(review.reviewedAt));
  }

  return new Date(Math.max(...reviewedAt)).toISOString();
};

const paletteText = (item) => item[0] + ': ' + item[2];
const lowerFirst = (value) => value.charAt(0).toLowerCase() + value.slice(1);
const normalizeSentence = (value) => /[.!?]$/.test(value) ? value : value + '.';
const clipText = (value, maximum) => {
  if (value.length <= maximum) return value;
  const completeSentences = value.match(/[^.!?]+[.!?]+/g) ?? [];
  let complete = '';
  for (const sentence of completeSentences) {
    const candidate = `${complete}${sentence}`.trim();
    if (candidate.length > maximum) break;
    complete = `${complete}${sentence}`;
  }
  if (complete.trim()) return complete.trim();

  const danglingWords = new Set(['a', 'an', 'and', 'at', 'for', 'from', 'in', 'of', 'on', 'or', 'the', 'to', 'while', 'with', 'without']);
  let clipped = value.slice(0, maximum - 1).replace(/\s+\S*$/, '').replace(/[,:;]$/, '');
  while (danglingWords.has(clipped.split(/\s+/).at(-1)?.toLowerCase())) {
    clipped = clipped.replace(/\s+\S+$/, '').replace(/[,:;]$/, '');
  }
  return clipped + '.';
};

const findPalette = (seed, pattern, fallbackIndex = 0, excluded) => (
  seed.palette.find((item) => item !== excluded && pattern.test(item[2] + ' ' + item[3]))
  ?? seed.palette[fallbackIndex]
);

const durationFor = (seed, fraction) => Math.max(20, Math.min(600, Math.round(seed.time * 60 * fraction / 5) * 5));

const siteUrl = 'https://huesteps.com';
const hubDetails = {
  'occasion-makeup': {
    title: 'Occasion Makeup',
    lens: 'room, timing, photography, and how formal the setting feels',
    guide: 'Choose by the room, not the trend'
  },
  'eye-shape-makeup': {
    title: 'Eye Shape Makeup',
    lens: 'open-eye visibility, endpoint direction, and how much lid space remains visible',
    guide: 'Choose the placement change first'
  },
  'skin-tone-undertone': {
    title: 'Skin Tone & Undertone',
    lens: 'shade depth, undertone temperature, and whether the color stays clear on skin',
    guide: 'Depth first, undertone second'
  },
  'everyday-makeup': {
    title: 'Everyday Makeup',
    lens: 'available minutes, daily repeatability, and the features that create the most polish',
    guide: 'Choose by available time'
  }
};

const listText = (items) => {
  if (items.length <= 1) return items[0] ?? '';
  if (items.length === 2) return items.join(' and ');
  return items.slice(0, -1).join(', ') + ', and ' + items.at(-1);
};

const makeDecisionGuide = (seed) => {
  if (seed.decisionGuideOverride) return seed.decisionGuideOverride;

  const hub = hubDetails[seed.hub];
  const primary = seed.palette[0];
  const focal = seed.palette[1];
  const anchor = seed.palette[2] ?? seed.palette[0];
  const firstAdjustment = seed.adjustments[0];
  const secondAdjustment = seed.adjustments[1] ?? seed.adjustments[0];
  const thirdAdjustment = seed.adjustments[2] ?? seed.adjustments[0];
  const firstMistake = seed.mistakes[0];
  const secondMistake = seed.mistakes[1] ?? seed.mistakes[0];
  const thirdMistake = seed.mistakes[2] ?? seed.mistakes[0];
  const timingNote = seed.time <= 12
    ? 'Because the routine is short, the page treats skipped blending, targeted coverage, and product restraint as part of the result rather than as missing steps.'
    : seed.time >= 30
      ? 'Because the routine has enough time for layering, the page protects clean edges, controlled payoff, and final corrections instead of rushing every feature at once.'
      : 'Because the routine sits in the middle timing range, the page balances visible definition with enough restraint for normal conversation distance.';

  return {
    heading: 'How to decide if ' + seed.title + ' is the right tutorial',
    summary: seed.title + ' is a ' + seed.time + '-minute ' + seed.difficulty.toLowerCase() + ' recipe for ' + listText(seed.occasions) + '. It is built around a specific job: ' + normalizeSentence(lowerFirst(seed.intent)) + ' The editorial lens for this page is ' + hub.lens + ', so the steps explain when to keep the product sheer, when to build depth, and when to stop correcting before the makeup becomes heavier than the intended ' + seed.finish + ' finish.',
    items: [
      {
        title: 'Choose it for ' + listText(seed.occasions),
        body: 'This tutorial fits readers who want ' + lowerFirst(seed.answer) + ' It is less useful if you want a completely different focal point, because the sequence protects ' + primary[0] + ' at ' + primary[3] + ' and uses the remaining steps to support that choice instead of turning the page into a generic full-face routine. ' + timingNote
      },
      {
        title: 'Color logic: ' + primary[0] + ', ' + focal[0] + ', and ' + anchor[0],
        body: primary[0] + ' carries the ' + primary[2] + ' role at ' + primary[3] + ', while ' + focal[0] + ' creates the visible contrast at ' + focal[3] + '. ' + anchor[0] + ' then ties the face back to the same color story at ' + anchor[3] + '. If one shade is swapped, keep the same depth relationship before changing the undertone; otherwise the look can lose the clear ' + seed.finish + ' read that makes ' + seed.title + ' distinct.'
      },
      {
        title: 'Open-eye and skin-depth adjustment',
        body: firstAdjustment[0] + ' should start with this placement change: ' + normalizeSentence(firstAdjustment[1]) + ' The reason is simple: ' + normalizeSentence(lowerFirst(firstAdjustment[2])) + ' For ' + secondAdjustment[0] + ', the more important edit is ' + normalizeSentence(lowerFirst(secondAdjustment[1])) + ' This keeps the tutorial useful across ' + listText(seed.eyes) + ' eye shapes and ' + listText(seed.tones) + ' skin depths without rewriting the whole palette.'
      },
      makeSpecificDecisionNote(seed),
      {
        title: 'What to check before adding more product',
        body: 'The first checkpoint is whether ' + primary[0] + ' still sits where the page promised: ' + primary[3] + '. The second is whether ' + focal[0] + ' remains visible at ' + focal[3] + ' without spreading into the area reserved for structure or skin texture. The third is whether the correction for ' + thirdAdjustment[0] + ' is still present after blending: ' + normalizeSentence(lowerFirst(thirdAdjustment[1])) + ' If those checks pass, extra product is more likely to create noise than improvement.'
      },
      {
        title: 'Failure signal and fastest fix',
        body: 'The most likely failure point is "' + firstMistake[0] + '" because ' + lowerFirst(normalizeSentence(firstMistake[1])) + ' Fix it by doing this first: ' + normalizeSentence(firstMistake[2]) + ' If the next visible issue is "' + secondMistake[0] + '," use the same rule: correct the cause, not the whole face. That cause is ' + lowerFirst(normalizeSentence(secondMistake[1])) + ' and the focused repair is ' + normalizeSentence(lowerFirst(secondMistake[2]))
      },
      {
        title: 'When to stop the tutorial',
        body: 'Stop when the result matches the page goal rather than when every product has been intensified. For ' + seed.title + ', that means the ' + seed.finish + ' finish still looks intentional, the ' + seed.shoppingRole + ' role has been handled, and the final visible problem is no longer "' + thirdMistake[0] + '." If that problem appears, the likely cause is ' + lowerFirst(normalizeSentence(thirdMistake[1])) + ' so the best next move is ' + normalizeSentence(lowerFirst(thirdMistake[2]))
      }
    ]
  };
};

const makeSources = (seed) => {
  const hub = hubDetails[seed.hub];
  return [
    {
      label: seed.title + ' editorial method: placement cues, product-role wording, and correction boundaries',
      url: siteUrl + '/editorial-policy/'
    },
    {
      label: seed.title + ' AI image disclosure for progressive step visuals',
      url: siteUrl + '/ai-image-content-policy/'
    },
    {
      label: hub.title + ' hub context for ' + seed.title + ': ' + hub.guide,
      url: siteUrl + '/' + seed.hub + '/'
    }
  ];
};

const makeSpecificDecisionNote = (seed) => {
  if (seed.id.includes('deep-set')) {
    return {
      title: 'Deep-set priority: bring the lid forward',
      body: 'Deep-set eyes already create natural socket shadow, so this tutorial treats brightness as structure instead of adding a darker crease. Keep the lightest satin on the mobile lid, soften taupe above the socket edge, and avoid packing brown into the hollow. If the eye starts looking smaller or more recessed, the fix is not a bigger wing; it is restoring lid brightness and keeping lash definition thin enough that the brow bone does not feel heavier. A good mirror check is the blink test: after a normal blink, the beige lid should still catch light below the brow ridge, the espresso should remain at the lash roots, and the taupe should frame the socket without turning into a second shadow. Photograph the eye from slightly above if needed; the mobile lid should look awake, not buried.'
    };
  }
  if (seed.id.includes('close-set')) {
    return {
      title: 'Close-set priority: open the inner distance',
      body: 'Close-set eyes need a spacing strategy before they need more darkness. This page keeps the inner lid bright, moves structure toward the outer half, and prevents brow pencil or liner from crowding the nose bridge. If the eyes appear closer together, remove depth from the inner corner first, then rebuild only the outer upper lash line. The goal is a wider-looking center gap with enough espresso at the outside to keep the eyes defined. A useful final check is the bridge test: the brightest satin should sit near the tear duct, the taupe should begin after the inner third, and the brow fronts should look brushed open rather than shaded inward. Check a phone selfie straight on; the center space should read cleaner before the outer wing reads stronger.'
    };
  }
  if (seed.id.includes('hooded')) {
    return {
      title: 'Hooded-eye priority: map above the fold',
      body: 'For hooded eyes, the closed-lid diagram matters less than the relaxed open-eye view. This tutorial places structure where it can still be seen after the lid folds, then keeps reflective color below the transfer-prone area. If the makeup disappears when the eyes open, raise the matte guide in tiny increments before adding shimmer. If texture collects under the hood, remove product rather than layering more shine.'
    };
  }
  if (seed.id.includes('monolid')) {
    return {
      title: 'Monolid priority: build a visible gradient',
      body: 'A monolid look needs a gradient that reads from the front, not a crease copied from another eye shape. Keep the deepest tone closest to the lash roots, let the middle shade rise in a soft oval, and place reflection where the eye naturally catches light. If the result looks flat, increase the vertical fade slowly; if it looks heavy, clean the lower edge and return brightness to the center lid.'
    };
  }
  if (seed.id.includes('round')) {
    return {
      title: 'Round-eye priority: length before height',
      body: 'Round eyes usually need horizontal pull more than extra vertical depth. This tutorial keeps the center from becoming too tall, extends structure outward, and makes the outer lash line the directional anchor. If the eye looks larger but not more elongated, reduce lower-lash darkness and move the endpoint outward in small strokes. The finished shape should feel softly stretched, not sharply boxed.'
    };
  }
  if (seed.id.includes('downturned')) {
    return {
      title: 'Downturned-eye priority: lift the endpoint',
      body: 'Downturned eyes change most when the outer endpoint rises before it reaches the natural drop of the lash line. Keep lower-lash color restrained, clean the outer corner early, and direct mascara or liner upward at the final third. If the look drags downward, remove the shadow below the endpoint first; adding more liner on top usually makes the corner heavier instead of lifted.'
    };
  }
  if (seed.id.includes('mature-skin')) {
    return {
      title: 'Mature-skin priority: flexible texture first',
      body: 'Mature skin benefits from thin, flexible layers that move with expression lines. This tutorial favors satin placement, soft edges, and controlled powder so the makeup reads polished without collecting around texture. If the finish looks dry, lift excess powder before adding glow. If color disappears, add a sheer second layer only where the face naturally keeps brightness, such as the upper cheek or mobile lid.'
    };
  }
  if (seed.id.includes('deep-skin')) {
    return {
      title: 'Deep-skin priority: saturation without ashiness',
      body: 'On deep skin, clarity comes from enough pigment depth and the right base temperature. This tutorial avoids pale versions of the color story and uses richer berry, cocoa, gold, or wine tones where the placement needs to stay visible. If a highlight looks gray, switch to warmth or translucency before adding more product. If the cheek disappears, increase chroma rather than spreading the shade lower.'
    };
  }
  if (seed.id.includes('olive-skin')) {
    return {
      title: 'Olive-skin priority: balanced temperature',
      body: 'Olive skin can make colors turn orange, gray, or overly pink when the undertone is ignored. This tutorial keeps neutral depth in the eye, uses rose-brown or taupe to bridge warmth and coolness, and checks the face in daylight before intensifying. If the palette looks muddy, the first correction is temperature, not opacity: shift the shade cleaner while keeping the same placement map.'
    };
  }
  if (seed.id.includes('fair-skin')) {
    return {
      title: 'Fair-skin priority: soft contrast control',
      body: 'Fair skin usually shows edges quickly, so this tutorial builds color in transparent passes and keeps the deepest shade narrow. The point is not to avoid definition; it is to make definition look intentional before it becomes a hard stripe. If blush, liner, or shadow jumps forward too fast, soften the perimeter with the base tool and rebuild with half the amount instead of changing the whole look.'
    };
  }
  if (seed.id.includes('medium-skin')) {
    return {
      title: 'Medium-skin priority: warmth with clean depth',
      body: 'Medium skin often carries bronze, caramel, and rose-brown beautifully when the depth is deliberate. This tutorial keeps warmth visible but stops it from spreading into a muddy wash by assigning each shade a clear zone. If the eye loses shape, restore the lash-root contrast first. If the cheek looks too orange, cool the lip or eye slightly rather than removing all warmth.'
    };
  }
  if (seed.id.includes('interview')) {
    return {
      title: 'Interview priority: composed, not distracting',
      body: 'Interview makeup has to read tidy in person and on camera without making the makeup itself the topic. This tutorial puts effort into inner-eye evenness, brows, and a comfortable lip because those are the signals people notice during conversation. If something feels too bold, lower contrast before removing coverage. The best version should survive a greeting, a video call, and a quick touch-up without demanding attention.'
    };
  }
  if (seed.id.includes('wedding')) {
    return {
      title: 'Wedding-guest priority: polished restraint',
      body: 'A wedding guest look needs enough polish for photographs while leaving the visual spotlight with the event. This tutorial keeps shimmer controlled, repeats rose or berry tones softly, and avoids a smoky edge that competes with formalwear. If the makeup photographs flat, restore cheek and lid dimension. If it starts feeling bridal or editorial, reduce opacity and keep the lip softer than the eye.'
    };
  }
  if (seed.id.includes('holiday')) {
    return {
      title: 'Holiday priority: contained shimmer',
      body: 'Holiday makeup can carry sparkle, but only when the reflective area has a clean boundary. This tutorial presses shimmer over a prepared lid, anchors it with matte depth, and cleans fallout before complexion work. If the shine travels too far, remove loose particles instead of blending them outward. The strongest impact should come from a controlled center flash, not glitter scattered across every surface.'
    };
  }
  if (seed.id.includes('vacation')) {
    return {
      title: 'Vacation priority: packable repeatability',
      body: 'Vacation makeup works best when the routine can survive sunscreen, limited tools, and quick mirror checks. This tutorial chooses cream or pencil roles that travel easily and places color where natural fading still looks intentional. If sunscreen pills, press rather than rub. If warmth turns muddy, simplify the palette before adding another product. The goal is a compact routine, not a full vanity recreated in a suitcase.'
    };
  }
  if (seed.id.includes('office')) {
    return {
      title: 'Office priority: tidy indoor clarity',
      body: 'Office makeup usually lives under indoor light, screens, and close conversation, so this tutorial avoids heavy perimeter coverage and overdrawn definition. It focuses on the center of the face, brows, and a controlled taupe or brown eye cue. If the look feels tired, brighten around the inner eye before adding shadow. If it feels too made up, remove base at the jaw and soften the brow front.'
    };
  }
  return {
    title: 'Routine priority: protect the main promise',
    body: seed.title + ' should be judged against its main promise before any extra trend detail is added: ' + normalizeSentence(lowerFirst(seed.intent)) + ' Keep the most important color role, ' + seed.palette[0][2] + ', locked to ' + seed.palette[0][3] + ', and let every later correction support that decision. If the look starts drifting, return to the first placement note instead of layering a new product category.'
  };
};

const toolsetFor = (seed) => {
  const eyeShade = findPalette(seed, /eye|lid|crease|transition|shadow|structure/i, 0);
  return [
    {
      name: 'Clean complexion sponge or fingertips',
      purpose: 'Keep the ' + seed.finish + ' base for ' + seed.title + ' thin and localized instead of masking the whole face.',
      substitute: 'A small, clean synthetic complexion brush'
    },
    {
      name: 'Small tapered blending brush',
      purpose: 'Control ' + lowerFirst(eyeShade[0]) + ' precisely at ' + eyeShade[3] + ' without spreading the edge too far.',
      substitute: 'A clean small crease brush'
    },
    {
      name: 'Short dense detail brush',
      purpose: 'Place definition in short strokes so the ' + seed.title + ' shape stays deliberate at close distance.',
      substitute: 'The clean edge of a small flat brush'
    },
    {
      name: 'Clean spoolie or lash comb',
      purpose: 'Separate brow and lash hairs before the final ' + seed.finish + ' checkpoint for this tutorial.',
      substitute: 'A washed mascara wand reserved for grooming'
    }
  ];
};

const makeWhatMakesItWork = (seed) => [
  seed.palette[0][0] + ' is kept at ' + seed.palette[0][3] + ', so its ' + seed.palette[0][2] + ' role stays readable instead of spreading across the look.',
  seed.palette[1][0] + ' supplies the focal contrast at ' + seed.palette[1][3] + ' while the surrounding edges remain controlled for a ' + seed.finish + ' result.',
  seed.adjustments[0][0] + ' changes the placement rather than the whole palette: ' + normalizeSentence(lowerFirst(seed.adjustments[0][1])),
  'The final check prioritizes ' + seed.intent.toLowerCase().replace(/[.]$/, '') + ', not a heavier layer of every product.'
];

const makeFinishChecklist = (seed) => [
  'In straight-on light, ' + lowerFirst(seed.palette[0][0]) + ' remains intentional at ' + seed.palette[0][3] + ' with no accidental hard border.',
  seed.palette[1][0] + ' is visible at ' + seed.palette[1][3] + ' without overpowering the ' + seed.finish + ' finish.',
  'The feature described by ' + seed.title + ' stays balanced with both eyes open and the face relaxed, not only in a posed angle.',
  'No area in ' + seed.title + ' looks heavier because of repeated correction; remove excess before adding more color.'
];

const makeFaq = (seed) => [
  {
    question: 'Can I adapt ' + seed.title + ' for ' + seed.adjustments[0][0] + '?',
    answer: 'Yes. ' + normalizeSentence(seed.adjustments[0][1]) + ' This works because ' + lowerFirst(normalizeSentence(seed.adjustments[0][2]))
  },
  {
    question: 'What should I do if ' + lowerFirst(seed.mistakes[0][0]) + '?',
    answer: 'The likely cause is that ' + lowerFirst(normalizeSentence(seed.mistakes[0][1])) + ' Correct it now: ' + normalizeSentence(seed.mistakes[0][2])
  },
  {
    question: 'How do I keep ' + seed.title + ' within ' + seed.time + ' minutes?',
    answer: 'Prepare the tools first, protect the placement of ' + seed.palette[0][0] + ', and stop once each visible checkpoint is true. Extra blending or full-face coverage is lower priority than the tutorial outcome.'
  },
  {
    question: 'Which product matters most for the ' + seed.finish + ' result in ' + seed.title + '?',
    answer: 'Match the role and texture of ' + seed.shoppingRole + ' before considering a brand. The correct placement and amount in the steps matter more than choosing a higher price tier.'
  }
];

const makeDetailedStep = (seed, index, step) => {
  const number = String(index + 1).padStart(2, '0');
  const mistake = seed.mistakes[index % seed.mistakes.length];
  const adjustment = seed.adjustments[index % seed.adjustments.length];
  const guidance = seed.stepGuidance?.[index] ?? {};
  const curated = usesProgressiveHighDetailImages(seed) ? '-curated' : '';
  const outcome = normalizeSentence(step.outcome);
  return {
    title: step.title,
    image: seed.id + '/step-' + number + curated + '.webp',
    imageAlt: clipText('Step ' + (index + 1) + ' of ' + seed.title + ', showing ' + lowerFirst(outcome), 180),
    imageCaption: clipText('Visual checkpoint for ' + seed.title + ': ' + outcome + ' Observe the named area before continuing.', 240),
    outcome,
    tool: step.tool,
    productRole: step.productRole,
    action: normalizeSentence(step.action),
    placement: step.placement,
    motion: step.motion,
    amount: step.amount,
    durationSeconds: step.durationSeconds,
    whyItWorks: normalizeSentence(step.whyItWorks ?? ('Keeping ' + lowerFirst(step.productRole) + ' at ' + step.placement + ' directly supports this tutorial goal: ' + lowerFirst(seed.intent))),
    completeWhen: normalizeSentence(step.completeWhen ?? outcome),
    ifWrong: normalizeSentence(step.ifWrong ?? guidance.ifWrong ?? mistake[2]),
    proTip: normalizeSentence(step.proTip ?? guidance.proTip ?? (adjustment[0] + ': ' + adjustment[1])),
    avoid: normalizeSentence(step.avoid ?? guidance.avoid ?? ('Avoid ' + lowerFirst(mistake[0]) + '; ' + lowerFirst(mistake[1]))),
    visualFocus: step.visualFocus
  };
};

const makeEyeDetailedSteps = (seed) => {
  const transition = findPalette(seed, /gradient|transition|crease|structure|outer|wash|edge/i, 0);
  const focal = findPalette(seed, /focal|lid|light|shimmer|satin|metal/i, 1, transition);
  const liner = findPalette(seed, /lash|liner|definition|micro-wing/i, 2);
  const steps = [
    {
      title: 'Prime the visible lid area',
      outcome: 'The lids feel smooth and dry while the natural fold and open-eye landmarks remain easy to see',
      tool: 'Clean fingertip or flat synthetic brush',
      productRole: 'thin eye base for the ' + seed.finish + ' finish',
      action: seed.prep + ' Keep the eye relaxed and check the surface with the eye open before adding color.',
      placement: 'From the upper lash roots across the mobile lid and just beyond the visible fold, stopping below the brow bone',
      motion: 'Press a thin film outward, then tap over any crease instead of rubbing back and forth',
      amount: 'One rice-grain amount divided between both lids for ' + seed.title,
      durationSeconds: durationFor(seed, 0.08),
      visualFocus: 'both-eyes'
    },
    {
      title: 'Map ' + lowerFirst(transition[0]) + ' with the eyes open',
      outcome: transition[0] + ' creates a soft guide at ' + transition[3] + ' that remains visible with a relaxed gaze',
      tool: 'Small tapered blending brush',
      productRole: paletteText(transition),
      action: 'Look straight ahead, mark ' + transition[3] + ', and connect the guide with short strokes. Keep the first layer lighter than the final target.',
      placement: transition[3] + ', using the brow tail and outer lash line as direction references',
      motion: 'Short outward strokes followed by tiny circles only along the upper edge',
      amount: 'One light pickup of ' + transition[0] + ', tapped off before the brush reaches the lid',
      durationSeconds: durationFor(seed, 0.15),
      visualFocus: 'both-eyes'
    },
    {
      title: 'Build the open-eye structure',
      outcome: 'The outer structure is slightly deeper than the transition while the center lid remains available for the focal shade',
      tool: 'Small tapered blending brush with most product removed',
      productRole: paletteText(transition),
      action: 'Add depth only where the guide already exists, then soften the edge upward rather than dragging it toward the temple. Compare both eyes after every few strokes.',
      placement: 'The outer third of ' + transition[3] + ', ending before the brow bone or natural downturn',
      motion: 'Compact upward circles and short strokes that return toward the center',
      amount: 'Half the amount used in the mapping step, concentrated at the outer third',
      durationSeconds: durationFor(seed, 0.15),
      visualFocus: 'lid'
    },
    {
      title: 'Press in ' + lowerFirst(focal[0]),
      outcome: focal[0] + ' is clearly visible at ' + focal[3] + ' while the transition border stays intact',
      tool: 'Small flat shader brush or clean fingertip',
      productRole: paletteText(focal),
      action: 'Press ' + lowerFirst(focal[0]) + ' onto ' + focal[3] + ' in small sections. Stop before the color covers the mapped transition, then soften only the meeting edge.',
      placement: focal[3] + ', kept below the upper transition boundary',
      motion: 'Firm taps for deposit, followed by one light sweep only where the shades meet',
      amount: 'One controlled pickup of ' + focal[0] + '; add a second only where the lid still looks bare',
      durationSeconds: durationFor(seed, 0.14),
      visualFocus: 'lid'
    },
    {
      title: 'Define the upper lash roots',
      outcome: liner[0] + ' makes the upper lashes look denser without hiding the focal lid shade',
      tool: 'Short dense liner brush or precise pencil',
      productRole: liner[0] + ': upper-lash definition only',
      action: seed.definition + ' Work in short sections and check the endpoint with the eye open before extending it.',
      placement: 'Between and immediately above the upper lash roots, stopping at the endpoint guided by the open-eye shape',
      motion: 'Stamp between lash roots, then use one short outward stroke at the endpoint',
      amount: 'The thinnest visible deposit of ' + liner[0] + ', deepest only where the recipe needs lift',
      durationSeconds: durationFor(seed, 0.12),
      visualFocus: 'upper-lash'
    },
    {
      title: 'Balance the lower lash line',
      outcome: 'A restrained lower-lash echo connects the palette without closing the inner corner or pulling the eye down',
      tool: 'Clean short detail brush',
      productRole: paletteText(transition),
      action: 'Use the residue of ' + lowerFirst(transition[0]) + ' along the outer lower lashes, then fade it before the inner half. Keep this edge softer than the upper structure.',
      placement: 'The outer third of the lower lash line, stopping before the inner half and below the lifted endpoint',
      motion: 'Short inward strokes with the brush held parallel to the lower lashes',
      amount: 'Only the residue left after the upper-eye steps; do not take a full new pickup',
      durationSeconds: durationFor(seed, 0.09),
      visualFocus: 'lower-lash'
    },
    {
      title: 'Curl and separate the lashes',
      outcome: 'The center and outer lashes lift clear of the lid and remain individually separated',
      tool: 'Lash curler and clean lash comb',
      productRole: 'lightweight separating mascara for ' + seed.title,
      action: 'Curl at the root without pulling, then comb mascara from the base upward. Concentrate the final pass where it supports the open-eye direction.',
      placement: 'Upper lashes, with the strongest lift at the center and the recipe-specific outer section',
      motion: 'One root press with the curler, then slow upward combing without repeated pumping',
      amount: 'One thin mascara coat, followed by a partial second pass only where more lift is needed',
      durationSeconds: durationFor(seed, 0.1),
      visualFocus: 'upper-lash'
    },
    {
      title: 'Check the finished open-eye balance',
      outcome: 'The ' + seed.finish + ' eye reads evenly from straight ahead and every focal area remains visible with a relaxed gaze',
      tool: 'Clean blending brush and cotton swab for final corrections',
      productRole: 'no new product unless a specific gap remains',
      action: seed.finishStep + ' Step back from the mirror, compare both eyes open, and remove excess before adding anything.',
      placement: 'Only the edge or lash section that fails the final checkpoint; leave completed areas untouched',
      motion: 'Light lifting or blending at one edge at a time, followed by a full open-eye recheck',
      amount: 'No automatic final layer; use only the residue on a clean tool for corrections',
      durationSeconds: durationFor(seed, 0.07),
      completeWhen: seed.answer,
      visualFocus: 'final'
    }
  ];
  return steps.map((step, index) => makeDetailedStep(seed, index, step));
};

const makeFaceDetailedSteps = (seed) => {
  const eye = findPalette(seed, /eye|lid|crease|transition|shadow|structure|wash/i, 0);
  const eyeFocal = seed.palette.find((item) => (
    item !== eye
    && /eye|lid|crease|shadow|shimmer|metallic/i.test(item[2] + ' ' + item[3])
  ));
  const liner = findPalette(seed, /lash|liner|definition|tightline/i, seed.palette.indexOf(eye));
  const color = findPalette(seed, /cheek|blush|multi-use/i, 1);
  const lipColor = seed.palette.find((item) => (
    item !== color
    && /lip/i.test(item[2] + ' ' + item[3])
  )) ?? color;
  const cheekPlacement = color[3]
    .split(/\s+(?:and|&)\s+/i)
    .find((part) => /cheek/i.test(part))
    ?? color[3];
  const steps = [
    {
      title: 'Prepare for the ' + seed.finish + ' finish',
      outcome: 'The skin and lids feel settled, even, and ready for thin layers without a slippery surface',
      tool: 'Clean fingertips and a soft tissue',
      productRole: 'lightweight preparation suited to a ' + seed.finish + ' finish',
      action: seed.prep + ' Wait until the surface stops moving under a clean fingertip before complexion work.',
      placement: 'Across the face and eyelids, with the thinnest layer around creases and areas that already feel smooth',
      motion: 'Press and smooth outward, then blot only where visible slip remains',
      amount: 'A pea-size preparation layer for the face and a trace amount for both lids',
      durationSeconds: durationFor(seed, 0.1),
      visualFocus: 'full-face'
    },
    {
      title: 'Even the complexion selectively',
      outcome: 'Discoloration is softened while natural skin remains visible around the perimeter of the face',
      tool: 'Small complexion sponge or clean fingertips',
      productRole: 'thin complexion coverage for ' + seed.title,
      action: seed.base + ' Blend each small zone before adding coverage anywhere else.',
      placement: 'The center of the face and individual areas that interrupt evenness, feathered into uncovered skin',
      motion: 'Short presses from the covered area into bare skin instead of sweeping across the face',
      amount: 'One pinhead-size amount per correction zone, assessed before a second layer',
      durationSeconds: durationFor(seed, 0.17),
      visualFocus: 'complexion'
    },
    {
      title: 'Keep the brow frame light',
      outcome: 'The brows look intentional but retain visible hairs and enough softness for the rest of the look',
      tool: 'Fine brow tool and clean spoolie',
      productRole: 'brow definition appropriate for ' + seed.title,
      action: seed.brows + ' Brush through after filling so the front and tail do not carry equal weight.',
      placement: 'Only true gaps within the natural brow, with the lightest pressure at the inner third',
      motion: 'Hairlike strokes followed by one outward spoolie pass',
      amount: 'One light pass through gaps; stop while individual hairs and some skin remain visible',
      durationSeconds: durationFor(seed, 0.09),
      visualFocus: 'brows'
    },
    {
      title: eyeFocal
        ? 'Shape the eyes and place ' + lowerFirst(eyeFocal[0])
        : 'Shape the eyes with ' + lowerFirst(eye[0]),
      outcome: eyeFocal
        ? eye[0] + ' creates soft eye structure, while ' + eyeFocal[0] + ' remains visible at the ' + eyeFocal[3] + ' without covering it'
        : eye[0] + ' creates soft eye structure without a hard outer edge',
      tool: eyeFocal
        ? 'Small tapered blending brush and flat shader brush'
        : 'Small tapered blending brush',
      productRole: eyeFocal
        ? paletteText(eye) + '; ' + paletteText(eyeFocal)
        : paletteText(eye),
      action: eyeFocal
        ? 'Build ' + lowerFirst(eye[0]) + ' in the planned structure zone: ' + eye[3] + '. Work from the intended endpoint inward, then press ' + lowerFirst(eyeFocal[0]) + ' onto ' + eyeFocal[3] + ' and soften only the meeting edge.'
        : 'Build ' + lowerFirst(eye[0]) + ' in the planned structure zone: ' + eye[3] + '. Work from the intended endpoint inward and keep the first pass translucent enough to correct.',
      placement: eyeFocal
        ? eye[3] + ' for structure and ' + eyeFocal[3] + ' for the focal shade, checked with both eyes open'
        : eye[3] + ', checked with both eyes open before the color is deepened',
      motion: eyeFocal
        ? 'Use short controlled strokes for the structure, then press the focal shade in place without sweeping it over the transition'
        : 'Short controlled strokes with small circles only along the edge that needs diffusion',
      amount: eyeFocal
        ? 'One light pickup of ' + eye[0] + ' and one thin pressed layer of ' + eyeFocal[0]
        : 'One light pickup of ' + eye[0] + ', tapped off before the open-eye check',
      durationSeconds: durationFor(seed, 0.15),
      visualFocus: 'both-eyes'
    },
    {
      title: 'Add precise lash definition',
      outcome: liner[0] + ' makes the lashes look denser while the eye color and lid space stay visible',
      tool: 'Short dense liner brush or smudgeable pencil',
      productRole: liner[0] + ': upper-lash definition only',
      action: seed.definition + ' Work from the lash roots outward and stop as soon as the intended shape reads from normal distance.',
      placement: 'Between and immediately above the upper lash roots, kept thinnest near the inner eye and stopped at the intended upper endpoint',
      motion: 'Stamp between lashes, then soften only the outer endpoint if the recipe calls for diffusion',
      amount: 'The thinnest visible line of ' + liner[0] + '; correct one section instead of redrawing everything',
      durationSeconds: durationFor(seed, 0.11),
      visualFocus: 'upper-lash'
    },
    {
      title: 'Place the complexion color',
      outcome: color[0] + ' is visible at ' + cheekPlacement + ' while the lips remain unchanged and natural skin still shows through the cheek edges',
      tool: 'Small cream brush, sponge, or clean fingertip',
      productRole: color[0] + ': ' + color[2] + ' used only at ' + cheekPlacement + ' in this step',
      action: 'Place ' + lowerFirst(color[0]) + ' first at ' + cheekPlacement + ', then tap the edge outward. Keep the strongest color inside the planned cheek zone and do not add it to the lips yet.',
      placement: cheekPlacement + ', with a clean gap around the under-eye and lip edges',
      motion: 'Tap to deposit, then press the perimeter with the cleaner side of the tool',
      amount: 'One small dot or light pickup of ' + color[0] + ' per side before reassessing',
      durationSeconds: durationFor(seed, 0.12),
      visualFocus: 'cheeks'
    },
    {
      title: 'Connect the lip to the palette',
      outcome: 'The lip shows ' + lipColor[0] + ' in harmony with ' + color[0] + ' and the ' + seed.finish + ' finish without becoming the only focal point',
      tool: 'Clean fingertip or precise lip brush',
      productRole: paletteText(lipColor),
      action: 'Use ' + lowerFirst(lipColor[0]) + ' in one thin layer across the lips. ' + seed.finishStep + ' Blot before deciding on another layer.',
      placement: 'Across the lips, with the cleanest edge at the cupid bow and a softer edge where the recipe calls for diffusion',
      motion: 'Press from the center outward, then refine the perimeter with a nearly clean tool',
      amount: 'One thin lip layer of ' + lipColor[0] + ', blotted before any second pass',
      durationSeconds: durationFor(seed, 0.1),
      visualFocus: 'lips'
    },
    {
      title: 'Review and set only where needed',
      outcome: 'The completed ' + seed.title + ' reads as ' + seed.finish + ' in front-facing light without overloaded corrections',
      tool: 'Clean sponge, small powder brush, and cotton swab',
      productRole: 'targeted setting product only where the finish requires control',
      action: 'Step back, compare eye, cheek, and lip balance, then set only areas that crease or transfer. Remove excess before adding any final product.',
      placement: 'The center or crease-prone zones that fail the final check, leaving naturally finished areas untouched',
      motion: 'Press once to lift excess, then tap a minimal setting layer instead of sweeping repeatedly',
      amount: 'Less than one brush pickup of setting product, used only after the full-face check',
      durationSeconds: durationFor(seed, 0.07),
      completeWhen: seed.answer,
      visualFocus: 'final'
    }
  ];
  return steps.map((step, index) => makeDetailedStep(seed, index, step));
};

const makeDetailedSteps = (seed) => seed.hub === 'eye-shape-makeup'
  ? makeEyeDetailedSteps(seed)
  : makeFaceDetailedSteps(seed);

const detailedProductOptions = (seed) => [
  {
    tier: 'Budget',
    role: seed.shoppingRole,
    suggestion: 'A straightforward drugstore ' + seed.shoppingRole,
    reason: 'Prioritize a texture that can achieve ' + seed.palette[0][3] + ' and the ' + seed.finish + ' result before paying for extra shades.'
  },
  {
    tier: 'Mid-range',
    role: seed.shoppingRole,
    suggestion: 'A focused or refillable ' + seed.shoppingRole,
    reason: 'Choose this tier when smoother pickup or controlled diffusion would make the ' + seed.title + ' placement easier to repeat.'
  },
  {
    tier: 'Luxury',
    role: seed.shoppingRole,
    suggestion: 'A finely milled prestige ' + seed.shoppingRole,
    reason: 'Consider the premium option only when its exact finish or shade depth solves a real gap in this ' + seed.finish + ' recipe.'
  }
];

const recipes = await Promise.all(seeds.map(async (seed, index) => {
  const sameHub = seeds.filter((candidate) => candidate.hub === seed.hub && candidate.id !== seed.id);
  const crossHub = seeds.filter((candidate) => candidate.hub !== seed.hub);
  const related = [sameHub[index % sameHub.length], sameHub[(index + 2) % sameHub.length], sameHub[(index + 4) % sameHub.length], crossHub[index % crossHub.length]]
    .filter(Boolean)
    .map((candidate) => candidate.id)
    .filter((id, position, all) => all.indexOf(id) === position)
    .slice(0, 4);

  const steps = makeDetailedSteps(seed);
  const stepImagesReviewedAt = await resolveStepImagesReviewedAt(seed, steps);

  return {
    id: seed.id,
    title: seed.title,
    description: seed.description,
    slug: seed.id,
    hub: seed.hub,
    primaryIntent: seed.intent,
    directAnswer: seed.answer,
    publishedAt,
    updatedAt: seed.contentUpdatedAt ?? publishedAt,
    authorId: 'huesteps-editorial-team',
    reviewedBy: 'huesteps-editorial-team',
    difficulty: seed.difficulty,
    timeMinutes: seed.time,
    finish: seed.finish,
    occasions: seed.occasions,
    eyeShapes: seed.eyes,
    skinTones: seed.tones,
    undertones: seed.undertones,
    heroImage: `${seed.id}.png`,
    heroAlt: `AI visualization of ${seed.title.toLowerCase()} showing ${seed.palette[0][0].toLowerCase()}, ${seed.palette[1][0].toLowerCase()}, and a ${seed.finish} finish.`,
    aiGenerated: true,
    stepImageStandard: usesProgressiveHighDetailImages(seed) ? visualMigration.progressiveStandard : visualMigration.legacyStandard,
    ...(stepImagesReviewedAt ? { stepImagesReviewedAt } : {}),
    palette: seed.palette.map(([name, hex, role, placement]) => ({ name, hex, role, placement })),
    productRoles: seed.palette.map(([name, , role]) => `${name}: ${role}`),
    whatMakesItWork: makeWhatMakesItWork(seed),
    decisionGuide: makeDecisionGuide(seed),
    tools: toolsetFor(seed),
    beforeYouStart: [
      seed.prep,
      'Set out the tools for ' + seed.title + ' before starting so the ' + seed.finish + ' layers can be placed without a long pause.',
      'Check ' + seed.palette[0][3] + ' in front-facing daylight and keep the first application lighter than the final target.'
    ],
    steps,
    placementNotes: seed.placement,
    adjustments: seed.adjustments.map(([forValue, change, why]) => ({ for: forValue, change, why })),
    commonMistakes: seed.mistakes.map(([problem, cause, fix]) => ({ problem, cause, fix })),
    finishChecklist: makeFinishChecklist(seed),
    faq: makeFaq(seed),
    suggestedProducts: detailedProductOptions(seed),
    relatedRecipes: related,
    sources: makeSources(seed),
    seasonal: seed.seasonal ?? false,
    featured: seed.featured ?? false
  };
}));

const outputDir = path.resolve('src/data');
await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, 'recipes.json'), `${JSON.stringify(recipes, null, 2)}\n`, 'utf8');

console.log(`Generated ${recipes.length} validated recipe source records.`);
