import { IsEmpty } from "class-validator"
import { User } from "src/auth/schemas/user.schema"

export class UpdatePoemDto {
    readonly title: string

    readonly content: string

    @IsEmpty({ message: "You cannot pass user id" })
    readonly author: User

    readonly likedBy: [string]
}