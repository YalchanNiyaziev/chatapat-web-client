import InputControl from "../commons/control/InputControl";

const ChatUserConnectionSearch = props => {
    return(
        // <div className="col">
            <form noValidate id="searchUserConnectionForm">
                <InputControl
                // error={fieldErrorFor.searchConnection?.message}
                // registerRef={registerValidationFor.searchConnection}
                id="searchConnection"
                name="searchConnection"
                type="text"
                placeholder="Search..."
                />
                {/*<Button*/}
                {/*type="button"*/}
                {/*onClick={() => {}}*/}
                {/*icon='fa fa-search'*/}
                {/*tooltip="Search"*/}
                {/*tooltipOptions={{position: 'top'}}*/}
                {/*/>*/}
            </form>
        // </div>
    );
};

export default ChatUserConnectionSearch;