import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <Link to="/alerts">
      <div className="block" style={{color: 'white'}}>
        Alerts
      </div>
    </Link>
    <Link to="/daily-balance">
      <div className="block">
        Daily Financial Balance
      </div>
    </Link>
    <Link to="/customer-spotlight">
      <div className="block">
        Customer Spotlight
      </div>
    </Link>
    <Link to="/monthly-balance">
      <div className="block">
        Monthly Financial Balance
      </div>
    </Link>
  </div>
);

export default Home;