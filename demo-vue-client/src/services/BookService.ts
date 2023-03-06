import { httpClient } from "@/services/HttpClient";
import type { ResponseData } from "@/services/HttpClient";

export interface BookDto {
  id?: string;
  description: string;
}

export class BookService {
  getAll(): Promise<ResponseData> {
    return httpClient.get("/books");
  }

  getById(id: string): Promise<ResponseData> {
    return httpClient.get(`/books/${id}`);
  }

  create(bookDto: BookDto): Promise<ResponseData> {
    return httpClient.post("/books", bookDto);
  }

  update(id: string, data: BookDto): Promise<ResponseData> {
    return httpClient.put(`/books/${id}`, data);
  }

  delete(id: string): Promise<ResponseData> {
    return httpClient.delete(`/books/${id}`);
  }

  getByQueryParams(description: string): Promise<ResponseData> {
    return httpClient.get(`/books?description=${description}`);
  }
}

export default new BookService();
