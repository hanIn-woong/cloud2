package com.example.demo.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PostResponse {
    private Long id;
    private String title;
    private String content;
    private String author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
