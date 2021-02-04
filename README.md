# Google Form Filler
An easy to use **Node.js** script which autofills Google Forms.

The script is currently in Beta state, which means errors might occur, also not all exceptions are handled.

I created the script to get started with process automation. I do not encourage anyone to use it for swaying anonymous forms.

### New to Beta 2.1
- Filling Forms that use more than 1 page using `Types.Next()`
- Creating `.txt` logs instead of just console logs
- Repeating an element multiple times using `Types.Repeat()`
- Statistics after the script finished running 

# Requirements: <br/>
- Node.js <br/>
- Dependencies: <br/>
  - axios <br/>
  - selenium-webdriver <br/>
- Selenium GeckoDriver <br/>
- Firefox <br/>

# How to use
*This section expects that you have all the requirements installed and set-up*
- Open `index.js` in any text editor
- Specify a Google Form url in the `URL:` section
- In the `FORM_STRUCTURE:` section represent each form object with a `Type` <br/> as you can see below
    ```javascript
    FORM_STRUCTURE: [
      Types.ShortAnswer(),
      Types.Paragraph(),
      Types.MultipleChoice(),
      ...
    ]
    ```
   **Note:** Some `Types` are required to be called exactly in the right order (`Multiple Choice Grid` and `Checkbox Grid`) so the best practice is to call each of them in the same order as the form is structured
- Open a terminal in the project folder, type in `node index` and press enter

# Types and Parameters
- **Supported types:**
  ```diff
  + Short Answer
  + Paragraph
  + Multiple Choice
  + Checkboxes
  + Dropdown
  + Linear Scale
  + Multiple Choice Grid
  + Checkbox Grid
  ```
- **Not supported types:**
  ```diff
  - File Upload
  - Date
  - Time
  ```
- **Parameters:**
  ```javascript
  Types.ShortAnswer( [string] answer );
  ```
    If no parameter is specified `DEFAULT_TEXT_ANSWER:` will be used <br/>
    *If `RANDOM_NAMES:` is set to `true`, a random name will be used, generated by __[names.drycodes.com](http://names.drycodes.com/)__* <br/>
    
  ```javascript
  Types.Paragraph( [string] answer );
  ```
    If no parameter is specified `DEFAULT_TEXT_ANSWER:` will be used <br/>
    *If `RANDOM_NAMES:` is set to `true`, a random name will be used, generated by __[names.drycodes.com](http://names.drycodes.com/)__*
    
  ```javascript
  Types.MultipleChoice( [int] yourChoice, [int] numberOfChoices );
  ```
    If no parameter is specified the first option will be selected <br/>
    *If you want a random option to be selected, set `Your Choice` to 0 and `NumberOfChoices` to the number of all available options*
    
  ```javascript
  Types.Checkbox( [int] [ choice1, choice2, ... , choiceN ], [int] numberOfBoxes, [int] wantedNr )
  ```
    If no parameter is specified the first option will be selected <br/>
    *If you want random boxes to be selected, pass in [] as the first parameter, set `NumberOfChoices` to the number of all available options and set `wantedNr` to how much        boxes you want to be ticked*
    
  ```javascript
  Types.Dropdown( [int] yourChoice, [int] numberOfChoices );
  ```
    If no parameter is specified the first option will be selected <br/>
    *If you want a random option to be selected, set `Your Choice` to 0 and `NumberOfChoices` to the number of all available options*
    
  ```javascript
  Types.LinearScale( [int] yourChoice, [int] numberOfChoices );
  ```
    If no parameter is specified the first option will be selected <br/>
    *If you want a random option to be selected, set `Your Choice` to 0 and `NumberOfChoices` to the number of all available options*
    
  ```javascript
  Types.MultipleChoiceGrid( [int] rows, [int] cols, [int] [row1option, row2option, ... , rowNoption] );
  ```
    If no parameter is specified the first option will be selected <br/>
    *If you want a random option to be selected in each row, specify `rows` and `cols` only*<br/>
    *If you want a specific row to be random, then pass 0 as the option of that row*
    
  ```javascript
  Types.CheckboxGrid( [int] rows, [int] cols, [int] [[row1option1, row1option2, ...], [row2option1, row2option2, ...],...], [int] nrOfBoxesWanted );
  ```
    If no parameter is specified the first option will be selected <br/>
    *If you want random options to be selected in each row, specify `rows` and `cols` only*<br/>
    *If you want a specific row to be random, then pass [] as the option of that row, then `nrOfBoxesWanted` boxes will be checked in that row*<br/>
    *If `nrOfBoxesWanted` is not specified a random amount of boxes will be checked in each random row*
    
  ```javascript
  Types.Repeat( [Type] typeToRepeat, [int] nrOfIterations );
  ```
    `typeToRepeat` can be any `Type` object found above and is used exactly the same way <br>
    *For example `Types.Repeat(Types.ShortAnswer("Hello World"), 10)` means that*<br>
    *there are 10 short answer boxes below each other and each of them will be filled with "Hello World"*
    
  ```javascript
  Types.Next();
  ```
    This function doesn't take any arguments, it only tells Selenium to click the `Next` button. <br>
    *If this function is not called when a page has been filled, the script tries to fill the remaining* <br>
    *elements on the same page which will lead to errors* <br>
    **Note:** The script won't jump to the next page automatically 
# Test environment
- Node.js: v12.16.3
- axios: 0.21.0
- selenium-webdriver: 4.0.0-alpha.8
- geckodriver: 0.28.0

- Tested on 2020.02.04 with `NR_OF_SUBMITS` set to 100 and all values set to random

# Known issues
- If you minimize firefox while the script is running Dropdowns can cause exceptions
