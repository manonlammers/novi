package kbs.model;

import jakarta.persistence.*;
import kbs.dto.CustomerDTO;

@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.DETACH)
    private Company company;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    private String name;
    private String treatment;
    private Integer minutes;
    private String pain;
    private String info;

    public Customer() {

    }

    public Customer(
            Long id,
            String name,
            String treatment,
            Integer minutes,
            String pain,
            String info
    ) {
        this.id = id;
        this.name = name;
        this.treatment = treatment;
        this.minutes = minutes;
        this.pain = pain;
        this.info = info;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTreatment() {
        return treatment;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }

    public Integer getMinutes() {
        return minutes;
    }

    public void setMinutes(Integer minutes) {
        this.minutes = minutes;
    }

    public String getPain() {
        return pain;
    }

    public void setPain(String pain) {
        this.pain = pain;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public static Customer fromDTO(CustomerDTO customerDTO) {
        return new Customer(
                customerDTO.id,
                customerDTO.name,
                customerDTO.treatment,
                customerDTO.minutes != null ? Integer.parseInt(customerDTO.minutes) : null,
                customerDTO.pain,
                customerDTO.info
        );
    }
}
