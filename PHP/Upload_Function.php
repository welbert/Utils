<?php
date_default_timezone_set("America/Sao_Paulo");
/*
HTML 
<input type="file" name="fileToUpload" id="fileToUpload">
*/
	if(isset($_FILES["fileToUpload"]["name"])){

		// Array com as extensões permitidas
		//$_UP['extensoes'] = array('jpg', 'png', 'gif');
		$_UP['renomeia'] = false;
		$_UP['tamanho'] =  1024 * 1024 * 20; // 20Mb
		$target_dir = "uploads/";
		$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
		$uploadOk = 1;
		
		// Check if image file is a actual image or fake image
		if(isset($_POST["submit"])) {
		    if($_FILES["fileToUpload"]["tmp_name"] == null or
	    		$_FILES["fileToUpload"]["tmp_name"] == ""){
			    	$uploadOk = 0;
			    		spawnError("Selecione algum arquivo.");
			    }else 
			    	$uploadOk = 1;
		}

		// Faz a verificação da extensão do arquivo
		$extensao = pathinfo($target_file,PATHINFO_EXTENSION);
		/*if (array_search($extensao, $_UP['extensoes']) === false  and $uploadOk == 1) {
		  spawnError("Por favor, envie arquivos com as seguintes extensões: jpg, png ou gif");
		  $uploadOk = 0;
		}*/

		// Primeiro verifica se deve trocar o nome do arquivo
		if ($_UP['renomeia'] == true) {
		  // Cria um nome baseado no UNIX TIMESTAMP atual e com extensão .jpg
		  $target_file = $target_dir . md5(time()).'.'.$extensao;
		} else {
			// Mantém o nome original do arquivo
			$target_file = $target_dir . $_FILES['fileToUpload']['name'];
			// Check if file already exists
			if (file_exists($target_file) and $uploadOk == 1) {
				spawnError("O arquivo já existe.");
				$uploadOk = 0;
			}
		}
		
		// Faz a verifica??o do tamanho do arquivo
		if ($_UP['tamanho'] < $_FILES['fileToUpload']['size']  and $uploadOk == 1) {
			spawnError("O arquivo enviado é muito grande, envie arquivos de até 20Mb.");
			$uploadOk = 0;
		}
		
		// Check if $uploadOk is set to 0 by an error
		if ($uploadOk == 0) {
		// if everything is ok, try to upload file
		} else {
		    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
		    	spawnError("O arquivo ". basename( $_FILES["fileToUpload"]["name"]). " foi enviado.");
		    } else {
		    	spawnError("Houve um erro ao enviar o arquivo.");
		    }
		}
	}
		

	function spawnError($message) {
		echo '<script type="text/javascript">',
		"javascript: void spawnNotification('Upload','$message');",
		'</script>';
	}
?>