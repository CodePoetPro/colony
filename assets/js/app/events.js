$(document).ready(function($) {
    var $body = $('body');
    $body.on('click', '#reg_button', function(e){
        //e.preventDefault();
        var username = $body.find('#reg_username').val();
        var password = $body.find('#reg_password').val();
        var c_password = $body.find('#creg_password').val();
        if (username == '' || password == '' || c_password=='') {
            Materialize.toast('Username or Password not set',4000);
        } else if(password !== c_password){
            Materialize.toast('Passwords don\'t Match',4000);
        }
        else {
            register(username,password);
        }

    });
    
    $body.on('click', '#log_button', function(e){
        //e.preventDefault();

        var username = $body.find('#log_username').val();
        var password = $body.find('#log_password').val();
        if (username !== '' && password !== '') {
            login(username,password);
        } else {
            Materialize.toast('Name or Password not set',4000);
        }
    });

    $body.on('click', '#add_student_button', function(e){
        //e.preventDefault();
        var sn = $body.find('#surname').val();
        var fn = $body.find('#firstname').val();
        var p = $body.find('#part').val();
        var m = $body.find('#matric_no').val();
        var d = $body.find('#department').val();
        var fa = $body.find('#faculty').val();
        var pn = $body.find('#phone_no').val();
        var gn = $body.find('#guard_no').val();
        var sad = $body.find('#sch_add').val();
        var had = $body.find('#home_add').val();
        if (sn !== '' && fn !== '' && p !== ''&& m !== ''&& d !== ''&& fa !== ''&& pn !== ''&& gn !== ''&& sad !== ''&& had !== '') {
            add_student(sn,fn,p,m,d,fa,pn,gn,sad,had);
        } else {
            Materialize.toast('Some field are empty',4000);

        }
    });
});

var edit = function (id) {
    var sn = $('#surname'+id).val();
    var fn = $('#firstname'+id).val();
    var p = $('#part'+id).val();
    var m = $('#matric_no'+id).val();
    var d = $('#department'+id).val();
    var fa = $('#faculty'+id).val();
    var pn = $('#phone_no'+id).val();
    var gn = $('#guard_no'+id).val();
    var sad = $('#sch_add'+id).val();
    var had = $('#home_add'+id).val();

    if (sn !== '' && fn !== '' && p !== ''&& m !== ''&& d !== ''&& fa !== ''&& pn !== ''&& gn !== ''&& sad !== ''&& had !== '') {
        edit_student(id,sn,fn,p,m,d,fa,pn,gn,sad,had);
    } else {
        Materialize.toast('Some field are empty',4000);

    }
}
