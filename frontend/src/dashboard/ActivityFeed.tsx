import { Panel, SkeletonBlock } from "@/dashboard/common";
import { ActivityItem } from "@/dashboard/types";

type ActivityFeedProps = {
  activities: ActivityItem[];
  loading: boolean;
};

export const ActivityFeed = ({ activities, loading }: ActivityFeedProps) => {
  return (
    <Panel title="Recent Activity Feed" subtitle="Real-time platform events" className="h-fit">
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-16 w-full" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {activities.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-white/10 bg-black/20 p-3 transition hover:border-[#3B82F6]/45"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-zinc-200">
                  <span className="mr-2 text-base">{item.icon}</span>
                  {item.text}
                </p>
                <button
                  type="button"
                  className="rounded-md border border-white/10 px-2 py-1 text-xs text-zinc-300 transition hover:border-[#06B6D4]/60 hover:text-[#67e8f9]"
                >
                  {item.actionLabel}
                </button>
              </div>
              <p className="mt-2 text-xs text-zinc-500">{item.time}</p>
            </article>
          ))}
        </div>
      )}
    </Panel>
  );
};
