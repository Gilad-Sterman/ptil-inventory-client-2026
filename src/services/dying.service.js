import { httpService } from "./http.service"


export const dyingService = {
    getDyingOptions,
    getMultFactor,
    getConfirmationMsg,
    getDefaultMap,
    addDyingEvent,
}

const STORAGE_KEY = 'dying'
let dyeOptions = []

async function getDyingOptions(filterBy) {
    try {
        const res = await httpService.get(STORAGE_KEY, filterBy)
        const myRes = res.map(option => {
            const myOption = {
                name: option.type,
                multFactor: option.mult_factor,
                sortOrder: option.sort_order
            }
            return myOption
        })
        dyeOptions = myRes
        return myRes
    } catch (err) {
        console.log(err)
        throw err
    }
}

function getConfirmationMsg(productMap) {
    const { dithionite, dolelot, dye, redye, type, sets, date } = productMap
    return `
    תאריך - ${date}
    כמות צבע - ${dye} ג' 
    דיטיוניט - ${dithionite}
    סוג - ${type}
    צביעה חוזרת - ${redye ? 'כן' : 'לא'}
    כמות דוללות - ${dolelot}
    כמות סטים - ${sets}
        `

}

function getMultFactor(type) {
    const MyOption = dyeOptions.filter(option => option.name === type)
    return MyOption[0].multFactor
}

function getDefaultMap() {
    const month = (new Date().getMonth() + 1 === 13) ? '01' : String(new Date().getMonth() + 1).padStart(2, '0')
    const today = `${String(new Date().getFullYear())}-${month}-${String(new Date().getDate()).padStart(2, '0')}`
    return {
        dye: 0,
        dithionite: 0,
        type: '',
        redye: false,
        dolelot: 0,
        date: today
    }
}

async function addDyingEvent(productMap, loggedUser) {
    try {
        const res = await httpService.post(STORAGE_KEY, { ...productMap, loggedUser })
        return res
    } catch (err) {
        console.log(err)
        throw err
    }
}
