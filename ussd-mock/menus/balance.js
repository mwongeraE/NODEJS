//Checks user balance

const balance = async (UssdMenu) => {
    let user = await UssdMenu.session.get('user')
    let response

    if (user.balance > 0) {
        response = `Balance: ${user.balance.toFixed(2)}` + 
        `\n Please clear your balance on time ` +
        `to avoid inconvenience` +
        `\nPress * - Back` +
        `\nPress # - Main Menu`
    } else {
        response = `Balance: ${user.balance.toFixed(2)}` +
        `\n Your account is paid. `+
        `Thank you` +
        `\nPress * - Back` +
        `\nPress # - Main menu`
    }

    return {
        con: true,
        response: response,
    }
}

module.exports = {balance}