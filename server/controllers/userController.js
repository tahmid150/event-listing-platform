import User from "../models/User.js";
import Event from "../models/Event.js";

// @desc   Get logged-in user's dashboard data
// @route  GET /api/users/dashboard
// @access Private
const getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("savedEvents")
      .select("-password");

    const createdEvents = await Event.find({
      createdBy: req.user._id,
    });

    res.json({
      user,
      createdEvents,
      savedEvents: user.savedEvents,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Save or unsave an event
// @route  POST /api/users/save/:eventId
// @access Private
const toggleSaveEvent = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const eventId = req.params.eventId;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadySaved = user.savedEvents.includes(eventId);

    if (alreadySaved) {
      user.savedEvents = user.savedEvents.filter(
        (id) => id.toString() !== eventId
      );
    } else {
      user.savedEvents.push(eventId);
    }

    await user.save();

    res.json({
      message: alreadySaved
        ? "Event removed from saved"
        : "Event saved successfully",
      savedEvents: user.savedEvents,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getUserDashboard, toggleSaveEvent };
