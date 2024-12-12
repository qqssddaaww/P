package Board.back.repository;

import Board.back.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUid(Long uid);
    boolean existsByIdAndPw(String id, String pw);
    boolean existsById(String id);
    User findById(String id);
}
