package kbs.repository;

import org.springframework.data.repository.CrudRepository;

import javax.management.relation.Role;

public interface RoleRepository extends CrudRepository<Role, String> {
}
