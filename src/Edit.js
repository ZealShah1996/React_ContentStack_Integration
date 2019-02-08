import React, { Component } from "react";
import App from "./App";
// import service from "./service/service";
import Redirect from "react-router";
import { link } from "fs";
const axios = require("axios").default;
var Link = require("react-router-dom").Link;
var ReactRouter = require("react-router-dom");
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Link = ReactRouter.Link;
let defaulturl = "https://api.contentstack.io/v3/content_types";
let todolist = "list_value";
let locale = "en-us";
let todolistitem = "to_do_list_item";
let authkey = require("./config.json").authkey; //Finding auth key from config json
let api_key = require("./config.json").api_key;
let headers = {
  headers: {
    api_key: `${api_key}`,
    authtoken: `${authkey}`,
    "Content-Type": "application/json"
  }
};
let coulumnsInItem = {};

class Edit extends React.Component {
  constructor(props) {
    super(props);
    //props.item
    this.state = {
      item: { title: "zeal", complete: true },
      redirect: false
    };
    coulumnsInItem = Object.keys(this.state.item);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // Object.keys(event.target).forEach(element => {
    //
    //   if(Object.keys(coulumnsInItem).indexOf(element)>-1){
    //
    //   }
    //   else{

    //   }
    //   // this.setState({
    //   //   item: {
    //   //     title: event.target.value.toString(),
    //   //     complete: event.target.complete.toString()
    //   //   }
    //   // });
    // });

    // this.setState({
    //   item: {
    //     title: event.target.value.toString(),
    //     complete: event.target.complete.toString()
    //   }
    // });
    let tempObject = Object.assign({}, this.state.item);
    tempObject[event.target.name] = event.target.value;

    this.setState({
      item: tempObject
    });
  }

  handleSubmit(event) {
    let tempObject = Object.assign({}, this.state.item);
    tempObject.complete = false;
    this.setState({
      item: tempObject
    });
    //console.log("New To Do List App is Added."+JSON.stringify(this.state.item));

    // this.state.item;
    this.submitData(this.state.item);
    event.preventDefault();
  }

  async submitData(data) {
    let data1 = {
      entry: data
    };
    let finalurl = `${defaulturl}/${todolistitem}/entries?locale=en-us`;
    let returnData=await Request(finalurl, data1, "post");

    //{{url}}/{{todolist}}/entries/bltc471c0115e16fa8b
    finalurl=`${defaulturl}/${todolist}/entries/bltc471c0115e16fa8b`;
    // let data1 = {
    //   entry: data
    // };
    let returnDataOfList_Value=await Request(finalurl,headers,'get');
    finalurl=`${defaulturl}/${todolistitem}/entries/bltc471c0115e16fa8b?locale=en-us`;
    debugger;
    returnDataOfList_Value.reference.push(returnData.uid);
    let dataForPut = {
      entry: returnDataOfList_Value
    };
    let putFinalUrl=`${defaulturl}/${todolist}/entries/bltc471c0115e16fa8b?locale=en-us`;
    debugger;
    let returnDataOfPut=await Request(putFinalUrl, dataForPut, "put");
    debugger;
   // returnData=await Request(finalurl,,'get');
  }

  handleOnClick = () => {
    this.setState({ redirect: true });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/main" component={App} />
          <div className="Edit" Style="text-align:center">
            Edit Your Item
            <br />
            <form onSubmit={this.handleSubmit}>
              {Object.keys(this.state.item).map(element => (
                <label>
                  {element
                    .toString()
                    .toLocaleUpperCase()
                    .substring(0, 1) +
                    element
                      .toString()
                      .substring(1, element.toString().length)}{" "}
                  <input
                    name={element}
                    type="text"
                    value={this.state.item[element]}
                    onChange={this.handleChange}
                  />
                  <br />
                </label>
              ))}
              <br />
              <input
                type="submit"
                onClick={this.handleOnClick}
                value="Submit"
              />
              <br />
              <br />
              <Link className="button" to="/main">
                <button> List View</button>
              </Link>
            </form>
          </div>
        </Switch>
      </Router>
    );
  }
}

async function Request(url, data, methodType) {
  //https://api.contentstack.io/v3/content_types/{{todolistitem}}/entries?locale=en-us
  return new Promise((Resolve, Reject) => {
   
    axios[methodType](url, data, headers)
      .then(response => {
        console.log("New To Do List App is Added.");
        return Resolve(response.data.entry);
      })
      .catch(err => {
        console.log("New To Do List App has some error.");
        console.log(err);
        return Reject(err);
      });
  });
}

async function patchRequest(url, data, methodType) {
  //https://api.contentstack.io/v3/content_types/{{todolistitem}}/entries?locale=en-us
  // return new Promise((Resolve, Reject) => {

  // });
  // let finalurl = `${defaulturl}/${todolistitem}/entries?locale=en-us`;
  // await axios[methodType](finalurl, data, headers)
  //   .then(response => {
  //   
  //     console.log("New To Do List App is Added.");
  //   })
  //   .catch(err => {
  //   
  //     console.log("New To Do List App has some error.");
  //     console.log(err);
  //   });
}

export default Edit;
