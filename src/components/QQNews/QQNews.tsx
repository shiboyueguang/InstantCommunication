import React, {useEffect, useRef, useState} from 'react'
import './QQNews.css'
import {getUserName} from "../../util/login";
import {addDynamic, getDynamic, removeDynamic} from "../../util/mainInterface";

interface QQNewsProps {
    is?: boolean
}

/**
 * 动态组件
 */

interface DynamicPost {
    _id: string;
    userName: string;
    content: string;
    timestamp: string;
}

function QQNews({is}: QQNewsProps) {
    const [userName, setUserName] = useState('');
    useEffect(() => {
        getUserName().then(res => {
            console.log(res);
            setUserName(res?.userName);
        })
        console.log(userName)
    }, []);
    // 动态列表状态
    const [posts, setPosts] = useState<DynamicPost[]>([]);
    // 表单输入状态
    const [inputContent, setInputContent] = useState<string>('');
    // 引用动态列表容器
    const postsContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        getDynamic().then(res => {
            setPosts(res);
        })
    }, [posts])
    function hashCode(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0; // 转换为32位整数
        }
        return hash;
    }

    function combineAndHash(str1: string, str2: string): number {
        const combined = str1 + str2;
        return hashCode(combined);
    }
    // 处理表单提交
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputContent.trim() === '') return;
        await addDynamic({
            id: combineAndHash(userName, inputContent),
            userName,
            content: inputContent
        });
        await getDynamic().then(res => {
            setPosts(res);
        })
        setInputContent('');
        // 自动滚动到最新动态
        if (postsContainerRef.current) {
            postsContainerRef.current.scrollTop = postsContainerRef.current.scrollHeight;
        }
    };

    // 处理删除动态
    const handleDelete = async (id: string) => {
        console.log(id)
        await removeDynamic(id).then();
        await getDynamic().then(res => {
            setPosts(res);
        })
    };
    return (
        <>
            <div className={is ? 'QQNewsBackDrop' : 'QQNewsBackDropD'}>
                <div className="container">
                    <h1>发表动态</h1>
                    <form onSubmit={handleSubmit} className="publish-form">
                    <textarea
                        className="publish-input"
                        value={inputContent}
                        onChange={(event) => setInputContent(event.target.value)}
                        placeholder="分享你的想法..."
                    />
                        <div className="button-container">
                            <button type="submit" className="submit-button">发表</button>
                        </div>
                    </form>
                    <div className="posts-container" ref={postsContainerRef}>
                        {posts.map(post => (
                            <div key={post._id} className="post-card">
                                <div className="post-header">
                                    <div>
                                        <div className="user-name">{post.userName}</div>
                                        <div className="timestamp">{post.timestamp}</div>
                                    </div>
                                </div>
                                <div className="post-content">{post.content}</div>
                                <div className="post-actions">
                                    <button onClick={() => handleDelete(post._id)} className="delete-button">
                                        删除
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default QQNews;