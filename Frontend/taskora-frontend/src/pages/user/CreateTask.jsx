import { useState } from "react";
import { toast } from "sonner";
import api from "../../utils/axios";

const CreateTask = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    items: "",
    pickupLocation: "",
    dropLocation: "",
    deadline: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/api/tasks",
        {
          title: form.title,
          description: form.description,
          items: form.items.split(",").map((i) => ({ name: i.trim() })),
          pickupLocation: { masked: form.pickupLocation },
          dropLocation: { masked: form.dropLocation },
          deadline: form.deadline,
          price: Number(form.price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Task posted successfully!");
      setForm({
        title: "",
        description: "",
        items: "",
        pickupLocation: "",
        dropLocation: "",
        deadline: "",
        price: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] pt-40 flex justify-center ">
      <div className="w-full max-w-3xl bg-[#121A2B]/80 backdrop-blur-xl border border-[#1E2A45] rounded-3xl p-10 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-2">Post a Task</h1>
        <p className="text-slate-400 mb-10">
          Describe what you need and a verified runner will handle it for you.
        </p>
        <Link
          to="/user"
          className="inline-flex items-center text-slate-400 hover:text-white mb-4"
        >
          ← Back to Dashboard
        </Link>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Task Title
            </label>
            <input
              name="title"
              placeholder="Buy medicines from Apollo Pharmacy"
              value={form.title}
              onChange={handleChange}
              className="w-full bg-[#0B1220] border border-[#1E2A45] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Task Description
            </label>
            <textarea
              name="description"
              placeholder="Please buy crocin, vitamin C tablets, and deliver before evening"
              value={form.description}
              onChange={handleChange}
              className="w-full h-28 resize-none bg-[#0B1220] border border-[#1E2A45] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Items */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Items (comma separated)
            </label>
            <input
              name="items"
              placeholder="Crocin, Vitamin C, Bandage"
              value={form.items}
              onChange={handleChange}
              className="w-full bg-[#0B1220] border border-[#1E2A45] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Pickup Location
              </label>
              <input
                name="pickupLocation"
                placeholder="Apollo Pharmacy, Pitampura"
                value={form.pickupLocation}
                onChange={handleChange}
                className="w-full bg-[#0B1220] border border-[#1E2A45] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Drop Location
              </label>
              <input
                name="dropLocation"
                placeholder="Karawal Nagar, Delhi"
                value={form.dropLocation}
                onChange={handleChange}
                className="w-full bg-[#0B1220] border border-[#1E2A45] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Deadline + Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Deadline
              </label>
              <input
                type="datetime-local"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="w-full bg-[#0B1220] border border-[#1E2A45] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                placeholder="300"
                value={form.price}
                onChange={handleChange}
                className="w-full bg-[#0B1220] border border-[#1E2A45] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full mt-6 bg-blue-500 hover:bg-blue-600 py-4 rounded-full text-white font-semibold text-lg transition disabled:opacity-50"
          >
            {loading ? "Posting Task..." : "Post Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
