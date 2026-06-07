package com.lakshyakumrawat.Ecomm.repo;

import com.lakshyakumrawat.Ecomm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

    User findByEmail(String email);
}
