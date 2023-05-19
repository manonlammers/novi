package kbs.controller;

import jakarta.validation.Valid;
import kbs.dto.CompanyDto;
import kbs.service.CompanyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
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
    public ResponseEntity<CompanyDto> getCompany(@PathVariable Long id) {
        CompanyDto cdto = service.getCompanyById(id);

        return ResponseEntity.ok(cdto);
    }

    @PostMapping
    public ResponseEntity<Object> createCompany(@Valid @RequestBody CompanyDto cdto, BindingResult bindingResult) {

        if (bindingResult.hasFieldErrors()) {
//            Gson gson = new Gson();
//            return new ResponseEntity<>(gson.toJson(bindingResult.getFieldErrors()), HttpStatus.BAD_REQUEST);
            StringBuilder sb = new StringBuilder();
            for (FieldError fe : bindingResult.getFieldErrors()) {
                sb.append(fe.getField()).append(": ");
                sb.append(fe.getDefaultMessage()).append("\n");
            }
            return new ResponseEntity<>(sb.toString(), HttpStatus.BAD_REQUEST);
        }
        Long id = service.createCompany(cdto);
        cdto.id = id;

        URI uri = URI.create(ServletUriComponentsBuilder
                .fromCurrentRequest().path("/" + id).toUriString());

        return ResponseEntity.created(uri).body(cdto);
    }
}

