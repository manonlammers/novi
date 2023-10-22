package kbs.security;

import kbs.model.User;
import kbs.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;


public class MyUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public MyUserDetailsService(UserRepository repos) {
        this.userRepository = repos;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> ou = userRepository.findByEmail(username);
        if (ou.isPresent()) {
            return new MyUserDetails(ou.get());
        }

        throw new UsernameNotFoundException(username);
    }
}
