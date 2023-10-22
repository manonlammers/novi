package kbs.repository;

import kbs.model.Company;
import org.springframework.data.repository.CrudRepository;


public interface CompanyRepository extends CrudRepository <Company, Long> {

}
