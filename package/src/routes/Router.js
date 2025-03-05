import { lazy } from "react";
import { Navigate } from "react-router-dom";

// Views (UI)
const ServiceArea = lazy(() => import("../views/ui/ServiceArea.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

// Dashboard Components
const ServiceTables = lazy(() => import("../components/dashboard/Service.js"));
const NewsTables = lazy(() => import("../components/dashboard/News.js"));
const JobTables = lazy(() => import("../components/dashboard/Jobs.js"));
const ContactTables = lazy(() => import("../components/dashboard/Contact.js"));
const InquiryTables = lazy(() => import("../components/dashboard/Inquiry.js"));
const FAQTables = lazy(() => import("../components/dashboard/Faqs.js"));
const TestsTables = lazy(() => import("../components/dashboard/Testimonal.js"));
const CertificateTables = lazy(() => import("../components/dashboard/Certifications.js"));
const TeamTables = lazy(() => import("../components/dashboard/Team.js"));
const SuServiceTables = lazy(() => import("../components/dashboard/SuService.js"));
const ApprochTables = lazy(() => import("../components/dashboard/OurApproch.js"));
const SocialTables = lazy(() => import("../components/dashboard/Sociamedia.js"));
const HomeSliderTables = lazy(() => import("../components/dashboard/HomeSlider.jsx"));
const UpdateServiceArea =lazy(() => import("../components/dashboard/EditServiceArea.js"));
const UpdateNews=lazy(() => import( "../components/dashboard/EditNew.js"));

// Add Components
const AddServiceArea = lazy(() => import("../components/dashboard/AddServiceArea.js"));
const AddService = lazy(() => import("../components/dashboard/AddService.js"));
const AddNews = lazy(() => import("../components/dashboard/AddNews.js"));
const AddContact = lazy(() => import("../components/dashboard/AddContact.js"));
const Addadress = lazy(() => import("../components/dashboard/AddContact.js"));
const AddTest = lazy(() => import("../components/dashboard/AddTest.js"));
const AddFaq = lazy(() => import("../components/dashboard/Addfaq.js"));
const AddCertificate = lazy(() => import("../components/dashboard/AddCertificate.js"));
const AddTeam = lazy(() => import("../components/dashboard/AddTeam.js"));
const AddSuService = lazy(() => import("../components/dashboard/AddSusService.js"));
const AddAppproch = lazy(() => import("../components/dashboard/AddAppproch.js"));
const AddWhyUs = lazy(() => import("../components/dashboard/Addwhyus.js"));
const AddSocial = lazy(() => import("../components/dashboard/Addsocal.js"));
const AddSetting = lazy(() => import("../components/dashboard/AddSerting.js"));
const AddServiceSeo = lazy(() => import("../components/dashboard/AddServiceMeta.js"));
const AddServiceAreaSeo = lazy(() => import("../components/dashboard/AddServiceAreaMeta.js"));
const AddNewsSeo = lazy(() => import("../components/dashboard/AddServiceNewsMeta.js"));
const AddSeo = lazy(() => import("../components/dashboard/Addjopsseo.js"));
const AddHomeSlider = lazy(() => import("../components/dashboard/AddHomeSlider.js"));
const Addjops = lazy(() => import("../components/dashboard/Addjons.js"));

// Layout
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

// Pages
const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
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
