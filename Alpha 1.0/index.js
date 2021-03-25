const { getRandomString } = require('selenium-webdriver/safari');
const SeleniumManip = require('./selenium');

//Fill these variables
const URL = "https://docs.google.com/forms/d/e/1FAIpQLSdo727ovL-zbVIZZWr7_c5eyI-ubWc7br7441yjsrkjfkww9Q/viewform";
const NR_OF_SUBMITS = 1;

const Sele = new SeleniumManip();

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function getRandomIntArray(length, max){
    let buffer = new Array(max);
    for(let i=0; i<max; i++){
        buffer[i]=i+1;
    }
    

    let arr = new Array(length);
    for(let i=0; i<length;i++){
        arr[i] = buffer[getRandomInt(buffer.length)-1];
        buffer.splice(buffer.indexOf(arr[i]),1);
    }
    return arr;
}

function getRandomIntArrays(count, length, max){
    let arr = new Array(count);
    for(let i=0; i<count; i++){
        arr[i]=getRandomIntArray(length,max)
    }
    return arr;
}

async function init(){
    
    await Sele.openForm(URL);

    await Sele.fillDropDown(getRandomInt(5));
    await Sele.fillShortAnswer("Hello World");
    await Sele.fillMultipleChoice(getRandomInt(3));
    await Sele.fillParagraph("paragraph");
    await Sele.fillShortAnswer("ELTE > BME");
    await Sele.fillCheckbox(...getRandomIntArray(getRandomInt(3),3));
    await Sele.fillDropDown(getRandomInt(3));
    await Sele.fillMultipleChoice(getRandomInt(3));
    await Sele.fillParagraph("paragraph");
    await Sele.fillDropDown(getRandomInt(3));
    await Sele.fillCheckbox(...getRandomIntArray(getRandomInt(3),3));
    await Sele.fillLinearScale(getRandomInt(5));
    await Sele.fillGrid("choice", 3, 5,[1,getRandomInt(5)],[2,getRandomInt(5)],[3,getRandomInt(5)]);
    await Sele.fillGrid("checkbox", 3, 4,[1,...getRandomIntArray(getRandomInt(4),4)],[2,...getRandomIntArray(getRandomInt(4),4)],[3,...getRandomIntArray(getRandomInt(4),4)]);
    await Sele.fillGrid("choice", 2, 3,[1,getRandomInt(3)],[2,getRandomInt(3)]);
    await Sele.fillGrid("checkbox", 3, 2,[1,...getRandomIntArray(getRandomInt(2),2)],[2,...getRandomIntArray(getRandomInt(2),2)],[3,...getRandomIntArray(getRandomInt(2),2)]);
    await Sele.fillLinearScale(getRandomInt(10));
    

    await Sele.send();
    
}


async function main(){
    for(let i = 0; i < NR_OF_SUBMITS; i++){
        await init();
    }
    Sele.quit();
}

main();
