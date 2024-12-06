package Board.back.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
	
	
	@GetMapping("/getBoard")
	public ResponseEntity<List<Board>> getBoard() {
		List<Board> list = boardService.getBoardList();
		for(Board board : list) {
			System.out.println(board.getId());
			System.out.println(board.getTitle());
			System.out.println(board.getContent());
            System.out.println("-------------------");
		}
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/get")
	public ResponseEntity<Optional<Board>> one(Long id) {
		return ResponseEntity.ok(boardService.getOne(id));
	}
	
	@PostMapping("/save-content")
	public String save(@RequestBody BoardDto boardDto) {
		System.out.println(boardDto.getAuthor());
		System.out.println(boardDto.getContent());
		System.out.println(boardDto.getTitle());
		Board board = boardDto.board(boardDto.getTitle(), boardDto.getContent(), boardDto.getAuthor());
		boardService.save(board);
		return "작성완료";
	}
}     