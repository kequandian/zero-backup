import React from 'react';

import Backup from '@/pages/devops/config/Backup';

import DiffCompose from './config/Backup/diffCompose';
import DownloadTable from './config/Backup/downloadTable';

export default (props) => (
    <>
        <div style={{marginBottom:'16px'}}>
            <DiffCompose/>
        </div>
        <div style={{marginBottom:'16px'}}>
            <DownloadTable/>
        </div>
        <Backup />
    </>
);
