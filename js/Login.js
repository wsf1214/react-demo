var React=require("react");
var ReactDOM = require("react-dom");

var User=require("./User");
var UserHeader=require("./UserHeader");

var CartLogin=require("./CartLogin.js");
var CartHeader=require("./CartHeader");

var Collect=require("./Collect");
var CollectHeader=require("./CollectHeader");

var header=document.getElementById("header");
var content=document.getElementById("content");
var footer=document.getElementById("footer");

var Login=React.createClass({
	getInitialState:function(){
		return {
			mountType:this.props.mountType,
			Login:"",
			goodsImg:this.props.goodsImg,
			goodsName:this.props.goodsName,
			price:this.props.price,
			discount:this.props.discount,
			index:this.props.index,
			backOne:this.props.backOne
		}
	},
	makeText:function(str,time){
		var that =this;
		//吐司的封装函数
		$("#toast").show();
		$("#tip").html(str);
		setTimeout(function(){
			$("#toast").hide();
		},time)
	},		
	toLogin:function(userID,password,type){
		var that =this;
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			data:{
				"status":"login",
				"userID":userID,
				"password":password
			},
			success:function(data){
				 if(data=="0"){
					that.makeText("用户名不存在",1000);
				 }else if(data=="2"){
				 	that.makeText("密码错误",1000);
				 }else{
				 	that.makeText("登录成功",1000);
				 	localStorage.setItem("isLogin","ok");
				 	localStorage.setItem("userID",userID);
				 	if(that.props.detail=="detail"){
				 		var Detail=require("./Detail");
						var DetailHeader=require("./DetailHeader");					
						var goodsImg=that.state.goodsImg;
						var goodsName=that.state.goodsName;
						var price=that.state.price;
						var discount=that.state.discount;
						var index=that.state.index;
						var backOne=that.state.backOne;
						ReactDOM.unmountComponentAtNode(content);
						ReactDOM.render(<Detail goodsImg={goodsImg} goodsName={goodsName} price={price} discount={discount} />,content);
						ReactDOM.unmountComponentAtNode(header);
						ReactDOM.render(<DetailHeader index={index} backOne={backOne}/>,header);	
						$("#footer").show();
				 	}
				 	else{
				 		var User=require("./User");
				 		var UserHeader=require("./UserHeader");
				 		ReactDOM.unmountComponentAtNode(content);
						ReactDOM.render(<User />,content);
						ReactDOM.unmountComponentAtNode(header);
						ReactDOM.render(<UserHeader />,header);
				 	}
				 }
			}
		});
	},	
	render:function(){
		return(			
			<div id="LoginContent">
				<div className="account">
					<p>账号</p><input className="userID" type="text" placeholder="用户名/邮箱/手机号"/>
					<img className="delete" src="img/delete_login.png"/>
				</div>
				<div className="password">
					<p>密码</p><input className="passwordValue" type="password" placeholder="请输入密码"/>				
					<img className="deleteP" src="img/delete_login.png"/>
					<img className="seePass" src="img/hide_pass.png"/>
				</div>
								
				<div className="phoneAccount">
					<p>手机号</p><input className="userID1" type="text" placeholder="请填写注册手机号"/>
					<img className="delete1" src="img/delete_login.png"/>
				</div>
				<div className="phonePassword">
					<p>验证码 </p><input className="passwordValue1" type="text" placeholder="请输入验证码"/>				
					<div className="get">获取验证码</div>
				</div>
			
				<div className="choiceLoginWay">
					<input type="radio" name="aa" defaultChecked="defaultChecked" className="passGo"/>密码登陆
					<input type="radio" name="aa" className="phoneGo" />手机验证码登陆
				</div>
				<div className="toLogin">登录</div>
				<p className="forget">忘记密码?</p>
	            <fieldset>
	            	<legend>联合登录</legend>
	            </fieldset>	
	            <div className="loginWay">
	            	<img src="img/qq.png"/>
	            	<img src="img/pay.png"/>
	            	<img src="img/sina.png"/>
	            	<img src="img/weixin.png"/>
	            </div>
			</div>
		)
	},
	componentDidMount:function(){		
		var that =this;
		$(".toLogin").on("tap",function(){			
			var type = that.props.mountType;
			var userID = $(".userID").val();
			var password = $(".passwordValue").val();
			if(userID==""){
				that.makeText("账号不能为空",1000);
			}else if(password==""){
				that.makeText("密码不能为空",1000);
			}else{
				that.toLogin(userID,password,type);
			}			
		});
		$(".userID").bind('input propertychange', function() { 
		 //console.log("aaaaa") 
		 	$(".delete").show();
		 	if($(".userID").val()==""){
		 		$(".delete").hide();
		 	}
		});
		$(".delete").on("tap",function(){
			$(".userID").val("");
			$(".delete").hide();
		});
		$(".passwordValue").bind('input propertychange', function() { 
		 	$(".deleteP").show();
		 	if($(".passwordValue").val()==""){
		 		$(".deleteP").hide();
		 	}		 	
		});
		$(".deleteP").on("tap",function(){
			$(".passwordValue").val("");
			$(".deleteP").hide();
		});		
		$(".seePass").on("tap",function(){
			$(".seePass").attr("src")=="img/hide_pass.png"?$(".seePass").attr("src","img/show_pass.png") : $(".seePass").attr("src","img/hide_pass.png");		
			if($(".seePass").attr("src")=="img/hide_pass.png"){
				$(".passwordValue").attr("type","password");
			}else{
				$(".passwordValue").attr("type","text");
			}		
		});
		
		
		$(".userID1").bind('input propertychange', function() { 
		 //console.log("aaaaa") 
		 	$(".delete1").show();
		 	if($(".userID1").val()==""){
		 		$(".delete1").hide();
		 	}
		});
		$(".delete1").on("tap",function(){
			$(".userID1").val("");
			$(".delete1").hide();
		});
		$(".phoneAccount").hide();
		$(".phonePassword").hide();	
		$(".passGo").on("tap",function(){
			$(".phoneAccount").hide();
			$(".phonePassword").hide();
			$(".account").show();
			$(".password").show();
		});
		$(".phoneGo").on("tap",function(){
			$(".account").hide();
			$(".password").hide();
			$(".phoneAccount").show();
			$(".phonePassword").show();			
		});
	}

})
module.exports=Login;