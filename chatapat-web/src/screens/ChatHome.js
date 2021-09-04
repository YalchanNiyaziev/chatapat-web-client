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
            blockedConnections,
            awaitingConnections,
            conversations,
            connections,
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
            selectedDisplayItemsTypes,
            typeSidebarItems,
            displayBlockedConnectionsHandler,
            displayConversationsHandler,
            displayValidConnectionsHandler,
            displayAwaitingConnectionsHandler,
        } = useChatConversationHistory();

    return (
        <div className="container-fluid card">
            <div className="row">
                <div className="col-3">
                    <ChatUserProfileInfo/>
                    <MainActionButtonsContainer
                    onSearch={onSearchCLick}
                    onConversation={displayConversationsHandler}
                    onBlocks={displayBlockedConnectionsHandler}
                    onConnection={displayValidConnectionsHandler}
                    onConnectionRequest={displayAwaitingConnectionsHandler}
                    />

                    <div style={{
                        border: '2px solid green',
                        height: '85vh',
                        overflow: 'hidden',
                        overflowY: 'scroll',
                        textAlign: 'center',
                    }}>

                        <ChatConversationsSidebar
                            conversations={conversations}
                            blockedConnections={blockedConnections}
                            awaitingConnections={awaitingConnections}
                            connections={connections}
                            getConversationPartnerNames={getConversationPartnerNames}
                            selectedDisplayItemsTypes={selectedDisplayItemsTypes}
                            typeSidebarItems={typeSidebarItems}
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