package kbs.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class CompanyDto {
    public Long id;

    @NotEmpty(message = "Name is required")
    public String name;

    @Email(message = "Invalid email address")
    @NotEmpty(message = "Email address is required")
    public String email;

    @NotEmpty(message = "Phone number is required")
    public String phoneNumber;

    @NotEmpty(message = "Address is required")
    public String address;

    @NotEmpty(message = "Zip code is required")
    public String zipCode;

    @NotEmpty(message = "City is required")
    public String city;

    @NotNull(message = "KVK number is required")
    public Integer kvkNumber;

    @NotNull(message = "VAT number is required")
    public Integer vatNumber;
}
