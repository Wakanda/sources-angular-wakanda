
exports.postMessage = function(message) {
    
    var serviceFile = new File(module.filename);
    var handlerFile = new File(serviceFile.parent, "./handlers.js");
    
    switch(message.name){
        case "httpServerDidStart":
            httpServer.addRequestHandler('^/unit-tests/db/flush$',handlerFile.path,'db_flush');
			httpServer.addRequestHandler('^/unit-tests/db/fill$',handlerFile.path,'db_fill');
			httpServer.addRequestHandler('^/unit-tests/db/reset$',handlerFile.path,'db_reset');
			httpServer.addRequestHandler('^/unit-tests/db/state$',handlerFile.path,'db_state');

			directory.setLoginManager('login', 'Employee');
            break;
    }
}
