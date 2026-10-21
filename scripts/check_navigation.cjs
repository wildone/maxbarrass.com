/* Run with Playwright installed: node scripts/check_navigation.cjs [--live].
   Optional PLAYWRIGHT_MODULE and CHROME_PATH select an existing local runtime. */
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const live = process.argv.includes('--live');
const base = live ? 'https://maxbarrass.com' : 'http://127.0.0.1:8771';
const article = '/blog/2026/10/08/what-could-you-do-with-more-tokens/';
const destinations = {Services:'/#services',Approach:'/#approach',About:'/#about',Projects:'/projects/',Writing:'/blog/',Contact:'/#contact'};
const server = http.createServer((req,res) => {
  let file = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (!file.startsWith(root + path.sep)) {res.writeHead(403);return res.end();}
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file=path.join(file,'index.html');
  if (!fs.existsSync(file)) {res.writeHead(404);return res.end();}
  res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css'})[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
(async()=>{
  if(!live) await new Promise(resolve=>server.listen(8771,'127.0.0.1',resolve));
  const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})});
  const context=await browser.newContext({reducedMotion:'reduce'});
  const errors=[];const checks=[];
  try {
    for(const width of [390,1440]) {
      const page=await context.newPage({viewport:{width,height:1000}});
      await page.setViewportSize({width,height:1000});
      page.on('pageerror',error=>errors.push(error.message));
      for(const route of ['/', '/projects/', '/blog/', article]) {
        for(const [label,destination] of Object.entries(destinations)) {
          await page.goto(base+route);
          const before=page.url();
          const menu=page.locator('[data-menu-toggle]');
          if(width===390) {
            assert.equal(await menu.getAttribute('aria-expanded'),'false');
            assert.equal(await page.locator('#site-navigation').isVisible(),false);
            await menu.focus();await page.keyboard.press('Enter');
            assert.equal(await menu.getAttribute('aria-expanded'),'true');
            await page.keyboard.press('Escape');
            assert.equal(await menu.getAttribute('aria-expanded'),'false');
            assert.equal(await menu.evaluate(el=>el===document.activeElement),true);
            await menu.click();
          }
          const link=page.locator('#site-navigation a').filter({hasText:new RegExp('^'+label+'$')});
          if(label==='Projects'){await link.focus();await page.keyboard.press('Enter');}
          else await link.click();
          await page.waitForURL(base+destination);
          if(destination.includes('#')) {
            await page.waitForFunction(()=>{
              const target=document.querySelector(location.hash);
              const top=target?.getBoundingClientRect().top;
              const bottom=document.querySelector('[data-site-header]').getBoundingClientRect().bottom;
              return top>=bottom-2 && top<bottom+300;
            });
          } else {
            await page.locator('h1').waitFor();
            assert.equal(await page.locator('h1').count(),1);
          }
          const current=page.locator('#site-navigation [aria-current]');
          assert.equal(await current.count(),1);
          assert.equal(await current.getAttribute('href'),destination);
          if(width===390) assert.equal(await menu.getAttribute('aria-expanded'),'false');
          if(before!==page.url()) {
            const after=page.url();
            await page.goBack();await page.waitForURL(before);
            await page.goForward();await page.waitForURL(after);
            assert.equal(await page.locator('#site-navigation [aria-current]').getAttribute('href'),destination);
          }
          checks.push({width,from:route,label,destination});
        }
      }
      await page.goto(base+'/projects/');
      assert.equal(await page.locator('.project-card').count(),5);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
      await page.goto(base+'/');
      assert.equal(await page.locator('.project-card').count(),0);
      await page.close();
    }
    // Native navigation remains available when JavaScript is disabled.
    const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:1000}});
    const fallback=await nojs.newPage();await fallback.goto(base+'/projects/');
    await fallback.locator('#site-navigation a[href="/blog/"]').click();
    await fallback.waitForURL(base+'/blog/');
    for(const width of [320,390]) {
      await fallback.setViewportSize({width,height:1000});
      for(const label of ['Services','Approach','About','Contact']) {
        await fallback.locator('#site-navigation a').filter({hasText:new RegExp('^'+label+'$')}).click();
        await fallback.waitForURL(base+destinations[label]);
        // evaluate is available to the test even when page script execution is disabled.
        await fallback.waitForTimeout(1200);
        const position=await fallback.evaluate(()=>({top:document.querySelector(location.hash).getBoundingClientRect().top,bottom:document.querySelector('[data-site-header]').getBoundingClientRect().bottom,padding:getComputedStyle(document.documentElement).scrollPaddingTop}));
        assert.ok(position.top>=position.bottom-2,JSON.stringify({width,label,...position}));
      }
    }
    await nojs.close();
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({live,clickFlows:checks.length,mobileDisclosure:'pass',keyboard:'pass',backForward:'pass',visibleAnchorTargets:'pass',activeNavigation:'pass',noJavaScript:'pass',errors},null,2));
  } finally {await browser.close();if(!live)server.close();}
})().catch(error=>{console.error(error);process.exit(1)});
