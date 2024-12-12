package Board.back.service;

import Board.back.domain.User;
import Board.back.dto.LoginDto;
import Board.back.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User login(LoginDto loginDto) {
        if ( userRepository.existsByIdAndPw(loginDto.getId(), loginDto.getPw()) ) {
            return userRepository.findById(loginDto.getId());
        }
        return null;
    }

    @Override
    public User join(User user) {
        if(userRepository.existsById(user.getId())) {
            return null;
        }
        userRepository.save(user);
        return user;
    }
}
