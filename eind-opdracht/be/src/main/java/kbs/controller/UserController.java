package kbs.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import jakarta.validation.Valid;
import kbs.dto.UserDTO;
import kbs.model.Company;
import kbs.model.File;
import kbs.model.Role;
import kbs.model.User;
import kbs.service.CompanyService;
import kbs.service.RoleService;
import kbs.service.UserService;
import kbs.utils.BindingResultFieldErrorAdapter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@RestController
public class UserController {
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final RoleService roleService;
    private final CompanyService companyService;


    public UserController(PasswordEncoder passwordEncoder, UserService userService, RoleService roleService, CompanyService companyService) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.roleService = roleService;
        this.companyService = companyService;
    }

    @PostMapping("/users/sign-up")
    public ResponseEntity<Object> signUp(@Valid @RequestBody UserDTO userDTO, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            GsonBuilder builder = new GsonBuilder();
            builder.registerTypeHierarchyAdapter(BindingResult.class, new BindingResultFieldErrorAdapter());
            builder.setPrettyPrinting();
            Gson gson = builder.create();
            return new ResponseEntity<>(gson.toJson(bindingResult), HttpStatus.BAD_REQUEST);
        }

        if (userService.findByEmail(userDTO.email).isPresent()) {
            return new ResponseEntity<>("Email already exists", HttpStatus.CONFLICT);
        }

        Role userRole = roleService.findByRolename("USER").get();
        List<Role> userRoles = new ArrayList<>();
        userRoles.add(userRole);

        Company userCompany = companyService.save(new Company());

        User user = userService.save(User.fromDTO(userDTO));
        user.setPassword(passwordEncoder.encode(userDTO.password));
        user.setCompany(userCompany);
        user.setRoles(userRoles);

        userService.save(user);

        return ResponseEntity.ok().body(UserDTO.fromUser(user));
    }

    @PutMapping("/users")
    public ResponseEntity<Object> update(@Valid @RequestBody UserDTO userDTO, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            GsonBuilder builder = new GsonBuilder();
            builder.registerTypeHierarchyAdapter(BindingResult.class, new BindingResultFieldErrorAdapter());
            builder.setPrettyPrinting();
            Gson gson = builder.create();
            return new ResponseEntity<>(gson.toJson(bindingResult), HttpStatus.BAD_REQUEST);
        }

        User user = userService.findByEmail(userDTO.email).get();
        user.setEmail(userDTO.email);
        user.setPassword(passwordEncoder.encode(userDTO.password));
        user = userService.save(user);

        return ResponseEntity.ok().body(UserDTO.fromUser(user));
    }

    @PostMapping("/users/{id}/avatar")
    public ResponseEntity<String> saveUserAvatar(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException {
        userService.saveUserAvatar(id, file);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}


