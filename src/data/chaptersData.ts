export interface ChapterItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  presenterImage: string;
  scrollRange: [number, number]; // [startProgress, endProgress]
  academicTopic: string;
  imageSrc: string;
  imageCaption: string;
  secondaryImageSrc?: string;
  // Chapter 1: IPO Model
  ipoData?: {
    inputs: string[];
    processes: { step: string; time?: string; isBottleneck?: boolean }[];
    outputs: string[];
  };
  // Chapter 2: 4Vs Analysis
  fourVsData?: {
    dimension: string;
    level: string;
    description: string;
    metric?: string;
  }[];
  revenueSplit?: {
    coffee: number;
    bakery: number;
    unclassified: number;
    note: string;
  };
  cards?: { title: string; subtitle: string; iconType: string }[];
  // Chapter 3: 5 Performance Objectives & Order Flow
  fiveObjectives?: {
    objective: string;
    role: 'Order Winner' | 'Order Qualifier' | 'Supporting';
    detail: string;
    fieldMetric: string;
  }[];
  steps?: { step: string; iconType: string; time?: string }[];
  // Chapter 4: Service Shop & Cellular Layout
  processTypeData?: {
    type: string;
    characteristics: string[];
    justification: string;
  };
  layoutData?: {
    layoutType: string;
    cells: { name: string; equipment: string; cycleTime: string }[];
    bottleneck: string;
  };
  timingSteps?: { time: string; label: string }[];
  totalTime?: string;
  // Chapter 5: Operations Strategy & Trade-offs
  strategyData?: {
    pillar: string;
    choice: string;
    tradeoff: string;
  }[];
  comparisons?: {
    dimension: string;
    trueBlack: string;
    starbucks: string;
    thirdWave: string;
  }[];
  gridItems?: { title: string; subtitle?: string; iconType: string }[];
  // Chapter 6: Practical Recommendations
  recommendations?: {
    id: number;
    title: string;
    impact: 'High' | 'Medium';
    action: string;
    kpi: string;
  }[];
  checkpoints?: string[];
}

export const CHAPTERS: ChapterItem[] = [
  {
    id: 'origin',
    number: '01',
    title: 'ORIGIN',
    subtitle: 'Understanding the Operation & IPO Model',
    academicTopic: 'Topic 1: Input–Process–Output (IPO) Analysis',
    description:
      'An operational field study of True Black Café (Hyderabad) mapping raw resource transformation into premium specialty coffee experiences.',
    presenterImage: '/images/presenters/presenter1.png',
    scrollRange: [0.06, 0.16],
    imageSrc: '/images/stockimages/IMG_3804.JPG.jpeg',
    imageCaption: 'True Black Café Exterior & Architecture — Hyderabad',
    secondaryImageSrc: '/images/stockimages/IMG_3818.JPG.jpeg',
    ipoData: {
      inputs: [
        'Single-origin green & roasted beans (3-day usable window)',
        'Farm-fresh dairy, oat & artisanal bakery stock',
        'Semi-automatic commercial espresso machines & dual grinders',
        'Artisan baristas, POS queue & customer order specifications',
      ],
      processes: [
        { step: 'Roasting & Testing', time: '40–45 min batch', isBottleneck: true },
        { step: 'Precision Grinding', time: '6–7 sec' },
        { step: 'Espresso Extraction', time: '25–30 sec' },
        { step: 'Milk Steaming & Beverage Assembly', time: '~1 min' },
        { step: 'Order Handoff & Customer Interaction', time: '≤ 8 min promise' },
      ],
      outputs: [
        'Consistent specialty coffee beverages & latte art',
        'Fresh artisan bakery items & food pairings',
        'Completed customer transactions (8-min delivery guarantee)',
        'Enhanced sensory café environment & repeat loyalty',
      ],
    },
    checkpoints: [
      'Café overview & operational scope',
      'Batch roasting: 40–45 min cycles with sensory testing',
      'Usable fresh bean window: strictly 3 days post-roast',
      'Total order delivery commitment: within 8 minutes (480s)',
    ],
  },
  {
    id: 'preparation',
    number: '02',
    title: 'PREPARATION',
    subtitle: 'The 4Vs of Operations Analysis',
    academicTopic: 'Topic 2: Volume, Variety, Variation & Visibility',
    description:
      'Dissecting True Black’s operational profile across the 4Vs framework and evaluating revenue distribution against service complexity.',
    presenterImage: '/images/presenters/presenter2.png',
    scrollRange: [0.16, 0.26],
    imageSrc: '/images/stockimages/IMG_3822.JPG.jpeg',
    imageCaption: 'Specialty Pastry Display, Cakes & True Granola Selection',
    secondaryImageSrc: '/images/stockimages/IMG_3821.JPG.jpeg',
    revenueSplit: {
      coffee: 70,
      bakery: 25,
      unclassified: 5,
      note: 'Verified field finding: Coffee accounts for 70% of reported revenue, bakery 25%, and 5% unclassified. Academic note: Revenue contribution is distinct from transaction volume.',
    },
    fourVsData: [
      {
        dimension: 'Volume',
        level: 'Medium-High',
        metric: '70% Coffee / 25% Bakery',
        description:
          '70% revenue driven by espresso & brew orders; requires standardized core beverage workflows.',
      },
      {
        dimension: 'Variety',
        level: 'High',
        metric: 'Specialty Craft Menu',
        description:
          'Extensive customisation: multiple origin beans, milk alternatives, manual pour-overs & bakery pairings.',
      },
      {
        dimension: 'Variation',
        level: 'High',
        metric: 'Peak Evening Spikes',
        description:
          'Intense demand surges between 17:00–21:00 compared to steady morning study hours; strains prep capacity.',
      },
      {
        dimension: 'Visibility',
        level: 'Very High',
        metric: '100% Open Bar Counter',
        description:
          'Customers witness bean grinding, dosing, extraction, and milk texturing directly at the counter.',
      },
    ],
    cards: [
      {
        title: 'Ingredients',
        subtitle: 'Specialty beans, milk, syrups',
        iconType: 'coffee',
      },
      {
        title: 'Equipment',
        subtitle: 'Semi-auto espresso, flat grinders',
        iconType: 'equipment',
      },
      {
        title: 'People & Flow',
        subtitle: 'Trained baristas & POS staging',
        iconType: 'people',
      },
    ],
  },
  {
    id: 'order',
    number: '03',
    title: 'THE ORDER',
    subtitle: 'Five Performance Objectives & Flow',
    academicTopic: 'Topic 3: Slack’s Five Operations Performance Objectives',
    description:
      'Benchmarking True Black across Quality, Speed, Dependability, Flexibility, and Cost alongside its 4-step order-to-table sequence.',
    presenterImage: '/images/presenters/presenter3.png',
    scrollRange: [0.26, 0.36],
    imageSrc: '/images/stockimages/IMG_3811.JPG.jpeg',
    imageCaption: 'Open Bar Customer Interaction & Pour-Over Station — High Visibility',
    secondaryImageSrc: '/images/stockimages/IMG_3816.JPG.jpeg',
    steps: [
      { step: 'Customer Places Order', iconType: 'user', time: '1 min' },
      { step: 'Order Captured & Queued', iconType: 'clipboard', time: 'POS' },
      { step: 'Order Prepared & Extracted', iconType: 'cup', time: '2–3 min' },
      { step: 'Served to Customer', iconType: 'bag', time: '≤ 8 min' },
    ],
    fiveObjectives: [
      {
        objective: 'Quality',
        role: 'Order Winner',
        detail: '3-day fresh roast protocol, dialed-in extraction yields, barista craft sensory check.',
        fieldMetric: 'Zero stale-bean tolerance',
      },
      {
        objective: 'Speed',
        role: 'Order Qualifier',
        detail: '6–7s grind, 25–30s pull, ≤ 8 min total order fulfillment guarantee.',
        fieldMetric: '≤ 8 min delivery guarantee',
      },
      {
        objective: 'Dependability',
        role: 'Supporting',
        detail: 'Consistent morning opening, reliable ingredient supply, daily machine calibration.',
        fieldMetric: 'Standard recipe adherence',
      },
      {
        objective: 'Flexibility',
        role: 'Supporting',
        detail: 'High beverage customisation (oat, almond, sweetness level, temperature).',
        fieldMetric: 'Custom manual brews',
      },
      {
        objective: 'Cost',
        role: 'Order Qualifier',
        detail: 'Premium pricing model absorbs high scrap risk from the tight 3-day bean window.',
        fieldMetric: 'Premium margin tier',
      },
    ],
  },
  {
    id: 'brew',
    number: '04',
    title: 'THE BREW',
    subtitle: 'Process Type & Cellular Bar Layout',
    academicTopic: 'Topic 4: Service Process Classification & Facility Layout',
    description:
      'True Black qualifies as a Service Shop, operating a U-shaped cellular bar layout that isolates the grinding-extraction-steaming work cell.',
    presenterImage: '/images/presenters/presenter4.png',
    scrollRange: [0.36, 0.46],
    imageSrc: '/images/stockimages/IMG_3812.JPG.jpeg',
    imageCaption: 'Sanremo Opera 2.0 Commercial Espresso Station & Dual Grinders',
    secondaryImageSrc: '/images/stockimages/IMG_3801.JPG.jpeg',
    processTypeData: {
      type: 'Service Shop',
      characteristics: [
        'Medium volume with moderate-to-high service variety',
        'Significant customer contact and direct barista engagement',
        'Standardized core extraction procedures mixed with personalized orders',
      ],
      justification:
        'Higher customization and craft discretion than a Mass Service (fast-food / Starbucks), but more standardized than a Professional Service (consulting).',
    },
    timingSteps: [
      { time: '6–7s', label: 'Precision Bean Grinding' },
      { time: '25–30s', label: 'Espresso Shot Extraction' },
      { time: '1 min', label: 'Milk Steaming & Art' },
      { time: '≤ 8 min', label: 'Total Order Delivery' },
    ],
    totalTime: '≤ 8 min',
    layoutData: {
      layoutType: 'Hybrid / Cellular Bar Layout',
      cells: [
        { name: 'Cell 1: Bean Roasting & Batch Testing', equipment: 'Batch Roaster & Cupping Table', cycleTime: '40–45 min' },
        { name: 'Cell 2: Grinding & Espresso Core', equipment: 'Semi-Automatic Espresso & Dual Grinders', cycleTime: '35–40s' },
        { name: 'Cell 3: Steaming & Beverage Assembly', equipment: 'Steam Wands & Syrup Dispensers', cycleTime: '60s' },
        { name: 'Cell 4: Order Assembly & Bakery Handoff', equipment: 'Expedite Counter & Tray Staging', cycleTime: '30s' },
      ],
      bottleneck: 'Bean testing and manual grinder recalibration during peak rush.',
    },
  },
  {
    id: 'perfect-serve',
    number: '05',
    title: 'THE PERFECT SERVE',
    subtitle: 'Operations Strategy & Trade-Offs',
    academicTopic: 'Topic 5: Operational Strategy Alignment & Positioning',
    description:
      'Analyzing True Black’s deliberate trade-offs: semi-automatic barista control vs super-automatic automation, and 3-day freshness vs inventory loss.',
    presenterImage: '/images/presenters/presenter5.png',
    scrollRange: [0.46, 0.56],
    imageSrc: '/images/stockimages/IMG_3802.JPG.jpeg',
    imageCaption: 'Completed Table Order Delivery — 8-Min SLA Fulfillment',
    secondaryImageSrc: '/images/stockimages/IMG_3803.JPG.jpeg',
    strategyData: [
      {
        pillar: 'Machine Technology',
        choice: 'Semi-Automatic Espresso',
        tradeoff: 'Allows barista dial-in nuance and artisanal theatricality at the cost of operator fatigue during rush.',
      },
      {
        pillar: 'Freshness Protocol',
        choice: 'Strict 3-Day Usable Window',
        tradeoff: 'Guarantees peak sensory flavor notes but creates high batch discard risk if demand drops.',
      },
      {
        pillar: 'Service Format',
        choice: 'Semi-Dine-In Hybrid',
        tradeoff: 'High table occupancy & linger time; requires careful counter expedite pacing.',
      },
    ],
    comparisons: [
      {
        dimension: 'Machine Standard',
        trueBlack: 'Commercial Semi-Automatic',
        starbucks: 'Super-Automatic (Mastrena)',
        thirdWave: 'Manual Multi-Boiler Lever',
      },
      {
        dimension: 'Bean Window',
        trueBlack: '3-Day Strict Post-Roast',
        starbucks: 'Commercial Sealed Vacuum Pack',
        thirdWave: 'Single-Origin Weekly Rotation',
      },
      {
        dimension: 'Competitive Focus',
        trueBlack: 'Artisan craft + 8-min pace',
        starbucks: 'Volume throughput + consistency',
        thirdWave: 'Exotic origins + cupping scores',
      },
    ],
    gridItems: [
      { title: 'Taste Consistency', subtitle: 'Dialed-in extraction ratio', iconType: 'coffee' },
      { title: 'Service Quality', subtitle: 'Barista engagement & craft', iconType: 'heart' },
      { title: 'Ambience & Cleanliness', subtitle: 'Aesthetic semi-dine-in lounge', iconType: 'sparkles' },
      { title: 'Customer Satisfaction', subtitle: '8-min SLA compliance', iconType: 'star' },
    ],
  },
  {
    id: 'beyond-cup',
    number: '06',
    title: 'BEYOND THE CUP',
    subtitle: '8 Actionable OM Recommendations',
    academicTopic: 'Topic 6: Operational Synthesis & Strategic Interventions',
    description:
      'Eight concrete, evidence-based operational recommendations derived from our field study to eliminate bottlenecks and strengthen capacity.',
    presenterImage: '/images/presenters/presenter6.png',
    scrollRange: [0.56, 0.66],
    imageSrc: '/images/stockimages/IMG_3800.JPG.jpeg',
    imageCaption: 'Back-of-House Prep Station & Calibration Scales',
    secondaryImageSrc: '/images/stockimages/IMG_3805.JPG.jpeg',
    recommendations: [
      {
        id: 1,
        title: 'Pre-Shift Bean Batch Testing',
        impact: 'High',
        action: 'Execute all cupping and roast sensory testing 45 min before doors open to unblock daytime bar flow.',
        kpi: 'Eliminate 15 min daytime bottlenecks',
      },
      {
        id: 2,
        title: 'Visual Queue Status Display',
        impact: 'High',
        action: 'Implement subtle numbered status board to manage customer expectations within the 8-minute SLA.',
        kpi: '-40% perceived wait anxiety',
      },
      {
        id: 3,
        title: 'Dynamic Roasting Batch Sizing',
        impact: 'High',
        action: 'Align 40–45 min roast batches with POS day-of-week forecasts to protect the 3-day freshness window.',
        kpi: '-25% bean scrap & waste',
      },
      {
        id: 4,
        title: 'Cross-Trained Expedite Barista',
        impact: 'Medium',
        action: 'Train bakery counter staff in milk steaming to absorb load during 17:00–20:00 evening demand peaks.',
        kpi: '+20% rush-hour order throughput',
      },
      {
        id: 5,
        title: 'Cellular Step-Minimization Bar Layout',
        impact: 'Medium',
        action: 'Relocate milk staging fridge within 0.5m of steam wand to eliminate barista pivot steps.',
        kpi: 'Save 4–5 sec per beverage cycle',
      },
      {
        id: 6,
        title: 'Standardized Digital Grind Logs',
        impact: 'Medium',
        action: 'Replace subjective grinder adjustments with digital micrometric calibration logs across shift handovers.',
        kpi: 'Consistent shot extraction yields',
      },
      {
        id: 7,
        title: 'Peak-Hour Menu Staging',
        impact: 'Medium',
        action: 'Pre-portion cold-brew bases and pre-slice high-runner bakery items ahead of weekend rush windows.',
        kpi: 'Reduce order prep time by 30 sec',
      },
      {
        id: 8,
        title: 'Predictive Dairy & Par Replenishment',
        impact: 'Medium',
        action: 'Automate daily supplier reorder triggers linked to real-time POS consumption rates.',
        kpi: 'Zero stockouts of specialty milks',
      },
    ],
    checkpoints: [
      'Pre-shift roast testing to eliminate process bottlenecks',
      'Digital queue pacing to protect the 8-minute delivery SLA',
      'Dynamic roasting schedules for the 3-day bean freshness window',
      'Dual cross-training across espresso bar and bakery service',
    ],
  },
];

export interface FieldPhotoItem {
  id: string;
  category: 'Architecture' | 'Equipment' | 'Craft' | 'Service';
  title: string;
  location: string;
  imageSrc: string;
  caption: string;
  omNotes: string;
}

export const FIELD_GALLERY_PHOTOS: FieldPhotoItem[] = [
  {
    id: 'photo-1',
    category: 'Architecture',
    title: 'True Black Storefront & Architecture',
    location: 'Exterior Entrance — Hyderabad',
    imageSrc: '/images/stockimages/IMG_3804.JPG.jpeg',
    caption: 'Authentic stone exterior, lush vertical greenery, and distinctive True Black branding.',
    omNotes: 'Direct physical storefront presence establishes premium brand identity and drives destination traffic.',
  },
  {
    id: 'photo-2',
    category: 'Architecture',
    title: 'Semi-Dine-In Lounge Interior & Seating',
    location: 'Interior Lounge — Hyderabad',
    imageSrc: '/images/stockimages/IMG_3818.JPG.jpeg',
    caption: 'Thoughtful spatial arrangement supporting both quick takeaway and relaxed semi-dine-in guests.',
    omNotes: 'Cellular table distribution balances noise levels and preserves sightlines to the brewing bar.',
  },
  {
    id: 'photo-3',
    category: 'Equipment',
    title: 'Sanremo Opera 2.0 & Barista Extraction Cell',
    location: 'Brewing Station Cell',
    imageSrc: '/images/stockimages/IMG_3812.JPG.jpeg',
    caption: 'Commercial Sanremo Opera 2.0 machine with dual on-demand grinders operated by trained baristas.',
    omNotes: 'Semi-automatic setup prioritizes artisan dial-in precision over automated mass-market throughput.',
  },
  {
    id: 'photo-4',
    category: 'Craft',
    title: 'Specialty Single-Origin Aroma & Cupping Station',
    location: 'Tasting Counter Cell',
    imageSrc: '/images/stockimages/IMG_3821.JPG.jpeg',
    caption: 'Dedicated single-dose aroma tasting vials and recipe cards including Ratnagiri RN 30 Naturals.',
    omNotes: 'Sensory fragrance stations facilitate customer education and drive premium origin selection.',
  },
  {
    id: 'photo-5',
    category: 'Equipment',
    title: 'Artisan Bakery Display & Granola Selection',
    location: 'Front Counter Cell',
    imageSrc: '/images/stockimages/IMG_3822.JPG.jpeg',
    caption: 'Lit pastry display showcasing gourmet cakes, buns, cinnamon rolls, and in-house True Granola jars.',
    omNotes: 'High-visibility visual merchandising directly supports the verified 25% bakery revenue contribution.',
  },
  {
    id: 'photo-6',
    category: 'Service',
    title: 'Open Bar Customer Interaction & Pour-Over',
    location: 'Front Service Counter',
    imageSrc: '/images/stockimages/IMG_3811.JPG.jpeg',
    caption: 'First point of customer engagement featuring manual pour-over drippers and single-dose tubes.',
    omNotes: 'High customer contact (Visibility) builds craft authenticity and initiates the 8-minute order SLA.',
  },
  {
    id: 'photo-7',
    category: 'Craft',
    title: 'Signature Espresso Tonic in Lounge Setting',
    location: 'Dine-In Lounge Area',
    imageSrc: '/images/stockimages/IMG_3805.JPG.jpeg',
    caption: 'Layered specialty espresso tonic with citrus garnish served beside customer workstation.',
    omNotes: 'Hybrid café format caters to remote workers and casual lingerers, extending average transaction time.',
  },
  {
    id: 'photo-8',
    category: 'Service',
    title: 'Table Service Fulfillment & Dine-In Orders',
    location: 'Table Service Area',
    imageSrc: '/images/stockimages/IMG_3802.JPG.jpeg',
    caption: 'Completed order delivery with table stand #5: iced beverages, frappes, and savory food pairings.',
    omNotes: 'Order expedite sequence synchronizes beverage preparation with bakery and kitchen output.',
  },
  {
    id: 'photo-9',
    category: 'Service',
    title: 'Barista Workspace, Scales & Ingredient Staging',
    location: 'Prep Station Cell',
    imageSrc: '/images/stockimages/IMG_3800.JPG.jpeg',
    caption: 'Clean staging area with digital scales, matcha vessels, cork boards, and menu specification guides.',
    omNotes: 'Standardized 5S tool arrangement minimizes motion waste and ensures reproducible drink ratios.',
  },
];

/**
 * Calculates smooth, eye-comfortable continuous crossfade opacity for chapter index
 * Equal-power cosine blending across overlapping boundary zones ensures constant
 * luminance (sum of adjacent opacities is 1.0) with zero black flashes or strobe effects.
 */
export function getChapterOpacity(progress: number, index: number): number {
  if (index < 0 || index >= CHAPTERS.length) return 0;
  const [start, end] = CHAPTERS[index].scrollRange;
  const blend = 0.025; // 2.5% global scroll blend window

  if (progress < start - blend) return 0;
  if (progress > end + blend) return 0;

  // Entrance crossfade
  if (progress < start + blend) {
    const t = (progress - (start - blend)) / (2 * blend);
    return 0.5 - 0.5 * Math.cos(Math.PI * Math.max(0, Math.min(1, t)));
  }

  // Stable reading plateau
  if (progress <= end - blend) {
    return 1;
  }

  // Exit crossfade
  const t = (progress - (end - blend)) / (2 * blend);
  return 0.5 + 0.5 * Math.cos(Math.PI * Math.max(0, Math.min(1, t)));
}

