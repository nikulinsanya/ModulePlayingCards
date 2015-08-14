<?php
require_once(dirname(__FILE__)."/users.class.php");



function websocket_onopen($keyINsock){
	// echo "\r\n";
	// echo "WEBSOCKET_ONOPEN[$keyINsock]";
	// echo "\r\n";
}


function websocket_onmessage($keyINsock, $str){
	global $Users;	
	// echo "\r\n";
	// echo "WEBSOCKET_ONMESSAGE[$keyINsock] $str \n";
	// echo "\r\n";

	$json = json_decode($str);
	$method = strval($json->{'method'});
	$args = $json->{'args'};

	if (!isset($args)) $args = $keyINsock;
	if (!empty($method)) $Users->$method($keyINsock, $args);

}


function websocket_onclose($keyINsock){
	global $Users;	
	$Users->disconnect($keyINsock);

	// echo "\r\n";
	// echo "WEBSOCKET_ONCLOSE[$keyINsock]";
	// echo "\r\n";
}



function websocket_while(){
	global $STDIN,$sock,$SESS;
	if(!isset($STDIN)){
		$STDIN = fopen('php://stdin', 'r');
	}
	

	stream_set_blocking ($STDIN, FALSE );
	$STDINline = trim(fgets($STDIN));
	// echo $STDINline;
	if(!empty($STDINline) && is_array($SESS) && count($SESS)>0){
		foreach($SESS as $k => $v){
			if($SESS[$k]['websock']){
				websock_send($k, $STDINline);
			}
		}
	}
	
	//echo '.';
}


