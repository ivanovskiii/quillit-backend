import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Poem } from './schemas/poem.schema';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class PoemService {
    constructor(
        @InjectModel(Poem.name)
        private poemModel: mongoose.Model<Poem>,
    ) {}

    async findAll(): Promise<Poem[]>{
        const poems = await this.poemModel.find();
        return poems;
    }

    async create(poem: Poem, user: User): Promise<Poem> {
        const data = Object.assign(poem, { author: user._id })
        const res = await this.poemModel.create(data)
        return res
    }

    async findById(id: string): Promise<Poem> {
        const poem = await this.poemModel.findById(id)
        return poem
    }

    async updatePoemById(id: string, poem: Poem): Promise<Poem> {
        return await this.poemModel.findByIdAndUpdate(id, poem, {
            new: true,
            runValidators: true,
        });
    }

    async deletePoemById(id: string): Promise<Poem> {
        return await this.poemModel.findByIdAndDelete(id);
    }
}
