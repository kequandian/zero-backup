import React from 'react';
import { Alert, Button, Layout } from 'antd';

import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
const { Content } = Layout;

class DiffCompose extends React.Component {
  state = {
    loading: false,
    resultMessage: ""
  };

  getDiffComposeInfo = (_this) =>{
    _this.setState({
      loading: true
    })
    const API = "http://192.168.3.236:8888/api/backup/diff/compare";
    const queryData = {

    }
    this.promiseAjax(API, queryData)
      .then(responseData => {
        console.log('request rst: ', responseData);

        if (responseData && responseData.code === "200") {
          _this.setState({
            loading: false,
            resultMessage: responseData.message
          })
        }else{
          _this.setState({
            loading: false,
          })
        }
      })
  }

  promiseAjax(url, data, options = {}) {
    const { method = 'GET', async = true } = options;
  
    let param;
    let payload;
    if (method === 'GET') {
      param = `?${Object.keys(data).map(key => `${key}=${data[key]}`).join('&')}`;
    } else {
      payload = data;
    }
  
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(method, `${url}${param}`, async);
      xhr.responseType = 'JSON';
  
      xhr.onreadystatechange = () => {
  
        if (xhr.readyState !== 4) {
          return;
        }
  
        if (xhr.readyState === 4 && xhr.status === 200) {
          let result
          try {
            result = JSON.parse(xhr.responseText);
            resolve(result);
  
          } catch (error) {
            reject("返回的数据非 json 格式");
          }
        } else {
          reject(xhr.statusText);
        }
      }
      xhr.onerror = (err) => {
        reject(err);
      }
  
      xhr.send(payload);
    })
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
      <Button type="primary" ghost loading={loading} onClick={() => this.getDiffComposeInfo(_this)}>
          数据库对比
        </Button>
        <div style={{height:20}}></div>
        {resultMessage ? (
          <Alert
            closable
            onClose={handleClose}
            message={<pre>{resultMessage}</pre>}
          />
        ) : null}
     </Content>
      
    </>

  }

}

export default DiffCompose;
