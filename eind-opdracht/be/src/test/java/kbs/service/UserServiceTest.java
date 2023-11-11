package kbs.service;


import kbs.model.File;
import kbs.model.User;
import kbs.repository.FileRepository;
import kbs.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    UserRepository userRepository;

    @Mock
    FileRepository fileRepository;

    @InjectMocks
    UserService userService;

    @Test
    void testGetUserById() {
        // Arrange
        User mockUser = new User((long) 1);
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(mockUser));

        // Act
        User user = userService.findById((long) 1).get();

        // Assert
        assertEquals(mockUser.getId(), user.getId());
    }

    @Test
    void testFindByEmail() {
        // Arrange
        User mockUser = new User((long) 1);
        mockUser.setEmail("email");
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(mockUser));

        // Act
        User user = userService.findByEmail("email").get();

        // Assert
        assertEquals(mockUser.getId(), user.getId());
    }

    @Test
    void testSaveUserAvatar() throws IOException {
        // Arrange
        User mockUser = new User((long) 1);
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(mockUser));

        MockMultipartFile mockAvatarFile = new MockMultipartFile(
            "file",
            "avatar.png",
            MediaType.TEXT_PLAIN_VALUE,
            "some image content".getBytes()
        );
        when(fileRepository.save(any())).thenReturn(File.fromMultipartFile(mockAvatarFile));

        // Act
        userService.saveUserAvatar(mockUser.getId(), mockAvatarFile);
        User user = userService.findById(mockUser.getId()).get();

        // Assert
        assertNotNull(user.getAvatar());
        assertEquals(user.getAvatar().getName(), mockAvatarFile.getName());
        assertEquals(user.getAvatar().getContentType(), mockAvatarFile.getContentType());
        assertEquals(user.getAvatar().getData(), mockAvatarFile.getBytes());
    }
}
