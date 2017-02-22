var React=require("react");
var ReactDOM=require("react-dom");
//var Buy=require("./Buy");
//var BuyHeader=require("./BuyHeader");

var header=document.getElementById("header");
var content=document.getElementById("content");
var footer=document.getElementById("footer")

var ListHeader=React.createClass({	
	render:function(){
		return (			
			<div id="listHeader">
				<h1 className="logo">
					<i className="iconfont" id="back">&#xe604;</i>
				</h1>
				<div className="middle">
					列表
				</div>
				<i className="iconfont"></i>
			</div>
		)
	},
	componentDidMount:function(){
		var that=this;
		$("#back").tap(function(){
			var Kind=require("./Kind");
			var KindHeader=require("./KindHeader");
			var Home=require("./Home");
			var HomeHeader=require("./HomeHeader");
			var Buy=require("./Buy");
			var BuyHeader=require("./BuyHeader");
			var Footer=require("./Footer");
			var type=that.props.back;
			var index=that.props.index;
			if(type=="home"){				
				ReactDOM.unmountComponentAtNode(content);
				ReactDOM.render(<Home/>,content);
				ReactDOM.unmountComponentAtNode(header);
				ReactDOM.render(<HomeHeader/>,header);	
				$("#footer").show();
				ReactDOM.render(<Footer/>,footer);
			}
			else if(type=="kind"){
				ReactDOM.unmountComponentAtNode(content);
				ReactDOM.render(<Kind index={index}/>,content);
				ReactDOM.unmountComponentAtNode(header);
				ReactDOM.render(<KindHeader/>,header);
				$("#footer").show();
				ReactDOM.render(<Footer footerIndex="1"/>,footer);				
			}else if(type=="buy"){
				ReactDOM.unmountComponentAtNode(content);
				ReactDOM.render(<Buy/>,content);
				ReactDOM.unmountComponentAtNode(header);
				ReactDOM.render(<BuyHeader/>,header);	
				$("#footer").show();
				ReactDOM.render(<Footer footerIndex="2"/>,footer);
			}
		})
	}
})
module.exports=ListHeader;