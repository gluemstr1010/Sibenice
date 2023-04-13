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

for( let i = 0 ; i < alphabet.length ; i++ )
{
    const letter =  alphabet[i];
    let divLet = document.createElement("div");
    divLet.classList.add("letter");
    let headerLet = document.createElement("button");
    headerLet.innerHTML = letter;
    letterbox.appendChild(divLet);
    divLet.appendChild(headerLet);
    headerLet.addEventListener("click",function(){ getLetter( letter ) });
}

function getLetter(letter){
    
        for( let j = 0 ; j < getslovo.length ; j++)
        {
            let index = getslovo.indexOf(letter);

            if( index > -1 )
            {
                for( let i = 0 ; i < wordlettersarray.length; i++ )
                {
                    if( index == i )
                    {
                        wordlettersarray[i].classList.remove("bttm");
                        wordlettersarray[i].innerHTML = letter;
                    }
                }
                index++;
            }
        }
    
    
}