<?php

$response = array();
require_once __DIR__ . '/all_pages.php';
require_once __DIR__ . '/i_core_functions.php';

if (isset($_POST['data']) && isset($_POST['data']['first_name']) && isset($_POST['data']['last_name']) && isset($_POST['data']['password']) && isset($_POST['data']['email'])) 
{  
	$params = array();
	require_once __DIR__ . '/db_connect.php';
	$conn = new DB_CONNECT();
	
	$params['firstName'] = $_POST['data']['first_name'];
	
	$params['lastName'] = $_POST['data']['last_name'];

    $params['password'] = $_POST['data']['password'];
    
    $params['email'] = $_POST['data']['email'];

    $params['date_of_birth'] = date('Y-m-d', strtotime($_POST['data']['dob']));

    $params['contact'] = $_POST['data']['contact'];

    $params['address'] = $_POST['data']['address'];

    if(isset($_POST['data']['role']) && $_POST['data']['role'] == 'employee') {
    	$params['role'] = 3;
    }

    $table_name = $_POST['data']['role'];

    $query = "Select * from ".$table_name." where email='". $params['email'] . "'";
	$result = mysqli_query($conn->con, $query);
	
	if (mysqli_num_rows($result) > 0)
	{
		$response["success"] = 0;
		$response["message"] = "User with Same username exists. Please update the username";
		echo json_encode($response);
	} else {
		$result = execute_insert($table_name, $params);
	
	    if ($result)
		{
	        $response["success"] = 1;
	        $response["message"] = "Registration successfully.";
	        $url = 'http://' . $_SERVER['HTTP_HOST'] . '/EventMS/loginRegPage.html#login';
	        header('Location:' .  $url);
	        echo json_encode($response);
	    }
		else
		{
	      $response["success"] = 0;
	      $response["message"] = "Oops! An error occurred.";
	      echo json_encode($response);  
	    }
	}    
 }
 else 
 {
    $response["success"] = 0;
    $response["message"] = "Required field(s) is missing";
    echo json_encode($response);
 } 
?>