import {Avatar} from "primereact/avatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle, faMicrophone, faPaperclip, faPhoneAlt, faSmile, faVideo} from "@fortawesome/free-solid-svg-icons";
import ChatConversationHistory from "./ChatConversationHistory";
import InputControl from "../commons/control/InputControl";
import {Button} from "primereact/button";
import {faTelegramPlane} from "@fortawesome/free-brands-svg-icons";

const ChatMainItem = props => {
    return (
        <>
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
                    conversationId={props.conversationId}
                />
            </div>

            {/*input place*/}
            <div className="" style={{
                border: '2px solid orange'
            }}>
                <form noValidate id="sendConversationMessageForm" className="container-fluid" onSubmit={() => {
                }}>
                    <div className="row">

                        <div className="col-9 pt-2 p-field" style={{border: '1px solid green'}}>
                            <InputControl
                                // error={fieldErrorFor.searchConnection?.message}
                                // registerRef={registerValidationFor.searchConnection}
                                id="searchConnection"
                                name="searchConnection"
                                type="text"
                                placeholder="Type..."

                            />

                        </div>
                        <div className="col-1" style={{border: '1px solid red'}}>
                            <div id="sendMessageButton">
                                <Button
                                    type="button"
                                    className="send-btn"
                                    icon={<FontAwesomeIcon icon={faTelegramPlane} size="2x"
                                                           style={{color: '#20a8d8'}}/>}
                                    tooltip={'Send'}
                                    tooltipOptions={{position: 'top'}}
                                    style={{border: '1px solid blue'}}
                                />
                            </div>
                        </div>

                        <div style={{border: '1px solid red'}} className="col-2 d-flex ">
                            <div id="sendEmojiMessage" className="px-1">
                                <Button
                                    type="button"
                                    className="send-btn"
                                    icon={<FontAwesomeIcon icon={faSmile} size="2x"
                                                           style={{color: '#20a8d8'}}/>}
                                    tooltip={'Emoji'}
                                    tooltipOptions={{position: 'top'}}
                                    style={{border: '1px solid blue'}}
                                />
                            </div>

                            <div id="sendVoiceMessage" className="px-1">
                                <Button
                                    type="button"
                                    className="send-btn"
                                    icon={<FontAwesomeIcon icon={faMicrophone} size="2x"
                                                           style={{color: '#20a8d8'}}/>}
                                    tooltip={'Voice message'}
                                    tooltipOptions={{position: 'top'}}
                                    style={{border: '1px solid blue'}}
                                />
                            </div>

                            <div id="sendAttachmentMessage" className="px-1">
                                <Button
                                    type="button"
                                    className="send-btn"
                                    icon={<FontAwesomeIcon icon={faPaperclip} size="2x"
                                                           style={{color: '#20a8d8'}}/>}
                                    tooltip={'Attachment'}
                                    tooltipOptions={{position: 'top'}}
                                    style={{border: '1px solid blue'}}
                                />
                            </div>

                        </div>
                    </div>
                </form>
            </div>

        </>
    )
}

export default ChatMainItem;