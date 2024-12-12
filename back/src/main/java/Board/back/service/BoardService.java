package Board.back.service;

import java.util.List;
import java.util.Optional;

import Board.back.domain.Board;
import Board.back.dto.BoardDto;
import Board.back.dto.ChangeDto;
import org.springframework.data.domain.Page;

public interface BoardService {
	List<Board> getBoardList();
	Board getOne(Long uid);
	void save(Board board);
	void delete(Long uid);
	void increaseHits(Long uid);
	Page<Board> boardPage(int page, int size);
	Board change(ChangeDto changeDto);
}
