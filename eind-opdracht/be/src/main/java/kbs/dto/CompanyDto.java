package kbs.dto;

import jakarta.validation.constraints.*;
import kbs.model.Company;
import org.springframework.util.StringUtils;

public class CompanyDTO {
    public Long id;

    @NotEmpty(message = "Name is required")
    public String name;

    @Email(message = "Invalid email address")
    @NotEmpty(message = "Email address is required")
    public String email;

    @NotEmpty(message = "Phone number is required")
    public String phone;

    @NotEmpty(message = "Address is required")
    public String address;

    @NotEmpty(message = "Zip code is required")
    public String zipCode;

    @NotEmpty(message = "City is required")
    public String city;

    @NotNull(message = "KVK number is required")
    @Max(value = 2147483647, message = "Invalid KVK number")
    public String kvkNumber;

    @NotNull(message = "VAT number is required")
    @Max(value = 2147483647, message = "Invalid VAT number")
    public String vatNumber;

    private Boolean isConfigured;

    public Boolean getIsConfigured() {
        if (
            !StringUtils.hasText(this.name) ||
            !StringUtils.hasText(this.email) ||
            !StringUtils.hasText(this.phone) ||
            !StringUtils.hasText(this.address) ||
            !StringUtils.hasText(this.city) ||
            !StringUtils.hasText(this.kvkNumber) ||
            !StringUtils.hasText(this.vatNumber)
        ) {
            return false;
        }

        return true;
    }

    public CompanyDTO() {}

    public CompanyDTO(
            Long id,
            String name,
            String email,
            String phone,
            String address,
            String zipCode,
            String city,
            String kvkNumber,
            String vatNumber
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.zipCode = zipCode;
        this.city = city;
        this.kvkNumber = kvkNumber;
        this.vatNumber = vatNumber;
    }

    public static CompanyDTO fromCompany(Company company) {
        return new CompanyDTO(
                company.getId(),
                company.getName(),
                company.getEmail(),
                company.getPhone(),
                company.getAddress(),
                company.getZipCode(),
                company.getCity(),
                company.getKvkNumber() != null ? company.getKvkNumber().toString() : null,
                company.getVatNumber() != null ? company.getVatNumber().toString() : null
        );
    }
}
