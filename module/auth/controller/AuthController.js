import { validateLoginForm } from './loginController.js'
import { validateRegisterForm } from './registerController.js'

function loadForm() {
    let topContainer = document.createElement('div')

    topContainer.className = "authContainer"
    topContainer.id = "authContainer"

    // Create Account
    let registerFormContainer = document.createElement('div')
    let registerForm = document.createElement('form')
    let createTitle = document.createElement('h1')
    let createUsername = document.createElement('input')
    let createPassword = document.createElement('input')
    let createPasswordConfirm = document.createElement('input')
    let createEmail = document.createElement('input')
    let createButton = document.createElement('input')
    let errorBr = document.createElement('br')

    registerFormContainer.className = "form-container sign-up-container"
    registerForm.setAttribute('autocomplete', 'off')
    registerForm.className = "authForm"
    errorBr.id = "errorBr"
    registerForm.id = "rForm"
    createButton.value = "Crear Cuenta"
    createButton.type = "button"
    createButton.id = "registerBtn"
    createUsername.type = "text"
    createUsername.className = "authInput"
    createPassword.className = "authInput"
    createPasswordConfirm.className = "authInput"
    createEmail.className = "authInput"
    createEmail.type = "email"
    createPassword.type = "password"
    createPasswordConfirm.type = "password"
    createUsername.placeholder = "Usuario "
    createEmail.placeholder = "Email "
    createPassword.placeholder = "Contraseña "
    createPasswordConfirm.placeholder = "Repetir Contraseña "
    
    createUsername.name = "username"
    createPassword.name = "password"
    createPasswordConfirm.name = "password_confirm"
    createEmail.name = "email"

    createTitle.appendChild(document.createTextNode('Crear Cuenta'))

    registerForm.appendChild(createTitle)
    registerForm.appendChild(document.createElement('br'))
    registerForm.appendChild(createUsername)
    registerForm.appendChild(createEmail)
    registerForm.appendChild(createPassword)
    registerForm.appendChild(createPasswordConfirm)
    registerForm.appendChild(errorBr)
    registerForm.appendChild(createButton)

    registerFormContainer.appendChild(registerForm)
    topContainer.appendChild(registerFormContainer)

    // Sign In
    let loginFormContainer = document.createElement('div')
    let loginForm = document.createElement('form')
    let loginTitle = document.createElement('h1')
    let loginUsername = document.createElement('input')
    let loginPassword = document.createElement('input')
    let loginBtn = document.createElement('input')
    let errorLogbr = document.createElement('br')

    loginFormContainer.className = "form-container sign-in-container"
    errorLogbr.id = "errorBrLogin"
    loginForm.className = "authForm"
    loginForm.id = "lForm"
    loginUsername.id = "username"
    loginPassword.id = "password"
    loginUsername.className = "authInput"
    loginUsername.name = "username"
    loginPassword.className = "authInput"
    loginPassword.name = "password"
    loginBtn.type = "button"
    loginBtn.value = "Iniciar Sesión"
    loginBtn.id = "loginBtn"
    loginUsername.type = "text"
    loginPassword.type = "password"
    loginUsername.placeholder = "Usuario "
    loginPassword.placeholder = "Contraseña "

    loginTitle.appendChild(document.createTextNode('Iniciar Sesión'))

    loginForm.appendChild(loginTitle)
    loginForm.appendChild(document.createElement('br'))
    loginForm.appendChild(loginUsername)
    loginForm.appendChild(loginPassword)
    loginForm.appendChild(errorLogbr)
    loginForm.appendChild(loginBtn)

    loginFormContainer.appendChild(loginForm)
    topContainer.appendChild(loginFormContainer)

    // Overlay Container
    let overlayContainer = document.createElement('div')
    let overlay = document.createElement('div')
    let leftPanel = document.createElement('div')
    let rightPanel = document.createElement('div')

    overlayContainer.className = "overlay-container"
    overlay.className = "overlay"
    leftPanel.className = "overlay-panel overlay-left"
    rightPanel.className = "overlay-panel overlay-right"

    // Left Panel
    let leftTitle = document.createElement('h1')
    let leftText = document.createElement('p')
    let leftButton = document.createElement('input')

    leftButton.className = "ghost"
    leftButton.type = "button"
    leftButton.id = "signIn"
    leftButton.value = "Iniciar Sesión"

    leftTitle.appendChild(document.createTextNode('¡Bienvenido de nuevo!'))
    leftText.appendChild(document.createTextNode('Para mantenerse conectado con nosotros, inicie sesión con su información personal'))

    leftPanel.appendChild(leftTitle)
    leftPanel.appendChild(leftText)
    leftPanel.appendChild(leftButton)

    // Right Panel
    let rightTitle = document.createElement('h1')
    let rightText = document.createElement('p')
    let rightButton = document.createElement('input')

    rightButton.className = "ghost"
    rightButton.id = "signUp"
    rightButton.type = "button"
    rightButton.value = "Registrarse"

    rightTitle.appendChild(document.createTextNode('Hola, ¿Eres Nuevo?'))
    rightText.appendChild(document.createTextNode('Ingresa tus datos personales y comienza tu viaje con nosotros'))

    rightPanel.appendChild(rightTitle)
    rightPanel.appendChild(rightText)
    rightPanel.appendChild(rightButton)

    overlay.appendChild(leftPanel)
    overlay.appendChild(rightPanel)
    overlayContainer.appendChild(overlay)

    topContainer.appendChild(overlayContainer)

    rightButton.addEventListener('click', () => {
        topContainer.classList.add("right-panel-active");
    });

    leftButton.addEventListener('click', () => {
        topContainer.classList.remove("right-panel-active");
    });

    document.getElementById('loginForm').appendChild(topContainer)

    $(loginForm).keypress(function(event) {
        let keyCode = (event.keyCode ? event.keyCode : event.which)

        if (keyCode == 13) {
            event.preventDefault()
            validateLoginForm()
        }
    })

    $(registerForm).keypress(function(event) {
        let keyCode = (event.keyCode ? event.keyCode : event.which)

        if (keyCode == 13) {
            event.preventDefault()
            validateRegisterForm()
        }
    })

    $(loginBtn).on('click', function(e) {
        e.preventDefault();
        validateLoginForm()
    })

    $('#registerBtn').on('click', function(e) {
        e.preventDefault()
        validateRegisterForm()
    })
}

$(document).ready(function() {
    loadForm()
});