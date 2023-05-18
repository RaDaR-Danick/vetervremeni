import { dispatchStore } from "../store"
import { setThemeAction } from "../store/themeReducer"

export default class ThemeController {
    static setTheme (theme) {
        const body = document.querySelector('html')

        localStorage.setItem('theme', theme)

        body.classList.remove('light')
        body.classList.remove('dark')
        body.classList.add(theme)

        dispatchStore(setThemeAction(theme))
    }

    static getTheme () {
        return localStorage.getItem('theme') || 'light'
    }
}