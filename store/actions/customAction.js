export function setUserData(customer) {
    return {
        type: 'SET_USER_DATA',
        payload: customer
    }
}
export function setUserBalance(balance) {
    return {
        type: 'SET_USER_BALANCE',
        payload: balance
    }
};