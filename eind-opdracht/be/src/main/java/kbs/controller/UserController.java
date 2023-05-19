//package kbs.controller;
//
//import com.google.gson.Gson;
//import jakarta.validation.Valid;
//import kbs.dto.UserDto;
////import kbs.service.UserService;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.BindingResult;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
//
//import java.net.URI;
//
//@CrossOrigin(origins = "http://localhost:3000")
//@RestController
//@RequestMapping("users")
//public class UserController {
//    private final UserService service;
//
//    public UserController(UserService service) {
//        this.service = service;
//    }
//
//    @GetMapping({"/{id}"})
//    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
//        UserDto udto = service.getUserById(id);
//
//        return ResponseEntity.ok(udto);
//    }
//
//    @PostMapping
//    public ResponseEntity<Object> createUser(@Valid @RequestBody UserDto udto, BindingResult bindingResult) {
//        if (bindingResult.hasFieldErrors()) {
//            Gson gson = new Gson();
//            gson.toJson(bindingResult.getFieldErrors());
//            return new ResponseEntity<>(gson, HttpStatus.BAD_REQUEST);
////            StringBuilder sb = new StringBuilder();
////            for (FieldError fe : bindingResult.getFieldErrors()) {
////                sb.append(fe.getField()).append(": ");
////                sb.append(fe.getDefaultMessage()).append("\n");
////            }
////            return new ResponseEntity<>(sb.toString(), HttpStatus.BAD_REQUEST);
//        }
//        Long id = service.createUser(udto);
//        udto.id = id;
//
//        URI uri = URI.create(ServletUriComponentsBuilder
//                .fromCurrentRequest().path("/" + id).toUriString());
//
//        return ResponseEntity.created(uri).body(udto);
//    }
//}
