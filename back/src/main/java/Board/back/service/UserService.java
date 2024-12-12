package Board.back.service;

import Board.back.domain.User;
import Board.back.dto.LoginDto;

public interface UserService {
    User login(LoginDto loginDto);
    User join(User user);
}
