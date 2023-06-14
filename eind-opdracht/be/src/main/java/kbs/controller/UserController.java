package kbs.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import jakarta.validation.Valid;
import kbs.dto.UserDto;
import kbs.model.User;
import kbs.service.UserService;
import kbs.utils.BindingResultFieldErrorAdapter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Object> createUser(@Valid @RequestBody UserDto udto, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            GsonBuilder builder = new GsonBuilder();
            builder.registerTypeHierarchyAdapter(BindingResult.class, new BindingResultFieldErrorAdapter());
            builder.setPrettyPrinting();
            Gson gson = builder.create();
            return new ResponseEntity<>(gson.toJson(bindingResult), HttpStatus.BAD_REQUEST);
        }

        if (service.getUserByEmail(udto.email).isPresent()) {
            return new ResponseEntity<>("Email already exists", HttpStatus.CONFLICT);
        }

        String email = service.createUser(udto);
        udto.email = email;

        URI uri = URI.create(ServletUriComponentsBuilder
                .fromCurrentRequest().path("/" + email)
                .toUriString());

        return ResponseEntity.created(uri).body(udto);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@Valid @RequestBody UserDto userDto) {
        Optional<User> user = service.getUserByEmail(userDto.email);
        if (user.isEmpty()) {
            return new ResponseEntity<>("Does not exists", HttpStatus.NOT_FOUND);
        }
        if (!user.get().getPassword().equals(userDto.password)) {
            return new ResponseEntity<>("Does not exists", HttpStatus.NOT_FOUND);
        }

        URI uri = URI.create(ServletUriComponentsBuilder
                .fromCurrentRequest().path("/" + userDto.email)
                .toUriString());

        return ResponseEntity.created(uri).body(userDto);
    }
}


