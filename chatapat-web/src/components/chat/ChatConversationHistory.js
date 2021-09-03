import './ChatMainStyles.css';

const ChatConversationHistory = props => {

    
    console.log("my messages#", props.messages);
    //TODO make check for message type, for now only support TEXT messages
    const displayMessages = (messages, sendByConversationPartnerCallback)=> {
        const formattedMessages = messages.map((m, index) => {
            if(sendByConversationPartnerCallback(m)) {
                return(
                    <div className="row bg-blue my-1 px-2" key={index} style={{minHeight: '2rem'}}>
                        {}
                        <div className="bg-red" style={{maxWidth: '20rem', height: '100%'}}>{m.content}</div>
                    </div>
                );
            } else {
                return (
                    <div className="row bg-orange my-1 justify-content-end pr-2" key={index} style={{minHeight: '2rem'}}>
                        <div className="bg-pink " style={{maxWidth: '20rem', height: '100%'}}>{m.content}</div>
                    </div>
                );
            }

        });
        return (
            <>
                {formattedMessages}
            </>
        )
    };


    return (
        <div ref={props.bottomScrollElement}
            className="container-fluid"
             style={{border: '1px solid black'}}>
            {displayMessages(props.messages, props.isConversationPartnerMessage)}
            <div />
        </div>
    );

    // const messageDataScrollerItemTemplate = item => {
    //     console('item template %', item);
    //     if(isConversationPartnerMessage(item)) {
    //         return(
    //             <div className="bg-blue">
    //                 {item.content}
    //             </div>
    //         );
    //     } else {
    //         return (
    //             <div className="bg-orange justify-content-end">
    //                 {item.content}
    //             </div>
    //         );
    //     }
    // }
    //
    //
    // return (
    //     // <div className="container-fluid"
    //     //      style={{border: '1px solid black'}}>
    //     <>
    //         <DataScroller
    //             value={messages}
    //             inline={true}
    //             emptyMessage="Welcome to CHATAPAT. Search users and type them."
    //             itemTemplate={messageDataScrollerItemTemplate}
    //             rows={messages.length}
    //         />
    //         {/*{displayMessages(messages, isConversationPartnerMessage)}*/}
    //     </>
    //     // </div>
    // );

};

export default ChatConversationHistory;