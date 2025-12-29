import { useEffect, useState } from "react";
import api from "../services/api";
import EventCard from "../components/EventCard";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get("/events");
        setEvents(data);
        setCategories([...new Set(data.map((e) => e.category))]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = selectedCategory
    ? events.filter((e) => e.category === selectedCategory)
    : events;

  return (
    <div className="space-y-10">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-10 shadow-xl">
        <h1 className="text-4xl font-extrabold mb-2">
          🎉 Discover Local Events
        </h1>
        <p className="text-white/90 text-lg">
          Find events near you. Join. Enjoy. Repeat.
        </p>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-2xl font-bold mb-4">🔥 Categories</h2>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-5 py-2 rounded-full font-medium transition ${
              selectedCategory === ""
                ? "bg-indigo-600 text-white shadow"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium transition ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events */}
      <div>
        <h2 className="text-2xl font-bold mb-4">📅 Upcoming Events</h2>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
