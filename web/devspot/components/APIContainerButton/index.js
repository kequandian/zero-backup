import React, { useState, useEffect } from 'react';

/**
 * 
 * @param {boolean} extend 从 API 获取的数据, 是展开后传给子组件, 还是作为 data 传给子组件
 */
export default function APIContainer(props) {
  const [data, setData] = useState({});
  const { API, queryData, extend = true, children, ...rest } = props;

  useEffect(_ => {
    promiseAjax(API, queryData)
      .then(responseData => {
        console.log('request rst: ', responseData);

        if (responseData && responseData.code === 200) {
          setData(responseData.data);
        }
      })
  }, []);

  return React.cloneElement(children, {
    ...(extend ? { ...data } : { data }),
    ...rest,
  })
}

function promiseAjax(url, data, options = {}) {
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