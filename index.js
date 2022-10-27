let NginxConfFile = require('nginx-conf').NginxConfFile;

let file = 'nginx_static_redirects.conf';

let data = [];
let index = 0;

NginxConfFile.create(file, function(err, conf) {
    let takeNext = false;
    conf.nginx.if.forEach(function(item) {
      if (takeNext) {
          let rewrite = item.toString().match(/rewrite \^ (.*) permanent/i);
          if (rewrite) {
            data[index].rewrite = rewrite[1];
          }
          index++;
          takeNext = false;
          console.log(item.toString())
      }
      let match = item.toString().match(/\/\(_mobile\(_app\|_tab\)\?\/\)\?(.*)\$/i);
      if (match && match[1]) {
        data[index] = {'source': match[1]};
        takeNext = true;
      }
    })
  console.log(data)
});
