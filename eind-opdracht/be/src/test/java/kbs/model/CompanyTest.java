package kbs.model;

import kbs.dto.CompanyDTO;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CompanyTest {
    @BeforeEach
    void setUp() {

    }

    @AfterEach()
    void tearDown() {

    }

    @Test
    void testConstructorSetsPropertiesAsExpected() {
        long id = 1;
        String name = "name";
        String email = "email";
        String phone = "phone";
        String address = "address";
        String zipCode = "zipCode";
        String city = "city";
        int kvkNumber = 1234;
        int vatNumber = 4567;

        Company company = new Company(
            id,
            name,
            email,
            phone,
            address,
            zipCode,
            city,
            kvkNumber,
            vatNumber
        );

        assertEquals(id, company.getId());
        assertEquals(name, company.getName());
        assertEquals(email, company.getEmail());
        assertEquals(phone, company.getPhone());
        assertEquals(address, company.getAddress());
        assertEquals(zipCode, company.getZipCode());
        assertEquals(city, company.getCity());
        assertEquals(kvkNumber, company.getKvkNumber());
        assertEquals(vatNumber, company.getVatNumber());
    }

    @Test
    void testSetsAndGetsPropertiesAsExpected() {
        long id = 1;
        String name = "name";
        String email = "email";
        String phone = "phone";
        String address = "address";
        String zipCode = "zipCode";
        String city = "city";
        int kvkNumber = 1234;
        int vatNumber = 4567;

        Company company = new Company();
        company.setId(id);
        company.setName(name);
        company.setEmail(email);
        company.setPhone(phone);
        company.setAddress(address);
        company.setZipCode(zipCode);
        company.setCity(city);
        company.setKvkNumber(kvkNumber);
        company.setVatNumber(vatNumber);

        assertEquals(id, company.getId());
        assertEquals(name, company.getName());
        assertEquals(email, company.getEmail());
        assertEquals(phone, company.getPhone());
        assertEquals(address, company.getAddress());
        assertEquals(zipCode, company.getZipCode());
        assertEquals(city, company.getCity());
        assertEquals(kvkNumber, company.getKvkNumber());
        assertEquals(vatNumber, company.getVatNumber());
    }

    @Test
    void testFromDTOReturnsInstanceAsExpected() {
        CompanyDTO companyDTO = new CompanyDTO(
            (long) 1,
            "name",
            "email",
            "phone",
            "address",
            "zipCode",
            "city",
            "1234",
            "5678"
        );

        Company company = Company.fromDTO(companyDTO);
        assertEquals(companyDTO.id, company.getId());
        assertEquals(companyDTO.name, company.getName());
        assertEquals(companyDTO.email, company.getEmail());
        assertEquals(companyDTO.phone, company.getPhone());
        assertEquals(companyDTO.address, company.getAddress());
        assertEquals(companyDTO.city, company.getCity());
        assertEquals(companyDTO.kvkNumber, company.getKvkNumber().toString());
        assertEquals(companyDTO.vatNumber, company.getVatNumber().toString());
    }
}
