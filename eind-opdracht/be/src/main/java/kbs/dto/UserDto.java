package kbs.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import kbs.model.Role;
import kbs.model.User;

import java.util.Optional;

public class UserDTO {
    public Long id;

    public CompanyDTO company;

    public FileDTO avatar;

    @Email(message = "invalid")
    @NotEmpty(message = "is required")
    public String email;

    @NotEmpty(message = "is required")
    public String password;

    public String role;

    public UserDTO() {

    }

    public UserDTO(
            Long id,
            CompanyDTO company,
            FileDTO avatar,
            String email,
            String password,
            String role
    ) {
        this.id = id;
        this.company = company;
        this.avatar = avatar;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public static UserDTO fromUser(User user) {
        Optional<Role> firstRole = user.getRoles().stream().findFirst();
        Role role = firstRole.get();

        return new UserDTO(
            user.getId(),
            user.getCompany() != null ? CompanyDTO.fromCompany(user.getCompany()) : null,
            user.getAvatar() != null ? FileDTO.fromFile(user.getAvatar()) : null,
            user.getEmail(),
            user.getPassword(),
            role.getRolename()
        );
    }
}
