var testHelpers = {
	db : {
		flush : function() {

			var publicationSize = initPublicationCatalogFiles();
			
			// A simple log for the output
			var log = "Count employees-before: " + ds.Employee.length + ", Count companies-before: " + ds.Company.length + ", Count products-before: " + ds.Product.length;
			log += ", Count authors-before: " + publicationSize.before.authors + ", Count books-before: " + publicationSize.before.books;

			// A JSON object for output
			var result = {
				'before' : {
					'employees' : ds.Employee.length,
					'companies' : ds.Company.length,
					'products' : ds.Product.length,
					'authors': publicationSize.before.authors,
					'books': publicationSize.before.books
				}
			};
			
			function doTruncateEmpsAndComps(){
				if(ds.Employee.length > 0){
					var employees = ds.Employee.query("ID > 0");
					employees.forEach(function(employee,index){
						employee.remove();
					});
				}
				if(ds.Company.length > 0){
					var companies = ds.Company.query("ID > 0");				
					companies.forEach(function(company,index){
						company.remove();
					});
				}
				if(ds.Product.length > 0){
					var products = ds.Product.query("ID > 0");				
					products.forEach(function(product,index){
						product.remove();
					});
				}
			};
			
			doTruncateEmpsAndComps();
			
			 // Log result
			log += " / Count employees-after: " + ds.Employee.length + ", Count companies-after: " + ds.Company.length + ", Count products-before: " + ds.Product.length;
			log += ", Count authors-after: " + publicationSize.after.authors + ", Count books-after: " + publicationSize.after.books;
			// A JSON object for output
			result['after'] = {
				'employees' : ds.Employee.length,
				'companies' : ds.Company.length,
				'products' : ds.Product.length,
				'authors': publicationSize.after.authors,
				'books': publicationSize.after.books
			};
			result['log'] = log;
			return result;
		},
		fill : function(){
			var publicationSize = initPublicationCatalogFiles();			
			// A simple log for the output
			var log = "Count employees-before: " + ds.Employee.length + ", Count companies-before: " + ds.Company.length + ", Count products-before: " + ds.Product.length;
			log += ", Count authors-before: " + publicationSize.before.authors + ", Count books-before: " + publicationSize.before.books;

			// A JSON object for output
			var result = {
				'before' : {
					'employees' : ds.Employee.length,
					'companies' : ds.Company.length,
					'products' : ds.Product.length,
					'authors': publicationSize.before.authors,
					'books': publicationSize.before.books
				}
			};

			// Main function
			function doImportEmpsAndComps() {
				/*	The doc. to import is in the solution folder, in a subfolder
					named "Import". We load the full document in one shot
					(loadText) and split it in an array (one line = one element).
				*/
				var lines = loadText(getFolder().path + '/backend/modules/import-data/contents/emps_comps.txt').split("\n");
				
				/*	Declare the variable that will hold the columns of each line
					We know the columns will be:
						columns[0]		Name of the company
						columns[1]		Last name of the employee
						columns[2]		First name
						columns[3]		Salary
						culumns[4]      birth Date
						culumns[5]		hiring Date 
				*/
				var columns = [];
				
				// Now, loop for each entry in the array
				lines.forEach( function(oneLine) {
					// Get the columns for current line
					columns = oneLine.split("\t");
					
					// Get the company. Create it if needed.
					var theComp = ds.Company.find("name = :1", columns[0]);
					if(theComp == null) { // Not found => create it
						theComp = new ds.Company({
							name : columns[0]
						});
						// Save it
						theComp.save();
					}
				  	
					// Get the employee. Create it if needed.
				  	var theEmp = ds.Employee.find("lastName = :1 and firstName = :2", columns[1], columns[2]);
				  	if(theEmp == null) {
						theEmp = new ds.Employee( {
							lastName	: columns[1],
							firstName	: columns[2],
							salary	: columns[3],
							employer	: theComp,	// This is how you bind two entities with Wakanda!
							birthDate: new Date(columns[4]),
							hiringDate: new Date(columns[5])
						});
					} else {
						theEmp.salary = columns[3];
						theEmp.employer = theComp;
						theEmp.birthDate = new Date(columns[4]);
						theEmp.hiringDate = new Date(columns[5]);
					}
					theEmp.save();
				});
			}
			// Call the function
			doImportEmpsAndComps();
			
			function doImportProducts(){
				/*	The doc. to import is in the solution folder, in a subfolder
					named "Import". We load the full document in one shot
					(loadText) and split it in an array (one line = one element).
				*/
				var lines = loadText(getFolder().path + '/backend/modules/import-data/contents/products.txt').split("\n");
				
				/*	Declare the variable that will hold the columns of each line
					We know the columns will be:
						columns[0]		Name of the product
						columns[1]		myBoolean
				*/
				var columns = [];
				
				// Now, loop for each entry in the array
				lines.forEach( function(oneLine) {
					// Get the columns for current line
					columns = oneLine.split("\t");
					
					// Get the company. Create it if needed.
					var theProduct = ds.Product.find("name = :1", columns[0]);
					if(theProduct == null) { // Not found => create it
						theProduct = new ds.Product({
							name : columns[0],
							myBoolean : columns[1],
							spec: {
								name: columns[0],
								myObject: {
									myBoolean: columns[1],
									myArray: [ { foo: 'bar' }, 'tata' ]
								},
								myArray: [ { foo: 'bar' }, 'tata' ]
							},
							photo: '/PROJECT/Images/' + (columns[1] ? 'apple.jpg' : 'lemon.jpg')
						});
						// Save it
						theProduct.save();
					}
				});
			}
			// Call the function
			doImportProducts();

			 // Log result
			log += " / Count employees-after: " + ds.Employee.length + ", Count companies-after: " + ds.Company.length + ", Count products-after: " + ds.Product.length;
			log += ", Count authors-after: " + publicationSize.after.authors + ", Count books-after: " + publicationSize.after.books;


			// A JSON object for output
			result['after'] = {
				'employees' : ds.Employee.length,
				'companies' : ds.Company.length,
				'products' : ds.Product.length,
				'authors': publicationSize.after.authors,
				'books': publicationSize.after.books
			};
			result['log'] = log;
			return result;
		},
		reset : function(){
			var flushResult = testHelpers.db.flush();
			var fillResult = testHelpers.db.fill();
			// A JSON object for output
			var result = {
				'before' : flushResult.before,
				'afterFlush' : flushResult.after,
				'after' : fillResult.after,
				'log' : flushResult.log + '\n' + fillResult.log
			};
			return result;
		},
		state : function(){
			var result = {
				'employees' : ds.Employee.length,
				'companies' : ds.Company.length,
				'products' : ds.Product.length
			};
			return result;
		}
	}
};

function initPublicationCatalogFiles() {
	var oldBooks = require('/PROJECT/models/publication/books.json');
	var oldAuthors = require('/PROJECT/models/publication/authors.json');
	var size = {
		before: {
			authors: Object.keys(oldAuthors).length,
			books: Object.keys(oldBooks).length
		}
	};
	var authors = require('/PROJECT/backend/modules/import-data/contents/authors.json');
	saveText(JSON.stringify(authors, null, 2), '/PROJECT/models/publication/authors.json');
	
	var books = require('/PROJECT/backend/modules/import-data/contents/books.json');
	saveText(JSON.stringify(books, null, 2), '/PROJECT/models/publication/books.json');
	
	var newBooks = require('/PROJECT/models/publication/books.json');
	var newAuthors = require('/PROJECT/models/publication/authors.json');
	
	size.after = {
		authors: Object.keys(newAuthors).length,
		books: Object.keys(newBooks).length
	};
	
	return size;
}

module.exports = testHelpers;
