import c from './styles.module.scss'

const Container = ({children}) => {
    return (
        <div className={c.container}>{children}</div>
    )
}

export default Container