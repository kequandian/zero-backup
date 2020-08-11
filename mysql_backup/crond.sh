## for debug set i=''
i='-i'


daily_hour=${CRONTAB_DAILY_HOUR}
daily_min=${CRONTAB_DAILY_MIN}

## no 15min task;no hourly task at 15
## #*/15    *       *       *       *       run-parts /etc/periodic/15min
sed $i "s/\*\/15/\#\*\/15/;s/0\s\+\*/\#15      \*/" /etc/crontabs/root

if [ $daily_hour ];then
if [ ! $daily_min ];then
   daily_min=0
fi
## daily task at 3:00AM
## 15      *       *       *       *       run-parts /etc/periodic/hourly
   sed $i "s/[0-9]\+\s\+[0-9]\+\s\+\*\s\+\*\s\+\*/$daily_min      $daily_hour       *       *       */" /etc/crontabs/root

fi

## repositories
sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

## node npm
apk add nodejs npm curl

npm install
node /backup_api/App.js &

## rename
mv /etc/periodic/daily/mysqlbackup.sh /etc/periodic/daily/mysqlbackup

## start crond
crond -f -l 8
