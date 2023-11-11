package kbs.service;


import kbs.model.Company;
import kbs.repository.CompanyRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CompanyServiceTest {
    @Mock
    CompanyRepository companyRepository;

    @InjectMocks
    CompanyService companyService;

    @Test
    void testFindUserById() {
        // Arrange
        Company mockCompany = new Company((long) 1);
        when(companyRepository.findById(anyLong())).thenReturn(Optional.of(mockCompany));

        // Act
        Company company = companyService.findById(mockCompany.getId());

        // Assert
        assertEquals(mockCompany.getId(), company.getId());
    }

    @Test
    void testSave() {
        // Arrange
        Company mockCompany = new Company((long) 1);
        mockCompany.setName("name");
        mockCompany.setCity("email");
        mockCompany.setPhone("phone");
        when(companyRepository.save(any())).thenReturn(mockCompany);

        // Act
        Company company = companyService.save(mockCompany);

        // Assert
        assertEquals(mockCompany.getId(), company.getId());
        assertEquals(mockCompany.getName(), company.getName());
        assertEquals(mockCompany.getEmail(), company.getEmail());
        assertEquals(mockCompany.getPhone(), company.getPhone());
    }
}
