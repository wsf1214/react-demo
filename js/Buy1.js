var React=require("react");
var ReactDOM=require("react-dom");
var List=require("./List");
var ListHeader=require("./ListHeader");
var header=document.getElementById("header");
var content=document.getElementById("content");
var footer=document.getElementById("footer");
var Buy=React.createClass({
	getInitialState:function(){
		return {
			imgsList:""
		}
	},
	render:function(){
		return(			
			<div id="buyContent">
				<div className="tabs">
					  <ul className="tablinks">
					    <li className="active">全部</li>
					    <li>最新</li>
					    <li>鞋类</li>
					    <li>包配</li>
					    <li>服饰</li>
					    <li>专场</li>					         
					  </ul>				  
				</div>
				<div className="tabsCnt">
					<ul>
					    {this.state.imgsList}					         
					</ul>
				</div>
			</div>
		)
	},
	componentDidMount:function(){
		var that = this;
		$(".tablinks li").tap(function(){
			$(this).addClass("active").siblings("li").removeClass("active");
			var arrLinks=[
				"data/buy0.json",
				"data/buy1.json",
				"data/buy2.json",
				"data/buy3.json",
				"data/buy4.json",
				"data/buy5.json"
			]			
			$.ajax({
				method:"get",
				url:arrLinks[$(this).index()],
				dataType:"JSONP",
				success:function(data){				
					var result = data;
					var data = eval(result);
					var len = data.length;				
					var arr = [];
					for(var i = 0; i　< len-1; i++){					
						arr.push(
							 <li className="goodinf" key={Math.random()}>
						    	<dl>
						    		<dd>
						    		<img src={data[i].image}/>
						    		</dd>
						    		<dt>
						    			<span>{data[i].discount}</span>
						    			<span>{data[i].title}</span>
						    			<span>{data[i].pic_word}</span>
						    		</dt>
						    	</dl>
						    </li>					
						)
					}
					that.setState({
						imgsList:arr
					})
				}
			});
		})
		$(".tablinks li").eq(0).trigger("tap")
	},
	componentDidUpdate:function(){
		$(".goodinf").tap(function(){
			var index=$(".tablinks li[class=active]").index();
			ReactDOM.unmountComponentAtNode(content);
			ReactDOM.render(<List index={index} backOne="buy"/>,content);
			ReactDOM.unmountComponentAtNode(header);
			ReactDOM.render(<ListHeader back="buy" index={index}/>,header);
			$("#footer").hide();
		})
	}
})
module.exports=Buy;
