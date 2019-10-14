package com.dhaval.demo.repository;


import com.dhaval.demo.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

    User findByName(String userName);

}
