window.onload = function() {
	var container = document.getElementById('container');
	/*container.masonry({

		itemSelector : '.item',
		colmnWidth : function( containerWidth ){

			return containerWidth / 4;

		}

	});*/
	var wall = new Masonry( container, {

		itemSelector : '.item',
		//columnWidth : 250,
		isAnimated : true,
		isFitWidth: true
		/*columnWidth : function( containerWidth ){

			return containerWidth / 4;

		}*/
	});
};
//});