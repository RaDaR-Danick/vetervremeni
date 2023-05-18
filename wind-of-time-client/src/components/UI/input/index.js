import { useState } from 'react'
import { emailValidation, nameValidation, passwordValidation, confirmPasswordValidation, phoneValidation } from '../../../utils/validation'
import c from './styles.module.scss'
import { v4 } from 'uuid'
import { IMaskInput } from 'react-imask'

const Input = (props) => {
    const options = {
        classes: [c.input],
        wrapperClasses: [c.wrapper],
        onChange: null,
        id: v4(),
        readOnly: false
    }
    const {
        size = 'normal',
        value = '',
        onChange = null,
        onBlur = null,
        placeholder = '',
        type = 'text',
        disabled = false,
        icon = '',
        btn = null,
        validation = null,
        description = '',
        readOnly = false,
        required = false,
        mask = null,
        center = false,
        label = '',
        name = ''
    } = props
    const [error, setError] = useState(props.error || false)
    const [errorMessage, setErrorMessage] = useState(props.errorMessage || '')
    const iconElement = icon ? <span className={[c.icon, c['__' + size], 'icon-' + icon].join(' ')}></span> : null
    options.classes.push(c[size])

    options.readOnly = readOnly
    options.required = required
    options.label = label

    if(error) {
        options.classes.push(c.error)
    }

    if(center) {
        options.classes.push(c.center)
    }

    if(validation) {
        const {type, password, onChange} = validation
        
        if(type === 'email') {
            options.onChange = (e) => {
                emailValidation(e.target.value, setError, setErrorMessage, onChange)
            }
        } else if (type === 'password') {
            options.onChange = (e) => {
                passwordValidation(e.target.value, setError, setErrorMessage, onChange)
            }
        } else if (type === 'confirmPassword') {
            options.onChange = (e) => {
                confirmPasswordValidation(e.target.value, password, setError, setErrorMessage, onChange)
            }
        } else if (type === 'name') {
            options.onChange = (e) => {
                nameValidation(e.target.value, setError, setErrorMessage, onChange)
            }
        } else if (type === 'phone') {
            options.onChange = (e) => {
                phoneValidation(e.target.value, setError, setErrorMessage, onChange)
            }
        }
    }

    const args = {
        type,
        placeholder,
        value,
        onChange: (e) => {
            if(onChange)
                onChange(e)
            
            if(options.onChange)
                options.onChange(e)
        },
        onBlur,
        className: options.classes.join(' '),
        disabled,
        id: options.id,
        readOnly: options.readOnly,
        required: options.required,
        name
    }

    return (
        <div className={c.formGroup}>
            {options.label ? <label className={c.label} htmlFor={options.id}>{options.label}{options.required ? <span className={c.mark}>*</span> : null}</label> : null}
            <div className={options.wrapperClasses.join(' ')}>
                {iconElement}
                { mask ? <IMaskInput {...mask} {...args}/> : <input {...args}/> }
                {btn ? <div className={c.btn}>{btn}</div> : null}
            </div>
            {error && errorMessage ? <div className={[c.errorMessage, 'icon-error'].join(' ')}>{errorMessage}</div> : null}
            {description ? <div className={[c.description, 'icon-warning'].join(' ')}>{description}</div> : null}
        </div>
    )
}

export default Input