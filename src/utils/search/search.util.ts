import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchUtil {
  getSearchQuery(query: string, fields: string[]) {
    if (!query) {
      return {};
    }

    const searchConditions = fields.map((field) => ({
      [field]: {
        contains: query,
      },
    }));

    return {
      OR: searchConditions,
    };
  }
}
