import React, {useEffect, useState} from "react";
import axios from "axios";

function App() {
  const [stamState, setStamState] = useState("")
  useEffect(() => {
    const fetchListData = async () => {
      const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/hello`)
      setStamState(result.data.message)
    }
    fetchListData()
}, [])
  return <div>welcome to chat app {stamState}</div>;
}

export default App;
