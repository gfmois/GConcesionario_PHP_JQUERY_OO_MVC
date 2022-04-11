import { clock } from '../view/js/clock.js'

function validateLoginForm() {
    let loginForm = document.getElementById('lForm')
    let username = document.getElementById('username')
    let password = document.getElementById('password')
    let loginBtn = document.getElementById('loginBtn')
    let error = document.createElement('div')

    error.id = "error"

    if (username.value.length == 0 && password.value.length != 0) {
        if (document.getElementById('error')) document.getElementById('error').remove()
        error.appendChild(document.createTextNode('Usuario vacío.'))
    } else if (password.value.length == 0 && username.value.length != 0) {
        if (document.getElementById('error')) document.getElementById('error').remove()
        error.appendChild(document.createTextNode('Contraseña vacia.'))
    } else if (username.value.length == 0 && password.value.length == 0) {
        if (document.getElementById('error')) document.getElementById('error').remove()
        error.appendChild(document.createTextNode('Rellene primero los campos.'))
    } else if (username.value.length != 0 && password.value.length != 0) {
        if (document.getElementById('error')) document.getElementById('error').remove()

        login()
    }

    loginForm.insertBefore(error, document.getElementById('errorBrLogin'))

}

function login(userInfo = $('#lForm').serializeObject()) {

    ajaxPromise('POST', 'module/auth/controller/AuthController.php?op=login', 'json', userInfo).then((response) => {
        console.log(response);
        if (response.message) {
            let logForm = document.getElementById('lForm')
            let errorMessage = document.getElementById('error')

            errorMessage.appendChild(document.createTextNode(response.message.commentary))

            logForm.insertBefore(errorMessage, document.getElementById('errorBrLogin'))
        } else {
            localStorage.setItem('token', response)
            clock()
            pausedPromise(700).then(() => {
                let search = window.location.search
                let params = new URLSearchParams(search)
                params.set('module', "home")
                window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
                window.location.reload()
            })
        }

    })
}

export { validateLoginForm, login }