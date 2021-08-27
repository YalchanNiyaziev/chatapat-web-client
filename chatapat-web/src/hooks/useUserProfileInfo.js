import {useEffect, useMemo, useState} from "react";
import ApiRequest from "../http/ApiRequest";
import AuthService from "../service/AuthService";
import axiosErrorHandler from "../http/AxiosErrorHandler";

const useUserProfileInfo = props => {
    const api = useMemo( () => new ApiRequest(), []);
    const authService = useMemo(() => new AuthService(), []);
    const [generalErrorList, setGeneralErrorList] = useState([]);
    const [userProfileInfo, setUserProfileInfo] = useState(null);


    useEffect(() => {
        // TODO use REDUX instead
        const username = authService.getUsername();

        api.getUserProfileInfo(username)
            .then(res => {
                console.log(res);
                if(res.data) {
                    const data = res.data;
                    const profileInfo = {
                        id: data.id,
                        username: data.username,
                        chatName: data.chatName,
                        firstName: data.firstName,
                        lastname: data.lastname,
                        birthDate: data.birthDate,
                        gender: data.gender,
                        status: data.status,
                        picture: data.picture,
                        locked: data.locked,
                        closed: data.closed,
                        address: data.address,
                    }
                    setUserProfileInfo(profileInfo);
                    // TODO use REDUX
                    authService.storeProfileImage(profileInfo.picture);
                }

            })
            .catch(err => {
                const [errorList] = axiosErrorHandler(err);
                setGeneralErrorList(errorList);})
        return () => {
            setGeneralErrorList([]);
            setUserProfileInfo(null);
        }
    } , [api, authService]);
    return {
        userProfileInfo,
        generalErrorList,
    };
};

export default useUserProfileInfo;