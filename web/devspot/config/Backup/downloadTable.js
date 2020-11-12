import React from 'react';
import { Alert, Button, Layout } from 'antd';
import qs from 'qs';

import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
const { Content } = Layout;

class DownloadTable extends React.Component {
  state = {
    loading: false,
  };

  downloadAction = (_this) =>{
    _this.setState({
      loading: true
    })
    

    const API = `/api/backup/prod/download`;
    const queryData = {}
    this.download(API, {method: 'get'}, queryData, _this);
  }


  download(api, options = {}, data, _this) {
    const { method = 'get', fileName } = options;
  
    let fapi = getEndpoint() + api;
    if (method === 'get') {
      fapi = getEndpoint() + `${api}?${qs.stringify(data)}`
    }

    return fetch(fapi, {
      method,
      responseType: 'blob',
      headers: {
        "Content-Type": "application/json"
      },
      params: method === 'get' ? data : undefined,
      body: method !== 'get' ? JSON.stringify(data) : undefined,
    })
      .then(res => {
        // 转为blob对象，然后通过 URL.createObjectURL() 生成一个地址
        // res.blob().then(function (myBlob) {
        //   const url = URL.createObjectURL(myBlob);
        //   // 跳转新窗口
        //   if (url) {
        //     window.open(url)
        //   }
        //   // 下载
        //   // let a = document.createElement('a')
        //   // a.download = 'equipmentOut.pdf'
        //   // a.href = url
        //   // document.body.appendChild(a)
        //   // a.click()
        //   // a.remove()
        // });
        return res.blob().then(blob => _this.downloadFile(res, blob,_this))
      })
  }

  downloadFile(res, blob,_this) {
    const contentType = res.headers['content-type'];
  
    if (contentType && contentType.indexOf('application/json') > -1) {
      return Promise.resolve(res);
    } else {
      let fileName = 'file';
  
      // https://stackoverflow.com/questions/48413050/missing-headers-in-fetch-response/48432628
      for (let entry of res.headers.entries()) {
        if (entry[0] === 'content-disposition')
          fileName = _this.getFileName(entry[1]);
      }
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, fileName); //兼容ie10
      } else {
        const link = document.createElement("a");
        const evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, false);
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.target = '_blank';
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(link.href);
      }
      
      _this.setState({
        loading: false
      })
    }
  }

  getFileName(disposition, defaultName = '') {


    const matchRst = disposition.match(/filename=["]{0,1}([\w.@%-]+)["]{0,1}/i);
  
    const fileName = matchRst && decodeURI(matchRst[1]) || defaultName;
  
    return fileName;
  }

  render(){

    const _this = this;
    const { resultMessage, loading } = this.state;

    function handleClose() {
      _this.setState({
        resultMessage: '',
      })
    }

    return <>
     <Content style={{ padding: '20px', background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
      <Button type="primary" ghost loading={loading} onClick={() => this.downloadAction(_this)}>
        导出数据库设计文档
      </Button>
     </Content>
      
    </>

  }

}

export default DownloadTable;
