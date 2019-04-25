var wakanda = angular.module('wakanda');

wakanda.factory('mediaFactory', ['rootScopeSafeApply', '$q',
  function (rootScopeSafeApply, $q) {
    var mediaFactory = {};

    function NgMedia(media) {
      Object.defineProperty(this, '$_media', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: media
      });

      Object.defineProperty(this, 'uri', {
        enumerable: true,
        configurable: false,
        get: function () {
          return this.$_media.uri;
        },
        set: function () {
          throw new Error('Can\'t set media uri.');
        }
      });
    }

    NgMedia.prototype.$upload = upload;
    NgMedia.prototype.$remove = remove;

    function upload(file) {
      var promise = this.$_media.upload(file, file.type).then(function (res) {
        var deferred = $q.defer();
        rootScopeSafeApply(function () {
          deferred.resolve({
            result: res
          });
        });
      });

      promise.$promise = promise;
      return promise;
    }

    function remove() {
      var promise = this.$_media.delete().then(function (res) {
        var deferred = $q.defer();
        rootScopeSafeApply(function () {
          deferred.resolve({
            result: res
          });
        });
      });

      promise.$promise = promise;
      return promise;
    }

    mediaFactory.createNgMedia = function (media) {
      return new NgMedia(media);
    };

    return mediaFactory;
  }]);
