import {Checkbox} from "primereact/checkbox";
import {Controller} from 'react-hook-form';
import {Tooltip} from "primereact/tooltip";
import {InputSwitch} from 'primereact/inputswitch';
import {FileUpload} from 'primereact/fileupload';
import './InputControl.css';


const InputControl = props => {

    const innerSubmit =
            props.innerSubmitLabel && props.onInnerSubmit ? (
                <button className="inner-submit" onClick={props.onInnerSubmit}>
                    {props.innerSubmitLabel}
                </button>
            ) : null,
        hasInnerSubmit = props.innerSubmitLabel && props.onInnerSubmit;

    let inputElement = null;
  let  inputClasses = props.error ? ' invalid-input' : '';

    switch (props.type) {
        case 'text':
        case 'username':
        case 'password':
        case 'number':
        case 'email':
            inputElement = (
                <input
                    {...props.elementConfig}
                    id={props.id}
                    disabled={props.disabled}
                    className={'form-control' + inputClasses}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    type={props.type}
                    placeholder={props.placeholder}
                    ref={props.registerRef && props.registerRef()}
                    name={props.name}
                    defaultValue={props.value}
                    min={props.min}
                    max={props.max}
                />
            );
            break;
        case 'checkbox':
            inputElement = (
                <Controller
                    defaultValue={props.value || false}
                    control={props.control}
                    name={props.name}
                    rules={props.registerRef()}
                    render={({onChange, onBlur, value, name}) => (
                        <Checkbox
                            className="c-check"
                            onBlur={onBlur}
                            onChange={e => {
                                if (props.onChange) {
                                    props.onChange(e);
                                }
                                onChange(e.target.checked);
                            }}
                            checked={props.value || false}
                            name={name}
                        />
                    )}
                />
            );
            break;
        case 'textarea':
            inputElement = (
                <textarea
                    {...props.elementConfig}
                    id={props.id}
                    disabled={props.disabled}
                    className={'form-control' + inputClasses}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    placeholder={props.placeholder}
                    ref={props.registerRef && props.registerRef()}
                    name={props.name}
                    defaultValue={props.value}
                />
            );
            break;
        case 'select':
            inputElement = (
                <select
                    {...props.elementConfig}
                    id={props.id}
                    disabled={props.disabled}
                    className={'form-control trunkate' + inputClasses}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    ref={props.registerRef && props.registerRef()}
                    name={props.name}
                    defaultValue={props.value}
                    size={props.size}
                >
                    <option value="" disabled>
                        Select your option
                    </option>
                    {props.options && props.options.length ? (
                        props.options.map((option, index) => (
                            <option value={option.value} key={index}>
                                {option.label}
                            </option>
                        ))
                    ) : (
                        <option>Empty results</option>
                    )}
                </select>
            );
            break;
        case 'inputswitch':
            inputElement = (
                <Controller
                    defaultValue={props.value || false}
                    control={props.control}
                    name={props.name}
                    render={({onChange, onBlur, value, name}) => (
                        <InputSwitch
                            checked={props.value}
                            onBlur={onBlur}
                            onChange={e => {
                                if (props.onChange) {
                                    props.onChange(e);
                                }
                                onChange(e.target.value);
                            }}
                        />
                    )}
                />
            );
            break;
        case 'fileupload':
            inputElement = (
                <Controller
                    control={props.control}
                    name={props.name}
                    render={({onChange, onBlur, value, name}) => (
                        <FileUpload
                            label={props.label}
                            fileLimit={1}
                            uploadHandler={e => {
                                if (props.uploadHandler) {
                                    props.uploadHandler(e);
                                }
                            }}
                            customUpload={true}
                            accept={props.accept}
                            auto={props.auto}
                            emptyTemplate={props.emptyTemplate}
                        />
                    )}
                />
            );
            break;
        default:
            inputElement = (
                <input
                    {...props.elementConfig}
                    className={'form-control' + inputClasses}
                    value={props.value}
                    id={props.id}
                    onChange={props.changed}
                    ref={props.registerRef && props.registerRef()}
                    defaultValue={props.value}
                    name={props.name}
                />
            );
    }
    let control = (
        <div className={`form-control-block ${hasInnerSubmit ? 'has-inner-submit' : ''}`}>
            {props.label ? (
                <label className={props.labelClass} htmlFor="">
                    {props.label}&nbsp;
                    {props.info ? (
                        <>
                            <span data-pr-tooltip={props.info} className="label-info">
                                <i className="fa fa-info" aria-hidden="true"></i>
                            </span>
                            <Tooltip target={`.label-info`}/>
                        </>
                    ) : null}
                </label>
            ) : null}
            {inputElement}
            {innerSubmit}
            {props.error ? <p className="error-message">{props.error}</p> : null}
        </div>
    );

    if (props.inLabel) {
        let labelClasses =
            (props.labelClass ? props.labelClass : '') +
            (props.error ? ' error-label-color' : '') +
            (props.type === 'checkbox' ? ' checkbox-label' : '');
        control = (
            <label className={labelClasses}>
                {inputElement}
                {props.label}
            </label>
        );
    }

    return control;
};

export default InputControl;