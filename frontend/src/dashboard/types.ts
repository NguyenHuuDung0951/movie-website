export type DateRangeKey = "Today" | "7D" | "30D" | "3M" | "1Y" | "Custom";

export type TrendPoint = {
  label: string;
  value: number;
};

export type KpiItem = {
  id: string;
  label: string;
  value: string;
  changePct: number;
  icon: string;
  trend: TrendPoint[];
};

export type TrafficPoint = {
  label: string;
  totalViews: number;
  uniqueVisitors: number;
  newUsers: number;
  returningUsers: number;
};

export type RevenuePoint = {
  label: string;
  subscription: number;
  ads: number;
};

export type RevenuePlanPoint = {
  name: string;
  value: number;
};

export type TrendingItem = {
  id: number;
  title: string;
  type: "movie" | "series";
  genre: string;
  views: string;
  rating: number;
  changePct: number;
  posterColor: string;
};

export type GenrePoint = {
  genre: string;
  totalTitles: number;
  viewShare: number;
};

export type HeatmapRow = {
  day: string;
  hours: number[];
};

export type DevicePoint = {
  name: string;
  sessions: number;
};

export type CityPoint = {
  city: string;
  viewers: number;
  x: number;
  y: number;
};

export type MemberGrowthPoint = {
  label: string;
  totalMembers: number;
  signups: number;
};

export type CohortRow = {
  cohort: string;
  retention: number[];
};

export type LibraryStat = {
  label: string;
  value: string;
  subtitle: string;
  bars?: { label: string; value: number }[];
  calendar?: number[];
};

export type ActivityItem = {
  id: number;
  icon: string;
  text: string;
  time: string;
  actionLabel: string;
};

export type DashboardData = {
  kpis: KpiItem[];
  traffic: TrafficPoint[];
  revenueByPeriod: RevenuePoint[];
  revenueByPlan: RevenuePlanPoint[];
  totalMRR: number;
  trending: TrendingItem[];
  genreDistribution: GenrePoint[];
  heatmap: HeatmapRow[];
  deviceBreakdown: DevicePoint[];
  geoCities: CityPoint[];
  memberGrowth: MemberGrowthPoint[];
  retentionRows: CohortRow[];
  libraryStats: LibraryStat[];
  activities: ActivityItem[];
};
