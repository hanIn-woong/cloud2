package com.example.demo.repository;

import com.example.demo.domain.Post;
import java.util.List;
import java.util.Optional;

public interface PostRepository {
    List<Post> findAll();
    Optional<Post> findById(Long id);
    Post save(Post post);
    boolean deleteById(Long id, String password);
}
