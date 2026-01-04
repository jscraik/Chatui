import { createWidget } from "../../../shared/widget-base";

function KitchenSinkBody() {
  return (
    <div className="space-y-4 text-sm text-white/90">
      <div className="rounded-lg border border-white/10 bg-white/5 p-3">
        <div className="text-xs uppercase tracking-wide text-white/60">Demo</div>
        <div className="mt-1 text-sm">Kitchen sink widget placeholder.</div>
      </div>
      <div className="grid gap-2 text-xs text-white/70">
        <div>• Supports structured tool output rendering.</div>
        <div>• Used for internal UI experimentation.</div>
      </div>
    </div>
  );
}

export const KitchenSinkLite = createWidget(KitchenSinkBody, {
  title: "Kitchen Sink",
  className: "max-h-[70vh]",
});
