package kbs.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public class UserDto {
    public Long id;

    @Email(message = "e-mailadress is invalid")
    @NotEmpty(message = "e-mailadress is required")
    public String emailAddress;

    @NotEmpty(message = "Password is required")
    public String password;

    public String[] roles;
}