import {
  CheckCircle,
  Package,
  Truck,
  ClipboardCheck,
} from "lucide-react";

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
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute left-0 top-5 h-1 w-full bg-[#1E2A45] rounded-full" />

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
              className="relative z-10 flex flex-col items-center w-full"
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

              <span className="mt-2 text-xs text-slate-400">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskProgress;
