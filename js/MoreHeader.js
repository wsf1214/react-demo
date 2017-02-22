var React=require("react");
var ReactDOM = require("react-dom");
var MoreHeader=React.createClass({
	render:function(){
		return(			
			<div id="MoreHeader">
				<div className="back">
					<img src="img/abs__ic_ab_back_holo_light.png"/>
				</div>
				<div className="middle">
					更多
				</div>
				<i className="iconfont"></i>
			</div>
		)
	},
	componentDidMount:function(){
		var that = this;
		$(".back").on("tap",function(){
			var User=require("./User");
			var UserHeader=require("./UserHeader");			
			ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<User/>,content);
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<UserHeader/>,header);		
		});
	}	
})
module.exports=MoreHeader;