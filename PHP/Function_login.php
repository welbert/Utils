<?php
   /**
   * Colocar nas paginas que necessitam de login.
   * include("php/Function_login.php");
	* checkLogin();
   */

   require 'php/connection_database.php';
   date_default_timezone_set("America/Sao_Paulo");

   if (session_status() == PHP_SESSION_NONE) { //PHP >= 5.4
      session_start();
   }

   function validaUsuario($usuario, $senha){
      $usuarioEscaped = addslashes($usuario);
      $senhaEscaped = addslashes($senha);

      if (!isset($_SESSION['CREATED'])) {
   		$_SESSION['CREATED'] = time();
      } else if (time() - $_SESSION['CREATED'] < 900) { //15 min de sessão
   		$_SESSION['CREATED'] = time();
   	} else{
         session_regenerate_id(true);
         return array(false,"A sessão expirou, efetue o login novamente.");
      }

      $sql = "SELECT pes_id_pessoa FROM pes_pessoa WHERE pes_nm_pessoa = '".$usuarioEscaped.
      "' AND pes_nm_senha = '".$senhaEscaped."' LIMIT 1";
      $result = DataBase::getInstance()->executeQuerySelect($sql);
      if($result->num_rows <= 0){
         return array(false,"Não foi encontrado Usuario/Senha no sistema.");
      }else{
         $result = $result->fetch_assoc();
         $_SESSION['USERID'] = $result["pes_id_pessoa"];
         $_SESSION['USERNAME'] = $usuario;
         $_SESSION['SECRET'] = $senha;
      }
      return array(true);
   }

   function checkLogin() //Método para verificar se o usuario deve estar conectado
   {
      if (!isset($_SESSION['USERID']) OR !isset($_SESSION['USERNAME']) OR !isset($_SESSION['SECRET'])) {
         // Não há usuário logado, manda pra página de login
         header("Location: login.php");
      } else{
         $loginTest = validaUsuario($_SESSION['USERNAME'], $_SESSION['SECRET']);
         if (!$loginTest[0]) {
           // Os dados não batem, manda pra tela de login
           redirectUser($loginTest[1]);
         }

      }
   }

   function redirectUser($message)
   {
      echo '<script type="text/javascript">',
   	"javascript: alert(".$message.");",
   	'</script>';
      header("Location: login.php");
   }
?>
