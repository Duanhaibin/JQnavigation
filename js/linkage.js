// ********
// dhb 后台三级导航
// ****************
function Nav() {
	this.first = $(".level-first");    // 一级菜单li
	this.secondBox = $(".box-second"); // 二级菜单ul
	this.second =  $(".level-second"); // 二级菜单li
	this.thirdBox = $(".box-third");   // 三级菜单ul
	this.third =  $(".level-third");   // 三级菜单li
	this.firstArr = [];
	this.secondArr =[];
}
$.extend(true, Nav.prototype, {
	init: function() {
		this.load();
		this.bindEvents();
	},
	load: function() {
		for(let i=0; i<this.first.length; i++){
			var _this =this;
			this.firstArr.push(true);
			$(".first"+i).on("click", function(e){
				var firstFlag = _this.firstArr[i];
				firstFlag = !firstFlag;
				_this.firstArr.splice(i,1,firstFlag)
				if(!_this.firstArr[i]) {
					$(e.target).siblings('.level-first-down').removeClass('bottom').addClass('top')
				}
				if(_this.firstArr[i]) {
					$(e.target).siblings('.level-first-down').removeClass('top').addClass('bottom')
				}
			})


			this.secondArr.push([]);
			var secondLength = $(".first"+i).siblings('.box-second').find(".level-second").length;
			for(let j=0; j<secondLength; j++){
				this.secondArr[i].push(true);
				$(".first"+i).siblings('.box-second').find(".second"+j).on('click', function(e) {
					var secondFlag = _this.secondArr[i][j];
					secondFlag = !secondFlag;
					_this.secondArr[i].splice(j,1,secondFlag)
					if( !_this.secondArr[i][j] ) {
						$(e.target).siblings('.level-second-down').removeClass('bottom').addClass('top')
					}
					if( _this.secondArr[i][j] ) {
						$(e.target).siblings('.level-second-down').removeClass('top').addClass('bottom')
					}
				})
			}
		}
	},
	bindEvents: function() {
		this.first.on("click", $.proxy(this.handleFirstClick,this));
		this.second.on("click", $.proxy(this.handleSecondClick))
	},
	handleFirstClick: function(e) {
		this.count = !this.count;
		$(e.target).siblings('.box-second').slideToggle(300);
		$(e.target).siblings('.box-second').find('.level-second-down').removeClass('top')

		setTimeout(function() {
			if($(e.target).siblings('ul').css("display") == "none" ){
				$(e.target).siblings('ul').find('.box-third').hide();
				$(e.target).siblings('ul').find('.iconfont').removeClass('bottom').addClass('top');
			}
		}, 300)
		
	},
	handleSecondClick: function() {
		$(this).siblings('.box-third').slideToggle('fast');
	}

});
var nav = new Nav();
nav.init()
