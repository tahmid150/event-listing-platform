import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import useAuthStore from "../store/authStore";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/events/${id}`);
        setEvent(data);

        if (user) {
          const savedEvents =
            JSON.parse(localStorage.getItem("user"))?.savedEvents || [];
          setSaved(savedEvents.includes(data._id));
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, user]);

  const toggleSave = async () => {
    if (!user) {
      alert("Please login to save events.");
      return;
    }

    try {
      const { data } = await api.post(`/users/save/${id}`);
      setSaved(data.savedEvents.includes(id));

      const currentUser = JSON.parse(localStorage.getItem("user"));
      currentUser.savedEvents = data.savedEvents;
      localStorage.setItem("user", JSON.stringify(currentUser));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-20">Loading...</p>;

  if (!event)
    return <p className="text-center text-gray-500 mt-20">Event not found.</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
        <h1 className="text-3xl font-extrabold mb-1">{event.title}</h1>
        <p className="opacity-90">
          📅 {event.date} • ⏰ {event.time}
        </p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <p className="text-gray-700">
          📍 <span className="font-medium">{event.location}</span>
        </p>

        <p className="text-gray-600 leading-relaxed">
          {event.description}
        </p>

        <p className="text-sm text-gray-500">
          Created by <span className="font-medium">{event.createdBy?.name || "Unknown"}</span>
        </p>

        {/* Action */}
        <button
          onClick={toggleSave}
          className={`w-full mt-4 py-3 rounded-xl font-semibold transition ${
            saved
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {saved ? "❤️ Unsave Event" : "💾 Save Event"}
        </button>
      </div>
    </div>
  );
};

export default EventDetail;
