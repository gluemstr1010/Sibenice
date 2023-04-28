let help;
$(".form-box :input").on("input",function (){
let valid = validateForm();
help = valid;  
})
//check form input on input, function validateForm returns valid to help
function isValid(valid){
    return valid;
}
$("#btn").click(function(){
    if(isValid(help))
    {
        pstForm();
    }  
    //if help is true(valid) then form will be posted to php script
})


var conf_pass_input = $("input[name='conf_pass']")[0];
conf_pass_input.disabled = true;

function validateForm(){
let valid = false;
    if(!validateMail() || !validatePasses())
    {
        $(".box.success").removeClass("success");
        $(".box").addClass("error");
        $(".box.error").css({"display":"block"});
        $(".box.error").html("Form není validní!");
        valid  = false;
    }

    if( validateMail() & validatePasses() ){
        
        $(".box.error").removeClass("error");
        $(".box").addClass("success");
        $(".box.success").css({"display":"block"});
        $(".box.success").html("Form je validní!");
        valid = true;
    }
    //tell if form is valid , (if mail or pass are not valid then valid = false, if mail and pass are valid then valid = true)
return valid;
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
    //tell if mail is valid by regex
return valid;
}

function validatePass(){
let valid = false;
var password_input = $("input[name='password']")[0]; // get input by password

        if( password_input.value.trim().length > 6 && password_input.value.trim().length < 30 )
        {
    
        valid = true;
        }else{
            valid = false;
        }
        // tell if password is valid by length, return valid
    
return valid;
}
function validatePasses(){
let valid = false;
var password_input = $("input[name='password']")[0];


    if(validatePass()){
    conf_pass_input.disabled = false;
    }else{
        conf_pass_input.disabled = true;
        
    }
    // if function validatePass returns true then confpass input enabled otherwise disabled
   
    if(password_input.value === conf_pass_input.value)
    {
        valid = true
    }   
    else{
        valid = false;
    }
    // tell if passwords in both fields are equal

    return valid;
}

function pstForm(){

    var mail = $("input[name='mail']")[0].value;
        var password = $("input[name='password']")[0].value;
        //get mail and password values
        $.post("/prace/sibenice/regHandling.php",
        {
            mail: mail,
            password: password,
        },
        function(data,status){
            if( data == "mailnotvalid" ){
                $(".box.success").removeClass("success");
            $(".box").addClass("error");
            $(".box.error").css({"display":"block"});
            $(".box.error").html("E-mail není validní!");
            }
            //send post request to php script that handles registration

            if(data == "regMade")
            {
                location.replace("http://localhost:8080/prace/sibenice/app.html");
            }
            //if data equeals regMade(registration was made) , then user is redirected to app

            });

}