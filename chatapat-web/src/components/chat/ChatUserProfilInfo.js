import {Avatar} from "primereact/avatar";

const ChatUserProfileInfo = props => {
    return (
        <div className="float-left d-flex" style={{ border: '1px solid black'}}>
            <div className="py-2" style={{ border: '1px solid red'}}>
                <Avatar
                    image='https://www.audi.com/content/dam/gbp2/career/2021/diversity/1920x1440-mobile-diversity-audi-inclusion.jpg'
                    imageALt="conversation user profile image" shape="circle"
                    size="xlarge"
                    className="mx-2"
                />
            </div>
            <div className="h4 py-4 px-3 " style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap', border: '1px solid green'}}>Ya sdsd sdadasdasda dsdsd sdddd dfsgg  sdfsd s  wefewfwef sdasfasv</div>
            {/*<div style={{fontSize: '0.5rem', border: '1px solid green'}} c><i className="fa fa-ellipsis-v fa-4x float-right"></i></div>*/}
        </div>
    );
};

export default ChatUserProfileInfo;