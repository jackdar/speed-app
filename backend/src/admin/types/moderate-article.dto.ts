import { UpdateModerationDto } from "../../article/dto/update-moderation.dto";

export interface ModerateArticleDto {
    articleId: string;
    moderationDetails: UpdateModerationDto
}
