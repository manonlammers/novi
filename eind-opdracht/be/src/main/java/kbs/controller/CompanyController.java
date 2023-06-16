package kbs.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import jakarta.validation.Valid;
import kbs.dto.CompanyDto;
import kbs.model.Company;
import kbs.service.CompanyService;
import kbs.utils.BindingResultFieldErrorAdapter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("companies")
public class CompanyController {
    private final CompanyService service;

    public CompanyController(CompanyService service) {
        this.service = service;
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<Company> getCompany(@PathVariable Long id) {
        Company company = service.getCompanyById(id);

        return ResponseEntity.ok(company);
    }

    @PostMapping
    public ResponseEntity<Object> createCompany(@Valid @RequestBody CompanyDto cdto, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            GsonBuilder builder = new GsonBuilder();
            builder.registerTypeHierarchyAdapter(BindingResult.class, new BindingResultFieldErrorAdapter());
            builder.setPrettyPrinting();
            Gson gson = builder.create();
            return new ResponseEntity<>(gson.toJson(bindingResult), HttpStatus.BAD_REQUEST);
        }

        Long id = service.createCompany(cdto);
        cdto.id = id;

        URI uri = URI.create(ServletUriComponentsBuilder
                .fromCurrentRequest().path("/" + id)
                .toUriString());

        return ResponseEntity.created(uri).body(cdto);
    }
}

