package kbs.repository;

import kbs.model.Company;
import kbs.model.Customer;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CustomerRepository extends CrudRepository <Customer, Long> {
    List<Customer> findByCompanyId(Long id);

    void deleteById(Long id);
}
