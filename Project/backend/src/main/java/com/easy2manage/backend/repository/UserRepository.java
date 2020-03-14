package com.easy2manage.backend.repository;

import com.easy2manage.backend.model.user.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    User getUserById(Integer id);

    User getUserByUsername(String username);

    User getUserByEmail(String email);
}
