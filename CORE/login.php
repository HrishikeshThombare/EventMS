<?php
session_start();

require_once __DIR__ . '/all_pages.php';
require_once __DIR__ . '/i_core_functions.php';

$response = array();

if(isset($_POST['data']) && isset($_POST['data']['email']) && isset($_POST['data']['password']))
{
	$data = $_POST['data'];

	$email = $data['email'];
	$password = $data['password'];

	if(isset($data['role'])) {
		$role = $data['role'];
	} else {
		$role = 'employee';
	}

	require_once __DIR__ . '/db_connect.php';
	$conn = new DB_CONNECT();

	$table_name = 'employee';
	if($role == 'volunteer') {
		$table_name = 'volunteer';
	} else if($role == 'donor') {
		$table_name = 'donor';
	}

	$query = "Select * from ".$table_name." where email='$email' and password='$password'";
	$result = mysqli_query($conn->con, $query) or die(mysqli_error($conn->con));
	
	if (!$result || mysqli_num_rows($result) != 0)
	{
		$response["success"] = 1;
		$response["message"] = "Login successfully.";
		$user = $result->fetch_array(MYSQLI_ASSOC);
		
		$response["user"] = json_encode($user);
		$_SESSION['authUser']= $response["user"];
		$authUser = $_SESSION['authUser'];

		$_SESSION['isAdmin'] = false;
		
		$is_admin = false;
		if($response["user"]['role']  == 1) {
			$GLOBALS['isAdmin'] = true;
			$_SESSION['isAdmin'] = true;
		}
		//$url = $serverPath . '/homePage.php';
		echo json_encode($response);
	}
	else
	{
		$response["success"] = 0;
		$response["message"] = "Please Enter correct username and password.";
		echo json_encode($response);
	}
}
else
{
	$response["success"] = 0;
	$response["message"] = "Required field(s) is missing";
	echo json_encode($response);
}
?>