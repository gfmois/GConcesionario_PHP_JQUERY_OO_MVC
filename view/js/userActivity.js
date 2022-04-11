import { Timer } from '../../module/auth/view/js/timer.js'
import { logout } from './main.js'

function protectUrl() {
    ajaxPromise('GET', "module/auth/controller/AuthController.php?op=userControl", "json").then((res) => {
        if (res.message.cod == 103) {
            localStorage.removeItem('token')
            logout()
        }
    })
}

$(document).ready(function() {
    if (localStorage.getItem('token')) {
        let t = new Timer(() => {
            ajaxPromise('GET', 'module/auth/controller/AuthController.php?op=session', "json").then((response) => {
                console.log(response.message);
                if (response.message.cod == 64) {
                    localStorage.removeItem('token')
                    Swal.fire({
                        title: 'Se cerró sessión por inactividad.',
                        text: 'Click para inicar sesión de nuevo.',
                        showDenyButton: true,
                        icon: 'error',
                        confirmButtonText: 'Iniciar Sesión',
                        denyButtonText: "Continuar sin sesión."
                    }).then((op) => {
                        if (op.isConfirmed) {
                            let url = window.location.search
                            let params = new URLSearchParams(url)

                            params.set('module', "auth")
                            window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
                            window.location.reload()
                            console.log(params.toString());
                        } else if (op.isDenied) {
                            window.location.reload()
                        }
                    })
                }
            })
        }, 120000)
        protectUrl()
    }
});