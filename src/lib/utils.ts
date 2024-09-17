function dec2hex(dec: number) {
    return dec.toString(16).padStart(2, "0")
}

// generateId :: Integer -> String
export function generateId(len: number) {
    var arr = new Uint8Array((len || 40) / 2)
    arr = crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}

console.log(generateId(20))
