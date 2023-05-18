import Switcher from '../UI/switcher'
import ThemeController from '../../controllers/themeController'
import { useSelector } from 'react-redux'

const ThemeSwitcher = () => {
    const theme = useSelector(store => store.theme.value)

    return (
        <Switcher
            value={theme}
            variants={[
                {key: 'light', icon: 'sun'},
                {key: 'dark', icon: 'moon'},
            ]}
            onChange={(newTheme) => {
                ThemeController.setTheme(newTheme)
            }}
        />
    )
}

export default ThemeSwitcher