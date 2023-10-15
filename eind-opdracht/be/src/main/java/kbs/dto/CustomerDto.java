package kbs.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import kbs.model.Customer;

public class CustomerDTO {
    public Long id;

    @NotNull(message = "Company ID is required")
    public Long companyId;

    @NotEmpty(message = "Name is required")
    public String name;

    @NotEmpty(message = "Treatment is required")
    public String treatment;

    @NotNull(message = "Minutes are required")
    @Max(value = 2147483647, message = "Invalid Minutes")
    public String minutes;

    @NotEmpty(message = "Pain is required")
    public String pain;

    @NotEmpty(message = "Information is required")
    public String info;

    public CustomerDTO(
            Long id,
            Long companyId,
            String name,
            String treatment,
            String minutes,
            String pain,
            String info
    ) {
        this.id = id;
        this.companyId = companyId;
        this.name = name;
        this.treatment = treatment;
        this.minutes = minutes;
        this.pain = pain;
        this.info = info;
    }

    public static CustomerDTO fromCustomer(Customer customer) {
        return new CustomerDTO(
                customer.getId(),
                customer.getCompany().getId(),
                customer.getName(),
                customer.getTreatment(),
                customer.getMinutes() != null ? customer.getMinutes().toString() : null,
                customer.getPain(),
                customer.getInfo()
        );
    }
}
