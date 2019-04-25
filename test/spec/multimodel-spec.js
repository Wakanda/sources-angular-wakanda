describe('$wakandaConfig provider', function () {
  var provider, $wakanda, unitTestsHelpers;
  beforeEach(module('wakanda', function($wakandaConfigProvider) {
    provider = $wakandaConfigProvider;
  }));

  beforeEach(module('unitTestsHelpersModule'));

  beforeEach(inject(function (_$wakanda_, _unitTestsHelpers_) {
    $wakanda = _$wakanda_;
    unitTestsHelpers = _unitTestsHelpers_;
    unitTestsHelpers.db.reset(false);
  }));

  it('should be a defined and an object', inject(function () {
    expect(provider).to.be.defined;
    expect(provider).to.be.an.object;
  }));

  it('should expose setCatalogName method', inject(function () {
    expect(provider.setCatalogName).to.be.a.function;
  }));

  it('should set the catalog name', inject(function () {
    provider.setCatalogName('publication');
    expect(provider.$get().getCatalogName()).to.be.equal('publication');
  }));
});


describe('Virtual model', function() {
  var provider, $wakanda, ds;
  beforeEach(function (done) {
    if(! $wakanda) {
      module('wakanda', function ($wakandaConfigProvider) {
        provider = $wakandaConfigProvider;
        provider.setCatalogName('publication');
      });

      inject(function (_$wakanda_) {
        $wakanda = _$wakanda_;
        done();
      });
    } else {
      done();
    }
  });

  beforeEach(function (done) {
    if (ds) {
      done();
    } else {
      $wakanda.init().then(function (_ds) {
        ds = _ds;
        done();
      });
    }
  });

  describe('Catalog DataClasses', function() {
    it('should exposes "publication" catalog DataClasses', function (done) {
      expect(ds.Book).to.be.not.undefined;
      expect(ds.Book).to.be.an.object;
      expect(ds.Author).to.be.not.undefined;
      expect(ds.Author).to.be.an.object;
      done();
    });

    it('should not exposes "main" catalog DataClasses', function (done) {
      expect(ds.Employee).to.be.undefined;
      expect(ds.Company).to.be.undefined;
      expect(ds.Product).to.be.undefined;
      done();
    });
  });

  describe('Dataclass API', function() {
    var bookID, book;
    before(function(done) {
      var books = ds.Book.$query({ pageSize: 1});
      books.$promise.then(function() {
        bookID = books[0].ID;
        book = books[0];
        done();        
      });
    });

    describe('$find method', function () {
      it('should retrieve an entity', function () {
        var book1 = ds.Book.$find(bookID);
        return book1.$promise.then(function () {
          expect(book1).to.be.an('object');
          expect(parseInt(book1.$key())).to.be.equal(bookID);
          expect(book1.ID).to.be.equal(bookID);
          expect(book1.title).to.be.a('string');
          expect(book1.author).to.be.an('object');
        });
      });

      it('should not expand related attributes by default', function () {
        expect(book.author.ID).to.be.defined;
        expect(book.author.firstName).to.be.null;
      });

      it('should expand related attributes provided on select parameter', function () {
        var book1 = ds.Book.$find(bookID, { select: 'author' });
        return book1.$promise.then(function () {
          expect(book1.author.ID).to.be.defined;
          expect(book1.author.firstName).to.be.a.string;
        });
      });
    });

    describe('$query method', function() {
      it('should retrieve a collection of entity', function () {
        return ds.Book.$query({ filter: 'ID > 1' }).$promise.then(function (collection) {
          expect(collection.result).to.be.an('array');
        });
      });

      it('should not expand related entities by default', function () {
        return ds.Book.$query({ filter: 'ID > 1' }).$promise.then(function (collection) {
          var book = collection.result[0];
          expect(book).to.be.an('object');
          expect(book.author).to.be.an('object');
          expect(book.author.firstName).to.be.null;
        });
      });

      it('should retrieve at most pageSize entity', function () {
        return ds.Book.$query({ pageSize: 5 }).$promise.then(function (collection) {
          expect(collection.result.length).to.be.at.most(5);
        });
      });
    });

    describe('Entity API', function () {
      describe('$save method', function () {
        it('should store the given attributes', function () {
          var entity = ds.Book.$create({
            title: 'JavaScript The Good Parts',
            ID: 20
          });

          return entity.$save().$promise.then(function () {
              expect(entity.ID).to.be.a('number');
              expect(entity.title).to.be.equal('JavaScript The Good Parts');
            });
        });
      });

      it('should store related entity', function () {

        return ds.Author.$query({ pageSize: 1, filter: 'lastName = :1', params: ['Camus'] })
          .$promise.then(function (authors) {
            return authors.result[0];
          })
          .then(function (author) {
            var entity = ds.Book.$create({
              title: 'Le premier homme',
              author: author,
              ID: 40
            });

            return entity.$save().$promise.then(function () {
              expect(entity.author).to.be.an('object');
              expect(entity.author.$key()).to.be.equal(author.$key());
            });
          });
      });
    });

    describe('Collection API', function () {
      describe('$fetch method', function () {
        var collection;
        beforeEach(function () {
          return ds.Author.$query({ pageSize: 5 }).$promise.then(function (c) {
            collection = c;
          });
        });

        it('should fetch a deferred collection', function () {
          var books = collection.result[0].books;

          expect(books.length).to.be.equal(0);
          return books.$fetch().$promise.then(function () {
            expect(books).to.have.length.of.at.least(1);
          });
        });

        it('should retrieve at most pageSize entities', function () {
          var books = collection.result[0].books;
          return books.$fetch({ pageSize: 2 }).$promise.then(function () {
            expect(books).to.have.length.of.at.most(2);
          });
        });
      });
    });
  });
});