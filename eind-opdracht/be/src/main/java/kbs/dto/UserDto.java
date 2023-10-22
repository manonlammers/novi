package kbs.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import kbs.model.Role;
import kbs.model.User;

import java.util.Optional;

public class UserDTO {
    public Long id;

    @Email(message = "Is vereist")
    @NotEmpty(message = "Ongeldige invoer")
    public String email;

    @NotEmpty(message = "Is vereist")
    public String password;

    public CompanyDTO company;

    public String role;

    public UserDTO() {

    }

    public UserDTO(
            Long id,
            CompanyDTO company,
            String email,
            String password,
            String role
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.company = company;
        this.role = role;
    }

    public static UserDTO fromUser(User user) {
        Optional<Role> firstRole = user.getRoles().stream().findFirst();
        Role role = firstRole.get();

        return new UserDTO(
                user.getId(),
                user.getCompany() != null ? CompanyDTO.fromCompany(user.getCompany()) : null,
                user.getEmail(),
                user.getPassword(),
                role.getRolename()
        );
    }
}
