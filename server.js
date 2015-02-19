var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true
}).listen(3000, '0.0.0.0', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at 0.0.0.0:3000');
});

var http = require('http');
var app = http.createServer(function(req,res){
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(
    {
      programid: '1010',
      title: 'Oscar Best Picture 2016',
      caption: 'BP',
      programs: [
        {
          programid: '1011',
          title: 'American Sniper',
          caption: 'AM'
        },
        {
          programid: '1012',
          title: 'Birdman or (The Unexpected Virtue of Ignorance)',
          caption: 'BI'
        },
        {
          programid: '1013',
          title: 'Boyhood',
          caption: 'BO'
        },
        {
          programid: '1014',
          title: 'The Grand Budapast Hotel',
          caption: 'GR'
        },
        {
          programid: '1015',
          title: 'The Imitiation Game',
          caption: 'IM'
        },
        {
          programid: '1016',
          title: 'Selma',
          caption: 'SE'
        },
        {
          programid: '1017',
          title: 'The Theory of Everything',
          caption: 'TH'
        },
        {
          programid: '1018',
          title: 'Whiplash',
          caption: 'WH'
        }
      ]
    }
  ));
});
app.listen(4000);
