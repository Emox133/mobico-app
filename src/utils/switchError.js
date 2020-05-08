export const switchError = (obj, start) => {
    let condition = typeof Object.values(obj)[0] === 'string' && Object.values(obj)[0].startsWith(start) ? true : false

    // console.log('switch Error')
    return condition
};