import { Container } from "next/app"
import Head from "next/head"
import { useRouter } from "next/router"
import { parseCookies, setCookie } from "nookies"
import { useEffect, useState } from "react"
import Footer from "../../../components/layout/footer/Footer"
import Header from "../../../components/layout/header/Header"
import actions from "../../../store/actions"
import agent from "../../../utils/agent"
import language_contant from "../../../utils/language_contant"
import ProfileSidebar from "../../../components/ui/profile/ProfileSidebar"
import MyProfileLayout from "../../../components/layout/profile/MyProfileLayout"
const ProfilePage = (props) => {
    console.log("checkImgUrl ProfilePage props", props);
    const router = useRouter()
    const [localProfileIcon, setLocalProfileIcon] = useState("")

    function logOut() {
        setCookie(this, actions.GET_USER_INFO, JSON.stringify({ user_info: null }), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
        });
        router.push("/")
    }

    language_contant.setLang(router.query.lang)
    function openNav() {
        document.getElementById("myDIV").classList.add('display-profile');
    }
    return (
        <Container>
            <Head>
                <title>{props.user_info ? `${props.user_info.user.first_name} ${props.user_info.user.last_name}` : "User Profile"} : Mana Musu</title>
                <meta name="description" content="This is how to use page" key="description" />
            </Head>

            <Header lang={router.query.lang} localProfileIcon={localProfileIcon}  {...props} />
            <div class="layout-content">
                <section>
                    <div class="profile">
                        <div class="container">
                            <div class="row gx-md-5 justify-content-center">
                                <ProfileSidebar router={router} activeTab={"profile"} setLocalProfileIcon={setLocalProfileIcon} logOut={logOut}{...props} />

                                <div class="col-lg-9">
                                    <i class="fas fa-bars d-block d-lg-none text-primary toogle-btn" onClick={() => openNav()}></i>
                                    <div class="tab-content" id="v-pills-tabContent">
                                        <div class="tab-pane fade show active" id="v-pills-post" role="tabpanel" aria-labelledby="v-pills-post-tab">
                                            <MyProfileLayout router={router} {...props} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </Container>
    )
}
ProfilePage.getInitialProps = async ctx => {
    console.log("ProfilePage getInitialProps called");

    const userObj = parseCookies(ctx)[actions.GET_USER_INFO]
    const chatBookingId = parseCookies(ctx)[actions.GET_LAST_CHAT_BOOKING_ID]
    const obj = userObj ? JSON.parse(userObj) : { user_info: null };
    const staticData = await agent.Common.staticData()
    if (obj.user_info) {
        agent.setToken(obj.user_info.token)
        try {
            const profile = await agent.Profile.get()

            setCookie(ctx, actions.GET_USER_DETAILS, JSON.stringify({ ...profile }), {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });

            return {
                ...obj,
                ...profile,
                ...staticData,
                chatBookingId,
                event: [
                    {
                        start: new Date("2021, 06, 07"),
                        end: new Date("2021, 06, 10"),
                        title: "Some title"
                    }, {
                        start: new Date("2021, 06, 27"),
                        end: new Date("2021, 06, 29"),
                        title: "Some title 2"
                    },
                ],
            }
        } catch (error) {
            setCookie(this, actions.GET_USER_INFO, JSON.stringify({ user_info: null }), {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });
            return {
                ...obj,
                ...staticData,
                user_info: null,
                chatBookingId,
                event: [
                    {
                        start: new Date("2021, 06, 07"),
                        end: new Date("2021, 06, 10"),
                        title: "Some title"
                    }, {
                        start: new Date("2021, 06, 27"),
                        end: new Date("2021, 06, 29"),
                        title: "Some title 2"
                    },
                ],
            }
        }
    } else {
        return {
            ...obj,
            ...staticData,
            userDetail: null,
            user_info: null,
            event: [],
            chatBookingId,
        }
    }
};

export default ProfilePage