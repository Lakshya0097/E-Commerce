package com.genie.Ecomm.service;

import com.genie.Ecomm.model.User;
import com.genie.Ecomm.repo.UserRepository;
import com.genie.Ecomm.util.HashUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    public User registerUser(User user) {
        try
        {
            if (user.getPassword() != null) {
                user.setPassword(HashUtils.hashPassword(user.getPassword()));
            }
            User newUser = userRepository.save(user);
            System.out.println("User Added to database");
            return newUser;
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
         return null;
    }

    public User loginUser(String email, String password) {
        //check if user is there or not
        User user = userRepository.findByEmail(email);
        if (user != null && password != null) {
            if (HashUtils.checkPassword(password, user.getPassword())) {
                return user;
            }
        }
        return null;// invalid credentials
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
