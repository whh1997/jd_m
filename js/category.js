window.onload = function(){
	new IScroll(document.querySelector('.jd_conLeft'),{
        scrollX:false,
        scrollY:true
    });
    new IScroll(document.querySelector('.jd_conRight'),{
        scrollX:true,
        scrollY:false
    });
}
