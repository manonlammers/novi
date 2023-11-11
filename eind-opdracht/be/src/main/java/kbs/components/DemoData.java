package kbs.components;


import kbs.model.Company;
import kbs.model.Customer;
import kbs.model.Role;
import kbs.model.User;
import kbs.repository.CompanyRepository;
import kbs.repository.CustomerRepository;
import kbs.repository.RoleRepository;
import kbs.repository.UserRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DemoData {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final CompanyRepository companyRepository;
    private final CustomerRepository customerRepository;

    public DemoData(
        PasswordEncoder passwordEncoder,
        UserRepository userRepository,
        RoleRepository roleRepository,
        CompanyRepository companyRepository,
        CustomerRepository customerRepository
    ) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.companyRepository = companyRepository;
        this.customerRepository = customerRepository;
    }

    @EventListener
    public void appReady(ApplicationReadyEvent event) {
        Role adminRole = roleRepository.save(new Role("ADMIN"));
        Role userRole = roleRepository.save(new Role("USER"));

        List<Role> adminRoles = new ArrayList<>();
        adminRoles.add(adminRole);

        List<Role> userRoles = new ArrayList<>();
        userRoles.add(userRole);

        User admin = new User();
        admin.setEmail("admin@mail.com");
        admin.setPassword(passwordEncoder.encode("test"));
        admin.setRoles(adminRoles);
        userRepository.save(admin);

        User user1 = userRepository.save(new User());
        user1.setEmail("user1@mail.com");
        user1.setPassword(passwordEncoder.encode("test"));
        user1.setRoles(userRoles);

        Company user1Company = companyRepository.save(new Company());
        user1.setCompany(user1Company);
        user1 = userRepository.save(user1);

        Customer customerUser1Company = new Customer();
        customerUser1Company.setName("Customer 1");
        customerUser1Company.setCompany(user1Company);
        customerUser1Company = customerRepository.save(customerUser1Company);
    }
}
