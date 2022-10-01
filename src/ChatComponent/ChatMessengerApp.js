import React from 'react'
import { MessengerChat } from "react-messenger-chat-plugin";

const ChatMessengerApp = () => {
  return (
    <MessengerChat 
        pageId={"102722835944175"}
        language={"vi_VN"}
        themeColor={"#000000"}
        loggedInGreeting="loggedInGreeting"
        loggedOutGreeting="loggedOutGreeting"
        greetingDialogDisplay={"show"}
        debugMode={false}
        onMessengerShow={() => {
        console.log("onMessengerShow");
        }}
        onMessengerHide={() => {
        console.log("onMessengerHide");
        }}
        onMessengerDialogShow={() => {
        console.log("onMessengerDialogShow");
        }}
        onMessengerDialogHide={() => {
        console.log("onMessengerDialogHide");
        }}
        onMessengerMounted={() => {
        console.log("onMessengerMounted");
        }}
        onMessengerLoad={() => {
        console.log("onMessengerLoad");
        }}
    />
  )
}

export default ChatMessengerApp