package com.api.tfg.repositories;

import com.api.tfg.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICommentRepository extends JpaRepository<Comment, String> {
}
