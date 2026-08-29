import { httpService } from './http.service.js'
import { isTalitGadol } from './info.service.js'

export const productService = {
    getProducts,
    getInfo,
    getDefaultProduct,
    getDeProductToAdd,
    addInventory,
    bulkInventoryUpdate,
    addNewProduct,
    addInventoryBySKU
}

const STORAGE_KEY = 'order'

// const products = [
//     {
//         SKU: 123,
//         name: 'product1',
//         amount: 2,
//         price: 50,
//         Vat: '17%',
//         isSelcted: false
//     },
//     {
//         SKU: 124,
//         name: 'product2',
//         amount: 6,
//         price: 36,
//         Vat: '17%',
//         isSelcted: false
//     },
//     {
//         SKU: 125,
//         name: 'product3',
//         amount: 3.4,
//         price: 5.9,
//         Vat: '17%',
//         isSelcted: true
//     },
//     {
//         SKU: 126,
//         name: 'product4',
//         amount: 1.21,
//         price: 38.95,
//         Vat: '17%',
//         isSelcted: false
//     },
//     {
//         SKU: 127,
//         name: 'product5',
//         amount: 2.13,
//         price: 58.39,
//         Vat: '17%',
//         isSelcted: true
//     },
//     {
//         SKU: 128,
//         name: 'product6',
//         amount: 3.18,
//         price: 18.99,
//         Vat: '17%',
//         isSelcted: false
//     },
// ]

// const info = [
//     {
//         title: 'Sales',
//         isPrice: true,
//         info: 167329.5
//     },
//     {
//         title: 'Total Items',
//         isPrice: false,
//         info: 14395
//     },
//     {
//         title: 'Total Profit',
//         isPrice: true,
//         info: 167329.5
//     },
// ]

async function getProducts(filterBy) {
    try {
        const res = await httpService.get(STORAGE_KEY, filterBy)
        const myRes = res.map(order => {
            order.isSelected = false
            return order
        })
        // console.log(myRes)
        return myRes
    } catch (err) {
        console.log(err)
    }
}

async function getInfo() {
    return new Promise(resolve => setTimeout(() => resolve(info), 300))
}

function getDefaultProduct() {
    return {
        string: '',
        begged: '',
        size: '',
        tying: '',
        other: '',
        color: '',
        amount: 1
    }
}

function getDeProductToAdd() {
    return {
        'Description-Eng': '',
        'Description-Heb': '',
        Cost: 0,
        Price: 0,
        USDPrice: 0,
        Inventory: 1,
        MinimumLevel: 0,
        Location: '',
        begged: '00',
        size: '00',
        string: '00',
        tying: '00',
        other: '00',
        color: '00'
    }
}

function _generateSKU(productMap) {
    const { string, begged, size, tying, color, amount } = productMap
    
    // Determine color code: required for TG, '00' for others
    const isTG = isTalitGadol(begged)
    const colorCode = isTG ? color : '00'
    
    const productSKU = `1${begged}${size}${string}${tying}${colorCode}`
    const beggedSKU = `1${begged}${size}0000${colorCode}`
    const stringSKU = `10000${string}0000`

    return {
        productSKU,
        stringSKU,
        beggedSKU,
        amount
    }
}

async function addInventory(productMap, loggedUser) {
    const SKUMap = _generateSKU(productMap)
    try {
        const res = await httpService.put(STORAGE_KEY, { ...SKUMap, loggedUser })
        return res
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function bulkInventoryUpdate(products, loggedUser) {
    try {
        const res = await httpService.put(`${STORAGE_KEY}/bulk`, { products, loggedUser })
        return res
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function addInventoryBySKU(productSKU, amount, loggedUser) {
    // console.log(productSKU, amount)
    // return
    try {
        const res = await httpService.put(`${STORAGE_KEY}/${productSKU}`, { amount, loggedUser })
        return res
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function addNewProduct(productMap, loggedUser) {
    try {
        const res = await httpService.post(`${STORAGE_KEY}/new`, { ...productMap, loggedUser })
        return res
    } catch (err) {
        console.log(err)
        throw err
    }
}