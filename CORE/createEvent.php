<?php
session_start();
require_once __DIR__ . '/i_core_functions.php';

$params = array();
require_once __DIR__ . '/db_connect.php';
$conn = new DB_CONNECT();

$event_title = $_POST['event_title'];
$params['event_title'] = $event_title;

$event_desc = $_POST['event_desc'];
$params['event_desc'] = $event_desc;

$event_venue = $_POST['event_venue'];
$params['event_venue'] = $event_venue;

$event_date = $_POST['event_date'];
$start_date = date('Y-m-d H:i:s', strtotime(str_replace('-', '/', $event_date)));
$params['event_date'] = $start_date;

$event_end_date = $_POST['event_end_date'];
$end_date = date('Y-m-d H:i:s', strtotime(str_replace('-', '/', $event_end_date)));
$params['event_end_date'] = $end_date;

error_log("--------" . print_r($_SESSION['login_user'], 1));

//$params['coordinator_id'] = $_SESSION['login_user']['user_id'];
$result = execute_insert("events", $params);

if ($result)
{
    $response["success"] = 1;
    $response["message"] = "Event created successfully.";
    $url = 'http://' . $_SERVER['HTTP_HOST'] . '/EventMS/homePage.php';
    header('Location:' .  $url);
    echo json_encode($response);
}
else
{
  $response["success"] = 0;
  $response["message"] = "Oops! An error occurred.";
  echo json_encode($response);  
}
?>