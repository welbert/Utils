<?php
	session_start();
	date_default_timezone_set("America/Sao_Paulo");

	if (!isset($_SESSION['CREATED'])) {		
		$_SESSION['CREATED'] = time();
		// "A Sessão acabará às ".date("H:i",($_SESSION['CREATED']+900))
	} else if (time() - $_SESSION['CREATED'] > 900) { // session started more than 15 minutes ago		
		session_regenerate_id(true);    // change session ID for the current session and invalidate old session ID
		$_SESSION['CREATED'] = time();  // update creation time
	}
?>