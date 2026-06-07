package com.lakshyakumrawat.Ecomm.repo;

import com.lakshyakumrawat.Ecomm.model.Product;
import com.lakshyakumrawat.Ecomm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
