
const initialState = {
    code: "", // Initial the secret code
    number: "", // Initial state of the number
};

const secretCodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SECRET_CODE':
            return {
                ...state,
                code: action.payload,
            };
        case 'SET_NUMBER':
            return {
                ...state,
                number: action.payload,
            };
        default:
            return state;
    }
};

export default secretCodeReducer;
