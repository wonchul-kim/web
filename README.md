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

## Create MYSQM DB
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

* create database
    ```
    create database [database name] DEFAULT CHARSET=UTF8 COLLATE=utf8_general_ci;
    ```

* create table in database
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


#### jsonlint
`json` 형태로 작성한 데이터가 올바른 `json`인지 확인




