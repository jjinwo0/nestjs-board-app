import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../boards-status.enum";

export class BoardStatusValidationPipe implements PipeTransform{
    
    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]
    transform(value: any, metatdata: ArgumentMetadata){
        value = value.toUpperCase();

        if(!this.isStatusValue(value)){
            throw new BadRequestException(`${value} isn't in the status options`);
        }

        return value;
    }

    private isStatusValue(status: any){
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}