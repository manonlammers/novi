package kbs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kbs.dto.CompanyDTO;
import kbs.model.Company;
import kbs.security.JwtService;
import kbs.service.CompanyService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@WebMvcTest(CompanyController.class)
@ActiveProfiles("test")
@AutoConfigureMockMvc(addFilters = false)
public class CompanyControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    JwtService jwtService;

    @MockBean
    CompanyService companyService;

    @Test
    @WithMockUser(username="testuser", roles="USER")
    void testGetsCompanyById() throws Exception {
        Company company = new Company((long) 1);
        company.setName("name");
        company.setAddress("address");

        when(companyService.findById(company.getId())).thenReturn(company);

        this.mockMvc
            .perform(MockMvcRequestBuilders.get("/companies/" + company.getId()))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.name", is(company.getName())))
            .andExpect(MockMvcResultMatchers.jsonPath("$.address", is(company.getAddress())));
    }

    @Test
    @WithMockUser(username="testuser", roles="USER")
    void testCreateValidatesInput() throws Exception {
        CompanyDTO companyDTO = new CompanyDTO();

        when(companyService.save(any())).thenReturn(Company.fromDTO(companyDTO));

        this.mockMvc
            .perform(MockMvcRequestBuilders.post("/companies")
                .content(objectMapper.writeValueAsString(companyDTO))
                .contentType(MediaType.APPLICATION_JSON)
            )
            .andExpect(MockMvcResultMatchers.status().isBadRequest())
            .andExpect(MockMvcResultMatchers.jsonPath("$.name", is("is required")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.email", is("is required")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.address", is("is required")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.zipCode", is("is required")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.city", is("is required")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.kvkNumber", is("is required")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.vatNumber", is("is required")));
    }

    @Test
    @WithMockUser(username="testuser", roles="USER")
    void testCreateNewCompany() throws Exception {
        CompanyDTO companyDTO = new CompanyDTO();
        companyDTO.name = "name";
        companyDTO.email = "company@mail.com";
        companyDTO.phone = "phone";
        companyDTO.address = "address";
        companyDTO.zipCode = "zipCode";
        companyDTO.city = "city";
        companyDTO.kvkNumber = "1234";
        companyDTO.vatNumber = "5678";

        when(companyService.save(any())).thenReturn(Company.fromDTO(companyDTO));

        this.mockMvc
            .perform(MockMvcRequestBuilders.post("/companies")
                .content(objectMapper.writeValueAsString(companyDTO))
                .contentType(MediaType.APPLICATION_JSON)
            )
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.name", is(companyDTO.name)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.email", is(companyDTO.email)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.address", is(companyDTO.address)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.zipCode", is(companyDTO.zipCode)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.city", is(companyDTO.city)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.kvkNumber", is(companyDTO.kvkNumber)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.vatNumber", is(companyDTO.vatNumber)));
    }
}
