import './App.css';
import Login from './components/Login';
import ContactForm from './components/ContactForm';
import CaseStudy from './components/CaseStudy';
import CaseStudies from './components/CaseStudies';
import Applications from './components/Applications';
import ApplicationForm from './components/ApplicationForm';
import { Authprovider } from './components/Authcontext';
import ProtectedRoute from './components/ProtectedRoute';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import Jobpost from './components/Jobpost';
import JobDashboard from './components/JobDashboard';
import ClientLogos from './components/ClientLogos';
import Logos from './components/Logos';
import Clientreviewform from './components/Clientreviewform';
import Clentreviews from './components/Clentreviews';
function App() {
  return (
    <Authprovider>
     
      <Outlet />
    </Authprovider>
  );
}

export const approuter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path:"/applications",
        element:<ApplicationForm />
      },
      {
        path:"/applicationsdata",
        element:<Applications />
      },
      {
        path:"/contactform",
        element:<ContactForm />
      },
      {
        path:"/contact",
        element:<Contact />
      },{
        path:"/casestudiesform",
        element:<CaseStudies />
      },{
        path:"/casestudy",
        element:<CaseStudy />
      },{
        path:"/jobpost",
        element:<Jobpost />
      },{
        path:"/jobdetails",
        element:<JobDashboard />
      },{
        path:"/jobpost/:id" ,
        element:<Jobpost />
      },{
        path:"/logoform",
        element:<ClientLogos />
      },{
        path:"/clientlogos",
        element:<Logos/>
      },{
        path:"/clientreviewform",
        element:<Clientreviewform />
      },
      {
        path:"/clientreview",
        element:<Clentreviews />
        
      }
    ]
  }
]);

export default App;
