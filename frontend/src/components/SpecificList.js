// import './App.css';
import { useParams } from "react-router-dom";

function SpecificList() {
    const { id } = useParams();

    return (
        <div>
            {id}
        </div>
    );
}
  
export default SpecificList;
  