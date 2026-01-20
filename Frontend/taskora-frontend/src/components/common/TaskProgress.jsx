import { CheckCircle, Package, Truck, ClipboardCheck } from "lucide-react";

const STEPS = [
  { key: "OPEN", label: "Open", icon: Package },
  { key: "ACCEPTED", label: "Accepted", icon: CheckCircle },
  { key: "IN_PROGRESS", label: "In Progress", icon: Truck },
  { key: "DELIVERED", label: "Delivered", icon: ClipboardCheck },
  { key: "COMPLETED", label: "Completed", icon: CheckCircle },
];

const TaskProgress = ({ status }) => {
  const activeIndex = STEPS.findIndex((s) => s.key === status);

  return (
    <div className="mt-10">
      {/* Scroll container for mobile */}
      <div className="relative overflow-x-auto">
        {/* Timeline wrapper */}
        <div className="relative flex items-center gap-6 min-w-[520px] px-2">
          {/* Background line */}
          <div className="absolute left-0 top-5 h-1 w-full bg-[#1E2A45] rounded-full" />

          {/* Active progress line */}
          <div
            className="absolute left-0 top-5 h-1 bg-blue-500 rounded-full transition-all duration-500"
            style={{
              width: `${(activeIndex / (STEPS.length - 1)) * 100}%`,
            }}
          />

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= activeIndex;

            return (
              <div
                key={step.key}
                className="relative z-10 flex flex-col items-center w-[90px] shrink-0"
              >
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "bg-[#1E2A45] text-slate-400"
                    }`}
                >
                  <Icon size={18} />
                </div>

                <span className="mt-2 text-xs text-slate-400 text-center whitespace-nowrap">
                  {step.label}
                </span>
                <p className="text-xs text-slate-500 mt-2 md:hidden">
                  Swipe to view progress →
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskProgress;
