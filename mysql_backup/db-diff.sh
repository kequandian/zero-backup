#!/bin/sh
## INFO FORMART = 'ip@port@user@password'
########################################################
# export TEST_ENV='localhost@3306@root@root@temp@cr_issue_task'
# export PROD_ENV='localhost@3306@root@root@test@cr_issue_task'
export OUT_PUT_1='./file1'
export OUT_PUT_2='./file2'
########################################################
if [[ ! $DIFF_REMOTE || ! $DIFF_LOCAL || ! $DIFF_REMOTE_DB || ! $DIFF_LOCAL_DB || ! $DIFF_REMOTE_DB_USER || ! $DIFF_LOCAL_DB_USER || ! $DIFF_REMOTE_DB_PWD || ! $DIFF_LOCAL_DB_PWD ]];then
    echo ''
    echo 'Missing part of configuration info, have you configured the docker-compose.yml?'
    echo ''
    exit
fi
mysqldump -h $DIFF_REMOTE -P $DIFF_REMOTE_PORT -u$DIFF_REMOTE_DB_USER -p$DIFF_REMOTE_DB_PWD $DIFF_REMOTE_DB ${TB[0]} --compact --add-drop-table --no-data > ${OUT_PUT_1} 2>/dev/null
mysqldump -h $DIFF_LOCAL -P $DIFF_LOCAL_PORT -u$DIFF_LOCAL_DB_USER -p$DIFF_LOCAL_DB_PWD $DIFF_LOCAL_DB ${TB[1]} --compact --add-drop-table --no-data > ${OUT_PUT_2} 2>/dev/null
diff $OUT_PUT_1 $OUT_PUT_2
rm -rf $OUT_PUT_1
rm -rf $OUT_PUT_2