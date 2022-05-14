export const generateCode = (min, max, onlyNumber) => {
    let code = ""
    const length = Math.floor(Math.random() * (max - min + 1)) + min
    for(let i = 0; i < length; i++) {
        if(onlyNumber) {
            code += Math.floor(Math.random() * 10)
        }
        else {
            code += String.fromCharCode(Math.floor(Math.random() * 26) + 97)
        }
    }
    return code
}