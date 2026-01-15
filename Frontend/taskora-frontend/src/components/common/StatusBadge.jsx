const StatusBadge = ({ status }) => {
  const colors = {
    OPEN: "bg-gray-500",
    ACCEPTED: "bg-yellow-500",
    IN_PROGRESS: "bg-blue-500",
    DELIVERED: "bg-orange-500",
    COMPLETED: "bg-green-500",
    CANCELLED: "bg-red-500",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${colors[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
};

export default StatusBadge;
