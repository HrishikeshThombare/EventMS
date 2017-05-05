<?php
	require_once __DIR__ . '/db_connect.php';
	
	function execute_insert($table_name, $r_post) {

		$val_arr = array();
	    $i = 1;
	    $fields = "";
	    $values = "";
	    
	    foreach ($r_post as $key => $value) {
	        if ($key != 'id') {
	            $fields .= ", " . $key;               
	            
	            if(gettype($value) == 'integer') {
	            	$values.= ", " . $value;
	            } else if(gettype($value) == 'string') {
	            	$values.= ", '" . $value . "'";
	            } else if(gettype($value) == 'double') {
	            	$values.= ", " . $value;
	            } else if(gettype($value) == 'object') {
	            	$values.= ", '" . json_encode($value) . "'";
	            }
	            $i++;
	        }
	    }
	    $fields = ltrim($fields, ',');
    	$values = ltrim($values, ',');
    	
	    $conn = new DB_CONNECT();
	    $query = "INSERT INTO " . $table_name . " (created_date, modified_date, " . $fields . ") VALUES (now(), now(), " . $values . ")";

	    $result = mysqli_query($conn->con, $query);
	    
	    return $result;	    
	}
?>