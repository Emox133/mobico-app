export const switchError = (obj, start) => {
    let condition = Object.values(obj)[0] && Object.values(obj)[0].startsWith(start) ? true : false

    // console.log('switch Error')
    return condition
};