package com.example.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    private Long id;
    private String title;
    private String content;
    private String author;
    private String password;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
