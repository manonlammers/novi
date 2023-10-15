package kbs.controller;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.validation.Valid;
import kbs.constants.Constants;
import kbs.dto.UserDTO;
import kbs.model.User;
import kbs.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("auth")
public class AuthController {
    private static final String DATE_FORMAT = "yyyy/MM/dd HH:mm:ss";
    private static final DateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@Valid @RequestBody UserDTO userDTO) {
        Optional<User> user = userService.getUserByEmail(userDTO.email);
        if (user.isEmpty()) {
            return new ResponseEntity<>("Does not exists", HttpStatus.NOT_FOUND);
        }
        if (!user.get().getPassword().equals(userDTO.password)) {
            return new ResponseEntity<>("Does not exists", HttpStatus.NOT_FOUND);
        }

        User instance = user.get();
        URI uri = URI.create(ServletUriComponentsBuilder
                .fromCurrentRequest().path("/" + instance.getEmail())
                .toUriString());

        LocalDateTime localDateTime = new Date()
                .toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime()
                .plusDays(1);

        Date expiration = Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
        String expireDate = dateFormat.format(expiration);

        String token = Jwts.builder()
                .setExpiration(expiration)
                .setSubject(String.valueOf(instance.getId()))
                .signWith(SignatureAlgorithm.HS512, Constants.JWS_SECRET)
                .compact();

        AuthResponseBody responseBody = new AuthResponseBody(token, expireDate, instance);

        return ResponseEntity.created(uri).body(responseBody);
    }

    private class AuthResponseBody {
        public final String token;
        public final String expireDate;
        public final UserDTO user;

        public AuthResponseBody(String token, String expireDate, User user) {
            this.token = token;
            this.expireDate = expireDate;
            this.user = UserDTO.fromUser(user);
        }
    }
}


