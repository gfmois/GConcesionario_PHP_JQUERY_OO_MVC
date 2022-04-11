import { faker } from "https://cdn.jsdelivr.net/npm/@faker-js/faker/+esm";
import { login } from './loginController.js'

function validateRegisterForm() {
    let registerForm = document.getElementById('rForm')

    // REGEX
    let passwordRx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    let usernameRx = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
    let emailRx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    let passwordValue = ""
    let usernameValue = ""
    let rePasswordValue = ""
    let emailValue = ""
    let formValue = []

    registerForm.childNodes.forEach((v, k, p) => {
        if (v.type != "button" && v.nodeName == "INPUT") {
            formValue.push(v)
        }
    })

    usernameValue = formValue[0].value
    emailValue = formValue[1].value
    passwordValue = formValue[2].value
    rePasswordValue = formValue[3].value

    let error = document.createElement('div')

    error.id = "errorDiv"

    if (passwordRx.test(passwordValue) && usernameRx.test(usernameValue) && passwordRx.test(rePasswordValue) && emailRx.test(emailValue)) {
        if (passwordValue == rePasswordValue) {
            register()
        } else {
            error.appendChild(document.createTextNode('Contraseñas no coinciden \n'))
            registerForm.insertBefore(error, document.getElementById('errorBr'))
        }
    } else {
        if (!usernameRx.test(usernameValue)) {
            error.appendChild(document.createTextNode('Nombre de usuario no válido'))
        } else if (!passwordRx.test(passwordValue) || !passwordRx.test(rePasswordValue)) {
            error.appendChild(document.createTextNode('Contraseñas no válidas \n'))
        } 
    }

    registerForm.childNodes.forEach((v, k, p) => {
        if (v.id == "errorDiv") v.remove()
    })

    registerForm.insertBefore(error, document.getElementById('errorBr'))
}

function register() {
    let formSerialized = $('#rForm').serializeObject();

    formSerialized.avatar = "https://api.multiavatar.com/" + formSerialized.username + ".svg"; //NOTE -> Apikey ?apikey=7ain1ter2Mh0k9
    // formSerialized.avatar = faker.image.avatar();

    ajaxPromise('POST', 'module/auth/controller/AuthController.php?op=register', 'json', formSerialized).then((response) => {
        let loginInfo = { "username": formSerialized.username, "password": formSerialized.password }
        login(loginInfo)
    })
}

export { validateRegisterForm }