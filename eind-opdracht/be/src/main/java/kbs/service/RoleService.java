package kbs.service;

import kbs.model.Role;
import kbs.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Optional<Role> findByRolename(String roleName) {
        return roleRepository.findByRolename(roleName);
    }
}
