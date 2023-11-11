package kbs.model;

import kbs.dto.FileDTO;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class FileTest {
    @BeforeEach
    void setUp() {

    }

    @AfterEach()
    void tearDown() {

    }

    @Test
    void testConstructorSetsPropertiesAsExpected() {
        long id = 1;
        String name = "name";
        String contentType = "contentType";
        long size = 1234;
        byte[] data = new byte[]{};

        File file = new File(
            id,
            name,
            contentType,
            size,
            data
        );

        assertEquals(id, file.getId());
        assertEquals(name, file.getName());
        assertEquals(contentType, file.getContentType());
        assertEquals(size, file.getSize());
        assertEquals(data, file.getData());
    }

    @Test
    void testSetsAndGetsPropertiesAsExpected() {
        long id = 1;
        String name = "name";
        String contentType = "contentType";
        long size = 1234;
        byte[] data = new byte[]{};

        File file = new File();
        file.setId(id);
        file.setName(name);
        file.setContentType(contentType);
        file.setSize(size);
        file.setData(data);

        assertEquals(id, file.getId());
        assertEquals(name, file.getName());
        assertEquals(contentType, file.getContentType());
        assertEquals(size, file.getSize());
        assertEquals(data, file.getData());
    }

    @Test
    void testFromDTOReturnsInstanceAsExpected() {
        FileDTO fileDTO = new FileDTO(
            (long) 1,
            "name",
            "contentType",
            (long) 1234,
            new byte[]{}
        );

        File file = File.fromDTO(fileDTO);
        assertEquals(fileDTO.id, file.getId());
        assertEquals(fileDTO.name, file.getName());
        assertEquals(fileDTO.contentType, file.getContentType());
        assertEquals(fileDTO.size, file.getSize());
        assertEquals(fileDTO.data, file.getData());
    }

    @Test
    void testFromMultipartFileReturnsInstanceAsExpected() throws IOException {
        MockMultipartFile mockMultipartFile = new MockMultipartFile(
            "file",
            "avatar.png",
            MediaType.TEXT_PLAIN_VALUE,
            "some image content".getBytes()
        );

        File file = File.fromMultipartFile(mockMultipartFile);
        assertEquals(mockMultipartFile.getName(), file.getName());
        assertEquals(mockMultipartFile.getContentType(), file.getContentType());
        assertEquals(mockMultipartFile.getSize(), file.getSize());
        assertEquals(mockMultipartFile.getBytes(), file.getData());
    }
}
