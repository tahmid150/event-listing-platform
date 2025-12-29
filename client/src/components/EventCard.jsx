import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition flex flex-col justify-between h-full">
      <div>
        <h3 className="text-lg font-semibold mb-1 truncate">{event.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{event.date} | {event.time}</p>
        <p className="text-sm text-gray-600 mb-2 truncate">{event.location}</p>
        <p className="text-sm mb-2 line-clamp-3">{event.description}</p>
      </div>
      <Link
        to={`/events/${event._id}`}
        className="text-blue-500 hover:underline text-sm mt-2"
      >
        View Details
      </Link>
    </div>
  );
};

export default EventCard;
