package Board.back.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Board.back.domain.Board;
import Board.back.dto.BoardDto;
import Board.back.service.BoardService;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true", methods = {RequestMethod.GET, RequestMethod.POST})
public class MainController {
	
	public final BoardService boardService;

	public MainController(BoardService boardService) {
		this.boardService = boardService;
	}

	@GetMapping("/get-board")
	public ResponseEntity<List<Board>> getBoard() {
		List<Board> list = boardService.getBoardList();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/get-one")
	public ResponseEntity<Optional<Board>> one(@RequestParam Long id) {
		return ResponseEntity.ok(boardService.getOne(id));
	}
	
	@PostMapping("/save-content")
	public String save(@RequestBody BoardDto boardDto) {
		Board board = boardDto.board(boardDto.getTitle(), boardDto.getContent(), boardDto.getAuthor(),boardDto.getDate());
		boardService.save(board);
		return "작성완료";
	}
	@PostMapping("/delete-board")
	public String delete(Long id) {
		boardService.delete(id);
		return "삭제 완료";
	}

	@GetMapping("/increase-hits")
	public String increaseHits (Long id) {
		boardService.increaseHits(id);
		return "ok";
	}
}     