function getDistanceLatLng (p1, p2) {

    var d_lat = Math.abs(p1.lat - p2.lat);
    var d_lng = Math.abs(p1.lng - p2.lng);
        return d_lat + d_lng;
}

function LatLngFromPoint ( x, y, z, r ) {

    var coordinate;
    var lat = 90 - (Math.acos(y / r)) * 180 / Math.PI;
    var lng = ((270 + (Math.atan2(x, z)) * 180 / Math.PI) % 360) - 180;
    if (lng < 0) {
        lng = (180 + lng);
        coordinate = {lat: lat, lng: lng};
        return coordinate;
    } else {
        lng = -(180 - lng);
        coordinate = {lat: lat, lng: lng};
        return coordinate;
    }
}

Object.size = function( obj ) {

   var size = 0, key;

   for ( key in obj ) {

       if ( obj.hasOwnProperty( key ) ) size++;

   }

   return size;

};

function findPoint ( countries , crd , callback ) {

    // console.log('made it to math')

    // console.log( Object.size( countries ) );

    var d, cur_d, info, country
        count = 0;

    for ( var i in countries ) {

        if ( typeof( d ) === 'undefined') {

            cur_d = d = this.getDistanceLatLng(countries[ i ].coordinate, crd);

            count ++ ;


        } else if (typeof(d) === 'number') {

            d = this.getDistanceLatLng(countries[ i ].coordinate, crd);

            count ++ ;

            if (cur_d > d) {

                cur_d = d;

                country = i
                info = (countries[ i ].info )
                info.name =  country

            }

        }

        if ( callback && typeof( callback ) === "function" && count == Object.size( countries ) ) callback( info );
    }

}