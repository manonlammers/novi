package kbs.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import jakarta.validation.Valid;
import kbs.dto.CustomerDTO;
import kbs.model.Customer;
import kbs.service.CustomerService;
import kbs.utils.BindingResultFieldErrorAdapter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getCustomer(@PathVariable Long id){
        Customer customer = customerService.findById(id);
        return new ResponseEntity<>(CustomerDTO.fromCustomer(customer), HttpStatus.OK);
    }
    @GetMapping("/all-customers/{companyId}")
    public ResponseEntity<Object> getCustomersByCompanyId(@PathVariable Long companyId){
        List<Customer> customers = customerService.findByCompanyId(companyId);
        return new ResponseEntity<>(customers.stream().map(CustomerDTO::fromCustomer), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> updateOrCreate(@Valid @RequestBody CustomerDTO customerDto, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            GsonBuilder builder = new GsonBuilder();
            builder.registerTypeHierarchyAdapter(BindingResult.class, new BindingResultFieldErrorAdapter());
            builder.setPrettyPrinting();
            Gson gson = builder.create();
            return new ResponseEntity<>(gson.toJson(bindingResult), HttpStatus.BAD_REQUEST);
        }

        Customer customer = customerService.save(customerDto);

        URI uri = URI.create(ServletUriComponentsBuilder
                .fromCurrentRequest().path("/" + customer.getId())
                .toUriString());

        return ResponseEntity.created(uri).body(CustomerDTO.fromCustomer(customer));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
        customerService.deleteById(id);

        return new ResponseEntity<>("OK", HttpStatus.OK);
    }
}
