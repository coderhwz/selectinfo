(function($){
	function select3(element,options){
		this.wrapper = $(element);
		this.opts = {
			selected:'-1',
			placehoder:'请选择',
		};

		//合并
		this.opts = $.extend(this.opts,options,{});
		this.init();
	}
	select3.prototype={
		init:function(){
			console.log(this.opts);
			if(this.opts.selected < 1){
				this.box = $('<a class="form-control">'+ this.opts.placehoder + '</a>');
				this.box.appendTo(this.wrapper);
				this.container = $('<div class="container" />');
				this.container.appendTo(this.wrapper);
				this.setAlphas();

				console.log(this.wrapper);
				console.log('append select box');
			}
		},
		setAlphas:function(){
			var _this = this;
			this.getAlphas(function(data){
				for (var i = 0; i < data.length; i++) {
					_this.container.append('<a>'+data[i]+'</a>');
				};
			});
		},
		eventBind:function(){
			this.box.click(function(){

			});
		},

		getAlphas:function(callback){
			$.getJSON('/select/app/api.php',{type:"alphas"},function(data){
				console.log('get Alphas');
				callback(data);
			});
		},

		getData:function(){
		},

		nextPage:function(){
		},

		prePage:function(){
		},
		
		getSingle:function(id){
		}


	};

	$.fn.select3 = function (options) {
			new select3(this,options);
        /* return this.each(function () {
			console.log('each');
            if (!$.data(this, 'select3')) {
                $.data(this, 'select3', new select3(this,options));
            }
        }); */
    };
})(jQuery);

$(document).ready(function(){
	$('#select').select3({a:'b'});
});

