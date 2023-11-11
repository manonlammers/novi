package kbs.controller;

import jakarta.validation.Valid;
import kbs.dto.UserDTO;
import kbs.model.User;
import kbs.security.JwtService;
import kbs.security.MyUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<Object> auth(@Valid @RequestBody UserDTO userDTO) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDTO.email, userDTO.password);

        try {
            Authentication auth = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
            MyUserDetails userDetails = (MyUserDetails) auth.getPrincipal();
            String token = jwtService.generateToken(userDetails);
            AuthResponseBody responseBody = new AuthResponseBody(token, userDetails.getUser());
            return ResponseEntity.ok().body(responseBody);
        }
        catch (AuthenticationException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    private class AuthResponseBody {
        public String token;
        public UserDTO user;

        public AuthResponseBody(String token) {
            this.token = token;
        }

        public AuthResponseBody(String token, User user) {
            this.token = token;
            this.user = UserDTO.fromUser(user);
        }
    }
}


