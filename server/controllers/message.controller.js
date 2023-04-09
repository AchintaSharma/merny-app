const Message = require("../models/message.model");

const createMessage = async (req, res) => {
  const { conversationId, senderId, recipientId, text, media } = req.body;

  // check if sender and recipient are valid ids
  const sender = await User.findById(senderId);
  const recipient = await User.findById(recipientId);

  if (!sender || !recipient) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Invalid sender or recipient ID",
    });
  }

  // create message object
  const newMessage = new Message({
    conversation: conversationId,
    sender: senderId,
    recipient: recipientId,
    text: text,
    media: media,
  });

  try {
    await newMessage.save();
    return res.status(201).json({
      success: true,
      status: 201,
      message: "Create Success!",
    });
  } catch (err) {
    console.log(`Internal server error occured while creating message: ${err}`);
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error occured while creating message.",
    });
  }
};

module.exports = {
  createMessage,
};
