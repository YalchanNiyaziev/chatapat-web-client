import useAppLogout from "../../hooks/useAppLogout";
import {Button} from "primereact/button";
import {faPaperclip, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const LogoutItem = () => {
    const {logout} = useAppLogout();

    return (<>
        <Button
            type="button"
            onClick={logout}
            tooltip="logout"
            icon={<FontAwesomeIcon icon={faSignOutAlt} size="2x" style={{color: '#20a8d8'}}/>}
            className="send-btn"

        />
    </>)
}

export default LogoutItem;
