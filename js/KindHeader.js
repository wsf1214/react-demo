var React=require("react");
var KindHeader=React.createClass({
	render:function(){
		return(			
			<div id="kindHeader">
				<h1 className="logo">
					<img src="img/logo.png"/>
				</h1>
				<div className="searchBox">
					<input className="search" type="text"/>
					<i className="iconfont">&#xe6d8;</i>
				</div>
				<i className="iconfont"></i>
			</div>
		)
	}		
})
module.exports=KindHeader;