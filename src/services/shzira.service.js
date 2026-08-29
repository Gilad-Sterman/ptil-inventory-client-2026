import { httpService } from "./http.service"


export const shziraService = {
    getShziraOptions,
    getMultFactor,
    getConfirmationMsg,
    getDefaultMap,
    addShziraEvent,
}

const STORAGE_KEY = 'shzira'
let shziraOptions = []

async function getShziraOptions(filterBy) {
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
        shziraOptions = myRes
        return myRes
    } catch (err) {
        console.log(err)
        throw err
    }
}

function getConfirmationMsg(productMap) {
    const { maslulim, type, date, sets } = productMap
    return `
    תאריך - ${date}
    סוג - ${type}
    כמות מסלולים - ${maslulim}
    כמות סטים - ${sets}
        `
}

function getMultFactor(type) {
    const MyOption = shziraOptions.filter(option => option.name === type)
    return MyOption[0].multFactor
}

function getDefaultMap() {
    const month = (new Date().getMonth() + 1 === 13) ? '01' : String(new Date().getMonth() + 1).padStart(2, '0')
    const today = `${String(new Date().getFullYear())}-${month}-${String(new Date().getDate()).padStart(2, '0')}`
    return {
        type: '',
        maslulim: 0,
        date: today
    }
}

async function addShziraEvent(productMap, loggedUser) {
    try {
        const res = await httpService.post(STORAGE_KEY, { ...productMap, loggedUser })
        return res
    } catch (err) {
        console.log(err)
        throw err
    }
}
