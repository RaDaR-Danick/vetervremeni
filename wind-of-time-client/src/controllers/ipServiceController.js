import IpService from "../service/IpService"

export default class IpServiceController {
    static async check(ip = '') {
        const check = await IpService.check(ip)
        return check
    }
}