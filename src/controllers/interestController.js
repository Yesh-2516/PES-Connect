import Interest from "../models/Interest.js";

export const addInterest = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id;

    const exists = await Interest.findOne({ userId, eventId });
    if (exists) return res.status(400).json({ message: "Already in interests" });

    const interest = await Interest.create({ userId, eventId });

    res.status(201).json(interest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeInterest = async (req, res) => {
  try {
    await Interest.findByIdAndDelete(req.params.id);
    res.json({ message: "Interest removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Gets current user's interests with event details
export const getMyInterests = async (req, res) => {
  try {
    const userId = req.user.id;

    const interests = await Interest.find({ userId }).populate("eventId");

    res.json(interests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
