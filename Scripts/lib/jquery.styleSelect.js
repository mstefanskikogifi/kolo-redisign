/*
 * 	 styleSelect - apply style to a select box
 *   (http://www.8stream.com/blog/entry/styleselect)
 *
 * 	 Copyright (c) 2010 Siim Sindonen, <siim@8stream.com>
 *   Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 *   Requires jQuery version: >= 1.3.2
 * 	 Version: 2.0.0 | 15.10.2010
 */
 
(function($){

	$.fn.styleSelect = function(options){
		
		var tabindex = 1;
		
		var opts = $.extend({}, $.fn.styleSelect.defaults , options);
		
		//set tabindex		
		$('input,select,textarea,button').each(function() {
			
			var input = $(this);
				
			if (!input.attr('tabindex')){
				
				input.attr('tabindex', tabindex);
				tabindex++;
			}
		});
		
		return this.each(function () {


		    mainSelect = $(this);
			var orgSelectbox = mainSelect.attr('data-name');
			var mainId = orgSelectbox.replace(/\[.*\]/, '');
			
			var styledTabIndex = mainSelect.attr('tabindex');
			
			var date = new Date;
			var selectId = 'selectbox_'+mainId+date.getTime();
			
			//Hidde select box
			mainSelect.hide();
	
			//Main container 
			var mainContainer = $('<div tabindex="'+styledTabIndex+'"></div>')
					.css({position : 'relative', 'z-index' : parseInt(1000 - styledTabIndex)})
					.addClass(opts.styleClass)
					.attr('id', selectId)
					.insertBefore(mainSelect);
					
			$('<div class="styleSelect_item"></div>')
				.appendTo(mainContainer)
				.css({'position' : 'absolute', 'z-index' : '' + parseInt(500 - styledTabIndex) + '', 'top' : opts.optionsTop, 'left' : opts.optionsLeft})
				.hide();

			$('<div class="styleSelect_item_start"></div><div class="styleSelect_item_content"></div><div class="styleSelect_item_end">').appendTo($('#'+selectId + ' .styleSelect_item'));
			
			//Options container
			var subContainer = $('<ul></ul>').appendTo($('#'+selectId + ' .styleSelect_item_content'));
				
			//Generate options list
			var optionsList = "";

            //set default value
			var isSelected = false;
			mainSelect.find('option').each(function () {
			    if ($(this).attr('selected')) {
                    isSelected=true;
			    }
			});

			if (isSelected == false) {
			    $(mainSelect.find('option')[0]).attr('selected','selected');
			}

			mainSelect.find('option').each(function(){
			
				optionsList += '<li id="'+$(this).val()+'"';
				if($(this).attr('class')) optionsList += ' class="'+$(this).attr('class')+'" ';
				optionsList += '>';
				optionsList += '<span style="display: block;"';
				if ($(this).attr('selected')) optionsList += ' class="selected" ';
				optionsList += '>';
				optionsList += $(this).text();
				optionsList += '</span>';
				optionsList += '</li>';
				
			});

			subContainer.append(optionsList);
			
			checkSelected(opts.styleClass,opts.optionsWidth);
				
			//Show options   
			$('#' + selectId).click(function (event) {

                //z-index fix
			    $('.selectLight, .selectDark').each(function () {
			        if ($(this).find('.styleSelect_item').css('display') != 'block') {
			            $(this).css('position', 'static');
			        }
			    })

			    if ($(".styleSelect_item", $(this)).css('display') != 'none') {
			        $('.selectLight .styleSelect_item, .selectDark .styleSelect_item').hide();
			        $(".styleSelect_item", $(this)).show();
			    } else {
			        $('.selectLight .styleSelect_item, .selectDark .styleSelect_item').hide();
			    }

                //hide other selects
			    $('.checkboxes-content').hide();

			    $(this).css('position', 'relative');

				var eitem = $(event.target);
				
				if (!eitem.parents(".jspVerticalBar").attr('class')){ 
				
					$(this).find('.styleSelect_item').slideToggle(opts.speed, function(){ 
						
					    if ($(this).css('display') != 'none' && opts.jScrollPane == 1) {

							//Use jScrollPane
							$(this).find(".styleSelect_item_content").jScrollPane(opts.jScrollPaneOptions);
							
                            //calculate select height
							var robList = $(this).find('li');
							var counter = 5;
							var newHeight = 0;

							if (robList.length < 6) {
							    counter = robList.length;
							}
							robList.each(function (index,data) {
							    if (counter > 0) {
							        newHeight+=$(data).outerHeight(true);
							    }
							    counter--;
							});

							$(this).height(newHeight);
							$(this).find('.styleSelect_item_content').height(newHeight);

							//jScrollPane api
							var api = $('.styleSelect_item_content').data('jsp');
							var container_height = $(".styleSelect_item_content").height();

							//container_height = 0;
							//$(".styleSelect_item_content ul li").each(function () {
							//    if ($(this).css('display') != 'none') container_height++;
							//});
							//container_height = container_height * $(".styleSelect_item_content ul li").outerHeight(true);
							//console.log(container_height);
					        //$('.styleSelect_item_content').height(container_height);

							var active_item_position = $('.styleSelect_item_content .selected').position();
                                                       
							if (active_item_position.top && api != null && api !=undefined && active_item_position.top > container_height){
							
								api.scrollTo(0, parseInt(active_item_position.top - container_height/2));
								
							} else if (active_item_position.top && active_item_position.top < container_height && api != null && api !=undefined){
							
								api.scrollTo(0, parseInt(active_item_position.top - container_height));
							
							} else if (api != null && api !=undefined){
						
								api.scrollTo(0, 0);
							}
                                                    
						}
					});
				}
			});

			//On click
			$('#'+selectId+' li').click(function(){
				
				doSelection($(this));
			});
			
			//Keyboard support
			$('#'+selectId).keydown(function(event){
				
				var active = $(this).find('.selected').parent();
				
				//jScrollPane api
				if (opts.jScrollPane == 1){ 
					
					var api = $('.styleSelect_item_content').data('jsp');
					var container_height = $(".styleSelect_item_content").height();
				}
				
				//Next item
				if (event.keyCode == 40 || event.keyCode == 39 ){ 
				
				    event.preventDefault();
					var next_item = active.next();
					
					if (next_item.index() > 0 && api != null && $('#'+selectId).find('.styleSelect_item').css('display') != 'none'){
					
						var position_next = next_item.position();
					
						if (position_next.top != null && position_next.top > container_height){
							
							api.scrollTo(0, parseInt(position_next.top));
						}
					}
					
					doSelection(next_item); 
				}
				
				//Prev item
				if (event.keyCode == 37 || event.keyCode == 38 ){ 
				    event.preventDefault();
					var prev_item = active.prev();
					var prev_item_index = prev_item.index();
					
					if (api != null && opts.jScrollPane == 1 && $('#'+selectId).find('.styleSelect_item').css('display') != 'none'){
						
						if (prev_item_index > 0){
						
							var position_prev = prev_item.position();
						
							if (position_prev.top-container_height < container_height){
								
								api.scrollTo(0, parseInt(position_prev.top));
							}
							
						} else {
							
							api.scrollTo(0, 0);
						}
					}
				
					doSelection(prev_item); 
				}
				

				if (event.keyCode == 13 || event.keyCode == 0 || event.keyCode == 32){ 
				
					$(this).find('.styleSelect_item').slideToggle(opts.speed,function(){ 
						
						var eitem = $(event.target);
						
						//Use jScrollPane
						if (!eitem.find(".jspContainer").attr('class') && opts.jScrollPane == 1){
						
							$(this).find(".styleSelect_item_content").jScrollPane(opts.jScrollPaneOptions);
						}
					});
					
					return false;
				}
				
				if (event.keyCode == 9){ $(this).find('.styleSelect_item').hide(opts.speed); }
				
			});
			
			//Do selection
			var doSelection = function(item){
				
			    if (item.find("span").hasClass('selected')) {
			        return;
			    }
				item.siblings().find("span").removeClass('selected');
				item.find("span").addClass('selected');
		
				var selectedItem = item.attr('id');

				var realSelector = $('select[data-name="'+orgSelectbox+'"]');
				realSelector.siblings().selected = false;
				//$('.boxType option').removeAttr('selected');
				//realSelector.find('option[value="' + selectedItem + '"]').attr('selected', 'selected');
				realSelector.val(selectedItem);
				
				realSelector.trigger(opts.selectTrigger);
		
				checkSelected(opts.styleClass,opts.optionsWidth);
			}
			
			$('#'+selectId).click(function(event){
			
				event.stopPropagation();
			});
			
			$(document).click(function() {
			
				$('#'+selectId+' .styleSelect_item').hide();
			});
		});	
	}
		
		//Selected items check
		function checkSelected(mainClass,mainWidth){
				
				$('.'+mainClass).each(function(){
				
					var elementList = $(this).find('.styleSelect_item');
					
					$(this).find('span').each(function(){
					
						var spanClass = $(this).attr("class");
						if (spanClass == "passiveSelect" || spanClass == "activeSelect") $(this).remove();
					
					});
					
					var selectedName = $(this).find('.selected');
					var selectedText = selectedName.text().substring(0, 38);
					
				    $('<span></span>').html(selectedText)
							.attr('id', selectedName.parent().attr('id'))
							.addClass('passiveSelect')
							.appendTo($(this));
					
					if (mainWidth === 0){
						$(this).css({'width' :  elementList.width()});
					}
					
				});
				
				$('.'+mainClass+' span').each(function(){
					if ($(this).attr('id')){
						$(this).removeClass();
						$(this).addClass('activeSelect');
					}
				});
		}	
	
		$.fn.styleSelect.defaults = {
		
			optionsTop: '26px',
			optionsLeft: '0px',
			optionsWidth: 0,
			styleClass: 'selectMenu',
			speed: 0,
			selectTrigger: 'change',
			jScrollPane: 0,
			jScrollPaneOptions: ''
		};
		
})(jQuery);
