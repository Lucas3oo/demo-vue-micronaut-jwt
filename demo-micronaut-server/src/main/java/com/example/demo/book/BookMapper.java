package com.example.demo.book;

import org.mapstruct.Mapper;

@Mapper(componentModel = "jsr330")
public interface BookMapper {

  BookEntity convertToEntity(BookDto dto);

}
