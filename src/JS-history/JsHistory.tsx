import './style.css'
import history from './pictures/History-of-JavaScript.png'
import logo from './pictures/javascript-logo.png'

export function JsHistory() {
  return (
    <div>
      <meta charSet='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='description' content='Easy web page about the history of JavaScript' />
      <title>The History of JavaScript</title>
      <link rel='stylesheet' type='text/css' href='style.css' />
      <div className='kontejner'>
        <div className='header'>
          <img src={logo} alt='js-logo' />
        </div>
        <div className='main'>
          <h1>The History of JavaScript</h1>
          <h2 id='one'>Creation at Netscape</h2>
          <p>
            The first web browser with a graphical user interface, Mosaic, was released in 1993.
            Accessible to non-technical people, it played a prominent role in the rapid growth of
            the nascent World Wide Web. The lead developers of Mosaic then founded the Netscape
            corporation, which released a more polished browser, Netscape Navigator, in 1994. This
            quickly became the most-used.
          </p>
          <p>
            During these formative years of the Web, web pages could only be static, lacking the
            capability for dynamic behavior after the page was loaded in the browser. There was a
            desire in the flourishing web development scene to remove this limitation, so in 1995,
            Netscape decided to add a scripting language to Navigator. They pursued two routes to
            achieve this: collaborating with Sun Microsystems to embed the Java programming
            language, while also hiring Brendan Eich to embed the Scheme language.
          </p>
          <p>
            Netscape management soon decided that the best option was for Eich to devise a new
            language, with syntax similar to Java and less like Scheme or other extant scripting
            languages. Although the new language and its interpreter implementation were called
            LiveScript when first shipped as part of a Navigator beta in September 1995, the name
            was changed to JavaScript for the official release in December.
          </p>
          <h2 id='two'>Adoption by Microsoft</h2>
          <p>
            Microsoft debuted Internet Explorer in 1995, leading to a browser war with Netscape. On
            the JavaScript front, Microsoft reverse-engineered the Navigator interpreter to create
            its own, called JScript.
          </p>
          <p>
            JScript was first released in 1996, alongside initial support for CSS and extensions to
            HTML. Each of these implementations was noticeably different from their counterparts in
            Navigator. These differences made it difficult for developers to make their websites
            work well in both browsers, leading to widespread use of &quot;best viewed in
            Netscape&quot; and &quot;best viewed in Internet Explorer &quot;logos for several years.
          </p>
          <h2 id='three'>The rise of JScript</h2>
          <p>
            In November 1996, Netscape submitted JavaScript to Ecma International, as the starting
            point for a standard specification that all browser vendors could conform to. This led
            to the official release of the first ECMAScript language specification in June 1997.
          </p>
          <p>
            The standards process continued for a few years, with the release of ECMAScript 2 in
            June 1998 and ECMAScript 3 in December 1999. Work on ECMAScript 4 began in 2000.
          </p>
          <p>
            Meanwhile, Microsoft gained an increasingly dominant position in the browser market. By
            the early 2000s, Internet Explorer&apos;s market share reached 95%. This meant that
            became the de facto standard for client-side scripting on the Web.
          </p>
          <p>
            Microsoft initially participated in the standards process and implemented some proposals
            in its JScript language, but eventually it stopped collaborating on Ecma work. Thus
            ECMAScript 4 was mothballed.
          </p>
          <h2 id='four'>Growth and standardization</h2>
          <p>
            During the period of Internet Explorer dominance in the early 2000s, client-side
            scripting was stagnant. This started to change in 2004, when the successor of Netscape,
            Mozilla, released the Firefox browser. Firefox was well received by many, taking
            significant market share from Internet Explorer.
          </p>
          <p>
            In 2005, Mozilla joined ECMA International, and work started on the ECMAScript for XML
            (E4X) standard. This led to Mozilla working jointly with Macromedia (later acquired by
            Adobe Systems), who were implementing E4X in their ActionScript 3 language, which was
            based on an ECMAScript 4 draft. The goal became standardizing ActionScript 3 as the new
            ECMAScript 4. To this end, Adobe Systems released the Tamarin implementation as an open
            source project. However, Tamarin and ActionScript 3 were too different from established
            client-side scripting, and without cooperation from Microsoft, ECMAScript 4 never
            reached fruition.
          </p>
          <p>
            Meanwhile, very important developments were occurring in open-source communities not
            affiliated with ECMA work. In 2005, Jesse James Garrett released a white paper in which
            he coined the term Ajax and described a set of technologies, of which JavaScript was the
            backbone, to create web applications where data can be loaded in the background,
            avoiding the need for full page reloads. This sparked a renaissance period of
            JavaScript, spearheaded by open-source libraries and the communities that formed around
            them. Many new libraries were created, including jQuery, Prototype, Dojo Toolkit, and
            MooTools.
          </p>
          <p>
            Google debuted its Chrome browser in 2008, with the V8 JavaScript engine that was faster
            than its competition. The key innovation was just-in-time compilation (JIT), so other
            browser vendors needed to overhaul their engines for JIT.
          </p>
          <p>
            In July 2008, these disparate parties came together for a conference in Oslo. This led
            to the eventual agreement in early 2009 to combine all relevant work and drive the
            language forward. The result was the ECMAScript 5 standard, released in December 2009.
          </p>
          <h2 id='five'>Reaching maturity</h2>
          <p>
            Ambitious work on the language continued for several years, culminating in an extensive
            collection of additions and refinements being formalized with the publication of
            ECMAScript 6 in 2015.
          </p>
          <p>
            The creation of Node.js in 2009 by Ryan Dahl sparked a significant increase in the usage
            of JavaScript outside of web browsers. Node combines the V8 engine, an event loop, and
            I/O APIs, thereby providing a stand-alone JavaScript runtime system. As of 2018, Node
            had been used by millions of developers, and npm had the most modules of any package
            manager in the world.
          </p>
          <p>
            The ECMAScript draft specification is currently maintained openly on GitHub, and
            editions are produced via regular annual snapshots. Potential revisions to the language
            are vetted through a comprehensive proposal process. Now, instead of edition numbers,
            developers check the status of upcoming features individually.
          </p>
          <p>
            The current JavaScript ecosystem has many libraries and frameworks, established
            programming practices, and substantial usage of JavaScript outside of web browsers.
            Plus, with the rise of single-page applications and other JavaScript-heavy websites,
            several transpilers have been created to aid the development process.
          </p>
          <img src={history} alt='js-history' />
          <a href='https://en.wikipedia.org/wiki/JavaScript#History'>Source</a>
        </div>
        <div className='sidenav'>
          <a href='#one'>Creation at Netscape</a>
          <a href='#two'>Adoption by Microsoft</a>
          <a href='#three'>The rise of JScript</a>
          <a href='#four'>Growth and standardization</a>
          <a href='#five'>Reaching maturity</a>
        </div>
        <div className='footer'>
          All rights reserved
          <a href='mailto: 3la.jah0da@gmail.com'> 3la.jah0da</a>
        </div>
      </div>
    </div>
  )
}
export default JsHistory
