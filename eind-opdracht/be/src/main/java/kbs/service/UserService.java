package kbs.service;

import kbs.exception.ResourceNotFoundException;
import kbs.model.File;
import kbs.model.User;
import kbs.repository.FileRepository;
import kbs.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final FileRepository fileRepository;

    public UserService(UserRepository userRepository, FileRepository fileRepository) {
        this.userRepository = userRepository;
        this.fileRepository = fileRepository;
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getById(Long id) {
        return userRepository.findById(id);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public void saveUserAvatar(Long id, MultipartFile multipartFile) throws IOException {
        User user = getById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        File avatar = File.fromMultipartFile(multipartFile);
        File userAvatar = fileRepository.save(avatar);
        user.setAvatar(userAvatar);
        save(user);
    }
}
