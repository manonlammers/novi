package kbs.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "companies")
public class Company {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String emailAddress;

    private String phoneNumber;

    private String address;

    private String zipCode;

    private String place;

    private Integer kvkNumber;

    private Integer btwNumber;

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

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
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

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public Integer getKvkNumber() {
        return kvkNumber;
    }

    public void setKvkNumber(Integer kvkNumber) {
        this.kvkNumber = kvkNumber;
    }

    public int getBtwNumber() {
        return btwNumber;
    }

    public void setBtwNumber(int btwNumber) {
        this.btwNumber = btwNumber;
    }
}
