package com.example.demo.dto;

import lombok.Data;

@Data
public class PostUpdateRequest {
    private String title;
    private String content;
    private String password;
}
