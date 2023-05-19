//package kbs.security;
//
//import kbs.model.User;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//
//import javax.management.relation.Role;
//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.List;
//
//public class MyUserDetails {
//
//    private final User user;
//
//    public MyUserDetails(User user) {
//        this.user = user;
//    }
//
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        List<GrantedAuthority> authorities = new ArrayList<>();
//
//        for (Role role : user.getRoles()) {
//            authorities.add(new SimpleGrantedAuthority(role.getRolename()));
//        }
//
//        return authorities;
//    }
//
//    public String getPassword() {
//        return user.getPassword();
//    }
//
//    public String getEmail() {
//        return user.getEmailAddress();
//    }
//
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    public boolean isEnabled() {
//        return true;
//    }
//}
