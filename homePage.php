<?php
	session_start();

	$str_Html = '';
	$str_Html .= '<!DOCTYPE html>
		<html>
			<head>
			    <title>Login Page</title>
			    <script src="JS/jquery.min.js"></script>
			    <script src="JS/homePage.js"></script>
			    <link rel="stylesheet" type="text/css" href="CSS/homePage.css" />
			</head>';

		$str_Html .= '<body><div class="container"><ul class="tab-group">';

		if( $_SESSION['isAdmin'] == true ) {
			$str_Html .= '<li class="tab"><a href="/EventMS/updateEvent.php">Update List</a></li>';
		}

        $str_Html  .= '
        			<li class="tab active">
        				<a href="/EventMS/createEvent.html">Create Event</a></li>
	            	<li class="tab">
	            		<a href="/EventMS/viewEventList.php">View Events</a>
	            	</li>
			        </ul>
			        <div class="tab-content">

			        </div>
				</div>
			</body>
		</html>';

	echo $str_Html;
?>