package kbs.model;

import jakarta.persistence.*;
import kbs.dto.UserDTO;

import java.util.Collection;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    private Company company;

    @OneToOne(
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    private File avatar;

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles;

    private String email;

    private String password;

    public User() {

    }

    public User(Long id) {
        this.id = id;
    }

    public User(
            Long id,
            Company company,
            File avatar,
            String email,
            String password
    ) {
        this.id = id;
        this.company = company;
        this.avatar = avatar;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public File getAvatar() {
        return avatar;
    }

    public void setAvatar(File avatar) {
        this.avatar = avatar;
    }

    public static User fromDTO(UserDTO userDTO) {
        return new User(
            userDTO.id,
            userDTO.company != null ? Company.fromDTO(userDTO.company) : null,
            userDTO.avatar != null ? File.fromDTO(userDTO.avatar) : null,
            userDTO.email,
            userDTO.password
        );
    }
}
