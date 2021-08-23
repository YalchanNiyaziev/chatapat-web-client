import ChatConversationsSidebar from "../components/chat/ChatConversationsSidebar";
import {useParams} from "react-router-dom";
import ChatConversationHistory from "../components/chat/ChatConversationHistory";
import ChatUserConnectionSearch from "../components/chat/ChatUserConnectionSearch";
import ChatUserProfileInfo from "../components/chat/ChatUserProfilInfo";
import InputControl from "../components/commons/control/InputControl";
import {Avatar} from "primereact/avatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle, faPhoneAlt, faVideo} from "@fortawesome/free-solid-svg-icons";

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
                    <div className="container-fluid d-flex" style={{
                        border: '2px solid orange'

                    }}>
                        <div className="row">
                            <div className="col-1" style={{
                                border: '2px solid orange',
                                width: '5%'

                            }}>
                                <Avatar
                                    image='https://www.audi.com/content/dam/gbp2/career/2021/diversity/1920x1440-mobile-diversity-audi-inclusion.jpg'
                                    imageALt="conversation user profile image" shape="circle"
                                    size="xlarge"
                                />
                            </div>

                            <div className="col-9" style={{
                                border: '2px solid purple',
                                width: '65%'

                            }}>
                                <div style={{
                                    border: '2px solid blue'
                                }}
                                     style={{wordBreak: 'break-all', whiteSpace: 'pre-wrap', border: '1px solid green'}}
                                >
                                    iasbajksbkbasdba a da sdklh dasdadfa afasfsdgfdsrgdegher
                                    weretgwegfssaghshgsdfgsdhfgsdrrfgsderghsergaergar garg argeagsdasdf
                                    asdfasdfasdgadgfwrgqagasdgawgwzsdfasd asf asdfasw
                                </div>
                                <div style={{
                                    border: '2px solid blue'
                                }}>
                                    <span className="dot" style={{
                                        height: '0.8rem',
                                        width: '0.8rem',
                                        backgroundColor: '#34A835',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                    }}/> <span>Active</span>

                                </div>
                            </div>


                            <div
                                className="col-2 d-flex px-4" style={{
                                border: '2px solid red',
                                width: '25%'

                            }}
                            >
                                <div className="pt-3 mx-1"
                                style={{
                                    border: '2px solid pink',

                                }}
                                >
                                    <FontAwesomeIcon
                                    icon={faPhoneAlt}
                                    size="2x"
                                    />
                                </div>
                                <div
                                    className="pt-3 mx-1"
                                    style={{
                                        border: '2px solid pink',

                                    }}
                                >

                                    <FontAwesomeIcon
                                        icon={faVideo}
                                        size="2x"
                                    />
                                </div>
                                <div
                                    className="pt-3 mx-1"
                                    style={{
                                        border: '2px solid pink',

                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faInfoCircle}
                                        size="2x"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div
                        className="py-2"
                        style={{
                        border: '2px solid orange',
                        height: '80vh',
                        overflow: 'hidden',
                        overflowY: 'scroll',
                        textAlign: 'center',
                    }}>
                        <ChatConversationHistory
                            conversationId={conversationId}
                        />
                    </div>

                    {/*input place*/}
                    <div className="d-flex" style={{
                        border: '2px solid orange'

                    }}>

                        <InputControl
                            // error={fieldErrorFor.searchConnection?.message}
                            // registerRef={registerValidationFor.searchConnection}
                            id="searchConnection"
                            name="searchConnection"
                            type="text"
                            placeholder="Type..."

                        />
                    </div>
                </div>
                <div className="col-2" style={{
                    border: '2px solid blue',
                }}>Bla bla 22
                </div>
            </div>
        </div>
    );
};
export default ChatHome;