// code below forked from this google doc for hosting on nodejs / glitch:
// https://docs.google.com/document/d/1pJ0Qeuqblp7NYQn3fhFttJKfXsdCuzkAoLnWqLBCjd8/edit

const express = require("express");
const http = require("http");
const events = require("events");
const fetch = require("node-fetch");
const fs = require("fs");
const app = express();
var eventEmitter = new events.EventEmitter();

// make all the files in 'public' available
app.use(express.static("public"));
app.use(express.json());

// set this up with a public notion page link and glitch domain
// (don't forget to name your project on glitch first!)
const MY_DOMAIN = "notion.glitch.me";
const START_PAGE =
  "https://www.notion.so/Custom-Notion-Page-518e7c416706412fba8dd5a3ef542ff5";

// code injected near the end of the <head> tag
// styling and meta tags should go here
let INJECT_INTO_HEAD = `
  <!-- google fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700&family=Lato:ital,wght@0,400;0,500;0,700;1,400;1,700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">

  <!-- stylesheet -->  
  <link rel="stylesheet" type="text/css" href="/style.css">
  
  <!-- meta tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@NotionHQ">
  <meta name="twitter:title" content="Notion, But Cooler!">
  <meta name="twitter:description" content="A new tool that blends your everyday work apps into one. It's the all-in-one workspace for you and your team">
  <meta name="twitter:url" content="https://www.notion.so"><meta name="twitter:image" content="https://www.notion.so/images/meta/default.png">
  <meta property="og:site_name" content="Notion">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.notion.so">
  <meta property="og:title" content="Notion, But Cooler!">
  <meta property="og:description" content="A new tool that blends your everyday work apps into one. It's the all-in-one workspace for you and your team">
  <meta property="og:image" content="https://www.notion.so/images/meta/default.png">
  <meta property="og:locale" content="en_US">
  <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico">
`;

// code injected near the end of the <body> tag
// analytics and other scripts should go here
let INJECT_INTO_FOOT = `
  <script src="/script.js"></script>
`;

eventEmitter.on("fetch", event => {
  event.respondWith(fetchAndApply(event.request));
});
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST,PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
function handleOptions(request) {
  if (
    request.header("Origin") !== null &&
    request.header("Access-Control-Request-Method") !== null &&
    request.header("Access-Control-Request-Headers") !== null
  ) {
    // Handle CORS pre-flight request.
    response.set(corsHeaders);
  } else {
    // Handle standard OPTIONS request.
    response.append("Allow", "GET, HEAD, POST, PUT, OPTIONS");
  }
}

app.all("*", function(request, response) {
  async function fetchAndApply(request) {
    if (request.method === "OPTIONS") {
      return handleOptions(request);
    }
    let url = request.url;
    let res, body, contentType;
    console.log("fetch url: " + `https://www.notion.so${url}`);
    if (url.startsWith("/image")) {
      response.redirect(301, `https://www.notion.so${url}`);
    } else if (url.startsWith("/front")) {
      response.redirect(301, `https://www.notion.so${url}`);
    } else if (url.startsWith("/app") && url.endsWith("js")) {
      response.type("application/x-javascript");
      res = await fetch(`https://www.notion.so${url}`);
      body = await res.text();
      try {
        body = body
          .replace(/www.notion.so/g, MY_DOMAIN)
          .replace(/notion.so/g, MY_DOMAIN);
        console.log("get rewrite app.js");
      } catch (err) {
        console.log(err);
      }
    } else if (url.startsWith("/app") && url.endsWith("css")) {
      response.type("text/css");
      res = await fetch(`https://www.notion.so${url}`);
      body = await res.text();
    } else if (url.startsWith("/api")) {
      response.type("application/json;charset=UTF-8");
      response.append("Access-Control-Allow-Origin", "*");
      console.log("api method: " + request.method);
      res = await fetch(`https://www.notion.so${url}`, {
        body: JSON.stringify(request.body),
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36"
        },
        method: request.method // *GET, POST, PUT, DELETE, etc.
      });
      body = await res.text();
    } else if (url === `/`) {
      let pageUrlList = START_PAGE.split("/");
      let redrictUrl = `https://${MY_DOMAIN}/${
        pageUrlList[pageUrlList.length - 1]
      }`;
      response.redirect(302, redrictUrl);
    } else {
      res = await fetch(`https://www.notion.so${url}`, {
        method: request.method // *GET, POST, PUT, DELETE, etc.
      });
      body = await res.text();
      contentType = await res.headers.get("content-type");
      try {
        response.type(contentType);
        if (contentType.startsWith("text/html")) {
          body = body.replace(/<\/head>/g, INJECT_INTO_HEAD + "</head>");
          body = body.replace(/<\/body>/g, INJECT_INTO_FOOT + "</body>");
        }
      } catch (err) {
        console.log(err);
      }
    }
    return body;
  }

  fetchAndApply(request).then(body => {
    response.send(body);
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
