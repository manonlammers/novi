package kbs.service;

import kbs.exception.ResourceNotFoundException;
import kbs.model.Company;
import kbs.repository.CompanyRepository;
import org.springframework.stereotype.Service;


@Service
public class CompanyService {
    private final CompanyRepository repository;

    public CompanyService(CompanyRepository repository) {
        this.repository = repository;
    }

    public Company findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Company not found"));
    }

    public Company save(Company company) {
        return repository.save(company);
    }


    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
