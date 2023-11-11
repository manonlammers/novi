package kbs.model;

import kbs.dto.UserDTO;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UserTest {
    @BeforeEach
    void setUp() {

    }

    @AfterEach()
    void tearDown() {

    }

    @Test
    void testConstructorSetsPropertiesAsExpected() {
        long id = 1;
        Company company = new Company();
        File avatar = new File();
        String email = "email";
        String password = "password";

        User user = new User(
            id,
            company,
            avatar,
            email,
            password
        );

        assertEquals(company, user.getCompany());
        assertEquals(avatar, user.getAvatar());
        assertEquals(id, user.getId());
        assertEquals(email, user.getEmail());
        assertEquals(password, user.getPassword());
    }

    @Test
    void testSetsAndGetsPropertiesAsExpected() {
        long id = 1;
        Company company = new Company();
        File avatar = new File();
        String email = "email";
        String password = "password";
        List<Role> roles = new ArrayList<>();

        User user = new User();
        user.setCompany(company);
        user.setAvatar(avatar);
        user.setId(id);
        user.setEmail(email);
        user.setPassword(password);
        user.setRoles(roles);

        assertEquals(company, user.getCompany());
        assertEquals(avatar, user.getAvatar());
        assertEquals(id, user.getId());
        assertEquals(email, user.getEmail());
        assertEquals(password, user.getPassword());
        assertEquals(roles, user.getRoles());
    }

    @Test
    void testFromDTOReturnsInstanceAsExpected() {
        long userId = 1;
        UserDTO userDTO = new UserDTO(
            userId,
            null,
            null,
            "email",
            "password",
            "role"
        );

        User user = User.fromDTO(userDTO);

        assertEquals(userDTO.id, user.getId());
        assertEquals(userDTO.company, user.getCompany());
        assertEquals(userDTO.avatar, user.getAvatar());
        assertEquals(userDTO.email, user.getEmail());
        assertEquals(userDTO.password, user.getPassword());
    }
}
