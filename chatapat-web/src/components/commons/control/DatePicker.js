import { Calendar } from 'primereact/calendar';
import { Tooltip } from 'primereact/tooltip';
import React from 'react';
import { Controller } from 'react-hook-form';

const DatePicker = ({
                        error,
                        label,
                        info,
                        labelClass,
                        defaultValue,
                        name,
                        control,
                        registerRef,
                        beforeOnChange,
                        disabled,
                    }) => {
    return (
        <Controller
            defaultValue={defaultValue || null}
            control={control}
            name={name}
            rules={registerRef ? registerRef() : null}
            render={({ onChange, value }) => (
                <div className={`form-control-block`}>
                    {label ? (
                        <label className={labelClass} htmlFor="">
                            {label}&nbsp;
                            {info ? (
                                <>
                                    <span data-pr-tooltip={info} className="label-info">
                                        <i className="fa fa-info" aria-hidden="true"></i>
                                    </span>
                                    <Tooltip target={`.label-info`} />
                                </>
                            ) : null}
                        </label>
                    ) : null}
                    <Calendar
                        dateFormat={'yy-mm-dd'}
                        inputClassName={`${error ? 'invalid-input' : ''}`}
                        value={value}
                        onChange={e => {
                            if (beforeOnChange) {
                                beforeOnChange(e);
                            }
                            onChange(e.target.value);
                        }}
                        showIcon
                        icon="pi pi-clock"
                        disabled={typeof disabled === 'boolean' ? disabled : false}
                    />
                    {error ? <p className="error-message">{error}</p> : null}
                </div>
            )}
        />
    );
};

export default DatePicker;
