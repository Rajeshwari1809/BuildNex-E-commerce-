package com.backend.service;

import java.util.concurrent.Executor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;


@Service
public class EmailService {

	@Autowired
    private JavaMailSender mailSender;
	
	@Autowired
	private Executor taskExecutor;

	@Async
    public void sendEmailAsync(String to, String subject, String body) 
	{
		taskExecutor.execute(() -> {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("b.lunawat@gmail.com");
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);
        });
    }
}  
