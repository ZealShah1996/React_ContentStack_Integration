// import React, { Component } from "react";
// const axios = require("axios").default;
// let defaulturl = "https://api.contentstack.io/v3/content_types";
// let todolist = "list_value";
// let locale = "en-us";
// let todolistitem = "to_do_list_item";
// let authkey = require("./../config.json").authkey; //Finding auth key from config json
// let api_key = require("./../config.json").api_key;
// let headers = {
//   headers: {
//     api_key: `${api_key}`,
//     authtoken: `${authkey}`,
//     "Content-Type": "application/json"
//   }
// };

// class Service extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           to_do_list: []
//         };
//       }
      
//   render(props) {
//       
//     //Request()
//     return null;
//   }
// }

// async function Request(url, data, methodType) {
//     
//     //https://api.contentstack.io/v3/content_types/{{todolistitem}}/entries?locale=en-us
//     let finalurl = `${defaulturl}/${todolistitem}/entries?locale=en-us`;
//     
//     let returndata = await axios[methodType](finalurl, data, headers);
//     
//   }

// function findHeadersConfiguration() {
//     return {};
//   }

// export default service;
