function _phase(t) {

    var l0 = 318.351648;
    var P0 = 36.340410;
    // doesn't seem used
    // var N0 = 318.510107;

    var omegabarg = 282.768422;
    var epsilong = 279.403303;
    var e_sun = 0.016713;

    var D = t - 2447891.5 + 55 / 86400;
    var l = 13.1763966 * D + l0;


    var M_sun = 360 / 365.242191 * D + epsilong - omegabarg;
    var v = M_sun + 360 / Math.PI * e_sun * Math.sin(0.017453293 * M_sun);

    var lambda_sun = v + omegabarg;
    var C = l - lambda_sun;


    var M_moon = l - 0.1114041 * D - P0;
    var Ev = 1.2739 * Math.sin(0.017453293 * (2 * C - M_moon));
    var Ae = 0.1858 * Math.sin(0.017453293 * M_sun);
    var A3 = 0.37 * Math.sin(0.017453293 * M_sun);

    var M_moon1 = M_moon + Ev - Ae - A3;
    var Ec = 6.2886 * Math.sin(0.017453293 * M_moon1);
    var A4 = 0.214 * Math.sin(0.017453293 * 2 * M_moon1);
    var l1 = l + Ev + Ec - Ae + A4;
    var V = 0.6583 * Math.sin(0.017453293 * 2 * (l1 - lambda_sun));
    var l2 = l1 + V;

    var moon_phase = l2 - lambda_sun;
    var mphase = (moon_phase - 360 * Math.floor(moon_phase / 360));

    return Math.round(mphase / 13.846154)
}

function compute_image_id(date) {
    var y = parseFloat(date.getFullYear());
    var m = parseFloat(date.getMonth()) + 1;
    var d = parseFloat(date.getDate());
    var uh = parseFloat(date.getHours());
    var um = parseFloat(date.getMinutes());
    var us = parseFloat(date.getSeconds());

    var extra = 100.0 * y + m - 190002.5;
    var rjd = 367.0 * y;
    rjd -= Math.floor(7.0 * (y + Math.floor((m + 9.0) / 12.0)) / 4.0);
    rjd += Math.floor(275.0 * m / 9.0);
    rjd += d;
    rjd += (uh + (um + us / 60.0) / 60.0) / 24.0;
    rjd += 1721013.5;
    rjd -= 0.5 * extra / Math.abs(extra);
    rjd += 0.5;
    return _phase(rjd);
}
