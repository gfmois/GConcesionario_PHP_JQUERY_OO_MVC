import { clock } from '../../module/auth/view/js/clock.js'
import { Timer } from '../../module/auth/view/js/timer.js'

function loadMenu() {
    if (localStorage.getItem('token')) {
        // let token = { "token": localStorage.getItem('token').replace(/['"]+/g, '') }
        ajaxPromiseW_Token("POST", 'module/auth/controller/AuthController.php?op=checkToken', "json").then((response) => {
            if (response) {
                let dropdown = document.createElement('div')
                let dropbutton = document.createElement('btn')
                let dropdown_content = document.createElement('div')
                let menuWrapper = document.createElement('a')

                let option = ["Profile", "Logout"];

                dropdown.className = "dropdown"
                dropbutton.className = "dropbtn"
                dropdown_content.className = "dropdown-content"

                for (let i = 0; i < option.length; i++) {
                    let op = document.createElement('a')

                    op.id = "userLink"

                    op.appendChild(document.createTextNode(option[i].toString()))

                    dropdown_content.appendChild(op)

                    if (option[i].toString() == "Logout") {
                        op.className = "logout"
                    }
                }

                document.getElementById('userIcon').remove()

                dropbutton.style.background = "url(" + response.avatar + ") no-repeat"

                dropdown.appendChild(dropbutton)
                dropdown.appendChild(dropdown_content)

                menuWrapper.appendChild(dropdown)

                document.getElementById('user').appendChild(menuWrapper)

                console.log(response);
                console.log(document.getElementById('user'));

                $('.logout').on('click', function() {
                    logout()
                })
            } 
        })
    }
}

function logout() {
    ajaxPromiseW_Token('POST', 'module/auth/controller/AuthController.php?op=logout', 'json').then((response) => {
        if (response) {
            clock()
            setTimeout(() => {
                localStorage.removeItem('token')
                let search = window.location.search
                let params = new URLSearchParams(search)
                params.set('module', "auth")
                window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
                window.location.reload()
            }, 400)
        }
    })
}

$(document).ready(function() {
    loadMenu()
});

export { logout }