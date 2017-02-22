var React=require("react");
var ReactDOM = require("react-dom");

var Register=React.createClass({
	getInitialState:function(){
		console.log("Register",this.props.mountType)
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
	toRegister:function(userID,password){
		var that =this;
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			data:{
				"status":"register",
				"userID":userID,
				"password":password
			},
			success:function(data){
				console.log(data)
				 if(data=="0"){
					that.makeText("该用户名已存在",1000);
				 }else if(data=="2"){
				 	that.makeText("数据库报错",1000);
				 }else{
				 	that.makeText("注册成功",1000);
				 	var Login=require("./Login");
					var LoginHeader=require("./LoginHeader");
				 	if(that.props.detail=="detail"){				 		
						var goodsImg=that.state.goodsImg;
						var goodsName=that.state.goodsName;
						var price=that.state.price;
						var discount=that.state.discount;
						var index=that.state.index;
						var backOne=that.state.backOne;
						ReactDOM.unmountComponentAtNode(content);
						ReactDOM.render(<Login goodsImg={goodsImg} goodsName={goodsName} price={price} discount={discount} index={index} backOne={backOne}/>,content);
						ReactDOM.unmountComponentAtNode(header);
						ReactDOM.render(<LoginHeader goodsImg={goodsImg} goodsName={goodsName} price={price} discount={discount} index={index} backOne={backOne}/>,header);
				 	}
				 	else{
				 		ReactDOM.unmountComponentAtNode(content);
						ReactDOM.render(<Login />,content);
						ReactDOM.unmountComponentAtNode(header);
						ReactDOM.render(<LoginHeader />,header);
				 	}
				}
			}
		});
	},		
	render:function(){
		return(			
			<div id="RegisterContent">
				<div className="account">
					<p>账号</p><input className="userID"  type="text" placeholder="用户名/邮箱/手机号均可"/>				
					<img className="delete" src="img/delete_login.png"/>
				</div>
				<div className="password">
					<p>密码</p><input className="passwordValue"  type="password" placeholder="密码必须在6到12位之间"/>				
					<img className="deleteP" src="img/delete_login.png"/>
					<img className="seePass" src="img/hide_pass.png"/>
				</div>
				<div className="toRegister">注册</div>
				<p>*点击注册代表同意<a> 好乐买软件隐私声明</a></p>
			</div>
		)
	},
	componentDidMount:function(){		
		var that =this;
		$(".toRegister").on("tap",function(){			
			//console.log("test",that.props.mountType)
			var userID = $(".userID").val();
			var password = $(".passwordValue").val();
			if(userID.trim().length==0){
				that.makeText("账号不能为空",1000);
			}else{
				if(password.trim().length==0){
					that.makeText("密码不能为空",1000);
				}else{
					if(password.length>=6&&password.length<=20){
						that.toRegister(userID,password);
					}else{
						that.makeText("密码必须在6-12位之间",1000);
					}				
				}			
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
	}	
})
module.exports=Register;