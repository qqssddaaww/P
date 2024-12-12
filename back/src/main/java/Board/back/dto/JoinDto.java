package Board.back.dto;

import Board.back.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JoinDto {
    private String id;
    private String pw;
    private String name;

    public User user (String id, String pw, String name) {
        return User.builder()
                .id(id)
                .pw(pw)
                .name(name)
                .build();
    }
}
