/* #####################################################################
   #
   #   Project       : Modal Login with jQuery Effects
   #   Author        : Rodrigo Amarante (rodrigockamarante)
   #   Version       : 1.0
   #   Created       : 07/29/2015
   #   Last Change   : 08/04/2015
   #
   ##################################################################### */
   
$(function() {
    
    var $formLogin = $('#login-form');
    var $formLost = $('#lost-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;
    var data = null;

    $("form").submit(function () {
        switch(this.id) {
            case "employee-login-form":
                var $email=$('#employee_email').val();
                var $password=$('#employee_password').val();
                var $role = 'employee';
                var $url = $(this).find("#urlPath").val();

                if ($email == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                }
                data = {'email': $email, 'password': $password, 'role': $role};
                break;
            case "volunteer-login-form":
                var $email=$('#volunteer_email').val();
                var $password=$('#volunteer_password').val();
                var $role = 'volunteer';
                var $url = $(this).find("#urlPath").val();

                if ($email == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                }
                data = {'email': $email, 'password': $password, 'role': $role};
                break;
            case "donor-login-form":
                var $email=$('#donor_email').val();
                var $password=$('#donor_password').val();
                var $role = 'donor';
                var $url = $(this).find("#urlPath").val();

                if ($email == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                }
                data = {'email': $email, 'password': $password, 'role': $role};
                break;
            case "employee-register-form":
                var $first_name = $('#id_first_name').val();
                var $last_name = $('#id_last_name').val();
                var $email = $('#id_email').val();
                var $contact = $("#id_phone").val();
                var $address = $("#id_address").val();
                var $dob = $("#id_dob").val();
                var $password = $("#id_password").val();
                var $role = 'employee';
                var $url = $(this).find("#urlPath").val();

                /*if ($email == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                }

                if ($email == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                }*/

                data = {
                        'email': $email, 
                        'password': $password, 
                        'role': $role, 
                        'first_name': $first_name,
                        'last_name': $last_name,
                        'address': $address,
                        'contact': $contact,
                        'dob': $dob,
                        'password': $password
                    };
                break;
            case "volunteer-register-form":
                var $first_name = $('#id_first_name').val();
                var $last_name = $('#id_last_name').val();
                var $email = $('#id_email').val();
                var $contact = $("#id_phone").val();
                var $address = $("#id_address").val();
                var $dob = $("#id_dob").val();
                var $password = $("#id_password").val();
                var $role = 'volunteer';
                var $url = $(this).find("#urlPath").val();

                /*if ($email == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                }

                if ($email == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                }*/
                data = {
                        'email': $email, 
                        'password': $password, 
                        'role': $role, 
                        'first_name': $first_name,
                        'last_name': $last_name,
                        'address': $address,
                        'contact': $contact,
                        'dob': $dob,
                        'password': $password
                    };
                break;
            case "donor-register-form":
                var $first_name = $('#id_first_name').val();
                var $last_name = $('#id_last_name').val();
                var $email = $('#id_email').val();
                var $contact = $("#id_phone").val();
                var $address = $("#id_address").val();
                var $dob = $("#id_dob").val();
                var $password = $("#id_password").val();
                var $role = 'donor';
                var $url = $(this).find("#urlPath").val();

               /* if ($email == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                }

                if ($email == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                }*/
                data = {
                        'email': $email, 
                        'password': $password, 
                        'role': $role, 
                        'first_name': $first_name,
                        'last_name': $last_name,
                        'address': $address,
                        'contact': $contact,
                        'dob': $dob,
                        'password': $password
                    };
                break;
            default:
                return false;
        }

        $.post($url, {'data': data}, function(result){            
            if(result != undefined) {
                alert(result);
            }
        });
    });
    
    /*$('#login_register_btn').click( function () { modalAnimate($formLogin, $formRegister) });
    $('#register_login_btn').click( function () { modalAnimate($formRegister, $formLogin); });
    $('#login_lost_btn').click( function () { modalAnimate($formLogin, $formLost); });
    $('#lost_login_btn').click( function () { modalAnimate($formLost, $formLogin); });
    $('#lost_register_btn').click( function () { modalAnimate($formLost, $formRegister); });
    $('#register_lost_btn').click( function () { modalAnimate($formRegister, $formLost); });*/
    
    function modalAnimate ($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height",$oldH);
        $oldForm.fadeToggle($modalAnimateTime, function(){
            $divForms.animate({height: $newH}, $modalAnimateTime, function(){
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }
    
    function msgFade ($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function() {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }
    
    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function() {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
  		}, $msgShowTime);
    }


    var date_input=$('input[name="date"]'); //our date input has the name "date"
    var container=$('#register_form').length > 0 ? $('#register_form').parent() : "body";
    var options={
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
    };

    date_input.datepicker(options);
});