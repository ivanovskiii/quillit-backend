import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps: true
})
export class User extends Document{
    @Prop()
    name: string;

    @Prop({ unique: [true, 'An account with this email already exists!']})
    email: string;

    @Prop({ unique: [true, 'An account with this username already exists!']})
    username: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);