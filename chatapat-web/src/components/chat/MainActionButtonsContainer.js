import {Button} from "primereact/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faComments, faPauseCircle, faSearch, faUserFriends} from "@fortawesome/free-solid-svg-icons";

const MainActionButtonsContainer = props => {
    const {onConversation, onConnection, onConnectionRequest, onBlocks, onSearch} = props;
    return(
        <div className="d-flex" style={{border: '2px solid red'}}>
            <div  style={{border: "1px solid green", width: '20%'}}>
                <Button
                    className="p-button-sm w-100"

                    icon={<FontAwesomeIcon icon={faComments}
                                           size="2x"
                        // style={{color: '#20a8d8'}}
                    />}
                    tooltip="Conversations"
                    tooltipOptions={{position: 'bottom'}}
                    onClick={() => {
                    }}
                    // label="Conversations"
                /></div>
            <div  style={{border: "1px solid purple", width: '20%'}}>
                <Button
                    className="p-button-sm w-100"

                    icon={<FontAwesomeIcon icon={faUserFriends}
                                           size="2x"
                        // style={{color: '#20a8d8'}}
                    />}
                    tooltip="Connections"
                    tooltipOptions={{position: 'bottom'}}
                    onClick={() => {
                    }}
                    // label="Connections"
                />
            </div>
            <div  style={{border: "1px solid orange", width: '20%'}}>
                <Button
                    className="p-button-sm w-100"
                    icon={<FontAwesomeIcon icon={faPauseCircle}
                                           size="2x"
                        // style={{color: '#20a8d8'}}
                    />}
                    tooltip="Requests"
                    tooltipOptions={{position: 'bottom'}}
                    onClick={() => {
                    }}
                    // label="Requests"
                /></div>
            <div  style={{border: "1px solid brown", width: '20%'}}>
                <Button
                    className="p-button-sm w-100"
                    icon={<FontAwesomeIcon icon={faBan}
                                           size="2x"
                        // style={{color: '#20a8d8'}}
                    />}
                    tooltip="Blocked"
                    tooltipOptions={{position: 'bottom'}}
                    onClick={() => {
                    }}
                    // label="Blocks"
                />
            </div>
            <div className="" style={{border: "1px solid gold", width: '20%'}}>
                <Button
                    className="p-button-sm w-100"
                    icon={<FontAwesomeIcon icon={faSearch}
                                           size="2x"
                        // style={{color: '#20a8d8'}}
                    />}
                    tooltip="Search"
                    // label="Search"
                    tooltipOptions={{position: 'bottom'}}
                    onClick={onSearch? onSearch: ''}
                    // iconPos="top"
                />
            </div>
        </div>
    );
};

export default MainActionButtonsContainer;