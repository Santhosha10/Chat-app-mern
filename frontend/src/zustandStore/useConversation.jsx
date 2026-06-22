import {create} from 'zustand';

const useConversation = create((set)=>({
    selectedConversation:null,
    setSelectedConversation :(selectedConversation)=> set((state)=>({
        selectedConversation,
        messageSearch:"",
        unreadByConversation:selectedConversation?._id
            ? {...state.unreadByConversation,[selectedConversation._id]:0}
            : state.unreadByConversation
    })),
    messages:[],
    setMessages: (messages) =>set({messages}),
    updateMessage:(updatedMessage)=> set((state)=>({
        messages:state.messages.map((message)=>
            message._id === updatedMessage._id ? updatedMessage : message
        )
    })),
    unreadByConversation:{},
    incrementUnread:(conversationId)=> set((state)=>({
        unreadByConversation:{
            ...state.unreadByConversation,
            [conversationId]:(state.unreadByConversation[conversationId] || 0) + 1
        }
    })),
    clearUnread:(conversationId)=> set((state)=>({
        unreadByConversation:{
            ...state.unreadByConversation,
            [conversationId]:0
        }
    })),
    typingByUser:{},
    setUserTyping:(userId,isTyping)=> set((state)=>({
        typingByUser:{
            ...state.typingByUser,
            [userId]:isTyping
        }
    })),
    messageSearch:"",
    setMessageSearch:(messageSearch)=> set({messageSearch})
}))

export default useConversation
