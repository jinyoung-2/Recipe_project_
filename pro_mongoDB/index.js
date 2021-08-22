import express from 'express'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

import memoDB_Router from './db_memo.js' //라우터 불러오기 

dotenv.config();

//네트워크로 접속 = 무조건 비동기
(async () => {
  try {
    //mongoDB 접속
    const db_client = new MongoClient(process.env.MONGODB_URL)
    await db_client.connect()
    console.log('DB connection is ok');

    //express로 실행
    const app = express()
    app.use(express.json()) //json 미들웨어 등록, 바디파서 
    app.use('/api/v1/memo', memoDB_Router(db_client));  //라우터 등록 및 활성화 <- 접속 완료된 db객체를 파라미터로 넣어줌
    //유지보수를 위해 => /api/v1/memo로 조건 추가하기 


    //서버와 연결됐는지 검사 
    if (process.env.NODE_ENV === 'dev') {
      app.get('/hello', (req, res) => {
        res.json({ r: 'ok' })
      })
    }

    app.listen(process.env.PORT, () => {
      if (process.env.NODE_ENV === 'dev') {
        console.log(`server started at : ${process.env.PORT}`);
      }
    })
  }
  catch (e) {
    console.log(e);
  }
})();