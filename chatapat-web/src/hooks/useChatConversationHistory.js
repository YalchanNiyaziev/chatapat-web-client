import {useEffect, useMemo, useState} from "react";
import ApiRequest from "../http/ApiRequest";
import AuthService from "../service/AuthService";
import axiosErrorHandler from "../http/AxiosErrorHandler";
import {useForm} from "react-hook-form";
import ValidatorService from "../service/ValidatorService";

const useChatConversationHistory = (conversationId, selectedUser) => {

    const api = useMemo(() => new ApiRequest(), []);
    const autService = useMemo(() => new AuthService(), []);
    const validator = new ValidatorService();
    const {register, handleSubmit, errors, setValue} = useForm();
    const [conversationMessages, setConversationMessages] = useState([]);
    const [conversationPartnerInfo, setConversationPartnerInfo] = useState(null);
    const [partnerStatusInfo, setPartnerStatusInfo] = useState(null);
    const [generalErrorList, setGeneralErrorList] = useState([]);

    useEffect(() => {
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

    const textMessageSendHandler = formData => {
        console.log('$chatTextMessage', formData);
        if (formData && formData.chatTextMessage) {
            console.log("There is message sent");
            setValue(`chatTextMessage`, '');
        } else {
            console.log("There is no chat message");
        }
    }

    const registerValidationFor = {
        chatTextMessage: () => register(),
    };

    return {
        messages: conversationMessages,
        partnerInfo: conversationPartnerInfo,
        statusInfo: partnerStatusInfo,
        generalErrorList,
        isConversationPartnerMessage,
        registerValidationFor,
        fieldErrorFor: errors,
        onTextSend: handleSubmit(
            textMessageSendHandler,
            validator.extractErrorsFromInvalidForm(setGeneralErrorList)
        ),

    };

};

export default useChatConversationHistory;