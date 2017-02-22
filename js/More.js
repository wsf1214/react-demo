var React=require("react");
var ReactDOM=require("react-dom");

var Home=require("./Home");
var HomeHeader=require("./HomeHeader");

var More=React.createClass({
	render:function(){
		return(			
			<div id="MoreContent">
				<ul className="moreService">
					<li><p>信息推送</p><img id="img1" src="img/myself_open.png"/></li>
					<li><p>清除缓存图片</p><img src="img/right_promotion.png"/></li>
					<li><p>检查更新</p><img src="img/right_promotion.png"/></li>
					<li><p>联系我们</p><img src="img/right_promotion.png"/></li>
					<li><p>关于</p><img src="img/right_promotion.png"/></li>
				</ul>
				<div id="MoreFooter">
					退出登录
				</div>	
			</div>			
		)
	},
	componentDidMount:function(){
		var that =this;
		$("#MoreFooter").on("tap",function(){
			var quit = confirm("确定退出登录？")
			if(quit==true){
				localStorage.setItem("isLogin","error");
				localStorage.removeItem("userID")
				var Login=require("./Login");
				var LoginHeader=require("./LoginHeader");
				ReactDOM.unmountComponentAtNode(content);
				ReactDOM.render(<Login/>,content);
				ReactDOM.unmountComponentAtNode(header);
				ReactDOM.render(<LoginHeader/>,header);				
			}
		});
		
	}
})
module.exports=More;
