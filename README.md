# zero-backup
> nodejs实现的数据备份方案, 用于开发阶段保存测试现场

通过mysql备份镜像对数据进行备份，同时nodejs的API可对生成的备份文件进行下载和查看操作。

**API接口:**  

- GET: `/api/backup/file/{fileName}` 

​       查找并返回数据备份详情

- GET: `/api/backup/files` 

  分页形式查找并返回数据备份文件

- GET: `/api/backup/download/:fileName`

  通过文件名称下载备份文件

- POST: `/api/backup/doBackup`

  - Body（JSON）：

  ```json
  {
      "note": "i am here"
  }
  ```

  手动触发一次数据备份

- POST: `/api/backup/note`

  - Body（JSON）：

  ```json
  {
      "fileName": "cinema-2020-10-28-02:15:00.sql",
      "note": "i am here"
  }
  ```

  用于根据文件名称更新备注内容

- GET：`/api/backup/diff/compare?table=originTable:localTable`

  >Tips：需确保数据库端口为互通状态

  根据docker-compose.yml中配置的环境变量进行数据库对比

> 默认端口 8080

**docker-compose.yml:**

```yml
version: '3'
services:
  mysqlbackup:
    image: zelejs/mysqlbackup
    container_name: mysqlbackup
    privileged: true
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - ./mysql_backup/data:/var/mysqlbackup/data
      - ./mysql_backup/log:/var/mysqlbackup/log
      # 备份api
      - ./mysql_backup/backup_api:/backup_api
      - ./mysql_backup/crond.sh:/usr/local/bin/crond.sh
    environment:
      MYSQL_DB: some_db
      #TZ: "Asia/Shanghai"
      MYSQL_HOST: 172.17.0.1
      MYSQL_PORT: 3306
      MYSQL_USER: root
      MYSQL_USER_PASSWORD: root
      CRONTAB_DAILY_HOUR: 2
      CRONTAB_DAILY_MIN: 15
      # 源服务器信息
      # MYDIFF_ORIGIN_REMOTE: xing@xingyu.cloud.cn:pw
      # 源数据库信息
      MYDIFF_ORIGIN_DATA: mysqlserver:3306/dbname
      # 本地数据库信息
      MYDIFF_DATA: mysqlserver:3306/dbname
      # 源数据库密码
      MYDIFF_ORIGIN_DATA_PASSWORD: root
      # 本地数据库密码
      MYDIFF_DATA_PASSWORD: zxcABC123
      # 源数据库账号
      MYDIFF_ORIGIN_DATA_USER: root
      # 本地数据库账号
      MYDIFF_DATA_USER: root
```

