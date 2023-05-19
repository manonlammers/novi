//package kbs.service;
//
//import kbs.dto.UserDto;
//import kbs.exception.ResourceNotFoundException;
//import kbs.model.User;
//import kbs.repository.UserRepository;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserService {
//    private final UserRepository repository;
//
//    public UserService(UserRepository repository) {
//        this.repository = repository;
//    }
//
//    public Long createUser(UserDto udto) {
//        User user = new User();
//        user.setEmailAddress(udto.emailAddress);
//        user.setPassword(udto.password);
//
//        repository.save(user);
//
//        return user.getId();
//    }
//
//    public UserDto getUserById(Long id) {
//        User user = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
//
//        UserDto udto = new UserDto();
//        udto.id = user.getId();
//        udto.emailAddress = user.getEmailAddress();
//        udto.password = user.getPassword();
//
//        return udto;
//    }
//}
