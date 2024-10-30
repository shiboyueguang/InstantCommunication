import React, {CSSProperties, useState} from "react";
import "./login.css"
import "../../assets/reset.css"
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "../ErrorMessage/ErrorMessage.css"

/**
 * @description 登录页面
 * @constructor
 */

const Login: React.FC = () => {
    const [isAppear, setAppear] = useState(false);
    // 注册样式
    let registeredButton: CSSProperties= {
        width: '20%',
        height: '8%',
        border: 'none',
        background: 'white',
        color: 'black',
        fontSize: '12px',
        borderRadius: '5px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        position: 'absolute',
        top: '81%',
        left: '40%',
        display: isAppear ? 'block' : 'none',
    };
    // 注册出现点击事件
    function onRegister(): void {
        const newAppear: boolean = true;
        setAppear(newAppear);
        let appearClose = setTimeout((): void => {  // 此处要使用单例和关闭计时器操作，我小菜鸡不太会，请大佬萌指教
            const newAppear: boolean = false;
            setAppear(newAppear);
        }, 1000);
    }
    function onLogin() {
        setIsErrorVisible(true);
        setTimeout(() => setIsErrorVisible(false), 3000);
    }
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    return (
        <>
            {/*登录大背景*/}
            <div className="loginBackDrop">
                {/*错误信息*/}
                <ErrorMessage message={<span>账号或密码错误</span>} classNames="alert" timeout={3000} in={isErrorVisible} />
                {/*登录背景*/}
                <div className="loginMiddleBackDrop">
                    <div className="loginMiddleBackDropDiv">
                        {/*头像*/}
                        <div className="personalAvatar"></div>
                        {/*账号*/}
                        <div className="personalAccount">
                            <input className="personalAccountInput" placeholder="请输入账号" />
                        </div>
                        {/*密码*/}
                        <div className="personalPassword">
                            <input className="personalPasswordInput" placeholder="请输入密码" />
                        </div>
                        {/*登录*/}
                        <button className="loginButton" onClick={ onLogin }>登录</button>
                        {/*注册*/}
                        <span className="registeredButtonMore" onClick={ onRegister }>更多选项</span>
                        <button style={ registeredButton }>注册</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;