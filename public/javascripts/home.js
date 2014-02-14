(function(){

	if (document.getElementById('selectForm')){

		document.getElementById('selectForm').addEventListener('submit', function(e){

			e.preventDefault();

			window.location.href = '/' + document.getElementById('selector').value;

		}, false);

	}

})();
