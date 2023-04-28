const btn = document.getElementById("btn");
btn.addEventListener("click",function(){
    validateLogin();
})

//getting submit button and adding event listener to which is calling function validateLogin

function validateLogin(){

    var mail = $("input[name='mail']")[0].value;
    var password = $("input[name='password']")[0].value;
    //get mail and password from inputs

    $.post("/prace/sibenice/logHandling.php",
    {
        mail:mail,
        password:password
    },
    function(data,status){
        console.log(data);
        if( data == "passwordsdonotmatch")
        {
            console.log(data, status)
            $(".box").addClass("error");
            $(".box.error").css({"display":"block"});
            $(".box.error").html("Špatné údaje!");
        }
        if( data == "passwordsmatch" )
        {
            location.replace("http://localhost:8080/prace/sibenice/app.html");
        }
    });
    //post mail and password to php login script, if login is valid then user redirected to app

}