import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    foodList: []
  },
  //비동기 처리 이후 최종적으로 데이터 update를 mutations에서 처리 
  mutations: {
    updatefoodList(state, playload) {
      state.foodList = playload;  //최종 update
    }
  },
  //비동기적 처리는 actions에서 처리
  actions: {
    async writefoodList(context, playload) {
      //새로운 데이터 생성
      console.log(playload);

      let { status, data } = await axios({
        method: 'POST',
        url: 'http://localhost:8090/api/v1/memo/insert',
        data: JSON.stringify(playload),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(status);
      console.log(data);
    },

    async updatefoodList(context) {
      try {
        //원하는 데이터 select
        //외부 mongoDB 불러오기!! 
        let { status, data } = await axios.get('http://localhost:8090/api/v1/memo/find/skip/0/limit/5')
        console.log(status);
        console.log(data);

        //웹브라우저 상에 데이터 list 출력하기 
        context.commit('updatefoodList', data.d);
        //Q. data로 적으면, 웹 브라우저상에 리스트가 출력되지 않는 이유가 무엇인가요?(data.d로 작성하면 리스트가 출력되는데요)
      }
      catch (e) {
        console.log(e);
      }
    },

    async deletefoodList(context, playload) {
      try {
        let { status, data } = await axios.get(`http://localhost:8090/api/v1/memo/delete/id/${playload}`)
        console.log(status);
        console.log(data);;
        context.commit('updatefoodList');
      }
      catch (e) {
        console.log(e);
      }
    }
  },
  modules: {
  }
})


