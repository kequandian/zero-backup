const setting = require('./.setting/backup.js');

module.exports = {
  layout: 'Content',
  title: setting.pageName,
  items: [
    {
      layout: 'Empty',
      component: 'Search',
      config: {
        share: 'backup',
        fields: [
           {
            "field": "search",
            "label": "文件名",
            "type": "input"
          },
        ],
      },
    },
    {
      layout: 'Empty',
      component: 'Table',
      config: {
        share: 'backup',
        API: {
          listAPI: setting.listAPI,
          deleteAPI: setting.deleteAPI,
        },
        actions: [
          {
            "title": "数据备份",
            "type": "request",
            "options": {
              "API": "/api/backup/doBackup",
              "method": "get"
            }
          }
        ],
        fields: [

		      {
		        "field": "id",
		        "label": "文件名",
		      },
        ],
        operation: [

          {
            title: '下载', type: 'export-excel',
            "type": "request",
            options: {
              fileNameField:"id",
              "outside": true,
              API: '/api/backup/download/(id)',
              method: 'download',
            },
          },
          /*{
            "title": "下载",
            "type": "request",
            "options": {
              "outside": true,
              "API": "/api/backup/download/(id)",
              "method": "get"
            },
          },*/
         /* {
            "title": "删除",
            "type": "delete"
          }*/
        ],
      },
    },
  ],
};
