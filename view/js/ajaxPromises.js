const pausedPromise = (ms) => new Promise((resolve, reject) => {
    setTimeout(async() => {
        try {
            resolve()
        } catch (error) {
            reject(error)
        }
    }, ms);
})

const ajaxPromise = (method, url, dataType, vData) => new Promise((resolve, reject) => {
    try {
        $.ajax({
            type: method,
            data: vData,
            url: url,
            dataType: dataType,
            success: (data) => {
                resolve(data)
            },
            error: (error) => {
                reject(error)
            }
        });
    } catch (error) {
        reject(error)
    }
});

const ajaxPromiseW_Token = (method, url, dataType, vData) => new Promise((resolve, reject) => {
    try {
        $.ajax({
            type: method,
            data: vData,
            url: url,
            dataType: dataType,
            headers: { token: localStorage.getItem('token') != null ? localStorage.getItem('token').replace(/['"]+/g, '') : false },
            success: (data) => {
                resolve(data)
            },
            error: (error) => {
                reject(error)
            }
        });
    } catch (error) {
        reject(error)
    }
});