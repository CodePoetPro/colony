<?php

require 'vendor/autoload.php';

$app = new \Slim\Slim();
$app->get('/','welcomeMessage');
$app->get('/students', 'getStudents');
$app->get('/students/:id', 'getStudent');
$app->post('/students', 'addStudent');
$app->put('/students/:id', 'editStudent');
$app->delete('/students/:id', 'deleteStudent');
$app->post('/register','register');
$app->post('/login','login');
$app->run();

function welcomeMessage(){
	echo "Welcome to Colony API";
};

function getToken(){
	return md5(mt_rand(4, 9000000));
}

//function for registration as admin
function register() {
	$app = new \Slim\Slim();
	$token = getToken();
	$wine = $app->request;
	$username = $wine->params('username');
	$password = $wine->params('password');
	$sql_query = "INSERT INTO admin (adminuser, password, token) VALUES (:adminuser, :password, :token)";
	try{
		$db = getConnection();
		$stmt = $db->prepare($sql_query);
		$stmt->bindParam("adminuser", $username);
		$stmt->bindParam("password", $password );
		$stmt->bindParam("token",$token);
		$stmt->execute();
		$db = null;
		echo '{"message":"Registration Successful"}';
	} catch (PDOException $e){
		echo '{"error":{"text:"'.$e->getMessage().'}}';
	}
}

//function to check if user is logged in in
function checkIfLoggedIn($idadmin, $token){
	$sql = "SELECT * FROM admin WHERE idadmin = :idadmin AND token = :token";
	try{
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("idadmin", $idadmin);
		$stmt->bindParam("token", $token );
		$stmt->execute(); 
		$result = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db=null;
		return $result;
	}catch(PDOException $e){
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

//function to login as admin
function login(){
	$app = new \Slim\Slim();
	$wine = $app->request;
	$username = $wine->params('username');
	$password = $wine->params('password');
	$sql_query = "SELECT idadmin, token from admin WHERE adminuser=:adminuser AND password=:password";
	try{
		$db = getConnection();
		$stmt = $db->prepare($sql_query);
		$stmt->bindParam("adminuser", $username);
		$stmt->bindParam("password", $password );
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db=null;
		echo json_encode($result);
	} catch (PDOException $e){
		echo'{"error":{"text:"'.$e->getMessage().'}}';
	}
}
//function to get students detail
function getStudents() {
	$app = new \Slim\Slim();
	$wine = $app->request;
	$idadmin = $wine->params('idadmin');
	$token = $wine->params('token');
	$check = checkIfLoggedIn($idadmin,$token);
	if ($check != null) {
		$sql_query = "select * FROM student WHERE admin_idadmin = :idadmin";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql_query);
			$stmt->bindParam("idadmin", $idadmin);
			$stmt->execute();  
			$wines = $stmt->fetchAll(PDO::FETCH_OBJ);
			$db = null;
			echo json_encode($wines);
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}	
	} else {
		echo '{"message":"Unauthorised"}';
	}
	
}
//function to get one student detail
function getStudent($id) {
	$app = new \Slim\Slim();
	$wine = $app->request;
	$idadmin = $wine->params('idadmin');
	$token = $wine->params('token');
	$check = checkIfLoggedIn($idadmin,$token);
	$sql = "select * FROM student WHERE idstudent=".$id." AND admin_idadmin=:idadmin";
	if ($check != null) {
		try {
			$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam("idadmin", $idadmin);
				$stmt->execute();  
				$wines = $stmt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
			echo json_encode($wines);
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
	}else{
		echo '{"message":"Unauthorised"}';
	}
}
//function to add student to database
function addStudent() {
	$app = new \Slim\Slim();
	$wine = $app->request;
	$surname = $wine->params('surname');
	$firstname = $wine->params('firstname');
	$matric_no = $wine->params('matric_no');
	$department = $wine->params('department');
	$faculty = $wine->params('faculty');
	$part = $wine->params('part');
	$phone_no = $wine->params('phone_no');
	$sch_add = $wine->params('sch_add');
	$home_add =$wine->params('home_add');
	$guard_no = $wine->params('guard_no');
	$idadmin = $wine->params('idadmin');
	$token = $wine->params('token');
	$check = checkIfLoggedIn($idadmin,$token);
	$sql = "INSERT INTO student (surname, firstname, matric_no, department, faculty, part, phone_no, sch_add, home_add, guard_no, admin_idadmin) VALUES (:surname, :firstname, :matric_no, :department, :faculty, :part, :phone_no, :sch_add, :home_add, :guard_no, :admin_idadmin)";
	if ($check != null) {
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);  
			$stmt->bindParam("surname", $surname);
			$stmt->bindParam("firstname", $firstname);
			$stmt->bindParam("matric_no", $matric_no);
			$stmt->bindParam("department", $department);
			$stmt->bindParam("faculty", $faculty);
			$stmt->bindParam("part", $part);
			$stmt->bindParam("phone_no", $phone_no);
			$stmt->bindParam("sch_add", $sch_add);
			$stmt->bindParam("home_add", $home_add);
			$stmt->bindParam("guard_no", $guard_no);
			$stmt->bindParam("admin_idadmin", $idadmin);
			$stmt->execute();
			
			$db = null;
			echo '{"message":"Added Successfully"}';
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
	} else {echo '{"message":"Unauthorised"}';}
}

// function to edit or update student information
function editStudent($id) {
	$app = new \Slim\Slim();
	$wine = $app->request;
	$surname = $wine->params('surname');
	$firstname = $wine->params('firstname');
	$matric_no = $wine->params('matric_no');
	$department = $wine->params('department');
	$faculty = $wine->params('faculty');
	$part = $wine->params('part');
	$phone_no = $wine->params('phone_no');
	$sch_add = $wine->params('sch_add');
	$home_add =$wine->params('home_add');
	$guard_no = $wine->params('guard_no');
	$idadmin = $wine->params('idadmin');
	$token = $wine->params('token');
	$check = checkIfLoggedIn($idadmin,$token);
	$sql = "UPDATE student SET surname=:surname, firstname=:firstname, matric_no=:matric_no, department=:department, faculty=:faculty, part=:part, phone_no=:phone_no, sch_add=:sch_add, home_add=:home_add, guard_no=:guard_no WHERE idstudent=:id";
	if($check!=null){
		try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("surname", $surname);
		$stmt->bindParam("firstname", $firstname);
		$stmt->bindParam("matric_no", $matric_no);
		$stmt->bindParam("department", $department);
		$stmt->bindParam("faculty", $faculty);
		$stmt->bindParam("part", $part);
		$stmt->bindParam("phone_no", $phone_no);
		$stmt->bindParam("sch_add", $sch_add);
		$stmt->bindParam("home_add", $home_add);
		$stmt->bindParam("guard_no", $guard_no);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo '{"message":"Student Edited"}' ; 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
	}else{
		echo '{"message":"Unauthorised"}';
	}
	
}

// function to delete student from database
function deleteStudent($id) {
	$app = new \Slim\Slim();
	$wine = $app->request;
	$idadmin = $wine->params('idadmin');
	$token = $wine->params('token');
	$check = checkIfLoggedIn($idadmin,$token);
	$sql = "DELETE FROM student WHERE idstudent=".$id;
	if($check != null){
		try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("idadmin", $idadmin);
		$stmt->execute();
		$db = null;
		echo '{"message":"Deleted Successfully"}';
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
	}else{
		echo '{"message":"Unauthorised"}';
	}
	
	
}

// Configure Database Connection
function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="root";
	$dbpass="";
	$dbname="stubase";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>