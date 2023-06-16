package kbs.service;

import kbs.dto.CompanyDto;
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

    public Long createCompany(CompanyDto cdto) {
        Company company = new Company();
        company.setName(cdto.name);

        repository.save(company);

        return company.getId();
    }

    public Company getCompanyById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Company not found"));
    }
}
