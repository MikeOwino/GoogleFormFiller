class Types{
    constructor (){}

    ShortAnswer = (string = undefined) => ({SHORT: string})
    Paragraph = (string = undefined) => ({PARA: string})
    MultipleChoice = (yourChoice = undefined, numberOfChoices = 1) => ({MULTI: [yourChoice, numberOfChoices]})
    Checkbox = (options = [], numberOfBoxes = 1, wantedNr = 0) => ({CHECK: [options, numberOfBoxes, wantedNr]})
    Dropdown = (yourChoice = undefined, numberOfChoices = 1) => ({DROP: [yourChoice, numberOfChoices]})
    LinearScale = (yourChoice = undefined, numberOfChoices = 1) => ({LINSCL: [yourChoice, numberOfChoices]})
    MultipleChoiceGrid = (rows = 1, cols = 1, options = []) => ({MULTIGRID: ["choice",rows,cols,options]})
    CheckboxGrid = (rows = 1, cols = 1, options = [], nrOfBoxesWanted = 0) => ({CHECKGRID: ["checkbox",rows,cols,options,nrOfBoxesWanted]})

}

module.exports = Types