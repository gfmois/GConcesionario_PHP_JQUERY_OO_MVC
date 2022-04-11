function Timer(fn, time) {
    let timerObj = setInterval(fn, time)

    this.stop = () => {
        if (timerObj) {
            clearInterval(timerObj)
            timerObj = null;
        }

        return this;
    }

    this.start = () => {
        if (!timerObj) {
            this.stop()
            timerObj = setInterval(fn, time)
        }

        return this;
    }

    this.restart = (newT = t) => {
        t = newT;

        return this.stop().start();
    }
}


export { Timer }