const {Builder, By, Key, until} = require('selenium-webdriver');

class SeleniumManip{
    constructor(){
        this.driver = new Builder().forBrowser('firefox').build();

        //Short Answer
        this.shortAnswerClass = "exportInput";

        //Paragraph
        this.paragraphClass = "quantumWizTextinputPapertextareaInput";

        //Multiple Choice
        this.multipleChoiceClass = "appsMaterialWizToggleRadiogroupOffRadio";
        this.multipleChoiceContainerClass = "freebirdFormviewerComponentsQuestionRadioChoicesContainer"

        //Checkbox
        this.checkboxClass = "quantumWizTogglePapercheckboxInnerBox";
        this.checkboxContainerClass = "freebirdFormviewerComponentsQuestionCheckboxRoot";

        //Dropdown
        this.dropdownChoiceClass = "quantumWizMenuPaperselectOption appsMaterialWizMenuPaperselectOption freebirdThemedSelectOptionDarkerDisabled exportOption isPlaceholder"
        this.dropdownContainerClass = "quantumWizMenuPaperselectDropDown";

        //Grid
        this.gridContainerClass = "freebirdFormviewerComponentsQuestionGridContainer";

        //Linear Scale
        this.linearScaleContainer ="freebirdMaterialScalecontentContainer";

        this.sleepval = 150;

        this.countShortAnswers = 0;
        this.countParagraph = 0;
        this.countMultipleChoice = 0;
        this.countCheckbox = 0;
        this.countDropdown = 0;
        this.countGrid = 0;
        this.countLinScale = 0;
    }

    async _waitUntilAvailable( element ){
        await this.driver.wait(until.elementIsEnabled(this.driver.findElement(By.className(element))));
    }

    async openForm(url){
        this.countShortAnswers = 0;
        this.countParagraph = 0;
        this.countMultipleChoice = 0;
        this.countCheckbox = 0;
        this.countDropdown = 0;
        this.countGrid = 0;
        this.countLinScale = 0;

        await this.driver.get(url);
    }

    async fillShortAnswer(answer){

        await this._waitUntilAvailable(this.shortAnswerClass);
        await this.driver.findElements(By.className(this.shortAnswerClass)).then(elements => {
            elements[this.countShortAnswers].sendKeys(answer);
            this.countShortAnswers++;
        });
    
    }

    async fillParagraph(answer){

        await this._waitUntilAvailable(this.paragraphClass);
        await this.driver.findElements(By.className(this.paragraphClass)).then(elements => {
            elements[this.countParagraph].sendKeys(answer);
            this.countParagraph++;
        });
    
    }

    async fillMultipleChoice(choice){

        await this._waitUntilAvailable(this.multipleChoiceContainerClass);
        await this.driver.findElements(By.className(this.multipleChoiceContainerClass)).then(async elements => {

           await (this.driver).sleep(this.sleepval);
           elements[this.countMultipleChoice].findElements(By.className(this.multipleChoiceClass)).then( choices => {
                choices[choice - 1].click();
           })
           this.countMultipleChoice++;

        });

    }

    async fillCheckbox(...choices){

        await this._waitUntilAvailable(this.checkboxContainerClass);
        await this.driver.findElements(By.className(this.checkboxContainerClass)).then(elements => {

           elements[ this.countCheckbox].findElements(By.className(this.checkboxClass)).then( async checkboxes => {

                await (this.driver).sleep(this.sleepval);
                choices.forEach( val => {
                    checkboxes[val - 1].click();
                })
           })
           this.countCheckbox++;

        });

    }

    /*

        BUGGY!!!
        TODO: Rework from scratch

    */
    async fillDropDown(option){
        await (this.driver).sleep(this.sleepval);


        await this._waitUntilAvailable(this.dropdownContainerClass);
        let el = await this.driver.findElements(By.className("quantumWizMenuPaperselectEl")).then(res => {
           
            return res[this.countDropdown].findElement(By.className(this.dropdownChoiceClass));
        });
        this.countDropdown++;

        await (this.driver).sleep(this.sleepval);
        await el.click();

        for(let i=0; i<option; i++){
            await el.sendKeys(Key.DOWN);
            await (this.driver).sleep(this.sleepval);
            el = await this.driver.findElements(By.className("isSelected")).then(res => res[this.countDropdown]);
        }
        
        await (this.driver).sleep(this.sleepval);
        el.click();
        /*el = await this.driver.findElements(By.className("isSelected")).then(res => {
            res[this.countDropdown ].click();
        });*/
        await (this.driver).sleep(this.sleepval);
        
    }

    /*
        PROPER INPUT IS EXPECTED
    */
    async fillGrid(type, rows, cols, ...targets){

        let el = await this.driver.findElements(By.className(this.gridContainerClass)).then(res => {
            return res[this.countGrid];        
        })

        if(type == "checkbox"){

            await el.findElements(By.className(this.checkboxClass)).then(res => {

                targets.forEach( (c, rowIndex) => {
                    for(let i = 0; i < c.length; i++){

                        let tar = rowIndex*cols + c[i] - 1;
                        res[tar].click();

                    }
                })
            })

        } else if (type == "choice"){

            await el.findElements(By.className(this.multipleChoiceClass)).then(res => {
                targets.forEach( (c,i) => {
                    let tar = i * cols + c - 1;
                    res[tar].click();
                })
    
            })

        }
        this.countGrid++;
    }

    async fillLinearScale(choice){

        let el = await this.driver.findElements(By.className(this.linearScaleContainer)).then(res => {
            return res[this.countLinScale];
        })

        el.findElements(By.className(this.multipleChoiceClass)).then(res =>{
            res[choice-1].click();
        })

        this.countLinScale++
    }

    async send(){
        await (this.driver).sleep(this.sleepval);
        await this.driver.findElement(By.className("appsMaterialWizButtonEl appsMaterialWizButtonPaperbuttonEl appsMaterialWizButtonPaperbuttonFilled freebirdFormviewerViewNavigationSubmitButton freebirdThemedFilledButtonM2")).click()
    }

    async quit(){
        await this.driver.quit();
    }
}

module.exports = SeleniumManip;