import React, {useEffect, useState} from "react";
import "./mainInterface.css";
import chatIcon from '../../assets/chatIcon.png';
import dynamicIcon from "../../assets/dynamicIcon.png";
import playIcon from "../../assets/playIcon.png";
import userDefaultIcon from "../../assets/userDefaultImg.png";
import {getChatGroupName} from "../../util/mainInterface";
// import chatRoom from "../chatRoom/chatRoom";
import ChatRoom from "../chatRoom/chatRoom";
import {addGroupName, deleteGroupChat} from "../../util/login";
import QQNews from "../QQNews/QQNews";

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
    const [isAppear, setIsAppear] = useState(false);
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
    }, [getChatGroup()]);
    function onClickIcon(state: number):void {
        if(chatAppear == state) {
            setChatAppear(0);
            return;
        }
        setChatAppear(state);
    }
    function onClickChat(): void {
        onClickIcon(1);
        setIsAppear(false);
    }
    function onClickDynamic(): void {
        onClickIcon(2);
        if(!isAppear) {
            setIsAppear(true);
        } else {
            setIsAppear(false);
        }
    }
    function onClickPlay(): void {
        onClickIcon(3);
        setIsAppear(false);
    }
    const [chatGroupName, setChatGroupName] = useState('');
    function onClickChatElement(name: string, index: number): void {
        setChatRoomAppear(index);
        setChatGroupName(name);
    }
    function onClickDeleteGroupChat(groupName: string): void {
        deleteGroupChat(groupName).then();
    }
    const [addAppear, setAppAppear] = useState(false);
    const [inputAddValue, setInputValue] = useState('');
    function onClickAddGroupDiv() {
        setAppAppear(true);
    }
    function handleAddChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setInputValue(e.target.value);
    }
    function onClickDeleteAddGroupDiv() {
        setAppAppear(false);
        setInputValue('');
    }
    function onClickAddGroupChat(groupName: string): void {
        addGroupName({groupName}).then();
        onClickDeleteAddGroupDiv();
     }
    return (
        <>
            <div className="mainInterfaceBackDrop">
                <div className={ addAppear ? 'addGroupDiv open' : 'addGroupDiv'}>
                    <div className="modal-content">
                        <div className="modal-header">
                            增加群聊
                        </div>
                        <form className="modal-form">
                            <label htmlFor="inputData">输入群名:</label>
                            <input type="text" name="inputData" placeholder="请输入群名" value={inputAddValue} onChange={handleAddChange}/>
                        </form>
                        <div className="modal-buttons">
                            <button type="button" className="cancel-button" onClick={onClickDeleteAddGroupDiv}>取消</button>
                            <button type="button" className="confirm-button" onClick={() => onClickAddGroupChat(inputAddValue)}>确认</button>
                        </div>
                    </div>
                </div>
                <div className="mainInterfaceTop">
                    <div className="topMainIcon">InstantCommunicate</div>
                </div>
                <div className="mainInterfaceAside">
                    <div className="asideIcon">
                        <div className="userImgIconBackDrop">
                            <img alt="userDefaultIcon" src={userDefaultIcon} className="userImgIcon"></img>
                            <div className="theUserIsOnlineIcon"></div>
                        </div>
                        <img alt="chatIcon" src={chatIcon} className={chatIconClass} onClick={onClickChat}/>
                        <img alt="dynamicIcon" src={dynamicIcon} className={dynamicIconClass} onClick={onClickDynamic} />
                        <img alt="playIcon" src={playIcon} className={playIconClass} onClick={onClickPlay} />
                    </div>
                    <div></div>
                    <div className={AListOfPeopleToChatWithAppear}>
                        <button className="addGroupButton" onClick={onClickAddGroupDiv}>增加群聊</button>
                        {chatGroup.map((item: getGroupResult, index: number) => (
                            <div key={index} className={chatRoomAppear == index ? 'AListOfPeopleToChatWithElement AListOfPeopleToChatWithElementActive' : 'AListOfPeopleToChatWithElement'} onClick={() => onClickChatElement(item.name, index)}>
                                {item.name}
                                <button className="deleteAGroupChat" onClick={() => onClickDeleteGroupChat(item.name)}>不聊了</button>
                            </div>
                        ))}
                    </div>
                </div>
                <ChatRoom data={chatGroupName} />
                <QQNews is={isAppear} />
            </div>
        </>
    )
}

export default MainInterface;