import ApiRequest from "../http/ApiRequest";
import AuthService from "../service/AuthService";
import {useEffect, useMemo, useState} from "react";
import axiosErrorHandler from "../http/AxiosErrorHandler";

const useChatConversations = () => {
    const api = useMemo(() => new ApiRequest(), []);
    const autService = useMemo(() => new AuthService(),[]);
    const [userConversations, setUserConversations ]= useState([]);
    const [generalErrorList, setGeneralErrorList] = useState([]);

    //TODO fetch it from BE
    const userInfo = {
        firstName: 'fake',
        surName: 'One',
        imageUrl: 'https://miro.medium.com/max/1033/1*MAsNORFL89roPfIFMBnA4A.jpeg',
        chatName: 'johhnyy_baby',
        username: 'fakeOne',
    }


    useEffect(() => {
        // TODO remove getting username and Do it with Redux
        const username = autService.getUsername();
        api.getUserConversations(username)
            .then(res => {
                console.log(res)
                if(res.data) {
                    const conversation = res.data.map(c => (
                        {
                            username: c.username,
                            chatName: c.chatName,
                            firstName: c.firstName,
                            surName: c.surName,
                            imageUrl: c.imageUrl,
                            lastMessage: c.lastMessage,
                            lastMessageSenderUsername: c.lastMessageSenderUsername,
                            lastMessageTs: formatMessageTs(c.lastMessageTs),
                            status: c.status,
                        }
                    ));
                    setUserConversations(conversation);
                }
            })
            .catch(err => {
                const [errorList] = axiosErrorHandler(err);
                setGeneralErrorList(errorList);
            })
    }, [api, autService]);

    const formatMessageTs = messageTs => {
        if(messageTs) {
            // TODO format message ts
            return messageTs;
        }
    }

    return {
        userInfo,
        conversations: userConversations,
        generalErrorList,
    }
};

export default useChatConversations;
