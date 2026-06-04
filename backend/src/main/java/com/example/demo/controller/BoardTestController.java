package com.example.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "http://localhost:5173")
public class BoardTestController {

    @GetMapping
    public Map<String, String> testConnection() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Backend connection is working!");
        return response;
    }
}
