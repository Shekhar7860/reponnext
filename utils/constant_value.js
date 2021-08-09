export const defaultSlot = [
    {
        start_time: 5,
        end_time: 6,
        title: "5am - 6am"
    }, {
        start_time: 6,
        end_time: 7,
        title: "6am - 7am"
    }, {
        start_time: 7,
        end_time: 8,
        title: "7am - 8am"
    }, {
        start_time: 8,
        end_time: 9,
        title: "8am - 9am"
    }, {
        start_time: 9,
        end_time: 10,
        title: "9am - 10am"
    }, {
        start_time: 10,
        end_time: 11,
        title: "10am - 11am"
    }, {
        start_time: 11,
        end_time: 12,
        title: "11am - 12pm"
    }, {
        start_time: 12,
        end_time: 13,
        title: "12pm - 1pm"
    }, {
        start_time: 13,
        end_time: 14,
        title: "1pm - 2pm"
    }, {
        start_time: 14,
        end_time: 15,
        title: "2pm - 3pm"
    }, {
        start_time: 15,
        end_time: 16,
        title: "3pm - 4pm"
    }, {
        start_time: 16,
        end_time: 17,
        title: "4pm - 5pm"
    }, {
        start_time: 17,
        end_time: 18,
        title: "5pm - 6pm"
    }, {
        start_time: 18,
        end_time: 19,
        title: "6pm - 7pm"
    }, {
        start_time: 19,
        end_time: 20,
        title: "7pm - 8pm"
    },
]
export const defaultCurrency = [
    {
        name: "JPY",
        value: "JPY"
    }, {
        name: "USD",
        value: "USD"
    }, , {
        name: "SGD",
        value: "SGD"
    },
]
export const getPartucularCurrency = (value) => {
    let x = defaultCurrency.filter((res) => res.value == value)
    if (x.length > 0) {
        return x[0]
    } else {
        return null
    }
}
// usd, aed, afn, all, amd, ang, aoa, ars, aud, awg, azn, bam, bbd, bdt, bgn, bhd, bif, bmd, bnd, bob, brl, bsd, bwp, bzd, cad, cdf, chf, clp, cny, cop, crc, cve, czk, djf, dkk, dop, dzd, egp, etb, eur, fjd, fkp, gbp, gel, gip, gmd, gnf, gtq, gyd, hkd, hnl, hrk, htg, huf, idr, ils, inr, isk, jmd, jod, jpy, kes, kgs, khr, kmf, krw, kwd, kyd, kzt, lak, lbp, lkr, lrd, lsl, mad, mdl, mga, mkd, mmk, mnt, mop, mro, mur, mvr, mwk, mxn, myr, mzn, nad, ngn, nio, nok, npr, nzd, omr, pab, pen, pgk, php, pkr, pln, pyg, qar, ron, rsd, rub, rwf, sar, sbd, scr, sek, sgd, shp, sll, sos, srd, std, szl, thb, tjs, tnd, top, try, ttd, twd, tzs, uah, ugx, uyu, uzs, vnd, vuv, wst, xaf, xcd, xof, xpf, yer, zar, zmw, eek, lvl, svc, vef, ltl
