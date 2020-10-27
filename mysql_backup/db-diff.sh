#!/bin/sh
## INFO FORMART = 'ip@port@user@password'
########################################################
# export MYDIFF_ORIGIN_DATA='127.0.0.1:3306/test[cr_issue_task]'
# export MYDIFF_DATA='127.0.0.1:3306/temp[cr_issue_task]'
# export MYDIFF_ORIGIN_DATA_PASSWORD='root'
# export MYDIFF_DATA_PASSWORD='root'
# export TEST_ENV='localhost@3306@root@root@temp@cr_issue_task'
# export PROD_ENV='localhost@3306@root@root@test@cr_issue_task'
export OUT_PUT_1='./file1'
export OUT_PUT_2='./file2'
########################################################
if [[ ! $MYDIFF_ORIGIN_DATA || ! $MYDIFF_DATA ]];then
    echo ''
    echo 'DON NOT FOUNT MYDIFF_ORIGIN_DATA or MYDIFF_DATA.'
    echo ''
    exit
fi
PORT=${MYDIFF_ORIGIN_DATA#*:}
PORT=${PORT%/*}
DB=${MYDIFF_ORIGIN_DATA##*/}
DB=${DB%%\[*}
TB=${MYDIFF_ORIGIN_DATA##*\[}
TB=${TB%%\]*}
mysqldump -h ${MYDIFF_ORIGIN_DATA%:*} -P $PORT -u$MYDIFF_ORIGIN_DATA_USER -p$MYDIFF_ORIGIN_DATA_PASSWORD $DB $TB --compact --add-drop-table --no-data > ${OUT_PUT_1} 2>/dev/null
PORT=${MYDIFF_DATA#*:}
PORT=${PORT%/*}
DB=${MYDIFF_DATA##*/}
DB=${DB%%\[*}
TB=${MYDIFF_ORIGIN_DATA##*\[}
TB=${TB%%\]*}
mysqldump -h ${MYDIFF_DATA%:*} -P $PORT -u$MYDIFF_DATA_USER -p$MYDIFF_DATA_PASSWORD $DB $TB --compact --add-drop-table --no-data > ${OUT_PUT_2} 2>/dev/null
diff $OUT_PUT_1 $OUT_PUT_2
rm -rf $OUT_PUT_1
rm -rf $OUT_PUT_2