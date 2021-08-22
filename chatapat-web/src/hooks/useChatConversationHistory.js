import {useMemo, useState} from "react";
import ApiRequest from "../http/ApiRequest";
import AuthService from "../service/AuthService";

const useChatConversationHistory = props => {

    const api = useMemo(() => new ApiRequest(), []);
    const autService = useMemo(() => new AuthService(),[]);
    const [conversationMessages, setConversationMessages ]= useState([]);
    const [generalErrorList, setGeneralErrorList] = useState([]);
};

export default useChatConversationHistory;