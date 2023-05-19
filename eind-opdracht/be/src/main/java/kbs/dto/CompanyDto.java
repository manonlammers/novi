package kbs.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class CompanyDto {
    public Long id;

    @NotEmpty(message = "Name is required")
    public String name;
    @Email(message = "e-mailadress is invalid")
    @NotEmpty(message = "e-mailadress is required")
    public String emailAddress;
    @NotEmpty(message = "Phone number is required")
    public String phoneNumber;
    @NotEmpty(message = "Address is required")
    public String address;
    @NotEmpty(message = "Zipcode is required")
    public String zipCode;
    @NotEmpty(message = "city is required")
    public String city;
    @NotNull(message = "Kvk Number is required")
    public Integer kvkNumber;
    @NotNull(message = "Btw Number is required")
    public Integer btwNumber;
}
