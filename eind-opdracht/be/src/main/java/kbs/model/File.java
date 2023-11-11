package kbs.model;

import jakarta.persistence.*;
import kbs.dto.FileDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Entity
@Table(name = "files")
public class File {
    @Id
    @GeneratedValue(generator = "uuid")
    private Long id;

    private String name;

    private String contentType;

    private Long size;

    private byte[] data;

    public File() {

    }

    public File(
        Long id,
        String name,
        String contentType,
        Long size,
        byte[] data
    ) {
        this.id = id;
        this.name = name;
        this.contentType = contentType;
        this.size = size;
        this.data = data;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public static File fromDTO(FileDTO fileDTO) {
        return new File(
            fileDTO.id,
            fileDTO.name,
            fileDTO.contentType,
            fileDTO.size,
            fileDTO.data
        );
    }

    public static File fromMultipartFile(MultipartFile multipartFile) throws IOException {
        File file = new File();
        file.setName(multipartFile.getName());
        file.setContentType(multipartFile.getContentType());
        file.setSize(multipartFile.getSize());
        file.setData(multipartFile.getBytes());
        return file;
    }
}
