'use strict';

treeherder.factory('thResultSets',
                   ['$http', '$location', 'thUrl', 'thServiceDomain',
                   function($http, $location, thUrl, thServiceDomain) {

    // get the resultsets for this repo
    return {
        getResultSets: function(offset, count, resultsetlist) {
            offset = typeof offset === 'undefined'?  0: offset;
            count = typeof count === 'undefined'?  10: count;
            var params = {
                offset: offset,
                count: count,
                full: false,
                format: "json"
            };

            // if there are any search params on the url line, they should
            // pass directly to the set of resultsets.
            _.extend(params, $location.search());

            if (resultsetlist) {
                _.extend(params, {
                    offset: 0,
                    count: resultsetlist.length,
                    id__in: resultsetlist.join()
                });
            }
            return $http.get(thUrl.getProjectUrl("/resultset/"),
                             {params: params}
            );
        },
        get: function(uri) {
            return $http.get(thServiceDomain + uri, {params: {format: "json"}});
        }
    };
}]);