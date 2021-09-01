import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import ApiRequest from "../http/ApiRequest";
import AuthService from "../service/AuthService";
import axiosErrorHandler from "../http/AxiosErrorHandler";
import {useForm} from "react-hook-form";
import ValidatorService from "../service/ValidatorService";
// import WebSocketCommunication from "../http/WebSocketCommunication";
import moment from "moment";
import {useParams} from "react-router-dom";
import useWebSocketConnection from "./useWebSocketConnection";

const useChatConversationHistory = () => {

    const api = useMemo(() => new ApiRequest(), []);
    const autService = useMemo(() => new AuthService(), []);
    const validator = useMemo( () => new ValidatorService(), []);
    // const webSocketCommunication = useMemo(() => new WebSocketCommunication(), []);
    const {register, handleSubmit, errors, setValue} = useForm();
    const [userConversations, setUserConversations] = useState([]);
    const [conversationMessages, setConversationMessages] = useState([]);
    const [conversationPartnerInfo, setConversationPartnerInfo] = useState(null);
    const [partnerStatusInfo, setPartnerStatusInfo] = useState(null);
    const [generalErrorList, setGeneralErrorList] = useState([]);
    const chatConversationBoxBottom = useRef(null);
    const {conversationId, selectedUser} = useParams()
    const [isConversationSelected, setConversationSelected] = useState(false);

    //TODO move it to more generic place
    const formatMessageTs = useCallback(messageTs => {
        if (messageTs) {
            // TODO format message ts
            return messageTs;
        }
    }, []);

    const textMessageReceiveHandler = (receivedMessage) => {
        console.log("receive Message@@@", receivedMessage);
        console.log(receivedMessage.conversationId);
        console.log(receivedMessage.content);
        const activeConvId= autService.getSelectedConversationId();
        if (receivedMessage && receivedMessage.conversationId
            && receivedMessage.content && receivedMessage.type
            && receivedMessage.messageTs && receivedMessage.senderInfo
            && receivedMessage.senderInfo.username && receivedMessage.messageStatus) {
            console.log("You have passed first if");
            console.log("COnversation iD from params request", activeConvId);
            if (
                // conversationMessages && conversationMessages.length
                // &&
                receivedMessage.conversationId === parseInt(activeConvId)) {
                console.log("You are on active conversation")
                const message = {
                    content: receivedMessage.content,
                    senderInfo: {
                        username: receivedMessage.senderInfo.username,
                    },
                    type: receivedMessage.type,
                    messageTs: formatMessageTs(receivedMessage.messageTs),
                    messageStatus: receivedMessage.messageStatus,
                };
                console.log("MESSAGES", conversationMessages)
                setConversationMessages(oldMessages => [...oldMessages, message]);
            } else {
                console.log("Not active conversation")

                // getUserConversations();

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
                    });

                // const filteredConversations = userConversations
                //     .filter(c => c.conversationId === receivedMessage.conversationId);
                // console.log("User conversations ", userConversations);
                // console.log("Filter count ", filteredConversations.length);
                // switch (filteredConversations.length) {
                //     case 0:
                //         break;
                //     case 1:
                //         const updatedConversations = [];
                //         for (let i = 0; i < userConversations.length; i++) {
                //             const conversation = userConversations[i];
                //             if (conversation.conversationId === receivedMessage.conversationId) {
                //                 conversation.lastMessage = receivedMessage.content;
                //                 conversation.lastMessageTs = receivedMessage.messageTs;
                //                 conversation.messageStatus = receivedMessage.messageStatus;
                //                 conversation.lastMessageSenderUsername = receivedMessage.senderInfo.username;
                //                 // break;
                //             }
                //             updatedConversations.push(conversation);
                //         }
                //         setUserConversations(updatedConversations);
                //         break;
                //     default:
                //         // TODO load conversation from BE
                //         break;
                // }
                // case one if there is no started cpnversation yet
                // case two if there is already started conversation
            }
        }
    };

    const {sendTextMessage, disconnect} = useWebSocketConnection({onMessageReceiveEventHandler: textMessageReceiveHandler});


    const getUserConversations = useCallback( () => {
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
            });
    }, [autService, api, formatMessageTs]);

    const getChatHistory= useCallback(() => {
        if (conversationId && selectedUser) {
            console.log('selected conversation id', conversationId);
            console.log('selected username', selectedUser);
            autService.storeSelectedConversationId(conversationId);
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
                        setConversationSelected(true);
                    }
                })
                .catch(err => {
                    const [errorList] = axiosErrorHandler(err);
                    setGeneralErrorList(errorList);
                })
        }
    }, [api, validator,autService, conversationId, selectedUser, formatMessageTs]);


    useEffect(() => {
        console.log("YOU ARE IN USE EFFECT OF CHAT CONVERSATION")
        // webSocketCommunication.initConnection(textMessageReceiveHandler);

        getUserConversations();
        getChatHistory();

    }, [
        // webSocketCommunication,
        // textMessageReceiveHandler,
        getUserConversations, getChatHistory]);


    useEffect(() => {
        if (chatConversationBoxBottom && chatConversationBoxBottom.current) {
            chatConversationBoxBottom.current.scrollIntoView({
                behavior: 'auto',
                block: 'end',
                inline: 'nearest'
            });
        }
    });



    const isConversationPartnerMessage = message => {
        if (!message && !message.senderInfo) {
            return;
        }
        return message.senderInfo.username !== autService.getUsername();
    }

    const textMessageSendHandler = formData => {
        console.log("MESSAGES", conversationMessages)

        console.log("COnversation iD From URL", conversationId);
        console.log('$chatTextMessage', formData);
        if (formData && formData.chatTextMessage) {
            console.log("There is message sent");
            console.log("WS message Receiver name !!", conversationPartnerInfo.username);
            sendTextMessage(formData.chatTextMessage, conversationPartnerInfo.username);
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
        isConversationSelected,
        isConversationPartnerMessage,
        getConversationPartnerNames,
        registerValidationFor,
        fieldErrorFor: errors,
        onTextSend: handleSubmit(
            textMessageSendHandler,
            validator.extractErrorsFromInvalidForm(setGeneralErrorList)
        ),
        disconnect,

    };

};

export default useChatConversationHistory;