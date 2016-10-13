/* Authors */
var authors = require('./authors');

model.Author.controlMethods.newEntity = function(event) {
	event.entityStorage.element = {};
};

model.Author.controlMethods.saveEntity = function(event) {
	authors[event.entityStorage.element.ID] = event.entityStorage.element;
	saveData('authors.json', authors);
};

model.Author.controlMethods.setAttributeValue = function(event) {
	var element = event.entityStorage.element;
	element[event.attributeName] = event.value;
	event.entityStorage.element = element;
};

model.Author.controlMethods.allEntities = function(event) {
    event.collectionStorage.elements = Object.keys(authors);
};

model.Author.controlMethods.getCollectionLength = function(event) {
    return event.collectionStorage.elements.length;
};

model.Author.controlMethods.getEntityByKey = function(event) {
    var key = event.key[0];
    var element = authors[key];
    
    if (element) {
        event.entityStorage.element = element;  
        return true;
    }  

    return false;
};

model.Author.controlMethods.getEntityByPos = function(event) {
    var key = event.collectionStorage.elements[event.position];
    var element = authors[key];
    
    if (element) {
        event.entityStorage.element = element;
        return true;
    }
    
    return false;
};

model.Author.controlMethods.getAttributeValue = function(event) {
	if(event.attribute.kind === 'relatedEntity') {
		if(event.onlyLightValue){
            return { deferred: true };
        } else {     	
        	var relatedEntityID = event.entityStorage.element[event.attributeName];
        	var entity = relatedEntityID ? event.attribute.relatedDataClass(relatedEntityID): null;
        	return entity;
        }
	} else if(event.attribute.kind === 'relatedEntities') {
		
		if(event.onlyLightValue) {
			return { deferred: true };
		}

		var relatedAttName = null;
		if (event.attributeName === 'books') {
			relatedAttName = 'author';
		}

		if (relatedAttName != null) {
			var res = [];
			for (var e in books) {
				var book = books[e];
				if (book[relatedAttName] == event.entityStorage.element.ID) {
					res.push(book.ID);
				}
			}
			
			return event.attribute.relatedDataClass.query(JSON.stringify(res));
		}
		
		return null;
		
	} else {
		return event.entityStorage.element[event.attributeName];
	}            
};

model.Author.controlMethods.newCollection = function(event) {
    event.collectionStorage.elements = [];
}

model.Author.controlMethods.getRelatedKey = function(event) {
	return event.entityStorage.element[event.attributeName];
};

model.Author.controlMethods.addEntityToCollection = function(event) {
	var ID = event.entityStorage.element.ID;
	var arr = event.collectionStorage.elements;
	arr.push(ID);
	event.collectionStorage.elements = arr;
};  


/*
* Books 
*/
var	books = require('./books');
//var booksIDs = Object.keys(books);	


model.Book.controlMethods.newEntity = function(event) {
	event.entityStorage.element = {};
};

model.Book.controlMethods.saveEntity = function(event) {
	books[event.entityStorage.element.ID] = event.entityStorage.element;
	saveData('books.json', books);
};

model.Book.controlMethods.setAttributeValue = function(event) {
	var element = event.entityStorage.element;
	element[event.attributeName] = event.value;
	event.entityStorage.element = element;
};

model.Book.controlMethods.queryByString = function(event) {
	if (event.queryString != "" && event.queryString[0] === '[')
	{
		var ids = JSON.parse(event.queryString);
		event.collectionStorage.elements = ids;
		return true;
	}
	else
		return false;
}

model.Book.controlMethods.allEntities = function(event) {
    event.collectionStorage.elements = Object.keys(books);
}

model.Book.controlMethods.getCollectionLength = function(event) {
    return event.collectionStorage.elements.length;
};

model.Book.controlMethods.getEntityByKey = function(event) {
    var key = event.key[0];
    var element = books[key];
    
    if (element) {
        event.entityStorage.element = element;  
        return true;
    }
    
    return false;
};

model.Book.controlMethods.getEntityByPos = function(event) {
    var key = event.collectionStorage.elements[event.position];
    var element = books[key];
    
    if (element) {
        event.entityStorage.element = element;        
        return true;
    }
    
    return false;
};

model.Book.controlMethods.getAttributeValue = function(event) {
	if(event.attribute.kind === 'relatedEntity') {
		if(event.onlyLightValue){
            return { deferred: true };
        } else {     	
        	var relatedEntityID = event.entityStorage.element[event.attributeName];
        	var entity = relatedEntityID ? event.attribute.relatedDataClass(relatedEntityID): null;
        	return entity;
        }
	} else if(event.attribute.kind === 'relatedEntities') {
		if(event.onlyLightValue) {
			return { deferred: true };
		}
		
		return null;
	} else {
		return event.entityStorage.element[event.attributeName];
	}          
};

model.Book.controlMethods.newCollection = function(event) {
    event.collectionStorage.elements = [];
}

model.Book.controlMethods.getRelatedKey = function(event) {
	return event.entityStorage.element[event.attributeName];
};

model.Book.controlMethods.addEntityToCollection = function(event) {
	var ID = event.entityStorage.element.ID;
	var arr = event.collectionStorage.elements;
	arr.push(ID);
	event.collectionStorage.elements = arr;
};

/*
 * tools
 */
 function saveData(fileName, content) {
 	var absolutePath = '/PROJECT/models/publication/' + fileName;
 	saveText(JSON.stringify(content, null, 2), absolutePath);
 }