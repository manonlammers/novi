package kbs.service;

import kbs.dto.UserDto;
import kbs.model.User;
import kbs.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public String createUser(UserDto udto) {
        User user = new User();
        user.setEmailAddress(udto.email);
        user.setPassword(udto.password);

        repository.save(user);

        return user.getEmailAddress();
    }
}
