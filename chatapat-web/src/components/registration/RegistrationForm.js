import useUserRegistration from "../../hooks/useUserRegistration";
import GeneralMessage from "../commons/GeneralMessage";
import InputControl from "../commons/control/InputControl";
import DatePicker from "../commons/control/DatePicker";
import {Button} from "primereact/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTelegramPlane} from "@fortawesome/free-brands-svg-icons";

const RegistrationForm = props => {
    const {genderOptions, generalErrorList, fieldErrorFor, registerValidationFor, onSubmit, control} = useUserRegistration();
    return (
        <>
            <form noValidate id="registrationForm" onSubmit={onSubmit}>
                <h4 className="text-center">Registration</h4>
                <GeneralMessage className="c-msg" errorList={generalErrorList}/>
                <InputControl
                    error={fieldErrorFor.firstName?.message}
                    registerRef={registerValidationFor.firstName}
                    name="firstName"
                    type="text"
                    placeholder="First name *"
                    id="firstName"
                    label="First name"

                />
                <InputControl
                    error={fieldErrorFor.lastName?.message}
                    registerRef={registerValidationFor.lastName}
                    name="lastName"
                    type="text"
                    placeholder="Last name *"
                    id="lastName"
                    label="Last name"
                />
                <InputControl
                    error={fieldErrorFor.email?.message}
                    registerRef={registerValidationFor.email}
                    name="email"
                    type="email"
                    placeholder="Email *"
                    id="email"
                    label="Email"
                />
                <InputControl
                    error={fieldErrorFor.password?.message}
                    registerRef={registerValidationFor.password}
                    name="password"
                    type="password"
                    placeholder="Password *"
                    id="registrationPassword"
                    label="Password"
                />

                <InputControl
                    error={fieldErrorFor.passwordConfirm?.message}
                    registerRef={registerValidationFor.passwordConfirm}
                    name="passwordConfirm"
                    type="password"
                    placeholder="Confirm password *"
                    id="registrationPasswordConfirm"
                    label="Confirm password"

                />

                <InputControl
                    error={fieldErrorFor.gender?.message}
                    registerRef={registerValidationFor.gender}
                    name="gender"
                    type="select"
                    id="genderSelect"
                    label="Gender"
                    value=""
                    options={genderOptions}
                />

                <InputControl
                    error={fieldErrorFor.birthDate?.message}
                    registerRef={registerValidationFor?.birthDate}
                    control={control}
                    name="birthDate"
                    type="datepicker"
                    label="Birth date"
                    value=""
                />
                <div className="row">
                    <div className={'col-12 d-flex align-items-center justify-content-end'}>
                        <button className="btn w-100 btn-info " type="submit">
                            Register
                        </button>
                    </div>
                </div>

            </form>
        </>
    )
};

export default RegistrationForm;
