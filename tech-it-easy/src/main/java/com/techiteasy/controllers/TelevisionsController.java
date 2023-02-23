package com.techiteasy.controllers;

import com.techiteasy.models.Television;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("television")
public class TelevisionsController {
    private List<Television> televisions = new ArrayList<>();

    // TODO: move to bottom
    private Television findTelevisionByName(String name) {
        return televisions.stream().filter(t -> t.getName().equals(name)).findFirst().orElse(null);
    }

    @GetMapping("")
    public ResponseEntity<List<Television>> getAll() {
        return new ResponseEntity<>(televisions, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<Television> get(@PathVariable String name) {
        Television tv = findTelevisionByName(name);
        if (tv == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(tv, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Television> create(@RequestBody Television television) {
        televisions.add(television);
        return new ResponseEntity<>(television, HttpStatus.CREATED);
    }

    @PutMapping("")
    public ResponseEntity<Object> update(@RequestBody Television television) {
        int index = televisions.indexOf(television);
        Television tv = televisions.get(index);
        if (tv == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        televisions.set(index, television);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @DeleteMapping("")
    public ResponseEntity<Television> delete(@RequestParam String name) {
        Television tv = findTelevisionByName(name);
        if (tv == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        televisions.remove(tv);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}

