import './App.css';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Nav from './components/Nav';
import PersonalInfo from './components/PersonalInfo';
import { APIContext } from './contexts/APIContext';
import { useAPIContext } from './contexts/APIContext';
import {PersonalUpdateForm} from './components/PersonalInfo';
import SearchForm from './components/PropertyListPage';
import CreatePropertyForm from './components/CreatePropertyForm';
import Logout from './components/Logout';
import AuthenticateNav from './components/AuthenticateNav';
import PropertyDeatil from './components/PropertyDetailPage';
import MyPropertyList from './components/MyPropertyListPage';
import PropertyEditForm from './components/PropertyEditForm';
import PropertyDelete from './components/PropertyDelete';
import AddAvail from './components/CreatePropertyAvailForm';
import AvailList from './components/AvailList';
import AvailDelete from './components/PropertyAvailDelete';


function App() {
  // change the background color
  document.body.style.backgroundColor = "#fafafa";

  return (

      <BrowserRouter>

        <Routes>

          <Route path="/" element={
            <>
              <Nav/>
            </>
          }>
          
            <Route index element={
              < SearchForm />
            } />

            <Route path='/signup' element={
            
            <APIContext.Provider value={useAPIContext()}>

              <SignUpForm/>

            </APIContext.Provider>

            
            }/>

            <Route path="/login" element={

              <APIContext.Provider value={useAPIContext()}>
              
                <LoginForm/>

              </APIContext.Provider>
              
            
            }/>

            <Route path="/property/list" element={
              < SearchForm />
            } />

            <Route path="/property/detail" element={
              < PropertyDeatil  />
            } />


          </Route>

          <Route path="/authenticated" element={
            <>
              <AuthenticateNav/>
            </>
          }>

            <Route  path="/authenticated/property/list" element={
              < SearchForm />
            } />
          

            <Route path="/authenticated/user_info" element={
              <APIContext.Provider value={useAPIContext()}>
                <PersonalInfo/>
              </APIContext.Provider>
              }
            />

            <Route path="/authenticated/update_info" element={
              <APIContext.Provider value={useAPIContext()}>
                <PersonalUpdateForm/>
              </APIContext.Provider>
              }
            />


            <Route path="/authenticated/property/create" element={
              < CreatePropertyForm />
            } />

            <Route path="/authenticated/property/detail/:propertyID" element={
              < PropertyDeatil />
            } />

            <Route path="/authenticated/my/property/list" element={
              < MyPropertyList />
            } />

            <Route path="/authenticated/property/edit/:propertyID" element={
              < PropertyEditForm />
            } />

            <Route path="/authenticated/property/delete/:propertyID" element={
              < PropertyDelete />
            } />

            <Route path="/authenticated/property/:propertyID/avail/list" element={
              < AvailList />
            } />

            <Route path="/authenticated/property/:propertyID/avail/add" element={
              < AddAvail />
            } />

            <Route path="/authenticated/property/:propertyID/avail/:availID/delete" element={
              < AvailDelete />
            } />
          </Route>

        </Routes>
  
      </BrowserRouter>

  );
}

export default App;
