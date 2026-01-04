import { createWidget } from "../../../shared/widget-base";

export type DashboardStat = {
  label: string;
  value: string;
  change?: string;
};

export type DashboardChat = {
  id: number;
  title: string;
  model: string;
  time: string;
};

export type DashboardWidgetProps = {
  dashboard?: boolean;
  headerText?: string;
  stats?: DashboardStat[];
  recentChats?: DashboardChat[];
};

function DashboardBody({ headerText, stats = [], recentChats = [] }: DashboardWidgetProps) {
  return (
    <div className="space-y-4 text-sm text-white/90">
      <div className="text-lg font-semibold">{headerText ?? "Dashboard"}</div>

      <div className="grid gap-3 sm:grid-cols-2">
        {stats.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-white/60">
            No metrics available.
          </div>
        ) : (
          stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-white/10 bg-white/5 p-3">
              <div className="text-xs text-white/60">{stat.label}</div>
              <div className="text-base font-semibold">{stat.value}</div>
              {stat.change && <div className="text-xs text-white/70">{stat.change}</div>}
            </div>
          ))
        )}
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 p-3">
        <div className="text-xs uppercase tracking-wide text-white/60">Recent</div>
        {recentChats.length === 0 ? (
          <div className="mt-2 text-xs text-white/60">No recent chats.</div>
        ) : (
          <div className="mt-2 space-y-2">
            {recentChats.map((chat) => (
              <div key={chat.id} className="flex items-center justify-between text-xs">
                <div>
                  <div className="text-white/90">{chat.title}</div>
                  <div className="text-white/60">{chat.model}</div>
                </div>
                <div className="text-white/60">{chat.time}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const DashboardWidget = createWidget(DashboardBody, {
  title: "Dashboard",
  className: "max-h-[70vh]",
});
