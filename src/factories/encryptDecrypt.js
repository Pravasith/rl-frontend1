import CryptoJS from 'crypto-js'
import { EncryptDecryptKey } from '../lib/encryptDecryptKey'

// 
// This is for the back-end
// 

export const encryptData = (message) => {
    // Encrypt
    let ciphertext = CryptoJS
        .AES
        .encrypt(JSON.stringify(message) , EncryptDecryptKey)

    return ciphertext.toString()
}

export const decryptData = (ciphertext) => {
    // Decrypt
    let bytes = CryptoJS
        .AES
        .decrypt(ciphertext, EncryptDecryptKey)

    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

    return decryptedData
}


