import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationUtil {
  getPagination(page: number, limit: number) {
    const offset = (page - 1) * limit;
    return { offset, limit };
  }
}
