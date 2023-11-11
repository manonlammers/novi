package kbs.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import jakarta.validation.Valid;
import kbs.dto.CompanyDTO;
import kbs.model.Company;
import kbs.service.CompanyService;
import kbs.utils.BindingResultFieldErrorAdapter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("companies")
public class CompanyController {
    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getById(@PathVariable Long id) {
        Company company = companyService.findById(id);
        return new ResponseEntity<>(CompanyDTO.fromCompany(company), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Object> updateOrCreate(@Valid @RequestBody CompanyDTO companyDTO, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            GsonBuilder builder = new GsonBuilder();
            builder.registerTypeHierarchyAdapter(BindingResult.class, new BindingResultFieldErrorAdapter());
            builder.setPrettyPrinting();
            Gson gson = builder.create();
            return new ResponseEntity<>(gson.toJson(bindingResult), HttpStatus.BAD_REQUEST);
        }

        Company company = companyService.save(Company.fromDTO(companyDTO));
        return ResponseEntity.ok().body(CompanyDTO.fromCompany(company));
    }
}


