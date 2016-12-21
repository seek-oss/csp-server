
Making your visitors to send you reports
========================================
You need to add a header in your website, https responses need to contain a header like this example:

```
Content-Security-Policy-Report-Only:default-src 'self' https: data: crwebinvoke: crwebinvokeimmediate: crwebnull:; style-src 'self' https: data: 'unsafe-inline'; script-src 'self' https: data: about: asset: blob: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data: about:; font-src 'self' https: data:; connect-src 'self' https: data: javascript; frame-src 'self' https: data: file:; media-src 'self' https: data:; object-src 'self' https: data:; report-uri https://csp.mysite.com/reportOnly/index
```

By doing this every moderm browser visiting your site over https will send a report to https://csp.mysite.com/reportOnly/index 
everytime something is breaking any of the rules defined above.

In other words, a user is browsing your site and there is an image which is loaded using http://, 
the browser will then send a report to https://csp.mysite.com/reportOnly/index in the background with the details.


CSP notes
=========
CSP reports are POST by browsers in different ways and different content-types so Nginx normalizes this to `application/json`, known ones are:

- application/x-www-form-urlencoded
- application/json
- application/csp-report
- application/json; charset=UTF-8

More info: https://www.tollmanz.com/content-security-policy-report-samples/

Example of a CSP report:

```
{
	"csp-report": {
	  "document-uri": "http://example.com/signup.html",
	  "referrer": "",
	  "blocked-uri": "http://example.com/css/style.css",
	  "violated-directive": "style-src cdn.example.com",
	  "original-policy": "default-src \u0027none\u0027; style-src cdn.example.com; report-uri /_/csp-reports"
	}
}
```
