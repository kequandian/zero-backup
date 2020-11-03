var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var shell = require("shelljs");
module.exports = require("./config.js");

const backup_dir = fileDir;
const backup_script_path = scriptPath;
const latest = "latest";

console.log("back_dir : " + backup_dir);
console.log("backup_script_path : " + backup_script_path);

class BackUpFile {
  constructor(name) {
    this.id = name;
  }
}

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("X-Powered-By", " 3.2.1");
  if (req.method == "OPTIONS") res.send(200);
  /*让options请求快速返回*/ else next();
});

// 查找备份文件
app.get("/api/backup/files", function (req, res) {
  // let list = [];
  let files = fs.readdirSync(backup_dir);
  files.sort(function (a, b) {
    return (
      fs.statSync(backup_dir + "/" + b).mtime.getTime() -
      fs.statSync(backup_dir + "/" + a).mtime.getTime()
    );
  });
  console.log("read files : " + files);
  let fileArr = [];
  files.forEach(function (fileName) {
    if (fileName != latest) {
      fileArr.push(new BackUpFile(fileName));
    }
  });
  let total = fileArr.length;
  let pageNum = req.query.pageNum != null ? parseInt(req.query.pageNum) : 1;
  let pageSize = req.query.pageSize != null ? parseInt(req.query.pageSize) : 10;
  let current = pageNum;
  let pages = 0;
  if (total != 0) {
    pages = parseInt(total / pageSize);
    if (total % pageSize != 0) {
      ++pages;
    }
  }
  let records = fileArr.slice((current - 1) * pageSize, current * pageSize);
  result = {
    code: 200,
    data: {
      current: current,
      pages: pages,
      total: total,
      size: pageSize,
      records: records,
    },
    message: "Success",
  };
  //res.send(fileArr);
  res.send(result);
});

// 下载备份文件
app.get("/api/backup/download/:fileName", function (req, res) {
  let fileName = req.params.fileName;
  res.download(backup_dir + "/" + fileName, function (err) {
    if (err) {
      message = {
        code: "4000",
        message: "下载文件失败",
      };
      res.send(message);
    }
  });
});

// 手动备份
app.get("/api/backup/doBackup", function (req, res) {
  shell.exec(backup_script_path);
  console.log("exec shell script path : " + backup_script_path);
  let note = req.query.note;
  if (note != null && note != "") {
    fileName = shell.exec("ls -lt " + backup_dir + " | grep -E \"*.js\"  | head -n 1 |awk '{print $9}'")
	writeJson(fileName, note);
  }
  message = {
    code: "200",
    message: "备份执行成功",
  };
  res.send(message);
});

app.get("/api/backup/diff/compare", function (req, res) {
  let table = req.query.table;
  let result =
    "Please provide query parameters like <originTable>:<localTable>";
  if (table == "" || /\w+:\w+/g.test(table)) {
    result = shell.exec("bash /usr/local/bin/db-diff.sh " + table);
  }
  message = {
    code: "200",
    message: result,
  };
  res.send(message);
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
//   writeJson("c.txt", "aest");
//   deleteJson("c.txt");
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});

function writeJson(fileName, note) {
  fs.readFile("/usr/local/bin/note.json", function (err, data) {
    if (err) throw err;
    var list = JSON.parse(data.toString());
    list[fileName] = note;
    fs.writeFile("/usr/local/bin/note.json", JSON.stringify(list, undefined, 2), function (err) {
      if (err) throw err;
    });
  });
}

function deleteJson(fileName) {
  fs.readFile("/usr/local/bin/note.json", function (err, data) {
    if (err) throw err;
    var list = JSON.parse(data.toString());
    delete list[fileName]
    fs.writeFile("/usr/local/bin/note.json", JSON.stringify(list, undefined, 2), function (err) {
	  if (err) throw err;
      console.log("----------删除成功------------");
    });
  });
}
