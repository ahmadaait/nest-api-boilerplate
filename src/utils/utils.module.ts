import { Global, Module } from '@nestjs/common';
import { PaginationUtil } from './pagination/pagination.util';
import { ResponseUtil } from './response/response.util';
import { SearchUtil } from './search/search.util';
import { UtilsService } from './utils.service';

@Global()
@Module({
  providers: [UtilsService, ResponseUtil, PaginationUtil, SearchUtil],
  exports: [UtilsService, ResponseUtil, PaginationUtil, SearchUtil],
})
export class UtilsModule {}
