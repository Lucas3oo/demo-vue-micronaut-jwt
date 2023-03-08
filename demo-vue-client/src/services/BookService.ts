import type { App, Plugin } from "vue";
import type { ResponseData } from "@/services/HttpClient";
import type { AxiosInstance } from "axios";
import { bookService } from "@/services/ServiceNames";

export interface BookDto {
  id?: string;
  description: string;
}

export class BookService {
  readonly httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }
  getAll(): Promise<ResponseData> {
    return this.httpClient.get("/books");
  }

  getById(id: string): Promise<ResponseData> {
    return this.httpClient.get(`/books/${id}`);
  }

  create(bookDto: BookDto): Promise<ResponseData> {
    return this.httpClient.post("/books", bookDto);
  }

  update(id: string, data: BookDto): Promise<ResponseData> {
    return this.httpClient.put(`/books/${id}`, data);
  }

  delete(id: string): Promise<ResponseData> {
    return this.httpClient.delete(`/books/${id}`);
  }

  getByQueryParams(description: string): Promise<ResponseData> {
    return this.httpClient.get(`/books?description=${description}`);
  }
}

// The Install function used by Vue to register the plugin
export const BookServicePlugin: Plugin = {
  install(app: App, httpClient: AxiosInstance) {
    app.provide(bookService, new BookService(httpClient));
  },
};
