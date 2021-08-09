// // import fs from "fs";

// const Sitemap = () => { };
// const encode = encodeURIComponent;

// export const getServerSideProps = async ({ res }) => {
//   const baseUrl = "http://manamusu.com";

//   // const staticPages = fs
//   //   .readdirSync("pages")
//   //   .filter((staticPage) => {
//   //     console.log("staticPage", staticPage);
//   //     return ![
//   //       "_app.js",
//   //       "sitemap.xml.js",
//   //     ].includes(staticPage);
//   //   })
//   //   .map((staticPagePath) => {
//   //     return `${baseUrl}/${staticPagePath}`;
//   //   });
//   const fetchRes = await fetch('https://jsonplaceholder.typicode.com/todos')
//   const fetchJson = await fetchRes.json()

//   console.log("data json", fetchJson);
//   let rowUrls = []

//   rowUrls.push(`${baseUrl}`)
//   rowUrls.push(`${baseUrl}/about-us`)
//   rowUrls.push(`${baseUrl}/how-to-use`)
//   rowUrls.push(`${baseUrl}/contact`)
//   rowUrls.push(`${baseUrl}/support`)
//   rowUrls.push(`${baseUrl}/careers`)
//   rowUrls.push(`${baseUrl}/blog`)
//   rowUrls.push(`${baseUrl}/terms-condition`)
//   rowUrls.push(`${baseUrl}/help`)
//   rowUrls.push(`${baseUrl}/sign-in`)
//   rowUrls.push(`${baseUrl}/sign-up`)
//   rowUrls.push(`${baseUrl}/teacher`)
//   rowUrls.push(`${baseUrl}/teacher/teacher_id`)
//   rowUrls.push(`${baseUrl}/teacher/teacher_id/post`)
//   rowUrls.push(`${baseUrl}/teacher/teacher_id/post/post_id`)
//   rowUrls.push(`${baseUrl}/student`)
//   rowUrls.push(`${baseUrl}/student/student_id`)
//   rowUrls.push(`${baseUrl}/student/student_id/post`)
//   rowUrls.push(`${baseUrl}/student/student_id/post/post_id`)

//   fetchJson.forEach(element => {
//     rowUrls.push(`${baseUrl}/post/${encode(element.title)}`)
//   });

//   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//       ${rowUrls
//       .map((url) => {
//         return `
//             <url>
//               <loc>${url}</loc>
//               <lastmod>${new Date().toISOString()}</lastmod>
//               <changefreq>monthly</changefreq>
//               <priority>1.0</priority>
//             </url>
//           `;
//       })
//       .join("")}
//     </urlset>
//   `;

//   res.setHeader("Content-Type", "text/xml");
//   res.write(sitemap);
//   res.end();

//   return {
//     props: {},
//   };
// };

// export default Sitemap;


import { Container } from "next/app"
import Link from "next/link"
import Head from 'next/head'

import { useRouter } from "next/router"
import Footer from "../components/layout/footer/Footer"
import Header from "../components/layout/header/Header"
import CheckoutForm from "../components/ui/stripe_payment/CheckoutForm"
import language_contant from "../utils/language_contant"


import CalendarUi2 from "../components/ui/calendar/CalendarUi2"
import { parseCookies } from "nookies"
import actions from "../store/actions"

const CreateNewRequestPage = props => {
    const router = useRouter()
    language_contant.setLang(router.query.lang)
    return (
        <Container>

            <Head>
                <title>Create new request : Mana Musu</title>
                <meta name="description" content="This is create new request page" key="description" />
            </Head>

            <div class="layout-content">

                <Link href={`/${router.query.lang}/teacher/teacher1`}>Teacher 1</Link>
                <div className="container">

                </div>
            </div>
            <Footer />

        </Container>
    )
}
CreateNewRequestPage.getInitialProps = async ctx => {
    const userObj = parseCookies(ctx)[actions.GET_USER_INFO]
    return userObj ? JSON.parse(userObj) : {}
}
export default CreateNewRequestPage