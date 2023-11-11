package kbs.service;

import kbs.dto.CustomerDTO;
import kbs.exception.ResourceNotFoundException;
import kbs.model.Company;
import kbs.model.Customer;
import kbs.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customer findById(Long id) {
        return customerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
    }

    public List<Customer> findByCompanyId(Long id) {
        return customerRepository.findByCompanyId(id);
    }

    public Customer save(CustomerDTO customerDTO) {
        Customer customer = Customer.fromDTO(customerDTO);
        Company company = new Company(customerDTO.companyId);
        customer.setCompany(company);
        return customerRepository.save(customer);
    }

    public void deleteById(Long id) {
        customerRepository.deleteById(id);
    }
}
