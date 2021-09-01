import ChatConversationsSidebar from "../components/chat/ChatConversationsSidebar";
import {useParams} from "react-router-dom";
import ChatUserConnectionSearch from "../components/chat/ChatUserConnectionSearch";
import ChatUserProfileInfo from "../components/chat/ChatUserProfilInfo";
import LogoutItem from "../components/logout/LogoutItem";
import ChatMainItem from "../components/chat/ChatMainItem";
import useChatConversationHistory from "../hooks/useChatConversationHistory";

const ChatHome = () => {
    const {conversationId, selectedUser} = useParams()
    // const {disconnect} = useWebSocketConnection( {onMessageReceiveEventHandler: () => {}});
    console.log('selected conversation id', conversationId);

    // const conversationId = props && props.conversationId ? props.conversationId : null;
    // const selectedUser = props && props.selectedUser ? props.selectedUser : null;
    const
        {
            conversations,
            messages,
            partnerInfo,
            statusInfo,
            bottomElement,
            generalErrorList,
            fieldErrorFor,
            registerValidationFor,
            onTextSend,
            getConversationPartnerNames,
            isConversationPartnerMessage
        } = useChatConversationHistory(conversationId, selectedUser);

    return (
        <div className="container-fluid card">
            <div className="row">
                <div className="col-3">
                    <ChatUserProfileInfo/>
                    <ChatUserConnectionSearch/>
                    <div style={{
                        border: '2px solid green',
                        height: '85vh',
                        overflow: 'hidden',
                        overflowY: 'scroll',
                        textAlign: 'center',
                    }}>

                        <ChatConversationsSidebar
                            conversations={conversations}
                            getConversationPartnerNames={getConversationPartnerNames}
                        />
                    </div>
                </div>
                <div className="col-7">
                    {/*partner data*/}

                    <ChatMainItem
                    conversationId={conversationId}
                    selectedUser={selectedUser}
                    partnerInfo={partnerInfo}
                    statusInfo={statusInfo}
                    messages={messages}
                    isConversationPartnerMessage={isConversationPartnerMessage}
                    bottomElement={bottomElement}
                    fieldErrorFor={fieldErrorFor}
                    registerValidationFor={registerValidationFor}
                    onTextSend={onTextSend}

                    />

                </div>
                <div className="col-2" style={{
                    border: '2px solid blue',
                }}><LogoutItem
                // logutCallbacks={[disconnect]}
                />
                </div>
            </div>
        </div>
    );
};
export default ChatHome;