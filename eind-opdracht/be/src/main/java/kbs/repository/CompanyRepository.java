package kbs.repository;

import kbs.model.Company;
import kbs.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface CompanyRepository extends CrudRepository <Company, Long> {
//    Optional<Company> findByOwner(User user);
}
