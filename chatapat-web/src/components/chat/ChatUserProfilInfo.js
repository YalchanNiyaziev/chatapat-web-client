import {Avatar} from "primereact/avatar";
import useUserProfileInfo from "../../hooks/useUserProfileInfo";

const ChatUserProfileInfo = props => {
    const {userProfileInfo, generalErrorList, } = useUserProfileInfo();
    console.log('userInfo3', userProfileInfo);


    return (
        <div className="float-left d-flex" style={{ border: '1px solid black'}}>
            <div className="py-2" style={{ border: '1px solid red'}}>
                <Avatar
                    image={userProfileInfo && userProfileInfo.picture? userProfileInfo.picture: ''}
                    imageALt="user profile image" shape="circle"
                    size="xlarge"
                    className="mx-2"
                />
            </div>
            <div className="h4 py-4 px-3 " style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap', border: '1px solid green'}}>{`${userProfileInfo && userProfileInfo.firstName? userProfileInfo.firstName: ''} ${userProfileInfo && userProfileInfo.lastname? userProfileInfo.lastname: ''}`}</div>
            {/*<div style={{fontSize: '0.5rem', border: '1px solid green'}} c><i className="fa fa-ellipsis-v fa-4x float-right"></i></div>*/}
        </div>
    );
};

export default ChatUserProfileInfo;