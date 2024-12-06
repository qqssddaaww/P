package Board.back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import Board.back.domain.Board;
import Board.back.repository.BoardRepository;

@Service
public class BoardServiceImpl implements BoardService{
	
	private final BoardRepository boardRepository;

	BoardServiceImpl(BoardRepository boardRepository) {
		this.boardRepository = boardRepository;
	}
	
	@Override
	public List<Board> getBoardList() {
		List<Board> list = boardRepository.findAll();
		return list;
	}
	
	public Optional<Board> getOne(Long id) {
		return boardRepository.findById(id);
	}
	
	
	
	
	
}
