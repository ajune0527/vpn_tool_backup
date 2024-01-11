// 2024-01-11 15:20

const url = $request.url;
const isResp = typeof $response !== "undefined";
let body = $response.body;

switch (isResp) {
  // 网易新闻
  case /^https:\/\/nex\.163\.com\/q/g.test(url):
    try {
      let obj = JSON.parse(body);
      if (obj?.ads?.length > 0) {
        obj.ads = [];
      }
      body = JSON.stringify(obj);
    } catch (error) {
      console.log(`网易新闻, 出现异常: ` + error);
    }
    break;
  // 小爱音箱-开屏广告
  case /^https:\/\/hd\.mina\.mi\.com\/splashscreen\/alert/g.test(url):
    try {
      let obj = JSON.parse(body);
      let data = [];
      for (let i = 0; i < obj.data.length; i++) {
        let ad = obj.data[i];
        ad.start = "3818332800000";
        ad.end = "3818419199000";
        ad.stay = 1;
        ad.maxTimes = 1;
        data.push(ad);
      }
      obj.data = data;
      body = JSON.stringify(obj);
    } catch (error) {
      console.log(`小爱音箱-开屏广告, 出现异常: ` + error);
    }
    break;
  default:
    $done({});
}

$done({ body });