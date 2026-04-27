import { DashboardData, DateRangeKey } from "@/dashboard/types";

const rangeScale: Record<DateRangeKey, number> = {
  Today: 0.35,
  "7D": 1,
  "30D": 3.8,
  "3M": 8.6,
  "1Y": 34,
  Custom: 2.4,
};

const rangeLabels: Record<DateRangeKey, string[]> = {
  Today: ["00h", "03h", "06h", "09h", "12h", "15h", "18h", "21h"],
  "7D": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  "30D": ["D1", "D5", "D10", "D15", "D20", "D25", "D30"],
  "3M": ["W1", "W3", "W5", "W7", "W9", "W11"],
  "1Y": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  Custom: ["P1", "P2", "P3", "P4", "P5", "P6", "P7"],
};

const formatCompact = (value: number) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

const seeded = (index: number, min: number, max: number, skew = 1) => {
  const base = Math.sin(index * 12.9898) * 43758.5453;
  const normalized = Math.abs(base - Math.floor(base));
  return Math.round(min + (max - min) * Math.pow(normalized, skew));
};

const buildTraffic = (range: DateRangeKey) => {
  const labels = rangeLabels[range];
  const scale = rangeScale[range];

  return labels.map((label, index) => {
    const baseline = 52000 * scale;
    const swing = seeded(index + labels.length, 4000, 18000);
    const unique = Math.round((baseline + swing) * 0.58);
    const newUsers = Math.round(unique * (0.32 + (index % 3) * 0.02));
    const returningUsers = unique - newUsers;

    return {
      label,
      totalViews: Math.round(baseline + swing * 1.3),
      uniqueVisitors: unique,
      newUsers,
      returningUsers,
    };
  });
};

const buildRevenue = (range: DateRangeKey) => {
  const labels = rangeLabels[range];
  const scale = rangeScale[range];

  return labels.map((label, index) => {
    const base = 34000 * scale;
    const momentum = seeded(index + 3, 3000, 9000);

    return {
      label,
      subscription: Math.round(base + momentum * 1.4),
      ads: Math.round((base + momentum) * 0.38),
    };
  });
};

const buildMemberGrowth = (range: DateRangeKey) => {
  const labels = rangeLabels[range];
  const offset = Math.round(rangeScale[range] * 8000);
  let cumulative = 482000 + offset;

  return labels.map((label, index) => {
    const signups = seeded(index + 21, 1800, 7900);
    cumulative += signups;

    return {
      label,
      totalMembers: cumulative,
      signups,
    };
  });
};

const baseTrending = [
  ["Dune: Prophecy", "movie", "Sci-Fi"],
  ["Kingdom of Shadows", "series", "Thriller"],
  ["Summer in Seoul", "series", "K-Drama"],
  ["The Last Orbit", "movie", "Action"],
  ["Heartline 2049", "movie", "Romance"],
  ["Silent Evidence", "series", "Drama"],
  ["Parallel Heist", "movie", "Comedy"],
  ["Ghost Harbor", "series", "Horror"],
  ["Neuron Kids", "movie", "Animation"],
  ["Signal 11", "series", "Documentary"],
] as const;

const palette = ["#3B82F6", "#06B6D4", "#A855F7", "#22D3EE", "#60A5FA"];

export const createDashboardData = (range: DateRangeKey): DashboardData => {
  const scale = rangeScale[range];
  const traffic = buildTraffic(range);
  const revenueByPeriod = buildRevenue(range);
  const memberGrowth = buildMemberGrowth(range);

  const totalRevenue = revenueByPeriod.reduce((sum, item) => sum + item.subscription + item.ads, 0);
  const totalViews = traffic.reduce((sum, item) => sum + item.totalViews, 0);

  return {
    kpis: [
      {
        id: "new-members",
        label: "New Members",
        value: formatCompact(14000 * scale),
        changePct: 9.4,
        icon: "👥",
        trend: traffic.map((item) => ({
          label: item.label,
          value: Math.round(item.newUsers * 0.6),
        })),
      },
      {
        id: "total-views",
        label: "Total Views",
        value: formatCompact(totalViews),
        changePct: 12.1,
        icon: "👁️",
        trend: traffic.map((item) => ({ label: item.label, value: item.totalViews })),
      },
      {
        id: "watch-time",
        label: "Watch Time",
        value: `${formatCompact(Math.round(totalViews * 0.52))} hrs`,
        changePct: 6.8,
        icon: "⏱️",
        trend: traffic.map((item) => ({
          label: item.label,
          value: Math.round(item.totalViews * 0.5),
        })),
      },
      {
        id: "revenue",
        label: "Revenue",
        value: `$${formatCompact(totalRevenue)}`,
        changePct: 14.2,
        icon: "💰",
        trend: revenueByPeriod.map((item) => ({
          label: item.label,
          value: item.subscription + item.ads,
        })),
      },
      {
        id: "subscriptions",
        label: "Active Subscriptions",
        value: formatCompact(Math.round(316000 + scale * 29000)),
        changePct: 4.9,
        icon: "🔄",
        trend: memberGrowth.map((item) => ({ label: item.label, value: item.totalMembers })),
      },
      {
        id: "churn",
        label: "Churn Rate",
        value: `${(2.1 + 0.3 / Math.max(scale, 0.4)).toFixed(1)}%`,
        changePct: -1.2,
        icon: "📉",
        trend: memberGrowth.map((item, index) => ({
          label: item.label,
          value: Math.round(31 - index * 1.2 + seeded(index, 0, 4)),
        })),
      },
    ],
    traffic,
    revenueByPeriod,
    revenueByPlan: [
      { name: "Free", value: Math.round(180000 * scale) },
      { name: "Basic", value: Math.round(260000 * scale) },
      { name: "Standard", value: Math.round(420000 * scale) },
      { name: "Premium", value: Math.round(510000 * scale) },
    ],
    totalMRR: Math.round(1370000 * Math.min(scale, 4.5)),
    trending: baseTrending.map((item, index) => ({
      id: index + 1,
      title: item[0],
      type: item[1],
      genre: item[2],
      views: formatCompact(Math.round((78000 + seeded(index, 3000, 25000)) * scale)),
      rating: Number((4 + seeded(index, 0, 10) / 10).toFixed(1)),
      changePct: Number((seeded(index + 16, -8, 16) / 2).toFixed(1)),
      posterColor: palette[index % palette.length],
    })),
    genreDistribution: [
      ["Action", 340, 17],
      ["Drama", 288, 14],
      ["Comedy", 256, 12],
      ["Horror", 138, 8],
      ["Sci-Fi", 182, 10],
      ["Romance", 201, 9],
      ["Thriller", 220, 11],
      ["Animation", 145, 7],
      ["Documentary", 110, 6],
      ["K-Drama", 172, 10],
    ].map((row) => ({
      genre: row[0],
      totalTitles: Math.round(Number(row[1]) * (0.9 + scale * 0.04)),
      viewShare: Number(row[2]),
    })),
    heatmap: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, dayIndex) => ({
      day,
      hours: Array.from({ length: 24 }, (_, hour) => {
        const peak = hour >= 19 && hour <= 23 ? 1.4 : hour >= 12 && hour <= 14 ? 1.1 : 0.7;
        return Math.round(
          (seeded(dayIndex * 24 + hour, 120, 980) * peak * (0.8 + scale * 0.05)) / 10,
        );
      }),
    })),
    deviceBreakdown: [
      { name: "Smart TV", sessions: Math.round(450000 * scale) },
      { name: "Mobile", sessions: Math.round(730000 * scale) },
      { name: "Tablet", sessions: Math.round(210000 * scale) },
      { name: "Desktop", sessions: Math.round(380000 * scale) },
      { name: "Console", sessions: Math.round(120000 * scale) },
    ],
    geoCities: [
      { city: "Ho Chi Minh City", viewers: Math.round(295000 * scale), x: 66, y: 76 },
      { city: "Hanoi", viewers: Math.round(262000 * scale), x: 60, y: 28 },
      { city: "Da Nang", viewers: Math.round(124000 * scale), x: 57, y: 52 },
      { city: "Can Tho", viewers: Math.round(86000 * scale), x: 55, y: 82 },
      { city: "Hai Phong", viewers: Math.round(78000 * scale), x: 65, y: 24 },
    ],
    memberGrowth,
    retentionRows: [
      ["2025-10", [100, 71, 63, 55, 49, 44, 39]],
      ["2025-11", [100, 69, 60, 53, 48, 42, 38]],
      ["2025-12", [100, 73, 65, 57, 52, 46, 41]],
      ["2026-01", [100, 75, 68, 61, 55, 50, 44]],
      ["2026-02", [100, 74, 67, 60, 54, 49, 43]],
      ["2026-03", [100, 76, 69, 62, 56, 51, 46]],
    ].map((row) => ({
      cohort: row[0],
      retention: row[1] as number[],
    })),
    libraryStats: [
      {
        label: "Total Movies in Library",
        value: formatCompact(Math.round(12840 * (0.92 + scale * 0.03))),
        subtitle: "Updated daily from production pipeline",
        bars: [
          { label: "Action", value: 84 },
          { label: "Drama", value: 72 },
          { label: "Sci-Fi", value: 56 },
          { label: "Comedy", value: 49 },
          { label: "Other", value: 65 },
        ],
      },
      {
        label: "Total Series (Episodes)",
        value: `${formatCompact(Math.round(1240 * (0.95 + scale * 0.02)))} / ${formatCompact(
          Math.round(37800 * (0.98 + scale * 0.01)),
        )}`,
        subtitle: "Ongoing vs completed title health",
        bars: [
          { label: "Ongoing", value: 59 },
          { label: "Completed", value: 41 },
        ],
      },
      {
        label: "New Content Added This Month",
        value: formatCompact(Math.round(146 * (0.9 + scale * 0.08))),
        subtitle: "Upload cadence over the last 30 days",
        calendar: Array.from({ length: 35 }, (_, idx) => seeded(idx + 9, 0, 9)),
      },
    ],
    activities: [
      {
        id: 1,
        icon: "🎬",
        text: 'New movie uploaded: "Avengers: Secret Wars"',
        time: "2m ago",
        actionLabel: "View",
      },
      {
        id: 2,
        icon: "👤",
        text: "New VIP member: minhanh@email.com",
        time: "10m ago",
        actionLabel: "Open",
      },
      {
        id: 3,
        icon: "💳",
        text: "New subscription: Premium Plan - $9.99",
        time: "18m ago",
        actionLabel: "Inspect",
      },
      {
        id: 4,
        icon: "⭐",
        text: 'New review: "Inception" - 5 stars',
        time: "26m ago",
        actionLabel: "Read",
      },
      {
        id: 5,
        icon: "🚨",
        text: "Report flagged: Content ID #4521",
        time: "41m ago",
        actionLabel: "Resolve",
      },
    ],
  };
};
