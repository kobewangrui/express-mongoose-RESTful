# Todo

NodeJS, ExpressJS and MongoDB RESTful API Tutorial.

# Installation

安装依赖
npm install


启动api
npm start

热部署
nodemon start

mongodb导出表
 mongoexport -d todo-api -c users -o e:/wrlData/user.json --type=josn 
mongodb导入表
 mongoimport -d todo-api -c users  -file e:/wrlData/user.json --type=josn --upsert 

注意
执行mongoexport和mongoimport命令必须在mongodb安装路径的bin目录下执行