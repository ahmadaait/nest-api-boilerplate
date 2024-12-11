import { Injectable, Logger } from '@nestjs/common';
import { PaginationUtil } from './pagination/pagination.util';
import { ResponseUtil } from './response/response.util';
import { SearchUtil } from './search/search.util';

@Injectable()
export class UtilsService {
  constructor(
    private _response: ResponseUtil,
    private _pagination: PaginationUtil,
    private _search: SearchUtil,
  ) {}

  /**
   * Logger
   * @param name
   * @returns
   */
  logger(name: any) {
    return new Logger(name);
  }

  /**
   * Response
   */
  get response() {
    return this._response;
  }

  pagination(page: number, limit: number) {
    return this._pagination.getPagination(page, limit);
  }

  search(search: any, fields: string[]) {
    return this._search.getSearchQuery(search, fields);
  }
}
