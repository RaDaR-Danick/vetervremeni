import c from './styles.module.scss'
import { v4 } from 'uuid'
import { useState } from 'react'
import Notranslate from '../../notranslate'

const Checkbox = ({checked = false, label = null, onChange = null, required = false, error = false, children}) => {
    const id = v4()
    const [isChecked, setIsChecked] = useState(checked)

    return (
        <div className={c.wrapper}>
            <div className={[c.checkbox, error ? c.error : null].join(' ')}>
                <input type="checkbox"
                    id={id}
                    checked={isChecked}
                    onChange={(e) => {
                        setIsChecked(!isChecked)
                        if(onChange) {
                            onChange(!isChecked)
                        }
                    }}
                    required={required}
                />
                <label htmlFor={id} className="icon-check"></label>
            </div>
            {label || children ? <label htmlFor={id} className={c.label}>{label}<Notranslate>{children}</Notranslate></label> : null}
        </div>
    )
}

export default Checkbox