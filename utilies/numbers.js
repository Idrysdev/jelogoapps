export function format_phone(value) {
    return value.toString().replaceAll(' ', '').slice(-10).replace()
}

export function round_amount(amount, upper = true) {
    if (!amount) return 0
    const reste = amount % 10;

    let arrondi = reste
    if (upper) {
        arrondi = reste > 5 ? 10 : reste && reste < 5 ? 5 : reste
    }
    else {
        arrondi = reste > 5 ? 5 : reste && reste < 5 ? 0 : reste
    }

    const dizaineArrondie = amount - reste + (arrondi);
    return dizaineArrondie;
}