import ChatConversationsSidebar from "../components/chat/ChatConversationsSidebar";
import {useParams} from "react-router-dom";
import ChatConversationHistory from "../components/chat/ChatConversationHistory";
import ChatUserConnectionSearch from "../components/chat/ChatUserConnectionSearch";
import ChatUserProfileInfo from "../components/chat/ChatUserProfilInfo";
import InputControl from "../components/commons/control/InputControl";
import {Avatar} from "primereact/avatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faInfoCircle,
    faMicrophone, faPaperclip,
    faPaperPlane,
    faPhoneAlt,
    faSmile,
    faVideo
} from "@fortawesome/free-solid-svg-icons";
import {Button} from "primereact/button";
import {faTelegramPlane} from "@fortawesome/free-brands-svg-icons";
import LogoutItem from "../components/logout/LogoutItem";
import ChatMainItem from "../components/chat/ChatMainItem";

const ChatHome = () => {
    const {conversationId} = useParams();
    console.log('selected conversation id', conversationId);

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

                        <ChatConversationsSidebar/>
                    </div>
                </div>
                <div className="col-7">
                    {/*partner data*/}

                    <ChatMainItem
                    conversationId={conversationId}/>

                </div>
                <div className="col-2" style={{
                    border: '2px solid blue',
                }}><LogoutItem/>
                </div>
            </div>
        </div>
    );
};
export default ChatHome;