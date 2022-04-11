function pagination(actualPage, op = 0) {
    let url = 'module/shop/controller/ShopController.php?op=fndAll&page=' + actualPage
    let hasFilters = false;
    let filters = JSON.parse(localStorage.getItem('filters'))

    let urlParams = window.location.search
    let params = new URLSearchParams(urlParams)

    pausedPromise(450).then(() => {
        let paginationDOM = document.getElementById('shopList')

        paginationDOM.childNodes.forEach((v, k, p) => {
            if (v.className == "container") {
                console.log(p);
                if (paginationDOM.childNodes[k] != paginationDOM.lastChild) {
                    paginationDOM.childNodes[k].remove()
                }
            }
        })
    })

    $.each(filters, function (index, items) { 
        if (items.length > 0) {
            hasFilters = true
        } 
    });
    
    if (hasFilters == true) {
        url = 'module/shop/controller/ShopController.php?op=filters&page=' + actualPage
    }
    
    ajaxPromise('POST', url, 'json', filters).then((response) => {
        let container = document.createElement('div')
        let pagination = document.createElement('div')
        let next_Page = document.createElement('a')
        let n_pages = 0

        if (hasFilters == true) {
            n_pages = Math.ceil(response.length / 8)
        } else {
            n_pages = Math.ceil(response[1].n_cars / 8);
        }

        container.className = "container"
        container.id = "cPagination"
        pagination.className = "pagination"

        for (let i = 0; i <= n_pages; i++) {
            let pagNumber = document.createElement('a')
            let prev_Page = document.createElement('a')

            if (i == 0) {
                prev_Page.appendChild(document.createTextNode('«'))
                pagination.appendChild(prev_Page)
            } else if (i != 0 && i == n_pages) {
                next_Page.appendChild(document.createTextNode('»'))
            }

            if (i != 0) {
                pagNumber.appendChild(document.createTextNode(i))
                pagination.appendChild(pagNumber)

                $(pagNumber).on('click', function() {
                    params.set('page', i)
                    window.history.replaceState({}, '', `${window.location.pathname}?${decodeURIComponent(params)}`)
                    window.location.reload()

                })
            }

            $(prev_Page).on('click', function() {
                if (params.get('page') != 1) {
                    params.set('page', parseInt(params.get('page')) - 1)
                    window.history.replaceState({}, '', `${window.location.pathname}?${decodeURIComponent(params)}`)
                    window.location.reload()
                }
            })

            $(next_Page).on('click', function() {
                if (params.get('page') != n_pages) {
                    params.set('page', parseInt(params.get('page')) + 1)
                    window.history.replaceState({}, '', `${window.location.pathname}?${decodeURIComponent(params)}`)
                    window.location.reload()
                }
            })
        }

        pagination.appendChild(next_Page)

        container.appendChild(pagination)

        pausedPromise(350).then(() => {
            document.getElementById('shopList').appendChild(container)
        })
    })
}

export { pagination }