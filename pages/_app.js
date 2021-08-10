import '../styles/globals.scss'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { configureLanguage } from "../utils/language";
import actions from '../store/actions';
import agent from '../utils/agent';
import { parseCookies, setCookie } from 'nookies';
import Router from 'next/router'
// import NProgress from 'nprogress'

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`);
  try {
    document.getElementById("websiteLogo").classList.add("elementToFadeInAndOut")

  } catch (error) {

  }
})
Router.events.on('routeChangeComplete', (e) => {
  try {
    document.getElementById("websiteLogo").classList.remove("elementToFadeInAndOut")

  } catch (error) {

  }
})
Router.events.on('routeChangeError', (e) => {
  try {
    document.getElementById("websiteLogo").classList.remove("elementToFadeInAndOut")

  } catch (error) {

  }
})

// When the user scrolls down 20px from the top of the document, show the button
if (typeof window !== "undefined") {
  window.onscroll = (ev) =>
    scrollFunction()

}
function scrollFunction() {
  var mybutton = document.getElementById("myBtn");

  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function MyApp({ Component, pageProps }) {
  console.log("MyApp props", pageProps);
  return <Container>
    <Head>
      <meta charset="utf-8" />
      {/* <link rel="icon" href="%PUBLIC_URL%/favicon.ico" /> */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="robots" content="index, follow" />
      {/* <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /> */}
      {/* <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}
      <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" />

      <title>Mana Musu : Start Learn Today</title>
      {/* <meta name="description" content="Learn new skills online with top Educators" key="description" /> */}

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"></script>

      <noscript>You need to enable JavaScript to run this app.</noscript>

    </Head>
    <Component {...pageProps} />

    <div onClick={() => topFunction()} id="myBtn" title="Go to top">
      <div class="back-top">
        <i class="fas fa-chevron-up"></i>
      </div>
    </div>
  </Container>

}

// MyApp.getInitialProps = async ctx => {

//   const staticDataObj = parseCookies(ctx)[actions.GET_STATIC_DATA]
//   if (staticDataObj) {
//     return staticDataObj ? JSON.parse(staticDataObj) : {}
//   } else {
//     const staticData = await agent.Common.staticData()
//     setCookie(this, actions.GET_STATIC_DATA, JSON.stringify({ ...staticData }), {
//       maxAge: 30 * 24 * 60 * 60,
//       path: "/",
//     });
//     return { ...staticData }
//   }
// };

export default MyApp
