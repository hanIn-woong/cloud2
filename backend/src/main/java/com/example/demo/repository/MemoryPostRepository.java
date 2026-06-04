package com.example.demo.repository;

import com.example.demo.domain.Post;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class MemoryPostRepository implements PostRepository {
    private final List<Post> posts = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong();

    @Override
    public List<Post> findAll() {
        return new ArrayList<>(posts);
    }

    @Override
    public Optional<Post> findById(Long id) {
        return posts.stream().filter(post -> post.getId().equals(id)).findFirst();
    }

    @Override
    public Post save(Post post) {
        if (post.getId() == null) {
            post.setId(counter.incrementAndGet());
            post.setCreatedAt(LocalDateTime.now());
            post.setUpdatedAt(LocalDateTime.now());
            posts.add(post);
        } else {
            post.setUpdatedAt(LocalDateTime.now());
        }
        return post;
    }

    @Override
    public boolean deleteById(Long id, String password) {
        return posts.removeIf(post -> post.getId().equals(id) && post.getPassword().equals(password));
    }
}
