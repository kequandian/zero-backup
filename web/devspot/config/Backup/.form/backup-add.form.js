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
          
          "value": [12,12]

        },
        "fields": [
          {
            "label": "周期名",
            "field": "name",
            "type": "input",
            "props": {
              "placeholder": "请输入……"
            },
            "rules": [
              "required"
            ],
            span:24
          },
          {
            "label": "预估年度开支成本(/万)",
            "field": "annualExpenses",
            "type": "number",
            min:0,
            "props": {
              "placeholder": "请输入……"
            },
            "rules": [
              "required"
            ]
          },
          {
            "label": "实际年度开支成本(/万)",
            "field": "trueAnnualExpenses",
            "type": "number",
            "props": {
              "placeholder": "请输入……"
            },
            "rules": [
            ]
          },
          {
            "label": "年费计算月份",
            "field": "monthCount",
            "type": "number",
            value:12,
            min:0,
            "props": {
              "placeholder": "请输入……"
            },
            "rules": [
              "required"
            ]
          },

          {
            "field": "startTime",
            "label": "周期开始时间",
            "type": "date",
            "props": {
            },
            "rules": [
              "required"
            ]
          },
          {
            "field": "endTime",
            "label": "周期开始时间",
            "type": "date",
            "props": {
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
            span:24,
            "rules": []
          },
        ],
        "API": {
          "createAPI": API.createAPI
        }
      }
    }
  ],
  "id": "XEHAy3Gt"
}
