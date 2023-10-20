import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PoemService } from './poem.service';
import { Poem } from './schemas/poem.schema';
import { CreatePoemDto } from './DTO/create-poem.dto';
import { NotFoundError } from 'rxjs';
import { UpdatePoemDto } from './DTO/update-poem.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('poems')
export class PoemController {
    constructor(private poemService: PoemService) {}

    @Get()
    async getAllPoems(): Promise<Poem[]> {
        return this.poemService.findAll()
    }

    @Get(':id')
    async findPoemById(@Param('id') id: string): Promise<Poem> {
        const poem = await this.poemService.findById(id);

        if(!poem){
            throw new NotFoundException("Poem not found!")
        }

        return poem;

    }

    @Post('post')
    @UseGuards(AuthGuard())
    async createPoem(
        @Body()
        poem: CreatePoemDto,
        @Req()
        req,
        ): Promise<Poem> {
        return this.poemService.create(poem, req.user);
    }

    @Put(':id')
    async updatePoem(@Param('id') id: string, @Body() poem: UpdatePoemDto): Promise<Poem> {
        return this.poemService.updatePoemById(id, poem)
    }

    @Delete(':id')
    async deletePoem(@Param('id') id: string): Promise<Poem> {
        return this.poemService.deletePoemById(id)
    }
}
