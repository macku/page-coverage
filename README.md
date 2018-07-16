page-coverage
=============

![Coverage Demo](images/coverage.gif)

[![NPM version](https://badge.fury.io/js/page-coverage.svg)](https://www.npmjs.com/package/page-coverage)
[![node](https://img.shields.io/node/v/page-coverage.svg)](https://www.npmjs.com/package/page-coverage)
[![dependencies Status](https://david-dm.org/macku/page-coverage/status.svg)](https://david-dm.org/macku/page-coverage)
[![devDependencies Status](https://david-dm.org/macku/page-coverage/dev-status.svg)](https://david-dm.org/macku/page-coverage?type=dev)
[![peerDependencies Status](https://david-dm.org/macku/page-coverage/peer-status.svg)](https://david-dm.org/macku/page-coverage?type=peer) [![Greenkeeper badge](https://badges.greenkeeper.io/macku/page-coverage.svg)](https://greenkeeper.io/)

Collect the information about JS and CSS **code overage** and usage from any page with a little help of [Puppeteer](https://github.com/GoogleChrome/puppeteer)

Installation
============

You can install the plugin globally using [**NPM**](https://www.npmjs.com):

```bash
npm install page-coverage -g
```

or by [**Yarn**](https://yarnpkg.com/):

```bash
yarn global add page-coverage 
```

How to use it
=============

Open your favourite terminal and type command:

```bash
page-coverage <<url>>
```

ex.

```bash
page-coverage http://gtihub.com/macku/page-coverage
```

Then wait for the tool to finish collecting coverage.

In the results table, you can find the information about all of the downloaded **JS** and **CSS** files from the page.
What is most important you can read the usage of each file.
 The **green** bar means how much code from the file content was actually executed on the page.


Options
=======

The `page-coverage` utility allows you to pass additional parameters and customize the request.

## Additional request headers

You can pass the custom HTTP request headers by using the `--header` (or `-H`) parameter:

```bash
page-coverage https://google.com --header "MyCustomHeader: Value"
page-coverage https://google.com --header "MyCustomHeader: Value" --header "Foo: Bar"
```

## Set request cookies

You can set the custom request cookie before fetching the URL by passing the `--cookie` (or `-b`) parameter:

```bash
page-coverage https://google.com --cookie "SESSIONID=1234567890ABCDEF"
page-coverage https://google.com --cookie "SESSIONID=1234567890ABCDEF" --cookie "foo=bar; secure; domain=google.com; path=/"
```

## Request timeout
You can set the custom request timeout (in seconds) by passing the `--timeout` (or `-t`) parameter. Default value is 30 seconds

```bash
page-coverage https://google.com --timeout 45
```

## Post request
If you would like to send the `POST` request instead of the default `GET` you force it by using `--post` parameter and pass the post data:

```bash
page-coverage https://login.my-page.com/auth --post "login=admin&password=supersecret123" --header "Content-Type: application/x-www-form-urlencoded"
```

## JSON output
Use the `--json` parameter to output the results in JSON format:

```bash
page-coverage https://google.com --json

{"url":"https://google.com","coverage":[{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"JS","totalBytes":13235,"usedBytesTotal":6154,"unusedBytesTotal":7081,"usedPercentage":46.497922176048355,"unusedPercentage":53.502077823951645},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"JS","totalBytes":16425,"usedBytesTotal":9362,"unusedBytesTotal":7063,"usedPercentage":56.99847792998478,"unusedPercentage":43.00152207001522},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"JS","totalBytes":180,"usedBytesTotal":145,"unusedBytesTotal":35,"usedPercentage":80.55555555555556,"unusedPercentage":19.444444444444443},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"JS","totalBytes":47,"usedBytesTotal":46,"unusedBytesTotal":1,"usedPercentage":97.87234042553192,"unusedPercentage":2.127659574468085},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"JS","totalBytes":5030,"usedBytesTotal":4980,"unusedBytesTotal":50,"usedPercentage":99.00596421471172,"unusedPercentage":0.9940357852882704},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"JS","totalBytes":97422,"usedBytesTotal":26469,"unusedBytesTotal":70953,"usedPercentage":27.16942784997228,"unusedPercentage":72.83057215002772},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"JS","totalBytes":586,"usedBytesTotal":585,"unusedBytesTotal":1,"usedPercentage":99.82935153583618,"unusedPercentage":0.17064846416382254},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"JS","totalBytes":108,"usedBytesTotal":79,"unusedBytesTotal":29,"usedPercentage":73.14814814814815,"unusedPercentage":26.85185185185185},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"JS","totalBytes":3145,"usedBytesTotal":2201,"unusedBytesTotal":944,"usedPercentage":69.98410174880763,"unusedPercentage":30.015898251192368},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"JS","totalBytes":54,"usedBytesTotal":53,"unusedBytesTotal":1,"usedPercentage":98.14814814814815,"unusedPercentage":1.8518518518518519},{"url":"https://www.google.com.au/xjs/_/js/k=xjs.s.en.lyr4rn8yglg.O/m=sx,sb,cdos,cr,elog,hsm,jsa,r,d,csi/am=wCL0eMEByP8PAooEKwgsQJpgGBo/rt=j/d=1/t=zcms/rs=ACT90oGrbOo1vCvlvmGsLydMGrnvYiqBeg","type":"JS","totalBytes":424447,"usedBytesTotal":187308,"unusedBytesTotal":237139,"usedPercentage":44.12989136452843,"unusedPercentage":55.87010863547157},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"JS","totalBytes":17,"usedBytesTotal":9,"unusedBytesTotal":8,"usedPercentage":52.94117647058823,"unusedPercentage":47.05882352941177},{"url":"https://www.google.com.au/xjs/_/js/k=xjs.s.en.zlbS1JZBH0k.O/m=aa,abd,async,dvl,foot,fpe,ipv6,lu,m,mu,sf,sonic,spch,d3l,udlg/am=wCL0eMEByP8PAooEKwgsQJpgGBo/exm=sx,sb,cdos,cr,elog,hsm,jsa,r,d,csi/rt=j/d=1/ed=1/t=zcms/rs=ACT90oGDsG_D3aIH2xzeiP0XK5yp4EbhGw?xjs=s1","type":"JS","totalBytes":101730,"usedBytesTotal":25525,"unusedBytesTotal":76205,"usedPercentage":25.09092696353092,"unusedPercentage":74.90907303646908},{"url":"https://www.gstatic.com/og/_/js/k=og.og2.en_US.PhjXuBK65wA.O/rt=j/m=def/exm=in,fot/d=1/ed=1/rs=AA2YrTvynzQW2hx1c545H7wM3PtueoFk7Q","type":"JS","totalBytes":138739,"usedBytesTotal":31958,"unusedBytesTotal":106781,"usedPercentage":23.03461896078248,"unusedPercentage":76.96538103921752},{"url":"https://apis.google.com/_/scs/abc-static/_/js/k=gapi.gapi.en.29tAKSAI8cc.O/m=gapi_iframes,googleapis_client,plusone/rt=j/sv=1/d=1/ed=1/am=IA/rs=AHpOoo82FxkTgGRAoVn-fgFU3zdQ5QIqEw/cb=gapi.loaded_0","type":"JS","totalBytes":139143,"usedBytesTotal":40690,"unusedBytesTotal":98453,"usedPercentage":29.243296464788017,"unusedPercentage":70.75670353521198},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"JS","totalBytes":132,"usedBytesTotal":105,"unusedBytesTotal":27,"usedPercentage":79.54545454545455,"unusedPercentage":20.454545454545453},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"CSS","totalBytes":33059,"usedBytesTotal":5844,"unusedBytesTotal":27215,"usedPercentage":17.677485707371673,"unusedPercentage":82.32251429262833},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"CSS","totalBytes":2118,"usedBytesTotal":802,"unusedBytesTotal":1316,"usedPercentage":37.86591123701605,"unusedPercentage":62.13408876298395},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"CSS","totalBytes":313,"usedBytesTotal":145,"unusedBytesTotal":168,"usedPercentage":46.325878594249204,"unusedPercentage":53.674121405750796},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"CSS","totalBytes":8949,"usedBytesTotal":224,"unusedBytesTotal":8725,"usedPercentage":2.5030729690468263,"unusedPercentage":97.49692703095317},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"CSS","totalBytes":63,"usedBytesTotal":0,"unusedBytesTotal":63,"usedPercentage":0,"unusedPercentage":100},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"CSS","totalBytes":651,"usedBytesTotal":571,"unusedBytesTotal":80,"usedPercentage":87.71121351766513,"unusedPercentage":12.288786482334869},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"CSS","totalBytes":355,"usedBytesTotal":0,"unusedBytesTotal":355,"usedPercentage":0,"unusedPercentage":100},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"CSS","totalBytes":1648,"usedBytesTotal":592,"unusedBytesTotal":1056,"usedPercentage":35.92233009708738,"unusedPercentage":64.07766990291262},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"CSS","totalBytes":100,"usedBytesTotal":44,"unusedBytesTotal":56,"usedPercentage":44,"unusedPercentage":56},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"CSS","totalBytes":173,"usedBytesTotal":142,"unusedBytesTotal":31,"usedPercentage":82.08092485549133,"unusedPercentage":17.91907514450867},{"url":"https://www.google.com.au/?gfe_rd=cr&dcr=0&ei=ByCWWqWCH5Hr8weAwY2ICA","type":"CSS","totalBytes":13487,"usedBytesTotal":29,"unusedBytesTotal":13458,"usedPercentage":0.21502187291466157,"unusedPercentage":99.78497812708534}]}
```
