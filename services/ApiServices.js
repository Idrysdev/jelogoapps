
const { EXPO_PUBLIC_API_URL } = process.env;

import axios from 'axios';


_signUp = async (signUpData) => {
    console.log('signUpData :>> ', signUpData);
    var gender = 'male'
    if (signUpData.gender === 'Femme') {
        gender = 'femelle'
    }
    // TODO: POST params
    const vals = {
        "phone": signUpData.number,
        "code": signUpData.code,
        "id_type": signUpData.id_type,
        "id_card_recto": signUpData.id_card_recto,
        "id_card_verso": signUpData.id_card_verso,
        "avatar": signUpData.avatar,
        "gender": gender,
        "first_name": signUpData.firstName,
        "last_name": signUpData.lastName,
        "email": signUpData.email,
        "city": signUpData.city,
        "birthday": signUpData.birthday,
    };

    var config = {
        method: 'post',
        url: `https://admin.jelogo.net/api/public/users`,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(vals),
    };

    try {
        // console.log(config)
        let responseData = {
            status: 402,
            msg: "Le service est indisponible pour l'instant, Veuillez réessayer plus tard"
        }
        let response = await axios(config);
        // console.log('response :>> ', JSON.stringify(response))
        if (response.data.message === "success") {
            responseData = {
                status: 200,
                msg: "Utilisateur créer avec success, Veuillez vous connecter à présent"
            }
        } else if (response.data.message === "already") {
            responseData = {
                status: 400,
                msg: "Le numéro a déjà un compte"
            }
        }
        return responseData
    } catch (error) {
        console.error('Error creating user:', error);
        console.error('Message Error creating user:', error.message);
        return {
            status: 402,
            msg: "Le service est indisponible pour l'instant, Veuillez réessayer plus tard"
        }
    }
};

_signIn = async (number, code) => {
    console.log('_signIn..............:::', number, code)
    // TODO: GET params
    var config = {
        method: 'get',
        url: `https://admin.jelogo.net/api/public/users?code=${code}&phone=${number}`,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({}),
    };

    try {
        console.log(config)
        let responseData = {
            status: 402,
            msg: "Le service est indisponible pour l'instant, Veuillez réessayer plus tard"
        }
        let response = await axios(config);
        // console.log('response :>> ', JSON.stringify(response.data))
        if (response.data.message === "success") {
            responseData = {
                status: 200,
                record: response.data.result
            }
        } else if (response.data.message === "wrong") {
            responseData = {
                status: 400,
                msg: "Mauvais numéro ou code invalide"
            }
        }
        return responseData
    } catch (error) {
        console.error('Error user login:', error);
        console.error('Message Error user login:', error.message);
        return {
            status: 402,
            msg: "Le service est indisponible pour l'instant, Veuillez réessayer plus tard"
        }
    }
};

export const _signOut = async (phone, code) => {
    const url = `https://admin.jelogo.net/api/public/users?action=sign-out&phone=${phone}&code=${code}`
    try {
        fetch(url)
    } catch (error) {
        console.error('error.......', error)
    }
}

_getNetworkList = async () => {
    // TODO: GET params
    var config = {
        method: 'get',
        url: `https://admin.jelogo.net/api/public/money-issuer`,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({}),
    };

    try {
        let responseData = {
            status: 402,
            msg: "Le service est indisponible pour l'instant, Veuillez réessayer plus tard"
        }
        let response = await axios(config);
        // console.log('response :>> ', JSON.stringify(response.data))
        if (response.data.message === "success") {
            responseData = {
                status: 200,
                record: response.data.result
            }
        } else if (response.data.message === "wrong") {
            responseData = {
                status: 400,
                msg: "Mauvais numéro ou code invalide"
            }
        }
        return responseData
    } catch (error) {
        console.error('Error user login:', error);
        console.error('Message Error user login:', error.message);
        return {
            status: 402,
            msg: "Le service est indisponible pour l'instant, Veuillez réessayer plus tard"
        }
    }
};

_doOperation = async (dataOpr) => {
    // TODO: POST params
    // const vals = {
    //   "type": type,
    //   "sender_id": sender_id,
    //   "name": name,
    //   "phone": phone,
    //   "amount": parseFloat(amount),
    //   "network_id": parseInt(network_id),
    // };
    console.log('JSON.stringify({dataOpr}) :>> ', JSON.stringify(dataOpr));
    var config = {
        method: 'post',
        url: `https://admin.jelogo.net/api/public/wallet/history?code=${dataOpr.code}&phone=${dataOpr.number}`,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(dataOpr),
    };
    try {

        let responseData = {
            status: 402,
            msg: "Le service est indisponible pour l'instant, Veuillez réessayer plus tard"
        }
        let response = await axios(config);
        // console.log('response :>> ', JSON.stringify(response.data))
        if (response.data.message === "success") {
            responseData = {
                status: 200,
                msg: "Utilisateur créer avec success, Veuillez vous connecter à présent"
            }
        } else if (response.data.message === "already") {
            responseData = {
                status: 400,
                msg: "Le numéro a déjà un compte"
            }
        }
        return responseData
    } catch (error) {
        console.error('Error user login:', error);
        console.error('Message Error user login:', error.message);
        return {
            status: 402,
            msg: "Le service est indisponible pour l'instant, Veuillez réessayer plus tard"
        }
    }
};

_getTransactionList = async (number, code) => {

    // TODO: response
    const res = [
        "balance",
        "recharging",
        "expense",
        "transactions"[
        "id",
        "network"[
        "id",
        "image",
        "name"
        ],
        "amount",
        "receiver_amount",
        "created(date)"
        ]
    ]

    var config = {
        method: 'get',
        url: `https://admin.jelogo.net/api/public/wallet/history?code=${code}&phone=${number}`,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({}),
    };

    try {
        console.log(config)
        let responseData = {
            status: 402,
            msg: "Le service est indisponible pour l'instant, Veuillez réessayer plus tard"
        }
        let response = await axios(config);
        // console.log('response :>> ', JSON.stringify(response.data))
        if (response.data.message === "success") {
            responseData = {
                status: 200,
                transactions: response.data.result.transactions,
                record: response.data.result,
            }
        }
        return responseData
    } catch (error) {
        console.error('Error user login:', error);
        console.error('Message Error user login:', error.message);
        return {
            status: 402,
            msg: "Le service est indisponible pour l'instant, Veuillez réessayer plus tard"
        }
    }
}


_getBalance = async (number, code) => {
    // TODO: GET params
    const config = {
        method: 'get',
        url: `https://admin.jelogo.net/api/public/wallet?code=${code}&phone=${number}`,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({}),
    };

    try {

        let responseData = {
            status: 402,
            msg: "Le service est indisponible pour l'instant, Veuillez réessayer plus tard"
        }
        let response = await axios(config);
        // console.log('response :>> ', JSON.stringify(response.data))
        if (response.data.message === "success") {
            responseData = {
                status: 200,
                balance: response.data.result.balance,
            }
        }
        return responseData
    } catch (error) {
        return {
            status: 402,
            msg: "Le service est indisponible pour l'instant, Veuillez réessayer plus tard"
        }
    }
};

_otpRequest = async (method, type, number, otp = '', code = '') => {
    let codeInf = ''
    if (code != '') {
        codeInf = `code=${code}&`
    }

    if (type === 'generate') {
        var config = {
            method: method,
            url: `https://admin.jelogo.net/api/public/users/otp?${codeInf}phone=${number}`,
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({}),
        };
    } else if (type === 'auth') {
        var config = {
            method: method,
            url: `https://admin.jelogo.net/api/public/users/otp?${codeInf}phone=${number}&otp=${otp}`,
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({}),
        };
    }

    try {
        console.log('_otpReq...:::', config)
        let responseData = {
            status: 402,
            msg: "Le service est indisponible pour l'instant, Veuillez réessayer plus tard"
        }
        let response = await axios(config);
        console.log('response :>> ', JSON.stringify(response.data))
        if (response.data.message === "success") {
            responseData = {
                status: 200,
            }
        }
        return responseData
    } catch (error) {
        console.error('Error user login:', error);
        console.error('Message Error user login:', error.message);
        return {
            status: 402,
            msg: "Le service est indisponible pour l'instant, Veuillez réessayer plus tard"
        }
    }
};

_axiosReq = async (method, url, body = {}) => {
    let result = {
        status: 500
    }

    const payload = {
        method,
        url,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(body),
    };
    console.log('_axiosReq...:::', payload)

    try {
        const res = await axios(payload);
        result.status = res.status
        result.data = res.data
        // console.log('result...:::', result)
    } catch (error) {
        console.error('Errorrrrr:', error);
        result.error = error
    }

    return result
};

export default {
    _signUp,
    _signIn,
    _getNetworkList,
    _doOperation,
    _getTransactionList,
    _getBalance,
    _otpRequest,
    _axiosReq,
};