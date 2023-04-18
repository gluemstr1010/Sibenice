let wordbox = document.getElementById("word");
var getslovo;
var getslovoId;
let wordlettersarray = [];
$(document).ready(function(){
    $.get("/prace/sibenice/getWord.php", function(data,status){
        let tempArr = data.split("\n");
        getslovo = tempArr[0];
        getslovoId = tempArr[1];
        console.log(getslovo);
        
    for( let i = 0; i < getslovo.length; i++ )
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
let imgArr = ["podlaha.jpg","kopec.jpg","stojan.jpg","opratka.jpg","hlava.jpg","telo.jpg","nohy.jpg","rucedone.jpg"];
let imgIndex = 0;
let wordIndex = 1;
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
    var user = $.cookie('GYdbdiFHvFtmsjPshsinJHqPaZVmRBOk');
    
    if(imgIndex === 7 )
    {
        let didLose = true;
        $.post("/prace/sibenice/appHandler.php",
        {
           wordId:getslovo,
           userId:user,
           game:didLose
        },
        function(data,status)
        {
            console.log(data);
        }
        );
    }
    if( wordIndex === getslovo.length )
       {
        let didLose = false;
            $.post("/prace/sibenice/appHandler.php",
            {
            wordId:getslovo,
            userId:user,
            game:didLose
            },
            function(data,status)
            {
                console.log(data);
            }
            );
       }

    if( letterArray.length == 0 ) 
    {   
        while( imgIndex < imgArr.length  )
        {
            $("#imgToBePlaced").attr("src",imgArr[imgIndex]);
            break;
        }
        imgIndex++;
        
    }else
    {
        wordIndex++;
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
}

function returnIndex(word,letter)
{

    let arr = [];
    let startPos = 0;
    let occurence = countOccurence(word,letter);
    for( let i = 0 ;i < word.length; i++ )
    {
        
        if(occurence == 1)
        {
            arr.push(word.indexOf(letter,startPos));
            break;
        }else if(occurence > 1)
        {
            arr.push(word.indexOf(letter,startPos));
            startPos++;
        }
    }
    let newArr = [];
    for(let i = 0; i < arr.length; i++)
    {
        if( !newArr.includes(arr[i]) )
        {
            newArr.push(arr[i]);
        }
    }

    return arr;
}
function countOccurence(slovo,pismeno){
    let count = 0;

    for(let i = 0 ; i < slovo.length; i++)
    {
        if(slovo[i] == pismeno)
        {
            count++;
        }
    }

return count;
}

