(function(){
    window.registration = function() {
        let form = this.parentElement;
        let data = new FormData(form);
        let pas = document.getElementById("password").value;
        let conf_pas = document.getElementById("confirm_password").value;
        data.append("REGISTRATION", "true");
        if (form.checkValidity() && pas == conf_pas) {
            sendXml( "../PHP/mainPHP.php", "post", data).then(function(req){
                if (req != ''){
                    alert(req);
                    /*req = JSON.parse(req);
                    let errorText = '';
                    for (let i = 0; i < req.length; i++)
                        errorText += req[i] + '\n';
                    alert(errorText);
                    */
                }
                else location.href = '../profile/';
            });   
        }
    }

    let destruct = function(){
		delete window.registration;
    }
    
    if(window.destructModule!= undefined){
		window.destructModule.push(destruct);
	}else{
		window.destructModule = [];
		window.destructModule.push(destruct);
	}
})();