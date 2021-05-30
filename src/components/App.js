import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Customer from "./Customer";
import NavBar from "./NavBar";
import CustomerDetail from "./CustomerDetail";

function App() {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const url = "https://intense-tor-76305.herokuapp.com/merchants";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setCustomerData(data);
      });
  }, []);

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <div>
                <Customer customerData={customerData} />
              </div>
            );
          }}
        />
        <Route
          exact
          path="/customer-detail/:customer_id"
          component={CustomerDetail}
        />
      </Switch>
    </Router>
  );
}

export default App;
