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
	private String id;
	private String author;
	private String date;
	private Integer hits;
	
	public Board board(String title, String content,String id, String author,String date) {
		return Board.builder()
				.title(title)
				.content(content)
				.id(id)
				.author(author)
				.date(date)
				.hits(0)
				.build();
	}
}
