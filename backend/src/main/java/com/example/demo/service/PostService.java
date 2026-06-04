package com.example.demo.service;

import com.example.demo.domain.Post;
import com.example.demo.dto.PostCreateRequest;
import com.example.demo.dto.PostResponse;
import com.example.demo.dto.PostUpdateRequest;
import com.example.demo.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    public List<PostResponse> getAllPosts() {
        return postRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public Optional<PostResponse> getPostById(Long id) {
        return postRepository.findById(id).map(this::convertToResponse);
    }

    public PostResponse createPost(PostCreateRequest request) {
        Post post = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .author(request.getAuthor())
                .password(request.getPassword())
                .build();
        
        return convertToResponse(postRepository.save(post));
    }

    public Optional<PostResponse> updatePost(Long id, PostUpdateRequest request) {
        return postRepository.findById(id).map(post -> {
            if (post.getPassword().equals(request.getPassword())) {
                post.setTitle(request.getTitle());
                post.setContent(request.getContent());
                return convertToResponse(postRepository.save(post));
            }
            return null; // For handling 403 in controller
        });
    }

    public boolean deletePost(Long id, String password) {
        return postRepository.deleteById(id, password);
    }

    private PostResponse convertToResponse(Post post) {
        PostResponse response = new PostResponse();
        response.setId(post.getId());
        response.setTitle(post.getTitle());
        response.setContent(post.getContent());
        response.setAuthor(post.getAuthor());
        response.setCreatedAt(post.getCreatedAt());
        response.setUpdatedAt(post.getUpdatedAt());
        return response;
    }
}
