type FormatValue = string | number | boolean
type Getlength<T> = Array<T> | string
type Item = { title: string, rating: number }
type FilterActiveUsers = { id: number, name: string, email: string, isActive: boolean }
interface Book { title: string, author: string, publishedYear: number, isAvailable: boolean }
type GetUniqueValues = Array<string | number>
type CalculateTotalPrice = { name: string, price: number, quantity: number, discount?: number }

function formatValue(value: FormatValue): FormatValue {
    if (typeof (value) === 'string') {
        return value.toUpperCase()
    }
    else if (typeof (value) === 'number') {
        return value * 10
    }
    else {
        return !value;
    }
}

function getLength<T>(value: Getlength<T>): number {
    if (typeof (value) === 'string') {
        return value.length
    }
    else {
        return value.length
    }
}

class Person {
    name: string = "Az";
    age: number = 27;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    getDetails(): string {
        return `'Name: ${this.name}, Age: ${this.age}'`
    }
}

function filterByRating(arr: Item[]): Item[] {
    let newArr: Item[] = [];

    for (let book of arr) {
        if (book.rating >= 4) {
            newArr.push(book)
        }
    }

    return newArr;
}


function filterActiveUsers(arr: FilterActiveUsers[]): FilterActiveUsers[] {
    let newArr: FilterActiveUsers[] = []

    for (let user of arr) {
        if (user.isActive) {
            newArr.push(user)
        }
    }

    return newArr;
}

function printBookDetails(obj: Book) {
    console.log(`Title: ${obj.title}, Author: ${obj.author}, Published: ${obj.publishedYear}, Available: ${obj.isAvailable ? 'Yes' : 'No'}`)
}

function getUniqueValues(arr1: GetUniqueValues, arr2: GetUniqueValues): GetUniqueValues {
    let newArr: GetUniqueValues = []
    for (let i of arr1) {
        let isDup = false
        for (let j of arr2) {
            if (i === j) {
                isDup = true
                break
            }
        }
        if (!isDup) {
            newArr.push(i)
        }
    }

    // console.log(newArr)
    for (let i of arr2) {
        let isDup = false
        for (let j of newArr) {
            if (i === j) {
                isDup = true
                break
            }
        }
        if (!isDup) {
            newArr.push(i)
        }
    }
    return newArr
}


function calculateTotalPrice(products: CalculateTotalPrice[]): number {
    return products.reduce((price, product) => {
        if (product.discount !== undefined) {
            return price + (product.price * product.quantity - ((product.price * product.quantity) * product.discount / 100))
        }
        else {
            return price + (product.price * product.quantity)
        }
    }
        , 0)
}