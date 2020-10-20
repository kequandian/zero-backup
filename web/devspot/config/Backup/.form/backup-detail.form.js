const API = require('../.setting/backup.js');

module.exports = {
  "layout": "BaseTitle",
  "title": "结算周期",
  "items": [
    {
      "layout": "Content",
      "component": "Form",
      "config": {
        "layout": "Grid",
        "layoutConfig": {
          
          "layoutArea": [
            {
              "layout": "Grid",
              "length": 2,
              "value": [
                12,
                12
              ]
            },
            {
              "layout": "Grid",
              "length": 2,
              "value": [
                12,
                12
              ]
            },
            {
              "layout": "Grid",
              "length": 1,
              "value": [
                24
              ]
            }
          ]
        },
        "fields": [
          {
            "label": "项目",
            "field": "projectId",
            "type": "modal-radio",
            "props": {},
            "rules": [],
            "options": {
              "title": "选择项目",
              "value": "id",
              "API": "/api/crud/project/projects",
              "fields": [
                {
                  "label": "项目名称",
                  "field": "name"
                }
              ]
            }
          },
          {
            "label": "供应商",
            "field": "venderId",
            "type": "modal-radio",
            "props": {},
            "rules": [],
            "options": {
              "title": "选择供应商",
              "API": "/api/crud/vms/venders",
              "fields": [
                {
                  "label": "供应商名称",
                  "field": "name"
                }
              ]
            }
          },
          {
            "label": "收款方",
            "field": "beneficiary",
            "type": "input",
            "props": {
              "placeholder": "请输入……"
            },
            "rules": [
              "required"
            ]
          },
          {
            "label": "金额",
            "field": "balance",
            "type": "input",
            "props": {
              "placeholder": "请输入……"
            },
            "rules": [
              "required"
            ]
          },
          {
            "label": "备注",
            "field": "note",
            "type": "text-area",
            "props": {
              "placeholder": "请输入……"
            },
            "rules": []
          }
        ],
        "API": {
          "getAPI": API.getAPI
        }
      }
    }
  ],
  "id": "IjDsYXK9"
}
