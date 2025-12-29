import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import api from "../services/api";

const Dashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    if (!user) navigate("/login");
    fetchDashboard();
  }, [user]);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/users/dashboard");
      setDashboardData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) =>
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });

  const resetForm = () => {
    setEditingEvent(null);
    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      category: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      editingEvent
        ? await api.put(`/events/${editingEvent._id}`, newEvent)
        : await api.post("/events", newEvent);

      resetForm();
      fetchDashboard();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this event?")) return;
    await api.delete(`/events/${id}`);
    fetchDashboard();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <h1 className="text-4xl font-extrabold text-white">
          👋 Welcome, {user?.name}
        </h1>

        {/* Create / Edit Event */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            {editingEvent ? "✏️ Edit Event" : "🚀 Create New Event"}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["title", "location", "category"].map((field) => (
              <input
                key={field}
                name={field}
                value={newEvent[field]}
                onChange={handleChange}
                placeholder={field.toUpperCase()}
                className="input"
                required
              />
            ))}

            <input type="date" name="date" value={newEvent.date} onChange={handleChange} className="input" required />
            <input type="time" name="time" value={newEvent.time} onChange={handleChange} className="input" required />

            <textarea
              name="description"
              value={newEvent.description}
              onChange={handleChange}
              placeholder="DESCRIPTION"
              className="input md:col-span-2"
              required
            />

            <div className="flex gap-3 md:col-span-2">
              <button className="btn-primary">
                {editingEvent ? "Update" : "Create"}
              </button>

              {editingEvent && (
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Events */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">🎉 Your Events</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardData?.createdEvents?.length > 0 ? (
              dashboardData.createdEvents.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-xl p-4 shadow-lg hover:scale-[1.02] transition"
                >
                  <h3 className="font-bold text-lg">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.date} • {event.time}</p>
                  <p className="mt-2 text-gray-700">{event.location}</p>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => {
                        setEditingEvent(event);
                        setNewEvent(event);
                      }}
                      className="text-indigo-600 font-semibold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(event._id)}
                      className="text-red-500 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white/80">No events yet.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
