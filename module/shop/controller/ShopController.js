import { initMap } from './initMap.js'
import { queryString } from './queryString.js'
import { loadFiltersDiv, setFilters } from './set_load_filters.js'
import { pagination } from './pagination.js'

function loadCars(carsReceived = [], op = 0) {

    let urlParams = window.location.search
    let params = new URLSearchParams(urlParams)

    if (!params.get('page') && params.get('module') == "shop") {
        console.log('A');
        params.set('page', 1)
        window.history.replaceState({}, '', `${window.location.pathname}?${decodeURIComponent(params)}`)
    }

    let page = params.get('page') != null ? params.get('page') : 1;

    // console.log(page);

    let url = 'module/shop/controller/ShopController.php?op=fndAll&page=' + page

    // console.log(url);

    ajaxPromise('GET', url, 'json').then((json) => {
        // console.log('a');

        let filtersDiv = document.createElement('div')
        let itemsDiv = document.createElement('div')

        // Set the Two Divs (Left for Filters - Right for Items)
        let main = document.createElement('main')

        filtersDiv.className = "filterDiv"
        filtersDiv.id = "fDiv"
        itemsDiv.className = 'itemsDiv'
        itemsDiv.id = 'iList'
        main.className = "cards"

        if (carsReceived.length == 0 && op == 1) {
            let noFounded = document.createElement('div')

            noFounded.className = "not_found"

            noFounded.appendChild(document.createTextNode('No se encontraron vehículos con estos filtros.'))
            itemsDiv.appendChild(noFounded)
        }

        $.each(carsReceived.length == 0 ? json[0] : carsReceived, function(index, item) {
            let greenLight = true
            while (greenLight) {
                if (document.getElementById('shopList').firstChild != document.getElementById('shopList').lastChild) {
                    document.getElementById('shopList').removeChild(document.getElementById('shopList').lastChild)
                } else {
                    greenLight = false;
                }
            }

            // Elements
            let article = document.createElement('article')
            let info = document.createElement('div')
            let remplace = document.createElement('div')
            let img = document.createElement('img')

            // Article options
            article.className = "card"
            article.id = item.vin_number

            // Remplace
            remplace.className = "remplace loading"
            remplace.id = "remplace"

            remplace.style.width = 198
            remplace.style.height = 119

            // Img options
            pausedPromise(350).then(() => {
                setTimeout(() => document.getElementById('remplace').remove(), 0) // Remove Div 
                let firstChild = article.firstChild
                img.src = item.carUrl == undefined || null ? "view/images/loading.gif" : item.carUrl
                img.style.height = 119
                img.style.width = 198
                article.insertBefore(img, firstChild)
            })

            // info options
            let title = document.createElement('h3')
            let text = document.createElement('p')
            let button = document.createElement('button')
            let icon = document.createElement('i')

            info.className = "text"
            info.id = "info"
            icon.className = "fas fa-heart"
            button.className = "likeBtn"

            title.appendChild(
                    document.createTextNode(item.brand_name + ' ' + item.model_name)
                )
                // text.appendChild(document.createTextNode('Descripción'))
            button.appendChild(icon)

            info.appendChild(title)
                // info.appendChild(text)
            info.appendChild(button)

            // Structure
            article.appendChild(remplace)
            article.appendChild(info)
            itemsDiv.appendChild(article)

            $(button).mouseenter(() => {
                article.style.pointerEvents = "none";
            })

            if (localStorage.getItem('token')) {
                $(button).on('click', () => {
                    ajaxPromiseW_Token('POST', "module/shop/controller/ShopController.php?op=likeStatus", 'json', { "idCar": this.id }).then((res) => {
                        if (res.message.cod == 278) {
                            $(button).addClass('liked')
                        } else if (res.message.cod == 346) {
                            $(button).removeClass('liked')
                        }
                    })
                })
            }


            $(button).mouseleave(function() {
                article.style.pointerEvents = "auto";
                $(article).on('click', function() {
                    let id = $(this).attr('id');
                    ajaxPromise('POST', 'module/shop/controller/ShopController.php?op=addCount', 'json', { key: id })
                        .then((response) => console.log('Mas Uno'))

                    let itemsOfList = document.getElementById('shopList')
                    while (itemsOfList.firstChild) {
                        itemsOfList.removeChild(itemsOfList.lastChild);
                    }
                    loadDetails(item.id);
                })
            });


        });

        document.getElementById('shopList').appendChild(filtersDiv)
        document.getElementById('shopList').appendChild(itemsDiv)

        initMap(carsReceived.length == 0 ? json[0] : carsReceived)
        pausedPromise(350).then(() => loadLikes())
    })
}

function loadDetails(carID) {
    let url = "module/shop/controller/ShopController.php?op=fndCar&id=" + carID
    ajaxPromise('GET', url, 'json').then((json) => {
        // console.log(json);

        // Elements
        let main = document.createElement('main')
        let thumbCarousel = document.createElement('div')

        main.className = "container"
        thumbCarousel.className = "carousel max-w-xl mx-auto"
        thumbCarousel.id = "thumbCarousel"

        // Left Side -> Images
        let leftColumn = document.createElement('div')
        let gallery = document.createElement('div')

        leftColumn.className = 'left-column'
        gallery.id = "gallery"

        $.each(json[1], function(index, imgSrc) {
            let a = document.createElement('a')
            let img = document.createElement('img')
            let carouselSlide = document.createElement('div')
            let imgCarousel = document.createElement('img')

            carouselSlide.className = "carousel__slide"
            imgCarousel.className = "panzoom__content"
            imgCarousel.src = imgSrc.imgUrl

            img.src = imgSrc.imgUrl
            a.href = imgSrc.imgUrl

            if (index != 0) {
                a.style.display = "none"
            }

            carouselSlide.appendChild(imgCarousel)
            thumbCarousel.appendChild(carouselSlide)
            a.appendChild(img)
            gallery.appendChild(a)
        });

        leftColumn.appendChild(gallery)
        leftColumn.appendChild(thumbCarousel)

        const fancyBox = Fancybox.bind("#gallery a", {
            groupAll: true, // Group all items
            Carousel: {
                on: {
                    change: (e) => {
                        // console.log(that.page);
                    },
                },
            },
            keyboard: {
                Escape: "close",
                Delete: "close",
                Backspace: "close",
                PageUp: "next",
                PageDown: "prev",
                ArrowUp: "next",
                ArrowDown: "prev",
                ArrowRight: "next",
                ArrowLeft: "prev",
            }
        });

        pausedPromise(350).then(() => {
            const thumb = new Carousel(document.querySelector("#thumbCarousel"), {
                Sync: {
                    target: fancyBox,
                    friction: 0,
                },
                Dots: false,
                Navigation: false,
                center: true,
                infinite: false,
            });
        })

        // Right Side -> Product Description
        let rightColumn = document.createElement('div')
        let prodDescription = document.createElement('div')

        rightColumn.className = "right-column"
        prodDescription.className = "product-description"

        // Description
        let title = document.createElement('span')
        let subtitle = document.createElement('h1')
        let description = document.createElement('p')

        title.appendChild(
                document.createTextNode(json[0].brand_name)
            )
            // console.log(json);
        subtitle.appendChild(
            document.createTextNode(json[0].model_name)
        )

        // TODO: Alter car table and add description of car.
        description.appendChild(
            document.createTextNode(json[0].description)
        )

        prodDescription.appendChild(title)
        prodDescription.appendChild(subtitle)
        prodDescription.appendChild(description)

        // Product Configuration
        let prodConf = document.createElement('div')
        let prodColor = document.createElement('div')
        let colorChoose = document.createElement('div')
        let backButton = document.createElement('button')
        let backIcon = document.createElement('i')

        prodConf.className = "product-configuration"
        prodColor.className = "product-color"
        colorChoose.className = "color-choose"
        backButton.className = "backBtn"
        backIcon.className = "fas fa-window-close"

        backButton.appendChild(backIcon)


        let colors = ['red', 'blue', 'yellow', 'green', 'black']
        let h1 = document.createElement('h1')
        let span = document.createElement('span')

        for (let i = 0; i < colors.length; i++) {
            let colorDiv = document.createElement('div')
            let colorInput = document.createElement('input')
            let colorLabel = document.createElement('label')

            colorInput.type = "radio"
            colorInput.id = colors[i]
            colorInput.value = colors[i]

            colorLabel.setAttribute('for', colors[i])

            // colorChoose.appendChild(
            //     document.createElement('span')
            // )

            colorLabel.appendChild(document.createElement('span'))
            colorDiv.appendChild(colorInput)
            colorDiv.appendChild(colorLabel)

            colorChoose.appendChild(colorDiv)
        }

        span.appendChild(document.createTextNode('Color'))

        prodColor.appendChild(h1.appendChild(span))
        prodColor.appendChild(colorChoose)
        prodConf.appendChild(prodColor)
        prodConf.appendChild(backButton)

        rightColumn.appendChild(prodDescription)
        rightColumn.appendChild(prodConf)

        main.appendChild(leftColumn)
        main.appendChild(rightColumn)

        document.getElementById('shopList').appendChild(main)

        // Extras Configuration
        // TODO: Create Extras DIV and rest of them.

        pausedPromise(350).then(() => {
            let relatedDiv = document.createElement('div')
            let relatedTitle = document.createElement('h3')

            relatedDiv.className = "relatedCars"

            relatedTitle.appendChild(document.createTextNode('Relacionados'))

            relatedDiv.appendChild(relatedTitle)
            relatedDiv.appendChild(document.createElement('br'))

            for (let i = 0; i < json[2].length; i++) {
                let rArticle = document.createElement('article')
                let rCarImg = document.createElement('img')
                let rCarInfo = document.createElement('div')
                let rCarModel = document.createElement('h3')

                rArticle.className = "card"
                rCarImg.style.height = "119px"
                rCarImg.style.width = "198px"

                rCarImg.src = json[2][i].carUrl

                rCarInfo.className = "text"
                rCarInfo.id = "info"

                rCarModel.appendChild(document.createTextNode(json[2][i].brand_name + " " + json[2][i].model_name))

                rCarInfo.appendChild(rCarModel)

                rArticle.appendChild(rCarImg)
                rArticle.appendChild(rCarInfo)

                relatedDiv.appendChild(rArticle)

                $(rArticle).on('click', () => {
                    let shop = document.getElementById('shopList')

                    while (shop.firstChild) {
                        shop.removeChild(shop.lastChild);
                    }

                    loadDetails(json[2][i].id)
                })
            }

            document.getElementById('shopList').appendChild(relatedDiv)

            // relatedDiv.childNodes.forEach((v, k, p) => {
            //     v.childNodes.forEach((vv, kk, pp) => {
            //         console.log(vv.textContent);
            //     })
            // });
        })

        $(backButton).on('click', function() {
            window.location.reload();
        })
    })
}

function loadLikes() {
    if (localStorage.getItem('token')) {
        ajaxPromiseW_Token('GET', 'module/shop/controller/ShopController.php?op=likes', 'json').then((likes) => {
            $.each(likes, function(index, item) {
                $('#' + item.vin_number).find('button').addClass('liked');
            });
        })
    }
}

$(document).ready(function() {
    let url = window.location.search
    let params = new URLSearchParams(url)
    if (params.get('module') == 'shop') {
        loadCars();
        loadFiltersDiv()
        queryString()
    }
});

export { loadDetails, setFilters, loadCars }