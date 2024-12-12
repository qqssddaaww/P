package Board.back;

import Board.back.dto.BoardDto;
import Board.back.service.BoardService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackApplicationTests {

	@Autowired
	BoardService boardService;
	@Test
	void test() {
		String id = "jin";
		String date = "2024-12-12";
		String author = "우진";
		BoardDto boardDto = new BoardDto();
		for (int i = 0 ; i < 100; i ++) {
			this.boardService.save(boardDto.board(String.format("%d번째 제목 테스트",i), String.format("%d 번째 내용 테스트",i), id, author, date));
		}
		
				
	}

}
