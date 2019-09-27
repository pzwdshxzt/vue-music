

const checkObj = (obj) => {
    return obj === undefined || obj === '' || obj === null || obj ==={} || obj === [] || Object.keys(obj).length === 0
}

export default {
    checkObj
}