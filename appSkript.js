let wordbox = document.getElementById("word");
var getslovo;
var getslovoId;
let wordlettersarray = [];
let wonorlostheader = document.getElementById("wonorlost");
let onFinishedGameelement = document.getElementById('onFinishedGame');
let btnsel = document.getElementById("btnWhattoDo");
var usr = $.cookie('GYdbdiFHvFtmsjPshsinJHqPaZVmRBOk');
let getStatsEl = document.getElementById("getStats")
let getMorestats = document.getElementById("getMoreStats");
getStatsEl.addEventListener("click",function(){
    let outer = document.getElementById("outer");
    document.body.removeChild(outer);
    $.post("/prace/sibenice/getStats.php",
    {
        idUser:usr
    },function(data,status){
        let leave = document.createElement("div");
        leave.setAttribute("id","statsLeave");
        let levhed = document.createElement("h1");
        levhed.innerHTML = "Hrát znovu";
        levhed.addEventListener("click",function()
        {
            location.replace("http://localhost:8080/prace/sibenice/app.html");
        })
        document.body.appendChild(leave);
        leave.appendChild(levhed);
        
        const jsonArr = JSON.parse(data);
        const columnArr = ["Word","Won game","Lost game"];
        let table = document.createElement("table");
        let row = document.createElement("tr");
        document.body.appendChild(table);
        table.appendChild(row);
        for(let i =0; i < columnArr.length; i++)
        {
            let column = document.createElement("th");
            column.innerHTML = columnArr[i];
            row.appendChild(column);
        }
        for(let i = 0; i< jsonArr.length ; i++)
        {
            let r = document.createElement("tr");
            table.appendChild(r);
            let column = document.createElement("th");
            column.innerHTML = jsonArr[i].word;
            let colu = document.createElement("th");
            colu.innerHTML = jsonArr[i].wonGame;
            let col = document.createElement("th");
            col.innerHTML = jsonArr[i].lostGame;
            r.appendChild(column);r.appendChild(colu);r.appendChild(col);
        }
        
    })
})
$(document).ready(function(){
    if(usr != undefined)
    {
        getMorestats.style.display = "initial";
    }
    $.get("/prace/sibenice/getWord.php", function(data,status){
        let tempArr = data.split("\n");
        getslovo = tempArr[0];
        getslovoId = tempArr[1];
        
    for( let i = 0; i < getslovo.length; i++ )
    {
        let divwordLet = document.createElement("div");
        divwordLet.classList.add("wordletter");
        divwordLet.classList.add("bttm")
        wordbox.appendChild(divwordLet);
        wordlettersarray.push(divwordLet);
    }

    let back = document.getElementById("statForWord");
     let won = document.createElement("p");
     let lost = document.createElement("p");
    if( usr != undefined )
    {
        console.log(getslovo);
        $.post("/prace/sibenice/getStat.php",
        {
            idUsr:usr,
            word:getslovo
        },function(data,status){
            
            if(data == "")
            {
                back.appendChild(won);
                won.innerHTML = "Nejsou žádné statistiky pro dané slovo!";
            }
            else
            {
                back.appendChild(won);
                back.appendChild(lost);
                const statObj = JSON.parse(data);
                    won.innerHTML = "Vyhrané hry:" + statObj.wonGame;
                    lost.innerHTML = "Prohrané hry:" + statObj.lostGame;
            }
        })
    }
    if( usr == undefined )
    {
        back.appendChild(won);
        won.innerHTML = "Pro zálohování statistik se zaregistrujte!";
    }

    } )
})



const alphabet = ["a","b","c","č","d","ď","e","f","g","h","i","j","k","l","m","n","ň","o","p","q","r","ř","s","š","t","ť","u","ů","ú","v","w","x","y","z","ž"];
let letterbox = document.getElementById("letters");
let buttonArr = [];
let imgArr = ["podlaha.jpg","kopec.jpg","stojan.jpg","opratka.jpg","hlava.jpg","telo.jpg","nohy.jpg","rucedone.jpg"];
let imgIndex = 0;
let wordIndex = 1;
let letterdivArr = [];

for( let i = 0 ; i < alphabet.length ; i++ )
{
    const letter =  alphabet[i];
    let divLet = document.createElement("div");
    divLet.classList.add("letter");
    divLet.classList.add("stin");
    let headerLet = document.createElement("button");
    headerLet.innerHTML = letter;
    letterbox.appendChild(divLet);
    divLet.appendChild(headerLet);
    headerLet.addEventListener("click",function(){ getLetter( letter,headerLet ) });
    buttonArr.push(headerLet);
    letterdivArr.push(divLet);
}
function getLetter(letter,headerLet){
    getslovo = getslovo.toLowerCase();
    let letterArray = returnIndex(getslovo,letter);
    var user = $.cookie('GYdbdiFHvFtmsjPshsinJHqPaZVmRBOk');
    
    if(imgIndex === 7 )
    {
        onFinishedGameelement.style.display = "initial";
        let addwordel = document.getElementById("addWord");
        addwordel.addEventListener("click",function(){
            onFinishedGameelement.removeChild(btnsel);
            showAddwordEl();
        });
        wonorlostheader.innerHTML = "Prohrál jsi!";
        if(user != undefined)
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
    }

    if( wordIndex === getslovo.length )
       {
        onFinishedGameelement.style.display = "initial";
        let addwordel = document.getElementById("addWord");
        addwordel.addEventListener("click",function(){
            onFinishedGameelement.removeChild(btnsel);
            showAddwordEl();
        });
        wonorlostheader.innerHTML = "Vyhrál jsi!";

          if( user != undefined )
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
       }

    if( letterArray.length == 0 ) 
    {   
        while( imgIndex < imgArr.length  )
        {
            $("#imgToBePlaced").attr("src",imgArr[imgIndex]);
            break;
        }
        for( let i = 0; i < letterdivArr.length; i++ )
        {
            let btnEl = buttonArr[i];
            if( btnEl.innerHTML == letter )
            {
                btnEl.disabled = "true";
                letterdivArr[i].classList.remove("stin");
            }
        }
        imgIndex++;
    }else
    {
        wordIndex += letterArray.length;
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
            let divletterEl = letterdivArr[k];

            if( buttonEl.innerHTML == letter )
            {
                buttonEl.disabled = true;
                divletterEl.classList.remove("stin");
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
    return newArr;
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
function showAddwordEl()
{
    let backgrnd = document.createElement("div");
    backgrnd.setAttribute("id","btnWhattoDo");
    backgrnd.style.flexDirection = "column";
    onFinishedGameelement.appendChild(backgrnd);
    let inpt = document.createElement("input");
    let spn = document.createElement("span");
    let sbmitbtn = document.createElement("button");
    let btnPlayegajn = document.createElement("button");
    btnPlayegajn.innerHTML = "Hrát znovu!";
    sbmitbtn.innerHTML = "Přidat do databáze!";
    backgrnd.appendChild(inpt);
    backgrnd.appendChild(spn);
    backgrnd.appendChild(sbmitbtn);
    backgrnd.appendChild(btnPlayegajn);
    sbmitbtn.addEventListener("click",function(){
        let inptval = inpt.value;

        if( inptval.length > 0 & inptval.length < 34 )
        {
            if(!containsWhitespace(inptval))
            {
                sendWord(inptval,spn);
            }
        }
    })
    btnPlayegajn.addEventListener("click",function(){
        location.replace("http://localhost:8080/prace/sibenice/app.html");
    })
}
function sendWord(slovo,spn)
{
    $.post("/prace/sibenice/wordHandler.php",
    {
        word: slovo
    },function(data,status){
        if( data == "wordexists" )
        {
            spn.removeAttribute("id","success");
            spn.setAttribute("id","error");
            spn.innerHTML = "Dané slovo už v databázi je!";
            spn.style.display = "initial";
        }
        if( data == "wordinserted" )
        {
            spn.removeAttribute("id","error");
            spn.setAttribute("id","success");
            spn.innerHTML = "Slovo bylo Přidáno do databáze!";
            spn.style.display = "initial";
        }
    })
}
function containsWhitespace(str) {
    return /\s/.test(str);
}

