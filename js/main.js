var React=require("react");
var ReactDOM=require("react-dom");
var Footer=require("./Footer")
var Home=require("./Home");
var HomeHeader=require("./HomeHeader");



var content=document.getElementById("content");
var header=document.getElementById("header");
var footer=document.getElementById("footer");



ReactDOM.render(<Home/>,content);
ReactDOM.render(<HomeHeader/>,header);

ReactDOM.render(<Footer/>,footer);
