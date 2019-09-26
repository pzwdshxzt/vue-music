

const checkObj = (obj) => {
    return obj === undefined || obj === '' || obj === null || obj ==={} || obj === []
}

module.exports = {
    checkObj
}