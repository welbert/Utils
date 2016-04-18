<?php
/**
* Colocar nas paginas que necessitam de login.
* include("php/Function_login.php");
* checkLogin();
* @author Welbert Serra
*/

   require 'php/connection_database.php';
   date_default_timezone_set("America/Sao_Paulo");
   $_CONFIG['SESSION_TIME'] = 900; //15 min de sessão
   $_CONFIG['TENTATIVAS'] = 3; //Limite de tentativas de login

   if (session_status() == PHP_SESSION_NONE) { //PHP >= 5.4
      session_start();
   }

   if(!isset($_SESSION['CHANCE']))
     $_SESSION['CHANCE'] = 0;


   function validaUsuario($usuario, $senha){ //Função para validar usuario com o banco
    global $_CONFIG;

    /** CONTROLE DE SESSÃO E TENTATIVAS DO USUARIO
    */
    if (!isset($_SESSION['CREATED'])) { //Sessão ainda não existe
      $_SESSION['CREATED'] = time();
    } else if ((time() - $_SESSION['CREATED'] < $_CONFIG['SESSION_TIME']) && ($_SESSION['CHANCE'] < $_CONFIG['TENTATIVAS'])) {
      //Sessão existe, o tempo não estourou e o usuario não ultrapassou o limite de error de senha então renove a sessão
      $_SESSION['CREATED'] = time();
    } else if (time() - $_SESSION['CREATED'] >= $_CONFIG['SESSION_TIME']){ // A sessão expirou
      session_regenerate_id(true);
      $_SESSION['CREATED'] = time();
      //Dê a mensangem caso o usuario não tenha estourado limite de tentativas, pois provavelmente ele logou com sucesso
      //Senão siga o fluxo da função
      if($_SESSION['CHANCE'] < $_CONFIG['TENTATIVAS'] && $_SESSION['CHANCE']>0){
        $_SESSION['CHANCE'] = 0;
        return array(false,"A sessão expirou, efetue o login novamente.");
      }
      $_SESSION['CHANCE'] = 0;
    }

    //---------------------------------------------------------------------------------

    if($_SESSION['CHANCE'] >= $_CONFIG['TENTATIVAS']){
      return array(false,"Você errou a senha muitas vezes, aguarde até ".
  			date("H:i",($_SESSION['CREATED']+$_CONFIG['SESSION_TIME']+60)));
    }else {
      $usuarioEscaped = addslashes($usuario);
      $senhaEscaped = addslashes($senha);


      $sql = "SELECT pes_id_pessoa FROM pes_pessoa WHERE pes_nm_pessoa = '".$usuarioEscaped.
      "' AND pes_nm_senha = '".$senhaEscaped."' LIMIT 1";
      $result = DataBase::getInstance()->executeQuerySelect($sql);

      if($result->num_rows <= 0){
          $_SESSION['CHANCE'] += 1;

        return array(false,"Não foi encontrado Usuario/Senha no sistema com esses dados. Tentativas: ".$_SESSION['CHANCE']."/3");
      }else{
         $result = $result->fetch_assoc();
         $_SESSION['USERID'] = $result["pes_id_pessoa"];
         $_SESSION['USERNAME'] = $usuario;
         $_SESSION['SECRET'] = $senha;
      }
      return array(true);
    }
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
