interface errorObjectkeys {
    [key: string]: any;
}


export interface Product {
    id: string,
    nameProduct: string,
    price: number,
    unit: string,
    createdAt: string,
    updatedAt: string,
}


export interface InitValueProduct extends errorObjectkeys {
    price: string ,
    nameProduct: string ,
    unit: string 
}


export interface InitValueUser extends errorObjectkeys{
    nameUser?: string ,
    phone: string ,
    passwords: string 
}

export interface inputFields {
    title?: string,
    type?: string,
    placeholder?: string,
    name: string,
    pattern?: string,
    onKeyPress?: (e: any) => void,
    value?: string,
    onChange?: (e: any) => void
}


export interface errorProduct extends errorObjectkeys {
    price?: {
        required: {
            ltCharacters: number
        },
        error1: string,
        error2: string
    },
    nameProduct?: {
        required: {
            ltCharacters: number
        },
        error1: string,
        error2: string
    },
    unit?: {
        required: {
            ltCharacters: number
        },
        error1: string,
        error2: string
    },
}

export interface errorUser extends errorObjectkeys{
    nameUser?: {
        required: {
            ltCharacters: number
        },
        error1: string,
        error2: string
    },
    phone?: {
        required: {
            ltCharacters: number
        },
        error1: string,
        error2: string
    },
    passwords?: {
        required: {
            ltCharacters: number
        },
        error1: string,
        error2: string
    },
}

export interface PropsBigForm {
    initValue?: InitValueProduct | InitValueUser | InitValueUser| any,
    fieldsInput: inputFields[],
    error: errorProduct | errorUser,
    url: {
        create?: string,
        get?: string,
        update?: string
    },
    isCreate: boolean,
    titleHeading: {
        create?: string,
        edit?: string
    },
    nav: string
}

export interface User extends Product {
    id: string,
    nameUser: string
}

export interface InitReducer {
    user?: User | any,
    users?: User[],
    products?: Product[]
}