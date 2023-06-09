import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: BoardRepository
  ){}

  // getAllBoards() {
  //   return this.boards;
  // }

  // createBoard(createBoardDto: CreateBoardDto): Board {
  //   const {title, description} = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };

  //   this.boards.push(board);
  //   return board
  // }
    async getAllBoard(): Promise<Board[]>{
      return this.boardRepository.find();
    }


    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
      return this.boardRepository.createBoard(createBoardDto);
    }

  // getBoardById(id: string): Board{
  //   const found = this.boards.find((board) => board.id === id);
  //   if(!found){
  //     throw new NotFoundException(`Can't find Board with id: ${id}`);
  //   }
  //   return found;
  // }

    async getBoardById(id: number): Promise<Board> {
      const found = await this.boardRepository.findOne(id);

      if(!found){
        throw new NotFoundException(`Can't find Board with id: ${id}`);
      }

      return found;
    }

  // deleteBoard(id: string): void{
  //   const found = this.getBoardById(id); //해당 메서드에서 확인해주기 때문에 특별한 작업 필요 없음.
  //   this.boards = this.boards.filter((board) => board.id !== id);
  // }
  
  async deleteBoard(id: number): Promise<void>{
    const result = await this.boardRepository.delete(id);

    if(result.affected === 0){
      throw new NotFoundException(`Can't find Board with id: ${id}`);
    }
  }

  // updateBoardStatus(id: string, status: BoardStatus): Board{
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board>{
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}
