import {useState} from "react";

const useFormLogin = props => {
    const [generalErrorList, setGeneralErrorList] = useState([]);

    const onSubmit = () => {

    }

    return {
        onSubmit: onSubmit,
        generalErrorList: generalErrorList,
    };
};

export default useFormLogin;