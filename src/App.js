import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
const axios = require("axios").default;
let defaulturl = "https://api.contentstack.io/v3/content_types";
let todolist = "list_value";
let locale = "en-us";
let todolistitem = "to_do_list_item";
let authkey = require('./config.json').authkey;//Finding auth key from config json
let api_key=require('./config.json').api_key;//finding api key from config json
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to_do_list: []
    };
  }

  componentWillMount() {
    let url = `${defaulturl}/${todolist}/entries?locale=${locale}&include_workflow=true&include_publish_details=true`;
    axios
      .get(url, {
        headers: {
          api_key: `${api_key}`,
          authtoken: `${authkey}`,
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        response.data.entries.forEach(async element => {
          let to_do_list_items = [];
          await element.reference.forEach(async element1 => {
            let data = await Todolistitem(element1);
            to_do_list_items.push(data);
            element["to_do_list_items"] = to_do_list_items;
            let indexInResponse = response.data.entries.indexOf(element);
            // console.log(indexInResponse);
            response.data.entries[indexInResponse] = element;
            // console.log(JSON.stringify(response.data.entries));
            this.setState({ to_do_list: response.data.entries });
            debugger;
          });
        });
      });
  }

  render() {
    let data = ["zeal", "zeal1"];
    let name = "zeal";
    return (
      <div className="App">
        {<span>{JSON.stringify(this.state.to_do_list.length)}</span>}
        <h1>
          {this.state.to_do_list.map(element => (
            <ItemForElement name={element} />
          ))}
        </h1>
        {/* {this.state.to_do_list.map(element => (
          <div>
            {element.title}
            <div>
              <span>
                {element.reference.map(async element => (
                  <Todolistitem name={element} />
                ))}
              </span>
            </div>
          </div>
        ))} */}
      </div>
    );
  }
}

function ItemForElement(element) {
  debugger;
  let data = [];
  if (element.name.to_do_list_items != undefined) {
    element.name.to_do_list_items.forEach(element1 => {
      debugger;
      if (element1.complete) {
        data.push(<input type="checkbox" checked />);
      } else {
        data.push(<input type="checkbox" />);
      }
      data.push(element1.title);
      data.push(<br />);
    });
  }
  debugger;
  return (
    <span>
      {element.name.title}
      <div>{data}</div>
    </span>
  );
}

async function Todolistitem(element) {
  let finalkey = element;
  let finalOutput = [];
  let url = `${defaulturl}/${todolistitem}/entries/${finalkey.toString()}`;
  let data = await axios.get(url, {
    headers: {
      api_key: `${api_key}`,
      authtoken: `${authkey}`,
      "Content-Type": "application/json"
    }
  });
  return data.data.entry;
}

export default App;
