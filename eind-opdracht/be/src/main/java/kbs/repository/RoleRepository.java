package kbs.repository;

import kbs.model.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RoleRepository extends CrudRepository<Role, String> {
    Optional<Role> findByRolename(String roleName);
}
