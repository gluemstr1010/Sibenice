let wordbox = document.getElementById("word");
var getslovo;
let wordlettersarray = [];
$(document).ready(function(){
    $.get("/prace/sibenice/getWord.php", function(data,status){
        let word = data;
        getslovo = data;
        console.log(word);
    for( let i = 0; i < word.length; i++ )
    {
        let divwordLet = document.createElement("div");
        divwordLet.classList.add("wordletter");
        divwordLet.classList.add("bttm")
        wordbox.appendChild(divwordLet);
        wordlettersarray.push(divwordLet);
    }
    
    } )
})

const alphabet = ["a","b","c","č","d","ď","e","f","g","h","i","j","k","l","m","n","ň","o","p","q","r","ř","s","š","t","ť","u","ů","ú","v","w","x","y","z","ž"];
let letterbox = document.getElementById("letters");
let buttonArr = [];
for( let i = 0 ; i < alphabet.length ; i++ )
{
    const letter =  alphabet[i];
    let divLet = document.createElement("div");
    divLet.classList.add("letter");
    let headerLet = document.createElement("button");
    headerLet.innerHTML = letter;
    letterbox.appendChild(divLet);
    divLet.appendChild(headerLet);
    headerLet.addEventListener("click",function(){ getLetter( letter,headerLet ) });
    buttonArr.push(headerLet);
}

function getLetter(letter,headerLet){
   
    let letterArray = returnIndex(getslovo,letter);
    console.log(letterArray);
    console.log(headerLet);
        for( let j = 0 ; j < letterArray.length ; j++)
        {
            for( let i = 0 ; i < wordlettersarray.length; i++ )
            {
                if( letterArray[j] == i )
                {
                    wordlettersarray[i].classList.remove("bttm");
                    wordlettersarray[i].innerHTML = letter;
                }
            }
        }
        for( let k = 0 ; k < buttonArr.length; k++ )
        {
            let buttonEl = buttonArr[k];

            if( buttonEl.innerHTML == letter )
            {
                buttonEl.disabled = true;
            }
        }
}

function returnIndex(word,letter)
{
    let arr = [];
    let startPos = 0;
    for( let i = 0 ;i < word.length; i++ )
    {
        
        arr.push(word.indexOf(letter,startPos));
        startPos++;
    }

    let newArr = [];
    for(let i = 0; i < arr.length; i++)
    {
        if( !newArr.includes(arr[i]) )
        {
            newArr.push(arr[i]);
        }
    }

return newArr;
}
