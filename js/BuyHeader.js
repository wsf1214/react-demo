var React=require("react");
var BuyHeader=React.createClass({
	
	render:function(){
		return(			
			<div id="buyHeader">
				<h1 className="logo">
					<img src="img/logo.png"/>
				</h1>
				<div className="middle">
					限时特卖
				</div>
				<i className="iconfont"></i>
			</div>
		)
	}	
})
module.exports=BuyHeader;