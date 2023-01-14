
import Alertas from "./homepage/Alertas";

const Home = () => (
    <div className="content">
        <h1>Home</h1>
        <div className="alerts-board">
            <div className="alerts-board-title">
                <h2>Alertas</h2>
                <Alertas/>
            </div>
        </div>
    </div>
);

export default Home;
