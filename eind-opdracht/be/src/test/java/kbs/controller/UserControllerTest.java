package kbs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kbs.dto.UserDTO;
import kbs.model.Role;
import kbs.model.User;
import kbs.security.JwtService;
import kbs.service.CompanyService;
import kbs.service.RoleService;
import kbs.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Optional;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@WebMvcTest(UserController.class)
@ActiveProfiles("test")
@AutoConfigureMockMvc(addFilters = false)
public class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    PasswordEncoder passwordEncoder;

    @MockBean
    JwtService jwtService;

    @MockBean
    RoleService roleService;

    @MockBean
    CompanyService companyService;

    @MockBean
    UserService userService;

    @Test
    void testSignUpValidatesInput() throws Exception {
        UserDTO userDTO = new UserDTO();

        when(userService.save(any())).thenReturn(User.fromDTO(userDTO));

        this.mockMvc
            .perform(MockMvcRequestBuilders.post("/users/sign-up")
                .content(objectMapper.writeValueAsString(userDTO))
                .contentType(MediaType.APPLICATION_JSON)
            )
            .andExpect(MockMvcResultMatchers.status().isBadRequest())
            .andExpect(MockMvcResultMatchers.jsonPath("$.password", is("is required")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.email", is("is required")));
    }

    @Test
    void testSignUpAlreadyExistingUser() throws Exception {
        UserDTO userDTO = new UserDTO();
        userDTO.email = "user@mail.com";
        userDTO.password = "password";

        when(userService.findByEmail(userDTO.email)).thenReturn(Optional.of(User.fromDTO(userDTO)));
        when(userService.save(any())).thenReturn(User.fromDTO(userDTO));

        this.mockMvc
            .perform(MockMvcRequestBuilders.post("/users/sign-up")
                .content(objectMapper.writeValueAsString(userDTO))
                .contentType(MediaType.APPLICATION_JSON)
            )
            .andExpect(MockMvcResultMatchers.status().isConflict());
    }

    @Test
    void testSignUpNewUser() throws Exception {
        Role userRole = new Role("USER");
        when(roleService.findByRolename("USER")).thenReturn(Optional.of(userRole));

        UserDTO userDTO = new UserDTO();
        userDTO.email = "user@mail.com";
        userDTO.password = "password";

        when(userService.save(any())).thenReturn(User.fromDTO(userDTO));

        this.mockMvc
            .perform(MockMvcRequestBuilders.post("/users/sign-up")
                .content(objectMapper.writeValueAsString(userDTO))
                .contentType(MediaType.APPLICATION_JSON)
            )
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.email", is(userDTO.email)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.role", is(userRole.getRolename())))
            .andExpect(MockMvcResultMatchers.jsonPath("$.password", is(passwordEncoder.encode(userDTO.password))));
    }
}
