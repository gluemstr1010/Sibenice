$(".form-box :input").on("input",function(){
    validateForm();
})

var conf_pass_input = $("input[name='conf_pass']")[0];
conf_pass_input.disabled = true;

function validateForm(){

    if(!validateMail() || !validatePasses())
    {
        $(".box.success").removeClass("success");
        $(".box").addClass("error");
        $(".box.error").css({"display":"block"});
        $(".box.error").html("Form není validní!");
    }

    if( validateMail() & validatePasses() ){
        $(".box.error").removeClass("error");
        $(".box").addClass("success");
        $(".box.success").css({"display":"block"});
        $(".box.success").html("Form je validní!");
        var mail = $("input[name='mail']")[0].value;
        var password = $("input[name='password']")[0].value;
        $.post("/regHandling.php",
        {
            mail: mail,
            password: password,
        },
        function(data,status){
            console.log(data);
        });
    }

}

function validateMail(){
let valid = false;
var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;

    if( pattern.test($("input[name='mail']")[0].value) ){
        valid = true;
    }
    else{
        valid = false;
    }
return valid;
}

function validatePass(){
let valid = false;
var password_input = $("input[name='password']")[0];

        if( password_input.value.trim().length > 6 && password_input.value.trim().length < 30 )
        {
    
        valid = true;
        }else{
            valid = false;
        }
    
return valid;
}
function validatePasses(){
let valid = false;
var password_input = $("input[name='password']")[0];
conf_pass_input.disabled = true;

    if(validatePass()){
    conf_pass_input.disabled = false;
    }
   
    if(password_input.value === conf_pass_input.value)
    {
        valid = true
    }   
    else{
        valid = false;
    }
    
    return valid;
}