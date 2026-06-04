package com.example.demo.controller;

import com.example.demo.dto.PostCreateRequest;
import com.example.demo.dto.PostResponse;
import com.example.demo.dto.PostUpdateRequest;
import com.example.demo.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    private final PostService postService;

    @GetMapping
    public List<PostResponse> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable Long id) {
        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public PostResponse createPost(@RequestBody PostCreateRequest request) {
        return postService.createPost(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostResponse> updatePost(@PathVariable Long id, @RequestBody PostUpdateRequest request) {
        return postService.updatePost(id, request)
                .map(updated -> {
                    if (updated == null) return ResponseEntity.status(HttpStatus.FORBIDDEN).<PostResponse>build();
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id, @RequestParam String password) {
        boolean deleted = postService.deletePost(id, password);
        if (deleted) return ResponseEntity.ok().build();
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}
