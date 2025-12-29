import Event from "../models/Event.js";

// @desc   Create new event
// @route  POST /api/events
// @access Private
const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, category } = req.body;

    if (!title || !description || !date || !time || !location || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      category,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all events
// @route  GET /api/events
// @access Public
const getAllEvents = async (req, res) => {
  try {
    const { category, location } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (location) filter.location = location;

    const events = await Event.find(filter).populate(
      "createdBy",
      "name email"
    );

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single event
// @route  GET /api/events/:id
// @access Public
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update event
// @route  PUT /api/events/:id
// @access Private
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Only creator can update
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete event
// @route  DELETE /api/events/:id
// @access Private
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Only creator can delete
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await event.deleteOne();
    res.json({ message: "Event removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
