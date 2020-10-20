# zero-backup
> nodejs实现的数据备份方案, 用于开发阶段保存测试现场

通过mysql备份镜像对数据进行备份，同时nodejs的API可对生成的备份文件进行下载和查看操作。

**API接口:**  

- GET: `/api/backup/files` 

  分页形式查找并返回数据备份文件。

- GET: `/api/backup/download/:fileName`

  通过文件名称下载备份文件

- GET: `/api/backup/doBackup`

  手动触发一次数据备份

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
```

