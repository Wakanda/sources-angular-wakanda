/*
* This file is part of Wakanda software, licensed by 4D under
*  (i) the GNU General Public License version 3 (GNU GPL v3), or
*  (ii) the Affero General Public License version 3 (AGPL v3) or
*  (iii) a commercial license.
* This file remains the exclusive property of 4D and/or its licensors
* and is protected by national and international legislations.
* In any event, Licensee's compliance with the terms and conditions
* of the applicable license constitutes a prerequisite to any use of this file.
* Except as otherwise expressly stated in the applicable license,
* such license does not include any other license or rights on this file,
* 4D's and/or its licensors' trademarks and/or other proprietary rights.
* Consequently, no title, copyright or other proprietary rights
* other than those specified in the applicable license is granted.
*/

// Create and return the require() function.

(function () {

	// List of "native" C++ implemented modules.

	var	nativeModules = {};
	
	// RegExp defintions.
	
	var	jsSuffix	= /\.js$/;
	var	jsonSuffix	= /\.json$/;
	var drivePrefix	= /^[a-zA-Z]:$/;	// Support Windows paths.

	// Exception declarations.
	
	var ExceptionCode = {
	
		INTERNAL_ERROR:					-1,	// Unable to find "require" object (defined from C++).
	
		CANNOT_PARSE_ID:				-2,	// Cannot parse id.
		
		PACKAGE_DOES_NOT_HAVE_MAIN:		-3,	// File "package.json" doesn't have "main" attribute.
		MAIN_NOT_RELATIVE_PATH:			-4,	// "main" must be a relative path.
		
		CANNOT_READ_JSON:				-5,	// Cannot read JSON file.
		JSON_SYNTAX_ERROR:				-6,	// JSON file has syntax error.

		RESOLVED_FILE_NOT_FOUND:		-7, // Resolved file not found.
		NO_JS_OR_JSON_FILE:				-8,	// Cannot find ".js" or ".json" file.
		
		UNABLE_TO_RESOLVE_ID:			-9,	// Unable to resolve id.
	
	}
	
	var Exception = function (code, string) {

		this.code = code;
		this.string = string;
		
		this.toString = function () {
		
			switch (this.code) {
			
				case ExceptionCode.INTERNAL_ERROR:				return "Internal error, cannot find \"require\" object!\n";
				case ExceptionCode.CANNOT_PARSE_ID:				return "Cannot parse id \"" + this.string + "\"!";
				case ExceptionCode.PACKAGE_DOES_NOT_HAVE_MAIN:	return "JSON file \"" + this.string + "\" doesn't have \"main\" attribute!";
				case ExceptionCode.MAIN_NOT_RELATIVE_PATH:		return "\"main\" attribute \"" + this.string +"\" must be a relative path from root folder!";
				case ExceptionCode.CANNOT_READ_JSON_PACKAGE:	return "Cannot read \"" + this.string + "\"!";
				case ExceptionCode.JSON_SYNTAX_ERROR:			return "\"" + this.string + "\" has syntax error!";
				case ExceptionCode.RESOLVED_FILE_NOT_FOUND:		return "Resolved file \"" + this.string + "\" not found!";
				case ExceptionCode.NO_JS_OR_JSON_FILE:			return "Cannot find \"" + this.string + ".js\" or \"" + this.string + ".json\"!";
				case ExceptionCode.UNABLE_TO_RESOLVE_ID:		return "Unable to resolve \"" + this.string + "\"!";
				
			}
		
		}
	
	}
		
	// All loaded modules are given an unique identifier, which is the full path of the ".js" or ".json" file.
	// It is used to index the loaded and pending modules associative arrays.

	var	loadedModules	= {};
	var pendingModules	= {};
	
	// require() function definition.

	var requireFunction = function (id) {
			
		// C++ code must check that id is a string and that it is non empty.
	
		// Handle "native" C++ modules.
	
	    if (id in nativeModules) {

	        return nativeModules[id];

	    }  else {

	        var moduleObject = requireNative(id);

	        if (moduleObject != null) {

	            nativeModules[id] = moduleObject;
	            return moduleObject;
	        }

	    }
		
		// Resolve id.
		
		if (id == "")
		
			throw new Exception(ExceptionCode.UNABLE_TO_RESOLVE_ID, id);
		
	
		var fullPath, uniqueId;
		var error	= {};

		fullPath = uniqueId = resolveId(id, error);
		if (typeof error.exception != "undefined") {
		
			throw error.exception;
		
		} else if (typeof loadedModules[uniqueId] != "undefined") {
		
			// Module is already loaded, return it from the cache.
						
			return loadedModules[uniqueId];
		
		} else if (typeof pendingModules[uniqueId] != "undefined") {
		
			// Module loading is pending (recursive call), return "ongoing" exported module.
			
			return pendingModules[uniqueId];
		
		} else if (fullPath.search(jsonSuffix) != -1) {
		
			// Module is a JSON file.
			
			var loadedModule;
					
			loadedModule = loadJSON(fullPath, error);
			if (typeof error.exception != "undefined")
			
				throw error.exception;
			
			else {
			
				loadedModules[uniqueId] = loadedModule;
				return loadedModule;
				
			}
		
		} else {

			// Loading JavaScript module, use a closure.

			return (function () {
			
				var	exports	= {};
				var module 	= {};
			
				module.id = fullPath.substring(0, fullPath.length - 3);
				module.uri = "file://" + fullPath;
				module.filename = fullPath;
				module.loaded = false;
				module.exports = exports;
			
				pendingModules[uniqueId] = exports;
					
				// Native function require._evaluate() will evaluate script file.
				
				require._evaluate(fullPath, exports, module);
				
				if (typeof module.exports != "undefined")
			
					exports = module.exports;
			
				else
			
					module.exports = exports;
				
				delete pendingModules[uniqueId];
				loadedModules[uniqueId] = exports;
			
				module.loaded = true;
			
				return loadedModules[uniqueId];
			
			}).call();
		
		}
		
	}
		
	// Resolve the id into the full path of a JavaScript file and return it.
		
	var resolveId = function (id, error) {
	
		var splitted;
	
		if ((splitted = id.split('/')) == null) {
	
			error.exception = new Exception(ExceptionCode.CANNOT_PARSE_ID, id);
			return null;
	
		} else if (splitted[0] == '.') {
		
			// Relative path from current path.
		
			return resolvePath(require._getCurrentPath() + id.slice(2), error);
			
		} else if (splitted[0] == '..') {
		
			// Relative path from current path parent.
		
			var	parent, lastIndex;
			
			parent = require._getCurrentPath();
			lastIndex = parent.slice(0, parent.length - 1).lastIndexOf('/');
						
			return resolvePath(parent.slice(0, lastIndex) + id.slice(2), error);

		} else if (splitted[0] == '' || splitted[0].search(drivePrefix) != -1) {

			// Absolute path.
					
			return resolvePath(id, error);
	
		} else {
		
			// Iterate require.paths[] to resolve relative id.
			
			if (typeof require.paths != "undefined" && require.paths instanceof Array) {
			
				for (var i = require.paths.length - 1; i >= 0 ; i--) {
			
					var	path;
					
					if (typeof require.paths[i] != "string") {
					
						continue;
						
					}
					
					if (require.paths[i].charAt(require.paths[i].length - 1) != '/') {
				
						require.paths[i] = require.paths[i].concat('/');
					
					}
							
					var e	= {};
					
					path = resolvePath(require.paths[i] + id, e);
					if (typeof e.exception != "undefined")
					
						continue;
						
					else
					
						return path;
				
				}
				
			}			
			error.exception = new Exception(ExceptionCode.UNABLE_TO_RESOLVE_ID, id);
			return null;
			
		}
		
	}
			
	// Resolve path to a JavaScript or JSON file. Determine if it is a folder or file. 
	// If it is a folder, then first resolve to a file using package.json or index.js. 
	// Then check that file actually exists. Return full path of a ".js" or ".json" 
	// file.
			
	var resolvePath = function (path, error) {

		// If path is a folder. Try to find "package.json", otherwise use "index.js".
		// File existence will be checked below.
	
		if (isFolder(path)) {
		
			var folderPath	= path;
		
			if (folderPath.charAt(folderPath.length - 1) != '/')
			
				folderPath = folderPath.concat('/');
		
			if (isFile(folderPath + "package.json")) {
			
				var content;
				
				content = loadJSON(folderPath + "package.json", error);
				if (typeof error.exception != "undefined") {
			
					// JSON parsing failed, pass error.exception from loadJSON(). 
					
					return null;
				
				} else if (typeof content.main != "string") {
				
					error.exception = new Exception(ExceptionCode.PACKAGE_DOES_NOT_HAVE_MAIN, folderPath + "package.json");
					return null;
									
				} else if (content.main.charAt(0) != '.' || content.main.charAt(1) != '/') {
				
					// "main" must be a relative path.
					
					error.exception = new Exception(ExceptionCode.MAIN_NOT_RELATIVE_PATH, content.main);
					return null;
				
				} else {
				
					path = folderPath + content.main.slice(2);
				
				}
			
			} else if (isFile(folderPath + "index.js")) {
			
				path = folderPath + "index.js";
			
			} else {
			
				// No "package.js" or "index.js" file found, try to solve to file.
			
			}
			
		}
		
		// If path was a folder, it has been resolved to a file (using "package.json" or "index.js").
		// If file path has no suffix, first try ".js", then ".json".
		
		if (path.search(jsSuffix) != -1) {
		
			if (isFile(path)) 
			
				return path;
				
			else {
			
				error.exception = new Exception(ExceptionCode.RESOLVED_FILE_NOT_FOUND, path);
				return null;
				
			}
		
		} else if (path.search(jsonSuffix) != -1) {
		
			if (isFile(path)) 
			
				return path;
				
			else {

				error.exception = new Exception(ExceptionCode.RESOLVED_FILE_NOT_FOUND, path);
				return null;
				
			}
		
		} else if (isFile(path + ".js")) {
		
			return path + ".js";
			
		} else if (isFile(path + ".json")) {
		
			return path + ".json";
		
		} else {
		
			error.exception = new Exception(ExceptionCode.NO_JS_OR_JSON_FILE, path);
			return null;
		
		}
		
	}
		
	// Read a JSON file at given full path.
	
	var loadJSON = function (fullPath, error) {
	
		var json, content;
	
		try {
		
			var	file, stream;
				
			file = new File(fullPath);
			stream = new TextStream(file);
				
			json = stream.read();		
			
		} catch (e) {
		
			error.exception = new Exception(ExceptionCode.CANNOT_READ_JSON, fullPath);
			return null;
		
		}
				
		try {
		
			content = JSON.parse(json);
		
		} catch (e) {
		
			error.exception = new Exception(ExceptionCode.JSON_SYNTAX_ERROR, fullPath);
			return null;
		
		}
				
		return content;
		
	}
		
	// Return true if path is a folder and exists.
	
	var isFolder = function (path) {

		return (new Folder(path)).exists;

	}	

	// Return true if path is a file and exists.

	var isFile = function (path) {

		return (new File(path)).exists;
		
	}
	
	return requireFunction;

}).call();	