import {useEffect, useMemo, useState} from "react";
import ApiRequest from "../http/ApiRequest";
import AuthService from "../service/AuthService";
import axiosErrorHandler from "../http/AxiosErrorHandler";

const useChatConversationHistory = conversationId => {

    const api = useMemo(() => new ApiRequest(), []);
    const autService = useMemo(() => new AuthService(), []);
    const [conversationMessages, setConversationMessages] = useState([]);
    const [generalErrorList, setGeneralErrorList] = useState([]);

    useEffect(() => {
        if (conversationId) {
            api.getChatHistory(conversationId)
                .then(res => {
                    console.log('messages !', res);
                    if (res.data) {
                        const conversationMessages = res.data.map(m => (
                            {
                                content: m.content,
                                senderInfo: m.senderInfo,
                                type: m.type,
                                messageTs: formatMessageTs(m.messageTs),
                            }
                        ));
                        setConversationMessages(conversationMessages);
                    }
                })
                .catch(err => {
                    const [errorList] = axiosErrorHandler(err);
                    setGeneralErrorList(errorList);
                })
        }
    }, [api, conversationId]);

    //TODO move it to more generic place
    const formatMessageTs = messageTs => {
        if (messageTs) {
            // TODO format message ts
            return messageTs;
        }
    };

    const isConversationPartnerMessage = message => {
        if (!message && !message.senderInfo) {
            return;
        }
        return message.senderInfo.username !== autService.getUsername();

    }

    return {
        messages: conversationMessages,
        generalErrorList,
        isConversationPartnerMessage,
    };

};

export default useChatConversationHistory;