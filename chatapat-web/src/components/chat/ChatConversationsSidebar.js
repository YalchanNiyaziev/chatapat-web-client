import useChatConversations from "../../hooks/useChatConversations";
import {DataScroller} from "primereact/datascroller";
import {Avatar} from "primereact/avatar";
import {Badge} from "primereact/badge";
import ValidatorService from "../../service/ValidatorService";
import {Link, useParams} from "react-router-dom";
import {authenticatedRoutes} from "../../routes/AppRoutes";

const getConversationPartnerNames = partner => {
    if (!partner) {
        return;
    }
    if (partner.chatName) {
        return partner.chatName;
    }
    if (partner.firstName && partner.surName) {
        return `${partner.firstName} ${partner.surName}`;
    }
    return partner.username;
}
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
const ChatConversationsSidebar = () => {
    const {conversationId} = useParams();
    console.log('selected conversation id', conversationId);
    const {conversations, generalErrorList, userInfo} = useChatConversations();
    console.log('conversations@', conversations)
    return (
        <div className="container-fluid ">
            <div className="row"
                 style={{
                     border: '2px solid red',
                 }}
            >
                <div className="col-3" style={{
                    border: '2px solid green',
                }}>
                    <div className="card">

                        <DataScroller
                            value={conversations}
                            inline={true}
                            emptyMessage="There is no conversations yet."
                            itemTemplate={(item) => {
                                return (
                                    < Link to={`${authenticatedRoutes.main.path}/${item.conversationId}`}>
                                        <div
                                            // style={{border: '1px solid blue'}}
                                            className="py-4 col-3 d-inline-block">
                                            <Avatar className="p-overlay-badge"
                                                    image={item.imageUrl ? item.imageUrl : 'https://www.audi.com/content/dam/gbp2/career/2021/diversity/1920x1440-mobile-diversity-audi-inclusion.jpg'}
                                                    imageALt="conversation user profile image" shape="circle"
                                                    size="xlarge">
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
                                            >{getConversationPartnerNames(item)}</div>
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
                            }}
                            rows={conversations.length}
                        />
                    </div>
                </div>
                <div className="col-6" style={{
                    border: '2px solid orange',
                }}>Bla bla
                </div>

                <div className="col-3" style={{
                    border: '2px solid blue',
                }}>Bla bla 22
                </div>
            </div>

            {/*<div className="row"*/}
            {/*     style={{*/}
            {/*    border: '2px solid red',*/}
            {/*}}*/}
            {/*>*/}


            {/*    <div className="card">*/}
            {/*        <DataScroller*/}
            {/*            value={conversations}*/}
            {/*            inline={true}*/}
            {/*            emptyMessage="There is no conversations yet."*/}
            {/*            itemTemplate={(item) => {*/}
            {/*                return (*/}
            {/*                    <div className="conversation-item" style={{*/}
            {/*                        border: '1px solid black',*/}
            {/*                        // display: 'flex', width: '100%'*/}
            {/*                    }*/}
            {/*                    }>*/}
            {/*                        <div*/}
            {/*                            // style={{border: '1px solid blue'}}*/}
            {/*                            className="py-4 col-3 d-inline-block">*/}
            {/*                            <Avatar className="p-overlay-badge"*/}
            {/*                                    image={item.imageUrl ? item.imageUrl : 'https://www.audi.com/content/dam/gbp2/career/2021/diversity/1920x1440-mobile-diversity-audi-inclusion.jpg'}*/}
            {/*                                    imageALt="conversation user profile image" shape="circle" size="xlarge">*/}
            {/*                                <Badge severity={getBadgeSeverityByUserStatus(item)}/>*/}
            {/*                            </Avatar>*/}
            {/*                        </div>*/}
            {/*                        <div className="conversation-details col-9 d-inline-block"*/}
            {/*                            // style={*/}
            {/*                            //     {*/}
            {/*                            //         border: '1px solid blue',*/}
            {/*                            //         // width: '100%'*/}
            {/*                            //     }*/}
            {/*                            // }*/}
            {/*                        >*/}
            {/*                            <div className="partner-name font-weight-bold"*/}
            {/*                                // style={*/}
            {/*                                //     {border: '1px solid blue',}*/}
            {/*                                // }*/}
            {/*                            >{getConversationPartnerNames(item)}</div>*/}
            {/*                            <div className="last-message text-truncate text-"*/}
            {/*                                // style={*/}
            {/*                                //     {*/}
            {/*                                //         border: '1px solid blue',*/}
            {/*                                //     }*/}
            {/*                                // }*/}
            {/*                            >{item.lastMessage}</div>*/}
            {/*                            <div className="last-message-ts text-right"*/}

            {/*                                // style={*/}
            {/*                                //     {border: '1px solid blue'}*/}
            {/*                                // }*/}
            {/*                            >{item.lastMessageTs}</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                );*/}
            {/*            }}*/}
            {/*            rows={conversations.length}*/}
            {/*        />*/}
            {/*    </div>*/}


            {/*</div>*/}
        </div>

    )

};

export default ChatConversationsSidebar;