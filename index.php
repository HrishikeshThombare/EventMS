<?php
	include "CORE/all_pages.php";

	if( !isUserLoggedIn() ) {
		header('Location: '.$uri.'/loginReg.php');
	} else {
		header('Location: '.$uri.'/homePage.php');
	}
?>
