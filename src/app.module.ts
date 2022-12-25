import { Global, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ProjectsModule } from './projects/projects.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  providers: [PrismaModule],
  imports: [UsersModule, PostsModule, ProjectsModule, CategoriesModule],
})
export class AppModule {}
