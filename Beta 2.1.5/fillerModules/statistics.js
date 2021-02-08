class Statistics{
    constructor(){
        this.attempts = 0;
        this.totalTime = 0;
        this.fastest;
        this.slowest;

        this.tmpStartTime;
    }

    _formatTimeString = (time) => {
        let s = (time / 1000).toFixed(2);

        /*
        if(s > 60){

            //Total time in minutes
            let m = (s / 60).toFixed(0);

            if(m > 60){

                //Total time in hours
                let h = (m / 60).toFixed(2);
                return h + "h " + (m - h*60).toFixed(0) + "m " + (s - m*60 - h*60).toFixed(2) + "s";
            }

            return m + "m " + (s - m*60).toFixed(2) + "s";
        }
        */

        return s + "s";
    }

    getStats = () =>{
        console.log("-----------------\nSTATISTICS\n-----------------");

        console.log(`Attempts: ${this.attempts}`);
        console.log(`Total runtime: ${this._formatTimeString(this.totalTime)}`);
        console.log(`Slowest fill: ${this._formatTimeString(this.slowest)}`);
        console.log(`Fastest fill: ${this._formatTimeString(this.fastest)}`);
        console.log(`Avg. runtime per fill: ${this._formatTimeString(this.totalTime / this.attempts)}`);
    }

    fillStart = () => {
        this.tmpStartTime = Date.now();
        this.attempts++;

        console.log("-----------------\nNR: " + (this.attempts) + "\n-----------------");
        console.log(`Fill ${this.attempts} started at ` + new Date().toLocaleString());
    }

    fillEnd = () => {
        let thisTotal = Date.now() - this.tmpStartTime;

        if(this.attempts == 1)
        {
            this.fastest = thisTotal;
            this.slowest = thisTotal;
        } else {
            if(thisTotal > this.slowest)
                this.slowest = thisTotal;

            if(thisTotal < this.fastest)
                this.fastest = thisTotal;
        }

        this.totalTime += thisTotal;

        console.log(`Fill ${this.attempts} finished at ` + new Date().toLocaleString());
        console.log("Runtime: " + this._formatTimeString(thisTotal));
    }

}


module.exports = Statistics;
