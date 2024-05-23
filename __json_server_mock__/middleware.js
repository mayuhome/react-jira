const querystring = require("querystring");

module.exports = (req, res, next) => {
  // console.log('req:',res.locals.username);
  if (req.method === "POST" && req.path === "/login") {
    console.log("req2:");
    let body = "";
    req.on("data", (d) => {
      body += d.toString();
    });
    req.on("end", () => {
      console.log("params:", body);
      // const params = querystring.parse(body); // 解析参数
      // console.log('params:', params);
      // // res.writeHead(200, { 'Content-Type': 'text/plain' });
      // // res.write('Received the following data:\n');
      // res.end(JSON.stringify(params)); // 返回接收到的参数
    });
    console.log("pa2rams:", body);
    if (req.body?.username === "jade" && req.body?.password === "123456") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      console.log("req3:");
      return res.status(400).json({ message: "用户名或密码错误1111" });
    }
  }
  next();
};
