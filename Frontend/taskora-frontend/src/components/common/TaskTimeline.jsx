const steps = ["OPEN", "ACCEPTED", "IN_PROGRESS", "DELIVERED", "COMPLETED"];

const TaskTimeline = ({ status }) => {
  const currentIndex = steps.indexOf(status);

  return (
    <div className="flex justify-between mt-8">
      {steps.map((step, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step} className="flex-1 text-center">
            <div
              className={`mx-auto w-4 h-4 rounded-full mb-2
              ${
                isDone
                  ? "bg-green-500"
                  : isCurrent
                  ? "bg-blue-500"
                  : "bg-gray-600"
              }`}
            ></div>

            <span
              className={`text-xs ${
                isDone || isCurrent
                  ? "text-white"
                  : "text-gray-500"
              }`}
            >
              {step.replace("_", " ")}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TaskTimeline;
