# Todo

NodeJS, ExpressJS and MongoDB RESTful API Tutorial.

# Installation

安装依赖
npm install


启动api
npm start

热部署(全局安装 npm i nodemon -g)
nodemon start

mongodb导出表
mongoexport -d todo-api -c users -o e:/wrlData/user.json --type=josn 

mongodb导入表
mongoimport -d todo-api -c users  -file e:/wrlData/user.json --type=josn --upsert 

注意
执行mongoexport和mongoimport命令必须在mongodb安装路径的bin目录下执行


将mongodb添加到windows服务（为了从命令提示符下运行 MongoDB 服务器，你必须从 MongoDB 目录的 bin 目录中执行 mongod.exe 文件）
d:\mongodb\bin\mongod.exe --logpath e:/mongodb/logs/mongodb.log --logappend --dbpath e:/mongodb/data --directoryperdb --serviceName MongoDB -install
mongodb.log为日志文件
data文件为数据库地址  
