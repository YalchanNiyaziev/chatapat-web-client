import {useEffect, useMemo, useRef, useState} from "react";
import ApiRequest from "../http/ApiRequest";
import AuthService from "../service/AuthService";
import axiosErrorHandler from "../http/AxiosErrorHandler";
import {useForm} from "react-hook-form";
import ValidatorService from "../service/ValidatorService";
import WebSocketCommunication from "../http/WebSocketCommunication";
import moment from "moment";

const useChatConversationHistory = (conversationId, selectedUser) => {

    const api = useMemo(() => new ApiRequest(), []);
    const autService = useMemo(() => new AuthService(), []);
    const validator = new ValidatorService();
    const webSocketCommunication = useMemo(() => new WebSocketCommunication(), []);
    const {register, handleSubmit, errors, setValue} = useForm();
    const [userConversations, setUserConversations] = useState([]);
    const [conversationMessages, setConversationMessages] = useState([]);
    const [conversationPartnerInfo, setConversationPartnerInfo] = useState(null);
    const [partnerStatusInfo, setPartnerStatusInfo] = useState(null);
    const [generalErrorList, setGeneralErrorList] = useState([]);
    const chatConversationBoxBottom = useRef(null);

    const textMessageReceiveHandler = (receivedMessage) => {
        console.log("receive Message@@@", receivedMessage);
        if (receivedMessage && receivedMessage.conversationId
            && receivedMessage.content && receivedMessage.type
            && receivedMessage.messageTs && receivedMessage.senderInfo
            && receivedMessage.senderInfo.username && receivedMessage.messageStatus) {
            console.log("You have passed first if");
            if (
                // conversationMessages && conversationMessages.length
                // &&
                receivedMessage.conversationId === conversationId) {
                const message = {
                    content: receivedMessage.content,
                    senderInfo: {
                        username: receivedMessage.senderInfo.username,
                    },
                    type: receivedMessage.type,
                    messageTs: formatMessageTs(receivedMessage.messageTs),
                    messageStatus: receivedMessage.messageStatus,
                };
                conversationMessages.push(message);
            } else {

                const filteredConversations = userConversations
                    .filter(c => c.conversationId === conversationId);

                switch (filteredConversations.length) {
                    case 0:
                        break;
                    case 1:
                        for (let i = 0; i < userConversations.length; i++) {
                            if (userConversations[i].conversationId === conversationId) {
                                userConversations[i].lastMessage = receivedMessage.content;
                                userConversations[i].lastMessageTs = receivedMessage.messageTs;
                                userConversations[i].messageStatus = receivedMessage.messageStatus;
                                userConversations[i].lastMessageSenderUsername = receivedMessage.senderInfo.username;
                                break;
                            }
                        }
                        break;
                    default:
                        // TODO load conversation from BE
                        break;
                }
                // case one if there is no started cpnversation yet
                // case two if there is already started conversation
            }
        }
    }

    useEffect(() => {
        console.log("YOU ARE IN USE EFFECT OF CHAT CONVERSATION")
        webSocketCommunication.initConnection(textMessageReceiveHandler);

        const username = autService.getUsername();
        api.getUserConversations(username)
            .then(res => {
                console.log(res)
                if (res.data) {
                    const conversation = res.data.map(c => (
                        {
                            conversationId: c.conversationId,
                            username: c.username,
                            chatName: c.chatName,
                            firstName: c.firstName,
                            surName: c.surName,
                            status: c.status,
                            imageUrl: c.imageUrl,
                            lastMessage: c.lastMessage,
                            lastMessageSenderUsername: c.lastMessageSenderUsername,
                            lastMessageTs: formatMessageTs(c.lastMessageTs),
                            messageStatus: c.messageStatus,
                        }
                    ));
                    setUserConversations(conversation);
                }
            })
            .catch(err => {
                const [errorList] = axiosErrorHandler(err);
                setGeneralErrorList(errorList);
            })

        if (conversationId && selectedUser) {
            api.searchChatUsersInfo({username: selectedUser})
                .then(res => {
                    console.log('selected partner info !', res);
                    if (res.data && res.data.length === 1) {
                        const selectedPartnerInfo =
                            {
                                id: res.data[0].id,
                                username: res.data[0].username,
                                chatName: res.data[0].chatName,
                                firstName: res.data[0].firstName,
                                lastname: res.data[0].lastname,
                                birthDate: res.data[0].birthDate,
                                gender: res.data[0].gender,
                                status: res.data[0].status,
                                picture: res.data[0].picture,
                                locked: res.data[0].locked,
                                closed: res.data[0].closed,
                                address: res.data[0].address,
                            }
                        setConversationPartnerInfo(selectedPartnerInfo);
                        setPartnerStatusInfo(validator.prepareUserStatus(res.data[0].status));
                    }
                })
                .catch(err => {
                    const [errorList] = axiosErrorHandler(err);
                    setGeneralErrorList(errorList);
                });

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
                        // chatConversationBoxBottom.current.scrollIntoView({
                        //     behavior: 'auto',
                        //     block: 'end',
                        //     inline: 'nearest'
                        // });
                    }
                })
                .catch(err => {
                    const [errorList] = axiosErrorHandler(err);
                    setGeneralErrorList(errorList);
                })
        }
    }, [api, conversationId, autService]);

    useEffect(() => {
        if (chatConversationBoxBottom && chatConversationBoxBottom.current) {
            chatConversationBoxBottom.current.scrollIntoView({
                behavior: 'auto',
                block: 'end',
                inline: 'nearest'
            });
        }
    });

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

    const textMessageSendHandler = formData => {
        console.log('$chatTextMessage', formData);
        if (formData && formData.chatTextMessage) {
            console.log("There is message sent");
            console.log("WS message Receiver name !!", conversationPartnerInfo.username);
            webSocketCommunication.sendTextMessage(formData.chatTextMessage, conversationPartnerInfo.username);
            setValue(`chatTextMessage`, '');
            const message = {
                content: formData.chatTextMessage,
                senderInfo: {
                    username: autService.getUsername()
                },
                type: validator.messageTypes.text,
                messageTs: formatMessageTs(moment()),
            };
            conversationMessages.push(message);


        } else {
            console.log("There is no chat message");
        }
    }

    const registerValidationFor = {
        chatTextMessage: () => register(),
    };

    const getConversationPartnerNames = partner => {
        if (!partner) {
            return;
        }
        if (partner.chatName) {
            return partner.chatName;
        }
        if (partner.firstName && partner.surName) {
            return `${partner.firstName} ${partner.surName}`;
        }
        return partner.username;
    }

    return {
        conversations: userConversations,
        messages: conversationMessages,
        partnerInfo: conversationPartnerInfo,
        statusInfo: partnerStatusInfo,
        bottomElement: chatConversationBoxBottom,
        generalErrorList,
        isConversationPartnerMessage,
        getConversationPartnerNames,
        registerValidationFor,
        fieldErrorFor: errors,
        onTextSend: handleSubmit(
            textMessageSendHandler,
            validator.extractErrorsFromInvalidForm(setGeneralErrorList)
        ),

    };

};

export default useChatConversationHistory;