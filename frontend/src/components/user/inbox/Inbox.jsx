import React, { useEffect, useRef, useState } from "react";
import "./inbox.scss";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import { backend__url } from "../../../Server";
import axios from "axios";
import { useNavigate } from "react-router";
import { RiArrowGoBackFill } from "react-icons/ri";
import { TfiGallery } from "react-icons/tfi";
import { VscSend } from "react-icons/vsc";
const ENDPOINT = "http://localhost:4000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const Inbox = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [conversation, setConversation] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [images, setImages] = useState();
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
      const response = await axios
      .get(`/api/v2/get-all-conversation-user/${user?._id}`, {
        withCredentials: true,
      })

      setConversation(response.data.conversation);
      } catch (error) {
        // console.log(error);
      }
    }
    getConversation();
  }, [user, messages]);

  useEffect(() => {
    if (user) {
      const sellerId = user?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  // get Message
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `/api/v2/get-all-messages/${currentChat?._id}`
        )
        setMessages(response.data.messages);
      } catch (error) {
        // console.log(error);
      }
    }
    getMessage();
  }, [currentChat]);

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user?._id
    );

    socketId.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (!newMessage !== "") {
        await axios
          .post(`/api/v2/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((err) => {
            // console.log(err);
          });
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user?._id,
    });

    await axios
      .put(`/api/v2/update-last-message/${currentChat?._id}`, {
        lastMessage: newMessage,
        lastMessageId: user?._id,
      })
      .then((res) => {
        setNewMessage("");
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImages(file);
    imageSendingHandler(file);
  };

  const imageSendingHandler = async (e) => {
    const formData = new FormData();

    formData.append("images", e);
    formData.append("sender", user?._id);
    formData.append("text", newMessage);
    formData.append("conversationId", currentChat?._id);

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socketId.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      images: e,
    });

    try {
      await axios
        .post(`/api/v2/create-new-message`, formData)
        .then((res) => {
          setImages();
          setMessages([...messages, res.data.message]);
          updateLastMessageForImage();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error?.response?.data?.error);
    }
  };

  // update last message
  const updateLastMessageForImage = async () => {
    await axios.put(`/api/v2/update-last-message/${currentChat._id}`, {
      lastMessage: "Photo",
      lastMessageId: user?._id,
    });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);

  return (
    <div className="user__inbox__container">
      <div className="container">
        <div className="inbox__main">
          {!open && (
            <div className="message__container">
              <div className="heading">
                <h2>All Messages</h2>
              </div>
              {conversation &&
                conversation.map((item, i) => (
                  <Message
                    data={item}
                    key={i}
                    index={i}
                    setOpen={setOpen}
                    setCurrentChat={setCurrentChat}
                    me={user?._id}
                    setUserData={setUserData}
                    userData={userData}
                    online={onlineCheck(item)}
                    activeStatus={activeStatus}
                    setActiveStatus={setActiveStatus}
                    loading={loading}
                  />
                ))}
            </div>
          )}
          {open && (
            <SellerInbox
              setOpen={setOpen}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessageHandler={sendMessageHandler}
              messages={messages}
              sellerId={user._id}
              userData={userData}
              activeStatus={activeStatus}
              scrollRef={scrollRef}
              handleImageUpload={handleImageUpload}
              images={images}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Message = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  userData,
  setUserData,
  online,
  activeStatus,
  setActiveStatus,
}) => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };

  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members.find((user) => user !== me);

    const getUser = async () => {
      try {
        const { data } = await axios.get(`/api/v2/get-shop-info/${userId}`);
        setUser(data.shop);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data]);

  return (
    <div
      className="message__box"
      onClick={() =>
        setActive(index) ||
        handleClick(data._id) ||
        setCurrentChat(data) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
    >
      <div className={`${active === index ? "message__row" : "message__row"}`}>
        <div className="imgBox">
          <img src={`${backend__url}/${user?.avatar}`} alt={user?.avatar} />
          {activeStatus && <div className="active"></div>}
        </div>
        <div className="name__message">
          <p>{user?.name}</p>
          <span>
            {data?.lastMessageId !== userData?._id
              ? "You:"
              : userData?.name.split(" ")[0] + ": "}{" "}
            {data?.lastMessage}
          </span>
        </div>
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  scrollRef,
  handleImageUpload,
  images,
}) => {
  return (
    <div className="seller__inbox__main">
      <div className="seller__inbox__column">
        <div className="seller__row">
          <div className="imgBox">
            <img src={`${backend__url}/${userData?.avatar}`} alt="raj" />
            {activeStatus && <div className="active"></div>}
          </div>
          <div className="name__message">
            <p>{userData?.name}</p>
            <span>{activeStatus ? "Active Now" : ""}</span>
          </div>
          <div className="back__icon">
            <RiArrowGoBackFill onClick={() => setOpen(false)} />
          </div>
        </div>

        <div className="messages__box">
          {messages &&
            messages.map((item, i) => (
              <div
                className={`${
                  item.sender === sellerId
                    ? "message__row row__2"
                    : "message__row"
                }`}
                key={i}
                ref={scrollRef}
              >
                <div className="message__content">
                  {item.images ? (
                    <img
                      src={`${backend__url}/${item.images}`}
                      alt={images + "raj"}
                    />
                  ) : (
                    <p>{item.text}</p>
                  )}
                </div>
                <div className="time__ago">
                <p>{format(item.createdAt)}</p>
                </div>
              </div>
            ))}
        </div>

        <div className="send__messages">
          <form onSubmit={sendMessageHandler}>
            <div className="input__box side__input">
              <label htmlFor="files">
                <TfiGallery size={23} />
              </label>
              <input type="file" id="files" onChange={handleImageUpload} />
            </div>
            <div className="input__box center__input">
              <input
                type="text"
                placeholder="type message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </div>
            <div className="input__box side__input">
              <label htmlFor="sends">
                <VscSend size={25} />
              </label>
              <input type="submit" id="sends" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
