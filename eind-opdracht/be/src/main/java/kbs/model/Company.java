package kbs.model;

import jakarta.persistence.*;
import kbs.dto.CompanyDTO;

@Entity()
@Table(name = "Companies")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String phone;

    private String address;

    private String zipCode;

    private String city;

    private Integer kvkNumber;

    private Integer vatNumber;

    public Company() {

    }

    public Company(Long id) {
        this.id = id;
    }

    public Company(
            Long id,
            String name,
            String email,
            String phone,
            String address,
            String zipCode,
            String city,
            Integer kvkNumber,
            Integer vatNumber
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Integer getKvkNumber() {
        return kvkNumber;
    }

    public void setKvkNumber(Integer kvkNumber) {
        this.kvkNumber = kvkNumber;
    }

    public Integer getVatNumber() {
        return vatNumber;
    }

    public void setVatNumber(int vatNumber) {
        this.vatNumber = vatNumber;
    }

    public static Company fromDTO(CompanyDTO companyDTO) {
        return new Company(
                companyDTO.id,
                companyDTO.name,
                companyDTO.email,
                companyDTO.phone,
                companyDTO.address,
                companyDTO.zipCode,
                companyDTO.city,
                companyDTO.kvkNumber != null ? Integer.parseInt(companyDTO.kvkNumber) : null,
                companyDTO.vatNumber != null ? Integer.parseInt(companyDTO.vatNumber) : null
        );
    }
}
