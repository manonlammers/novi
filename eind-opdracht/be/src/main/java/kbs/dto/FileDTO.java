package kbs.dto;

import kbs.model.File;

public class FileDTO {
    public Long id;
    public String name;
    public String contentType;
    public Long size;
    public byte[] data;

    public FileDTO() {

    }

    public FileDTO(
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

    public static FileDTO fromFile(File file) {
        return new FileDTO(
            file.getId(),
            file.getName(),
            file.getContentType(),
            file.getSize(),
            file.getData()
        );
    }
}
