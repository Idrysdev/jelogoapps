
export const setSecretCode = (code) => {
    console.log("SET_SECRET_CODE............", code)

    return {
        type: 'SET_SECRET_CODE',
        payload: code,
    }
};

export const setNumber = (value) => {
    console.log("SET_NUMBER............", value)
    return {
        type: 'SET_NUMBER',
        payload: value,
    }
};
