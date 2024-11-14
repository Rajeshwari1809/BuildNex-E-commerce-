package com.backend.utility;

public class Helper {
	
	public static String getAlphaNumericOrderId()
    {
  
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                                    + "0123456789"
                                    + "abcdefghijklmnopqrstuvxyz";
  
        StringBuilder sb = new StringBuilder(10);
  
        for (int i = 0; i < 10; i++) {
  
            int index
                = (int)(AlphaNumericString.length()
                        * Math.random());
  
            sb.append(AlphaNumericString
                          .charAt(index));
        }
        System.out.println(sb.toString().toUpperCase());
        return sb.toString().toUpperCase();
    }

}
