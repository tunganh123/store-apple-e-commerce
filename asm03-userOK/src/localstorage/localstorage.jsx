export const getArruser = () => {
    return JSON.parse(localStorage.getItem("ArrUser"))
}
export const setArruser = (x) => {
    localStorage.setItem("ArrUser", JSON.stringify(x))
}

export const getuserlive = () => {
    return JSON.parse(localStorage.getItem("userlive"))
}
export const setuserlive = (x) => {
    localStorage.setItem("userlive", JSON.stringify(x))
}
export const removeuserlive = () => {
    localStorage.removeItem("userlive")
}
export const getArrCart = () => {
    return JSON.parse(localStorage.getItem("ArrCart"))
}
export const setArrCart = (x) => {
    localStorage.setItem("ArrCart", JSON.stringify(x))
}
export const removeArrCart = () => {
    localStorage.removeItem("ArrCart")
}