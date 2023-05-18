export function priceFormate (price) {
    return Number(price).toLocaleString() + ' тг.'
}

export function roundPrice (price) {
    // return Math.ceil(price / 100) * 100
    return Math.ceil(price)
}

export function calcPrice(oldProduct, user, withoutDocuments = false) {
    const product = Object.assign({}, oldProduct)
    
    if(Object.keys(user).length) {
        const {coefficents, discount} = user
        const {brandId} = product
        let percents = 0

        if(coefficents[brandId]) {
            percents = coefficents[brandId].ratio

            if(coefficents[brandId].ratioWithoutDocuments && withoutDocuments) {
                percents = coefficents[brandId].ratioWithoutDocuments
            }
        } else if (discount) {
            percents = discount
        }

        if(percents) {
            const coef = 1 - (percents * 0.01)
            product.oldPrice = product.price
            product.price = roundPrice(coef * product.discountPrice)
        }
    }
    return product
}