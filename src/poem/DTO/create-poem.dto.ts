import { IsEmpty, IsNotEmpty, IsNotEmptyObject, IsString } from "class-validator"
import { User } from "src/auth/schemas/user.schema"

export class CreatePoemDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string

    @IsNotEmpty()
    @IsString()
    readonly content: string

    @IsEmpty({ message: "You cannot pass user id" })
    readonly author: User

    @IsEmpty()
    readonly likedBy: [string]
}