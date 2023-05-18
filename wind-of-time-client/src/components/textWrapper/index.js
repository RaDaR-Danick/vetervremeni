import c from './styles.module.scss'

const TextWrapper = ({children}) => {
    return (
        <div className={c.textWrapper}>{children}</div>
    )
}

export default TextWrapper