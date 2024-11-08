import React, {useEffect, useState} from "react";
import "./chatRoom.css";
import io from 'socket.io-client';
import {getUserName} from "../../util/login";
import {ChatManager} from "./ChatManager";

const socket = io('http://localhost:3000');

/**
 * @description 聊天室窗口组件
 * @constructor
 */

function ChatRoom(props: { data: any; }) {
    const [message, setMessage] = useState('');
    // const [messageValue, setMessageValue] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [userName, setUserName] = useState('');
    const [room, setRoom] = useState('');
    // const [a, setA] = useState(0);

    useEffect(() => {
        getUserName().then(res => {
            console.log(res);
            setUserName(res?.userName);
        })
    }, []);
    // const [updatedMessages, setUpdatedMessages] = useState<string[]>([]);
    useEffect(() => {
        socket.on('chat message', (data) => {
            // setMessages([...messages, msg]);
            // const chatManager = ChatManager.getInstance();
            // chatManager.addMessage(data.room, `${data.userName}: ${data.message}`);
            // setA(data.userName)
            // setMessages(chatManager.getChat(data.room));
            // setUpdatedMessages(chatManager.getChat(data.room));
            // console.log('Received message:', `${data.userName}: ${data.message}`);
            // console.log('Updated messages:', updatedMessages);
            // setMessages(updatedMessages);
            // setA(0);
            setMessages(prevMessages => [...prevMessages, `${data.userName} : ${data.message}`]);
        });
        return () => {
            socket.off('chat message');
        };
    }, []);
    const joinRoom = () => {
        setRoom(props.data);
    };
    useEffect(() => {
        // const chatManager = ChatManager.getInstance();
        // setMessages(chatManager.getChat(room));
        // socket.emit('join room', room);
        // console.log(room)
        const loadMessages =  () => {
            // const chatManager = ChatManager.getInstance();
            // console.log(chatManager.getChat(room));
            // const messages = chatManager.getChat(room);
            setMessages(messages);
        };

        if (room) {
            loadMessages();
            socket.emit('join room', room);
        }
    }, [room]);
    useEffect(() => {
        joinRoom();
    }, [props.data]);
    const sendMessage = (event: React.FormEvent) => {
        event.preventDefault();
        // setMessage(userName + ':' + messageValue);
        if (message && room && userName) {
            // setA(1);
            // const chatManager = ChatManager.getInstance();
            // chatManager.addMessage(room, `${userName} : ${message}`);
            // setMessages(chatManager.getChat(room));
            socket.emit('chat message', { room, userName, message });
            setMessage('');
        }
    };
    const chatManagerH = ChatManager.getInstance();
    useEffect(() => {
        setMessages(chatManagerH.getChat(room));
    }, [chatManagerH.getChat(room)]);
    return (
        <>
            <div className={props.data ? 'chatRoomBackDrop' : 'chatRoomBackDrop chatRoomBackDropActive'}>
                <div className="chatRoomBackDropLitter">
                    <div className="chatMessages">
                        <ul className="chatMessage">
                            {messages.map((msg, index) => (
                                <li key={index}>{msg}</li>
                            ))}
                        </ul>
                    </div>
                    <form onSubmit={sendMessage} className="chatDiv">
                        <textarea
                            className="chatInput"
                            autoComplete="off"
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                                // setMessageValue(`${userName}: ${e.target.value}`);
                            }}
                        />
                        <button type="submit" className="chatSend">发送</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChatRoom;