const axios = require('axios');

class RandomNames{
    constructor(){}

    _processNames = (namesArr, separator, newSeparator) => {
        return namesArr.map( c => {
            let strBuffer = c.split(separator);
            return strBuffer.join(newSeparator);
        })
    }

     _fetchMaleNames = async (count) => {
        
        let resArr = [];

        resArr = await axios.get(`http://names.drycodes.com/${count}?nameOptions=boy_names`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.error(err); 
        })

        return resArr;
    }

    _fetchFemaleNames = async (count) => {
        let resArr = [];

        resArr = await axios.get(`http://names.drycodes.com/${count}?nameOptions=girl_names`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.error(err); 
        })

        return resArr;
    }

    _fetchName = async (type) => {
        let resArr = [];

        resArr = await axios.get(`http://names.drycodes.com/1?nameOptions=${type}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            
            return ["Name couldn't be found"]
            console.error(err); 
        })

        return resArr;
    }

    getRandomName = async () =>{
        const types = ["boy_names","girl_names"]

        let randIndex = Math.round(Math.random());

        let nameArr = await this._fetchName(types[randIndex]);

        let name = this._processNames(nameArr,'_', ' ');

        return name[0];
    }

    getNames = async (count = 10) => {
        let male = Math.floor(count / 2);
        let female = count - male;
        let names = [];

        names = await this._fetchMaleNames(male);
        names = [...names,...await this._fetchFemaleNames(female)]

        names = this._processNames(names,'_', ' ');
        console.log(names);
        return names;
    }

}

module.exports = RandomNames