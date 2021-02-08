const FormTypes = require('./fillerModules/formTypeCreator');
const FormFiller = require('./fillerModules/formFiller');
const Types = new FormTypes();

const OPTIONS = {
    URL: "https://docs.google.com/forms/d/e/1FAIpQLSdo727ovL-zbVIZZWr7_c5eyI-ubWc7br7441yjsrkjfkww9Q/viewform",
    NR_OF_SUBMITS: 100,
    
    RANDOM_NAMES: true,
    AUTOSUBMIT: true,
    AUTOEXIT: true,
    LOG_TO_FILE: false,

    DEFAULT_TEXT_ANSWER: "Filled by Form Filler",

    FORM_STRUCTURE: [
        
        Types.Dropdown(0,5),
        Types.Time(),
        Types.ShortAnswer(),
        Types.Date(),
        Types.Next(),
        Types.MultipleChoice(0,3),
        Types.Paragraph(),
        Types.Date("02.09.2020"),
        Types.ShortAnswer(),
        Types.Checkbox([],3),
        Types.Time("17:52"),
        Types.Dropdown(0,3),
        Types.MultipleChoice(0,3),
        Types.Paragraph(),
        Types.Dropdown(0,3),
        Types.Checkbox([],3),
        Types.ShortAnswer("Hello World"),
        Types.Next(),
        Types.LinearScale(0,5),
        Types.MultipleChoiceGrid(3,5),
        Types.CheckboxGrid(3,4),
        Types.MultipleChoiceGrid(2,3),
        Types.CheckboxGrid(3,2,[[],[1,2],[]]),
        Types.LinearScale(0,10),   
        
    ]
}

const Filler = new FormFiller(OPTIONS);
Filler.start();
