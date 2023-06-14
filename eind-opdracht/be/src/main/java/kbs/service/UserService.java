package kbs.service;

import kbs.dto.UserDto;
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
        return repository.findById(email);
    }

//    public Optional<User> getUserByEmailAndPassword(String email, String password) {
//        Optional<User> user = repository.findById(email);
//
//        if (user.isEmpty()) {
//            return user;
//        }
//
//        if (!user.get().getPassword().equals(password)) {
//
//        }
//    }

    public String createUser(UserDto udto) {
        User user = new User();
        user.setEmailAddress(udto.email);
        user.setPassword(udto.password);

        repository.save(user);

        return user.getEmailAddress();
    }
}
