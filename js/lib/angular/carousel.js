/**
 * Heavily inspired by and liberally borrowed from Cubiq's SwipeView (http://cubiq.org/swipeview).
 * This takes SwipeView as the base, replaces CSS3 animations for jQuery animations
 * to enable IE8 and IE9 support, adds ability to have more divs instead
 * of a fixed 3, and uses jQuery data instead of HTML5 data for IE8 support.
 *
 * Lots of hooks for AngularJS directive support as well.
 */

var Carousel = function (el, options) {
  var i,
    div,
    className,
    pageIndex;

  this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
  this.options = {
    text: null,
    numberOfPages: 3,
    numberOfDivsOnEachSide: 1,
    snapThreshold: null,
    hastyPageFlip: false,
    loop: false
  };

  // User defined options
  for (i in options) {
    if(options.hasOwnProperty(i)){
      this.options[i] = options[i];
    }
  }

  this.wrapper.style.overflow = 'hidden';
  this.wrapper.style.position = 'relative';
  this.current_iterate = 0;
  this.isHandleReponsiveInCarousel = true;
  this.current_left =0;
  this.masterPages = [];
  this.numDivs = (2 * this.options.numberOfDivsOnEachSide) + 1;

  div = document.createElement('div');
  div.id = 'carousel-slider';
  div.style.cssText = 'position:relative;top:0;height:100%;width:100%;'; // this should be in a class, NOT inline css
  this.wrapper.appendChild(div);
  this.slider = div;

  this.refreshSize();

  var nonLoopPageCounter = 1;

  for (i=-this.options.numberOfDivsOnEachSide; i < (this.options.numberOfDivsOnEachSide + 1); i++) {
    div = document.createElement('div');
    div.id = 'carousel-masterpage-' + (i+ this.options.numberOfDivsOnEachSide);
	div.setAttribute("data-page", (i+ this.options.numberOfDivsOnEachSide));
	div.style.cssText = 'position:absolute;top:0;height:100%;width:100%;left:' + i * 100 + '%'; // this should be in a class, NOT inline css
	$(div).addClass('grid');
    //if (!div.dataset) {div.dataset = {};}
    if (this.options.loop === true) {
      pageIndex = i < 0 ? this.options.numberOfPages + i : i;
    } else {
      pageIndex = i < 0 ? this.options.numberOfDivsOnEachSide + nonLoopPageCounter++ : i;
    }
    $(div).data('pageIndex', pageIndex);
    $(div).data('upcomingPageIndex', pageIndex);

    if (!this.options.loop && i === -1) {div.style.visibility = 'hidden';}

    this.slider.appendChild(div);
    this.masterPages.push(div);
  }

  className = this.masterPages[this.options.numberOfDivsOnEachSide].className;
  this.masterPages[this.options.numberOfDivsOnEachSide].className = !className ? ' carousel-active' : className + ' carousel-active';
  this.currentMasterPage = this.options.numberOfDivsOnEachSide;
	
};

Carousel.prototype = {
  currentMasterPage: 1,
  x: 0,
  page: 0,
  pageIndex: 0,
  customEvents: [],

  onFlip: function (fn) {
    $(this.wrapper).on('carouselflip', fn);
    this.customEvents.push(['flip', fn]);
  },

  onReset: function (fn) {
    $(this.wrapper).on('carouselreset', fn);
    this.customEvents.push(['reset', fn]);
  },

  destroy: function () {
    while ( this.customEvents.length ) {
      $(this.wrapper).off('carousel' + this.customEvents[0][0]);
      this.customEvents.shift();
    }
  },

  refreshSize: function () {
    this.wrapperWidth = this.wrapper.clientWidth;
    this.pageWidth = this.wrapperWidth;
    this.maxX = -this.options.numberOfPages * this.pageWidth + this.wrapperWidth;
    this.snapThreshold = this.options.snapThreshold === null ?
      Math.round(this.pageWidth * 0.15) :
      /%/.test(this.options.snapThreshold) ?
        Math.round(this.pageWidth * this.options.snapThreshold.replace('%', '') / 100) :
        this.options.snapThreshold;
		//Changed: Set width of ul to handle carousal in responsive
		//Changed: list_type means whether the single line listing or two line listing
		this.list_type = 'single';
		if($(this.wrapper).hasClass('video-list2') || $(this.wrapper).hasClass('multi-line-list')){
			this.list_type = 'multiple';
		}
		if($(this.wrapper).find('.carousel-active .js-list-inline li.js-video-list').length !== 0){
			if(this.isHandleReponsiveInCarousel === true){
				this.__setContainerWidth();
			}
		}
  },

  updatePageCount: function (n) {
    this.options.numberOfPages = n;
    this.maxX = -this.options.numberOfPages * this.pageWidth + this.wrapperWidth;
  },

  goToPage: function (p, reset, currentPage) {
    var i, index;

    if (reset) {
	  if (currentPage == undefined) {
		this.updatePageCount(1);
	  } else {
		this.updatePageCount(currentPage);
	  }
    }

    this.masterPages[this.currentMasterPage].className = this.masterPages[this.currentMasterPage].className.replace(/(^|\s)carousel-active(\s|$)/, ' ');
    for (i=0; i<this.numDivs; i++) {
      var className = this.masterPages[i].className;
      if (!/(^|\s)carousel-loading(\s|$)/.test(className)) {
        this.masterPages[i].className = !className ? 'carousel-loading' : className + ' carousel-loading';
      }
      this.masterPages[i].style.visibility = '';
    }

    p = p < 0 ? 0 : p > this.options.numberOfPages-1 ? this.options.numberOfPages-1 : p;
    this.page = p;
    this.pageIndex = p;
    this.__pos(-p * this.pageWidth);

    this.currentMasterPage = (this.page + 1) - Math.floor((this.page + 1) / this.numDivs) * this.numDivs;

    this.masterPages[this.currentMasterPage].className = this.masterPages[this.currentMasterPage].className + ' carousel-active';
	this.masterPages[this.currentMasterPage].page = this.page

    var divsOnEachSide = Math.floor(this.numDivs / 2);

    var sequenceOfIndicesFromMaster = [];
    for (i = 0; i < this.numDivs; i++) {
      index = this.currentMasterPage + i;
      if (index >= this.numDivs) {
        index -= this.numDivs;
      }
      if (i <= divsOnEachSide) {
        sequenceOfIndicesFromMaster.push(index);
      } else {
        sequenceOfIndicesFromMaster.unshift(index);
      }
    }
	if(this.options.numberOfDivsOnEachSide !== 0){
		for (i = 0; i < sequenceOfIndicesFromMaster.length; i++) {
		  index = sequenceOfIndicesFromMaster[i];
		  if (i < divsOnEachSide) {
			var minusPages = (divsOnEachSide - i);
			this.masterPages[index].style.left = this.page * 100 - (minusPages * 100) + '%';
			$(this.masterPages[index]).data('upcomingPageIndex', this.page - minusPages < 0 ? this.options.numberOfPages - minusPages : this.page - minusPages);
			if ($(this.masterPages[index]).data('upcomingPageIndex') !== this.page - minusPages) {
			  this.masterPages[index].style.visibility = 'hidden';
			}
		  } else {
			var plusPages = (i - divsOnEachSide);
			this.masterPages[index].style.left = this.page * 100 + (plusPages * 100) + '%';
			$(this.masterPages[index]).data('upcomingPageIndex', this.page >= this.options.numberOfPages - plusPages ? plusPages : this.page + plusPages);
		  }
		}
	}

    if (reset) {
      this.__reset();
    }
  },

  hasNext: function() {
	if(this.page < this.options.numberOfPages - 1){
		return true;
	} else {
		//Changed: To handle next button in carousal for responsive
		if(this.__isResponsive()){
			if((this.current_iterate + this.display_item_count) < this.total_iterate){
				return true;
			}
		}
	}
  },
  hasPrevious: function() {
	if(this.page > 0){
		return true;
	} else {
		//Changed: To handle previous button in carousal for responsive
		if(this.__isResponsive()){
			if(this.current_iterate !== 0){
				return true;
			}
		}
	}
    
  },
  next: function () {
    
	this.__handleResponsive();
	
  },

  prev: function () {
	 
	this.__handleResponsivePrev();
  },

  /**
   *
   * Pseudo private methods
   *
   */
  __pos: function (x) {
    this.x = x;
    var self = this;
	if(this.options.numberOfDivsOnEachSide !== 0){
    	$(this.slider).stop().animate({left: x},  1000 , 'swing', function() {
      		self.__flip();
   		});
    } else {
		//Changed: To handle slider in 0 number of divs in each side
 		$(this.slider).stop().animate({left:0},  1000 , 'swing', function() {
     		self.__flip();
   		});
	}
  },
	//Added: To handle sliding next in carousal for responsive
  __handleResponsive: function () {
	var xyz = $(this.wrapper).find('.carousel-active .js-list-inline li.js-video-list').length;
	this.total_iterate = (this.list_type === 'multiple')? xyz/2 : xyz;
	this.iterate_width = $(this.wrapper).find('.carousel-active .js-list-inline li.js-video-list').outerWidth(true);
	if(this.__isResponsive()){
      this.current_iterate = this.current_iterate + this.display_item_count;
	  this.current_left = this.current_iterate * this.iterate_width;
	  if($(this.wrapper).hasClass('videolists-list-carousel') === true &&  this.current_iterate + this.display_item_count >= this.total_iterate){
		   this.current_left = this.carousal_width - this.carousal_container_width;
	  }
	  if(this.current_iterate < this.total_iterate){
		  var current_left = this.current_left + 1 ;
		$($(this.wrapper).find('.carousel-active .js-list-inline')).stop().animate({left: '-' + current_left + 'px'},  1000 , 'swing');
	  } else {
		  if (!this.options.loop && this.x === this.maxX) {return;}
			this.directionX = -1;
			this.x -= 1;
		  this.__checkPosition();
	  }
	} else {
		if (!this.options.loop && this.x === this.maxX) {return;}
		this.directionX = -1;
		this.x -= 1;
		this.__checkPosition();
	}
  },
  //Added: To handle sliding previous in carousal for responsive
__handleResponsivePrev: function () {
	if(this.__isResponsive()){
	  var has_current_left = $(this.wrapper).find('.carousel-active .js-list-inline').css('left');
	  if(has_current_left && has_current_left !== 'auto' && has_current_left !== '0px'){
			this.current_iterate = this.current_iterate - this.display_item_count ;
			this.current_left = this.current_iterate * this.iterate_width;
			if(this.current_left <= 0){
				$($(this.wrapper).find('.carousel-active .js-list-inline')).stop().animate({left: '0px'},  1000 , 'swing');
			} else {
				$($(this.wrapper).find('.carousel-active .js-list-inline')).stop().animate({left: '-' + this.current_left + 'px'},  1000 , 'swing');
		   }
	  } else {
			if (!this.options.loop && this.x === 0){ return;}
			this.directionX = 1;
			this.x += 1;
		  this.__checkPosition();
	  }

	} else {
		if (!this.options.loop && this.x === 0){ return;}
		this.directionX = 1;
		this.x += 1;
		this.__checkPosition();
	}
  },
  //Added: To find responsive window means if ul width greater than visible parent width
  __isResponsive: function(){
	var w = $(window).width();
	if(w < 1263){
	 return true;
	}
	return false;
  },
  //Added: To show loader in single page load case especially in mobile
  _addLoader: function(is_enable){
	  if(is_enable === true){
		if($(this.wrapper).find('.carousel-active .js-list-inline li').length === 0){
		  $(this.slider).addClass('invisible');
		  $(this.wrapper).prepend('<div class="ajax-loader"></div>');
		}
	  } else {
		  $(this.wrapper).find('.ajax-loader').remove();
		  $(this.slider).removeClass('invisible');
		  
	  }
  },
  __checkPosition: function () {
    this.refreshSize();
    var pageFlip,
      pageFlipIndex,
      className;
	this.current_left = 0;

    this.masterPages[this.currentMasterPage].className = this.masterPages[this.currentMasterPage].className.replace(/(^|\s)carousel-active(\s|$)/, ' ');
    // Flip the page
    if (this.directionX > 0) {
		
	  this.page = -Math.ceil(this.x / this.pageWidth);
      this.currentMasterPage = (this.options.numberOfDivsOnEachSide + ((this.page) % this.numDivs)) % this.numDivs;
      this.pageIndex = this.pageIndex === 0 ? this.options.numberOfPages - 1 : this.pageIndex - 1;

      pageFlip = this.currentMasterPage - 1;
      pageFlip = pageFlip < 0 ? this.numDivs - 1 : pageFlip;
	  //Changed: To set page number for 0 number of divs in each side
	  if(this.options.numberOfDivsOnEachSide !== 0){
      	this.masterPages[pageFlip].style.left = this.page * 100 - 100 + '%';
		pageFlipIndex = this.page - 1;
		//Changed: To find the previuos and next div in case of 1 div in each side.
		this.prev_div = pageFlip;
		for (var i=0; i<this.numDivs; i++) {
			if(i !== this.currentMasterPage && i !== pageFlip){
				this.next_div = i;
			}
		}
	  } else {
		pageFlipIndex = this.page;
		this._addLoader(true);
	 }
    } else {
      this.current_iterate = 0;
	  this.page = -Math.floor(this.x / this.pageWidth);
      this.currentMasterPage = (this.options.numberOfDivsOnEachSide + ((this.page) % this.numDivs)) % this.numDivs;
      this.pageIndex = this.pageIndex === this.options.numberOfPages - 1 ? 0 : this.pageIndex + 1;
      pageFlip = this.currentMasterPage + 1;
      pageFlip = pageFlip > (this.numDivs - 1) ? 0 : pageFlip;
      this.masterPages[pageFlip].style.display = '';
	  //Changed: To set page number for 0 number of divs in each side
	  if(this.options.numberOfDivsOnEachSide !== 0){
      	this.masterPages[pageFlip].style.left = this.page * 100 + 100 + '%';
      	pageFlipIndex = this.page + 1;
		//Changed: To find the previuos and next div in case of 1 div in each side. Need to change if more than 3 div load at a time
		this.next_div = pageFlip;
		for (var i=0; i<this.numDivs; i++) {
			if(i !== this.currentMasterPage && i !== pageFlip){
				this.prev_div = i;
			}
		}
	  } else {
		pageFlipIndex = this.page;
		this._addLoader(true);
	  }
    }
	this.masterPages[this.currentMasterPage].setAttribute("data-page", this.page);
    // Add active class to current page
    className = this.masterPages[this.currentMasterPage].className;
    if(!/(^|\s)carousel-active(\s|$)/.test(className)) {
      this.masterPages[this.currentMasterPage].className = !className ? ' carousel-active' : className + ' carousel-active';
    }
	if(this.isHandleReponsiveInCarousel === true){
		this.__setContainerWidth();
	}
    this.masterPages[this.currentMasterPage].style.visibility = '';

    // Add loading class to flipped page
    className = this.masterPages[pageFlip].className;
    if(!/(^|\s)carousel-loading(\s|$)/.test(className)) {
      this.masterPages[pageFlip].className = !className ? ' carousel-loading' : className + ' carousel-loading';
    }

    pageFlipIndex = pageFlipIndex - Math.floor(pageFlipIndex / this.options.numberOfPages) * this.options.numberOfPages;
    $(this.masterPages[pageFlip]).data('upcomingPageIndex', pageFlipIndex);		// Index to be loaded in the newly flipped page

    var newX = -this.page * this.pageWidth;

    // Hide the next page if we decided to disable looping
    if (!this.options.loop && this.options.numberOfDivsOnEachSide !== 0) {
      this.masterPages[pageFlip].style.visibility = newX === 0 || newX === this.maxX ? 'hidden' : '';
    }
	//Changed: To set left while sliding previous item in responsive
	if(this.__isResponsive() && this.directionX > 0){
	  this.current_iterate = this.total_item_iterate - this.display_item_count ;
	  this.current_left = this.current_iterate * this.iterate_width;
	  if(this.options.numberOfDivsOnEachSide !== 0){
		if($(this.wrapper).hasClass('videolists-list-carousel') === true &&  this.current_iterate + this.display_item_count >= this.total_iterate){
			 this.current_left = this.carousal_width - this.carousal_container_width;
		}
		$($(this.wrapper).find('.carousel-active .js-list-inline')).stop().animate({left: '-' + this.current_left + 'px'},  1000, 'swing');
	  }
	}
    this.__pos(newX);
    if (this.options.hastyPageFlip) {
      this.__flip();
    }
	//Changed: To fix the carousel previous not working properly, alternative div run above the current active div
	if(this.__isResponsive() && this.options.numberOfDivsOnEachSide !== 0){
		var temp_current_left = ((this.total_item_iterate - this.display_item_count) * this.iterate_width ) + 1;
		if($(this.wrapper).hasClass('videolists-list-carousel') === true &&  this.current_iterate + this.display_item_count >= this.total_iterate){
			 temp_current_left = this.carousal_width - this.carousal_container_width;
		}
		$(this.masterPages[this.prev_div]).find('.js-list-inline').css('left', '-' + temp_current_left + 'px');
		$(this.masterPages[this.next_div]).find('.js-list-inline').css('left', '0px');
		$(this.masterPages[this.currentMasterPage]).find('.js-list-inline').css('left', '0px');
   }
  },

  __flip: function () {
    this.__event('flip');

    for (var i=0; i<this.numDivs; i++) {
      this.masterPages[i].className = this.masterPages[i].className.replace(/(^|\s)carousel-loading(\s|$)/, '');		// Remove the loading class
      $(this.masterPages[i]).data('pageIndex', $(this.masterPages[i]).data('upcomingPageIndex'));
    }
  },

  __reset: function () {
    this.__event('reset');

    for (var i=0; i<this.numDivs; i++) {
      this.masterPages[i].className = this.masterPages[i].className.replace(/(^|\s)carousel-loading(\s|$)/, '');		// Remove the loading class
      $(this.masterPages[i]).data('pageIndex', $(this.masterPages[i]).data('upcomingPageIndex'));
    }
  },

  __event: function (type) {
    var ev = null;
    $(this.wrapper).trigger('carousel' + type);
  },
  //Added: To set width of ul to handle responsive
  __setContainerWidth: function(){
	  var w = $(window).width();
	  if(w < 1263){
		  var parentListWidth ;
		  var x = $(this.wrapper).find('.carousel-active .js-list-inline li.js-video-list').outerWidth(true);
		  var y = $(this.wrapper).find('.carousel-active .js-list-inline li.js-video-list').length;	
		   if((angular.isDefined(this.list_type) && this.list_type === 'multiple') && (y%2 === 1)){
			   y++;
		   }
		  parentListWidth = ((angular.isDefined(this.list_type) && this.list_type === 'multiple'))? (x * y)/2 : (x * y);
		  if(parentListWidth !== 0){
			  $(this.wrapper).find('.carousel-active .js-list-inline').css('width' , parentListWidth + 'px');
		  }
	  }
	  this.carousal_container_width = $(this.wrapper).width();
	  this.carousal_width = $(this.wrapper).find('.carousel-active .js-list-inline').width();
	  this.item_width = $(this.wrapper).find('.carousel-active .js-list-inline li.js-video-list').outerWidth(true);
  	  this.display_item_count = Math.round(this.carousal_container_width/this.item_width);
	  var xyz = $(this.wrapper).find('.carousel-active .js-list-inline li.js-video-list').length;
	  if(this.total_item_iterate === undefined){
		  this.total_item_iterate = (this.list_type === 'multiple')? xyz/2 : xyz;
	  }
	  if(this.__isResponsive() && this.options.numberOfDivsOnEachSide == 0 && ($(this.wrapper).hasClass('playlist-builder') === true) && this.current_left != 0 && this.directionX > 0 ){
		  $(this.wrapper).find('.carousel-active .js-list-inline').css('left','-'+this.current_left+'px')
	  }
	  this.total_iterate = (this.list_type === 'multiple')? xyz/2 : xyz;
	  
  }
};


angular.module('fundoo.directives', []).directive('carousel', ['$compile','$stateParams', '$timeout', 'deviceDetector', function($compile, $stateParams, $timeout, deviceDetector) {
  return {
    restrict: 'A',
    scope: {
      onPageUpcoming: '&',
      giveCarouselTo: '&'
    },
    terminal: true,
    compile: function(elem, attrs) {
      var carouselHtmlTemplate =  $compile(angular.element(elem.html()));

      elem.html('<div class="carousel-container"></div>');

      return function(scope, elem, attrs) {
        var carouselContainer = elem.find('>:first-child');
        carouselContainer.addClass(attrs.carouselClass);
		//Changed: To set number of divs in each side to set in mobile
		var _numberOfDivsOnEachSide = (angular.isDefined($stateParams.phantom)|| deviceDetector.isMobile() === true) ? 0 : 1;
        var carousel = new Carousel(carouselContainer[0], {numberOfPages: 1, loop: false, numberOfDivsOnEachSide: parseInt(_numberOfDivsOnEachSide)});
		
		//Changed: To set limit according to window size
		var w = $(window).width();
		if(carousel.list_type === 'single'){
			carousel.limit = 5;
			if(w < 1263 && w >= 1006){
				carousel.limit = 8;
			}
			if(w < 1006){
				carousel.limit = 6;
			}
		}
		if(carousel.list_type === 'multiple'){
			carousel.limit = 10;
			if(w < 1263 && w >= 1006){
				carousel.limit = 16;
			}
			if(w < 1006){
				carousel.limit = 12;
			}
		}
		
        var tmplCbFunction = function(index) {
          return function(scope) {
            carouselHtmlTemplate(scope, function(clonedElem) {
              if (carousel.masterPages[index].firstChild) {
                carousel.masterPages[index].replaceChild(clonedElem[0], carousel.masterPages[index].firstChild);
				carousel._addLoader(true);
				//Changed: To fix the carousel previous not working properly, alternative div run above the current active div
				if(carousel.__isResponsive() && index === carousel.prev_div && carousel.options.numberOfDivsOnEachSide !== 0){
					if($(carousel.wrapper).hasClass('videolists-list-carousel') === true &&  carousel.current_iterate + carousel.display_item_count >= carousel.total_iterate){
						carousel.current_left = carousel.carousal_width - carousel.carousal_container_width;
					}
					$(carousel.masterPages[index]).find('.js-list-inline').css('left', '-' + carousel.current_left + 'px');
				}
				if(carousel.options.numberOfDivsOnEachSide === 0){
					if(carousel.directionX > 0){
						carousel.current_iterate = carousel.total_item_iterate - carousel.display_item_count ;
						carousel.current_left = carousel.current_iterate * carousel.iterate_width;
						if($(carousel.wrapper).hasClass('videolists-list-carousel') === true &&  carousel.current_iterate + carousel.display_item_count >= carousel.total_iterate){
							carousel.current_left = carousel.carousal_width - carousel.carousal_container_width;
						}
					}
					$(carousel.masterPages[0]).find('.js-list-inline').css('left' , '-' + carousel.current_left + 'px');
				}
              } else {
                carousel.masterPages[index].appendChild(clonedElem[0]);
              }
            });
          };
        };
        var initialCarouselLoad = function() {
          var nonLoopPageCounter = 1;
          for (var i = -carousel.options.numberOfDivsOnEachSide; i <= carousel.options.numberOfDivsOnEachSide; i++) {
            var pageIndex;
            if (carousel.options.loop === true) {
              pageIndex = i < 0 ? carousel.options.numberOfPages + i : i;
            } else {
              pageIndex = i < 0 ? carousel.options.numberOfDivsOnEachSide + nonLoopPageCounter++ : i;
            }
            scope.onPageUpcoming({page: pageIndex, tmplCb: tmplCbFunction(i + carousel.options.numberOfDivsOnEachSide)});
          }
        };
        scope.giveCarouselTo({carousel: carousel});

		$timeout(function() {
	        initialCarouselLoad();
		});

        carousel.onReset(function() {
          initialCarouselLoad();
        });
        carousel.onFlip(function () {
          var upcoming, i;

          for (i=0; i < carousel.numDivs; i++) {
            upcoming = $(carousel.masterPages[i]).data('upcomingPageIndex');
            if (upcoming !== $(carousel.masterPages[i]).data('pageIndex')) {
              scope.onPageUpcoming({page: upcoming, tmplCb: tmplCbFunction(i)});
            }
          }
        });

        // Handle resizing of the page
        function resizeCarousel() {
			carousel.refreshSize();
			carousel.goToPage(carousel.page);
			if(carousel.options.numberOfDivsOnEachSide === 0){
				if(carousel.isHandleReponsiveInCarousel === true){
					carousel.__setContainerWidth();
				}
				if($(carousel.wrapper).hasClass('videolists-list-carousel') === true && carousel.current_iterate + carousel.display_item_count >= carousel.total_iterate){
					carousel.current_left = carousel.carousal_width - carousel.carousal_container_width;
					$(carousel.masterPages[0]).find('.js-list-inline').css('left' , '-' + carousel.current_left + 'px');
				}
			}
        }
        // The browser resize event is sent multiple times while a user is
        // dragging the browser to resize. So we do this stuff to ensure that
        // we only do a resize once the user has finished his resizing activities.
        var rtime = new Date(1, 1, 2000, 12, 0, 0);
        var timeout = false;
        var delta = 200;
        $(window).resize(function() {
          rtime = new Date();
          if (timeout === false) {
            timeout = true;
            setTimeout(resizeend, delta);
          }
        });
        function resizeend() {
          if (new Date() - rtime < delta) {
            setTimeout(resizeend, delta);
          } else {
            timeout = false;
            resizeCarousel();
          }
        }
      };
    }
  };
}]);