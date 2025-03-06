import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ServiceArea from "../views/ui/ServiceArea.js";
import ServiceTables from "../components/dashboard/Service.js";
import NewsTables from "../components/dashboard/News.js";
import JobTables from "../components/dashboard/Jobs.js";
import ContactTables from "../components/dashboard/Contact.js";
import InquiryTables from "../components/dashboard/Inquiry.js";
import AddServiceArea from "../components/dashboard/AddServiceArea.js";
import AddService from "../components/dashboard/AddService.js";
import AddNews from "../components/dashboard/AddNews.js";
import AddContact from "../components/dashboard/AddContact.js";
import UpdateServiceArea from "../components/dashboard/EditServiceArea.js";
import UpdateNews from "../components/dashboard/EditNew.js";
import Addadress from "../components/dashboard/AddContact.js";
import FAQTables from "../components/dashboard/Faqs.js";
import TestsTables from "../components/dashboard/Testimonal.js";
import AddTest from "../components/dashboard/AddTest.js";
import AddFaq from "../components/dashboard/Addfaq.js";
import CertificateTables from "../components/dashboard/Certifications.js";
import AddCertificate from "../components/dashboard/AddCertificate.js";
import AddTeam from "../components/dashboard/AddTeam.js";
import TeamTables from "../components/dashboard/Team.js";
import AddSuService from "../components/dashboard/AddSusService.js";
import SuServiceTables from "../components/dashboard/SuService.js";
import ApprochTables from "../components/dashboard/OurApproch.js";
import AddAppproch from "../components/dashboard/AddAppproch.js";
import AddWhyUs from "../components/dashboard/Addwhyus.js";
import AddSocial from "../components/dashboard/Addsocal.js";
import SocialTables from "../components/dashboard/Sociamedia.js";
import AddSetting from "../components/dashboard/AddSerting.js";
import AddServiceSeo from "../components/dashboard/AddServiceMeta.js";
import AddServiceAreaSeo from "../components/dashboard/AddServiceAreaMeta.js";
import AddNewsSeo from "../components/dashboard/AddServiceNewsMeta.js";
import AddSeo from "../components/dashboard/Addjopsseo.js";
import HomeSliderTables from "../components/dashboard/HomeSlider.jsx";
import AddHomeSlider from "../components/dashboard/AddHomeSlider.js";
import Addjops from "../components/dashboard/Addjons.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/servicesarea", exact: true, element: <ServiceArea /> },
      { path:"update-service/:id", exact: true, element: <AddService/> },
      { path:"update-suservice/:id", exact: true, element: <AddSuService/> },
      { path: "/approch", exact: true, element: <ApprochTables /> },
      { path:"update-approch/:id", exact: true, element: <AddAppproch/> },
      { path:"/addapproch", exact: true, element: <AddAppproch/> },
      { path:"update-social/:id", exact: true, element: <AddSocial/> },
      { path:"/addsocial", exact: true, element: <AddSocial/> },
      { path:"/social", exact: true, element: <SocialTables/> },





      
      { path: "/addservicearea", exact: true, element: <AddServiceArea /> },
      { path:"update-service-area/:id", exact: true, element: <UpdateServiceArea/> },
      { path:"updatenews/:id", exact: true, element: <UpdateNews/> },
      { path: "/suservice", exact: true, element: <SuServiceTables /> },

      { path: "/addservice", exact: true, element: <AddService /> },
      { path: "/addsuservice", exact: true, element: <AddSuService /> },
      { path: "/addnews", exact: true, element: <AddNews /> },
      { path: "/addcontact", exact: true, element: <AddContact /> },

      { path: "/setting", exact: true, element: <AddSetting /> },
      { path: "/homeslider", exact: true, element: <HomeSliderTables /> },
      { path: "/addslider", exact: true, element: <AddHomeSlider /> },
      { path:"update-homeslider/:id", exact: true, element: <AddHomeSlider/> },

      { path: "/services", exact: true, element: <ServiceTables /> },
      { path: "/seoservice", exact: true, element: <AddServiceSeo /> },
      { path: "/seoservicearea", exact: true, element: <AddServiceAreaSeo /> },
      { path: "/seonews", exact: true, element: <AddNewsSeo/> },

      { path: "/news", exact: true, element: <NewsTables /> },
      { path: "/inquiry", exact: true, element: <InquiryTables/> },
      { path: "/jobs", exact: true, element: <JobTables /> },
      { path: "/addjobs", exact: true, element: <Addjops /> },
      { path: "editjobs/:id", exact: true, element: <Addjops /> },

      { path: "/jobsseo", exact: true, element: <AddSeo /> },

      { path: "/contact", exact: true, element: <Addadress /> },

      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/certificate", exact: true, element: <CertificateTables /> },
      { path: "/team", exact: true, element: <TeamTables/> },
      { path: "/whyus", exact: true, element: <AddWhyUs /> },

      { path: "/faq", exact: true, element: <FAQTables/> },
      { path: "/test", exact: true, element: <TestsTables /> },
      { path: "/addfaq", exact: true, element: <AddFaq/> },
      { path: "/addtest", exact: true, element: <AddTest /> },
      { path:"updatefaq/:id", exact: true, element: <AddFaq/> },
      { path:"updatetest/:id", exact: true, element: <AddTest/> },
      { path: "/addcertificate", exact: true, element: <AddCertificate/> },
      { path:"updatecertificate/:id", exact: true, element: <AddCertificate/> },
      { path: "/addteam", exact: true, element: <AddTeam/> },
      { path:"updateteam/:id", exact: true, element: <AddTeam/> },


      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],
  },
];

export default ThemeRoutes;
