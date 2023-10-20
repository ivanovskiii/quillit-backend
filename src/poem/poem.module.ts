import { Module } from '@nestjs/common';
import { PoemController } from './poem.controller';
import { PoemService } from './poem.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PoemSchema } from './schemas/poem.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: 'Poem', schema: PoemSchema}])
  ],
  controllers: [PoemController],
  providers: [PoemService]
})
export class PoemModule {}
