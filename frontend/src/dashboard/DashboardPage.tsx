import { useEffect, useMemo, useState } from "react";
import { createDashboardData } from "@/dashboard/mock-data";
import { DateRangeKey } from "@/dashboard/types";
import { Sidebar } from "@/dashboard/Sidebar";
import { TopBar } from "@/dashboard/TopBar";
import { KPICards } from "@/dashboard/KPICards";
import { ViewsChart } from "@/dashboard/ViewsChart";
import { RevenueSection } from "@/dashboard/RevenueSection";
import { TrendingContent } from "@/dashboard/TrendingContent";
import { GenreChart } from "@/dashboard/GenreChart";
import { HeatmapSection } from "@/dashboard/HeatmapSection";
import { DeviceChart } from "@/dashboard/DeviceChart";
import { GeoMap } from "@/dashboard/GeoMap";
import { MemberGrowth } from "@/dashboard/MemberGrowth";
import { RetentionCohort } from "@/dashboard/RetentionCohort";
import { LibraryStats } from "@/dashboard/LibraryStats";
import { ActivityFeed } from "@/dashboard/ActivityFeed";

export const DashboardPage = () => {
  const [range, setRange] = useState<DateRangeKey>("7D");
  const [loading, setLoading] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const data = useMemo(() => createDashboardData(range), [range]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 480);

    return () => clearTimeout(timeout);
  }, [range]);

  return (
    <div className="min-h-screen bg-[#0F0F13] text-zinc-100">
      <Sidebar mobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      <div className="lg:pl-64">
        <TopBar
          activeRange={range}
          onRangeChange={setRange}
          onMenuClick={() => setMobileSidebarOpen((prev) => !prev)}
        />

        <div className="grid gap-5 px-4 py-5 lg:px-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <main className="space-y-5">
            <KPICards items={data.kpis} loading={loading} />
            <ViewsChart data={data.traffic} loading={loading} />
            <RevenueSection
              byPeriod={data.revenueByPeriod}
              byPlan={data.revenueByPlan}
              totalMRR={data.totalMRR}
              loading={loading}
            />
            <section className="grid gap-4 2xl:grid-cols-2">
              <TrendingContent items={data.trending} loading={loading} />
              <GenreChart data={data.genreDistribution} loading={loading} />
            </section>

            <section className="grid gap-4 2xl:grid-cols-3">
              <div className="2xl:col-span-2">
                <HeatmapSection data={data.heatmap} loading={loading} />
              </div>
              <DeviceChart data={data.deviceBreakdown} loading={loading} />
            </section>

            <GeoMap cities={data.geoCities} loading={loading} />

            <section className="grid gap-4 2xl:grid-cols-2">
              <MemberGrowth data={data.memberGrowth} loading={loading} />
              <RetentionCohort rows={data.retentionRows} loading={loading} />
            </section>

            <LibraryStats stats={data.libraryStats} loading={loading} />
          </main>

          <aside className="space-y-4 xl:sticky xl:top-24 xl:h-fit">
            <ActivityFeed activities={data.activities} loading={loading} />
          </aside>
        </div>
      </div>
    </div>
  );
};
