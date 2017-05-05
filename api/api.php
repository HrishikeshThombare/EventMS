<?php
	/**
	 * R - Ultra lightweight REST server
	 *
	 * PHP version 5
	 *
	 * @category   PHP
	 * @package    REST
	 * @subpackage Core
	 * @author     Agriya <info@agriya.com>
	 * @copyright  2014 Agriya Infoway Private Ltd
	 * @license    http://www.agriya.com/ Agriya Infoway Licence
	 * @link       http://www.agriya.com
	 * @since      2013-08-23
	 */
	require_once 'config.php';
	
	$_server_protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') ? 'https' : 'http';
	$_server_domain_url = $_server_protocol . '://' . $_SERVER['HTTP_HOST']; // http://localhost
	
	if (!empty($_GET['_url'])) {
        $r_debug.= __LINE__ . ': ' . $_GET['_url'] . "\n";
        $url = $_GET['_url'];
    }
    
?>