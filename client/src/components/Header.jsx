import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Header = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Eventify
        </Link>

        <nav className="space-x-4 mt-2 sm:mt-0 flex flex-wrap justify-center sm:justify-end gap-2">
          <Link to="/events">Events</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
