package kbs.dto;

import jakarta.validation.constraints.*;
import kbs.model.Company;
import org.springframework.util.StringUtils;

public class CompanyDTO {
    public Long id;

    @NotEmpty(message = "is required")
    public String name;

    @Email(message = "invalid")
    @NotEmpty(message = "is required")
    public String email;

    @NotEmpty(message = "is required")
    public String phone;

    @NotEmpty(message = "is required")
    public String address;

    @NotEmpty(message = "is required")
    public String zipCode;

    @NotEmpty(message = "is required")
    public String city;

    @NotNull(message = "is required")
    @Max(value = 2147483647, message = "invalid")
    public String kvkNumber;

    @NotNull(message = "is required")
    @Max(value = 2147483647, message = "invalid")
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
