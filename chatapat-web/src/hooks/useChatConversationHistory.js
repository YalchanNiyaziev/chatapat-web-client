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
    const validator = useMemo(() => new ValidatorService(), []);
    // const webSocketCommunication = useMemo(() => new WebSocketCommunication(), []);
    const {register, handleSubmit, errors, setValue} = useForm();
    const [userConversations, setUserConversations] = useState([]);
    const [blockedConnections, setBlockedConnections] = useState([]);
    const [userConnections, setUserConnections] = useState([]);
    const [awaitingConnections, setAwaitingConnections] = useState([]);
    const [conversationMessages, setConversationMessages] = useState([]);
    const [conversationPartnerInfo, setConversationPartnerInfo] = useState(null);
    const [partnerStatusInfo, setPartnerStatusInfo] = useState(null);
    const [generalErrorList, setGeneralErrorList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const chatConversationBoxBottom = useRef(null);
    const {conversationId, selectedUser} = useParams()
    const [isConversationSelected, setConversationSelected] = useState(false);
    const [visibleConnectionDialog, setVisibleConnectionDialog] = useState(false);

    const selectedDisplayItemsTypes = useMemo(() => ({
        conversations: 'CONVERSATIONS',
        blocks: 'BLOCKED_CONNECTIONS',
        awaiting: 'AWAITING_FOR_REVIEW_CONNECTIONS_REQUESTS',
        connections: 'ACTIVE_CONNECTIONS',
    }), []);

    // const selectedDisplayItemsTypes = {
    //     conversations: 'CONVERSATIONS',
    //     blocks: 'BLOCKED_CONNECTIONS',
    //     awaiting: 'AWAITING_FOR_REVIEW_CONNECTIONS_REQUESTS',
    //     connections: 'ACTIVE_CONNECTIONS',
    // };


    const [typeSidebarItems, setTypeSidebarItems] = useState(selectedDisplayItemsTypes.conversations);

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
        const activeConvId = autService.getSelectedConversationId();
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

    const {
        sendTextMessage,
        disconnect
    } = useWebSocketConnection({onMessageReceiveEventHandler: textMessageReceiveHandler});


    const getUserConversations = useCallback(() => {
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

    const getChatHistory = useCallback(() => {
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
                                lastName: res.data[0].lastName,
                                birthDate: res.data[0].birthDate,
                                gender: res.data[0].gender,
                                status: res.data[0].status,
                                picture: res.data[0].picture,
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
                });
        }
    }, [api, validator, autService, conversationId, selectedUser, formatMessageTs]);

    const getValidUserConnections = useCallback(() => {
        api.getUserConnections(autService.getUsername())
            .then(res => {
                if (res.data) {
                    const connections = res.data.map(b => ({
                        id: b.id,
                        blocked: b.blocked,
                        connected: b.connected,
                        connectionRequested: b.connectionRequested,
                        updatedBy: b.updatedBy,
                        partner: b.partner,
                    }));
                    setUserConnections(connections);
                } else {
                    console.log("There is no data in response ", res);
                }
            })
            .catch(err => {
                const [errorList] = axiosErrorHandler(err);
                setGeneralErrorList(errorList);
            });
    }, [api, autService]);

    const getBlockedConnections = useCallback(() => {
        api.getUserBlockedConnections(autService.getUsername())
            .then(res => {
                if (res.data) {
                    const blockedConnections = res.data.map(b => ({
                        id: b.id,
                        blocked: b.blocked,
                        connected: b.connected,
                        connectionRequested: b.connectionRequested,
                        updatedBy: b.updatedBy,
                        partner: b.partner,
                    }));
                    setBlockedConnections(blockedConnections);
                } else {
                    console.log("There is no data in response ", res);
                }
            })
            .catch(err => {
                const [errorList] = axiosErrorHandler(err);
                setGeneralErrorList(errorList);
            });
    }, [api, autService]);

    const getAwaitingReviewConnection = useCallback(() => {
        api.getPendingConnections(autService.getUsername())
            .then(res => {
                if (res.data) {
                    const connections = res.data.map(b => ({
                        id: b.id,
                        blocked: b.blocked,
                        connected: b.connected,
                        connectionRequested: b.connectionRequested,
                        updatedBy: b.updatedBy,
                        partner: b.partner,
                    }));
                    setAwaitingConnections(connections);
                } else {
                    console.log("There is no data in response ", res);
                }
            })
            .catch(err => {
                const [errorList] = axiosErrorHandler(err);
                setGeneralErrorList(errorList);
            });
    }, [api, autService]);

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
        console.log("Second effect")
        switch (typeSidebarItems) {
            case selectedDisplayItemsTypes.connections:
                getValidUserConnections();
                break
            case selectedDisplayItemsTypes.blocks:
                getBlockedConnections();
                break;
            case selectedDisplayItemsTypes.awaiting:
                getAwaitingReviewConnection();
                break;
            default:
                getUserConversations();
                break;
        }
    }, [typeSidebarItems, getValidUserConnections, getBlockedConnections, getUserConversations, getAwaitingReviewConnection, selectedDisplayItemsTypes]);


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

    const searchConnectionInputChangeHandler = searchFormData => {
        console.log("Search FOrm", searchFormData);
        if (searchFormData) {
            console.log("Starting Search OP")
            const searchRequest = {
                username: searchFormData.searchByUsername,
                chatName: searchFormData.searchByChatName,
                firstName: searchFormData.searchByFirstName,
                lastName: searchFormData.searchByLastName,
                address: {
                    country: searchFormData.searchByCountry,
                    city: searchFormData.searchByCity,
                }
            }
            api.searchChatUsersInfo(searchRequest)
                .then(res => {
                    if (res.data) {
                        console.log(res.data);
                        const foundSearchResults = res.data.map(result => (
                            {
                                id: result.id,
                                username: result.username,
                                chatName: result.chatName,
                                firstName: result.firstName,
                                lastName: result.lastName,
                                birthDate: result.birthDate,
                                gender: result.gender,
                                status: result.status,
                                picture: result.picture,
                                address: result.address,
                                self: result.self,
                                connected: result.connected,
                                connectionRequested: result.pending,
                            }
                        ));
                        setSearchResults(foundSearchResults);
                    } else {
                        console.log(res);
                    }
                })
                .catch(err => {
                    const [errorList] = axiosErrorHandler(err);
                    setGeneralErrorList(errorList);
                });
        }
    }

    const displayBlockedConnectionsHandler = () => {
        if (typeSidebarItems !== selectedDisplayItemsTypes.blocks) {
            setTypeSidebarItems(selectedDisplayItemsTypes.blocks);
        }
    }

    const displayConversationsHandler = () => {
        setTypeSidebarItems(selectedDisplayItemsTypes.conversations);
    }

    const displayValidConnectionsHandler = () => {
        if (typeSidebarItems !== selectedDisplayItemsTypes.connections) {
            setTypeSidebarItems(selectedDisplayItemsTypes.connections);
        }
    }

    const displayAwaitingConnectionsHandler = () => {
        if (typeSidebarItems !== selectedDisplayItemsTypes.awaiting) {
            setTypeSidebarItems(selectedDisplayItemsTypes.awaiting);
        }
    }

    const showSearchDialogHandler = event => {
        setVisibleConnectionDialog(!visibleConnectionDialog);
    }

    const closeSearchDialogHandler = event => {
        setVisibleConnectionDialog(false);
    }

    const registerValidationFor = {
        chatTextMessage: () => register(),
    };

    const registerValidationForSearch = {
        searchByUsername: () => register(),
        searchByFirstName: () => register(),
        searchByLastName: () => register(),
        searchByChatName: () => register(),
        searchByCountry: () => register(),
        searchByCity: () => register(),
    }

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
        blockedConnections,
        awaitingConnections,
        conversations: userConversations,
        connections: userConnections,
        messages: conversationMessages,
        searchResults,
        partnerInfo: conversationPartnerInfo,
        statusInfo: partnerStatusInfo,
        bottomElement: chatConversationBoxBottom,
        generalErrorList,
        isConversationSelected,
        isConversationPartnerMessage,
        getConversationPartnerNames,
        showSearchConnectionDialog: visibleConnectionDialog,
        closeSearchConnectionDialog: closeSearchDialogHandler,
        registerValidationFor,
        registerValidationForSearch,
        fieldErrorFor: errors,
        onTextSend: handleSubmit(
            textMessageSendHandler,
            validator.extractErrorsFromInvalidForm(setGeneralErrorList)
        ),
        onSearchCLick: showSearchDialogHandler,
        onSearch: handleSubmit(
            searchConnectionInputChangeHandler,
            validator.extractErrorsFromInvalidForm(setGeneralErrorList)
        ),
        disconnect,
        selectedDisplayItemsTypes,
        typeSidebarItems,
        displayBlockedConnectionsHandler,
        displayConversationsHandler,
        displayValidConnectionsHandler,
        displayAwaitingConnectionsHandler,

    };

};

export default useChatConversationHistory;