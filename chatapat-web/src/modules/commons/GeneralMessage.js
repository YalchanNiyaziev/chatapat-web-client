import { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';

const GeneralMessage = ({
                            className,
                            errorList,
                            successMessage,
                            sticky = false,
                            focusOnErrorRef,
                        }) => {
    const messageRef = useRef(null);

    useEffect(() => {
        if (messageRef.current && errorList) {
            if (errorList.length > 0) {
                messageRef.current.show(
                    errorList.map(err => {
                        return {
                            sticky,
                            severity: 'error',
                            summary: err,
                            closable: false,
                        };
                    })
                );
                if (focusOnErrorRef && focusOnErrorRef.current) {
                    focusOnErrorRef.current.focus();
                }
            } else {
                messageRef.current.clear();
            }
        }
    }, [errorList, focusOnErrorRef, sticky]);

    useEffect(() => {
        if (messageRef.current && successMessage) {
            messageRef.current.show({
                sticky,
                severity: 'success',
                summary: successMessage.success,
                closable: false,
            });
        }
    }, [sticky, successMessage]);

    return <Toast ref={messageRef} position="top-right" className={className} />;
};

export default GeneralMessage;