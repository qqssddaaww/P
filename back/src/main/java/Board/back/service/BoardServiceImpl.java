package Board.back.service;

import java.util.List;
import java.util.Optional;

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
		jdbcTemplate.execute("UPDATE board SET id = @COUNT:=@COUNT+1;");
	}
	@Override
	public List<Board> getBoardList() {
		List<Board> list = boardRepository.findAll(Sort.by(Sort.Order.desc("id")));
		return list;
	}
	
	public Optional<Board> getOne(Long id) {
		return boardRepository.findById(id);
	}
	
	public void save(Board board) {
		boardRepository.save(board);
		autoClear();
	}
	
	public void delete(Long id) {
		boardRepository.deleteById(id);
		autoClear();
	}
	public void increaseHits(Long id) {
		Optional<Board> board = getOne(id);
		board.get().setHits(board.get().getHits() + 1);
		save(board.get());
	}

	
}
