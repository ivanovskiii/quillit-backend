import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";


@Schema({
    timestamps: true
})
export class Poem{

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: User;

    @Prop()
    likedBy: [string];

}

export const PoemSchema = SchemaFactory.createForClass(Poem)