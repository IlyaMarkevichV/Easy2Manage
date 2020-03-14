package com.easy2manage.backend.repository;

import com.easy2manage.backend.model.user.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends CrudRepository<Role, Integer> {
    Role getRoleById(Integer id);

    Role getRoleByName(String name);
}
