var register = function (username,password){
    var username = username;
    var password = password;
    $.ajax({
        type: "POST",
        url: REGISTER,
        timeout: 20000,
        data: "username="+username+"&password="+password,
        success: function(data) {
            var data = JSON.parse(data);
            if(data.error){
                Materialize.toast(data.error.text);
            }else if (data.message) {
                Materialize.toast(data.message);
                }
            else {
                Materialize.toast("Something went wrong");
            }
        }
    });
}

var login = function (username,password){
    var username = username;
    var password = password;
    $.ajax({
        type: "POST",
        url: LOGIN,
        timeout: 20000,
        data: "username="+username+"&password="+password,
        success: function(data) {
            var data = JSON.parse(data);
            console.log(data);
            if(data.error){
                Materialize.toast(data.error.text);
            }else if (data[0].token) {
                Materialize.toast("Login Successful");
                localStorage.setItem('stubase_id',data[0].idadmin);
                localStorage.setItem('stubase_token',data[0].token);
                $(location).attr('href', BASE_URL+"dashboard");
            }
            else {
                Materialize.toast("Something went wrong");
            }
        }
    });
}

var get_students = function () {
    var id = localStorage.getItem('stubase_id');
    var token = localStorage.getItem('stubase_token');
    $.ajax({
        type:"GET",
        url: STUDENTS,
        timeout: 20000,
        data:"idadmin="+id+"&token="+token,
        success: function (data) {
            var data = JSON.parse(data);
            console.log(data);
            if (data.length == 0){
                var students=" ";
            }else {
                var students  = " ";
                var edits = " ";
                for (var i = 0; i < data.length; i++){
                  students +=  '<li>';
                  students +=  '<div class="collapsible-header bold grey-text"><span class="yellow-text">Full Name | </span><span class="capitalise">'+ data[i].surname+'</span> '+data[i].firstname +'<span class="right" onclick="delete_student('+data[i].idstudent+')"> <i class="fa fa-trash fa-2x">  </i> </span> <span class="right" onclick="$(\'#edit'+data[i].idstudent+'\').openModal();"> <i class="fa fa-edit fa-2x">  </i> </span>  <div class="right"> <span class="yellow-text">Matric No. |</span> '+data[i].matric_no +'</div></div>';
                  students +=  '<div class="collapsible-body grey darken-2">';
                  students +=  '<div class="row padding white-text">';
                  students +=  '<div class="col s4"><span class="yellow-text">Part |</span> '+data[i].part +'</div>';
                  students +=  '<div class="col s4"><span class="yellow-text">Department |</span> '+data[i].department +'</div>';
                  students +=  '<div class="col s4"><span class="yellow-text">Faculty |</span> '+data[i].faculty +'</div>';
                  students +=  '</div>';
                  students +=  '<div class="row padding white-text">';
                  students +=  '<div class="col s4"><span class="yellow-text">Phone No. | </span> '+data[i].phone_no +'</div>';
                  students +=  '<div class="col s4"><span class="yellow-text">Guardian\'s No. | </span> '+data[i].guard_no +'</div>';
                  students +=  '<div class="col s4"><span class="yellow-text">Hall of Residence | </span> '+data[i].sch_add +'</div>';
                  students +=  '</div>';
                  students +=  '<div class="row padding white-text">';
                  students +=  '<div class="col s12"><span class="yellow-text">Home Address | </span> '+data[i].home_add +'</div>';
                  students +=  '</div>';
                  students +=  '</div>';
                  students +=  '</li>';

                      edits += '<div id="edit'+data[i].idstudent+'" class="modal bottom-sheet">';
                      edits += '<div class="modal-content">';
                      edits += '<h4>Edit Student</h4>';
                      edits += '<div class="row container">';
                      edits += '<div class="input-field col s6">';
                      edits += '<input id="surname'+data[i].idstudent+'" type="text" class="validate" value="'+data[i].surname+'">';
                      edits += '<label class="active" for="surname">Surname</label>';
                      edits += '</div>';
                      edits += '<div class="input-field col s6">';
                      edits += '<input id="firstname'+data[i].idstudent+'" type="text" class="validate" value="'+data[i].firstname+'">';
                      edits += '<label class="active" for="firstname">First Name</label>';
                      edits += '</div>';
                      edits += '<div class="input-field col s6">';
                      edits += '<input id="matric_no'+data[i].idstudent+'" type="text" class="validate" value="'+data[i].matric_no+'">';
                      edits += '<label class="active" for="matric_no">Matric No.</label>';
                      edits += '</div>';
                      edits += '<div class="input-field col s6">';
                      edits += '<input id="part'+data[i].idstudent+'" type="text" class="validate" value="'+data[i].part+'">';
                      edits += '<label class="active" for="part">Part</label>'
                      edits += '</div>';
                      edits += '<div class="input-field col s6">';
                      edits += '<input id="department'+data[i].idstudent+'" type="text" class="validate" value="'+data[i].department+'">';
                      edits += '<label class="active" for="department">Department</label>';
                      edits += '</div>';
                      edits += '<div class="input-field col s6">';
                      edits += '<input id="faculty'+data[i].idstudent+'" type="text" class="validate" value="'+data[i].faculty+'">';
                      edits += '<label class="active" for="faculty">Faculty</label>';
                      edits += '</div>';
                      edits += '<div class="input-field col s6">';
                      edits += '<input id="phone_no'+data[i].idstudent+'" type="text" class="validate" value="'+data[i].phone_no+'">';
                      edits += '<label class="active" for="phone_no">Phone No.</label>';
                      edits += '</div>';
                      edits += '<div class="input-field col s6">';
                      edits += '<input id="guard_no'+data[i].idstudent+'" type="text" class="validate" value="'+data[i].guard_no+'">';
                      edits += '<label class="active" for="guard_no">Guardian\'s No</label>';
                      edits += '</div>';
                      edits += '<div class="input-field col s6">';
                      edits += '<input id="sch_add'+data[i].idstudent+'" type="text" class="validate" value="'+data[i].sch_add+'">';
                      edits += '<label class="active" for="sch_add">Hall of Residence</label>';
                      edits += '</div>';
                      edits += '<div class="input-field col s6">';
                      edits += '<input id="home_add'+data[i].idstudent+'" type="text" class="validate" value="'+data[i].home_add+'">';
                      edits += '<label class="active" for="home_add">Home Address</label>';
                      edits += '</div>';

                      edits += '</div>';
                      edits += '</div>';
                      edits += '<div class="modal-footer">';
                      edits += '<a href="#!" id="edit_student_button" onclick="edit('+data[i].idstudent+')" class="modal-action modal-close waves-effect waves-green btn-flat black white-text"><i class="fa fa-save fa-2x"> </i> SAVE</a>';
                      edits += '</div>';
                      edits += '</div>';
                }
                $("#students").html(students);
                $("#edit_students").html(edits);

            }
        }
    });
}

var add_student = function (surname,firstname,part,matric_no,department,faculty,phone_no,guard_no,sch_add,home_add){
    var idadmin = localStorage.getItem('stubase_id');
    var token = localStorage.getItem('stubase_token');
    $.ajax({
        type: "POST",
        url: STUDENTS,
        timeout: 20000,
        data: "token="+token+"&idadmin="+idadmin+"&surname="+surname+"&firstname="+firstname+"&part="+part+"&matric_no="+matric_no+"&department="+department+"&faculty="+faculty+"&phone_no="+phone_no+"&guard_no="+guard_no+"&sch_add="+sch_add+"&home_add="+home_add,
        success: function(data) {
            var data = JSON.parse(data);
            console.log(data);
            if(data.error){
                Materialize.toast(data.error.text,4000);
            }else if (data.message) {
                Materialize.toast(data.message, 4000);
                get_students();
            }
            else {
                Materialize.toast("Something went wrong",4000);
            }
        }
    });
}

var edit_student = function (id,surname,firstname,part,matric_no,department,faculty,phone_no,guard_no,sch_add,home_add){
    var idadmin = localStorage.getItem('stubase_id');
    var token = localStorage.getItem('stubase_token');
    $.ajax({
        type: "PUT",
        url: STUDENTS+"/"+id,
        timeout: 20000,
        data: "token="+token+"&idadmin="+idadmin+"&surname="+surname+"&firstname="+firstname+"&part="+part+"&matric_no="+matric_no+"&department="+department+"&faculty="+faculty+"&phone_no="+phone_no+"&guard_no="+guard_no+"&sch_add="+sch_add+"&home_add="+home_add,
        success: function(data) {
            var data = JSON.parse(data);
            console.log(data);
            if(data.error){
                Materialize.toast(data.error.text,4000);
            }else if (data.message) {
                Materialize.toast(data.message, 4000);
                get_students();
            }
            else {
                Materialize.toast("Something went wrong",4000);
            }
        }
    });
}

var delete_student = function (id){
    var token = localStorage.getItem('stubase_token');
    var idadmin = localStorage.getItem('stubase_id');
    $.ajax({
        type: "DELETE",
        url: STUDENTS+'/'+id,
        timeout: 20000,
        data: "idadmin="+idadmin+"&token="+token,
        success: function(data) {
            var data = JSON.parse(data);
            console.log(data);
            if(data.error){
                Materialize.toast(data.error.text);
            }else if (data.message) {
                Materialize.toast(data.message,4000);
                get_students();
            }
            else {
                Materialize.toast("Something went wrong");
            }
        }
    });
}


