### study관련
vue에서 axios 사용하는 방법
* STEP1.main.js에 추가
> import axios from 'axios'
> import VueAxios from 'vue-axios'

* STEP2.main.js의 createApp(App)에 추가
>  .use(VueAxios, axios)


### 백엔드 서버 중 mongodb 연동
> npm init 
=> package.json의 type=moudle 추가 
=> scripts에 
    "dev": "cross-env NODE_ENV=dev nodemon index.js",
    "start": "cross-env NODE_ENV=product node index.js" 추가
> npm i mongodb dotenv express
> npm i -D cross-env nodemon