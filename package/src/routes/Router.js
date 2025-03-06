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
import Login from "../components/dashboard/login.jsx";

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

const ThemeRoutes = (isAuthenticated) => [
  {
  
      path: "/",
      element: !isAuthenticated ? <Login /> : <FullLayout />,
  

    children: [
      { path: "/",   element: isAuthenticated ? <Navigate to="/starter" /> : <Navigate to="/login" /> },
      { path: "/starter", exact: true, element: isAuthenticated ? <Starter /> : <Navigate to="/login" /> },
      { path: "/servicesarea", exact: true, element: isAuthenticated ? <ServiceArea /> : <Navigate to="/login" /> },
      { path:"update-service/:id", exact: true, element: isAuthenticated ? <AddService/> : <Navigate to="/login" /> },
      { path:"update-suservice/:id", exact: true, element: isAuthenticated ? <AddSuService/> : <Navigate to="/login" /> },
      { path: "/approch", exact: true, element: isAuthenticated ? <ApprochTables /> : <Navigate to="/login" /> },
      { path:"update-approch/:id", exact: true, element: isAuthenticated ? <AddAppproch/> : <Navigate to="/login" /> },
      { path:"/addapproch", exact: true, element: isAuthenticated ? <AddAppproch/> : <Navigate to="/login" /> },
      { path:"update-social/:id", exact: true, element: isAuthenticated ? <AddSocial/> : <Navigate to="/login" /> },
      { path:"/addsocial", exact: true, element: isAuthenticated ? <AddSocial/> : <Navigate to="/login" /> },
      { path:"/social", exact: true, element: isAuthenticated ? <SocialTables/> : <Navigate to="/login" /> },
    
      {
        path: "/login",
        element: !isAuthenticated ? <Login /> : <Navigate to="/" />,
      },

      { path: "/addservicearea", exact: true, element: isAuthenticated ? <AddServiceArea /> : <Navigate to="/login" /> },
      { path:"update-service-area/:id", exact: true, element: isAuthenticated ? <UpdateServiceArea/> : <Navigate to="/login" /> },
      { path:"updatenews/:id", exact: true, element: isAuthenticated ? <UpdateNews/> : <Navigate to="/login" /> },
      { path: "/suservice", exact: true, element: isAuthenticated ? <SuServiceTables /> : <Navigate to="/login" /> },

      { path: "/addservice", exact: true, element: isAuthenticated ? <AddService /> : <Navigate to="/login" /> },
      { path: "/addsuservice", exact: true, element: isAuthenticated ? <AddSuService /> : <Navigate to="/login" /> },
      { path: "/addnews", exact: true, element: isAuthenticated ? <AddNews /> : <Navigate to="/login" /> },
      { path: "/addcontact", exact: true, element: isAuthenticated ? <AddContact /> : <Navigate to="/login" /> },

      { path: "/setting", exact: true, element: isAuthenticated ? <AddSetting /> : <Navigate to="/login" /> },
      { path: "/homeslider", exact: true, element: isAuthenticated ? <HomeSliderTables /> : <Navigate to="/login" /> },
      { path: "/addslider", exact: true, element: isAuthenticated ? <AddHomeSlider /> : <Navigate to="/login" /> },
      { path:"update-homeslider/:id", exact: true, element: isAuthenticated ? <AddHomeSlider/> : <Navigate to="/login" /> },

      { path: "/services", exact: true, element: isAuthenticated ? <ServiceTables /> : <Navigate to="/login" /> },
      { path: "/seoservice", exact: true, element: isAuthenticated ? <AddServiceSeo /> : <Navigate to="/login" /> },
      { path: "/seoservicearea", exact: true, element: isAuthenticated ? <AddServiceAreaSeo /> : <Navigate to="/login" /> },
      { path: "/seonews", exact: true, element: isAuthenticated ? <AddNewsSeo/> : <Navigate to="/login" /> },

      { path: "/news", exact: true, element: isAuthenticated ? <NewsTables /> : <Navigate to="/login" /> },
      { path: "/inquiry", exact: true, element: isAuthenticated ? <InquiryTables/> : <Navigate to="/login" /> },
      { path: "/jobs", exact: true, element: isAuthenticated ? <JobTables /> : <Navigate to="/login" /> },
      { path: "/addjobs", exact: true, element: isAuthenticated ? <Addjops /> : <Navigate to="/login" /> },
      { path: "editjobs/:id", exact: true, element: isAuthenticated ? <Addjops /> : <Navigate to="/login" /> },

      { path: "/jobsseo", exact: true, element: isAuthenticated ? <AddSeo /> : <Navigate to="/login" /> },

      { path: "/contact", exact: true, element: isAuthenticated ? <Addadress /> : <Navigate to="/login" /> },

      { path: "/about", exact: true, element: isAuthenticated ? <About /> : <Navigate to="/login" /> },
      { path: "/alerts", exact: true, element: isAuthenticated ? <Alerts /> : <Navigate to="/login" /> },
      { path: "/badges", exact: true, element: isAuthenticated ? <Badges /> : <Navigate to="/login" /> },
      { path: "/buttons", exact: true, element: isAuthenticated ? <Buttons /> : <Navigate to="/login" /> },
      { path: "/cards", exact: true, element: isAuthenticated ? <Cards /> : <Navigate to="/login" /> },
      { path: "/grid", exact: true, element: isAuthenticated ? <Grid /> : <Navigate to="/login" /> },
      { path: "/table", exact: true, element: isAuthenticated ? <Tables /> : <Navigate to="/login" /> },
      { path: "/certificate", exact: true, element: isAuthenticated ? <CertificateTables /> : <Navigate to="/login" /> },
      { path: "/team", exact: true, element: isAuthenticated ? <TeamTables/> : <Navigate to="/login" /> },
      { path: "/whyus", exact: true, element: isAuthenticated ? <AddWhyUs /> : <Navigate to="/login" /> },

      { path: "/faq", exact: true, element: isAuthenticated ? <FAQTables/> : <Navigate to="/login" /> },
      { path: "/test", exact: true, element: isAuthenticated ? <TestsTables /> : <Navigate to="/login" /> },
      { path: "/addfaq", exact: true, element: isAuthenticated ? <AddFaq/> : <Navigate to="/login" /> },
      { path: "/addtest", exact: true, element: isAuthenticated ? <AddTest /> : <Navigate to="/login" /> },
      { path:"updatefaq/:id", exact: true, element: isAuthenticated ? <AddFaq/> : <Navigate to="/login" /> },
      { path:"updatetest/:id", exact: true, element: isAuthenticated ? <AddTest/> : <Navigate to="/login" /> },
      { path: "/addcertificate", exact: true, element: isAuthenticated ? <AddCertificate/> : <Navigate to="/login" /> },
      { path:"updatecertificate/:id", exact: true, element: isAuthenticated ? <AddCertificate/> : <Navigate to="/login" /> },
      { path: "/addteam", exact: true, element: isAuthenticated ? <AddTeam/> : <Navigate to="/login" /> },
      { path:"updateteam/:id", exact: true, element: isAuthenticated ? <AddTeam/> : <Navigate to="/login" /> },


      { path: "/forms", exact: true, element: isAuthenticated ? <Forms /> : <Navigate to="/login" /> },
      { path: "/breadcrumbs", exact: true, element: isAuthenticated ? <Breadcrumbs /> : <Navigate to="/login" /> },
    ],
  },
];

export default ThemeRoutes;
