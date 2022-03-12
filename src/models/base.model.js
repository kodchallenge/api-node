const baseModel = {
    createdAt: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Boolean,
        default: true
    },
}

export default baseModel