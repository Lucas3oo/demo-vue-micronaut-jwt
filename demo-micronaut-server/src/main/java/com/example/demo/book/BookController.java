package com.example.demo.book;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.apache.commons.lang3.math.NumberUtils;
import org.hibernate.exception.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import io.micronaut.http.exceptions.HttpStatusException;
import io.micronaut.retry.annotation.Retryable;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.authentication.Authentication;
import io.micronaut.transaction.annotation.ReadOnly;
import io.micronaut.validation.Validated;

@Validated
@Controller("/api/v1/books")
public class BookController {

  private static final Logger sLogger = LoggerFactory.getLogger(BookController.class);

  @Inject
  private BookRepository mRepository;

  @Inject
  private BookMapper mMapper;

  @Post
  @Transactional
  @Secured("admin")
  @Retryable(attempts = "1", includes = ConstraintViolationException.class)
  public Long create(@Body @Valid BookDto book) {
    sLogger.debug("in add method");
    BookEntity entity = mMapper.createNewEntity(book);
    Long id = mRepository.save(entity).getId();

    return id;
  }

  // Using the syntax {?bookFilters*} we can assign request parameters
  // to a POJO, where the request parameter name matches a property
  // name in the POJO. The name must match the argument
  // name of our method, which is 'bookFilters' in our example.
  // The properties of the POJO can use the Validation API to
  // define constraints and those will be validated if we use
  // @Valid for the method argument and @Validated at the class level.
  // see https://docs.micronaut.io/latest/guide/#routing
  @Get("{?bookFilters*}")
  @ReadOnly
  @Secured({ "admin", "readonly" })
  public Optional<List<BookDto>> getByQueryParams(@Valid BookFilters bookFilters, Authentication principal) {
    sLogger.debug("in getByQueryParams method. Called by {} having roles {}", principal.getName(),
        principal.getRoles());

    // even if bookFilters is indeed optional the instance is created but with its properties set to null.
    if (bookFilters.getDescription() != null) {
      Optional<BookDto> book = mRepository.retrieveByDescription(bookFilters.getDescription());
      Optional<List<BookDto>> list = book.map(List::of);
      // empty Optional will be translated to 404
      return list;
    }
    else {
      return Optional.of(mRepository.retrieveAll());
    }
  }

  @Get("/{id}")
  @ReadOnly
  @Secured({ "admin", "readonly" })
  public Optional<BookDto> getById(@PathVariable Long id) {
    sLogger.debug("in getById method, id: {}", id);
    // empty Optional will be translated to 404
    return mRepository.retrieveById(id);
  }

  @Put("/{id}")
  @Transactional
  @Secured("admin")
  public void update(@PathVariable Long id, @Body @Valid BookDto book) {
    sLogger.debug("in update method, id: {}", id);
    if (!id.equals(NumberUtils.createLong(book.getId()))) {
      throw new HttpStatusException(HttpStatus.BAD_REQUEST, "Id in path and id in DTO are not the same.");
    }
    BookEntity entity = mRepository.findById(id)
        .orElseThrow(() -> new HttpStatusException(HttpStatus.NOT_FOUND, "Book with id '" + id + "' not found"));
    mMapper.updateEntity(book, entity);
  }

  @Delete("/{id}")
  @Transactional
  @Secured("admin")
  public void delete(@PathVariable Long id) {
    sLogger.debug("in delete method, id: {}", id);
    mRepository.deleteById(id);
  }

}
