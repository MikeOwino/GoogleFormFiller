const ArgGenerator = require('./randomArgumentGenerator');
const SeleniumManip = require('./selenium');
const Statistics = require('./statistics');
const fs = require('fs');
const util = require('util');

class FormFiller{
    constructor(options){
        this.ArgGenerator = new ArgGenerator();
        this.Sele = new SeleniumManip();
        this.Stat = new Statistics();

        this.url = options.URL;
        this.numberOfSubmits = options.NR_OF_SUBMITS;

        this.randomNames = options.RANDOM_NAMES;
        this.autosubmit = options.AUTOSUBMIT;
        this.autoexit = options.AUTOEXIT;
        this.filelog = options.LOG_TO_FILE;

        this.defaultTextAnswer = options.DEFAULT_TEXT_ANSWER;
        this.formStructure = options.FORM_STRUCTURE;
    }

    _callFiller = async object =>{
        const [key, value] = Object.entries(object)[0]

        switch (key) {
            case "SHORT":
                await this.ShortAnswer(value);
                break;
           
            case "PARA":
                await this.Paragraph(value);
                break;

            case "MULTI":
                await this.MultipleChoice(value);
                break;

            case "CHECK":
                await this.Checkbox(value);
                break;

            case "DROP":
                await this.Dropdown(value);
                break;

            case "LINSCL":
                await this.LinearScale(value);
                break;   

            case "MULTIGRID":
                await this.MultiGrid(value);
                break;  

            case "CHECKGRID":
                await this.CheckGrid(value);
                break;
            case "NEXT":
                await this.Sele.nextBtn();
                break;
            case "REPEAT":
                for(let i=0; i<value[1]; i++)
                {
                    await this._callFiller(value[0]);
                }
                break;
            case "DATE":
                await this.date(value);
                break;
            case "TIME":
                await this.Time(value);
                break;
            default:
                break;
        }

    }

    _init = async () => {
        await this.Sele.openForm(this.url);

        for(let i=0; i < this.formStructure.length; i++){

            try {
                await this._callFiller(this.formStructure[i]); 
            } catch (error) {
                
            }

        }
   
    }

    _manageLoggingToFile = () =>{
        let string = new Date().toLocaleString();
        string = string.split(/[. :]/g);
        string = string.filter(c => c != 0);
        string = string.join('-');

        let filename = `log-${string}.txt`;

        if (!fs.existsSync("logs")){
            fs.mkdirSync("logs");
        }

        let stream = fs.createWriteStream('logs/'+ filename,{flags :'w'});

        console.log = function(f){
            stream.write(util.format(f) + '\n');
        }
    }

    start = async() => {
        if(this.filelog)
            this._manageLoggingToFile();
    
        
        console.log("Url: " + this.url);
        console.log("Number of Submits: " + this.numberOfSubmits);
        console.log("Random Names: " + this.randomNames);
        console.log("Autosubmit: " + this.autosubmit);
        console.log("Autoexit: " + this.autoexit);
        console.log("Default Answer Text: " + this.defaultTextAnswer );
        console.log("Structure: ");
        console.log(this.formStructure);


        for(let i = 0; i < this.numberOfSubmits; i++){

            this.Stat.fillStart();

            await this._init();
            
            if(this.autosubmit){
                await this.Sele.send();
            }

            this.Stat.fillEnd();
        }
        
        if(this.autoexit){
            await this.Sele.quit();
        }

        this.Stat.getStats();
    }

    ShortAnswer = async (string) => {
        let answer;

        if( ! string){
            answer = this.randomNames ? (await this.ArgGenerator.randomName()) : this.defaultTextAnswer;
        } else {
            answer = string;
        }

        console.log("Short Answer: " + answer);
        await this.Sele.fillShortAnswer(answer);
    }

    Paragraph = async (string) => {
        let answer;

        if( ! string){
            answer = this.randomNames ? (await this.ArgGenerator.randomName()) : this.defaultTextAnswer;
        } else {
            answer = string;
        }

        console.log("Paragraph: " + answer);
        await this.Sele.fillParagraph(answer);
    }

    MultipleChoice = async ([choice, numOfChoices]) => {
        let option;

        if( ! choice){
            option = this.ArgGenerator.randomOption(numOfChoices);
        } else {
            option = choice;
        }

        console.log("Multiple Choice: " + option);
        await this.Sele.fillMultipleChoice(option);
    }

    Checkbox = async ([options, numOfBoxes, wantedNR]) =>{
        let ticks;

        if( options.length == 0){

            ticks = this.ArgGenerator.randomOptions(numOfBoxes, wantedNR);

        } else {
            ticks = options;
        }

        console.log("Checkbox: " + ticks);
        await this.Sele.fillCheckbox(...ticks);
    }

    Dropdown = async ([choice, numOfChoices]) => {
        let option;

        if( ! choice){
            option = this.ArgGenerator.randomOption(numOfChoices);
        } else {
            option = choice;
        }

        console.log("Dropdown: " + option);
        await this.Sele.fillDropDown(option);
    }

    LinearScale = async ([choice, numOfChoices]) => {
        let option;

        if( ! choice){
            option = this.ArgGenerator.randomOption(numOfChoices);
        } else {
            option = choice;
        }

        console.log("Linear Scale: " + option);
        await this.Sele.fillLinearScale(option);
    }

    MultiGrid = async ([type, rows, cols, optionsArr]) => {
        let dots;

        if( optionsArr.length == 0){

            dots = this.ArgGenerator.randomGridOptions('M', rows, cols);

        } else {
            dots = optionsArr;
        }

        console.log("Multiple Choice Grid: " + dots);
        await this.Sele.fillGrid(type, rows, cols, ...dots);
    }

    CheckGrid = async ([type, rows, cols, optionsArr, nrWanted]) => {
        let ticks = []

        for(let i=0; i<rows; i++){
            
            if(i >= optionsArr.length || optionsArr[i].length == 0){
                ticks = [...ticks,this.ArgGenerator.randomOptions(cols, nrWanted)];
            } else {
                ticks = [...ticks, optionsArr[i]];
            }

        }

        console.log("Checkbox grid: ");

        ticks.forEach( c => {
            console.log("  " + c);
        })
        
        await this.Sele.fillGrid(type,rows,cols,...ticks);
    };

    date = async (string) => {
        let dateArr = [];
        if(!string)
        {
            let date = new Date();
            dateArr = [date.getMonth() + 1, date.getDate(), date.getFullYear()];
        } else {
            dateArr = string.split('.');
        }

        console.log("Date: " + dateArr.join('.'));
        await this.Sele.fillDate(dateArr);
    }

    Time = async (string) => {
        let timeArr = [];

        if(!string)
        {
            let date = new Date();
            timeArr = [date.getHours(), date.getMinutes()];
        } else {
            timeArr = string.split(':');
        }

        console.log("Time: " + timeArr.join(':'));
        await this.Sele.fillTime(timeArr);
    }
}

module.exports = FormFiller;
