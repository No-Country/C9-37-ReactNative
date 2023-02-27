import { ScrollView, KeyboardAvoidingView } from "react-native";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import { useState, useEffect, useRef } from "react";
import ChatMessages from "../components/ChatMessages";
import { useSelector } from "react-redux";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { firebaseDb as db } from "../firebase";

const Message = ({ route }) => {

  const receiver = route.params.user
  const scrollView = useRef();
  const { currentUser } = useSelector(state => state.users);
  const [chatMessage, setChatMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const user = currentUser?.data;
  const userID = user? (user?.id).toString() : undefined;
  const receiverID = (receiver?.id).toString();

  useEffect(() => {
    if (receiver) {
    const unsub = onSnapshot(
      query(
      collection(
        db,
        "users",
        userID,
        "chatusers",
        receiverID,
        "messages"
      ),
      orderBy("timestamp")
      ),
      (snapshot) => {
      setAllMessages(
        snapshot.docs.map((doc) => ({
        id: doc.id,
        messages: doc.data(),
        }))
      );
      }
    );
    return unsub;
    }
  }, [receiverID]);

  const sendMessage = async () => {
    try {
    if (user && receiver) {
      await addDoc(
      collection(
        db,
        "users",
        userID,
        "chatusers",
        receiverID,
        "messages"
      ),
      {
        username: user.name+" "+user.surname,
        messageUserId: userID,
        messageReceiverId: receiverID,
        message: chatMessage,
        timestamp: new Date(),
      }
      );
  
      await addDoc(
      collection(
        db,
        "users",
        receiverID,
        "chatusers",
        userID,
        "messages"
      ),
      {
        username: user.name+" "+user.surname,
        messageUserId: userID,
        messageReceiverId: receiverID,
        message: chatMessage,
        timestamp: new Date(),
      }
      );
    }
    } catch (error) {
    console.log(error);
    }
    setChatMessage("");
  };

  return (
    <>
      <KeyboardAvoidingView
        className="pb-6 h-full justify-center mb-3"
        behavior="padding"
        style={{ flex: 1 }}
      >
        <ChatHeader user={receiver} />
        <ScrollView
          className="h-full flex-1"
          ref={scrollView}
          onLayout={() => {
            scrollView.current.scrollToEnd({ animated: true });
          }}
          onContentSizeChange={() => {
            scrollView.current.scrollToEnd({ animated: true });
          }}
        >
          <ChatMessages allMessages={allMessages} />
        </ScrollView>

        <ChatInput
          message={chatMessage}
          setMessage={setChatMessage}
          handleSubmit={sendMessage}
        />
      </KeyboardAvoidingView>
    </>
  );
};

export default Message;
