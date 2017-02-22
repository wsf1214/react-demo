var React=require("react");
var ReactDOM=require("react-dom");
var header=document.getElementById("header");
var content=document.getElementById("content");
var footer=document.getElementById("footer");
var DetailHeader=React.createClass({
	render:function(){
		return(			
			<div id="detailHeader">
				<h1 className="logo">
					<i className="iconfont" id="back">&#xe604;</i>
				</h1>
				<div className="middle">
					详情页
				</div>
				<i className="iconfont"></i>
			</div>
		)
	},
	componentDidMount:function(){
		var that=this;
		$("#back").tap(function(){
			var index=that.props.index;
			var backOne=that.props.backOne;
			var backTwo=that.props.backTwo;
			var List=require("./List");
			var ListHeader=require("./ListHeader");
			
			ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<List index={index} backOne={backOne}/>,content);
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<ListHeader back={backOne} index={index}/>,header);
			ReactDOM.unmountComponentAtNode(footer);
			$("#footer").hide();
		})
		
		
	}	
})
module.exports=DetailHeader;