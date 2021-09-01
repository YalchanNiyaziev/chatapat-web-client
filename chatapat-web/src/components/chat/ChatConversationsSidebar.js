import useChatConversations from "../../hooks/useChatConversations";
import {DataScroller} from "primereact/datascroller";
import {Avatar} from "primereact/avatar";
import {Badge} from "primereact/badge";
import ValidatorService from "../../service/ValidatorService";
import {Link, useParams} from "react-router-dom";
import {authenticatedRoutes} from "../../routes/AppRoutes";


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
            //blue -> info
        }
    }
}
const ChatConversationsSidebar = props => {
    const {
        conversations,
        generalErrorList,
        userInfo,
        getConversationPartnerNames
    } = useChatConversations();

    const dataScrollerItemTemplate = item => {
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
                    // style={
                    //     {
                    //         border: '1px solid blue',
                    //         // width: '100%'
                    //     }
                    // }
                >
                    <div className="partner-name font-weight-bold"
                        // style={
                        //     {border: '1px solid blue',}
                        // }
                    >{props.getConversationPartnerNames(item)}</div>
                    <div className="last-message text-truncate text-"
                        // style={
                        //     {
                        //         border: '1px solid blue',
                        //     }
                        // }
                    >{item.lastMessage}</div>
                    <div className="last-message-ts text-right"

                        // style={
                        //     {border: '1px solid blue'}
                        // }
                    >{item.lastMessageTs}</div>
                </div>
            </Link>
        );

    }

    console.log('conversations@', props.conversations)
    return (
            <div className="card">
                <DataScroller
                    value={props.conversations}
                    inline={true}
                    emptyMessage="There is no conversations yet."
                    itemTemplate={dataScrollerItemTemplate}
                    rows={props.conversations.length}
                />
            </div>
    );
};

export default ChatConversationsSidebar;