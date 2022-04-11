function clock() {
    let head = document.getElementsByTagName('HEAD')[0];
    let link = document.createElement('link');
    let clock = document.createElement('div');
    let clockWrapper = document.createElement('div')

    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = './view/css/clock.css';

    clockWrapper.className = "clock-wrapper"
    clockWrapper.id = "clockWrapper"

    clock.className = "clock-loader"
    clock.id = "clock"

    head.appendChild(link);
    clockWrapper.appendChild(clock)
    document.body.insertBefore(clockWrapper, document.body.firstChild)
}

export { clock }