import c from './styles.module.scss'

const Spinner = ({size = 'primary', padding = false}) => {
    return (
        <div className={[c.spinner, c[size], padding ? c.padding : null].join(' ')}>
            <div className={c.inner}></div>
        </div>
    )
}

export default Spinner