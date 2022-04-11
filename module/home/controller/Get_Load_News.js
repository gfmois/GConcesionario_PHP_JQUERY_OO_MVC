function getNews() {
    let newsArray = []
    let url = "https://gnews.io/api/v4/search?"
    let apiKey = "609c2abc60427bbd38546eef259cf7ee"
    let urlParams = "lang=es&max=10&topic=technology"
    let newsThemes = ["AUDI", "BMW", "Tesla", "Ford", "Fiat"]
    const params = new URLSearchParams(encodeURI(urlParams))

    localStorage.setItem('clickCount', 0)

    if (newsThemes[parseInt(localStorage.getItem('newsSection'))] != undefined) {
        params.set('q', newsThemes[parseInt(localStorage.getItem('newsSection'))])
    } else {
        params.set('q', newsThemes[parseInt(Math.random() * (4 - 0) + 0)])
    }
    params.set('token', apiKey)

    url += params.toString()

    // console.log(url);

    window.addEventListener('load', () => {
        if (typeof newsThemes[parseInt(localStorage.getItem('newsSection'))] == "undefined") {
            localStorage.setItem('newsSection', 0)
        } else {
            let nNew = parseInt(localStorage.getItem('newsSection')) + 1
            localStorage.setItem('newsSection', nNew)
        }
    })

    ajaxPromise('GET', url, "json").then((response) => {
        let zerogrid = document.createElement('div')
        let zgridRow = document.createElement('div')
        let firstDiv = document.createElement('div')
        let secondDiv = document.createElement('div')
        let thirdDiv = document.createElement('div')
        let fDivWrapCol = document.createElement('div')
        let sDivWrapCol = document.createElement('div')
        let tDivWrapCol = document.createElement('div')
        let moreNews = document.createElement('a')

        zerogrid.className = "zerogrid"
        zerogrid.id = "zGridNews"
        zgridRow.className = "row"
        zgridRow.id = "newsRow"
        firstDiv.className = "col-1-3"
        secondDiv.className = "col-1-3"
        thirdDiv.className = "col-1-3"
        firstDiv.id = "fDiv"
        secondDiv.id = "sDiv"
        thirdDiv.id = "tDiv"
        fDivWrapCol.className = "wrap-col item"
        sDivWrapCol.className = "wrap-col item"
        tDivWrapCol.className = "wrap-col item"
        moreNews.className = "btn more_news"
        moreNews.id = "mNews"

        // tDivWrapCol.style.borderRight = "none"

        $.each(response.articles, function(index, news) {
            newsArray.push(news)
            if (index < 3) {
                // console.log(index);
                switch (index) {
                    case 0:
                        let itemHeader_d1 = document.createElement('h3')
                        let content_d1 = document.createElement('span')
                        let image_d1 = document.createElement('img')
                        let description_d1 = document.createElement('p')

                        itemHeader_d1.className = "item-header"
                        image_d1.src = news.image

                        itemHeader_d1.appendChild(document.createTextNode(news.title))
                        content_d1.appendChild(document.createTextNode(news.description))
                        description_d1.appendChild(document.createTextNode(news.content))

                        fDivWrapCol.appendChild(itemHeader_d1)
                        fDivWrapCol.appendChild(image_d1)
                        fDivWrapCol.appendChild(description_d1)

                        $(fDivWrapCol).on('click', () => {
                            window.open(news.url)
                        })
                        break;
                    case 1:
                        let itemHeader_d2 = document.createElement('h3')
                        let content_d2 = document.createElement('span')
                        let image_d2 = document.createElement('img')
                        let description_d2 = document.createElement('p')

                        itemHeader_d2.className = "item-header"
                        image_d2.src = news.image

                        itemHeader_d2.appendChild(document.createTextNode(news.title))
                        content_d2.appendChild(document.createTextNode(news.description))
                        description_d2.appendChild(document.createTextNode(news.content))

                        sDivWrapCol.appendChild(itemHeader_d2)
                        sDivWrapCol.appendChild(image_d2)
                        sDivWrapCol.appendChild(description_d2)

                        $(sDivWrapCol).on('click', () => {
                            window.open(news.url)
                        })
                        break;
                    case 2:
                        let itemHeader_d3 = document.createElement('h3')
                        let content_d3 = document.createElement('span')
                        let image_d3 = document.createElement('img')
                        let description_d3 = document.createElement('p')

                        itemHeader_d3.className = "item-header"
                        image_d3.src = news.image

                        itemHeader_d3.appendChild(document.createTextNode(news.title))
                        content_d3.appendChild(document.createTextNode(news.description))
                        description_d3.appendChild(document.createTextNode(news.content))

                        tDivWrapCol.appendChild(itemHeader_d3)
                        tDivWrapCol.appendChild(image_d3)
                        tDivWrapCol.appendChild(description_d3)

                        $(tDivWrapCol).on('click', () => {
                            window.open(news.url)
                        })
                        break;
                }
            }
        });

        moreNews.appendChild(document.createTextNode('Mas noticias'))

        firstDiv.appendChild(fDivWrapCol)
        secondDiv.appendChild(sDivWrapCol)
        thirdDiv.appendChild(tDivWrapCol)

        zgridRow.appendChild(firstDiv)
        zgridRow.appendChild(secondDiv)
        zgridRow.appendChild(thirdDiv)
        zgridRow.lastChild.appendChild(moreNews)

        zerogrid.appendChild(zgridRow)

        document.getElementById('newsSection').appendChild(zerogrid)

        // console.log(newsArray[position].title);

        // TODO: Hacer otra linea de noticias y al segundo click quitar el botón
        $(moreNews).on('click', () => {
            loadNews(newsArray)
        })
    })
}

function loadNews(newsArray = []) {
    localStorage.setItem('clickCount', parseInt(localStorage.getItem('clickCount')) + 1)

    let newsRow = document.createElement('div')
    let position = parseInt(localStorage.getItem('clickCount') * 3)

    // console.log(position);

    newsRow.className = "row"
    newsRow.id = "newsRow"

    // console.log(newsArray);

    if (parseInt(localStorage.getItem('clickCount')) < 3) {

        if (parseInt(localStorage.getItem('clickCount')) == 2) {
            document.getElementById('mNews').remove()
        }

        let zGrid = document.getElementById('newsRow')

        zGrid.childNodes.forEach((value, key, parent) => {
            if ($(value).is('div')) {
                let duplNode = value.cloneNode(true)
                    // console.log(key);

                duplNode.childNodes.forEach((cValue, cKey, cParent) => {
                    let duplChild = cValue.cloneNode(true)

                    // console.log(duplChild);

                    duplChild.childNodes.forEach((subChildValue, subChildKey, subChildParent) => {
                        subChildValue.textContent = ""
                        subChildValue.src = ""

                        switch (subChildKey) {
                            case 0:
                                subChildValue.textContent = newsArray[position].title
                                break;
                            case 1:
                                subChildValue.src = newsArray[position].image
                                break;
                            case 2:
                                let parentNode = document.createElement('div')

                                parentNode.className = "col-1-3"
                                parentNode.id = duplNode.id

                                subChildValue.textContent = newsArray[position].content

                                parentNode.appendChild(duplChild)
                                newsRow.appendChild(parentNode)

                                position += 1

                                // FIXME: URL lleva a la mimsa noticia
                                $(parentNode).on('click', () => {
                                    window.open(newsArray[position].url)
                                })
                                break;
                        }
                    });
                })

            }
        });

        document.getElementById('zGridNews').appendChild(newsRow)

    }
}

export { getNews, loadNews }