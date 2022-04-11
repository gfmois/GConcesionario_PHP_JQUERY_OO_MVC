function setLocalStorage() {
    let fitlersJson = {
        city: [],
        color: [],
        n_doors: [],
        id_brand: [],
        id_model: [],
        id_body: [],
        id_cat: [],
        id_type: [],
        orderBy: []
    }

    // NOTE: Con el push se hacen demasiadas peticiones, ya que detecta el cambio y ejecuta otra mas. 
    if ($('.cityInput').val()) {
        fitlersJson.city.push($('.cityInput').val())
    }

    $.each($('input[type=checkbox]'), function(index, item) {
        if ($(this).prop("checked") == true) {
            switch ($(this).parent().parent().attr('id')) {
                case 'Order By':
                    fitlersJson.orderBy.push($(item).parent().children('.f-9').html())
                    break;
                case 'Colors':
                    fitlersJson.color.push($(item).parent().children('.f-9').html())
                    break;
                case 'N_Doors':
                    fitlersJson.n_doors.push($(item).parent().children('.f-9').html())
                    break;
                case 'Brands':
                    fitlersJson.id_brand.push($(item).attr('id'))
                    break;
                case 'Models':
                    fitlersJson.id_model.push($(item).attr('id'))
                    break;
                case 'Type':
                    fitlersJson.id_type.push($(item).attr('id'))
                    break;
                case 'Body Type':
                    fitlersJson.id_body.push($(item).attr('id'))
                    break;
                case 'Category':
                    fitlersJson.id_cat.push($(item).attr('id'))
                    break;

            }
        } else if ($(this).prop("checked") == false) {
            if (index == 0) {
                fitlersJson.color.pop()
            }
        }

        localStorage.setItem('filters', JSON.stringify(fitlersJson));
    })
}

export { setLocalStorage }