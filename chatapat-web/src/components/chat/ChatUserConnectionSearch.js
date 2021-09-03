import InputControl from "../commons/control/InputControl";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {DataScroller} from "primereact/datascroller";
import './ChatMainStyles.css';
import {Avatar} from "primereact/avatar";
import {Badge} from "primereact/badge";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCheck, faUserFriends, faUserMinus, faUserPlus, faUserTimes} from "@fortawesome/free-solid-svg-icons";

const ChatUserConnectionSearch = props => {
    const {
        showSearchConnectionDialog,
        closeSearchConnectionDialog,
        fieldErrorFor,
        registerValidationFor,
        onSubmit,
        onUserDetailsShow,
        onSendConnectionRequest,
        onAcceptConnectionRequest,
        onRejectConnectionRequest,
        onRemoveUserConnection,
        onBlockConnection,
        searchResults,
    } = props;

    const connectionStatus = {
        currentAccount: 'Me',
        connectedAccount: 'Connected',
        unconnectedAccount: 'Unconnected',
        connectionRequested: 'Awaiting for accepting'

    }
    const getConnectionStatus = connection => {
        console.log("CONNECTION", connection)
        if (connection.self && !connection.connectionRequested && !connection.connected) {
            return connectionStatus.currentAccount;
        } else if (connection.connected && !connection.self && !connection.connectionRequested) {
            return connectionStatus.connectedAccount;
        } else if (connection.connectionRequested && !connection.self && !connection.connected) {
            return connectionStatus.connectionRequested;
        } else if (!connection.self && !connection.connected && !connection.connectionRequested) {
            return connectionStatus.unconnectedAccount;
        } else {
            return '';
        }
    }

    const buttonContent = connection => {
        const status = getConnectionStatus(connection);
        switch (status) {
            case connectionStatus.currentAccount: {
                return (<>
                    <div className="float-right pt-1">
                        <Button
                            className="p-button-raised p-button-info"
                            icon="fa fa-info-circle"
                            tooltip="Show info"
                            tooltipOptions={{position: 'bottom'}}
                            onClick={() => onUserDetailsShow(connection.username)}
                        />
                    </div>
                </>);
            }
            case connectionStatus.connectedAccount: {
                return (<>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col-3" style={{border: "1px solid purple"}}>
                                <Button
                                    className="p-button-raised"
                                    icon={<FontAwesomeIcon icon={faUserMinus}/>}
                                    tooltip="Remove"
                                    tooltipOptions={{position: 'bottom'}}
                                    onClick={() => onRemoveUserConnection(connection.username)}
                                    style={{color: 'white', backgroundColor: 'darkorange', border: '1px solid darkorange'}}
                                />
                            </div>

                            <div className="col-3" style={{border: "1px solid purple"}}>
                                <Button
                                    className="p-button-raised p-button-danger"
                                    icon="fa fa-ban"
                                    tooltip="Block"
                                    tooltipOptions={{position: 'bottom'}}
                                    onClick={() => onBlockConnection(connection.username)}
                                />
                            </div>

                            <div className="col-3" style={{border: "1px solid purple"}}>
                                <Button
                                    className="p-button-raised p-button-info"

                                    icon="fa fa-info-circle"
                                    tooltip="Show info"
                                    tooltipOptions={{position: 'bottom'}}
                                    onClick={() => onUserDetailsShow(connection.username)}
                                />
                            </div>

                        </div>
                    </div>
                </>);
            }
            case connectionStatus.unconnectedAccount: {
                return (<>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col-3" style={{border: "1px solid purple"}}>
                                <Button
                                    className="p-button-raised p-button-success"
                                    icon={<FontAwesomeIcon icon={faUserPlus}/>}
                                    tooltip="Add"
                                    tooltipOptions={{position: 'bottom'}}
                                    onClick={() => onSendConnectionRequest(connection.username)}
                                />
                            </div>

                            <div className="col-3" style={{border: "1px solid purple"}}>
                                <Button
                                    className="p-button-raised p-button-danger"
                                    icon="fa fa-ban"
                                    tooltip="Block"
                                    tooltipOptions={{position: 'bottom'}}
                                    onClick={() => onBlockConnection(connection.username)}
                                />
                            </div>

                            <div className="col-3" style={{border: "1px solid purple"}}>
                                <Button
                                    className="p-button-raised p-button-info"

                                    icon="fa fa-info-circle"
                                    tooltip="Show info"
                                    tooltipOptions={{position: 'bottom'}}
                                    onClick={() => onUserDetailsShow(connection.username)}
                                />
                            </div>

                        </div>
                    </div>
                </>);
            }
            case connectionStatus.connectionRequested: {
                return (<>

                    <div className="container-fluid">
                        <div className="row">

                            <div className="col-3" style={{border: "1px solid purple"}}>
                                <Button
                                    className="p-button-raised"
                                    icon={<FontAwesomeIcon icon={faUserCheck}/>}
                                    tooltip="Accept"
                                    tooltipOptions={{position: 'bottom'}}
                                    onClick={() => onAcceptConnectionRequest(connection.username)}
                                    style={{color: 'white', backgroundColor: '#1171e0', border: '1px solid #ffba01'}}
                                />
                            </div>
                            <div className="col-3" style={{border: "1px solid purple"}}>
                                <Button
                                    className="p-button-raised"
                                    icon={<FontAwesomeIcon icon={faUserTimes}/>}
                                    tooltip="Reject"
                                    tooltipOptions={{position: 'bottom'}}
                                    onClick={() => onRejectConnectionRequest(connection.username)}
                                    style={{color: 'white', backgroundColor: '#ff5302', border: '1px solid #ffba01'}}

                                />
                            </div>


                            <div className="col-3" style={{border: "1px solid purple"}}>
                                <Button
                                    className="p-button-raised p-button-danger"
                                    icon="fa fa-ban"
                                    tooltip="Block"
                                    tooltipOptions={{position: 'bottom'}}
                                    onClick={() => onBlockConnection(connection.username)}
                                />
                            </div>

                            <div className="col-3" style={{border: "1px solid purple"}}>
                                <Button
                                    className="p-button-raised p-button-info"

                                    icon="fa fa-info-circle"
                                    tooltip="Show info"
                                    tooltipOptions={{position: 'bottom'}}
                                    onClick={() => onUserDetailsShow(connection.username)}
                                />
                            </div>

                        </div>
                    </div>
                </>);
            }
        }

    }

    const dataScrollerItemTemplate = item => {
        return (
            <div style={{border: '2px solid purple'}} className=" container-fluid">
                <div className="row p-1">
                    <div style={{border: '1px solid red'}} className="col-2">
                        <Avatar
                            image={item.picture ? item.picture : 'https://www.audi.com/content/dam/gbp2/career/2021/diversity/1920x1440-mobile-diversity-audi-inclusion.jpg'}
                            imageALt="user connection profile image"
                            shape="circle"
                            size="xlarge"
                        />
                    </div>

                    <div style={{border: '1px solid green'}} className="col-5">
                        <div className="font-weight-bold text-dark"
                             style={{border: '1px solid orange', wordBreak: 'break-all', whiteSpace: 'pre-wrap',}}>
                            {`${item.firstName} ${item.lastName}`}
                        </div>
                        <div className="font-xs" style={{border: '1px solid darkblue'}}>
                            {getConnectionStatus(item)}
                        </div>
                    </div>

                    <div style={{border: '1px solid blue'}} className="col-5 pt-1">
                        {buttonContent(item)}
                    </div>
                </div>
            </div>
        );
    }
    return (<>
            <Dialog
                modal={false}
                visible={showSearchConnectionDialog}
                // visible={true}
                header="Search user connections"
                style={{
                    width: '65%',
                    // maxHeight: '70%',
                    // height: '100%'
                }}
                onHide={closeSearchConnectionDialog}
                // contentStyle={{
                // border: '2px solid red',
                // maxHeight: '70%'
                // }}
                contentClassName="row"
                className="container-fluid d-flex"

            >
                <div style={{border: '2px solid blue'}} className="col-4 py-2">
                    <form noValidate id="searchUserConnectionForm"
                          onSubmit={onSubmit}>
                        <InputControl
                            error={fieldErrorFor.searchByUsername?.message}
                            registerRef={registerValidationFor.searchByUsername}
                            id="searchByUsername"
                            name="searchByUsername"
                            type="text"
                            placeholder="Username"
                        />
                        <InputControl
                            error={fieldErrorFor.searchByFirstName?.message}
                            registerRef={registerValidationFor.searchByFirstName}
                            id="searchByFirstName"
                            name="searchByFirstName"
                            type="text"
                            placeholder="First name"
                        />

                        <InputControl
                            error={fieldErrorFor.searchByLastName?.message}
                            registerRef={registerValidationFor.searchByLastName}
                            id="searchByLastName"
                            name="searchByLastName"
                            type="text"
                            placeholder="Last name"
                        />
                        <InputControl
                            error={fieldErrorFor.searchByChatName?.message}
                            registerRef={registerValidationFor.searchByChatName}
                            id="searchByChatName"
                            name="searchByChatName"
                            type="text"
                            placeholder="Chat name"
                        />
                        <InputControl
                            error={fieldErrorFor.searchByCountry?.message}
                            registerRef={registerValidationFor.searchByCountry}
                            id="searchByCountry"
                            name="searchByCountry"
                            type="text"
                            placeholder="Country"
                        />
                        <InputControl
                            error={fieldErrorFor.searchByCity?.message}
                            registerRef={registerValidationFor.searchByCity}
                            id="searchByCity"
                            name="searchByCity"
                            type="text"
                            placeholder="City"
                        />
                        <div>
                            <Button
                                type="submit"
                                icon='fa fa-search'
                                label="Search"
                                className="p-button-sm w-100"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-8" style={{
                    // border: '2px solid green',
                    height: '70vh',
                    overflow: 'hidden',
                    overflowY: 'scroll',
                    // textAlign: 'center',
                }}>

                    <DataScroller

                        header="List of user connections"
                        value={searchResults}
                        inline={true}
                        emptyMessage="Search results will display here"
                        itemTemplate={dataScrollerItemTemplate}
                        rows={searchResults.length}
                    />
                </div>
            </Dialog>
            {/*<div className="col">*/}

            {/*</div>*/}
        </>
    );
};

export default ChatUserConnectionSearch;