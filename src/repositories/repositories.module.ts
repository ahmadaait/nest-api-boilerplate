import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RepositoriesService } from './repositories.service';
import { UserRepository } from './repository/user-repository';

const repos = [RepositoriesService, UserRepository];

@Global()
@Module({
  imports: [PrismaModule],
  providers: [...repos],
  exports: [...repos],
})
export class RepositoriesModule {}
