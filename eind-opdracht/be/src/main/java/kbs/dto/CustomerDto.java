package kbs.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class CustomerDto {
    public Long id;

    @NotEmpty(message = "Name is required")
    public String name;
    @NotEmpty(message = "Treatment is required")
    public String treatment;
    @NotNull(message = "Minutes are required")
    public Integer minutes;
    @NotEmpty(message = "Pain is required")
    public String pain;
    @NotEmpty(message = "Information is required")
    public String info;
}
