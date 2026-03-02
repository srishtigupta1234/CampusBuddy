package com.college.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.college.model.User;
import com.college.repository.UserRepository;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public void run(String... args) {

        if (userRepo.count() == 0) {

            User admin = new User();

            admin.setUsername("admin");
            admin.setPassword(
                    encoder.encode("admin123")
            );
            admin.setRole("ROLE_ADMIN");

            userRepo.save(admin);
        }
    }
}
