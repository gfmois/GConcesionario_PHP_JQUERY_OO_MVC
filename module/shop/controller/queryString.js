import { setLocalStorage } from './setLocalStorage.js'
import { setFilters } from './ShopController.js'

function queryString() {
    console.log('Query');

    pausedPromise(1000).then(() => {
        const querystring = window.location.search
        const params = new URLSearchParams(querystring)

        let filterOptionsQS = []

        for (let op of params) {
            filterOptionsQS.push(op)
        }

        for (let i = 1; i < filterOptionsQS.length; i++) {
            if (filterOptionsQS[i][1].includes(',')) {
                let splitedFOptions = filterOptionsQS[i][1].split(',')

                $.each($('input[type=checkbox]'), function(index, item) {
                    for (let j = 0; j < splitedFOptions.length; j++) {
                        if ($(item).parent().children('.f-9').html() == splitedFOptions[j].toString()) {
                            $(item).prop('checked', true)
                        }
                    }

                })
            } else {
                // console.log(filterOptionsQS);

                if (filterOptionsQS[i][0] != 'page') {
                    $.each($('input[type=checkbox]'), function(index, item) {
                        if ($(item).parent().children('.f-9').html() == filterOptionsQS[i][1]) {
                            $(item).prop('checked', true)
                        } else if ($(item).attr('id') == filterOptionsQS[i][1]) {
                            $(item).prop('checked', true)
                        }
                    })

                    if (filterOptionsQS[i][0] == "city") {
                        $('.cityInput').val(filterOptionsQS[i][1])
                    }
                }
            }

            setLocalStorage()
            setFilters()
        }
    })
}

export { queryString }