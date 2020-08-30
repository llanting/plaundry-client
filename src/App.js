import React, {useState, useEffect} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {API_URL} from './config';
import axios from 'axios';
//#region Components
import SignIn from './components/SignIn';
import AdminSignIn from './components/AdminSignIn';
import SignUp from './components/SignUp';
import AdminView from './components/AdminView';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import StartUp from './components/StartUp';
import Home from './components/Home';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import userDetails from './components/UserDetails';
//#endregion Components

import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import UserDetails from './components/UserDetails';


function App() {

  const [laundryitems, setLaundryItems] = useState([]);
  const [loggedInUser, setLogIn] = useState(null);
  const [toIntro, setToIntro] = useState(false);
  const [adminUser, setAdminUser] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/laundry`)
      .then((res) => {
        setLaundryItems(res.data)
      })
    if(!loggedInUser){
      axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          setLogIn(result.data)
        })
    }
  }, [loggedInUser])

  const [toHome, setToHome] = useState(false);
  const [toAdminHome, setToAdminHome] = useState(false);
  const [toLogOut, setLogOut] = useState(false);
  const [errMessage, setErr] = useState(null);
  const [err, setErrStatus] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    const {email, password} = e.currentTarget;
    axios.post(`${API_URL}/signin`, {email: email.value, password: password.value},  {withCredentials: true})
      .then((result) => {
        setLogIn(result.data)
        setTimeout(() => setToHome(true), 500)
      })
      .catch((err) => {
        setErrStatus(true);
        let error = err.response.data.error
        setErr(error);
      })
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    const {username, email, password} = e.currentTarget;
    axios.post(`${API_URL}/signup`, {username: username.value, email: email.value, password: password.value},  {withCredentials: true})
      .then((result) => {
        setLogIn(result.data)
        setTimeout(() => setToHome(true), 500)
      })
      .catch((err) => {
        setErrStatus(true);
        let error = err.response.data.errorMessage
        setErr(error);
      })
  }

  const [adminErr, setAdminErr] = useState(false);


  const handleAdminSignIn = (e) => {
    e.preventDefault();
    const {email, password} = e.currentTarget;
    axios.post(`${API_URL}/admin/signin`, {email: email.value, password: password.value},  {withCredentials: true})
      .then((result) => {
        setLogIn(result.data)
        setAdminUser(true);
        setTimeout(() => setToAdminHome(true), 500)
      })
      .catch((err) => {
        setAdminErr(true);
        let error = err.response.data.error
        setErr(error);
      })
  }

  const handleAdminLogOut = () => {
    axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
      .then(() => {
        setLogIn(null)
        setLogOut(true);
      })  
  }

  const handleCreateItem = (e) => {
    e.preventDefault();
    const {name, description, price, category, image} = e.currentTarget;
    let uploadData = new FormData();
    uploadData.append("imageUrl", image.files[0]);

    axios.post(`${API_URL}/upload`, uploadData)
      .then((response) => {
        axios.post(`${API_URL}/laundry/create`, {
          name: name.value, 
          category: category.value, 
          description: description.value, 
          price: price.value,
          image: response.data.image
        }, {withCredentials: true})
          .then((result) => {
            let newItem = result.data;
            let cloneItems = JSON.parse(JSON.stringify(laundryitems))
            cloneItems.push(newItem)
            setLaundryItems(cloneItems)
      })
    })
  }

  const handleEditItem = (updatedLaundry) => {
    axios.post(`${API_URL}/laundry/${updatedLaundry._id}/edit`, {
      name: updatedLaundry.name,
      description: updatedLaundry.description,
      price: updatedLaundry.price,
      category: updatedLaundry.category,
      image: updatedLaundry.image

    },  {withCredentials: true})
      .then(() => {
        let clonedLaundryItems = laundryitems.map((item) => {
          if (item._id === updatedLaundry._id) {
            item = updatedLaundry
          }
          return item;
        })
        setLaundryItems(clonedLaundryItems)
      })
  }

  const handleDeleteItem = (id) => {
    axios.delete(`${API_URL}/laundry/${id}/delete`,  {withCredentials: true})
      .then(() => {
        let filteredLaundryItems = laundryitems.filter((laundry) => {
          return laundry._id !== id;
        })
        setLaundryItems(filteredLaundryItems)
      })
  }

  const handleLogOut = () => {
    console.log('worked')
    axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
      .then(() => {
        localStorage.clear();
        setLogIn(null);
        setTimeout(() => setToIntro(true), 500)
        setTimeout(() => setToIntro(false), 700)
      })
  }
  return (
    <div>
      <Switch>
        <Route exact path="/" component={StartUp}/>
        <Route path="/sign-in" render={() => {
          return <SignIn toHome={toHome} onSignIn={handleSignIn} err={err}
          errorMessage={errMessage}/>
        }} />
        <Route path="/sign-up" render={() => {
          return <SignUp toHome={toHome} onSignUp={handleSignUp} err={err}
          errorMessage={errMessage}/>
        }} />
         <Route exact path="/admin" render={() => {
          return <AdminView 
                    laundrylist={laundryitems} 
                    onCreate={handleCreateItem} 
                    onDelete={handleDeleteItem} 
                    onAdminLogOut={handleAdminLogOut} 
                    onEdit={handleEditItem} 
                    loggedInUser={loggedInUser} 
                    onLogOut={toLogOut}
                    adminUser={adminUser}
                  />
         }} />
        <Route path="/home" render ={() => {
          return <Home onLogOut={handleLogOut} laundrylist={laundryitems} loggedInUser={loggedInUser} toIntro = {toIntro}/>
        }}/>
        <Route path="/admin/sign-in" render={() => {
          return <AdminSignIn 
                    toAdminHome={toAdminHome} 
                    onAdminLogOut={handleAdminLogOut} 
                    onSignIn={handleAdminSignIn} 
                    loggedInUser={loggedInUser} 
                    adminErr={adminErr}
                    errorMessage={errMessage}
                  />
        }} />
        <Route exact path="/admin/delivery" render={() => {
          return <OrderList loggedInUser={loggedInUser} />
        }} />
        <Route path="/admin/delivery/:id/details" render={(routeProps) => {
          return <OrderDetails {...routeProps} loggedInUser={loggedInUser}/>
        }} />
        <Route path="/cart" render={()=>{
          return <Cart loggedInUser={loggedInUser}/>
        }}/>
        <Route path="/userDetails" render={()=>{
          return <UserDetails loggedInUser={loggedInUser}/>
        }}/>
        <Route path="/checkout" render={()=>{
          return <Checkout loggedInUser={loggedInUser}/>
        }}/>
      </Switch>
    </div>
  );
}

export default withRouter(App);
