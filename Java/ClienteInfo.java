package Cliente;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;

public class ClienteInfo {
	private static int visitante = 0;
	private Socket cliente = null;
	private String name = "guest"+visitante;
	private BufferedReader in = null;
	private DataOutputStream out = null;
	
	
	public ClienteInfo(Socket cliente){
		visitante += 1;
		this.cliente = cliente;
		try{
		in = new BufferedReader(new InputStreamReader(cliente.getInputStream())); // definira entrada e saida de dado
		out = new DataOutputStream(cliente.getOutputStream());
		}catch(Exception e){
			System.out.println("Ocorreu um erro ao criar a conexao com o servidor - Erro 101");
			e.printStackTrace();
		}
	}

	public ClienteInfo(Socket cliente,String name){
		visitante += 1;
		this.cliente = cliente;
		this.name = name;
		try{
		in = new BufferedReader(new InputStreamReader(cliente.getInputStream())); // definira entrada e saida de dado
		out = new DataOutputStream(cliente.getOutputStream());
		}catch(Exception e){
			System.out.println("Ocorreu um erro ao criar a conexao com o servidor - Erro 101");
			e.printStackTrace();
		}
	}

	
	public Socket getCliente() {
		return cliente;
	}

	public void setCliente(Socket cliente) {
		this.cliente = cliente;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public boolean enviarMensagemAoSocket(String texto){ // o boolean eh pra indicar se ocorreu a troca da mensagem
		try{
			texto = texto + '\n';
			out.writeBytes(texto); // será enviado o dado
			return true;
		}catch(Exception e){
			FecharConexao();
			System.out.println("Erro ao enviar uma mensagem ao cliente - Erro 103");
			//e.printStackTrace();
			return false;
		}
	}
	
	public String receberMensagemDoSocket(){
		try{
			if(!cliente.isClosed()){
			return in.readLine();
			}else{
				return null;
			}
		}catch(Exception e){
			FecharConexao();
			System.out.println("Ocorreu um erro ao receber a mensagem do Cliente, provavelmente usuario saiu do chat - Erro 104");
			return "ld"+getName();
		}
	}
	
	public boolean FecharConexao(){
		try {
			cliente.close();
			return true;
		} catch (IOException e) {
			System.out.println("Ocorreu um erro ao fechar a conexão do cliente - Erro 105");
			e.printStackTrace();
			return false;
		}
	}
}
