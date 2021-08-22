import ChatConversationsSidebar from "../components/chat/ChatConversationsSidebar";
import {useParams} from "react-router-dom";
import ChatConversationHistory from "../components/chat/ChatConversationHistory";

const ChatHome = () => {
    const {conversationId} = useParams();
    console.log('selected conversation id', conversationId);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3" style={{border: '2px solid green',}}>
                    <ChatConversationsSidebar/>
                </div>
                <div className="col-6" style={{border: '2px solid orange',}}>
                    <ChatConversationHistory
                    conversationId={conversationId}
                    />
                </div>

                <div className="col-3" style={{
                    border: '2px solid blue',
                }}>Bla bla 22
                </div>
            </div>
        </div>
    );
};
export default ChatHome;