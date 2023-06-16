package kbs.service;

import kbs.dto.CustomerDto;
import kbs.model.Customer;
import kbs.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {
    private final CustomerRepository repository;

    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public Long createCustomer(CustomerDto customerDto) {
        Customer customer = new Customer();
        customer.setName(customerDto.name);
        customer.setTreatment(customerDto.treatment);
        customer.setMinutes(customerDto.minutes);
        customer.setPain(customerDto.pain);
        customer.setInfo(customerDto.info);

        repository.save(customer);

        return customer.getId();
    }

    public Iterable<Customer> findAll() {
        return repository.findAll();
    }

    public Optional<Customer> findById(Long id) {
        return repository.findById(id);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public void updateCustomer(Long id, CustomerDto customerDto) {
        Customer customer = repository.findById(id).get();

        customer.setName(customerDto.name);
        customer.setTreatment(customerDto.treatment);
        customer.setMinutes(customerDto.minutes);
        customer.setPain(customerDto.pain);
        customer.setInfo(customerDto.info);

        repository.save(customer);
    }
}
