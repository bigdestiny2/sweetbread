let request = require('request');

exports.githubExternalAdapter = (req, res) => {
  const url = "https://api.github.com/repos/bigdestiny2/linked-dapp/stats/contributors";
  const contributor = req.body.data.author.login || "";
  const commits = req.body.weeks.c || "";
  let requestStats = {
    contributor: contributor,
    commits: commits
  };
  let headerObj = {
    "API_KEY": "2f495ec54103945884c051d99c4c63f5eb943dbe "
  };
  let options = {
      url: url,
      headers: headerObj,
      qs: requestStats,
      json: true
  };

  request(options, (error, response, body) => {
    if (error || response.statusCode >= 400) {
        let errorData = {
            jobRunID: req.body.id,
            status: "errored",
            error: body
        };
        res.status(response.statusCode).send(errorData);
    } else {
      let returnData = {
        jobRunID: req.body.id,
        data: body
      };
      res.status(response.statusCode).send(returnData);
    }
  });
};
  const contributor = req.body.data.author.login || "";
  const commits =  req.body.weeks.c || "";
  let requestObj = {
    contributor: contributor,
    commits: commits
  };
  let headerObj = {
    "API_KEY": "2f495ec54103945884c051d99c4c63f5eb943dbe"
  };
  let options = {
      url: url,
      headers: headerObj,
      qs: requestObj,
      json: true
  };

  request(options, (error, response, body) => {
    if (error || response.statusCode >= 400) {
        let errorData = {
            jobRunID: req.body.id,
            status: "errored",
            error: body
        };
        res.status(response.statusCode).send(errorData);
    } else {
      let returnData = {
        jobRunID: req.body.id,
        data: body
      };
      res.status(response.statusCode).send(returnData);
    }
  });
};