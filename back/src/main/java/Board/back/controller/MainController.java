package Board.back.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import Board.back.domain.User;
import Board.back.dto.ChangeDto;
import Board.back.dto.JoinDto;
import Board.back.dto.LoginDto;
import Board.back.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
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
	private final HttpServletRequest request;
	public final BoardService boardService;
	public final UserService userService;

	public MainController(BoardService boardService, HttpServletRequest request, UserService userService) {
		this.request = request;
		this.boardService = boardService;
		this.userService = userService;
	}


	@GetMapping("/get-board")
	public ResponseEntity<List<Board>> getBoard() {
		List<Board> list = boardService.getBoardList();
		return ResponseEntity.ok(list);
	}

	@GetMapping("/page-board")
	public ResponseEntity<List<Board>> getBoard(@RequestParam(defaultValue = "0") int page, @RequestParam int size) {
		Page<Board> boardPage = boardService.boardPage(page, size);
		return ResponseEntity.ok(boardPage.getContent());
	}
	
	@GetMapping("/get-one")
	public ResponseEntity<Board> one(Long uid) {
		return ResponseEntity.ok(boardService.getOne(uid));
	}
	
	@PostMapping("/save-content")
	public void save(@RequestBody BoardDto boardDto) {
		Board board = boardDto.board(boardDto.getTitle(), boardDto.getContent(),boardDto.getId(), boardDto.getAuthor(),boardDto.getDate());
		boardService.save(board);
	}
	@PostMapping("/delete-board")
	public String delete(Long uid) {
		boardService.delete(uid);
		return "삭제 완료";
	}

	@GetMapping("/increase-hits")
	public String increaseHits (Long uid) {
		boardService.increaseHits(uid);
		return "ok";
	}
	@PostMapping("/change-board")
	public ResponseEntity<Board> changeBoard(@RequestBody ChangeDto changeDto) {
		Board board = boardService.change(changeDto);
		return ResponseEntity.ok(board);
	}
	@PostMapping("login")
	public ResponseEntity<Map<String, String>> login (@RequestBody LoginDto loginDto) {
		HttpSession session = request.getSession();
		User user = userService.login(loginDto);
		Map<String, String> value = new HashMap<>();

		if (user != null) {
			session.setAttribute("id", user.getId());
			session.setAttribute("name", user.getName());

			value.put("id", (String)session.getAttribute("id"));
			value.put("name", (String)session.getAttribute("name"));
			return ResponseEntity.ok(value);
		}

		return null;
	}
	@GetMapping("/logout")
	public void logout() {
		HttpSession session = request.getSession();
		session.removeAttribute("id");
		session.removeAttribute("name");

	}

	@PostMapping("/join")
	public ResponseEntity<User> join (@RequestBody JoinDto joinDto) {
		User user = joinDto.user(joinDto.getId(), joinDto.getPw(), joinDto.getName());
		User joinUser = userService.join(user);
		if ( joinUser == null ) {
			return null;
		}
		return ResponseEntity.status(200).body(user);
	}

}     