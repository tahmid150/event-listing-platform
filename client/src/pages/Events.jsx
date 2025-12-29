import { useEffect, useState } from "react";
import api from "../services/api";
import EventCard from "../components/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get("/events");
        setEvents(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-extrabold">
          🎉 All Events
        </h1>
        <p className="text-gray-500 mt-2 sm:mt-0">
          Browse what’s happening around you
        </p>
      </div>

      {/* Events Grid */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          😕 No events found.
        </div>
      )}
    </div>
  );
};

export default Events;
