package Board.back.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ErrorResponse {
    private int status;
    private String message;

    // 생성자, getters, setters

    public ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    // getters and setters
}
