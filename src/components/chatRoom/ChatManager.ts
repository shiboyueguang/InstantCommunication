/**
 * @description 聊天成员
 */
export class ChatManager {
    private static instance: ChatManager;
    private chats: Map<string, string[]> = new Map();

    private constructor() {}

    public static getInstance(): ChatManager {
        if (!ChatManager.instance) {
            ChatManager.instance = new ChatManager();
        }
        return ChatManager.instance;
    }

    public getChat(groupId: string): string[] {
        if (!this.chats.has(groupId)) {
            this.chats.set(groupId, []);
        }
        return this.chats.get(groupId)!;
    }

    public addMessage(groupId: string, message: string): void {
        const chat = this.getChat(groupId);
        chat.push(message);
        this.chats.set(groupId, chat);
    }
}