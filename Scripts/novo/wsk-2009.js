/*
// (C) 2009 by www.ZELLWERK.com GmbH & Co. KG
//
// (P) 2009 by eloh@zellwerk.com
*/

var $j = jQuery.noConflict();

var calcMode = 0; // WC

var aniSpeed = 500;

var LL = {
    'cbm': 'm<sup>3</sup>',
    'cur': '&#8364;'
};

var beispiele = [
//		WCs				Urinale		Wasserpreise
//		anz,anz,grs,kls,anz,ltr,nutz
	[0, 0, 0, 0, 0, 0, 0, 0.0, 0.0],
	[2, 0, 6, 15, 1, 4, 3, 1.8, 1.5],
	[25, 0, 3, 4, 15, 4, 15, 1.8, 1.5],
	[35, 0, 6, 16, 35, 3, 10, 1.8, 1.5]
];

function dbg(str) {
    $j('#bugs').show().append(str + '\n');
}

function numberFormat(num, decs) {
    var t1 = '';
    var t2 = ('' + num.toFixed(decs)).replace(/\./, ',').replace(/(\d)(\d\d\d),/, '$1.$2,');
    do {
        t1 = t2;
        t2 = t2.replace(/(\d)(\d\d\d)\./g, '$1.$2.');
    } while (t1 != t2);
    return t2;
}

$j(document).ready(function () {

    $j('body').append('<pre id="bugs" style="border:1px #DDD solid; display:none; padding:5px; margin:2em;"></pre>');

    /*	Sprachkonstanten... */
    var LL = $j('#LL');
    LL.html('');
    $j('#LLconstants > ul').each(function (i) {
        LL.append('<option value="' + $j(this).attr('id') + '">' + $j(this).attr('title') + '</option>');
    });
    LL.change(function () {
        $j('#' + $j(this).val() + ' li').each(function (i) {
            var t = $j(this);
            var c = t.attr('class');
            $j('#page_margins .' + c).each(function () {
                var tn = this.tagName.toUpperCase();
                if (tn == 'INPUT') $j(this).val(t.text());
                else if (tn == 'A') $j(this).attr('title', t.text());
                else if (tn == 'IMG') $j(this).attr('alt', t.text());
                else $j(this).text(t.text());
            });

        });
    });
    // Die zu Ăźbersetzenden mĂźssen eingegrenzt sein (page_margins),
    // damit sich die Textbausteine nicht selbst Ăźberschreiben.

    $j('#bugs').click(function () {
        $j(this).text('');
    });

    $j('a.wcur').each(function (i) {
        this.n = i;
    }).click(function () {
        $j('a.wcur').toggleClass('act');
        this.blur();
        // Achtung, hier keinen Ani-firlefanz, dann kann der Brauser die Spaltenbreiten nicht korrekt halten!
        if (this.n == 1) {
            $j('.wc').hide();
            $j('.ur').show();
        }
        else {
            $j('.ur').hide();
            $j('.wc').show();
        }
        $j('#result').hide(aniSpeed, function () {
            $j('#intro').show(aniSpeed);
        });
        calcMode = this.n;
    });

    $j('.xmpl').each(function (i) {
        this.n = i + 1;
        this.locked = false;
    }).click(function () {
        $j('.xmpl').each(function () {
            this.locked = false;
            $j(this).mouseout();
        });
        this.blur();
        var dizz = this;
        $j(['az6', 'az9', 'grs', 'kls', 'azu', 'wmu', 'hnu', 'fwp', 'awp']).each(function (k, v) {
            $j('#' + v).val(beispiele[dizz.n][k]);
        });
        dizz.locked = true;
        $j(this).mouseover();
        $j('#clc').click();
    }).mouseover(function () {
        with ($j(this).children('img')) {
            attr('src', attr('src').replace(/-b/, '-g'));
        }
    }).mouseout(function () {
        var t = $j(this);
        if (!this.locked)
            with (t.children('img'))
                attr('src', attr('src').replace(/-g/, '-b'));
    });

    $j('.uin').change(function () {
        $j('.xmpl').each(function () {
            this.locked = false;
            $j(this).mouseout();
        });
    });

    $j('#clc').click(function () {
        this.blur();
        $j('#result').hide(aniSpeed, function () {
            var az6 = parseInt($j('#az6').val());
            var az9 = parseInt($j('#az9').val());
            if (isNaN(az6))
                az6 = 0;
            if (isNaN(az9))
                az9 = 0;
            var anz = az6 + az9;
            var grs = parseInt($j('#grs').val());
            var kls = parseInt($j('#kls').val());

            var gwp = (parseFloat($j('#fwp').val().replace(/,/, '.')) + parseFloat($j('#awp').val().replace(/,/, '.')));
            var ltr = [[], [], []];
            var l = '';
            var e = '';

            /* URINALE */
            var azu = parseInt($j('#azu').val());
            var hnu = parseInt($j('#hnu').val());
            var wmu = parseInt($j('#wmu').val());

            var lu = [[], [], [], [], []];
            var eu = [[], [], [], [], []];
            /* /URINALE */

            $j([1, 7, 30, 365]).each(function (tx, tage) {
                ltr[0][tx] = (
					(az6 * (6 * grs + 3 * kls)) +
					(az9 * (9 * grs + 3 * kls))
				) * tage / 1000;
                e = numberFormat(ltr[0][tx] * gwp, 2);
                l = numberFormat(ltr[0][tx], 1);
                $j('#lik' + tx).html(l + ' m<sup>3</sup>');
                $j('#eik' + tx).html(e + ' &#8364');

                //				$j([[9, 3], [6, 3], [4.5, 3], [4, 2]]).each(function(vx, vol){
                $j([[4.5, 3], [4, 2]]).each(function (vx, vol) {
                    vx++;
                    ltr[vx][tx] = anz * (vol[0] * grs + vol[1] * kls) * tage / 1000;
                    e = numberFormat(ltr[vx][tx] * gwp, 2);
                    l = numberFormat(ltr[vx][tx], 1);
                    $j('#l' + (vol[0] * 10) + tx).html(l + ' m<sup>3</sup>');
                    $j('#e' + (vol[0] * 10) + tx).html(e + ' &#8364');
                });

                /* URINALE */
                for (i = 0; i < 5; i++) {
                    lu[i][tx] = tage * azu * i * hnu / 1000;
                    eu[i][tx] = lu[i][tx] * gwp;

                    $j('#lu' + i + tx).html(numberFormat(lu[i][tx], 1) + ' m<sup>3</sup>');
                    $j('#eu' + i + tx).html(numberFormat(lu[i][tx] * gwp, 2) + ' &#8364');
                }
                /* /URINALE */

            });

            var suw = [
				(lu[wmu][3] - lu[0][3]),
				(lu[wmu][3] - lu[1][3]),
				(lu[wmu][3] - lu[2][3]),
				(lu[wmu][3] - lu[3][3]),
				(lu[wmu][3] - lu[4][3])
            ];
            var sue = [
				(suw[0] * gwp),
				(suw[1] * gwp),
				(suw[2] * gwp),
				(suw[3] * gwp),
				(suw[4] * gwp)
            ];

            for (i = 0; i < 5; i++) {
                $j('#su' + i + 'l').html(numberFormat(suw[i], 1) + ' m<sup>3</sup>');
                $j('#su' + i + 'e').html(numberFormat(sue[i], 2) + ' &#8364');
            }

            $j('#s45l').html(numberFormat(ltr[0][3] - ltr[1][3], 1) + ' m<sup>3</sup>');
            $j('#s45e').html(numberFormat((ltr[0][3] - ltr[1][3]) * gwp, 2) + ' &#8364');
            $j('#s40l').html(numberFormat(ltr[0][3] - ltr[2][3], 1) + ' m<sup>3</sup>');
            $j('#s40e').html(numberFormat((ltr[0][3] - ltr[2][3]) * gwp, 2) + ' &#8364');

            /* URINALE */
            if (calcMode == 1) {
                $j('tr.ur').show().removeClass('ui');
                $j('tr.v' + wmu + 'u').addClass('ui');
                for (i = wmu; i < 4; i++)
                    $j('tr.e' + i + 'u').hide();
            }
            /* /URINALE */

            $j('#intro').hide(aniSpeed, function () {
                $j('#result').show(aniSpeed);
            });
        });
    });

    with ($j('#LL')) {
        val('LL_en');
        change();
    }

});