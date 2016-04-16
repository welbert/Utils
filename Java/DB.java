package gerenciadorvenda.util;
import java.sql.*;
import java.util.Map;
import java.util.Map.Entry;


public class DB {
	private static DB instance = new DB();
	private static final String connString = "jdbc:sqlite:Bvendas.db";
	private String dberror_msg = "";
	private String exception_msg = "";
	private boolean dberror;
	
	Connection connection = null;
	
	//GET AND SET-------------------------------------------
	
	public String get_dberror(){
		String aux = dberror_msg;
		dberror_msg = "";
		dberror = false;
		return aux;
	}
	
	public boolean hasDberror(){
		return dberror;
	}
	
	public String get_ExceptionMsg(){
		String aux = exception_msg;
		exception_msg = "";
		return aux;
	}
	//END GET AND SET---------------------------------------
	
	//FUNCTIONS---------------------------------------
	private DB(){
		try {
			Class.forName("org.sqlite.JDBC");
			connection = DriverManager.getConnection(connString);
			connection.setAutoCommit(false);
			dberror=false;
		} catch (Exception e) {
			dberror = true;
			dberror_msg = "Error 001 :\n" + e.getClass().getName() + ": " + e.getMessage() + "\n";
			exception_msg = "Error 001 : " + e.getClass().getName() + ": " + e.getMessage();
		}		
	}
	
	public static DB getInstance(){
		return instance;
	}
	
	public boolean isConnected(){
		try {
			return (connection != null && !connection.isClosed());
		} catch (Exception e) {
			return false;
		}
	}
	
	public void resetConnection(){
		try {
			Class.forName("org.sqlite.JDBC");
			connection = DriverManager.getConnection(connString);
			connection.setAutoCommit(false);
		} catch (Exception e) {
			dberror = true;
			exception_msg = "Error 001 : " + e.getClass().getName() + ": " + e.getMessage();
			dberror_msg = "Error 001 :\n" + e.getClass().getName() + ": " + e.getMessage() + "\n";
		}
	}

	public void commit(){
		try {
			connection.commit();
		} catch (SQLException e) {
			dberror = true;
			exception_msg = "Error 002 : " + e.getClass().getName() + ": " + e.getMessage();
			dberror_msg += "Error 002 :\nNão foi possivel enviar as modificações para o banco\n";
		}
	}
	
	public void rollback(){
		try{
		connection.rollback();
		}catch (SQLException e){
			dberror = true;
			exception_msg = "Error 003 : " + e.getClass().getName() + ": " + e.getMessage();
			dberror_msg += "Error 003 :\nNão foi possivel reverter as modificações para o banco\n";
		}
	}
	
	public int insertInformation(String tabela,Map<String, Object> map){
		java.util.Iterator<Entry<String, Object>> it = map.entrySet().iterator();
		String concatKeys = null;
		String concatValues = null;
		Map.Entry<String, Object> entry;
			
		entry = it.next();
		concatKeys = entry.getKey();
		concatValues = "'"+entry.getValue().toString()+"'";
		it.remove();
		
		while(it.hasNext()){
			entry = it.next();
			concatKeys += ", "+entry.getKey();
			concatValues += ", '"+entry.getValue().toString()+"'";
			it.remove();
		}
		try{
			Statement stm = connection.createStatement();
			String sql = "INSERT INTO "+tabela+" ("+concatKeys+") VALUES ("+concatValues+");";
			stm.executeUpdate(sql);
			ResultSet rs = connection.createStatement().executeQuery("SELECT last_insert_rowid() FROM " + tabela+";");
			if(rs.next())
				return rs.getInt(1);
		}catch(Exception e){
			dberror = true;
			exception_msg = "Error 004 : " + e.getClass().getName() + ": " + e.getMessage();
			dberror_msg += "Error 004 :\nNão foi possivel inserir as informações no banco\n";
			return 0;
		}
		return 0;
	}
	
	public int updateInformation(String tabela,Map<String, Object> setValue,Map<String, Object> setWhere){
		
		String clauseWhere = null;
		String clauseSet = null;
		
		java.util.Iterator<Entry<String, Object>> it = setWhere.entrySet().iterator();
		Map.Entry<String, Object> entry;
		//Set<Entry<String, Object>> clauseSet = setValue.entrySet();
			
		entry = it.next();
		clauseWhere = entry.getKey()+" = '"+entry.getValue()+"'";
		it.remove();
		
		while(it.hasNext()){
			entry = it.next();
			clauseWhere += " AND "+entry.getKey()+" = '"+entry.getValue()+"'";
			it.remove();
		}
		
		it = setValue.entrySet().iterator();		
		entry = it.next();
		clauseSet = entry.getKey()+" = '"+entry.getValue()+"'";
		it.remove();
		
		while(it.hasNext()){
			entry = it.next();
			clauseSet += ", "+entry.getKey()+" = '"+entry.getValue()+"'";
			it.remove();
		}
		
		try{
			Statement stm = connection.createStatement();
			String sql = "Update "+tabela+" set " + clauseSet +" WHERE "+ clauseWhere+";";
			return stm.executeUpdate(sql);
		}catch(Exception e){
			dberror = true;
			exception_msg = "Error 005 : " + e.getClass().getName() + ": " + e.getMessage();
			dberror_msg += "Error 005 :\nNão foi possivel atualizar as informações no banco\n";
			return 0;
		}

	}
	
	public int deleteInformation(String tabela,String where){
		try{
			String sql;
			Statement stm;
			stm = connection.createStatement();
			
			sql = "DELETE FROM "+tabela+" WHERE "+where+";";
			return stm.executeUpdate(sql);
			
		}catch(Exception e){
			dberror = true;
			exception_msg = "Error 006 : " + e.getClass().getName() + ": " + e.getMessage();
			dberror_msg += "Error 006 :\nNão foi possivel deletar as informações no banco\n";
			return 0;
		}		
	}
	
	public ResultSet selectInformation(String select,String tabela,String where){
		try{
			Statement stm;
			stm = connection.createStatement();
			
			return stm.executeQuery("Select "+select+" From "+tabela+" WHERE "+where+";");
		}catch(Exception e){
			dberror = true;
			exception_msg = "Error 007 : " + e.getClass().getName() + ": " + e.getMessage();
			dberror_msg += "Error 007 :\nNão foi possivel recuperar as informações no banco\n";
			return null;
		}		
	}
	
	public ResultSet selectAll(String tabela){
		try{
			Statement stm;
			stm = connection.createStatement();
			
			return stm.executeQuery("Select * From "+tabela+";");
		}catch(Exception e){
			dberror = true;
			exception_msg = "Error 008 : " + e.getClass().getName() + ": " + e.getMessage();
			dberror_msg += "Error 008 :\nNão foi possivel recuperar as informações no banco\n";
			return null;
		}
	}
	
	public Object sqlQuery(String sql){
		
		try{
			Statement stm;
			stm = connection.createStatement();
			
			if(sql.charAt(0)=='U'||sql.charAt(0)=='I'||sql.charAt(0)=='D')
				return stm.executeUpdate(sql);
			else
				return stm.executeQuery(sql);
		}catch(Exception e){
			dberror = true;
			exception_msg = "Error 009 : " + e.getClass().getName() + ": " + e.getMessage();
			dberror_msg += "Error 009 :\nNão foi possivel realizar o comando:\n"+sql+"\n";
			return null;
		}
	
	}
}
