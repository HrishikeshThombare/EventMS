<?php
	include "CORE/all_pages.php";

	$strHtml = '
	<!DOCTYPE html>
		<html lang="en">
		    <head>
		        <title>Login | Register</title>
		        <link rel="stylesheet" type="text/css" href="css/homePage.css">
		        <link href="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" type="text/css">
		        <link href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.2.0/css/datepicker.min.css" rel="stylesheet" type="text/css">
		        <link href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-switch/1.8/css/bootstrap-switch.css" rel="stylesheet" type="text/css">
		        <link href="http://davidstutz.github.io/bootstrap-multiselect/css/bootstrap-multiselect.css" rel="stylesheet" type="text/css">
		        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
		    </head>

	    <body>
	        <script type="text/javascript" src="js/lib/jquery/jquery-3.2.1.min.js"></script>
	        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js"></script>
	        
	        <script type="text/javascript" src="js/lib/bootstrap/modal.js"></script>
	        <script type="text/javascript" src="js/lib/bootstrap/tab.js"></script>
	        <script type="text/javascript" src="js/lib/bootstrap/carousel.js"></script>

	        <script type="text/javascript" src="js/homePage.js"></script>
	        <!-- BEGIN # BOOTSNIP INFO -->
	        <div class="container">
	            <div class = "row">
	                <div class="col-md-8">
	                    <div id="myCarousel" class="carousel slide" data-ride="carousel">
	                        <!-- Indicators -->
	                        <ol class="carousel-indicators">
	                            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
	                            <li data-target="#myCarousel" data-slide-to="1"></li>
	                            <li data-target="#myCarousel" data-slide-to="2"></li>
	                            <li data-target="#myCarousel" data-slide-to="3"></li>
	                        </ol>

	                        <!-- Wrapper for slides -->
	                        <div class="carousel-inner" role="listbox">
	                            <div class="item active">
	                                <img src="imgs/cropped-ngo.jpg" alt="cropped-ngo" width="460" height="345">
	                            </div>

	                            <div class="item">
	                                <img src="imgs/image40.png" alt="image40" width="460" height="345">
	                            </div>

	                            <div class="item">
	                                <img src="imgs/web-hosting-for-ngos.jpg" alt="web-hosting-for-ngos" width="460" height="345">
	                            </div>
	                        </div>

	                        <!-- Left and right controls -->
	                        <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
	                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
	                            <span class="sr-only">Previous</span>
	                        </a>
	                        <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
	                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
	                            <span class="sr-only">Next</span>
	                        </a>
	                    </div>
	                </div>
	                <div class="col-md-4">
	                    <ul class="nav nav-tabs">
	                        <li class="active">
	                            <a data-toggle="tab" href="#home">Employeer</a>
	                        </li>
	                        <li>
	                            <a data-toggle="tab" href="#menu1">Volunteer</a>
	                        </li>
	                        <li>
	                            <a data-toggle="tab" href="#menu2">Donor</a>
	                        </li>
	                    </ul>

	                    <div class="tab-content">
	                        <div id="home" class="tab-pane fade in active">
	                            <form id="employee-login-form" role="form" class="form-inline"  method="post">
	                                <div class="well">
	                                    <span id="text-login-msg">Type your email and password.</span>
	                                </div>
	                                <input name="email" id = "employee_email" class="form-control" type="email" placeholder="Email" required>
	                                <input id = "employee_password" name="password" class="form-control" type="password" placeholder="Password" required>
	                                <br><br>
	                                <div class="checkbox">
	                                    <label>
	                                        <input type="checkbox"> Remember me
	                                    </label>
	                                </div><br><br>
	                                <input id="urlPath" type="hidden" value="'.$serverPath.'/CORE/login.php">
	                                <div>
	                                    <button type="submit" class="btn btn-primary btn-lg btn-block">Login</button>                                        
	                                </div>
	                                <br>
	                                <center>OR</center>
	                                <br>
	                                <div>
	                                    <button id="login_register_btn" type="button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#employee-signup-modal">Register</button>
	                                </div>
	                            </form>
	                        </div>
	                        <div id="menu1" class="tab-pane fade">
	                            <form id="volunteer-login-form" role="form" class="form-inline"  method="post">
	                                <div class="well">
	                                    <span id="text-login-msg">Type your email and password.</span>
	                                </div>
	                                <input id="volunteer_email" name="email" class="form-control" type="email" placeholder="Email" required>
	                                <input id="volunteer_password" name="password" class="form-control" type="password" placeholder="Password" required>
	                                <br><br>
	                                <div class="checkbox">
	                                    <label>
	                                        <input type="checkbox"> Remember me
	                                    </label>
	                                </div><br><br>
	                                <input id="urlPath" type="hidden" value="'.$serverPath.'/CORE/login.php">
	                                <div>
	                                    <button type="submit" class="btn btn-primary btn-lg btn-block">Login</button>                                        
	                                </div>
	                                <br>
	                                <center>OR</center>
	                                <br>
	                                <div>
	                                    <button id="login_register_btn" type="button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#volunteer-signup-modal">Register</button>
	                                </div>
	                            </form>
	                        </div>
	                        <div id="menu2" class="tab-pane fade">
	                            <form id="donor-login-form" role="form" class="form-inline" method="post">
	                                <div class="well">
	                                    <span id="text-login-msg">Type your email and password.</span>
	                                </div>
	                                <input id="donor_email" name="email" class="form-control" type="email" placeholder="Email" required>
	                                <input id="donor_password" name="password" class="form-control" type="password" placeholder="Password" required>
	                                <br><br>
	                                <div class="checkbox">
	                                    <label>
	                                        <input type="checkbox"> Remember me
	                                    </label>
	                                </div><br><br>
	                                <input id="urlPath" type="hidden" value="'.$serverPath.'/CORE/login.php">
	                                <div>
	                                    <button type="submit" class="btn btn-primary btn-lg btn-block">Login</button>                                        
	                                </div>
	                                <br>
	                                <center>OR</center>
	                                <br>
	                                <div>
	                                    <button id="login_register_btn" type="button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#donor-signup-modal">Register</button>
	                                </div>
	                            </form>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	        <!-- END # BOOTSNIP INFO -->

	        <div class="modal fade" id="employee-signup-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	            <div class="modal-dialog">
	                <div class="modal-content">
	                    <div class="modal-header" align="center">
	                        <img src="imgs/ngo.jpg" style="width: 400px; height: 100px;">
	                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
	                        </button>
	                    </div>
	                    
	                    <!-- Begin # DIV Form -->
	                    <div id="div-forms">
	                    
	                        <!-- Begin # Login Form -->
	                        <form id="employee-register-form" class="form-horizontal form" method="POST">
	                            <div class="form-group">
	                                <label class="control-label col-md-2 col-md-offset-2" for="id_title">Name</label>                               
	                                <div class="col-md-6">
	                                    <div class="form-group">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="id_first_name" placeholder="First Name" type="text">
	                                        </div>
	                                    </div>
	                                    <div class="form-group internal">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="id_last_name" placeholder="Last Name" type="text">
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>

	                            <div class="form-group">
	                                <label class="control-label col-md-2 col-md-offset-2" for="id_email">Contact</label>
	                                <div class="col-md-6">
	                                    <div class="form-group">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="id_email" placeholder="E-mail" type="text">
	                                        </div>
	                                    </div>
	                                    <div class="form-group internal">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="id_phone" placeholder="Phone: (xxx) - xxx xxxx" type="text">
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>

	                            <div class="form-group">
	                                <label class="control-label col-md-2 col-md-offset-2" for="id_address">Address</label>
	                                <div class="col-md-6">
	                                    <div class="form-group">
	                                        <div class="col-md-11">
	                                            <textarea class="form-control" id="id_address" placeholder="" type="text"></textarea>
	                                        </div>
	                                    </div>                                  
	                                </div>
	                            </div>

	                            <div class="form-group">
	                                <label class="control-label col-md-2 col-md-offset-2" for="id_dob">Date of Birth</label>
	                                <div class="col-md-6">
	                                    <div class="form-group">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="id_dob" name="date" placeholder="MM/DD/YYY" type="text"/>
	                                        </div>
	                                    </div>                                  
	                                </div>
	                            </div>                            

	                            <div class="form-group">
	                                <label class="control-label col-md-2 col-md-offset-2" for="id_password">Password</label>
	                                <div class="col-md-6">
	                                    <div class="form-group">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="id_password" type="password">
	                                        </div>
	                                    </div>
	                                    <div class="form-group internal">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="rep_id_password" type="password">
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                            <input id="urlPath" type="hidden" value="'.$serverPath.'/CORE/register.php">
	                            <div class="form-group">
	                                <div class="col-md-offset-4 col-md-3">
	                                    <button class="btn-lg btn-primary" type="submit">Register</button>
	                                </div>
	                                <div class="col-md-3">
	                                    <button class="btn-lg btn-danger" type="button" data-dismiss="modal" style="float:right" type="button">Cancel</button>
	                                </div>
	                            </div>
	                        </form>
	                    </div>
	                </div>
	            </div>
	        </div>
	        <div class="modal fade" id="volunteer-signup-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	            <div class="modal-dialog">
	                <div class="modal-content">
	                    <div class="modal-header" align="center">
	                        <img src="imgs/ngo.jpg" style="width: 400px; height: 100px;">
	                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
	                        </button>
	                    </div>
	                    
	                    <!-- Begin # DIV Form -->
	                    <div id="div-forms">
	                    
	                        <!-- Begin # Login Form -->
	                        <form id="volunteer-register-form" class="form-horizontal form" method="POST">
	                            <div class="form-group">
	                                <label class="control-label col-md-2 col-md-offset-2" for="id_title">Name</label>                               
	                                <div class="col-md-6">
	                                    <div class="form-group">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="id_first_name" placeholder="First Name" type="text">
	                                        </div>
	                                    </div>
	                                    <div class="form-group internal">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="id_last_name" placeholder="Last Name" type="text">
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>

	                            <div class="form-group">
	                                <label class="control-label col-md-2 col-md-offset-2" for="id_email">Contact</label>
	                                <div class="col-md-6">
	                                    <div class="form-group">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="id_email" placeholder="E-mail" type="text">
	                                        </div>
	                                    </div>
	                                    <div class="form-group internal">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="id_phone" placeholder="Phone: (xxx) - xxx xxxx" type="text">
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>

	                            <div class="form-group">
	                                <label class="control-label col-md-2 col-md-offset-2" for="id_address">Address</label>
	                                <div class="col-md-6">
	                                    <div class="form-group">
	                                        <div class="col-md-11">
	                                            <textarea class="form-control" id="id_address" placeholder="" type="text"></textarea>
	                                        </div>
	                                    </div>                                  
	                                </div>
	                            </div>

	                            <div class="form-group">
	                                <label class="control-label col-md-2 col-md-offset-2" for="id_dob">Date of Birth</label>
	                                <div class="col-md-6">
	                                    <div class="form-group">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="date" name="date" placeholder="MM/DD/YYY" type="text"/>
	                                        </div>
	                                    </div>                                  
	                                </div>
	                            </div>                            

	                            <div class="form-group">
	                                <label class="control-label col-md-2 col-md-offset-2" for="id_password">Password</label>
	                                <div class="col-md-6">
	                                    <div class="form-group">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="id_password" type="password">
	                                        </div>
	                                    </div>
	                                    <div class="form-group internal">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="id_phone" type="password">
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                            <input id="urlPath" type="hidden" value="'.$serverPath.'/CORE/register.php">
	                            <div class="form-group">
	                                <div class="col-md-offset-4 col-md-3">
	                                    <button class="btn-lg btn-primary" type="submit">Register</button>
	                                </div>
	                                <div class="col-md-3">
	                                    <button class="btn-lg btn-danger" type="button" data-dismiss="modal" style="float:right" type="button">Cancel</button>
	                                </div>
	                            </div>
	                        </form>
	                    </div>
	                </div>
	            </div>
	        </div>
	        <div class="modal fade" id="donor-signup-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	            <div class="modal-dialog">
	                <div class="modal-content">
	                    <div class="modal-header" align="center">
	                        <img src="imgs/ngo.jpg" style="width: 400px; height: 100px;">
	                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
	                        </button>
	                    </div>
	                    
	                    <!-- Begin # DIV Form -->
	                    <div id="div-forms">
	                    
	                        <!-- Begin # Login Form -->
	                        <form id="donor-register-form" class="form-horizontal form" method="POST">
	                            <div class="form-group">
	                                <label class="control-label col-md-2 col-md-offset-2" for="id_title">Name</label>                               
	                                <div class="col-md-6">
	                                    <div class="form-group">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="id_first_name" placeholder="First Name" type="text">
	                                        </div>
	                                    </div>
	                                    <div class="form-group internal">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="id_last_name" placeholder="Last Name" type="text">
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>

	                            <div class="form-group">
	                                <label class="control-label col-md-2 col-md-offset-2" for="id_email">Contact</label>
	                                <div class="col-md-6">
	                                    <div class="form-group">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="id_email" placeholder="E-mail" type="text">
	                                        </div>
	                                    </div>
	                                    <div class="form-group internal">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="id_phone" placeholder="Phone: (xxx) - xxx xxxx" type="text">
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>

	                            <div class="form-group">
	                                <label class="control-label col-md-2 col-md-offset-2" for="id_address">Address</label>
	                                <div class="col-md-6">
	                                    <div class="form-group">
	                                        <div class="col-md-11">
	                                            <textarea class="form-control" id="id_address" placeholder="" type="text"></textarea>
	                                        </div>
	                                    </div>                                  
	                                </div>
	                            </div>

	                            <div class="form-group">
	                                <label class="control-label col-md-2 col-md-offset-2" for="id_dob">Date of Birth</label>
	                                <div class="col-md-6">
	                                    <div class="form-group">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="date" name="date" placeholder="MM/DD/YYY" type="text"/>
	                                        </div>
	                                    </div>                                  
	                                </div>
	                            </div>                            

	                            <div class="form-group">
	                                <label class="control-label col-md-2 col-md-offset-2" for="id_password">Password</label>
	                                <div class="col-md-6">
	                                    <div class="form-group">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="id_password" type="password">
	                                        </div>
	                                    </div>
	                                    <div class="form-group internal">
	                                        <div class="col-md-11">
	                                            <input class="form-control" id="id_phone" type="password">
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                            <input id="urlPath" type="hidden" value="'.$serverPath.'/CORE/register.php">
	                            <div class="form-group">
	                                <div class="col-md-offset-4 col-md-3">
	                                    <button class="btn-lg btn-primary" type="submit">Register</button>
	                                </div>
	                                <div class="col-md-3">
	                                    <button class="btn-lg btn-danger" type="button" data-dismiss="modal" style="float:right" type="button">Cancel</button>
	                                </div>
	                            </div>
	                        </form>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </body>
	</html>';

 	echo $strHtml;
?>