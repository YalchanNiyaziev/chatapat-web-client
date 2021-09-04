import {DataScroller} from "primereact/datascroller";
import {Avatar} from "primereact/avatar";
import {Badge} from "primereact/badge";
import ValidatorService from "../../service/ValidatorService";
import {Link} from "react-router-dom";
import {authenticatedRoutes} from "../../routes/AppRoutes";
import {Button} from "primereact/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCheck, faUserMinus, faUserTimes} from "@fortawesome/free-solid-svg-icons";


const getBadgeSeverityByUserStatus = partner => {
    if (partner && partner.status) {
        const validator = new ValidatorService();
        switch (partner.status) {
            case validator.userStatus.ACTIVE:
                return 'success'; //green
            case validator.userStatus.RECENTLY_ACTIVE:
                return 'warning'; // yellow
            case validator.userStatus.AWAY:
                return 'danger'; // red
            default:
                return 'info';
            //blue -> info
        }
    }
}
const ChatConversationsSidebar = props => {

    const displayDataScroller = () => {
        if (props && props.selectedDisplayItemsTypes && props.typeSidebarItems && props.blockedConnections && props.conversations && props.connections && props.awaitingConnections) {
            console.log("KURRRR", props.typeSidebarItems)
            let elements = '';
            let header = '';
            switch (props.typeSidebarItems) {

                case props.selectedDisplayItemsTypes.connections: {
                    console.log("You rende rblocks with aRRRAYA", props.blockedConnections)
                    elements = props.connections.map((value, index) => (
                        <li key={index}
                            style={{border: '1px solid #d8dae2', borderWidth: '1px', boxSizing: 'border-box'}}>
                            <div>{connectionsItemTemplate(value)}</div>
                        </li>
                    ));
                    header = "Connections";
                    break;
                }
                case props.selectedDisplayItemsTypes.blocks: {
                    console.log("You rende rblocks with aRRRAYA", props.blockedConnections)
                    elements = props.blockedConnections.map((value, index) => (
                        <li key={index}
                            style={{border: '1px solid #d8dae2', borderWidth: '1px', boxSizing: 'border-box'}}>
                            <div>{blocksDataItemTemplate(value)}</div>
                        </li>
                    ));
                    header = "Blocked connections"
                    break;
                }
                case props.selectedDisplayItemsTypes.awaiting: {
                    console.log("You rende rblocks with aRRRAYA", props.awaitingConnections)
                    elements = props.awaitingConnections.map((value, index) => (
                        <li key={index}
                            style={{border: '1px solid #d8dae2', borderWidth: '1px', boxSizing: 'border-box'}}>
                            <div>{awaitingConnectionsItemTemplate(value)}</div>
                        </li>
                    ));
                    header = "Awaiting for accept ore reject"
                    break;
                }
                default: {
                    elements = props.conversations.map((value, index) => (
                        <li key={index}
                            style={{border: '1px solid #d8dae2', borderWidth: '1px', boxSizing: 'border-box'}}>
                            <div>{conversationsDataItemTemplate(value)}</div>
                        </li>
                    ));
                    header = "Conversations"
                    break;
                }
            }
            return (
                <div style={{
                    background: '#ffffff',
                    color: '#333333',
                    border: '0 none',
                    padding: '0',
                    boxSizing: 'border-box',
                    overflow: 'auto'
                }}>
                    <h3>{header}</h3>
                    <ul style={{listStyleType: 'none', margin: '0', padding: '0', boxSizing: 'border-box'}}>
                        {elements}
                    </ul>
                </div>);
        }
    }

    const connectionsItemTemplate = item => {
        console.log("Connected", item);
        if (!item || !item.partner) {
            return '';
        }
        return (
            <div className="d-flex py-2">
                <div
                    style={{border: '1px solid blue'}}
                    className="col-2 ">
                    <Avatar
                        image={item.partner.picture ? item.partner.picture : 'https://www.audi.com/content/dam/gbp2/career/2021/diversity/1920x1440-mobile-diversity-audi-inclusion.jpg'}
                        imageALt="conversation user profile image" shape="circle"
                        size="large"
                    />
                </div>
                <div className="conversation-details col-5"
                     style={{border: '1px solid green'}}
                >
                    <div className="partner-name font-weight-bold font-lg justify-content-center"
                         style={{
                             // border: '1px solid orange',
                             wordBreak: 'break-all', whiteSpace: 'pre-wrap', width: '100%'
                         }}
                    >
                        {props.getConversationPartnerNames(item.partner)}
                    </div>

                </div>
                <div className="col-5 d-flex">
                    <div className="conversation-details p-2 "
                         style={{border: '1px solid blue'}}
                    >
                        <Button
                            className="p-button-raised"
                            icon={<FontAwesomeIcon icon={faUserMinus}/>}
                            type="button"
                            tooltip="Remove"
                            tooltipOptions={{position: 'bottom'}}
                            onClick={() => item.partner.username}
                            style={{color: 'white', backgroundColor: 'darkorange', border: '1px solid darkorange'}}
                        />
                    </div>
                    <div className="conversation-details p-2"
                         style={{border: '1px solid blue'}}
                    >
                        <Button
                            className="p-button-raised p-button-danger"
                            icon="fa fa-ban"
                            tooltip="Block"
                            type="button"
                            tooltipOptions={{position: 'bottom'}}
                            onClick={() => item.partner.username}
                        />
                    </div>
                    <div className="conversation-details p-2"
                         style={{border: '1px solid blue'}}
                    >
                        <Button
                            className="p-button-raised p-button-info "
                            type="button"
                            icon="fa fa-info-circle"
                            tooltip="Show info"
                            tooltipOptions={{position: 'bottom'}}
                            onClick={() => item.partner.username}
                        />
                    </div>
                </div>
            </div>)
    }

    const awaitingConnectionsItemTemplate = item => {
        console.log("Awaiting connection", item);
        if (!item || !item.partner) {
            return '';
        }
        return (
            <div className="d-flex py-2">
                <div
                    style={{border: '1px solid blue'}}
                    className="col-2 ">
                    <Avatar
                        image={item.partner.picture ? item.partner.picture : 'https://www.audi.com/content/dam/gbp2/career/2021/diversity/1920x1440-mobile-diversity-audi-inclusion.jpg'}
                        imageALt="conversation user profile image" shape="circle"
                        size="large"
                    />
                </div>
                <div className="conversation-details col-4"
                     style={{border: '1px solid green'}}
                >
                    <div className="partner-name font-weight-bold font-lg justify-content-center"
                         style={{
                             // border: '1px solid orange',
                             wordBreak: 'break-all', whiteSpace: 'pre-wrap', width: '100%'
                         }}
                    >
                        {props.getConversationPartnerNames(item.partner)}
                    </div>

                </div>
                <div className="col-6 d-flex ">
                    <div className="conversation-details p-1"
                         style={{border: '1px solid blue'}}
                    >
                        <Button
                            className="p-button-raised"
                            icon={<FontAwesomeIcon icon={faUserCheck}/>}
                            tooltip="Accept"
                            tooltipOptions={{position: 'bottom'}}
                            onClick={() => item.partner.username}
                            style={{color: 'white', backgroundColor: '#1171e0', border: '1px solid #ffba01'}}
                        />
                    </div>

                    <div className="conversation-details p-1"
                         style={{border: '1px solid blue'}}
                    >
                        <Button
                            className="p-button-raised"
                            icon={<FontAwesomeIcon icon={faUserTimes}/>}
                            tooltip="Reject"
                            tooltipOptions={{position: 'bottom'}}
                            onClick={() => item.partner.username}
                            style={{color: 'white', backgroundColor: '#ff5302', border: '1px solid #ffba01'}}
                        />
                    </div>
                    <div className="conversation-details p-1"
                         style={{border: '1px solid blue'}}
                    >
                        <Button
                            className="p-button-raised p-button-danger"
                            icon="fa fa-ban"
                            tooltip="Block"
                            type="button"
                            tooltipOptions={{position: 'bottom'}}
                            onClick={() => item.partner.username}
                        />
                    </div>
                    <div className="conversation-details p-1"
                         style={{border: '1px solid blue'}}
                    >
                        <Button
                            className="p-button-raised p-button-info "
                            type="button"
                            icon="fa fa-info-circle"
                            tooltip="Show info"
                            tooltipOptions={{position: 'bottom'}}
                            onClick={() => item.partner.username}
                        />
                    </div>

                </div>
            </div>)
    }

    const blocksDataItemTemplate = item => {
        console.log("Blocked", item);
        if (!item || !item.partner) {
            return '';
        }
        return (
            <div className="d-flex py-2">
                <div
                    style={{border: '1px solid blue'}}
                    className="col-3 ">
                    <Avatar
                        image={item.partner.picture ? item.partner.picture : 'https://www.audi.com/content/dam/gbp2/career/2021/diversity/1920x1440-mobile-diversity-audi-inclusion.jpg'}
                        imageALt="conversation user profile image" shape="circle"
                        size="xlarge"
                    />
                </div>
                <div className="conversation-details col-5 "
                     style={{border: '1px solid green'}}
                >
                    <div className="partner-name font-weight-bold font-lg justify-content-center"
                         style={{
                             // border: '1px solid orange',
                             wordBreak: 'break-all', whiteSpace: 'pre-wrap', width: '100%'
                         }}
                    >
                        {props.getConversationPartnerNames(item.partner)}
                    </div>

                </div>
                <div className="col-4 d-flex">
                    <div className="conversation-details p-2"
                         style={{border: '1px solid blue'}}
                    >
                        <Button
                            className="p-button-raised p-button-success"
                            type="button"
                            icon="fa fa-unlock"
                            tooltip="Unblock"
                            tooltipOptions={{position: 'bottom'}}
                            onClick={() => item.partner.username}
                        />
                    </div>
                    <div className="conversation-details p-2 "
                         style={{border: '1px solid blue'}}
                    >
                        <Button
                            className="p-button-raised p-button-info "
                            type="button"
                            icon="fa fa-info-circle"
                            tooltip="Show info"
                            tooltipOptions={{position: 'bottom'}}
                            onClick={() => item.partner.username}
                        />
                    </div>
                </div>
            </div>)
    }
    const conversationsDataItemTemplate = item => {
        return (
            < Link to={`${authenticatedRoutes.main.path}/${item.conversationId}/${item.username}`}>
                <div
                    // style={{border: '1px solid blue'}}
                    className="py-4 col-3 d-inline-block">
                    <Avatar className="p-overlay-badge"
                            image={item.imageUrl ? item.imageUrl : 'https://www.audi.com/content/dam/gbp2/career/2021/diversity/1920x1440-mobile-diversity-audi-inclusion.jpg'}
                            imageALt="conversation user profile image" shape="circle"
                            size="xlarge"
                    >
                        <Badge severity={getBadgeSeverityByUserStatus(item)}/>
                    </Avatar>
                </div>
                <div className="conversation-details col-9 d-inline-block"
                    // style={{border: '1px solid blue', width: '100%'}}
                >
                    <div className="partner-name font-weight-bold font-xl"
                        // style={{border: '1px solid blue',}}
                    >
                        {props.getConversationPartnerNames(item)}
                    </div>
                    <div className="last-message text-truncate text-left font-lg"
                        // style={{border: '1px solid blue',}}
                    >
                        {item.lastMessage}
                    </div>
                    <div className="last-message-ts text-right"
                        // style={{border: '1px solid blue'}}
                    >
                        {item.lastMessageTs}
                    </div>
                </div>
            </Link>
        );

    }

    console.log('conversations@', props.data)
    console.log('Blocked connections@', props.blockedConnections)
    return (
        <div className="card">
            {/*<DataScroller*/}
            {/*    value={getDataScrollerData()}*/}
            {/*    inline={true}*/}
            {/*    emptyMessage="There is no conversations yet."*/}
            {/*    itemTemplate={displayDataScrollerBySelectedActionType}*/}
            {/*    rows={getDataScrollerDataLength()}*/}
            {/*/>*/}
            {displayDataScroller()}
        </div>
    );
};

export default ChatConversationsSidebar;