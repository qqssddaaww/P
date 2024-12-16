package Board.back.service;

import java.util.List;
import java.util.Optional;

import Board.back.dto.ChangeDto;
import Board.back.exception.BoardNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import Board.back.domain.Board;
import Board.back.repository.BoardRepository;

@Service
public class BoardServiceImpl implements BoardService{
	
	private final BoardRepository boardRepository;
	public final JdbcTemplate jdbcTemplate;
	BoardServiceImpl(BoardRepository boardRepository, JdbcTemplate jdbcTemplate) {
		this.boardRepository = boardRepository;
		this.jdbcTemplate = jdbcTemplate;
	}
	public void autoClear () {
		jdbcTemplate.execute("ALTER TABLE board AUTO_INCREMENT=1;");
		jdbcTemplate.execute("SET @COUNT = 0;");
		jdbcTemplate.execute("UPDATE board SET uid = @COUNT:=@COUNT+1;");
	}
	@Override
	public List<Board> getBoardList() {
		List<Board> list = boardRepository.findAll(Sort.by(Sort.Order.desc("uid")));
		if (list == null) {
			throw new BoardNotFoundException("Board not found");
		}
		return list;
	}
	
	public Board getOne(Long uid) {
		Board board = boardRepository.findByUid(uid);
		if (board == null) {
			throw new BoardNotFoundException("Board not found with id : " + uid);
		}
		return board;
	}
	
	public void save(Board board) {
		boardRepository.save(board);
		autoClear();
	}
	
	public void delete(Long uid) {
		boardRepository.deleteById(uid);
		autoClear();
	}
	public void increaseHits(Long uid) {
		Board board = getOne(uid);
		if (board == null) {
			throw new BoardNotFoundException("Board not found with id : " + uid);
		}
		board.setHits(board.getHits() + 1);
		save(board);
	}

	@Override
	public Page<Board> boardPage(int page, int size) {
		Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("uid")));
		Page<Board> boardPage = boardRepository.findAll(pageable);
		if (boardPage == null) {
			throw new BoardNotFoundException("Board not found");
		}
		return boardPage;
	}

	@Override
	public Board change(ChangeDto changeDto) {
		Board board = getOne(changeDto.getUid());
		if (board == null) {
			throw new BoardNotFoundException("Board not found with id : " + changeDto.getUid());
		}
		Board changeBoard = board;
		changeBoard.setDate(changeDto.getDate());
		changeBoard.setTitle(changeDto.getTitle());
		changeBoard.setContent(changeDto.getContent());
		save(changeBoard);

		return changeBoard;
	}
}
