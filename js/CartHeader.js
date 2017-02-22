var React=require("react");
var CartHeader=React.createClass({
	render:function(){
		return(			
			<div id="cartHeader">
				<div id="buyHeader">
					<h1 className="logo">
						<img src="img/logo.png"/>
					</h1>
					<div className="middle">
						购物车
					</div>
					<i className="iconfont"></i>
				</div>
			</div>
		)
	}	
})
module.exports=CartHeader;