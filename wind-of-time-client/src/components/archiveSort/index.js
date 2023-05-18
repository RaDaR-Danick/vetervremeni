import c from './styles.module.scss'
import Select from '../UI/select'
import Button from '../UI/button'

const ArchiveSort = ({ sort, setSort, setShow }) => {
    const options = [
        {
            value: '',
            text: 'По умолчанию'
        },
        {
            value: 'price_asc',
            text: 'Цена по возрастанию'
        },
        {
            value: 'price_desc',
            text: 'Цена по убыванию'
        }
    ]

    return (
        <div className={c.archiveSort}>
            <div className={[c.item, c.select].join(' ')}>
                <Select value={sort} items={options} onChange={(value) => {
                    localStorage.setItem('sort', value)
                    setSort(value)
                }} />
            </div>
            <div className={[c.item, c.button].join(' ')}>
                <Button text="Фильтры" full={true} beforeIcon="filters" onClick={() => setShow(true)} />
            </div>
        </div>
    )
}

export default ArchiveSort