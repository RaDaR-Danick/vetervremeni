import { replaceAll } from "./string"

export function emailValidation(value, setError, setErrorMessage, onChange) {
    if(value) {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const check = regex.test(value)
        
        if(check) {
            onChange(false)
            setError(false)
            setErrorMessage('')
        } else {
            onChange(true)
            setError(true)
            setErrorMessage('Email невалиден')
        }

    } else {
        onChange(true)
        setError(true)
        setErrorMessage('Email не должен быть пустым')
    }
}

export function passwordValidation(value, setError, setErrorMessage, onChange) {
    if(value) {
        const regex = /(?=.*\d)(?=.*[a-z]).{8,32}/
        const check = regex.test(value)
        
        if(check) {
            onChange(false)
            setError(false)
            setErrorMessage('')
        } else {
            onChange(true)
            setError(true)
            setErrorMessage('Пароль невалиден')
        }

    } else {
        onChange(true)
        setError(true)
        setErrorMessage('Пароль не должен быть пустым')
    }
}

export function confirmPasswordValidation(value, password, setError, setErrorMessage, onChange) {
    if(value) {
        const regex = /(?=.*\d)(?=.*[a-z]).{8,32}/
        const check = regex.test(value)
        const same = value === password
        
        if(check && same) {
            onChange(false)
            setError(false)
            setErrorMessage('')
        } else if (!same) {
            onChange(true)
            setError(true)
            setErrorMessage('Пароли не совпадают')
        } else {
            onChange(true)
            setError(true)
            setErrorMessage('Пароль невалиден')
        }

    } else {
        onChange(true)
        setError(true)
        setErrorMessage('Пароль не должен быть пустым')
    }
}

export function phoneValidation(value, setError, setErrorMessage, onChange) {
    if(value) {
        const regex = /^[0-9 \-\(\)+]+$/u
        const check = regex.test(value)
        const numbersLength = replaceAll(value, /[^0-9]/gm, '').length
        
        if(check && numbersLength === 11) {
            onChange(false)
            setError(false)
            setErrorMessage('')
        } else {
            onChange(true)
            setError(true)
            setErrorMessage('Номер введен невалидно')
        }

    } else {
        onChange(true)
        setError(true)
        setErrorMessage('Номер не должен быть пустым')
    }
}

export function nameValidation(value, setError, setErrorMessage, onChange) {
    if(value) {
        const regex = /^[a-zA-Zа-яА-ЯàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
        const check = regex.test(value)
        
        if(check) {
            onChange(false)
            setError(false)
            setErrorMessage('')
        } else {
            onChange(true)
            setError(true)
            setErrorMessage('Имя введено невалидно')
        }

    } else {
        onChange(true)
        setError(true)
        setErrorMessage('Имя не должно быть пустым')
    }
}