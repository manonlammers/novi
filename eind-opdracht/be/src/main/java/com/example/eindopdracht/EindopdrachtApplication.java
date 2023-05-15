package com.example.eindopdracht;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class EindopdrachtApplication {

	public static void main(String[] args) {
		SpringApplication.run(EindopdrachtApplication.class, args);
	}
}
