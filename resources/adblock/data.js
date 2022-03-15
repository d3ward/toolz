const icons = {
    "Ads": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>ionicons-v5-j</title><path d='M48,176v.66a17.38,17.38,0,0,1-4.2,11.23l0,.05C38.4,194.32,32,205.74,32,224c0,16.55,5.3,28.23,11.68,35.91A19,19,0,0,1,48,272h0a32,32,0,0,0,32,32h8a8,8,0,0,0,8-8V152a8,8,0,0,0-8-8H80A32,32,0,0,0,48,176Z'/><path d='M452.18,186.55l-.93-.17a4,4,0,0,1-3.25-3.93V62c0-12.64-8.39-24-20.89-28.32-11.92-4.11-24.34-.76-31.68,8.53A431.18,431.18,0,0,1,344.12,93.9c-23.63,20-46.24,34.25-67,42.31a8,8,0,0,0-5.15,7.47V299a16,16,0,0,0,9.69,14.69c19.34,8.29,40.24,21.83,62,40.28a433.74,433.74,0,0,1,51.68,52.16A26.22,26.22,0,0,0,416.44,416a33.07,33.07,0,0,0,10.44-1.74C439.71,410,448,399.05,448,386.4V265.53a4,4,0,0,1,3.33-3.94l.85-.14C461.8,258.84,480,247.67,480,224S461.8,189.16,452.18,186.55Z'/><path d='M240,320V152a8,8,0,0,0-8-8H136a8,8,0,0,0-8,8V456a24,24,0,0,0,24,24h52.45a32.66,32.66,0,0,0,25.93-12.45,31.65,31.65,0,0,0,5.21-29.05c-1.62-5.18-3.63-11-5.77-17.19-7.91-22.9-18.34-37.07-21.12-69.32A32,32,0,0,0,240,320Z'/></svg>",
    "Analytics": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-a</title><path d="M456,128a40,40,0,0,0-37.23,54.6L334.6,266.77a39.86,39.86,0,0,0-29.2,0L245.23,206.6a40,40,0,1,0-74.46,0L70.6,306.77A40,40,0,1,0,93.23,329.4L193.4,229.23a39.86,39.86,0,0,0,29.2,0l60.17,60.17a40,40,0,1,0,74.46,0l84.17-84.17A40,40,0,1,0,456,128Z"/></svg>',
    "Error Trackers": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-h</title><path d="M480,304.13v-32H400V215.2c29.42-27.95,32-64.76,32-103.2V96H400v16c0,28-1.86,48.15-9.9,63.84C368,128,324.32,112,256,112c-39.8,0-75.19,7.06-100.43,24.32-14.9,10.19-25.2,24.91-32.7,39.72C114,160.57,112,140.82,112,112V96H80v16c0,37.44,2.59,73.36,32,101.2v58.93H32v32l80-.13c0,19,3.7,53.09,10.39,69.69C96.6,396.76,80,422.31,80,464v16h32V464c0-27.66,9.1-44.71,26.17-61.32C160,448,177,464,240,464V176h32V464c65,0,80-16,101.83-61.32C390.9,419.29,400,436.35,400,464v16h32V464c0-41.68-16.6-67.23-42.39-90.31C396.3,357.09,400,323,400,304Z"/><path d="M256,32c-48.06,0-96,0-96,84,26.12-14,59.35-20,96-20,24.09,0,46.09,2.65,65.39,8,10.75,3,24.66,8.71,30.61,12C352,32,304.06,32,256,32Z"/></svg>',
    "Mix": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-i</title><path d="M479.66,268.7l-32-151.81C441.48,83.77,417.68,64,384,64H128c-16.8,0-31,4.69-42.1,13.94s-18.37,22.31-21.58,38.89l-32,151.87A16.65,16.65,0,0,0,32,272V384a64,64,0,0,0,64,64H416a64,64,0,0,0,64-64V272A16.65,16.65,0,0,0,479.66,268.7Zm-384-145.4c0-.1,0-.19,0-.28,3.55-18.43,13.81-27,32.29-27H384c18.61,0,28.87,8.55,32.27,26.91,0,.13.05.26.07.39l26.93,127.88a4,4,0,0,1-3.92,4.82H320a15.92,15.92,0,0,0-16,15.82,48,48,0,1,1-96,0A15.92,15.92,0,0,0,192,256H72.65a4,4,0,0,1-3.92-4.82Z"/><path d="M368,160H144a16,16,0,0,1,0-32H368a16,16,0,0,1,0,32Z"/><path d="M384,224H128a16,16,0,0,1,0-32H384a16,16,0,0,1,0,32Z"/></svg>',
    "OEM": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-k</title><path d="M336,0H176a64,64,0,0,0-64,64V448a64,64,0,0,0,64,64H336a64,64,0,0,0,64-64V64A64,64,0,0,0,336,0Zm32,448a32,32,0,0,1-32,32H176a32,32,0,0,1-32-32V64a32,32,0,0,1,32-32h11.35a7.94,7.94,0,0,1,7.3,4.75A32,32,0,0,0,224,56h64a32,32,0,0,0,29.35-19.25,7.94,7.94,0,0,1,7.3-4.75H336a32,32,0,0,1,32,32Z"/><path d="M336,48h0a11.88,11.88,0,0,0-9.53,4.69A48,48,0,0,1,288,72H224a48,48,0,0,1-38.47-19.31A11.88,11.88,0,0,0,176,48h0a16,16,0,0,0-16,16V448a16,16,0,0,0,16,16H336a16,16,0,0,0,16-16V64A16,16,0,0,0,336,48Z"/><path d="M336,0H176a64,64,0,0,0-64,64V448a64,64,0,0,0,64,64H336a64,64,0,0,0,64-64V64A64,64,0,0,0,336,0Zm32,448a32,32,0,0,1-32,32H176a32,32,0,0,1-32-32V64a32,32,0,0,1,32-32h11.35a7.94,7.94,0,0,1,7.3,4.75A32,32,0,0,0,224,56h64a32,32,0,0,0,29.35-19.25,7.94,7.94,0,0,1,7.3-4.75H336a32,32,0,0,1,32,32Z"/></svg>',
    "Social Trackers": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-j</title><path d="M336,256c-20.56,0-40.44-9.18-56-25.84-15.13-16.25-24.37-37.92-26-61-1.74-24.62,5.77-47.26,21.14-63.76S312,80,336,80c23.83,0,45.38,9.06,60.7,25.52,15.47,16.62,23,39.22,21.26,63.63h0c-1.67,23.11-10.9,44.77-26,61C376.44,246.82,356.57,256,336,256Zm66-88h0Z"/><path d="M467.83,432H204.18a27.71,27.71,0,0,1-22-10.67,30.22,30.22,0,0,1-5.26-25.79c8.42-33.81,29.28-61.85,60.32-81.08C264.79,297.4,299.86,288,336,288c36.85,0,71,9,98.71,26.05,31.11,19.13,52,47.33,60.38,81.55a30.27,30.27,0,0,1-5.32,25.78A27.68,27.68,0,0,1,467.83,432Z"/><path d="M147,260c-35.19,0-66.13-32.72-69-72.93C76.58,166.47,83,147.42,96,133.45,108.86,119.62,127,112,147,112s38,7.66,50.93,21.57c13.1,14.08,19.5,33.09,18,53.52C213.06,227.29,182.13,260,147,260Z"/><path d="M212.66,291.45c-17.59-8.6-40.42-12.9-65.65-12.9-29.46,0-58.07,7.68-80.57,21.62C40.93,316,23.77,339.05,16.84,366.88a27.39,27.39,0,0,0,4.79,23.36A25.32,25.32,0,0,0,41.72,400h111a8,8,0,0,0,7.87-6.57c.11-.63.25-1.26.41-1.88,8.48-34.06,28.35-62.84,57.71-83.82a8,8,0,0,0-.63-13.39C216.51,293.42,214.71,292.45,212.66,291.45Z"/></svg>',
    "OnePlus": '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>OnePlus icon</title><path d="M0 3.74V24h20.26V12.428h-2.256v9.317H2.254V5.995h9.318V3.742zM18.004 0v3.74h-3.758v2.256h3.758v3.758h2.255V5.996H24V3.74h-3.758V0zm-6.45 18.756V8.862H9.562c0 .682-.228 1.189-.577 1.504-.367.297-.91.437-1.556.437h-.245v1.625h2.133v6.31h2.237z"></path></svg>',
    "Xiaomi": '<svg id="xiaomi-svg" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Xiaomi icon</title><path d="M19.96 20a.32.32 0 0 1-.32-.32V4.32a.32.32 0 0 1 .32-.32h3.71a.32.32 0 0 1 .33.32v15.36a.32.32 0 0 1-.33.32zm-6.22 0s-.3-.09-.3-.32v-9.43A2.18 2.18 0 0 0 11.24 8H4.3c-.4 0-.3.3-.3.3v11.38c0 .27-.3.32-.3.32H.33a.32.32 0 0 1-.33-.32V4.32A.32.32 0 0 1 .33 4h12.86a4.28 4.28 0 0 1 4.25 4.27l.01 11.41a.32.32 0 0 1-.32.32zm-6.9 0a.3.3 0 0 1-.3-.3v-9a.3.3 0 0 1 .3-.3h3.77a.3.3 0 0 1 .29.3v9a.3.3 0 0 1-.3.3z"></path></svg>',
    "Huawei": '<svg id="huawei-svg" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Huawei icon</title><path d="M3.67 6.14S1.82 7.91 1.72 9.78v.35c.08 1.51 1.22 2.4 1.22 2.4 1.83 1.79 6.26 4.04 7.3 4.55 0 0 .06.03.1-.01l.02-.04v-.04C7.52 10.8 3.67 6.14 3.67 6.14zM9.65 18.6c-.02-.08-.1-.08-.1-.08l-7.38.26c.8 1.43 2.15 2.53 3.56 2.2.96-.25 3.16-1.78 3.88-2.3.06-.05.04-.09.04-.09zm.08-.78C6.49 15.63.21 12.28.21 12.28c-.15.46-.2.9-.21 1.3v.07c0 1.07.4 1.82.4 1.82.8 1.69 2.34 2.2 2.34 2.2.7.3 1.4.31 1.4.31.12.02 4.4 0 5.54 0 .05 0 .08-.05.08-.05v-.06c0-.03-.03-.05-.03-.05zM9.06 3.19a3.42 3.42 0 00-2.57 3.15v.41c.03.6.16 1.05.16 1.05.66 2.9 3.86 7.65 4.55 8.65.05.05.1.03.1.03a.1.1 0 00.06-.1c1.06-10.6-1.11-13.42-1.11-13.42-.32.02-1.19.23-1.19.23zm8.299 2.27s-.49-1.8-2.44-2.28c0 0-.57-.14-1.17-.22 0 0-2.18 2.81-1.12 13.43.01.07.06.08.06.08.07.03.1-.03.1-.03.72-1.03 3.9-5.76 4.55-8.64 0 0 .36-1.4.02-2.34zm-2.92 13.07s-.07 0-.09.05c0 0-.01.07.03.1.7.51 2.85 2 3.88 2.3 0 0 .16.05.43.06h.14c.69-.02 1.9-.37 3-2.26l-7.4-.25zm7.83-8.41c.14-2.06-1.94-3.97-1.94-3.98 0 0-3.85 4.66-6.67 10.8 0 0-.03.08.02.13l.04.01h.06c1.06-.53 5.46-2.77 7.28-4.54 0 0 1.15-.93 1.21-2.42zm1.52 2.14s-6.28 3.37-9.52 5.55c0 0-.05.04-.03.11 0 0 .03.06.07.06 1.16 0 5.56 0 5.67-.02 0 0 .57-.02 1.27-.29 0 0 1.56-.5 2.37-2.27 0 0 .73-1.45.17-3.14z"></path></svg>',
    "Samsung": '<svg id="samsung-svg" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Samsung icon</title><path d="M19.8166 10.2808l.0459 2.6934h-.023l-.7793-2.6934h-1.2837v3.3925h.8481l-.0458-2.785h.023l.8366 2.785h1.2264v-3.3925zm-16.149 0l-.6418 3.427h.9284l.4699-3.1175h.0229l.4585 3.1174h.9169l-.6304-3.4269zm5.1805 0l-.424 2.6132h-.023l-.424-2.6132H6.5788l-.0688 3.427h.8596l.023-3.0832h.0114l.573 3.0831h.8711l.5731-3.083h.023l.0228 3.083h.8596l-.0802-3.4269zm-7.2664 2.4527c.0343.0802.0229.1949.0114.2522-.0229.1146-.1031.2292-.3324.2292-.2177 0-.3438-.126-.3438-.3095v-.3323H0v.2636c0 .7679.6074.9971 1.2493.9971.6189 0 1.1346-.2178 1.2149-.7794.0458-.298.0114-.4928 0-.5616-.1605-.722-1.467-.9283-1.5588-1.3295-.0114-.0688-.0114-.1375 0-.1834.023-.1146.1032-.2292.3095-.2292.2063 0 .321.126.321.3095v.2063h.8595v-.2407c0-.745-.6762-.8596-1.1576-.8596-.6074 0-1.1117.2063-1.2034.7564-.023.149-.0344.2866.0114.4585.1376.7106 1.364.9169 1.5358 1.3524m11.152 0c.0343.0803.0228.1834.0114.2522-.023.1146-.1032.2292-.3324.2292-.2178 0-.3438-.126-.3438-.3095v-.3323h-.917v.2636c0 .7564.596.9857 1.2379.9857.6189 0 1.1232-.2063 1.2034-.7794.0459-.298.0115-.4814 0-.5616-.1375-.7106-1.4327-.9284-1.5243-1.318-.0115-.0688-.0115-.1376 0-.1835.0229-.1146.1031-.2292.3094-.2292.1948 0 .321.126.321.3095v.2063h.848v-.2407c0-.745-.6647-.8596-1.146-.8596-.6075 0-1.1004.1948-1.192.7564-.023.149-.023.2866.0114.4585.1376.7106 1.341.9054 1.513 1.3524m2.8882.4585c.2407 0 .3094-.1605.3323-.2522.0115-.0343.0115-.0917.0115-.126v-2.533h.871v2.4642c0 .0688 0 .1948-.0114.2292-.0573.6419-.5616.8482-1.192.8482-.6303 0-1.1346-.2063-1.192-.8482 0-.0344-.0114-.1604-.0114-.2292v-2.4642h.871v2.533c0 .0458 0 .0916.0115.126 0 .0917.0688.2522.3095.2522m7.1518-.0344c.2522 0 .3324-.1605.3553-.2522.0115-.0343.0115-.0917.0115-.126v-.4929h-.3553v-.5043H24v.917c0 .0687 0 .1145-.0115.2292-.0573.6303-.596.8481-1.2034.8481-.6075 0-1.1461-.2178-1.2034-.8481-.0115-.1147-.0115-.1605-.0115-.2293v-1.444c0-.0574.0115-.172.0115-.2293.0802-.6419.596-.8482 1.2034-.8482s1.1347.2063 1.2034.8482c.0115.1031.0115.2292.0115.2292v.1146h-.8596v-.1948s0-.0803-.0115-.1261c-.0114-.0802-.0802-.2521-.3438-.2521-.2521 0-.321.1604-.3438.2521-.0115.0458-.0115.1032-.0115.1605v1.5702c0 .0458 0 .0916.0115.126 0 .0917.0917.2522.3323.2522"></path></svg>',
    "Apple": '<svg id="apple-svg" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Apple icon</title><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"></path></svg>'
};
const dataOEM = {
    "Xiaomi": [
        "https://api.ad.xiaomi.com",
        "https://app.chat.xiaomi.net",
        "https://data.mistat.xiaomi.com",
        "https://data.mistat.intl.xiaomi.com",
        "https://data.mistat.india.xiaomi.com",
        "https://data.mistat.rus.xiaomi.com",
        "https://sdkconfig.ad.xiaomi.com",
        "https://sdkconfig.ad.intl.xiaomi.com",
        "https://globalapi.ad.xiaomi.com",
        "https://www.cdn.ad.xiaomi.com",
        "https://tracking.miui.com",
        "https://sa.api.intl.miui.com",
        "https://tracking.miui.com",
        "https://tracking.intl.miui.com",
        "https://tracking.india.miui.com",
        "https://tracking.rus.miui.com"
    ],
    "Huawei": [
        "https://metrics.data.hicloud.com",
        "https://metrics1.data.hicloud.com",
        "https://metrics2.data.hicloud.com",
        "https://metrics3.data.hicloud.com",
        "https://metrics4.data.hicloud.com",
        "https://metrics5.data.hicloud.com ",
        "https://logservice.hicloud.com",
        "https://logservice1.hicloud.com",
        "https://metrics-dra.dt.hicloud.com",
        "https://logbak.hicloud.com"
    ],
    "OnePlus": [
        "https://analytics.oneplus.cn",
        "https://click.oneplus.cn",
        "https://click.oneplus.com",
        "https://open.oneplus.net"
    ],
    "Samsung": [
        "https://ad.samsungadhub.com",
        "https://samsungadhub.com",
        "https://samsungads.com",
        "https://smetrics.samsung.com",
        "https://nmetrics.samsung.com",
        "https://samsung-com.112.2o7.net",
        "https://business.samsungusa.com",
        "https://analytics.samsungknox.com",
        "https://bigdata.ssp.samsung.com",
        "https://analytics-api.samsunghealthcn.com",
        "https://config.samsungads.com"
    ],
    "Apple": [
        "https://metrics.apple.com",
        "https://securemetrics.apple.com",
        "https://supportmetrics.apple.com",
        "https://metrics.icloud.com",
        "https://metrics.mzstatic.com"
    ]
}
const data = {
    "Ads": { //Ads
        "Google Ads": [
            "https://pagead2.googlesyndication.com","https://ads.google.com","https://adservice.google.com",
            "https://pagead2.googleadservices.com","https://googleadservices.com"
        ],
        "Media.net": ["https://static.media.net", "https://media.net", "https://adservetx.media.net"],
        "Doubleclick.net": ["https://doubleclick.net/", "https://ad.doubleclick.net/","https://static.doubleclick.net","https://m.doubleclick.net",
    "https://mediavisor.doubleclick.net"],
        "FastClick": ["https://fastclick.com","https://fastclick.net","https://media.fastclick.net/", "https://cdn.fastclick.net/"],
        "Amazon": ["https://adtago.s3.amazonaws.com","https://analyticsengine.s3.amazonaws.com",
        "https://advice-ads.s3.amazonaws.com","https://affiliationjs.s3.amazonaws.com","https://advertising-api-eu.amazon.com",
        "https://amazonaax.com","https://amazonclix.com",
            "https://assoc-amazon.com"
        ]
    },
    "Analytics": { //Analytics
        "Google Analytics": ["https://google-analytics.com","https://ssl.google-analytics.com"],
        "Hotjar": ["https://hotjar.com", "https://static.hotjar.com","https://api-hotjar.com","https://hotjar-analytics.com"],
        "MouseFlow": ["https://mouseflow.com/", "https://a.mouseflow.com"],
        "FreshMarketer": "https://freshmarketer.com/",
        "Luckyorange": ["https://luckyorange.com","https://cdn.luckyorange.com", "https://w1.luckyorange.com",
            "https://upload.luckyorange.net", "https://cs.luckyorange.net",
            "https://settings.luckyorange.net"
        ],
        "Stats WP Plugin": "https://stats.wp.com"
    },
    "Error Trackers": { //Error tracker
        "Bugsnag": ["https://notify.bugsnag.com", "https://sessions.bugsnag.com","https://api.bugsnag.com","https://app.bugsnag.com"],
        "Sentry": ["https://browser.sentry-cdn.com","https://app.getsentry.com"]
    },
    "Social Trackers": {
        "Facebook": ["https://pixel.facebook.com",
            "https://analytics.facebook.com", "https://ads.facebook.com","https://an.facebook.com"
        ],
        "Twitter": ["https://ads-twitter.com", "https://static.ads-twitter.com","https://ads-api.twitter.com","https://advertising.twitter.com"
        ],
        "LinkedIn": ["https://ads.linkedin.com", "https://analytics.pointdrive.linkedin.com"],
        "Pinterest": ["https://ads.pinterest.com", "https://log.pinterest.com", "https://ads-dev.pinterest.com",
            "https://analytics.pinterest.com", "https://trk.pinterest.com","https://widgets.pinterest.com"
        ],
        "Reddit": ["https://ads.reddit.com", "https://d.reddit.com", "https://rereddit.com",
            "https://events.redditmedia.com"
        ],
        "YouTube": ["https://ads.youtube.com", "https://youtube.cleverads.vn"]
        ,
        "TikTok": ["https://analytics.tiktok.com", "https://ads.tiktok.com", "https://analytics-sg.tiktok.com","https://ads-sg.tiktok.com"]
    },
    "Mix": {
        "Yahoo": ["https://ads.yahoo.com", "https://global.adserver.yahoo.com", "https://analytics.yahoo.com",
            "https://ads.yap.yahoo.com"
        ],
        "Yandex": ["https://appmetrica.yandex.com", "https://yandexadexchange.net",
            "https://analytics.mobile.yandex.net", "https://extmaps-api.yandex.net",
            "https://adsdk.yandex.ru"
        ]
    }

};
