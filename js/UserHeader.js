var React = require("react");
var ReactDOM = require("react-dom");

var More=require("./More");
var MoreHeader=require("./MoreHeader");

var HomeHeader = React.createClass({
	sexKind:function(e){
		var e = e || window.event;
			ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<More/>,content);
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<MoreHeader/>,header);		
	}, 
	render:function(){
		return (
			<div id="userHeader">
				<div id="buyHeader">
					<h1 className="logo">
						<img src="img/logo.png"/>
					</h1>
					<div className="middle" onClick={this.sexKind}>
						我的好乐买
					</div>
					<div className="quitLogin" ><img  src="img/more.png"/></div>
				</div>
			</div>

			
		)
	}
});

module.exports = HomeHeader;
