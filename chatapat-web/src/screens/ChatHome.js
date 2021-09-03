import ChatConversationsSidebar from "../components/chat/ChatConversationsSidebar";
import ChatUserConnectionSearch from "../components/chat/ChatUserConnectionSearch";
import ChatUserProfileInfo from "../components/chat/ChatUserProfilInfo";
import LogoutItem from "../components/logout/LogoutItem";
import ChatMainItem from "../components/chat/ChatMainItem";
import useChatConversationHistory from "../hooks/useChatConversationHistory";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {faBan, faComments, faPauseCircle, faSearch, faSmile, faUserFriends} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MainActionButtonsContainer from "../components/chat/MainActionButtonsContainer";

const ChatHome = () => {
    // const {conversationId, selectedUser} = useParams()
    // const {disconnect} = useWebSocketConnection( {onMessageReceiveEventHandler: () => {}});
    // console.log('selected conversation id', conversationId);

    // const conversationId = props && props.conversationId ? props.conversationId : null;
    // const selectedUser = props && props.selectedUser ? props.selectedUser : null;
    const
        {
            conversations,
            messages,
            searchResults,
            partnerInfo,
            statusInfo,
            bottomElement,
            generalErrorList,
            fieldErrorFor,
            registerValidationFor,
            registerValidationForSearch,
            onTextSend,
            onSearch,
            onSearchCLick,
            getConversationPartnerNames,
            showSearchConnectionDialog,
            closeSearchConnectionDialog,
            isConversationSelected,
            isConversationPartnerMessage,
            disconnect,
        } = useChatConversationHistory();

    return (
        <div className="container-fluid card">
            <div className="row">
                <div className="col-3">
                    <ChatUserProfileInfo/>
                    <MainActionButtonsContainer
                    onSearch={onSearchCLick}/>

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
                        isConversationSelected={isConversationSelected}
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
                    logutCallbacks={[disconnect]}
                />
                </div>
            </div>
            <div className="row">
                <div className="container-fluid">
                <ChatUserConnectionSearch
                    registerValidationFor={registerValidationForSearch}
                    fieldErrorFor={fieldErrorFor}
                    onSubmit={onSearch}
                    showSearchConnectionDialog={showSearchConnectionDialog}
                    closeSearchConnectionDialog={closeSearchConnectionDialog}
                    searchResults={searchResults}
                />
                </div>
            </div>
        </div>
    )
        ;
};
export default ChatHome;