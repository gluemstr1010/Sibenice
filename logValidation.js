$(".form-box :input").on("input",function(){
    validateLogin();
})

function validateLogin(){

    var mail = $("input[name='mail']")[0].value;
    var password = $("input[name='password']")[0].value;

    $.post("/logHandling.php",
    {
        mail:mail,
        password:password
    },
    function(data,status){
        console.log(data);
        if( data == "gut" && status == "success")
        {
            $(".box.error").removeClass("error");
            $(".box").css({"display":"none"});
            // window.location.href = "//localhost/app";
        }
        if( data == "loginErr" && status == "success")
        {
            console.log(data, status)
            $(".box").addClass("error");
            $(".box.error").css({"display":"block"});
            $(".box.error").html("Špatné údaje!");
        }
    });

}