$(document).ready(function() {
    $('.search-menu').hide()
    let searchIcon = $('.sIcon')
    let catCB = $('.catCB')
    let brandCB = $('.brandCB')
    let searchInput = $('#search-input')
    let click = 0

    searchIcon.click(function(e) {
        click++;

        if (click == 1) {
            click = -1;
            searchIcon.removeClass();
            searchIcon.addClass('fas fa-times-circle');

            $('a').not(searchIcon).fadeOut()
            setTimeout(function() {
                $('.search-menu').fadeIn()
            }, 500)

        } else {
            searchIcon.removeClass();
            searchIcon.addClass('fa fa-search');

            $('.search-menu').fadeOut()
            setTimeout(function() {
                $('a').not(searchIcon).fadeIn();
            }, 500)
        }
    });

    const queryString = window.location.search
    const params = new URLSearchParams(queryString)

    pausedPromise(600).then(() => {
        if (catCB.val() == "-" && brandCB.val() == "-") {
            ajaxPromise('GET', 'module/search/controller/SearchController.php?op=cat', 'json').then((response) => {
                $.each(response, function(indexInArray, item) {
                    let catOption = document.createElement('option')

                    catOption.value = item.id_cat
                    catOption.appendChild(document.createTextNode(item.cat_name))

                    document.getElementById('catCB').appendChild(catOption)
                });
            })

            ajaxPromise('GET', 'module/search/controller/SearchController.php?op=brand', 'json').then((response) => {
                $.each(response, function(indexInArray, item) {
                    let brandOption = document.createElement('option')

                    brandOption.value = item.id_brand
                    brandOption.appendChild(document.createTextNode(item.brand_name))

                    document.getElementById('brCB').appendChild(brandOption)
                });
            })
        }
    })

    let searchOptions = {
        city: "",
        id_cat: "",
        id_brand: ""
    }

    searchInput.keyup(function() {

        params.set('city', searchInput.val())

        if (!params.get('city')) {
            params.delete('city')
        }

        searchOptions.city = $(this).val()
    })


    catCB.on('change', function() {
        if ($(this).attr('value') != "-") searchOptions.id_cat = $(this).val()
        else searchOptions.id_cat = ""

        if ($(this).val() == '-') {
            searchOptions.id_cat = null
        }

        params.set('id_cat', catCB.val())

        if (!params.get('id_cat')) {
            params.delete('id_cat')
        }

        // searchOptions.id_cat = $(this).val();
    })

    brandCB.on('change', function() {
        if ($(this).attr('value') == "-") searchOptions.id_brand = ""
        else searchOptions.id_brand = $(this).val()


        params.set('id_brand', brandCB.val())

        if (!params.get('id_brand')) {
            params.delete('id_brand')
        }

        // searchOptions.id_brand = $(this).val();
    })

    let categorySelect = document.getElementById('catCB')
    let brandSelect = document.getElementById('brCB')
    // let searchResponse = [];

    // $('.catCB, .brandCB').change(function() {
    //     ajaxPromise('POST', 'module/search/controller/SearchController.php?op=change', 'json', searchOptions).then((response) => {
    //         searchResponse = [];
    //         $.each(response, function (index, item) { 
    //             searchResponse.push(item)
    //         });

    //         $.each(searchResponse, function (index, item) { 
    //             let i = index;
    //             if (typeof searchResponse[index+1] != "undefined") {
    //                 if (item.id_cat != searchResponse[index+1].id_cat) {
    //                     let greenLight = true
    //                     let option = document.createElement('option')

    //                     while (greenLight) {
    //                         if (categorySelect.firstChild != categorySelect.lastChild) {
    //                             categorySelect.removeChild(categorySelect.lastChild)
    //                         } else {
    //                             greenLight = false;
    //                         }
    //                     }


    //                     option.value = item.id_cat
    //                     option.appendChild(document.createTextNode(item.cat_name))

    //                     categorySelect.appendChild(option)
    //                 } else {
    //                     console.log('B');
    //                     console.log(searchResponse[index].id_cat);
    //                     console.log(item.id_cat);
    
    //                 }
    //             }
    //         });
    //     })
    // })

    $('.searchBtn').on('click', function() {
        params.set('module', 'shop')

        window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
        window.location.reload()
    })
});