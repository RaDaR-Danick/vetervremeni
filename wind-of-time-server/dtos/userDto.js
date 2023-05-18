export default class UserDto {
    id
    email
    isActivated

    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.email = model.email
        this.role = model.role
        this.discount = model.discount
        this.isActivated = model.isActivated
        this.wholesaler = false
        this.coefficents = {}

        if(model.user_discounts && model.user_discounts.length) {
            model.user_discounts.forEach(item => {
                this.coefficents[item.brandId] = {brandId: item.brandId, ratio: item.ratio, ratioWithoutDocuments: item.ratioWithoutDocuments}
            })
            this.wholesaler = true
        }
    }
}