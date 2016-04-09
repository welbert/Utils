package test3;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

public class converterImgString {

	public BufferedImage stringToImage(String i){

		byte[] imageInByte = i.getBytes(); 	
		InputStream in = new ByteArrayInputStream(imageInByte);
		try {
			BufferedImage bImageFromConvert = ImageIO.read(in);
			return bImageFromConvert;
		} catch (IOException e) {
			System.out.println("Erro ao transforar em imagem");
			e.printStackTrace();
		}
		return null;
	}

	public String imageToString (BufferedImage img){

		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try{
			ImageIO.write(img, "jpg", baos);
			baos.flush();
			byte[] imageInByte = baos.toByteArray();
			baos.close();
			System.out.println(imageInByte);
			System.out.println(imageInByte.toString());
			return imageInByte.toString();
		}catch(Exception e){System.out.println("Erro ao transformar em string");}
		return null;
	}

}
