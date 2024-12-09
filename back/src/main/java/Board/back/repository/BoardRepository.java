package Board.back.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import Board.back.domain.Board;

public interface BoardRepository extends JpaRepository<Board, Long>{
	Optional<Board> findById(Long id);
}
