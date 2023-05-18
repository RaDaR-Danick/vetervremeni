const createOrUpdate = async (model, item, where) => {
    const findOld = await model.findOne({ where })

    if (findOld) {
        return await model.update(item, { where })
    } else {
        return await model.create(item)
    }
}

export { createOrUpdate }