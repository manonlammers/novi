package kbs.controller;

import kbs.dto.UserDTO;
import kbs.model.Company;
import kbs.model.Customer;
import kbs.model.Role;
import kbs.model.User;
import kbs.service.CompanyService;
import kbs.service.CustomerService;
import kbs.service.RoleService;
import kbs.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


@RestController
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;
    private final CompanyService companyService;
    private final CustomerService customerService;

    public AdminController(
        UserService userService,
        RoleService roleService,
        CompanyService companyService,
        CustomerService customerService
    ) {
        this.userService = userService;
        this.roleService = roleService;
        this.companyService = companyService;
        this.customerService = customerService;
    }

    @GetMapping("/admin/all-users")
    public ResponseEntity<Object> allUsers() {
        Iterable<User> users = userService.findAll();
        List<UserDTO> usersList = new ArrayList<>();
        Role adminRole = roleService.findByRolename("ADMIN").get();

        for (User user : users) {
            if (!user.getRoles().contains(adminRole)) {
                usersList.add(UserDTO.fromUser(user));
            }
        }

        return ResponseEntity.ok().body(usersList);
    }

    @DeleteMapping("/admin/delete-user/{id}")
    public ResponseEntity<Object> deleteUserByID(@PathVariable("id") Long id) {
        User user = userService.getUserByID(id).get();
        Company company = user.getCompany();
        List<Customer> customers = customerService.findByCompanyId(company.getId());
        for (Customer c: customers) {
            customerService.deleteById(c.getId());
        }

        companyService.deleteById(company.getId());
        userService.deleteById(user.getId());
        return ResponseEntity.noContent().build();
    }
}


