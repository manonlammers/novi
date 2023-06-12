package kbs.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public class UserDto {
    @Email(message = "Is vereist")
    @NotEmpty(message = "Ongeldige invoer")
    public String email;
    @NotEmpty(message = "Is vereist")
    public String password;
}
