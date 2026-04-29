import React from "react";
import { Users, Film, PlayCircle, CreditCard } from "lucide-react";
import { DashboardLayout } from "./layout/DashboardLayout";
import { StatCard } from "./components/StatCard";
import { TopTrendingList } from "./components/TopTrendingList";
import { ViewershipChart } from "./charts/ViewershipChart";
import { GenreDistributionChart } from "./charts/GenreDistributionChart";
import { UserGrowthChart } from "./charts/UserGrowthChart";
import { recentActivities } from "./data/mockData";

export const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Tổng quan</h1>
          <p className="text-zinc-500 mt-1">Chào mừng trở lại, xem qua các chỉ số của nền tảng hôm nay.</p>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <button className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors">
            Xuất báo cáo
          </button>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
            Thêm phim mới
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Tổng thành viên"
          value="12,345"
          icon={Users}
          trend="+12%"
          trendUp={true}
          colorClass="text-blue-500"
        />
        <StatCard
          title="Tổng lượt xem"
          value="2.4M"
          icon={PlayCircle}
          trend="+24%"
          trendUp={true}
          colorClass="text-emerald-500"
        />
        <StatCard
          title="Tổng số phim"
          value="854"
          icon={Film}
          trend="+5%"
          trendUp={true}
          colorClass="text-purple-500"
        />
        <StatCard
          title="Doanh thu Premium"
          value="45.2M ₫"
          icon={CreditCard}
          trend="-2%"
          trendUp={false}
          colorClass="text-rose-500"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
        <div className="lg:col-span-2">
          <ViewershipChart />
        </div>
        <div className="lg:col-span-1">
          <GenreDistributionChart />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <UserGrowthChart />
          
          {/* Recent Activities List */}
          <div className="rounded-2xl border border-zinc-800 bg-[#151618] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-white mb-6">Hoạt động gần đây</h2>
            <div className="space-y-6">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <img
                    src={activity.avatar}
                    alt={activity.user}
                    className="h-10 w-10 rounded-full border border-zinc-700"
                  />
                  <div>
                    <p className="text-sm text-zinc-300">
                      <span className="font-semibold text-white">{activity.user}</span>{" "}
                      {activity.action}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 rounded-lg py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors">
              Xem tất cả hoạt động
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <TopTrendingList />
        </div>
      </div>
    </DashboardLayout>
  );
};
