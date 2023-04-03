import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'park3587rs',
    database: 'board-app',

    //엔티티를 이용하여 데이터베이스 테이블 생성
    //엔티티 파일이 어디 있는지 설정
    entities: [__dirname + '/../**/*.entity.{js,ts}'],

    //true -> 애플리케이션 재실행 시 엔티티안에서 수정된 컬럼의 길이, 타입, 변경값등을 해당 테이블 Drop후 다시 생성
    synchronize: true
}