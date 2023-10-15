package kbs.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import jakarta.validation.Valid;
import kbs.dto.UserDTO;
import kbs.model.Company;
import kbs.model.User;
import kbs.service.CompanyService;
import kbs.service.UserService;
import kbs.utils.BindingResultFieldErrorAdapter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("users")
public class UserController {

    private final UserService userService;
    private final CompanyService companyService;

    public UserController(UserService userService, CompanyService companyService) {
        this.userService = userService;
        this.companyService = companyService;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Object> signUp(@Valid @RequestBody UserDTO userDTO, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            GsonBuilder builder = new GsonBuilder();
            builder.registerTypeHierarchyAdapter(BindingResult.class, new BindingResultFieldErrorAdapter());
            builder.setPrettyPrinting();
            Gson gson = builder.create();
            return new ResponseEntity<>(gson.toJson(bindingResult), HttpStatus.BAD_REQUEST);
        }

        if (userService.getUserByEmail(userDTO.email).isPresent()) {
            return new ResponseEntity<>("Email already exists", HttpStatus.CONFLICT);
        }

        User user = userService.save(User.fromDTO(userDTO));
        Company userCompany = companyService.save(new Company());
        user.setCompany(userCompany);
        userService.save(user);

        URI uri = URI.create(ServletUriComponentsBuilder
                .fromCurrentRequest().path("/" + user.getEmail())
                .toUriString());

        return ResponseEntity.created(uri).body(UserDTO.fromUser(user));
    }
}


