package com.genie.Ecomm.controller;


import com.genie.Ecomm.model.User;
import com.genie.Ecomm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public org.springframework.http.ResponseEntity<?> registerUser(@RequestBody User user)
    {
        User registered = userService.registerUser(user);
        if (registered == null) {
            return org.springframework.http.ResponseEntity
                .status(org.springframework.http.HttpStatus.BAD_REQUEST)
                .body(java.util.Map.of("error", "Registration failed. Email might already be registered."));
        }
        return org.springframework.http.ResponseEntity.ok(registered);
    }


    @PostMapping("/login")
    public org.springframework.http.ResponseEntity<?> loginUser(@RequestBody User user)
    {
        User loggedIn = userService.loginUser(user.getEmail(), user.getPassword());
        if (loggedIn == null) {
            return org.springframework.http.ResponseEntity
                .status(org.springframework.http.HttpStatus.UNAUTHORIZED)
                .body(java.util.Map.of("error", "Invalid email or password."));
        }
        return org.springframework.http.ResponseEntity.ok(loggedIn);
    }

    @GetMapping
    public List<User> getAllUsers()
    {
        return userService.getAllUsers();
    }
}
