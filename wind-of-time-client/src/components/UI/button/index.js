import c from './styles.module.scss'
import { forwardRef } from 'react'
import { NavLink } from 'react-router-dom'

const Inner = (props) => {
    const {classes = [], inner = '', beforeIcon = '', afterIcon = '', icon = ''} = props

    if(icon) {
        classes.push('icon-' + icon)
    }
    
    let before
    let after

    if(beforeIcon) {
        before = <span className={c.beforeIcon + ' ' + 'icon-' + beforeIcon}></span>
    }

    if(afterIcon) {
        after = <span className={c.afterIcon + ' ' + 'icon-' + afterIcon}></span>
    }

    const element = <span className={classes.join(' ')}>{before}{inner}{after}</span>

    return element
}

const Button = forwardRef((props, ref) => {
    const options = {
        classes: [c.btn],
        inner: null,
        innerClasses: [],
        node: 'button',
    }
    const {
        text = '',
        btnStyle = 'primary',
        size = 'normal',
        onClick = null,
        disabled = false,
        beforeIcon = '',
        afterIcon = '',
        icon = '',
        link = '',
        full = false,
        loading = false,
        color = 'primary',
        externalLink = ''
    } = props

    if(full) {
        options.classes.push(c.full)
    }
    
    options.onClick = onClick
    
    if(text) {
        options.innerClasses.push(c.text)
    }
    
    if(icon) {
        options.innerClasses.push(c.icon)
    }

    if(loading) {
        options.classes.push(c.loading)
    }

    options.inner = <Inner classes={options.innerClasses} inner={text} beforeIcon={beforeIcon} afterIcon={afterIcon} icon={icon}/>
    options.classes.push(c[size])
    options.classes.push(c[btnStyle])

    const attrs = {
        ref: ref,
        className: options.classes.join(' '),
        onClick: options.onClick,
        disabled: disabled || loading ? true : false,
        color: color
    }

    if(link) {
        attrs.to = link
        attrs.end = true

        return <NavLink {...attrs}>{loading ? <span className={c.spinner}></span> : null}{options.inner}</NavLink>
    } else if (externalLink) {
        attrs.href = externalLink
        attrs.target = '_blank'

        return <a {...attrs}>{loading ? <span className={c.spinner}></span> : null}{options.inner}</a>
    } else {
        return <button {...attrs}>{loading ? <span className={c.spinner}></span> : null}{options.inner}</button>
    }
})

export default Button