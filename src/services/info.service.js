import { httpService } from "./http.service"

export const STRING = [
    {
        code: '00',
        heb: 'ללא',
        eng: 'None'
    },
    {
        code: '01',
        heb: 'ראבד',
        eng: 'Raavad'
    },
    {
        code: '02',
        heb: 'ראבד עבה',
        eng: 'Raavad Thick'
    },
    {
        code: '03',
        heb: 'ראבד ח/ג',
        eng: 'Raavad C/G'
    },
    {
        code: '04',
        heb: 'ראבד ח/ג עבה',
        eng: 'Raavad C/G Thick'
    },
    {
        code: '05',
        heb: 'ראבד 7',
        eng: 'Raavad 7'
    },
    {
        code: '06',
        heb: 'ראבד 7 עבה',
        eng: 'Raavad 7 Thick'
    },
    {
        code: '07',
        heb: 'ראבד עבה ניפוץ',
        eng: 'Raavad Thick Niputz'
    },
    {
        code: '08',
        heb: 'ראבד ח/ג עבה ניפוץ',
        eng: 'Raavad C/G Thick Niputz'
    },
    {
        code: '09',
        heb: 'רמבם 13',
        eng: 'Rambam 13'
    },
    {
        code: '10',
        heb: 'רמבם 13 עבה',
        eng: 'Rambam 13 Thick'
    },
    {
        code: '11',
        heb: 'רמבם 7',
        eng: 'Rambam 7'
    },
    {
        code: '12',
        heb: 'רמבם 7 עבה',
        eng: 'Rambam 7 Thick'
    },
    {
        code: '13',
        heb: 'רמבם עבה ניפוץ',
        eng: 'Rambam 13 Thick Niputz'
    },
    {
        code: '14',
        heb: 'תוספות',
        eng: 'Tosafot'
    },
    {
        code: '15',
        heb: 'תוספות עבה',
        eng: 'Tosafot Thick'
    },
    {
        code: '16',
        heb: 'תוספות עבה ניפוץ',
        eng: 'Tosafot Thick Niputz'
    },
    {
        code: '17',
        heb: 'תוספות ח/ג',
        eng: 'Tosafot C/G'
    },
    {
        code: '18',
        heb: 'תוספות ח/ג עבה',
        eng: 'Tosafot C/G Thick'
    },
    {
        code: '19',
        heb: 'תוספות שכטר',
        eng: 'Tosafot R Schachter'
    },
    {
        code: '20',
        heb: 'תוספות שכטר עבה',
        eng: 'Tosafot R Schachter Thick'
    },
    {
        code: '21',
        heb: 'תוספות 7',
        eng: 'Tosafot 7'
    },
    {
        code: '22',
        heb: 'תוספות 7 עבה',
        eng: 'Tosafot 7 Thick'
    },
    {
        code: '23',
        heb: 'תוספות ח/ג עבה ניפוץ',
        eng: 'Tosafot C/G Thick Niputz'
    },
    {
        code: '24',
        heb: `תוספות ר' שכטר עבה ניפוץ`,
        eng: 'Tosafot R Schachter Thick Niputz'
    },
    {
        code: '25',
        heb: 'תוספות 7 עבה ניפוץ',
        eng: 'Tosafot 7 Thick Niputz'
    },
    {
        code: '26',
        heb: 'רמבם 7 עבה ניפוץ',
        eng: 'Rambam 7 Thick Niputz'
    },
    {
        code: '30',
        heb: 'פתיל ראבד מוסיפין',
        eng: 'Strings Raavad Mosifin'
    },
    {
        code: '31',
        heb: 'פתיל ראבד מוסיפין עבה',
        eng: 'Strings Raavad Mosifin Thick'
    },
    {
        code: '99',
        heb: 'אחר',
        eng: 'Other'
    },
]
export const BEGGED = [
    {
        code: '01',
        heb: 'א.א. פס לבן',
        eng: 'Basic Black'
    },
    {
        code: '02',
        heb: 'א.א.פס שחור',
        eng: 'Basic White'
    },
    {
        code: '03',
        heb: 'בית יוסף',
        eng: 'Bet Yosef'
    },
    {
        code: '04',
        heb: 'ברקת',
        eng: 'Bareket'
    },
    {
        code: '05',
        heb: 'גוונים אפור כחול',
        eng: 'Gevanim'
    },
    {
        code: '06',
        heb: 'מעלות',
        eng: 'Maalot'
    },
    {
        code: '07',
        heb: 'ספיר',
        eng: 'Sapir'
    },
    {
        code: '08',
        heb: 'תשבץ כסף וכחול',
        eng: 'Tashbetz Blue'
    },
    {
        code: '09',
        heb: 'תשבץ פס לבן',
        eng: 'Tashbetz White'
    },
    {
        code: '10',
        heb: 'תשבץ פס שחור',
        eng: 'Tashbetz Black'
    },
    {
        code: '11',
        heb: 'א.א.פס כחול',
        eng: 'Basic Blue'
    },
    {
        code: '12',
        heb: 'בית יוסף תשבץ פס לבן',
        eng: 'Tashbetz Bet Yosef'
    },
    {
        code: '13',
        heb: 'דוד',
        eng: 'David'
    },
    {
        code: '14',
        heb: 'ישתבח',
        eng: 'Yishtabach'
    },
    {
        code: '15',
        heb: 'מוסף',
        eng: 'Mussaf'
    },
    {
        code: '16',
        heb: 'תשבץ',
        eng: 'Tashbetz'
    },
    {
        code: '17',
        heb: 'מודים',
        eng: 'Modim'
    },
    {
        code: '18',
        heb: 'למנצח',
        eng: 'Lamenatzeach'
    },
    {
        code: '19',
        heb: 'הללויה',
        eng: 'Hallelujah'
    },
    {
        code: '20',
        heb: 'הלל',
        eng: 'Hallel'
    },
    {
        code: '21',
        heb: 'ספיר ברדו',
        eng: 'Sapir bordeaux'
    },
    {
        code: '49',
        heb: 'טג - אחר',
        eng: 'TG - Other'
    },
    {
        code: '50',
        heb: 'גופיה כותנה',
        eng: 'TankTop Cotton'
    },
    {
        code: '51',
        heb: 'גופיה צמר',
        eng: 'TankTop Wool'
    },
    {
        code: '52',
        heb: 'כותנה O',
        eng: 'Cotton O'
    },
    {
        code: '53',
        heb: 'כותנה',
        eng: 'Cotton'
    },
    {
        code: '54',
        heb: 'צמר לבן',
        eng: 'Wool White'
    },
    {
        code: '55',
        heb: 'צמר לבן פרנג',
        eng: 'Wool White Fringes'
    },
    {
        code: '56',
        heb: 'צמר שחור',
        eng: 'Wool Black'
    },
    {
        code: '57',
        heb: 'צמר שחור פרנג',
        eng: 'Wool Blaic Fringes'
    },
    {
        code: '58',
        heb: 'רשת',
        eng: 'Net'
    },
    {
        code: '60',
        heb: 'גופיה ירוקה',
        eng: 'TankTop Green'
    },
    {
        code: '99',
        heb: 'טק - אחר',
        eng: 'TK - Other'
    },

]
export const TYING = [
    {
        code: '00',
        heb: 'ללא',
        eng: 'None'
    },
    {
        code: '01',
        heb: 'חינוך',
        eng: 'Chinuch'
    },
    {
        code: '02',
        heb: 'גרא',
        eng: 'GRA'
    },
    {
        code: '03',
        heb: 'רמבם 13',
        eng: 'Rambam 13'
    },
    {
        code: '04',
        heb: 'רמבם 7',
        eng: 'Rambam 7'
    },
    {
        code: '05',
        heb: 'ראבד',
        eng: 'Raavad'
    },
    {
        code: '06',
        heb: 'ראבד 7',
        eng: 'Raavad 7'
    },
    {
        code: '07',
        heb: 'ראדזין/ארי',
        eng: 'Radzyn/ARI'
    },
    {
        code: '08',
        heb: 'טל אשכנזי (7,8,11,13)',
        eng: 'Tal Ashkenazi (7,8,11,13)'
    },
    {
        code: '09',
        heb: 'טל ספרדי (7,8,11,13)',
        eng: 'Tal Sephardi (7,8,11,13)'
    },
    {
        code: '10',
        heb: 'ר עמרם גאון',
        eng: 'R Amram Gaon'
    },
    {
        code: '11',
        heb: 'בן איש חי',
        eng: 'Ben Ish Chai'
    },
    {
        code: '12',
        heb: 'הרב שכטר',
        eng: 'Rav Schachter'
    },
    {
        code: '13',
        heb: 'הרב הרוש',
        eng: 'Rav Harush'
    },
    {
        code: '14',
        heb: 'תוספות',
        eng: 'Tosafot'
    },
    {
        code: '15',
        heb: 'צפון אפריקה',
        eng: 'North Africa (10,5,6,5)'
    },
    {
        code: '16',
        heb: 'ספרדי ספירלה',
        eng: 'Sephardi Spiral'
    },
    {
        code: '98',
        heb: 'קושר לבד',
        eng: 'Self Tied'
    },
    {
        code: '99',
        heb: 'אחר',
        eng: 'Other'
    },
]
export const COLOR = [
    { code: '50', heb: 'שחור', eng: 'Black' },
    { code: '51', heb: 'לבן בית יוסף', eng: 'White Bet Yosef' },
    { code: '52', heb: 'תכלת', eng: 'Techelet' },
    { code: '53', heb: 'לבן כסף', eng: 'White Silver' },
    { code: '54', heb: 'לבן מבריק', eng: 'White Shiny' },
    { code: '55', heb: 'כחול כסף', eng: 'Blue Silver' },
    { code: '56', heb: 'ג\'ינס', eng: 'Jeans' },
    { code: '57', heb: 'כחול ליבי', eng: 'Navy Blue' },
    { code: '58', heb: 'כחול', eng: 'Blue' },
    { code: '59', heb: 'כחול זהב', eng: 'Blue Gold' },
    { code: '60', heb: 'חום', eng: 'Brown' },
    { code: '61', heb: 'ברדו', eng: 'Bordeaux' },
    { code: '62', heb: 'אפור', eng: 'Grey' },
    { code: '63', heb: 'ירוק', eng: 'Green' },
    { code: '64', heb: 'כחול רויאל', eng: 'Royal Blue' }
]

// Talit Gadol product codes that support colors
export const TG_CODES = ['07', '11', '14', '15', '16', '17', '18', '19', '20']

export const TG = {
    codes: ['07', '11', '14', '15', '16', '17', '18', '19', '20', '49'],
    sizes: ['45', '50', '55', '60', '70', '80'],
    colors: ['50', '51', '52', '54', '55', '56', '57', '58', '61', '62', '63', '64']
}
export const TK = {
    codes: ['50', '51', '53', '54', '56', '58', '60', '99'],
    sizes: ['02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30'],
}

export function isTalitGadol(beggedCode) {
    return TG_CODES.includes(beggedCode)
}

export const allSizes = [
    { code: '00', heb: '00', type: 'other' },
    { code: '01', heb: '01', type: 'other' },
    { code: '02', heb: '02', type: 'other' },
    { code: '03', heb: '03', type: 'other' },
    { code: '04', heb: '04', type: 'other' },
    { code: '05', heb: '05', type: 'other' },
    { code: '06', heb: '06', type: 'other' },
    { code: '07', heb: '07', type: 'other' },
    { code: '08', heb: '08', type: 'other' },
    { code: '09', heb: '09', type: 'other' },
    { code: '16', heb: '16', type: 'k' },
    { code: '18', heb: '18', type: 'k' },
    { code: '20', heb: '20', type: 'k' },
    { code: '22', heb: '22', type: 'k' },
    { code: '24', heb: '24', type: 'k' },
    { code: '26', heb: '26', type: 'k' },
    { code: '45', heb: '45', type: 'g' },
    { code: '50', heb: '50', type: 'g' },
    { code: '55', heb: '55', type: 'g' },
    { code: '60', heb: '60', type: 'g' },
    { code: '70', heb: '70', type: 'g' },
    { code: '80', heb: '80', type: 'g' },
]

export function getConfirmationMsg(type, begged, size, string, tying, amount, moreInfo, color) {

    if (type === 'tiedBegged') return `
בגד - ${begged}
מידה - ${size}
חוטים - ${string}
קשירה - ${tying}
${color ? `צבע - ${color}` : ''}
כמות - ${amount}
${moreInfo ? `מידע נוסף: ${moreInfo}` : ''}
    `
    if (type === 'begged') return ` 
בגד - ${begged}
מידה - ${size}
${color ? `צבע - ${color}` : ''}
כמות - ${amount}
${moreInfo ? `מידע נוסף: ${moreInfo}` : ''}
    `
    if (type === 'other') return ` 
מוצר - ${begged}
מידה - ${size}
כמות - ${amount}
${moreInfo ? `מידע נוסף: ${moreInfo}` : ''}
    `
    if (type === 'string') return ` 
חוטים - ${string}
כמות - ${amount}
${moreInfo ? `מידע נוסף: ${moreInfo}` : ''}
    `
}

export function getNewConfirmationMsg(productMap) {
    const { Cost, Price, USDPrice, Inventory, MinimumLevel, Location, SKU } = productMap
    return `הנתונים שהזנתם: 
    מק"ט - ${SKU}
    שם - ${productMap['Description-Heb']}
    באנגלית - ${productMap['Description-Eng']}
    מיקום - ${Location}
    עלות - ${Cost}
    מחיר - ${Price}
    מחיר $ - ${USDPrice}
    מלאי מינימלי - ${MinimumLevel}
    כמות - ${Inventory}
    `
}

const STORAGE_KEY = 'order'

export async function getproductsByType(type) {
    try {
        const res = await httpService.get(`${STORAGE_KEY}/${type}`)
        const myRes = res.map((product) => {
            const myProduct = {
                code: (type === 'other') ? product.SKU.charAt(9) + product.SKU.charAt(10) : (type === 'strings') ? product.SKU.charAt(5) + product.SKU.charAt(6) : product.SKU.charAt(1) + product.SKU.charAt(2),
                heb: (type === 'begged' || type === 'other') ? product['Description-Heb'].split(':')[0] : product['Description-Heb'],
                eng: (type === 'begged' || type === 'other') ? product['Description-Eng'].split(':')[0] : product['Description-Eng'],
                SortOrder: product.SortOrder
            }
            return myProduct
        })
        return myRes.sort((product1, product2) => product2.SortOrder - product1.SortOrder)
    } catch (err) {
        console.log(err)
        throw err
    }
}

export function setMyBegged(beggedRes) {
    const beggedNames = [...new Set(beggedRes.map(begged => begged.heb + ':' + begged.code + ':' + begged.eng))]
    const myBegged = beggedNames.map((name) => {
        const heb = name.split(':')[0]
        const eng = name.split(':')[2]
        const code = name.split(':')[1]
        return { heb, eng, code }
    })
    return myBegged.sort((begged1, begged2) => {
        if (begged2.heb < begged1.heb) return 1
        return -1
    })
}

export function setMyOther(otherRes) {
    const otherNames = [...new Set(otherRes.map(other => other.heb + ':' + other.code + ':' + other.eng))]
    const myOther = otherNames.map((name) => {
        const heb = name.split(':')[0]
        const eng = name.split(':')[2]
        const code = name.split(':')[1]
        return { heb, eng, code }
    })
    return myOther
}

export function getMySizes(products) {
    const sizes = [...new Set(products.map(product => product.SKU.slice(3, 5)))]
    const mySizes = sizes.map(size => {
        return {
            code: size,
            heb: size
        }
    })
    return mySizes
}

export function getSizesByType(categories, specific) {
    if (!categories.length) return []
    if (categories.length === 2 && !specific.length) return allSizes
    if (categories.length < 2 && categories.includes('other')) return allSizes.filter(size => size.type === 'other')
    if (categories.length < 2 && categories.includes('begaddim') && !specific.length) return allSizes.filter(size => size.type === 'k' || size.type === 'g')
    const isTG = specific.some(code => TG.codes.includes(code))
    const isTK = specific.some(code => TK.codes.includes(code))
    if (categories.length === 2) {
        if (isTG && isTK) return allSizes
        if (isTG) return allSizes.filter(size => size.type === 'g' || size.type === 'other')
        if (isTK) return allSizes.filter(size => size.type === 'k' || size.type === 'other')
    }
    if (isTG && isTK) return allSizes.filter(size => size.type === 'g' || size.type === 'k')
    if (isTG) return allSizes.filter(size => size.type === 'g')
    return allSizes.filter(size => size.type === 'k')
}

export async function getProductSizes(type, code) {
    try {
        const res = await httpService.get(`${STORAGE_KEY}/size`, { type, code })
        const myRes = res.map((product) => product.SKU.charAt(3) + product.SKU.charAt(4))
        return myRes
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function getProductColors(begged, size) {
    try {
        const colorCodes = await httpService.get(`${STORAGE_KEY}/colors`, { begged, size })
        return colorCodes
    } catch (err) {
        console.log(err)
        throw err
    }
}

// NEW: MongoDataCodes-based functions
export async function getBeggedFromDataCodes() {
    try {
        const res = await httpService.get(`${STORAGE_KEY}/datacodes/begged`)
        return res
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function getColorsForBegged(beggedCode, sizeCode = null) {
    try {
        const params = { beggedCode }
        if (sizeCode) {
            params.sizeCode = sizeCode
        }
        const res = await httpService.get(`${STORAGE_KEY}/datacodes/colors`, params)
        return res
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function getSizesForBegged(beggedCode) {
    try {
        const res = await httpService.get(`${STORAGE_KEY}/datacodes/sizes`, { beggedCode })
        return res
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function getSizesForBeggedAndColor(beggedCode, colorCode) {
    try {
        const res = await httpService.get(`${STORAGE_KEY}/datacodes/sizes-color`, { beggedCode, colorCode })
        return res
    } catch (err) {
        console.log(err)
        throw err
    }
}