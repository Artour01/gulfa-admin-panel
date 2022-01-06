let testPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@.,#\$%\^&\*])(?=.{8,})/; //eslint-disable-line
let validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please input a password'));
    } else if (!testPass.test(String(value))) {
        callback(new Error('password must be contain digits, letters, symbols (min 8 characters)'))
    } else {
        callback();
    }
};
let testEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;//eslint-disable-line
let validateEmail = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please input an e-mail'));
    } else if (!testEmail.test(String(value))) {
        callback(new Error('The email address is incorrect'))
    } else {
        callback();
    }
}
export default {
    firstName: [
        {
            required: true,
            message: 'Please input a first name',
            trigger: 'blur'
        }
    ],
    lastName: [
        {
            required: true,
            message: 'Please input a last name',
            trigger: 'blur'
        }
    ],
    phoneNumber: [
        {
            required: true,
            message: 'Please input a phone number',
            trigger: 'blur'
        }
    ],
    email: [
        {
            required: true,
            validator: validateEmail,
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            validator: validatePass,
            trigger: 'blur'
        }
    ],
    birthDate: [
        {
            required: true,
            message: 'Please input a birth date',
            trigger: 'blur'
        }
    ],
    cityName: [
        {
            required: true,
            message: 'Please input a city',
            trigger: 'blur'
        }
    ],
    familyMembersCount: [
        {
            required: true,
            message: 'Please input a family members count',
            trigger: 'blur'
        },
        {
            type: 'number',
            message: 'Please input a number',
            trigger: 'blur'
        }
    ],
    districtName: [
        {
            required: true,
            message: 'Please input a district',
            trigger: 'blur'
        }
    ],
    address: [
        {
            required: true,
            message: 'Please input an address',
            trigger: 'blur'
        }
    ],
    arBody: [
        {
            required: true,
            message: 'Please input an arabic description',
            trigger: 'blur'
        }
    ],
    enBody: [
        {
            required: true,
            message: 'Please input an english description',
            trigger: 'blur'
        }
    ],
    name: [
        {
            required: true,
            message: 'Please input a category name',
            trigger: 'blur'
        }
    ],
    arName: [
        {
            required: true,
            message: 'Please input a category name (arabic)',
            trigger: 'blur'
        }
    ],
    description_en: [
        {
            required: true,
            message: 'Please input a description',
            trigger: 'blur'
        }
    ],
    description_ar: [
        {
            required: true,
            message: 'Please input a description',
            trigger: 'blur'
        }
    ],
    price: [
        {
            required: true,
            message: 'Please input a price',
            trigger: 'blur'
        },
        {
            type: 'number',
            message: 'Please input a number',
            trigger: 'blur'
        }
    ],
    title_en: [
        {
            required: true,
            message: 'Please input a title',
            trigger: 'blur'
        }
    ],
    title_ar: [
        {
            required: true,
            message: 'Please input a title',
            trigger: 'blur'
        }
    ],
    volume: [
        {
            required: true,
            message: 'Please input a volume',
            trigger: 'blur'
        },
        {
            type: 'number',
            message: 'Please input a number',
            trigger: 'blur'
        }
    ],
    categoryId: [
        {
            required: true,
            message: 'Please select a category',
            trigger: 'change'
        }
    ],
    code: [
        {
            required: true,
            message: 'Please input a code',
            trigger: 'blur'
        }
    ],
    discount: [
        {
            required: true,
            message: 'Please input a discount',
            trigger: 'blur'
        },
        {
            type: 'number',
            message: 'Please input a number',
            trigger: 'blur'
        },
        { type: 'number', min: 1, max: 99, message: 'Discount should be 1 to 99', trigger: 'blur' }

    ],
    toDiscountAmount: [
        {
            required: true,
            message: 'Please input a toDiscountAmount',
            trigger: 'blur'
        },
        {
            type: 'number',
            message: 'Please input a number',
            trigger: 'blur'
        }
    ],
    expireDate: [
        {
            required: true,
            message: 'Please pick a date',
            trigger: 'blur'
        }
    ],
    personalAmountUse: [
        {
            required: true,
            message: 'Please input a personalAmountUse',
            trigger: 'blur'
        },
        {
            type: 'number',
            message: 'Please input a number',
            trigger: 'blur'
        },
        { type: 'number', min: 1, max: 99, message: 'Amount should be 1 to 99', trigger: 'blur' }
    ],
    startDate: [
        {
            required: true,
            message: 'Please pick a date',
            trigger: 'blur'
        }
    ],
    endDate: [
        {
            required: true,
            message: 'Please pick a date',
            trigger: 'blur'
        }
    ],
    shopItemsId: [
        {
            type: 'array',
            required: true,
            message: 'Please choose at least one product',
            trigger: 'change'
        }
    ],
    percent: [
        {
            required: true,
            message: 'Please input a percent',
            trigger: 'blur'
        },
        {
            type: 'number',
            message: 'must be a number',
            trigger: 'blur'
        },
    ]
}
