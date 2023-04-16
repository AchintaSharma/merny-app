const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");

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

const getConversationHistory = async (req, res) => {
  try {
    // find all conversations where the logged-in user is a recipient
    const conversations = await Conversation.find({ recipients: req.user._id })
      .select("_id recipients")
      .populate({
        path: "recipients",
        select: "avatar fullname username",
      })
      .sort({ updatedAt: -1 });

    // get last message of each conversation
    const conversationIds = conversations.map(
      (conversation) => conversation._id
    );
    const lastMessages = await Message.find({
      conversation: { $in: conversationIds },
    })
      .sort({ createdAt: -1 })
      .limit(conversationIds.length)
      .populate({
        path: "sender",
        select: "avatar fullname username",
      });

    // merge conversation and last message data
    const conversationData = conversations.map((conversation) => {
      const lastMessage = lastMessages.find(
        (message) =>
          message.conversation.toString() === conversation._id.toString()
      );

      return {
        _id: conversation._id,
        recipients: conversation.recipients,
        text: lastMessage ? lastMessage.text : "",
        media: lastMessage ? lastMessage.media : [],
        createdAt: lastMessage ? lastMessage.createdAt : conversation.createdAt,
        updatedAt: lastMessage ? lastMessage.updatedAt : conversation.updatedAt,
      };
    });

    res.json({
      success: true,
      status: 200,
      conversations: conversationData,
      result: conversationData.length,
    });
  } catch (error) {
    console.log(
      `Internal server error occured while fetching converstaion history: ${err}`
    );
    res.status(500).json({
      success: false,
      status: 500,
      message:
        "Internal server error occured while fetching converstaion history.",
    });
  }
};

const getMessageDetails = async (req, res) => {
  try {
    // Get the message details for the specified user
    const messages = await Message.find({
      $or: [{ sender: req.params.id }, { recipient: req.params.id }],
    }).sort({ createdAt: "desc" });

    // Send response to user
    res.status(200).json({
      success: true,
      status: 200,
      messages,
    });
  } catch (error) {
    console.log(
      `Internal server error occured while fetching converstaion history: ${err}`
    );
    res.status(500).json({
      success: false,
      status: 500,
      message:
        "Internal server error occured while fetching converstaion history.",
    });
  }
};

const deleteMessage = async (req, res) => {
  const messageId = req.params.id;

  try {
    const deletedMessage = await Message.findByIdAndDelete(messageId);
    if (!deletedMessage) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Message not found",
      });
    }
    res.json({
      success: true,
      status: 200,
      message: "Delete Success!",
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        status: 400,
        message: `Cast to ObjectId failed for value "${messageId}" at path "_id" for model "message"`,
      });
    }
    console.log(`Internal server error occured while deleting message: ${err}`);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Internal server error occured while deleting message.",
    });
  }
};

const deleteConversation = async (req, res) => {
  // Get conversation id from request params
  const conversationId = req.params.id;
  try {
    // Delete conversation from database
    const deletedConversation = await Conversation.findByIdAndDelete(
      conversationId
    );
    if (!deletedConversation) {
      res.status(200).json({
        success: false,
        status: 400,
        message: "Cannot read properties of null (reading '_id')!",
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "Delete Success!",
    });
  } catch (err) {
    console.log(
      `Internal server error occured while deleting conversation: ${err}`
    );
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error occured while deleting conversation.",
    });
  }
};

module.exports = {
  createMessage,
  getConversationHistory,
  getMessageDetails,
  deleteMessage,
  deleteConversation,
};
