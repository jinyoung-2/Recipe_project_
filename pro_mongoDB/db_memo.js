//라우터 
import express from 'express'
import { ObjectId } from 'mongodb'
const router = express.Router()

//외부에사 사용하기 위해 db객체를 넘겨 받아야 함 
export default (db_client) => {
  //미들웨어
  router.use('/', (req, res, next) => {
    console.log(`allow CORS : ${req.originalUrl}`);
    res.set('Access-Control-Allow-Origin', '*'); //cors 전체 허용
    res.set('Access-Control-Allow-Methods', '*');
    res.set("Access-Control-Allow-Headers", "*");
    next();
  })

  //mongoDB 데이터 추가(데이터 생성): post -> 먼저 DB를 가져와야 함
  router.post('/insert', async (req, res) => {
    try {
      //DB 가져오기
      const database = db_client.db('node_study');
      const memo = database.collection('memo');
      console.log(req.body);

      //데이터 추가 
      let _res = await memo.insertOne(req.body);
      res.json({ r: 'ok', d: _res })
    }
    catch (e) {
      res.json({ r: 'err', err: e });
    }
  });

  //mongoDB 데이터 리스트 불러오기 
  //조건식 - skip/:skip/limit/:limit => 방대한 데이터를 불러오는걸 방지하기 위한 코드로, params를 이용한다!
  router.get('/find/skip/:skip/limit/:limit', async (req, res) => {
    try {
      console.log(req.params);
      const database = db_client.db('node_study');
      const memo = database.collection('memo');

      let cursor = await memo.find()
        .skip(parseInt(req.params.skip))
        .limit(parseInt(req.params.limit))

      let items = await cursor.toArray();

      res.json({ r: 'ok', d: items });

    }
    catch (e) {
      res.json({ r: 'err', err: e });
    }
  });

  //mongoDB 데이터 삭제 
  //조건식 - id/:id로 ObjectId로 데이터 삭제하기 
  router.get('/delete/id/:id', async (req, res) => {
    try {
      const database = db_client.db('node_study');
      const memo = database.collection('memo');

      //deleteOne(조건식)에서 조건식에 id를 직접 넣어줄 수 없고, 변환을 해줘야 함! 다른 조건과 달리 id값만 특수적으로 변환을 해줘야 함 =>  _id: new ObjectId(req.params.id) 
      let _res = await memo.deleteOne({ _id: new ObjectId(req.params.id) })

      res.json({ r: 'ok', d: _res });   //결과값 반환      
    }
    catch (e) {
      res.json({ r: 'err', err: e });
    }
  });

  return router;    //라우터 변환 
}

