import { v4 } from "uuid"
import { dispatchStore } from "../store"
import { addNotifAction, closeNotifAction } from "../store/notifReducer"

export default class NotifController {
    static async addNotif(data) {
        const { timer = 3000 } = data
        const id = v4()
        data.id = id

        await dispatchStore(addNotifAction(data))

        setTimeout(() => {
            dispatchStore(closeNotifAction(id))
        }, timer)
    }

    static async closeNotif(id) {
        await dispatchStore(closeNotifAction(id))
    }
}