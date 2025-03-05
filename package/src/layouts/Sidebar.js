import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import user1 from "../assets/images/users/user4.jpg";
import probg from "../assets/images/bg/download.jpg";

const navigation = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Services Area",
    href: "/servicesarea",
    icon: "bi bi-globe",
  },
  
  {
    title: "Services",
    href: "/services",
    icon: "bi bi-tools",
  },
  {
    title: "News",
    href: "/news",
    icon: "bi bi-newspaper",
  },
  {
    title: "Inquiry",
    href: "/inquiry",
    icon: "bi bi-file-text",
  },
  {
    title: "jobs",
    href: "/jobs",
    icon: "bi bi-clipboard-check",
  },
  {
    title: "Certification",
    href: "/certificate",
    icon: "bi bi-award",
  },
  {
    title: "Team",
    href: "/team",
    icon: "bi bi-person-lines-fill",
  },
  {
    title: " Our Approach",
    href: "/approch",
    icon: "bi bi-gear"
  },

  {
    title: " Why us ",
    href: "/whyus ",
    icon: "bi bi-gear"
  },


  {
    title: " Social Links ",
    href: "/social",
    icon: "bi bi-link",
  },


 
  {
    title: "Contact Us",
    href: "/contact",
    icon: "bi bi-people",
  },
  {
    title: "FAQS",
    href: "/faq",
    icon: "bi bi-question-circle",
  },
  {
    title: "Testimonal",
    href: "/test",
    icon: "bi bi-chat-quote",
  },


  {
    title: "About",
    href: "/about",
    icon: "bi bi-people",
  },
  {
    title: "Home Slider",
    href: "/homeslider",
    icon: "bi bi-slider"  // Another valid icon for settings
  },
  {
    title: "Setting",
    href: "/setting",
    icon: "bi bi-gear"  // Another valid icon for settings
  },

    // {


  //   title: "Badges",
  //   href: "/badges",
  //   icon: "bi bi-patch-check",
  // },
  // {
  //   title: "Buttons",
  //   href: "/buttons",
  //   icon: "bi bi-hdd-stack",
  // },
  // {
  //   title: "Cards",
  //   href: "/cards",
  //   icon: "bi bi-card-text",
  // },
  // {
  //   title: "Grid",
  //   href: "/grid",
  //   icon: "bi bi-columns",
  // },
  // {
  //   title: "Table",
  //   href: "/table",
  //   icon: "bi bi-layout-split",
  // },
  // {
  //   title: "Forms",
  //   href: "/forms",
  //   icon: "bi bi-textarea-resize",
  // },
  // {
  //   title: "Breadcrumbs",
  //   href: "/breadcrumbs",
  //   icon: "bi bi-link",
  // },
 
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div>
      <div className="d-flex align-items-center"></div>
      <div
        className="profilebg"
        style={{ background: `url(${probg}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          <img src={user1} alt="user" width="50" className="rounded-circle" />
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
        <div className="bg-dark text-white p-2 opacity-75">Adil </div>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
                <Button className="mt-4" color="danger"  >
            Wesite
          </Button>      
          
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
