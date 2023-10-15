package kbs.service;

import kbs.model.User;
import kbs.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public Optional<User> getUserByEmail(String email) {
        return repository.findByEmail(email);
    }

    public Optional<User> getById(Long id) {
        return repository.findById(id);
    }

    public User save(User user) {
        return repository.save(user);
    }
}
