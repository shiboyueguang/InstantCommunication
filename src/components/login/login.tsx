import React, {CSSProperties, useState} from "react";
import "./login.css"
import "../../assets/reset.css"
// import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "../ErrorMessage/ErrorMessage.css"
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import {toLogin} from "../../util/login";
import {setSuccess, setToken} from "../../store/counter/loginSlice";
import {useNavigate} from "react-router-dom";

/**
 * @description 登录页面
 * @constructor
 */

const Login: React.FC = () => {
    const [isAppear, setAppear] = useState(false);
    // const [isErrorVisible, setIsErrorVisible] = useState(false);
    const [accountLogin, setAccountLogin] = useState<string>('');
    const [passwordLogin, setPasswordLogin] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector((state: RootState) => state.login.token);
    const [errorAppear, setErrorAppear] = useState(false);
    const navigate = useNavigate();
    const loginData = {
        userName: accountLogin,
        password: passwordLogin
    };
    const loginAccountHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountLogin(event.target.value);
    };
    const loginPasswordHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordLogin(event.target.value);
    };
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
        let newAppear: boolean = false;
        if(!token) {
            newAppear = true;
        }
        setAppear(newAppear);
        setTimeout((): void => {  // 此处要使用单例和关闭计时器操作，我小菜鸡不太会，请大佬萌指教
            const newAppear: boolean = false;
            setAppear(newAppear);
        }, 1000);
    }
    const [errorMessage, setErrorMessage] = useState('');
    const usernamePattern = /^[a-zA-Z0-9_]{3,15}$/; // 3到15个字母数字下划线
    const passwordPattern = /^.{8,}$/; // 至少8个字符
    function onLogin() {
        if(!usernamePattern.test(loginData.userName)) {
            setErrorMessage('用户名无效。用户名必须为3到15个字母、数字或下划线。');
            setErrorAppear(true);
            setTimeout(() => {
                setErrorAppear(false);
            }, 2000);
            return;
        }
        if(!passwordPattern.test(loginData.password)) {
            setErrorMessage('密码无效。密码至少8个字符。');
            setErrorAppear(true);
            setTimeout(() => {
                setErrorAppear(false);
            }, 2000);
            return;
        }
        toLogin(loginData)
            .then(response => {
                setSuccess(response.success);
                if(response.code === 200) {
                    dispatch(setToken(response.token));
                    navigate('/work');
                } else {
                    setErrorMessage(response.token);
                    setErrorAppear(true);
                    setTimeout(() => {
                        setErrorAppear(false);
                    }, 2000);
                }
            })
            .catch(error => {
                console.error('登录失败' + error);
            })
        // setIsErrorVisible(true);
        // setTimeout(() => setIsErrorVisible(false), 3000);
    }
    return (
        <>
            {/*登录大背景*/}
            <div className="loginBackDrop">
                {/*错误信息(废除)*/}
                {/*<ErrorMessage message={<span>账号或密码错误</span>} classNames="alert" timeout={3000} in={isErrorVisible} />*/}
                {/*错误信息*/}
                <div className={`loginMistakeDivContainer ${errorAppear ? 'loginMistakeDivAppear' : ''}`}>
                    <span className="material-icons loginMistakeDivIcon">error_outline</span>
                    <span>{ errorMessage }</span>
                    <button className="loginMistakeDivCloseBtn" aria-label="关闭">×</button>
                </div>
                {/*登录背景*/}
                <div className="loginMiddleBackDrop">
                    <div className="loginMiddleBackDropDiv">
                        {/*头像*/}
                        <div className="personalAvatar"></div>
                        {/*账号*/}
                        <div className="personalAccount">
                            <input className="personalAccountInput" placeholder="请输入账号" value={accountLogin}
                                   onChange={loginAccountHandleChange}/>
                        </div>
                        {/*密码*/}
                        <div className="personalPassword">
                            <input className="personalPasswordInput" placeholder="请输入密码" value={passwordLogin}
                                   onChange={loginPasswordHandleChange} type="password" />
                        </div>
                        {/*登录*/}
                        <button className="loginButton" onClick={onLogin}>登录</button>
                        {/*注册*/}
                        <span className="registeredButtonMore" onClick={onRegister}>更多选项</span>
                        <button style={registeredButton}>注册</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;