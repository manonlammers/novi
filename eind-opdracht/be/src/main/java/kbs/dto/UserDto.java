package kbs.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import kbs.model.User;

public class UserDTO {
    public Long id;

    @Email(message = "Is vereist")
    @NotEmpty(message = "Ongeldige invoer")
    public String email;

    @NotEmpty(message = "Is vereist")
    public String password;

    public CompanyDTO company;

    public UserDTO() {

    }

    public UserDTO(
            Long id,
            CompanyDTO company,
            String email,
            String password
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.company = company;
    }

    public static UserDTO fromUser(User user) {
        return new UserDTO(
                user.getId(),
                user.getCompany() != null ? CompanyDTO.fromCompany(user.getCompany()) : null,
                user.getEmail(),
                user.getPassword()
        );
    }
}
