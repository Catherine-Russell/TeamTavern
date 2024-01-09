import React, { useEffect, useState } from 'react';
import isTokenValid from '../Utility/isTokenValid';
import IncomingWagers from './myAccountPageComponents/IncomingWagers';
import OngoingWagers from './myAccountPageComponents/ongoingWagers';
import PendingWagers from './myAccountPageComponents/PendingWagers';
import PastWagers from './myAccountPageComponents/PastWagers';
import getSessionUserID from '../Utility/getSignedInUser_id';
import UnresolvedWagers from './myAccountPageComponents/UnresolvedWagers';
import NotificationDetails from './myAccountPageComponents/NotificationDetails';
import VertNavbar from '../VertNavBar/VertNavBar';
import Header from '../header/Header';
import '../../Pages/style.css'



const MyAccountPage = ({ navigate }) => {
  // const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [wagers, setWagers] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const [expanded, setExpanded] = useState(true);
  const [LoggedInUserID, setLoggedInUserID] = useState (getSessionUserID(token))



// Returns True if deadline has not yet passed, false if deadline is over and wager is complete
  const checkIfOngoing = (deadline) => {
    const currentDate = new Date()
    const deadlineDate = new Date(deadline)
    return (deadlineDate > currentDate)
    }


    useEffect(() => {
      const fetchData = async () => {
        try {
          if (token) {
            const response = await fetch('/wagers', {
              method: 'GET',
              headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            window.localStorage.setItem('token', data.token);
            setToken(window.localStorage.getItem('token'));
            setWagers(data.wagers);
          }
        } catch (error) {
          console.error('Error fetching wagers:', error);
          // Handle error (e.g., set state to display an error message)
        }
      };
      fetchData();
      console.log(wagers)


    if (!isLoggedIn) {navigate('/');}
    }, [navigate, isLoggedIn, token]);

    
    // added an extra filter to show wagers that the signed in user is involved with
    const myWagers = wagers.filter(wager => wager.peopleInvolved[0]._id === LoggedInUserID || wager.peopleInvolved[1]._id === LoggedInUserID)
    // Gets wagers which have been sent from other users to be approved by logged-in user
    const wagerRequests = myWagers.filter(wager => wager.approved === false && wager.peopleInvolved[1]._id === LoggedInUserID)
    // Gets ongoing wagers -> they have been approved by both users and are still within the time limit
    const ongoingWagers = myWagers.filter(wager => wager.approved === true && checkIfOngoing(wager.deadline) && wager.winner === null)
    // Gets pending wagers -> they have been sent but not yet approved by the person you sent it to
    const pendingWagers = myWagers.filter(wager => wager.peopleInvolved[0]._id === LoggedInUserID && wager.approved === false)
    // Gets unresolved wagers -> they are past the deadline, have been approved  but haven't declared a winner yet
    const unresolvedWagers = myWagers.filter(wager => checkIfOngoing(wager.deadline) === false && wager.winner._id === null && wager.approved !== false)
    // Gets past wagers -> wagers which have been resolved and have a winner declared
    const pastWagers = myWagers.filter(wager => wager.winner != null)
    
    const toggleExpand = () => {setExpanded(!expanded);};
  
    useEffect(() => {

      if (!isLoggedIn) {navigate('/');}
      }, [navigate, isLoggedIn]);
  
      return (
        <div>
          <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
          <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
          <Header />
          <h1 id="my-account-page-heading" className='page-heading'> <NotificationDetails userId = {LoggedInUserID} messageAfterName={"'s Wagers"} /></h1>
          <IncomingWagers wagers = { wagerRequests }/>    
					<OngoingWagers ongoingWagers = { ongoingWagers }/>
					<PendingWagers pendingWagers = { pendingWagers }/>
					<UnresolvedWagers unresolvedWagers = { unresolvedWagers }/>
					<PastWagers pastWagers = { pastWagers }/>

          </div>
        </div>
      )};
    
  export default MyAccountPage;






    
  

 



