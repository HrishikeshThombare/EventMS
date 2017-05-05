<?php
	$is_admin = false;
	$is_cooredinator = false;
	$is_volunteer = false;
	$user_id = 1;
	$employee = null;
	$administrator = null;
	$coordinator = null;
	$volunteer = null;
	$donor = null;

	$authUser = null;
	$role_id = 1;
	$serverPath = "";

	function checkIfAdmin() {
		global $is_admin, $role_id;
		if($is_admin == true && $role_id == 1) {
			return true;
		} else {
			return false;
		}
	}

	function getAuthUser() {
		global $authUser;
		return !is_null($authUser) ? $authUser : null;
	}

	function isUserLoggedIn() {
		global $authUser;
		if($authUser != null && $_SESSION['authUser'] != null)  {
			return true;
		} else {
			return false;
		}
	}

	if (!empty($_SERVER['HTTPS']) && ('on' == $_SERVER['HTTPS'])) {
		$uri = 'https://';
	} else {
		$uri = 'http://';
	}

	$uri .= $_SERVER['HTTP_HOST'];
	$uri .=  '/EventMS';
	$serverPath = $uri;
		
?>