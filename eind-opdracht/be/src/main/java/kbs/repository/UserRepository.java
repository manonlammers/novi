package kbs.repository;

import kbs.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository <User, String> {
}
