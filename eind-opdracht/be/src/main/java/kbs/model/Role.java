package kbs.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Collection;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    private String rolename;

    private Collection<User> users;

    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename;
    }
}
