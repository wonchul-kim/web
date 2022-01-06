# Client

### React LifeCycle

React는 원하는 데이터를 서버로부터 가져와 화면에 출력하도록 도와주는 front-end library이다. 그렇기 때문에 서버와 통신을 할 수 있도록 해주는 API를 언제, 어떻게 호출해야 원하는 데이터를 가져올 수 있다. 

#### Component Mounting
React component object가 DOM에 실제로 삽입되기까지의 Mounting 과정은 다음과 같다.

1. constructor()
2. componentWillMount()
3. render()
4. componentDidMount()

> 기본적으로 component가 모두 구성된 직후인 `compoenentDidMount()` 함수에서 API 호출을 수행하는 것이 효과적이다.  

#### 데이터의 호출 및 변경 - props & state

1. shouldComponentUpdate()
2. componentWillUpdate()
3. render()
4. componentDidUpdate()

> 기본적으로 component의 데이터와 화면에 출력된 내용이 다를 때, `shouldComponentUpdate()` 함수가 동작하며 `true`를 default로 반환한다. 

> 화면에 출력되는 화면 구성을 변경하고자 할 때는 `componentDidUpdate()`를 많이 사용한다. 

#### Component 해제

component가 mounting 해제될 때 수행되는 함수는 `componentWillUnmount()` 함수이며, 해당 component의 동작을 위해서 사용되었던 메소드들의 리소스를 제거할 수 있다. 

#### API 호출 연습

* https://jsonplaceholder.typicode.com/

---------------------------------------------------------------------------------------------------------------------------------------------

## React
[Getting started](https://create-react-app.dev/docs/getting-started/)

### To make a react project as a client
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


---------------------------------------------------------------------------------------------------------------------------------------------

## Server

### setting

``` 
npm install nodemon body-parser express
```

### Create MYSQM DB
* install 
    ```
    sudo apt-get install mysql-server
    
    sudo systemctl enable mysql

    sudo systemctl start mysql    
    ```

* connect in
    ``` 
    sudo mysql -u root -p
    ```
* see database in DB
    ```
    show databases;
    ```

* create database
    ```
    create database [database name] DEFAULT CHARSET=UTF8 COLLATE=utf8_general_ci;
    ```

* create table in database

    Before creating table, need to select specific database.

    ```
    use [database name];

    CREATE TABLE customers ( 
        id INT PRIMARY KEY AUTO_INCREMENT, 
        image VARCHAR(1024), 
        name VARCHAR(64), 
        birthday VARCHAR(64), 
        gender VARCHAR(64), 
        job VARCHAR(64) );
    ```

    데이터에 한글까지 포함하고 싶다면:
    ```
    CREATE TABLE customers (
        ...
    ) DEFAULT CHARACTER SET UTF8 COLLATE utf8_general_ci;
    ```


* insert and show data
    ```
    INSERT INTO customers VALUES (1, 'https://placeimg.com/64/64/1', 'gilsoon nam', 891023, 'male', 'student');
        
    INSERT INTO customers VALUES (2, 'https://placeimg.com/64/64/2', 'gildong hong', 910223, 'male', 'student');

    INSERT INTO customers VALUES (3, 'https://placeimg.com/64/64/3', 'donggeon jang', 780223, 'male', 'actor');
    ```

    ```
    SELECT * FROM [database name]
    ```

* `root`계정으로 하지 말고, 새로운 계정을 만들어서 진행하자. (아래의 내용은 `root`로 접속하여 진행)
    ```
    create user '계정명'@'%' identified by '비밀번호';

    ALTER USER '계정명'@'%' IDENTIFIED WITH mysql_native_password BY '비밀번호';

    grant all on 데이터베이스이름.* to '계정명'@'%';

    flush priviledges;
    ```

* `nodejs`에서 `mysql`에 접속하기 위한 설치
    ```
    npm install mysql
    ```

### AXIOS

client에서 새로운 데이터(고객정보)를 DB에 저장하기 위해서 server와의 통신을 위한 라이브러리

```
npm install --save axios
```


### multer

client로부터 server에서 받은 정보 중 `file`을 처리하기 위한 라이브러리

```
npm install --save multer
```


-------------------------------------------------------------------------------------------------------------------------------------

## Etc.

* jsonlint

    `json` 형태로 작성한 데이터가 올바른 `json`인지 확인




