package kbs.model;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class RoleTest {
    @BeforeEach
    void setUp() {

    }

    @AfterEach()
    void tearDown() {

    }

    @Test
    void testSetsAndGetsPropertiesAsExpected() {
        String rolename = "rolename";

        Role role = new Role();
        role.setRolename(rolename);

        assertEquals(rolename, role.getRolename());
    }
}
