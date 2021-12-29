# Client

## React
[Getting started](https://create-react-app.dev/docs/getting-started/)

### To make a react project
```
npx create-react-app [project name]
```

`-g` 혹은 `global`로 `create-react-app`을 실행하는 것은 더 이상의 support가 없다고 하니, 위의 방식으로 진행하자.

* react는 `node`를 기반으로 프로젝트를 개발하기 때문에 `node`의 버전이 중요!
    * `nvm`이라는 [node version management](https://github.com/nvm-sh/nvm)를 github에서 직접 설치하여 진행
    * `nvm install --lts`로 최신의 안정적인 버전의 `node`를 설치
    * 혹은 `nvm install [원하는 버전]`을 설치 (`nvm ls-remote`를 통해서 version을 search)


### To communicate with server

`nodemon` 기반의 server와의 통신을 위해서 client의 `package.json`에서 `proxy`를 추가 설정

### lecture

* state: 변경되는 데이터를 다룰 때 사용
* props: 변경되지 않는 데이터를 다룰 때 사용

# Server

## setting

``` 
npm install nodemon body-parser express
```



#### jsonlint
`json` 형태로 작성한 데이터가 올바른 `json`인지 확인