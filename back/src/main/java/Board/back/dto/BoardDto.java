package Board.back.dto;

import Board.back.domain.Board;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BoardDto {
	private String title;
	private String content;
	private String author;
	private Integer hits;
	
	public Board board(String title, String content, String author) {
		return Board.builder()
				.content(content)
				.title(title)
				.author(author)
				.hits(0)
				.build();
	}
}
