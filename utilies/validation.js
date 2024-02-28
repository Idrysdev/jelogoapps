import { round_amount } from "./numbers";

export function validate_phone(input) {
    const result = { input: input };
    const num = input.replaceAll("+", "").replace(/\s/g, "");
    const phone = num.substring(0, 3) == "225" ? num.substring(3) : num;
    result.code = num.substring(0, 3) == "225" ? "+225" : false;

    if (phone.length != 10 || parseInt(phone).toString().length != 9) {
        return result;
    }

    result.phone = phone;
    if (phone.substring(0, 2) == "01") {
        result.operator = "flooz";
    } else if (phone.substring(0, 2) == "05") {
        result.operator = "momo";
    } else if (phone.substring(0, 2) == "07") {
        result.operator = "om";
    }

    return result;
}

export const get_amount_for_fees = (amount, fees, value) => {
    let amountToPay = amount
    let amountToReceive = amount
    if (fees) {
        const amt = parseInt(amount + (amount * value))
        amountToPay = round_amount(amt, fees);
    }
    else {
        const amt = parseInt(amount - (amount * value))
        amountToReceive = round_amount(amt, fees);
    }
    return {
        amountToPay, amountToReceive
    }
}

export const handleError = (message) => {
    if (!message) {
        alert("Le service est indisponible pour l'instant, Veuillez réessayer plus tard")
        return
    }
    if (message === "network") {
        alert('Veuillez vérifier votre connexion internet.')
        return
    }
    if (message === "user not found") {
        alert("Aucun utilisateur associé à ce numéro !")
        return
    }
    if (message === "wrong password") {
        alert("Code incorrect !")
        return
    }
    if (message === "already") {
        alert("Numéro de téléphone déjà enregistré ! Veuillez vous connecter ou utiliser un autre numéro.")
        return
    }
}