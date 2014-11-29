/**
 * @param String a
 * @param String b
 * @return Array
 */
function levenshteinenator(a, b) {
    var cost;
    var m = a.length;
    var n = b.length;

    // make sure a.length >= b.length to use O(min(n,m)) space, whatever that is
    if (m < n) {
        var c = a; a = b; b = c;
        var o = m; m = n; n = o;
    }

    var r = []; r[0] = [];
    for (var c = 0; c < n + 1; ++c) {
        r[0][c] = c;
    }

    for (var i = 1; i < m + 1; ++i) {
        r[i] = []; r[i][0] = i;
        for ( var j = 1; j < n + 1; ++j ) {
            cost = a.charAt( i - 1 ) === b.charAt( j - 1 ) ? 0 : 1;
            r[i][j] = minimator( r[i-1][j] + 1, r[i][j-1] + 1, r[i-1][j-1] + cost );
        }
    }

    return r;
}

/**
 * Return the smallest of the three numbers passed in
 * @param Number x
 * @param Number y
 * @param Number z
 * @return Number
 */
function minimator(x, y, z) {
    if (x < y && x < z) return x;
    if (y < x && y < z) return y;
    return z;
}

function levenshteinStringDistance(s1, s2) {
    var distArray = levenshteinenator(s1, s2);
    return distArray[ distArray.length - 1 ][ distArray[ distArray.length - 1 ].length - 1 ];
}

function stringDistance(s1, s2) {
    if(s1 == null ||
       s1 == undefined ||
       s2 == null ||
       s2 == undefined)
        return 1000;    // return very high distance

    var d1 = levenshteinStringDistance(s1, s2);
    var d2 = levenshteinStringDistance(s1, s2.substring(0, s1.length));
    var d3 = levenshteinStringDistance(s1.substring(0, s2.length), s2);

    return Math.min(d1, Math.min(d2, d3));
}
