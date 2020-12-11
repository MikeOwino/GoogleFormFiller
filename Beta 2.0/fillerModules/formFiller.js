const ArgGenerator = require('./randomArgumentGenerator');
const SeleniumManip = require('./selenium');

class FormFiller{
    constructor(options){
        this.ArgGenerator = new ArgGenerator();
        this.Sele = new SeleniumManip();

        this.url = options.URL;
        this.numberOfSubmits = options.NR_OF_SUBMITS;

        this.randomNames = options.RANDOM_NAMES;
        this.autosubmit = options.AUTOSUBMIT;
        this.autoexit = options.AUTOEXIT;

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
            default:
                break;
        }

    }

    _init = async () => {
        await this.Sele.openForm(this.url);

        for(let i=0; i < this.formStructure.length; i++){
            await this._callFiller(this.formStructure[i]);
        }
   
    }

    start = async() => {
        console.log("Url: " + this.url);
        console.log("Number of Submits: " + this.numberOfSubmits);
        console.log("Random Names: " + this.randomNames);
        console.log("Autoexit: " + this.autoexit);
        console.log("Default Answer Text: " + this.defaultTextAnswer );
        console.log("Structure: ");
        console.log(this.formStructure);


        for(let i = 0; i < this.numberOfSubmits; i++){
            console.log("-----------------\nNR: " + (i+1) + "\n-----------------");
            await this._init();
            
            if(this.autosubmit){
                await this.Sele.send();
            }
        }
        
        if(this.autoexit){
            await this.Sele.quit();
        }
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
}

module.exports = FormFiller;
