import React, {useEffect, useState} from "react";
import "./mainInterface.css";
import chatIcon from '../../assets/chatIcon.png';
import dynamicIcon from "../../assets/dynamicIcon.png";
import playIcon from "../../assets/playIcon.png";
import userDefaultIcon from "../../assets/userDefaultImg.png"
import {getChatGroupName} from "../../util/mainInterface";
import chatRoom from "../chatRoom/chatRoom";
import ChatRoom from "../chatRoom/chatRoom";

/**
 * @description 主界面
 * @constructor
 */

interface getGroupResult {
    _id: string,
    name: string,
    createTime: string
}

function MainInterface() {
    const [chatAppear, setChatAppear] = useState(0);
    const [chatRoomAppear, setChatRoomAppear] = useState(-1);
    const chatIconClass: string = chatAppear == 1 ? 'chatIcon IconActive' : 'chatIcon';
    const dynamicIconClass: string = chatAppear == 2 ? 'dynamicIcon IconActive' : 'dynamicIcon';
    const playIconClass: string = chatAppear == 3 ? 'playIcon IconActive' : 'playIcon';
    const AListOfPeopleToChatWithAppear: string = chatAppear == 1 ? 'AListOfPeopleToChatWith' : '';
    async function getChatGroup() {
        return await getChatGroupName();
    }
    const [chatGroup, setChatGroup] = useState<getGroupResult[]>([]);
    useEffect(() => {
        let isMounted: boolean = true;
        getChatGroup().then((data) => {
            if(isMounted) {
                setChatGroup(data);
            }
        }).catch((error) => {
            console.error(error);
            if(isMounted) {
                setChatGroup([]);
            }
        });
        return () => {
            isMounted = false;
        }
    }, []);
    function onClickIcon(state: number):void {
        if(chatAppear == state) {
            setChatAppear(0);
            return;
        }
        setChatAppear(state);
    }
    function onClickChat(): void {
        onClickIcon(1);
    }
    function onClickDynamic(): void {
        onClickIcon(2);
    }
    function onClickPlay(): void {
        onClickIcon(3);
    }
    const [chatGroupName, setChatGroupName] = useState('');
    function onClickChatElement(name: string, index: number): void {
        setChatRoomAppear(index);
        setChatGroupName(name);
    }
    return (
        <>
            <div className="mainInterfaceBackDrop">
                <div className="mainInterfaceTop">
                    <div className="topMainIcon">InstantCommunicate</div>
                </div>
                <div className="mainInterfaceAside">
                    <div className="asideIcon">
                        <div className="userImgIconBackDrop">
                            <img alt="userDefaultIcon" src={userDefaultIcon} className="userImgIcon"></img>
                            <div className="theUserIsOnlineIcon"></div>
                        </div>
                        <img alt="chatIcon" src={chatIcon} className={chatIconClass} onClick={onClickChat} />
                        <img alt="dynamicIcon" src={dynamicIcon} className={dynamicIconClass} onClick={onClickDynamic} />
                        <img alt="playIcon" src={playIcon} className={playIconClass} onClick={onClickPlay} />
                    </div>
                    <div className={AListOfPeopleToChatWithAppear}>
                        {chatGroup.map((item: getGroupResult, index: number) => (
                            <div key={index} className={chatRoomAppear == index ? 'AListOfPeopleToChatWithElement AListOfPeopleToChatWithElementActive' : 'AListOfPeopleToChatWithElement'} onClick={() => onClickChatElement(item.name, index)} >{item.name}</div>
                        ))}
                    </div>
                </div>
                <ChatRoom data={chatGroupName} />
            </div>
        </>
    )
}

export default MainInterface;