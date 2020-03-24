import React from "react";
import { Typography, Button } from "antd";

function App() {
  const { Title, Text } = Typography;
  return (
    <>
      .con
      <Title level={4}>Hi There</Title>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta expedita
        quod architecto laborum aliquid veritatis ducimus dolorum laudantium sed
        obcaecati, cum, minima libero adipisci neque pariatur soluta totam iusto
        aperiam?
      </Text>
      <div style={{ margin: "auto", width:"10%" }}>
        <Button style={{background:"teal",color:"white"}} type="default" size="large" shape="round">Click Me</Button>
      </div>
    </>
  );
}

export default App;
