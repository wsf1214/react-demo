var React=require("react");
var ReactDOM=require("react-dom");
var List=require("./List");
var ListHeader=require("./ListHeader");
var header=document.getElementById("header");
var content=document.getElementById("content");
var footer=document.getElementById("footer");
var Kind=React.createClass({
	getInitialState:function(){
		return {
			top:"",
			main:""
		}
	},
	render:function(){
		return(			
			<div id="kindContent">
				<ul className="kindList">
					<li className="active">运动生活</li>
					<li>户外鞋服</li>
					<li>休闲服装</li>
					<li>精品男鞋</li>
					<li>时尚女鞋</li>
					<li>快乐儿童</li>
					<li>全球购</li>
					<li>家居服饰</li>

				</ul>
				<div className="kindInfo">
					<div className="topWrap">
						<ul className="top">
							{this.state.top}
						</ul>
					</div>
					<div className="topHide">
					
					</div>
					<div className="main">
						{this.state.main}
					</div>
				</div>
			</div>
			
		)
	},
	componentDidMount:function(){
		var that=this;
		$(".kindList li").tap(function(){
			var index=$(this).index()
			$(this).addClass("active").siblings().removeClass('active');
			$.getJSON("json/kind.json",function(data){
				var result=data[index];
				//console.log(result);
				var top=result.top;
				var topArr=[];
				for(var i=0;i<top.length;i++){
					topArr.push(<li key={Math.random()}>
								<img src={top[i].img} />
								<span>{top[i].name}</span>						
							</li>)
				};
				var main=result.main;
				var mainArr=[];

				for(var i=0;i<main.length;i++){
					var title=<div className="title" key={Math.random()}>
							{main[i].title}
						</div>
					var info=[];
					for(var j=0;j<main[i].info.length;j++){
						info.push(<li key={Math.random()}>
								<img src={main[i].info[j].img} />
								<span>{main[i].info[j].name}</span>
							</li>)
					}
					mainArr.push(title);
					mainArr.push(<ul className="info" key={Math.random()}>{info}</ul>);					
				};
				//console.log(mainArr);				
				that.setState({
					main:mainArr,
					top:topArr
				})
			});
		});
		var index=this.props.index;
		var k=index||0;
		$(".kindList li").eq(k).trigger("tap");
		
	},
	componentDidUpdate:function(){
		$(".info li").tap(function(){
			var index=$(".kindList li[class=active]").index();
			ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<List index={index} backOne="kind"/>,content);
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<ListHeader back="kind" index={index}/>,header);
			$("#footer").hide();
		})
		
	}
	
})
module.exports=Kind;