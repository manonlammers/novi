package com.example.eindopdracht.service;

import com.example.eindopdracht.dto.CompanyDto;
import com.example.eindopdracht.exception.ResourceNotFoundException;
import com.example.eindopdracht.model.Company;
import com.example.eindopdracht.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CompanyService {
    private final CompanyRepository repository;

    public CompanyService(CompanyRepository repository) {
        this.repository = repository;
    }

    public Long createCompany(CompanyDto cdto) {
        Company company = new Company();
        company.setCompanyName(cdto.companyName);

        repository.save(company);

        return company.getId();
    }

    public CompanyDto getCompanyById(Long id) {
        Company company = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Company not found"));

        CompanyDto cdto = new CompanyDto();
        cdto.id = company.getId();
        cdto.companyName = company.getCompanyName();

        return cdto;
    }
}
