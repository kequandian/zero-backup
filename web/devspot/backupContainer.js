import React from 'react';

import Backup from './backup';

// import APIContainerButton from './components/APIContainerButton'; 
import DiffCompose from './diffCompose';
export default (props) => (
    <div style={{marginBottom:'16px'}}>
        <Backup />
        <DiffCompose/>
    </div>
);
