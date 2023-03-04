import http from "@/services/HttpClient";

export interface BookDto {
  id: string;
  description: string;
}

export class BookService {
  getAll(): Promise<any> {
    return http.get("/books");
  }

  getById(id: string): Promise<any> {
    return http.get(`/books/${id}`);
  }

  create(bookDto: BookDto): Promise<any> {
    return http.post("/books", bookDto);
  }

  update(id: string, data: BookDto): Promise<any> {
    return http.put(`/books/${id}`, data);
  }

  delete(id: string): Promise<any> {
    return http.delete(`/books/${id}`);
  }

  getByQueryParams(description: string): Promise<any> {
    return http.get(`/books?description=${description}`);
  }
}

export default new BookService();
