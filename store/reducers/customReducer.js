
const initialState = {
    categories: [],
    customer: {},
    reset_password: {},
    mode: false,
    lang: 'fr',
    r_dta: {},
    token: null,
    balance: 0,
};

const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                customer: action.payload
            };
        case 'SET_USER_BALANCE':
            return {
                ...state,
                balance: action.payload,
            };
        default:
            return state;
    }
}

export default countReducer;