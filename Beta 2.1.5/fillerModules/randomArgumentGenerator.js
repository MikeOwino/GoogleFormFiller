const AsyncRandNames = require('./randomNames')

class RandomArgumentGenerator {

    constructor(){
        this.RandNames = new AsyncRandNames();
    }

    _randomNum = (max) => {
        //Range: 0 - (max-1)
        return Math.floor(Math.random() * Math.floor(max));
    }

    randomName = async () => {
        return await this.RandNames.getRandomName();
    }

    //Used for Multiple Choices, Dropdowns, Linear Scales
    randomOption = (countOfOptions) => {
        //Expected output: 1 - countOptions
        return this._randomNum(countOfOptions) + 1;
    }

    /*
        Used for Checkboxes
   
        Returns a 'numberOfWanted' length array of random numbers.
        If there's no numberOfWanted parameter specified, then the
        returned array will be random length in range of 1 - 'countOfOptions'
    */
    randomOptions = (countOfOptions, numberOfWanted = 0) => {
        if(numberOfWanted == 0)
            numberOfWanted = this._randomNum(countOfOptions) + 1;
        
        let buffer = new Array(countOfOptions);
        for(let i=0; i<countOfOptions; i++){
            buffer[i]=i+1;
        }
        
        let arr = new Array(numberOfWanted);
        for(let i=0; i<numberOfWanted; i++){
            arr[i] = buffer[this._randomNum(buffer.length)];
            buffer.splice(buffer.indexOf(arr[i]),1);
        }
        return arr;
    }

    /*
        Used for Grids

        Type:
        M - Multiple Choice grid
        C = Checkbox grid

        In case of Multiple Choice grids, the function returns a random
        option for each row;

        In case of Checkbox grids, the function returns a 'nrOfBoxesWanted' amount
        of options for each row;
        If no 'nrOfBoxesWanted' was specified the number of options will be random
        in range of 1 - 'cols'
    */
    randomGridOptions = (type, rows, cols, nrOfBoxesWanted = 0) => {
        let arr = [];

        if(type == 'M'){

            for(let i=0; i < rows; i++){
                arr = [...arr,  this.randomOption(cols)];
            }

            return arr;
        }

        if(type == 'C'){

            for(let i=0; i < rows; i++){
                arr = [...arr, ...this.randomOptions(cols, nrOfBoxesWanted)];
            }

            return arr;
        }
    }
}

module.exports = RandomArgumentGenerator;