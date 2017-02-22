var React=require("react");
var ReactDOM=require("react-dom");
var Footer=React.createClass({
	getInitialState:function(){
		var index;
		if(this.props.footerIndex=="1"){
			index=1;
		}else if(this.props.footerIndex=="2"){
			index=2;
		}
		else{
			index=0
		}
		return {
			activeIndex:index
		}
	},
	clickHandle:function(e){
		var that=this;
		var title;
		var Home=require("./Home");
		var HomeHeader=require("./HomeHeader");
		var Kind=require("./Kind");
		var KindHeader=require("./KindHeader");
		
		var Cart=require("./Cart");
		var CartHeader=require("./CartHeader");
		
		var User=require("./User");
		var UserHeader=require("./UserHeader");
		
		var Buy=require("./Buy");
		var BuyHeader=require("./BuyHeader");
		
		var Login=require("./Login");
		var LoginHeader=require("./LoginHeader");
		
		var Register=require("./Register");
		var RegisterHeader=require("./RegisterHeader");
		
		var More=require("./More");
		var MoreHeader=require("./MoreHeader");
		
		var Order=require("./Order");
		var OrderHeader=require("./OrderHeader");
		
		var Collect=require("./Collect");
		var CollectHeader=require("./CollectHeader");
		
		var CartLogin=require("./CartLogin.js");
		var Detail=require("./Detail");
		var DetailHeader=require("./DetailHeader");
		var DetailFooter=require("./DetailFooter");
		if(e.target.tagName=="LI"){
			title=e.target.title;
		}
		else{
			title=e.target.parentNode.title
		}
		that.setState({
			activeIndex: title
		});
		if(title=="0"){
			ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<Home/>,content);
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<HomeHeader/>,header);
		}
		else if(title=="1"){
			ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<Kind/>,content);
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<KindHeader/>,header);
		}
		else if(title=="2"){
			ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<Buy/>,content);
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<BuyHeader/>,header);
		}
		else if(title=="3"){
//			ReactDOM.unmountComponentAtNode(content);
//			ReactDOM.render(<Cart/>,content);
//			ReactDOM.unmountComponentAtNode(header);
//			ReactDOM.render(<CartHeader/>,header);
			ReactDOM.unmountComponentAtNode(content);
			if(localStorage.getItem("isLogin")==null ||localStorage.getItem("isLogin")=="error"){
				ReactDOM.render(<Cart/>,content);				
			}else{
				ReactDOM.render(<CartLogin/>,content);
			}			
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<CartHeader/>,header);

		}
		else if(title=="4"){
//			ReactDOM.unmountComponentAtNode(content);
//			ReactDOM.render(<User/>,content);
//			ReactDOM.unmountComponentAtNode(header);
//			ReactDOM.render(<UserHeader/>,header);
			if(localStorage.getItem("isLogin")==null ||localStorage.getItem("isLogin")=="error"){
				ReactDOM.unmountComponentAtNode(content);
				ReactDOM.render(<Login mountType="user"/>,content);
				ReactDOM.unmountComponentAtNode(header);
				ReactDOM.render(<LoginHeader mountType="user"/>,header);			
			}else{
				ReactDOM.unmountComponentAtNode(content);
				ReactDOM.render(<User/>,content);
				ReactDOM.unmountComponentAtNode(header);
				ReactDOM.render(<UserHeader/>,header);				
			}
		}
		else{
			ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<Home/>,content);
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<HomeHeader/>,header);
		}
	},
	render:function(){	
		return (
			<ul id="mainFooter">				
				<li className={this.state.activeIndex=="0"?'active':''} onClick={this.clickHandle} title="0">
					<i className="iconfont">&#xe60c;</i>
					<div>首页</div>
				</li>
				<li className={this.state.activeIndex=="1"?'active':''} onClick={this.clickHandle} title="1">
					<i className="iconfont">&#xe6ee;</i>
					<div>分类</div>
				</li>
				<li className={this.state.activeIndex=="2"?'active':''} onClick={this.clickHandle} title="2">
					<i className="iconfont">&#xe64a;</i>
					<div>限时特卖</div>
				</li>
				<li className={this.state.activeIndex=="3"?'active':''} onClick={this.clickHandle} title="3">
					<i className="iconfont">&#xe790;</i>
					<div>购物车</div>
				</li>
				<li className={this.state.activeIndex=="4"?'active':''} onClick={this.clickHandle} title="4">
					<i className="iconfont">&#xe6a3;</i>
					<div>我的</div>
				</li>
			</ul>
		)			
	},

		

	
});
module.exports=Footer;