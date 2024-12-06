package Board.back.service;

import java.util.List;
import java.util.Optional;

import Board.back.domain.Board;

public interface BoardService {
	List<Board> getBoardList();
	
	Optional<Board> getOne(Long id);
	
	void save(Board board);
}
