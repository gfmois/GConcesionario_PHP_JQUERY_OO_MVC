import { getNews } from './Get_Load_News.js'

function isOdd(n) {
    if (n % 2 == 0) {
        return true
    } else {
        return false
    }
}

function loadCarousel() {
    $.ajax({
        type: "GET",
        url: "module/home/controller/HomepageController.php?op=hpBrand",
        dataType: "json",
        success: function(json, status, jqXHR) {
            $.each(json, function(index, item) {
                let div = document.createElement('div') // Deslizable
                let card = document.createElement('div') // Card
                let image = document.createElement('div') // Imagen del Logo
                let card_body = document.createElement('div') // Cuerpo

                div.className = 'swiper-slide m-slider__item'
                card.className = 'm-card'
                card.id = item.id_brand
                image.className = 'm-card__header'
                image.style.backgroundImage = "url('" + item.url_brand + "')";
                card_body.className = 'm-card__body'
                card_body.textContent = item.brand_name


                card.appendChild(image)
                card.appendChild(card_body)
                div.appendChild(card)
                document.getElementById("logo").appendChild(div);
            });

            const swiper = new Swiper('.swiper', {
                direction: 'horizontal',
                speed: 400,
                loop: true,
                slidesPerView: 3,
                pagination: {
                    el: '.swiper-pagination',
                },
                autoplay: {
                    delay: 3500
                },
            })

            $('.m-card').on('click', function() {
                // console.log($(this).attr('id'));
                const queryString = window.location.search;
                const params = new URLSearchParams(queryString)

                params.set('module', 'shop')
                params.append('id_brand', $(this).attr('id'))

                window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
                window.location.reload()
            })
        },
        error: function(jqXHR, status, errorThrown) {
            console.log('Status: ' + jqXHR.status + '; ' + 'Error: ' + errorThrown);
        }
    });
}

function loadCategories() {
    $.ajax({
        url: "module/home/controller/HomepageController.php?op=hpCat",
        type: "GET",
        dataType: "json",
        success: function(json, status, jqXHR) {
            $.each(json, function(index, item) {
                let post = document.createElement('div')
                let colImg = document.createElement('div')
                let colWrapper = document.createElement('div')
                let image = document.createElement('img')
                let wrapper = document.createElement('div')
                let h3 = document.createElement('h3')
                let p = document.createElement('p')

                let h3text = document.createTextNode(item.cat_name)

                post.className = 'post'
                post.id = item.id_cat

                if (isOdd(index)) {
                    colImg.className = 'col-1-2'
                } else {
                    colImg.className = 'col-1-2 f-right'
                }

                colWrapper.className = 'col-1-2'

                image.src = item.url_cat
                p.appendChild(document.createTextNode(item.description))

                wrapper.className = 'wrapper'
                wrapper.appendChild(h3)
                h3.appendChild(h3text)
                wrapper.appendChild(p)

                post.appendChild(colImg).appendChild(image)
                post.appendChild(colWrapper).appendChild(wrapper)

                document.getElementById('ppost').appendChild(post)
            });

            $('.post').on('click', function() {
                // console.log($(this).attr('id'));
                const queryString = window.location.search;
                const params = new URLSearchParams(queryString)

                params.set('module', 'shop')
                params.append('id_cat', $(this).attr('id'))

                window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
                window.location.reload()
            })
        },
        error: function(jqHXR, status, errorThrown) {
            console.log('Status: ' + jqHXR.status + '; ' + 'Error: ' + errorThrown);
        }
    });
}

function loadTypes() {
    $.ajax({
        type: "GET",
        url: "module/home/controller/HomepageController.php?op=hpType",
        dataType: "json",
        success: function(json, status, jqXHR) {
            $.each(json, function(index, item) {
                let swiperItem = document.createElement('div')
                let wrapColDiv = document.createElement('div')
                let icon = document.createElement('i')
                let title = document.createElement('h3')
                let body = document.createElement('p')

                swiperItem.className = "swiper-slide col-1-4"
                wrapColDiv.className = 'wrap-col item cat'
                wrapColDiv.id = item.id_type

                body.appendChild(document.createTextNode(item.description))
                icon.className = item.icon_class
                title.appendChild(document.createTextNode(item.type_name))

                wrapColDiv.appendChild(icon)
                wrapColDiv.appendChild(title)
                wrapColDiv.appendChild(body)
                swiperItem.appendChild(wrapColDiv)

                document.getElementById('typeItem').appendChild(swiperItem);
            });

            const swiper = new Swiper('#type_swiper', {
                direction: 'horizontal',
                speed: 400,
                loop: true,
                slidesPerView: 3,
                pagination: {
                    el: '.swiper-pagination',
                },
                autoplay: {
                    delay: 3500
                },
            })

            $('.cat').on('click', function() {
                const queryString = window.location.search;
                const params = new URLSearchParams(queryString)
                    // console.log($(this).attr('id'));

                params.set('module', 'shop')
                params.append('id_type', $(this).attr('id'))

                window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
                window.location.reload()
            })
        },
        error: function(jqXHR, status, errorThrown) {
            console.log('Status: ' + jqXHR.status + '; ' + 'Error: ' + errorThrown);
        }
    });
}

function loadAll() {
    loadCarousel();
    loadCategories();
    loadTypes();
    getNews()
}

$(document).ready(function() {
    loadAll();
})