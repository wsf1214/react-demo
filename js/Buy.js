var React=require("react");
var ReactDOM=require("react-dom");
var List=require("./List");
var ListHeader=require("./ListHeader");
var header=document.getElementById("header");
var content=document.getElementById("content");
var footer=document.getElementById("footer");
var swiper;

var Buy=React.createClass({
	getInitialState:function(){
		return {
			imgsList:"",
			activeIndex:"0"
		}
	},
	changeSwiper:function(e){
		var that=this;
		var title=e.target.title*1;
		console.log(title)
//		if(title==0){
//			$(".swiper-wrapper").css({"transform":"translate3d(0px, 0px, 0px)","transition-duration":"500ms"})
//		}
//		else{
			swiper.slideTo(title,500,false)
//		}
		
		that.setState({
			activeIndex:title
		})
	},
	goList:function(){
		var that=this;
		var index=that.state.activeIndex
		console.log(that.state.activeIndex)
		ReactDOM.unmountComponentAtNode(content);
		ReactDOM.render(<List index={index} backOne="buy"/>,content);
		ReactDOM.unmountComponentAtNode(header);
		ReactDOM.render(<ListHeader back="buy" index={index}/>,header);
		$("#footer").hide();
	},
	render:function(){
		return(			
			<div id="buyContent">
				<div className="tabs">
					  <ul className="tablinks">
					    <li className={this.state.activeIndex=='0'?'active':''} title="0" onClick={this.changeSwiper}>全部</li>
					    <li className={this.state.activeIndex=='1'?'active':''} title="1" onClick={this.changeSwiper}>最新</li>
					    <li className={this.state.activeIndex=='2'?'active':''} title="2" onClick={this.changeSwiper}>鞋类</li>
					    <li className={this.state.activeIndex=='3'?'active':''} title="3" onClick={this.changeSwiper}>包配</li>
					    <li className={this.state.activeIndex=='4'?'active':''} title="4" onClick={this.changeSwiper}>服饰</li>
					    <li className={this.state.activeIndex=='5'?'active':''} title="5" onClick={this.changeSwiper}>专场</li>					         
					  </ul>				  
				</div>
				<div className="tabsCnt">
					<div className="swiper-container" id="buySwiper">
					    <div className="swiper-wrapper">
							{this.state.imgsList}					         
					    </div>
					</div>					
				</div>
			</div>
		)
	},
	componentDidMount:function(){
		var that = this;
		$.ajax({
			type:"get",
			url:"json/buy.json",
			success:function(data){
				var len=data.length;
				var swiper=[]
				for(var i=0;i<len;i++){
					var info=data[i];
					var swiperSlide=[];
					for(var j=0;j<info.length;j++){
						swiperSlide.push(
							<div className="goodinf" key={Math.random()} onClick={that.goList}>
						    	<dl>
						    		<dd>
						    			<img src={info[j].image}/>
						    		</dd>
						    		<dt>
						    			<span>{info[j].discount}</span>
						    			<span>{info[j].title}</span>
						    			<span>{info[j].pic_word}</span>
						    		</dt>
						    	</dl>
						    </div>)
					}
					swiper.push(<div key={Math.random()} className="swiper-slide">{swiperSlide}</div>)
				}
				console.log(swiper);
				that.setState({
					imgsList:swiper
				})
			}
		});	
		setTimeout(function(){
			swiper=new Swiper("#buySwiper",{
				preventLinksPropagation : false,
				onSlideChangeStart: function(swiper){
	     			that.setState({
	     				activeIndex:swiper.activeIndex
	     			})
	    		}
			})
		},400)
		
	}
//	,
//	
//	componentDidUpdate:function(){
//		var that=this;
//		swiper=new Swiper("#buySwiper",{
//				preventLinksPropagation : false,
//				onSlideChangeStart: function(swiper){
//	     			that.setState({
//	     				activeIndex:swiper.activeIndex
//	     			})
//	    		}
//			})
//		
//		
//		
//	}
})
module.exports=Buy;
