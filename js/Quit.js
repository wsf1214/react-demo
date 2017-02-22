var React=require("react");
var ReactDOM=require("react-dom");

var More=require("./More");
var MoreHeader=require("./MoreHeader");

var content=document.getElementById("content");
var header=document.getElementById("header");
ReactDOM.render(<Home/>,content);
ReactDOM.render(<HomeHeader/>,header);
var FooterComponent=React.createClass({

	render:function(){	
		return (
			<div id="MoreFooter">
				退出
			</div>		
		)			
	},
	componentDidUpdate:function(){
		var that=this;
		$("#MoreFooter").tap(function(){
			ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<Home/>,content);
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<HomeHeader/>,header);
			that.setState({
				activeIndex: 4
			});
		})
	}
});
ReactDOM.render(<FooterComponent/>,document.getElementById("footer"));