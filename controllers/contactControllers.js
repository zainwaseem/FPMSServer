import Contact from "../models/contactModel.js";
import mongoose from "mongoose";

const SaveMssage = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !phone || !subject || !message) {
      return res.json({
        message: "Please fill out the fields.",
      });
    }
    const newMessage = new Contact({
      name,
      email,
      phone,
      subject,
      message,
    });
    await newMessage.save();
    res.status(200).json({ message: `Your message recorded successfully` });
  } catch (error) {
    next(error);
  }
};

const getAllMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find();
    // .sort({ name: 1 });
    return res.json(messages);
  } catch (error) {
    next(error);
  }
};
const deleteMessage = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Not found" });
  }

  try {
    await Contact.findByIdAndDelete(req.params.id);
    return res.json({ message: `Record has been deleted` });
  } catch (error) {
    next(error);
  }
};
export { SaveMssage, getAllMessages, deleteMessage };
